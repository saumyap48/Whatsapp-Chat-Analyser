# WhatsApp Chat Analyzer

A Python & Streamlit application to analyze your exported WhatsApp chats. Get comprehensive insights on message activity, timelines, user leaderboards, word clouds, weekly heatmaps, and emoji usage.

---

## 🚀 Live Demo

[👉 Try the WhatsApp Chat Analyzer Live](https://whatsapp-chat-analyser-4b6ubxf63bzlvrqrw7f9va.streamlit.app/)

---

## Features

* ✅ **Overall & User Statistics**: Instant metrics for total messages, words, media shared, and links shared.
* ✅ **User Leaderboards**: Identify the most active users in group chats with activity distribution percentages.
* ✅ **Timeline Analysis**: Chronological daily and monthly message activity charts.
* ✅ **Activity Heatmaps**: Visualize peak messaging hours and busier days of the week.
* ✅ **Text Analytics**: Generate clean word clouds and rank most common words (excluding Hinglish stop words).
* ✅ **Emoji Insights**: Breakdown of top emojis used with frequency tables and pie chart visualization.
* ✅ **Chat Support**: Fully supports exported group chats and individual one-on-one chats.

---

## 🛠️ Technologies Used

* **Python 3.9+**
* **Streamlit** (Interactive Web UI Framework)
* **Pandas** (Data Manipulation & Cleaning)
* **Matplotlib & Seaborn** (Data Visualization & Heatmaps)
* **WordCloud** (Word Frequency Visualization)
* **URLExtract** (URL Detection)
* **Emoji** (Emoji Parsing & Analysis)

---

## 📊 What You Can Analyze

* **Message Volume**: Total message count, total words spoken, media count, and link counts.
* **User Participation**: Individual vs overall messaging activity.
* **Temporal Patterns**: Daily trends, monthly growth, most active day of the week, and busiest month.
* **Hourly Heatmaps**: Detailed breakdown of messaging activity across 24-hour periods.
* **Vocabulary & Emojis**: Top used words, custom word clouds, and emoji distribution metrics.

---

## ⚙️ How to Run Locally

### 1. Clone the Repository

```bash
git clone https://github.com/saumyap48/Whatsapp-Chat-Analyser.git
cd Whatsapp-Chat-Analyser
```

### 2. Install Dependencies

```bash
pip install -r requirements.txt
```

### 3. Run the Streamlit Application

```bash
streamlit run app.py
```

The application will open automatically in your browser at `http://localhost:8501`.

---

## 📱 How to Use

1. Open WhatsApp on your mobile device.
2. Select any chat (Individual or Group) -> Tap **More Options** -> **Export Chat**.
3. Select **Without Media** to export a `.txt` file.
4. Open the live app or local server.
5. Upload your `.txt` file in the sidebar.
6. Select **Overall** or a specific user and click **Show Analysis**.

---

## 🌐 Deployment

This project is configured for deployment on **Streamlit Community Cloud**.

* **Repository**: `saumyap48/Whatsapp-Chat-Analyser`
* **Main File Path**: `app.py`
* **Live Application**: [https://whatsapp-chat-analyser-4b6ubxf63bzlvrqrw7f9va.streamlit.app/](https://whatsapp-chat-analyser-4b6ubxf63bzlvrqrw7f9va.streamlit.app/)

---

## 👩‍💻 Author

**Saumya Pandey**

* GitHub: [@saumyap48](https://github.com/saumyap48)

---

## ⭐ Support

If you find this project useful, please consider giving the repository a ⭐ on GitHub!
