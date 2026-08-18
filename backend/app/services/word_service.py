import os
import re
from collections import Counter
from typing import List, Dict, Tuple, Any
import pandas as pd

STOPWORDS_PATH = os.path.join(os.path.dirname(__file__), "..", "data", "stop_hinglish.txt")

def get_stop_words() -> set:
    if os.path.exists(STOPWORDS_PATH):
        with open(STOPWORDS_PATH, "r", encoding="utf-8", errors="ignore") as f:
            return set(f.read().lower().split())
    return set()

STOP_WORDS = get_stop_words()

MEDIA_PATTERN = r'<Media omitted>|Media omitted|omitted|image omitted|video omitted|audio omitted|sticker omitted|document omitted'


def extract_word_analytics(df: pd.DataFrame, selected_user: str = "Overall", top_n: int = 25) -> Tuple[List[Dict[str, Any]], List[Dict[str, Any]]]:
    """
    Computes top common words and word cloud distribution points.
    Filters out system messages, media strings, URLs, numbers, punctuation, and stop words.
    """
    if df.empty:
        return [], []

    working_df = df.copy()

    if selected_user != "Overall":
        working_df = working_df[working_df["user"] == selected_user]

    # Filter out system notifications
    working_df = working_df[working_df["user"] != "group_notification"]
    working_df = working_df[working_df["is_system"] == False]

    # Filter out media placeholders
    working_df = working_df[~working_df["message"].astype(str).str.contains(MEDIA_PATTERN, case=False, na=False)]

    words: List[str] = []
    url_pattern = re.compile(r'https?://\S+|www\.\S+')

    for message in working_df["message"]:
        # Strip URLs
        cleaned_msg = url_pattern.sub('', str(message))
        # Keep alphanumeric words
        tokens = re.findall(r'\b[a-zA-Z\u0900-\u097F]{2,}\b', cleaned_msg.lower())
        for token in tokens:
            if token not in STOP_WORDS and len(token) > 2:
                words.append(token)

    if not words:
        return [], []

    counter = Counter(words)
    most_common = counter.most_common(top_n)

    common_words_data = [{"word": w, "count": c} for w, c in most_common]

    # Word cloud data (top 60 words formatted as text & value)
    word_cloud_items = counter.most_common(60)
    word_cloud_data = [{"text": w, "value": c} for w, c in word_cloud_items]

    return common_words_data, word_cloud_data
