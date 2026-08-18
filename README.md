<h1 align="center">ðŸ’¬ WhatsApp Chat Analyzer</h1>

<p align="center">
  ðŸš€ <strong><a href="https://whatsapp-chat-analyser-kxfmxm9rjrzhp2flpsfqep.streamlit.app/">Try the WhatsApp Chat Analyzer Live</a></strong>
</p>

<p align="center">
  <strong>Gain powerful insights from your exported WhatsApp chats â€” instantly.</strong><br/>
  Message trends, user activity, word clouds, emoji stats, heatmaps, and more.
</p>

<p align="center">
  <a href="https://whatsapp-chat-analyser-kxfmxm9rjrzhp2flpsfqep.streamlit.app/">
    <img src="https://img.shields.io/badge/ðŸš€%20Live%20App-Streamlit%20Cloud-25D366?style=for-the-badge&logo=streamlit&logoColor=white" alt="Live App"/>
  </a>
  <img src="https://img.shields.io/badge/Python-3.9%2B-blue?style=for-the-badge&logo=python&logoColor=white" alt="Python"/>
  <img src="https://img.shields.io/badge/Streamlit-1.30%2B-FF4B4B?style=for-the-badge&logo=streamlit&logoColor=white" alt="Streamlit"/>
  <img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" alt="License"/>
</p>

---

## ðŸš€ Live Demo

Try the fully deployed application:

ðŸ‘‰ **[Try the WhatsApp Chat Analyzer Live](https://whatsapp-chat-analyser-kxfmxm9rjrzhp2flpsfqep.streamlit.app/)**

The application is deployed using **Streamlit Community Cloud** with zero installation required.

---

## âœ¨ Features

| Feature | Description |
|---|---|
| ðŸ“Š **Top Statistics** | Total messages, words, media shared, and links shared at a glance |
| ðŸ‘¥ **User Leaderboard** | Identify the most active participants in any group chat |
| ðŸ“… **Timeline Charts** | Daily & monthly message activity trend lines |
| ðŸ—“ï¸ **Activity Heatmap** | Visualize peak hours and busiest days of the week |
| â˜ï¸ **Word Cloud** | Beautiful visual of the most-used words (Hinglish-aware) |
| ðŸ”¤ **Top Words** | Ranked bar chart of the 20 most common words |
| ðŸ˜‚ **Emoji Analysis** | Frequency table and pie chart of top emojis used |
| ðŸ” **Per-User Filtering** | Analyze the entire group or zoom into any individual user |
| ðŸ“± **Format Support** | Handles Android & iOS WhatsApp export formats (12-hr & 24-hr) |

---

## ðŸ› ï¸ Tech Stack

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

## âš™ï¸ How to Run Locally / Codespaces

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

## ðŸ“± How to Export Your WhatsApp Chat

| Platform | Steps |
|---|---|
| **Android** | Open chat â†’ Tap â‹® (More) â†’ **Export Chat** â†’ **Without Media** |
| **iOS** | Open chat â†’ Tap contact/group name â†’ **Export Chat** â†’ **Without Media** |

Upload the exported `.txt` file directly into the application.

---

## ðŸ“Š What You Can Analyze

- **Message volume**: Total messages, words, media, and link counts
- **User activity**: Who messages the most, with percentage breakdowns
- **Temporal trends**: Daily and monthly timelines to track chat growth over time
- **Day & hour patterns**: Heatmap of when your group is most active
- **Vocabulary**: Most frequently used words (stop-word filtered)
- **Word cloud**: Visual representation of dominant words
- **Emoji usage**: Distribution and ranking of top emojis

---

## ðŸŒ Deployment

Production hosting is powered by **Streamlit Community Cloud**:

| Setting | Value |
|---|---|
| **Repository** | `saumyap48/Whatsapp-Chat-Analyser` |
| **Branch** | `main` |
| **Main file** | `app.py` |
| **Live URL** | [https://whatsapp-chat-analyser-kxfmxm9rjrzhp2flpsfqep.streamlit.app/](https://whatsapp-chat-analyser-kxfmxm9rjrzhp2flpsfqep.streamlit.app/) |

---

## ðŸ‘©â€ðŸ’» Author

**Saumya Pandey**

[![GitHub](https://img.shields.io/badge/GitHub-saumyap48-181717?style=flat-square&logo=github)](https://github.com/saumyap48)

---

## â­ Support

If you find this project useful, please give it a â­ on GitHub!
