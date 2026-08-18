import json
from typing import List, Union
from pydantic import field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")

    DATABASE_URL: str = "postgresql+psycopg2://postgres:password@localhost:5432/whatsapp_analyzer"
    ALLOWED_ORIGINS: Union[List[str], str] = [
        "http://localhost:5173",
        "http://localhost:3000",
        "https://whatsapp-chat-analyser-jet.vercel.app"
    ]
    MAX_UPLOAD_SIZE_MB: int = 50
    APP_NAME: str = "WhatsApp Chat Analyzer"
    APP_VERSION: str = "2.0.0"

    @field_validator("ALLOWED_ORIGINS", mode="before")
    @classmethod
    def parse_allowed_origins(cls, v: Union[List[str], str, None]) -> List[str]:
        if v is None:
            return [
                "http://localhost:5173",
                "http://localhost:3000",
                "https://whatsapp-chat-analyser-jet.vercel.app"
            ]
        if isinstance(v, str):
            v = v.strip()
            if not v:
                return [
                    "http://localhost:5173",
                    "http://localhost:3000",
                    "https://whatsapp-chat-analyser-jet.vercel.app"
                ]
            if v.startswith("[") and v.endswith("]"):
                try:
                    parsed = json.loads(v)
                    if isinstance(parsed, list):
                        return [str(item).strip().rstrip("/") for item in parsed if str(item).strip()]
                except Exception:
                    pass
            # Fallback for comma-separated or single string
            return [item.strip().rstrip("/") for item in v.split(",") if item.strip()]
        elif isinstance(v, list):
            return [str(item).strip().rstrip("/") for item in v if str(item).strip()]
        return [
            "http://localhost:5173",
            "http://localhost:3000",
            "https://whatsapp-chat-analyser-jet.vercel.app"
        ]


settings = Settings()
