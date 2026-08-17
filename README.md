<h1 align="center">💬 WhatsApp Chat Analyzer</h1>

<p align="center">
  🚀 <strong><a href="https://whatsapp-chat-analyser-bbsovk2yyknoynfeulappe.streamlit.app/">Try the WhatsApp Chat Analyzer Live</a></strong>
</p>

<p align="center">
  <strong>Gain powerful insights from your exported WhatsApp chats — instantly.</strong><br/>
  Message trends, user activity, word clouds, emoji stats, heatmaps, and more.
</p>

<p align="center">
  <a href="https://whatsapp-chat-analyser-bbsovk2yyknoynfeulappe.streamlit.app/">
    <img src="https://img.shields.io/badge/🚀%20Live%20App-Streamlit%20Cloud-25D366?style=for-the-badge&logo=streamlit&logoColor=white" alt="Live App"/>
  </a>
  <img src="https://img.shields.io/badge/Python-3.9%2B-blue?style=for-the-badge&logo=python&logoColor=white" alt="Python"/>
  <img src="https://img.shields.io/badge/Streamlit-1.30%2B-FF4B4B?style=for-the-badge&logo=streamlit&logoColor=white" alt="Streamlit"/>
  <img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" alt="License"/>
</p>

---

## 🚀 Live Demo

Try the fully deployed application:

👉 **[Try the WhatsApp Chat Analyzer Live](https://whatsapp-chat-analyser-bbsovk2yyknoynfeulappe.streamlit.app/)**

The application is deployed using **Streamlit Community Cloud** with zero installation required.

---

## ✨ Features

| Feature | Description |
|---|---|
| 📊 **Top Statistics** | Total messages, words, media shared, and links shared at a glance |
| 👥 **User Leaderboard** | Identify the most active participants in any group chat |
| 📅 **Timeline Charts** | Daily & monthly message activity trend lines |
| 🗓️ **Activity Heatmap** | Visualize peak hours and busiest days of the week |
| ☁️ **Word Cloud** | Beautiful visual of the most-used words (Hinglish-aware) |
| 🔤 **Top Words** | Ranked bar chart of the 20 most common words |
| 😂 **Emoji Analysis** | Frequency table and pie chart of top emojis used |
| 🔍 **Per-User Filtering** | Analyze the entire group or zoom into any individual user |
| 📱 **Format Support** | Handles Android & iOS WhatsApp export formats (12-hr & 24-hr) |

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| **Python 3.9+** | Core programming language |
| **Streamlit** | Interactive web UI framework |
| **Pandas** | Data manipulation and cleaning |
| **Matplotlib & Seaborn** | Visualizations, timelines, and heatmaps |
| **WordCloud** | Word frequency cloud generation |
| **URLExtract** | Link detection from messages |
| **Emoji** | Emoji parsing and analysis |

---

## ⚙️ How to Run Locally / Codespaces

### 1. Clone the repository

```bash
git clone https://github.com/saumyap48/Whatsapp-Chat-Analyser.git
cd Whatsapp-Chat-Analyser
```

### 2. Install dependencies

```bash
pip install -r requirements.txt
```

### 3. Run the Streamlit application

```bash
streamlit run app.py
```

For **GitHub Codespaces**, run:
```bash
streamlit run app.py --server.address=0.0.0.0 --server.port=8501
```

The application will open automatically at **`http://localhost:8501`** (or via the forwarded Codespaces port).

---

## 📱 How to Export Your WhatsApp Chat

| Platform | Steps |
|---|---|
| **Android** | Open chat → Tap ⋮ (More) → **Export Chat** → **Without Media** |
| **iOS** | Open chat → Tap contact/group name → **Export Chat** → **Without Media** |

Upload the exported `.txt` file directly into the application.

---

## 📊 What You Can Analyze

- **Message volume**: Total messages, words, media, and link counts
- **User activity**: Who messages the most, with percentage breakdowns
- **Temporal trends**: Daily and monthly timelines to track chat growth over time
- **Day & hour patterns**: Heatmap of when your group is most active
- **Vocabulary**: Most frequently used words (stop-word filtered)
- **Word cloud**: Visual representation of dominant words
- **Emoji usage**: Distribution and ranking of top emojis

---

## 🌐 Deployment

Production hosting is powered by **Streamlit Community Cloud**:

| Setting | Value |
|---|---|
| **Repository** | `saumyap48/Whatsapp-Chat-Analyser` |
| **Branch** | `main` |
| **Main file** | `app.py` |
| **Live URL** | [https://whatsapp-chat-analyser-bbsovk2yyknoynfeulappe.streamlit.app/](https://whatsapp-chat-analyser-bbsovk2yyknoynfeulappe.streamlit.app/) |

---

## 👩‍💻 Author

**Saumya Pandey**

[![GitHub](https://img.shields.io/badge/GitHub-saumyap48-181717?style=flat-square&logo=github)](https://github.com/saumyap48)

---

## ⭐ Support

If you find this project useful, please give it a ⭐ on GitHub!
