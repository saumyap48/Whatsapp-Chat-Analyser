<h1 align="center">💬 WhatsApp Chat Analyzer</h1>

<p align="center">
  <strong>Turn your WhatsApp conversations into actionable data insights and interactive visualizations.</strong><br/>
  Full-stack web application built with React, FastAPI, PostgreSQL, and advanced NLP parsing.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Frontend-React%2018%20%2B%20Vite-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React"/>
  <img src="https://img.shields.io/badge/Backend-FastAPI%200.128-009688?style=for-the-badge&logo=fastapi&logoColor=white" alt="FastAPI"/>
  <img src="https://img.shields.io/badge/Database-PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL"/>
  <img src="https://img.shields.io/badge/Charts-Recharts-FF4B4B?style=for-the-badge" alt="Recharts"/>
  <img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" alt="License"/>
</p>

---

## 🌟 Overview

**WhatsApp Chat Analyzer** is a production-grade full-stack web application that parses exported WhatsApp chat files (`.txt`) and delivers comprehensive analytics. It processes messages across iOS and Android export formats, extracts timelines, participant contributions, weekly heatmaps, sentiment emojis, and word frequencies with Hinglish stop-word filtering.

---

## ✨ Features

| Feature | Description |
|---|---|
| 📊 **Top Statistics** | Total message volume, word counts, media attachments, and link counts |
| 👥 **Participant Leaderboard** | Message contribution breakdown, rank order, and interactive participant filtering |
| 📅 **Monthly & Daily Timelines** | Historical volume trend lines and date-by-date conversation surges |
| 🗓️ **Activity Heatmap** | 24×7 Day-of-week by Hour-of-day intensity matrix revealing peak chatting hours |
| ☁️ **Interactive Word Cloud** | Dominant keywords with size-proportional typography and hover tooltips |
| 🔤 **Ranked Vocabulary** | Top 25 words with custom Hinglish and common stop-word filtering |
| 😂 **Emoji Sentiment** | Donut chart and breakdown of top emojis used throughout the chat |
| 🔍 **Individual Participant Filter** | Zoom in on any individual participant or analyze the whole group |
| 📱 **Cross-Platform Format Support** | Android & iOS exports (12-hour AM/PM and 24-hour timestamp formats) |

---

## 🛠️ Architecture & Tech Stack

```
+-------------------------------------------------------------+
|                 React.js Frontend (Vite)                   |
|  Recharts • Lucide Icons • Glassmorphic Dark UI • Responsive|
+-------------------------------------------------------------+
                              |  HTTP / REST JSON (Axios)
                              v
+-------------------------------------------------------------+
|                     FastAPI Backend                         |
|  Routers • Pydantic Schemas • Async Engine • CORS Middleware|
+-------------------------------------------------------------+
                              |
         +--------------------+--------------------+
         |                                         |
         v                                         v
+-----------------------+              +-----------------------+
|  PostgreSQL Database  |              |   Analytics Engine    |
|  SQLAlchemy • Alembic |              |  Pandas • NLP Parser  |
|  Sessions & Messages  |              |  Word & Emoji Service |
+-----------------------+              +-----------------------+
```

### Technology Breakdown

- **Frontend**: React 18, JavaScript, Vite, Recharts, Lucide React, Axios, CSS3 (Custom WhatsApp Dark Theme)
- **Backend**: Python 3.11+, FastAPI, Pydantic v2, Uvicorn, Pandas, URLExtract, Emoji
- **Database & ORM**: PostgreSQL, SQLAlchemy 2.0, Alembic Migrations

---

## 📁 Project Structure

