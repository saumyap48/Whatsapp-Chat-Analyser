import uuid
from datetime import datetime
from sqlalchemy import (
    Column, String, Integer, Boolean, DateTime,
    ForeignKey, Text, Index, Uuid
)
from sqlalchemy.orm import relationship
from .database import Base


class AnalysisSession(Base):
    __tablename__ = "analysis_sessions"

    id = Column(Uuid, primary_key=True, default=uuid.uuid4)
    filename = Column(String(255), nullable=False)
    uploaded_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    message_count = Column(Integer, default=0)
    user_count = Column(Integer, default=0)

    users = relationship("ChatUser", back_populates="session", cascade="all, delete-orphan")
    messages = relationship("Message", back_populates="session", cascade="all, delete-orphan")

    def __repr__(self):
        return f"<AnalysisSession id={self.id} filename={self.filename}>"


class ChatUser(Base):
    __tablename__ = "chat_users"

    id = Column(Uuid, primary_key=True, default=uuid.uuid4)
    session_id = Column(Uuid, ForeignKey("analysis_sessions.id", ondelete="CASCADE"), nullable=False)
    username = Column(String(500), nullable=False)
    message_count = Column(Integer, default=0)

    session = relationship("AnalysisSession", back_populates="users")
    messages = relationship("Message", back_populates="user", cascade="all, delete-orphan")

    __table_args__ = (
        Index("ix_chat_users_session_id", "session_id"),
    )


class Message(Base):
    __tablename__ = "messages"

    id = Column(Uuid, primary_key=True, default=uuid.uuid4)
    session_id = Column(Uuid, ForeignKey("analysis_sessions.id", ondelete="CASCADE"), nullable=False)
    user_id = Column(Uuid, ForeignKey("chat_users.id", ondelete="CASCADE"), nullable=True)
    timestamp = Column(DateTime, nullable=True)
    text = Column(Text, nullable=False)
    has_media = Column(Boolean, default=False)
    has_link = Column(Boolean, default=False)
    is_system = Column(Boolean, default=False)

    session = relationship("AnalysisSession", back_populates="messages")
    user = relationship("ChatUser", back_populates="messages")

    __table_args__ = (
        Index("ix_messages_session_id", "session_id"),
        Index("ix_messages_timestamp", "timestamp"),
    )
