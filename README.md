<h1 align="center">💬 WhatsApp Chat Analyzer</h1>

<p align="center">
  <strong>Gain powerful insights from your exported WhatsApp chats — instantly.</strong><br/>
  Message trends, user activity, word clouds, emoji stats, heatmaps, and more.
</p>

<p align="center">
  <a href="https://whatsapp-chat-analyser-4b6ubxf63bzlvrqrw7f9va.streamlit.app/">
    <img src="https://img.shields.io/badge/🚀%20Live%20App-Streamlit%20Cloud-25D366?style=for-the-badge&logo=streamlit&logoColor=white" alt="Live App"/>
  </a>
  <img src="https://img.shields.io/badge/Python-3.9%2B-blue?style=for-the-badge&logo=python&logoColor=white" alt="Python"/>
  <img src="https://img.shields.io/badge/Streamlit-1.30%2B-FF4B4B?style=for-the-badge&logo=streamlit&logoColor=white" alt="Streamlit"/>
  <img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" alt="License"/>
</p>

---

## 🚀 Live Demo

👉 **[Try the WhatsApp Chat Analyzer Live](https://whatsapp-chat-analyser-4b6ubxf63bzlvrqrw7f9va.streamlit.app/)**

No installation needed. Upload your WhatsApp `.txt` export and get instant analysis.

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
| **Python 3.9+** | Core language |
| **Streamlit** | Interactive web UI framework |
| **Pandas** | Data manipulation and cleaning |
| **Matplotlib & Seaborn** | Charts, timelines, and heatmaps |
| **WordCloud** | Word frequency cloud generation |
| **URLExtract** | Link detection from messages |
| **Emoji** | Emoji parsing and analysis |

---

## ⚙️ Run Locally

### 1. Clone the repository

```bash
git clone https://github.com/saumyap48/Whatsapp-Chat-Analyser.git
cd Whatsapp-Chat-Analyser
```

### 2. Install dependencies

```bash
pip install -r requirements.txt
```

### 3. Start the app

```bash
streamlit run app.py
```

The app opens at **`http://localhost:8501`** in your browser.

---

## 📱 How to Export Your WhatsApp Chat

| Platform | Steps |
|---|---|
| **Android** | Open chat → Tap ⋮ (More) → **Export Chat** → **Without Media** |
| **iOS** | Open chat → Tap contact/group name → **Export Chat** → **Without Media** |

You'll receive a `.txt` file — upload it directly into the app.

---

## 📊 What You Can Analyze

- **Message volume** — total messages, words, media, and links
- **User activity** — who messages the most, with percentage breakdowns
- **Temporal trends** — daily & monthly timelines to see chat growth over time
- **Day & hour patterns** — heatmap of when your group is most active
- **Vocabulary** — most commonly used words (stop-word filtered)
- **Word cloud** — visual representation of dominant words
- **Emoji usage** — which emojis fly the most and their distribution

---

## 🌐 Deployment

Deployed on **Streamlit Community Cloud** — zero infrastructure needed.

| Setting | Value |
|---|---|
| **Repository** | `saumyap48/Whatsapp-Chat-Analyser` |
| **Branch** | `main` |
| **Main file** | `app.py` |
| **Live URL** | [https://whatsapp-chat-analyser-4b6ubxf63bzlvrqrw7f9va.streamlit.app/](https://whatsapp-chat-analyser-4b6ubxf63bzlvrqrw7f9va.streamlit.app/) |

---

## 👩‍💻 Author

**Saumya Pandey**

[![GitHub](https://img.shields.io/badge/GitHub-saumyap48-181717?style=flat-square&logo=github)](https://github.com/saumyap48)

---

## ⭐ Support

If you find this project useful, please consider giving it a ⭐ on GitHub — it helps others discover it!
