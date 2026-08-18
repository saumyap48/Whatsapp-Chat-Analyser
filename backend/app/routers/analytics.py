import uuid
from typing import Optional, List
from fastapi import APIRouter, HTTPException, Depends, Query, status
from sqlalchemy.orm import Session
import pandas as pd

from ..database import get_db
from ..models import AnalysisSession, ChatUser, Message
from ..schemas import (
    FullAnalyticsResponse,
    OverviewStatsResponse,
    MostActiveUsersResponse,
    MonthlyTimelineResponse,
    DailyTimelineResponse,
    ActivityStatsResponse,
    HeatmapResponse,
    WordStatsResponse,
    EmojiStatsResponse,
    ChatUserResponse
)
from ..services.analytics import (
    get_full_analytics,
    calculate_overview_stats,
    calculate_user_analytics,
    calculate_monthly_timeline,
    calculate_daily_timeline,
    calculate_activity_stats,
    calculate_heatmap
)
from ..services.word_service import extract_word_analytics
from ..services.emoji_service import extract_emoji_analytics

router = APIRouter(prefix="/api/analytics", tags=["Analytics"])


def load_session_dataframe(session_id: uuid.UUID, db: Session) -> pd.DataFrame:
    """Loads all messages for a session and builds a structured DataFrame."""
    session_obj = db.query(AnalysisSession).filter(AnalysisSession.id == session_id).first()
    if not session_obj:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Analysis session '{session_id}' not found."
        )

    # Query messages with user joins
    records = (
        db.query(
            Message.timestamp,
            ChatUser.username,
            Message.text,
            Message.has_media,
            Message.has_link,
            Message.is_system
        )
        .outerjoin(ChatUser, Message.user_id == ChatUser.id)
        .filter(Message.session_id == session_id)
        .all()
    )

    if not records:
        return pd.DataFrame()

    data = []
    for ts, uname, txt, media, link, sys_flag in records:
        user_name = uname if uname else "group_notification"
        data.append({
            "date": ts,
            "user": user_name,
            "message": txt,
            "has_media": media,
            "has_link": link,
            "is_system": sys_flag
        })

    df = pd.DataFrame(data)
    df["date"] = pd.to_datetime(df["date"])

    # Computed fields
    df["only_date"] = df["date"].dt.date.astype(str)
    df["year"] = df["date"].dt.year
    df["month_num"] = df["date"].dt.month
    df["month"] = df["date"].dt.month_name()
    df["day"] = df["date"].dt.day
    df["day_name"] = df["date"].dt.day_name()
    df["hour"] = df["date"].dt.hour
    df["minute"] = df["date"].dt.minute

    periods = []
    for hour in df["hour"]:
        if hour == 23:
            periods.append("23-00")
        elif hour == 0:
            periods.append("00-01")
        else:
            periods.append(f"{hour:02d}-{(hour+1):02d}")
    df["period"] = periods

    return df


@router.get("/full/{analysis_id}", response_model=FullAnalyticsResponse)
def get_full_analysis(
    analysis_id: uuid.UUID,
    user: Optional[str] = Query(default="Overall", description="Selected user or 'Overall'"),
    db: Session = Depends(get_db)
):
    """Retrieves full aggregated analytics for an analysis session."""
    df = load_session_dataframe(analysis_id, db)
    analytics = get_full_analytics(df, selected_user=user)

    # Attach database IDs to users if available
    db_users = db.query(ChatUser).filter(ChatUser.session_id == analysis_id).all()
    user_id_map = {u.username: u.id for u in db_users}
    for u in analytics["users"]:
        u["id"] = user_id_map.get(u["username"], uuid.uuid4())

    return analytics


@router.get("/overview/{analysis_id}", response_model=OverviewStatsResponse)
def get_overview_analysis(
    analysis_id: uuid.UUID,
    user: Optional[str] = Query(default="Overall"),
    db: Session = Depends(get_db)
):
    """Retrieves summary metrics: message count, word count, media count, links count."""
    df = load_session_dataframe(analysis_id, db)
    return calculate_overview_stats(df, selected_user=user)


@router.get("/users/{analysis_id}", response_model=MostActiveUsersResponse)
def get_users_analysis(
    analysis_id: uuid.UUID,
    db: Session = Depends(get_db)
):
    """Retrieves user leaderboard and percentage contributions."""
    df = load_session_dataframe(analysis_id, db)
    users_list = calculate_user_analytics(df)

    db_users = db.query(ChatUser).filter(ChatUser.session_id == analysis_id).all()
    user_id_map = {u.username: u.id for u in db_users}
    for u in users_list:
        u["id"] = user_id_map.get(u["username"], uuid.uuid4())

    return {"users": users_list}


@router.get("/timeline/monthly/{analysis_id}", response_model=MonthlyTimelineResponse)
def get_monthly_timeline(
    analysis_id: uuid.UUID,
    user: Optional[str] = Query(default="Overall"),
    db: Session = Depends(get_db)
):
    """Retrieves chronological monthly message volumes."""
    df = load_session_dataframe(analysis_id, db)
    timeline = calculate_monthly_timeline(df, selected_user=user)
    return {"timeline": timeline}


@router.get("/timeline/daily/{analysis_id}", response_model=DailyTimelineResponse)
def get_daily_timeline(
    analysis_id: uuid.UUID,
    user: Optional[str] = Query(default="Overall"),
    db: Session = Depends(get_db)
):
    """Retrieves daily message volume trend."""
    df = load_session_dataframe(analysis_id, db)
    timeline = calculate_daily_timeline(df, selected_user=user)
    return {"timeline": timeline}


@router.get("/activity/{analysis_id}", response_model=ActivityStatsResponse)
def get_activity_stats(
    analysis_id: uuid.UUID,
    user: Optional[str] = Query(default="Overall"),
    db: Session = Depends(get_db)
):
    """Retrieves busiest day of the week and busiest month."""
    df = load_session_dataframe(analysis_id, db)
    return calculate_activity_stats(df, selected_user=user)


@router.get("/heatmap/{analysis_id}", response_model=HeatmapResponse)
def get_heatmap_stats(
    analysis_id: uuid.UUID,
    user: Optional[str] = Query(default="Overall"),
    db: Session = Depends(get_db)
):
    """Retrieves Day × Hour matrix for the weekly activity heatmap."""
    df = load_session_dataframe(analysis_id, db)
    return calculate_heatmap(df, selected_user=user)


@router.get("/words/{analysis_id}", response_model=WordStatsResponse)
def get_word_stats(
    analysis_id: uuid.UUID,
    user: Optional[str] = Query(default="Overall"),
    db: Session = Depends(get_db)
):
    """Retrieves most common words and word cloud frequency coordinates."""
    df = load_session_dataframe(analysis_id, db)
    common_words, word_cloud = extract_word_analytics(df, selected_user=user)
    return {
        "common_words": common_words,
        "word_cloud": word_cloud
    }


@router.get("/emojis/{analysis_id}", response_model=EmojiStatsResponse)
def get_emoji_stats(
    analysis_id: uuid.UUID,
    user: Optional[str] = Query(default="Overall"),
    db: Session = Depends(get_db)
):
    """Retrieves total emoji count and top emojis ranking."""
    df = load_session_dataframe(analysis_id, db)
    total_emojis, unique_emojis, emojis_list = extract_emoji_analytics(df, selected_user=user)
    return {
        "total_emojis": total_emojis,
        "unique_emojis": unique_emojis,
        "emojis": emojis_list
    }
