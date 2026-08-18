from typing import Dict, Any, List, Optional
import pandas as pd
from .word_service import extract_word_analytics
from .emoji_service import extract_emoji_analytics

DAYS_ORDER = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
MONTHS_ORDER = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
]
PERIODS_ORDER = [
    '00-01', '01-02', '02-03', '03-04', '04-05', '05-06', '06-07', '07-08',
    '08-09', '09-10', '10-11', '11-12', '12-13', '13-14', '14-15', '15-16',
    '16-17', '17-18', '18-19', '19-20', '20-21', '21-22', '22-23', '23-00'
]


def calculate_overview_stats(df: pd.DataFrame, selected_user: str = "Overall") -> Dict[str, Any]:
    """Calculates total messages, word count, media count, links count, and total users."""
    if df.empty:
        return {
            "total_messages": 0,
            "total_words": 0,
            "media_shared": 0,
            "links_shared": 0,
            "total_users": 0,
            "selected_user": selected_user
        }

    working_df = df.copy()
    if selected_user != "Overall":
        working_df = working_df[working_df["user"] == selected_user]

    total_messages = len(working_df)
    
    words_count = 0
    for message in working_df["message"]:
        words_count += len(str(message).split())

    media_shared = int(working_df["has_media"].sum()) if "has_media" in working_df else 0
    links_shared = int(working_df["has_link"].sum()) if "has_link" in working_df else 0

    valid_users = df[df["user"] != "group_notification"]["user"].unique()
    total_users = len(valid_users)

    return {
        "total_messages": total_messages,
        "total_words": words_count,
        "media_shared": media_shared,
        "links_shared": links_shared,
        "total_users": total_users,
        "selected_user": selected_user
    }


def calculate_user_analytics(df: pd.DataFrame) -> List[Dict[str, Any]]:
    """Calculates per-user message counts and percentage distribution for all participants."""
    if df.empty:
        return []

    # Exclude system messages
    user_df = df[df["user"] != "group_notification"]
    if user_df.empty:
        return []

    user_counts = user_df["user"].value_counts()
    total_valid_messages = len(user_df)

    users_list = []
    for username, count in user_counts.items():
        percentage = round((count / total_valid_messages) * 100, 2) if total_valid_messages > 0 else 0.0
        users_list.append({
            "id": None,  # Populated from DB or caller
            "username": username,
            "message_count": int(count),
            "percentage": percentage
        })

    return users_list


def calculate_monthly_timeline(df: pd.DataFrame, selected_user: str = "Overall") -> List[Dict[str, Any]]:
    """Generates chronologically ordered monthly message counts."""
    if df.empty:
        return []

    working_df = df.copy()
    if selected_user != "Overall":
        working_df = working_df[working_df["user"] == selected_user]

    if working_df.empty:
        return []

    timeline = working_df.groupby(['year', 'month_num', 'month']).size().reset_index(name='message')
    timeline = timeline.sort_values(by=['year', 'month_num'])

    result = []
    for _, row in timeline.iterrows():
        result.append({
            "time": f"{row['month'][:3]} {row['year']}",
            "message": int(row['message'])
        })

    return result


def calculate_daily_timeline(df: pd.DataFrame, selected_user: str = "Overall") -> List[Dict[str, Any]]:
    """Generates daily message volume trend points."""
    if df.empty:
        return []

    working_df = df.copy()
    if selected_user != "Overall":
        working_df = working_df[working_df["user"] == selected_user]

    if working_df.empty:
        return []

    daily = working_df.groupby('only_date').size().reset_index(name='message')
    daily = daily.sort_values(by='only_date')

    result = []
    for _, row in daily.iterrows():
        result.append({
            "only_date": str(row['only_date']),
            "message": int(row['message'])
        })

    return result


