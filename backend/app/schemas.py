import uuid
from datetime import datetime
from typing import List, Optional, Dict, Any
from pydantic import BaseModel, ConfigDict


# --- Base & Session Schemas ---

class SessionCreateResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    
    analysis_id: uuid.UUID
    filename: str
    uploaded_at: datetime
    message_count: int
    user_count: int


class ChatUserResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: uuid.UUID
    username: str
    message_count: int
    percentage: float = 0.0


# --- Analytics Schemas ---

class OverviewStatsResponse(BaseModel):
    total_messages: int
    total_words: int
    media_shared: int
    links_shared: int
    total_users: int
    selected_user: str


class TimelinePoint(BaseModel):
    time: str
    message: int


class DailyTimelinePoint(BaseModel):
    only_date: str
    message: int


class MonthlyTimelineResponse(BaseModel):
    timeline: List[TimelinePoint]


class DailyTimelineResponse(BaseModel):
    timeline: List[DailyTimelinePoint]


class DayActivity(BaseModel):
    day: str
    count: int


class MonthActivity(BaseModel):
    month: str
    count: int


class ActivityStatsResponse(BaseModel):
    busy_days: List[DayActivity]
    busy_months: List[MonthActivity]
    busiest_day: Optional[str] = None
    busiest_month: Optional[str] = None


class HeatmapCell(BaseModel):
    day: str
    period: str
    count: int


class HeatmapResponse(BaseModel):
    days: List[str]
    periods: List[str]
    matrix: List[List[int]]
    cells: List[HeatmapCell]


class MostActiveUsersResponse(BaseModel):
    users: List[ChatUserResponse]


class WordFrequency(BaseModel):
    word: str
    count: int


class WordCloudPoint(BaseModel):
    text: str
    value: int


class WordStatsResponse(BaseModel):
    common_words: List[WordFrequency]
    word_cloud: List[WordCloudPoint]


class EmojiFrequency(BaseModel):
    emoji: str
    count: int
    percentage: float = 0.0


class EmojiStatsResponse(BaseModel):
    total_emojis: int
    unique_emojis: int
    emojis: List[EmojiFrequency]


class FullAnalyticsResponse(BaseModel):
    overview: OverviewStatsResponse
    users: List[ChatUserResponse]
    monthly_timeline: List[TimelinePoint]
    daily_timeline: List[DailyTimelinePoint]
    activity: ActivityStatsResponse
    heatmap: HeatmapResponse
    words: WordStatsResponse
    emojis: EmojiStatsResponse
