from collections import Counter
from typing import List, Dict, Any, Tuple
import pandas as pd
import emoji


def extract_emoji_analytics(df: pd.DataFrame, selected_user: str = "Overall", top_n: int = 20) -> Tuple[int, int, List[Dict[str, Any]]]:
    """
    Extracts emojis from chat messages, counting overall occurrences and ranking top emojis.
    """
    if df.empty:
        return 0, 0, []

    working_df = df.copy()

    if selected_user != "Overall":
        working_df = working_df[working_df["user"] == selected_user]

    # Filter out system notifications
    working_df = working_df[working_df["user"] != "group_notification"]

    emojis_list: List[str] = []

    for message in working_df["message"]:
        msg_str = str(message)
        # emoji.emoji_list extracts all emoji characters with metadata
        extracted = emoji.emoji_list(msg_str)
        for item in extracted:
            emojis_list.append(item['emoji'])

    total_emojis = len(emojis_list)
    if total_emojis == 0:
        return 0, 0, []

    counter = Counter(emojis_list)
    unique_emojis = len(counter)

    top_emojis = counter.most_common(top_n)

    result: List[Dict[str, Any]] = []
    for em, count in top_emojis:
        percentage = round((count / total_emojis) * 100, 2)
        result.append({
            "emoji": em,
            "count": count,
            "percentage": percentage
        })

    return total_emojis, unique_emojis, result