def calculate_activity_stats(df: pd.DataFrame, selected_user: str = "Overall") -> Dict[str, Any]:
    """Computes day-of-week and month-of-year activity distribution and peak times."""
    if df.empty:
        return {
            "busy_days": [],
            "busy_months": [],
            "busiest_day": None,
            "busiest_month": None
        }

    working_df = df.copy()
    if selected_user != "Overall":
        working_df = working_df[working_df["user"] == selected_user]

    if working_df.empty:
        return {
            "busy_days": [],
            "busy_months": [],
            "busiest_day": None,
            "busiest_month": None
        }

    # Day activity
    day_counts = working_df["day_name"].value_counts().to_dict()
    busy_days = [{"day": d, "count": int(day_counts.get(d, 0))} for d in DAYS_ORDER]
    busiest_day = max(busy_days, key=lambda x: x["count"])["day"] if busy_days else None

    # Month activity
    month_counts = working_df["month"].value_counts().to_dict()
    busy_months = [{"month": m, "count": int(month_counts.get(m, 0))} for m in MONTHS_ORDER if m in month_counts]
    busiest_month = max(busy_months, key=lambda x: x["count"])["month"] if busy_months else None

    return {
        "busy_days": busy_days,
        "busy_months": busy_months,
        "busiest_day": busiest_day,
        "busiest_month": busiest_month
    }


def calculate_heatmap(df: pd.DataFrame, selected_user: str = "Overall") -> Dict[str, Any]:
    """Generates Day × Hour activity matrix for weekly heatmap display."""
    if df.empty:
        return {
            "days": DAYS_ORDER,
            "periods": PERIODS_ORDER,
            "matrix": [[0] * len(PERIODS_ORDER) for _ in DAYS_ORDER],
            "cells": []
        }

    working_df = df.copy()
    if selected_user != "Overall":
        working_df = working_df[working_df["user"] == selected_user]

    if working_df.empty:
        return {
            "days": DAYS_ORDER,
            "periods": PERIODS_ORDER,
            "matrix": [[0] * len(PERIODS_ORDER) for _ in DAYS_ORDER],
            "cells": []
        }

    pivot = working_df.pivot_table(index='day_name', columns='period', values='message', aggfunc='count').fillna(0)
    pivot = pivot.reindex(index=DAYS_ORDER, columns=PERIODS_ORDER, fill_value=0)

    matrix = []
    cells = []
    for day in DAYS_ORDER:
        row_vals = []
        for period in PERIODS_ORDER:
            val = int(pivot.loc[day, period]) if day in pivot.index and period in pivot.columns else 0
            row_vals.append(val)
            cells.append({
                "day": day,
                "period": period,
                "count": val
            })
        matrix.append(row_vals)

    return {
        "days": DAYS_ORDER,
        "periods": PERIODS_ORDER,
        "matrix": matrix,
        "cells": cells
    }


def get_full_analytics(df: pd.DataFrame, selected_user: str = "Overall") -> Dict[str, Any]:
    """Computes all analytics components in one call for seamless frontend hydration."""
    overview = calculate_overview_stats(df, selected_user)
    users = calculate_user_analytics(df)
    monthly_tl = calculate_monthly_timeline(df, selected_user)
    daily_tl = calculate_daily_timeline(df, selected_user)
    activity = calculate_activity_stats(df, selected_user)
    heatmap = calculate_heatmap(df, selected_user)
    common_words, word_cloud = extract_word_analytics(df, selected_user)
    tot_emojis, uniq_emojis, emoji_list = extract_emoji_analytics(df, selected_user)

    return {
        "overview": overview,
        "users": users,
        "monthly_timeline": monthly_tl,
        "daily_timeline": daily_tl,
        "activity": activity,
        "heatmap": heatmap,
        "words": {
            "common_words": common_words,
            "word_cloud": word_cloud
        },
        "emojis": {
            "total_emojis": tot_emojis,
            "unique_emojis": uniq_emojis,
            "emojis": emoji_list
        }
    }
