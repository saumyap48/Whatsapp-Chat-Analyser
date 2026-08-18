<h1 align="center">💬 WhatsApp Chat Analyzer</h1>

<p align="center">
  <strong>Turn raw WhatsApp conversations into actionable insights, behavioral metrics, and interactive visualizations.</strong><br/>
  Production-grade full-stack web application built with React, Vite, FastAPI, PostgreSQL, and NLP analytics.
</p>

<p align="center">
  <a href="https://whatsapp-chat-analyser-jet.vercel.app/"><img src="https://img.shields.io/badge/Live%20Demo-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Live Demo"/></a>
  <img src="https://img.shields.io/badge/Frontend-React%2018%20%2B%20Vite-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React"/>
  <img src="https://img.shields.io/badge/Backend-FastAPI%20%2B%20Python-009688?style=for-the-badge&logo=fastapi&logoColor=white" alt="FastAPI"/>
  <img src="https://img.shields.io/badge/Database-PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL"/>
  <img src="https://img.shields.io/badge/Charts-Recharts-FF4B4B?style=for-the-badge" alt="Recharts"/>
  <img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" alt="License"/>
</p>

---

## 🚀 Live Demo

Experience the live, production-deployed application:

🔗 **[Live Demo](https://whatsapp-chat-analyser-jet.vercel.app/)**

### Production Endpoints
* **Frontend Web App**: [https://whatsapp-chat-analyser-jet.vercel.app/](https://whatsapp-chat-analyser-jet.vercel.app/)
* **Backend REST API**: [https://whatsapp-chat-analyser-53ii.onrender.com/](https://whatsapp-chat-analyser-53ii.onrender.com/)
* **API Health Check**: [https://whatsapp-chat-analyser-53ii.onrender.com/api/health](https://whatsapp-chat-analyser-53ii.onrender.com/api/health)
* **Interactive Swagger Docs**: [https://whatsapp-chat-analyser-53ii.onrender.com/docs](https://whatsapp-chat-analyser-53ii.onrender.com/docs)

---

## 🌟 Overview

**WhatsApp Chat Analyzer** is a high-performance web platform designed to analyze, visualize, and extract meaningful patterns from exported WhatsApp conversation streams (`.txt`). 

It accurately parses complex real-world export formats across Android and iOS devices (including 12-hour AM/PM, 24-hour formats, bracketed timestamps, Unicode emoji characters, and multiline text). Extracted messages are structured and stored in a relational PostgreSQL database to compute behavioral analytics, participant rankings, weekly heatmaps, sentiment distributions, and vocabulary trends.

---

## ✨ Features

| Feature | Description |
|---|---|
| 📊 **High-Level Statistics** | Total message volume, word counts, media attachments, and shared web links |
| 👥 **Participant Leaderboards** | Message contribution breakdown, ranking order, and interactive participant filtering |
| 📅 **Monthly & Daily Timelines** | Historical volume trend lines and date-by-date conversation surge graphs |
| 🗓️ **24×7 Activity Heatmap** | Day-of-week by hour-of-day matrix uncovering peak chatting patterns |
| ☁️ **Interactive Word Cloud** | Dominant keywords with size-proportional typography and occurrence tooltips |
| 🔤 **Ranked Vocabulary** | Top 25 vocabulary terms with custom Hinglish and English stop-word filtering |
| 😂 **Emoji Sentiment Analytics** | Donut charts and frequency rankings of top emojis used across the chat |
| 🔍 **Dynamic Participant Filtering** | Analyze the group as a whole or drill down into any individual participant |
| 📱 **Universal Format Engine** | Robust regex parser supporting Android & iOS exports (12-hour AM/PM & 24-hour) |
| ⚡ **One-Click Demo Chat** | Instantly explore full dashboard features with built-in realistic sample data |

---

## 🛠️ Architecture & Tech Stack

```
+-------------------------------------------------------------+
|                 React.js Frontend (Vite)                   |
|  Recharts • Lucide Icons • Glassmorphic Dark UI • Responsive|
+-------------------------------------------------------------+
                              |  HTTPS / REST JSON (Axios)
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

* **Frontend**:
  * **React 18** & **Vite**
  * **JavaScript (ES6+)**
  * **React Router DOM**
  * **Recharts** (Interactive SVG/HTML5 charts)
  * **Lucide React** (Modern iconography)
  * **Axios** (Configured HTTP client with interceptors)
  * **Vanilla CSS3** (Custom WhatsApp-inspired Dark Theme & Glassmorphism)
  * **Hosted on Vercel**

* **Backend**:
  * **Python 3.12**
  * **FastAPI** (High-performance async ASGI web framework)
  * **Uvicorn** (Production ASGI server)
  * **SQLAlchemy 2.0** (ORM & connection pooling)
  * **Alembic** (Database schema migrations)
  * **Pandas** (High-speed vector analytics & aggregation)
  * **psycopg2-binary** (PostgreSQL driver)
  * **URLExtract** & **Emoji** (NLP tokenization & extraction)
  * **Hosted on Render**

* **Database**:
  * **PostgreSQL**
  * **Hosted on Render**

---

## 🌐 Deployment

The application is deployed across a modern cloud-native architecture:

```
Vercel
  │ (Static Hosting & Edge CDN)
  ▼
React + Vite Frontend
  │
  │ HTTPS REST API
  ▼
Render
  │ (Web Service Runtime)
  ▼
FastAPI Backend
  │
  ▼
SQLAlchemy ORM
  │
  ▼
PostgreSQL Database (Render Managed)
```

### Production Configuration
* **Frontend-to-Backend Communication**: The React application communicates with the FastAPI backend through the environment variable:
  ```env
  VITE_API_URL=https://whatsapp-chat-analyser-53ii.onrender.com
  ```
* **Production CORS**: FastAPI's `CORSMiddleware` is configured to allow requests from `https://whatsapp-chat-analyser-jet.vercel.app` (and local development ports), ensuring secure cross-origin communication for all endpoints, preflight `OPTIONS` checks, and error responses.

---

## 📁 Project Structure

```
Whatsapp-Chat-Analyser/
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py               # FastAPI entrypoint & CORS middleware
│   │   ├── config.py             # Pydantic Settings environment configuration
│   │   ├── database.py           # SQLAlchemy database connection & session
│   │   ├── models.py             # SQLAlchemy ORM models (AnalysisSession, ChatUser, Message)
│   │   ├── schemas.py            # Pydantic request & response schemas
│   │   ├── data/
│   │   │   └── stop_hinglish.txt # Stop-words dictionary
│   │   ├── routers/
│   │   │   ├── health.py         # GET /api/health
│   │   │   ├── upload.py         # POST /api/upload
│   │   │   └── analytics.py      # GET /api/analytics/...
│   │   └── services/
│   │       ├── parser.py         # WhatsApp text parsing engine
│   │       ├── analytics.py      # Core metrics & timeline calculations
│   │       ├── word_service.py   # NLP word extraction & stop-words
│   │       └── emoji_service.py  # Emoji distribution & frequency
│   ├── alembic/                  # Database migration versions & env
│   ├── tests/                    # Pytest unit & integration test suite
│   ├── requirements.txt          # Python dependencies
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
│   │   │   ├── LandingPage.jsx   # Hero, uploader, demo loader & export guide
│   │   │   └── DashboardPage.jsx # Interactive multi-widget dashboard
│   │   ├── App.jsx               # React Router configuration
│   │   ├── main.jsx              # DOM root mount
│   │   └── index.css             # Dark theme design system & animations
│   ├── package.json
│   ├── vite.config.js
│   └── .env.example
│
├── database/
│   └── README.md                 # Entity relationship diagram & schema details
├── .env.example
├── .python-version
├── .gitignore
└── README.md
```

---

## 💻 Local Development Setup

### 1. Prerequisites
* **Python 3.11+ / 3.12+**
* **Node.js 18+ and npm**
* **PostgreSQL** running locally

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

# Create and activate virtual environment
python -m venv venv

# On Windows (PowerShell):
venv\Scripts\activate
# On Linux / macOS:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Configure environment file
copy .env.example .env    # Windows
# or: cp .env.example .env # Linux/macOS

# Run database migrations (tables also auto-create on startup)
alembic upgrade head

# Start FastAPI development server
uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
```

* **Backend API**: `http://localhost:8000`
* **Swagger API Docs**: `http://localhost:8000/docs`
* **Health Check**: `http://localhost:8000/api/health`

---

### 4. Frontend Setup

In a new terminal:

```bash
cd frontend

# Install dependencies
npm install

# Configure environment file
copy .env.example .env    # Windows
# or: cp .env.example .env # Linux/macOS

# Start Vite React dev server
npm run dev
```

* **Frontend Web App**: `http://localhost:5173`

---

## 📡 API Endpoints Reference

| Method | Path | Description |
|---|---|---|
| `GET` | `/api/health` | Service health status & version |
| `POST` | `/api/upload` | Upload and parse WhatsApp export `.txt` file |
| `GET` | `/api/analytics/full/{analysis_id}` | Complete analytics bundle for dashboard hydration |
| `GET` | `/api/analytics/overview/{analysis_id}` | Message count, word count, media count, links count |
| `GET` | `/api/analytics/users/{analysis_id}` | Participant leaderboard and percentage contribution |
| `GET` | `/api/analytics/timeline/monthly/{analysis_id}` | Monthly message volume progression |
| `GET` | `/api/analytics/timeline/daily/{analysis_id}` | Daily message volume points |
| `GET` | `/api/analytics/activity/{analysis_id}` | Busiest day of week & busiest month |
| `GET` | `/api/analytics/heatmap/{analysis_id}` | 24×7 Day-of-week by Hour activity matrix |
| `GET` | `/api/analytics/words/{analysis_id}` | Most common words & word cloud coordinates |
| `GET` | `/api/analytics/emojis/{analysis_id}` | Emoji frequency and sentiment breakdown |

*All analytics endpoints support an optional `?user=<Username>` query parameter to filter metrics for any individual participant.*

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
3. Upload the resulting `.txt` file on the web application.

---

## 👩‍💻 Author

**Saumya Pandey**
* GitHub: [@saumyap48](https://github.com/saumyap48)
* Repository: [saumyap48/Whatsapp-Chat-Analyser](https://github.com/saumyap48/Whatsapp-Chat-Analyser)

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
