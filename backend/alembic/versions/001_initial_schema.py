"""initial schema

Revision ID: 001_initial_schema
Revises: 
Create Date: 2026-08-18 16:00:00.000000

"""
from typing import Sequence, Union
from alembic import op
import sqlalchemy as sa

revision: str = '001_initial_schema'
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        'analysis_sessions',
        sa.Column('id', sa.Uuid(), nullable=False),
        sa.Column('filename', sa.String(length=255), nullable=False),
        sa.Column('uploaded_at', sa.DateTime(), nullable=False),
        sa.Column('message_count', sa.Integer(), nullable=True),
        sa.Column('user_count', sa.Integer(), nullable=True),
        sa.PrimaryKeyConstraint('id')
    )

    op.create_table(
        'chat_users',
        sa.Column('id', sa.Uuid(), nullable=False),
        sa.Column('session_id', sa.Uuid(), nullable=False),
        sa.Column('username', sa.String(length=500), nullable=False),
        sa.Column('message_count', sa.Integer(), nullable=True),
        sa.ForeignKeyConstraint(['session_id'], ['analysis_sessions.id'], ondelete='CASCADE'),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_index('ix_chat_users_session_id', 'chat_users', ['session_id'], unique=False)

    op.create_table(
        'messages',
        sa.Column('id', sa.Uuid(), nullable=False),
        sa.Column('session_id', sa.Uuid(), nullable=False),
        sa.Column('user_id', sa.Uuid(), nullable=True),
        sa.Column('timestamp', sa.DateTime(), nullable=True),
        sa.Column('text', sa.Text(), nullable=False),
        sa.Column('has_media', sa.Boolean(), nullable=True),
        sa.Column('has_link', sa.Boolean(), nullable=True),
        sa.Column('is_system', sa.Boolean(), nullable=True),
        sa.ForeignKeyConstraint(['session_id'], ['analysis_sessions.id'], ondelete='CASCADE'),
        sa.ForeignKeyConstraint(['user_id'], ['chat_users.id'], ondelete='CASCADE'),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_index('ix_messages_session_id', 'messages', ['session_id'], unique=False)
    op.create_index('ix_messages_timestamp', 'messages', ['timestamp'], unique=False)


def downgrade() -> None:
    op.drop_index('ix_messages_timestamp', table_name='messages')
    op.drop_index('ix_messages_session_id', table_name='messages')
    op.drop_table('messages')
    op.drop_index('ix_chat_users_session_id', table_name='chat_users')
    op.drop_table('chat_users')
    op.drop_table('analysis_sessions')
