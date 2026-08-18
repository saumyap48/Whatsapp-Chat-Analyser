from pydantic_settings import BaseSettings, SettingsConfigDict
from typing import List


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")

    DATABASE_URL: str = "postgresql+psycopg2://postgres:password@localhost:5432/whatsapp_analyzer"
    ALLOWED_ORIGINS: List[str] = ["http://localhost:5173", "http://localhost:3000"]
    MAX_UPLOAD_SIZE_MB: int = 50
    APP_NAME: str = "WhatsApp Chat Analyzer"
    APP_VERSION: str = "2.0.0"


settings = Settings()
