import uuid
from datetime import datetime, timezone
from fastapi import APIRouter, UploadFile, File, HTTPException, Depends, status
from sqlalchemy.orm import Session
import pandas as pd

from ..database import get_db
from ..models import AnalysisSession, ChatUser, Message
from ..schemas import SessionCreateResponse
from ..services.parser import parse_whatsapp_text
from ..config import settings

router = APIRouter(prefix="/api", tags=["Upload"])


@router.post("/upload", response_model=SessionCreateResponse, status_code=status.HTTP_201_CREATED)
async def upload_chat_file(
    file: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    """
    Accepts and parses a WhatsApp exported .txt chat file.
    Validates format, extracts structured message entities, and creates an analysis session in the DB.
    """
    # 1. Validate extension
    if not file.filename or not file.filename.lower().endswith(".txt"):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid file type. Please upload a standard WhatsApp export .txt file."
        )

    # 2. Read contents
    try:
        content_bytes = await file.read()
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Error reading uploaded file: {str(e)}"
        )

    # 3. Check file size
    max_bytes = settings.MAX_UPLOAD_SIZE_MB * 1024 * 1024
    if len(content_bytes) > max_bytes:
        raise HTTPException(
            status_code=status.HTTP_413_REQUEST_ENTITY_TOO_LARGE,
            detail=f"File exceeds maximum allowed size of {settings.MAX_UPLOAD_SIZE_MB}MB."
        )

    # 4. Decode text
    try:
        raw_text = content_bytes.decode("utf-8", errors="ignore")
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail="Unable to decode file content as UTF-8."
        )

    if not raw_text.strip():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="The uploaded file is empty."
        )

    # 5. Parse WhatsApp structure
    df = parse_whatsapp_text(raw_text)

    if df.empty or len(df) == 0:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail="Could not detect valid WhatsApp messages. Please ensure you exported the chat properly without media."
        )

    # 6. Extract users
    user_counts = df[df["user"] != "group_notification"]["user"].value_counts().to_dict()
    user_count = len(user_counts)
    total_messages = len(df)

    # 7. Persist AnalysisSession
    session_id = uuid.uuid4()
    analysis_session = AnalysisSession(
        id=session_id,
        filename=file.filename,
        uploaded_at=datetime.now(timezone.utc),
        message_count=total_messages,
        user_count=user_count
    )
    db.add(analysis_session)
    db.commit()  # Commit parent session first

    # 8. Persist ChatUser records
    user_map = {}
    db_users = []
    for username, count in user_counts.items():
        user_id = uuid.uuid4()
        chat_user = ChatUser(
            id=user_id,
            session_id=session_id,
            username=username,
            message_count=int(count)
        )
        db_users.append(chat_user)
        user_map[username] = user_id

    if db_users:
        db.add_all(db_users)
        db.commit()  # Commit users

    # 9. Persist Messages
    db_messages = []
    for _, row in df.iterrows():
        msg_user = row["user"]
        msg_user_id = user_map.get(msg_user) if msg_user in user_map else None

        db_msg = Message(
            id=uuid.uuid4(),
            session_id=session_id,
            user_id=msg_user_id,
            timestamp=row["date"].to_pydatetime() if pd.notnull(row["date"]) else None,
            text=str(row["message"]),
            has_media=bool(row["has_media"]),
            has_link=bool(row["has_link"]),
            is_system=bool(row["is_system"])
        )
        db_messages.append(db_msg)

    if db_messages:
        db.add_all(db_messages)
        db.commit()  # Commit messages

    return SessionCreateResponse(
        analysis_id=analysis_session.id,
        filename=analysis_session.filename,
        uploaded_at=analysis_session.uploaded_at,
        message_count=analysis_session.message_count,
        user_count=analysis_session.user_count
    )
