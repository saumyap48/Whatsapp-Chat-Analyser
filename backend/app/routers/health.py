from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter(prefix="/api", tags=["Health"])


class HealthResponse(BaseModel):
    status: str
    version: str = "2.0.0"


@router.get("/health", response_model=HealthResponse)
def health_check():
    """Health check endpoint to verify backend operational readiness."""
    return {"status": "ok", "version": "2.0.0"}
