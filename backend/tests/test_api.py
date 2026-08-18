import io
import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool

from app.main import app
from app.database import Base, get_db

# Create an in-memory SQLite test database
SQLALCHEMY_TEST_DATABASE_URL = "sqlite:///:memory:"
engine = create_engine(
    SQLALCHEMY_TEST_DATABASE_URL,
    connect_args={"check_same_thread": False},
    poolclass=StaticPool,
)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


def override_get_db():
    db = TestingSessionLocal()
    try:
        yield db
    finally:
        db.close()


app.dependency_overrides[get_db] = override_get_db
client = TestClient(app)


@pytest.fixture(autouse=True)
def setup_database():
    Base.metadata.create_all(bind=engine)
    yield
    Base.metadata.drop_all(bind=engine)


def test_health_endpoint():
    response = client.get("/api/health")
    assert response.status_code == 200
    assert response.json()["status"] == "ok"


def test_upload_and_analytics_flow():
    sample_chat = (
        "12/05/2024, 10:30 am - Alice: Good morning team! 🎉\n"
        "12/05/2024, 10:31 am - Bob: Morning Alice! Here is the link: https://fastapi.tiangolo.com\n"
        "12/05/2024, 10:32 am - Alice: <Media omitted>\n"
        "12/05/2024, 10:33 am - Charlie: Looks great 👍 Let's discuss today.\n"
    )

    # 1. Upload valid file
    file_bytes = io.BytesIO(sample_chat.encode("utf-8"))
    response = client.post(
        "/api/upload",
        files={"file": ("chat.txt", file_bytes, "text/plain")}
    )
    assert response.status_code == 201
    data = response.json()
    assert "analysis_id" in data
    assert data["message_count"] == 4
    assert data["user_count"] == 3

    analysis_id = data["analysis_id"]

    # 2. Get full analytics
    full_res = client.get(f"/api/analytics/full/{analysis_id}")
    assert full_res.status_code == 200
    full_data = full_res.json()
    assert full_data["overview"]["total_messages"] == 4
    assert full_data["overview"]["links_shared"] == 1
    assert full_data["overview"]["media_shared"] == 1
    assert len(full_data["users"]) == 3

    # 3. Get overview stats with user filter
    user_res = client.get(f"/api/analytics/overview/{analysis_id}?user=Alice")
    assert user_res.status_code == 200
    assert user_res.json()["total_messages"] == 2

    # 4. Get monthly & daily timeline
    m_tl = client.get(f"/api/analytics/timeline/monthly/{analysis_id}")
    assert m_tl.status_code == 200
    assert len(m_tl.json()["timeline"]) > 0

    d_tl = client.get(f"/api/analytics/timeline/daily/{analysis_id}")
    assert d_tl.status_code == 200
    assert len(d_tl.json()["timeline"]) > 0

    # 5. Get activity & heatmap
    act_res = client.get(f"/api/analytics/activity/{analysis_id}")
    assert act_res.status_code == 200
    assert "busy_days" in act_res.json()

    heat_res = client.get(f"/api/analytics/heatmap/{analysis_id}")
    assert heat_res.status_code == 200
    assert len(heat_res.json()["matrix"]) == 7

    # 6. Get words & emojis
    words_res = client.get(f"/api/analytics/words/{analysis_id}")
    assert words_res.status_code == 200

    emoji_res = client.get(f"/api/analytics/emojis/{analysis_id}")
    assert emoji_res.status_code == 200
    assert emoji_res.json()["total_emojis"] >= 2


def test_upload_invalid_file():
    # Non-txt file
    response = client.post(
        "/api/upload",
        files={"file": ("image.png", io.BytesIO(b"binary"), "image/png")}
    )
    assert response.status_code == 400

    # Unparseable txt
    response = client.post(
        "/api/upload",
        files={"file": ("random.txt", io.BytesIO(b"Hello world no dates"), "text/plain")}
    )
    assert response.status_code == 422


def test_nonexistent_session():
    import uuid
    random_id = uuid.uuid4()
    response = client.get(f"/api/analytics/overview/{random_id}")
    assert response.status_code == 404