```
Whatsapp-Chat-Analyser/
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py               # FastAPI entrypoint & middleware
│   │   ├── config.py             # Pydantic environment configuration
│   │   ├── database.py           # SQLAlchemy database connection
│   │   ├── models.py             # SQLAlchemy ORM models
│   │   ├── schemas.py            # Pydantic request/response schemas
│   │   ├── data/
│   │   │   └── stop_hinglish.txt # Stop-words dictionary
│   │   ├── routers/
│   │   │   ├── __init__.py
│   │   │   ├── health.py         # GET /api/health
│   │   │   ├── upload.py         # POST /api/upload
│   │   │   └── analytics.py      # GET /api/analytics/...
│   │   └── services/
│   │       ├── __init__.py
│   │       ├── parser.py         # WhatsApp text parsing engine
│   │       ├── analytics.py      # Core metrics & timeline calculations
│   │       ├── word_service.py   # NLP word extraction & stop-words
│   │       └── emoji_service.py  # Emoji distribution & frequency
│   ├── alembic/                  # Database migration scripts
│   ├── tests/                    # Pytest unit & integration test suite
│   ├── requirements.txt
│   ├── alembic.ini
│   └── .env.example
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   │   └── api.js            # Centralized Axios API client
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── StatCard.jsx
│   │   │   ├── UserFilter.jsx
│   │   │   ├── LoadingState.jsx
│   │   │   ├── ErrorState.jsx
│   │   │   └── EmptyState.jsx
│   │   ├── charts/
│   │   │   ├── MonthlyTimelineChart.jsx
│   │   │   ├── DailyTimelineChart.jsx
│   │   │   ├── ActivityHeatmap.jsx
│   │   │   ├── UserLeaderboardChart.jsx
│   │   │   ├── EmojiAnalysisSection.jsx
│   │   │   ├── WordFrequencyChart.jsx
│   │   │   └── WordCloudView.jsx
│   │   ├── pages/
│   │   │   ├── LandingPage.jsx   # Hero, file uploader, export guide
│   │   │   └── DashboardPage.jsx # Full-featured analytics dashboard
│   │   ├── App.jsx               # React Router configuration
│   │   ├── main.jsx              # DOM root mount
│   │   └── index.css             # Design tokens & responsive styles
│   ├── package.json
│   ├── vite.config.js
│   └── .env.example
│
├── database/
│   └── README.md                 # Entity relationship diagram & migrations
├── .gitignore
└── README.md
```

---

## 🚀 How to Run Locally

### 1. Prerequisites
- **Python 3.11+**
- **Node.js 18+ and npm**
- **PostgreSQL** running locally

---

### 2. Database Setup

Ensure PostgreSQL is running and create a database named `whatsapp_analyzer`:

```sql
CREATE DATABASE whatsapp_analyzer;
```

---

### 3. Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows (PowerShell / Command Prompt):
venv\Scripts\activate
# On Linux / macOS:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Configure environment file
copy .env.example .env    # Windows
# or: cp .env.example .env # Linux/macOS

# Edit .env if your PostgreSQL username/password is different:
# DATABASE_URL=postgresql+psycopg2://postgres:your_password@localhost:5432/whatsapp_analyzer

# Run database migrations (tables also auto-create on startup)
alembic upgrade head

# Start FastAPI development server
uvicorn app.main:app --reload
```

- **Backend API**: `http://localhost:8000`
- **Interactive Swagger Docs**: `http://localhost:8000/docs`
- **Health Check**: `http://localhost:8000/api/health`

---

### 4. Frontend Setup

In a new terminal:

```bash
cd frontend

# Install npm packages
npm install

# Configure environment file
copy .env.example .env    # Windows
# or: cp .env.example .env # Linux/macOS

# Start Vite React development server
npm run dev
```

- **Frontend Web App**: `http://localhost:5173`

---

## 📡 API Endpoints Reference

| Method | Path | Description |
|---|---|---|
| `GET` | `/api/health` | Health check & service readiness |
| `POST` | `/api/upload` | Upload and parse WhatsApp export `.txt` file |
| `GET` | `/api/analytics/full/{analysis_id}` | Complete analytics payload for one-step dashboard hydration |
| `GET` | `/api/analytics/overview/{analysis_id}` | Message count, word count, media count, links count |
| `GET` | `/api/analytics/users/{analysis_id}` | Participant leaderboard and percentage contribution |
| `GET` | `/api/analytics/timeline/monthly/{analysis_id}` | Monthly message volume |
| `GET` | `/api/analytics/timeline/daily/{analysis_id}` | Daily message volume |
| `GET` | `/api/analytics/activity/{analysis_id}` | Busiest day of week & busiest month |
| `GET` | `/api/analytics/heatmap/{analysis_id}` | 24×7 Day-of-week by Hour activity matrix |
| `GET` | `/api/analytics/words/{analysis_id}` | Most common words & word cloud coordinates |
| `GET` | `/api/analytics/emojis/{analysis_id}` | Emoji frequency and sentiment distribution |

*All analytics endpoints support an optional `?user=<Username>` query parameter to filter by a specific chat participant.*

---

## 🧪 Running Tests

### Backend Unit & Integration Tests
```bash
cd backend
python -m pytest tests/ -v
```

### Frontend Production Build Test
```bash
cd frontend
npm run build
```

---

## 📱 How to Export WhatsApp Chats

1. **Android**: Open chat → Tap **⋮ (More)** → **Export Chat** → Select **Without Media**.
2. **iOS**: Open chat → Tap contact/group header → **Export Chat** → Select **Without Media**.
3. Upload the exported `.txt` file directly on the landing page.

---

## 👩‍💻 Author

**Saumya Pandey**
- GitHub: [@saumyap48](https://github.com/saumyap48)

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
