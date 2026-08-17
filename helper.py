import os
from urlextract import URLExtract
from wordcloud import WordCloud
import pandas as pd
from collections import Counter
import emoji

extract = URLExtract()

def fetch_stats(selected_user, df):
    if selected_user != 'Overall':
        df = df[df['user'] == selected_user]

    num_messages = df.shape[0]

    words = []
    for message in df['message']:
        words.extend(str(message).split())

    num_media_messages = df[df['message'].astype(str).str.contains('<Media omitted>|Media omitted|omitted', case=False, na=False)].shape[0]

    links = []
    for message in df['message']:
        links.extend(extract.find_urls(str(message)))

    return num_messages, len(words), num_media_messages, len(links)

def most_busy_users(df):
    x = df['user'].value_counts().head()
    # Pandas 1.x & 2.x safe percent calculation
    user_counts = df['user'].value_counts()
    total_count = df.shape[0] if df.shape[0] > 0 else 1
    df_percent = round((user_counts / total_count) * 100, 2).reset_index()
    df_percent.columns = ['name', 'percent']
    return x, df_percent

def create_wordcloud(selected_user, df):
    stop_words_path = os.path.join(os.path.dirname(__file__), 'stop_hinglish.txt')
    stop_words = ""
    if os.path.exists(stop_words_path):
        with open(stop_words_path, 'r', encoding='utf-8', errors='ignore') as f:
            stop_words = f.read()

    if selected_user != 'Overall':
        df = df[df['user'] == selected_user]

    temp = df[df['user'] != 'group_notification']
    temp = temp[~temp['message'].astype(str).str.contains('<Media omitted>|Media omitted|omitted', case=False, na=False)]

    def remove_stop_words(message):
        y = []
        for word in str(message).lower().split():
            if word not in stop_words:
                y.append(word)
        return " ".join(y)

    wc = WordCloud(width=500, height=500, min_font_size=10, background_color='white')
    temp['message'] = temp['message'].apply(remove_stop_words)
    
    text_content = temp['message'].str.cat(sep=" ").strip()
    if not text_content:
        text_content = "NoWordsFound"

    df_wc = wc.generate(text_content)
    return df_wc

def most_common_words(selected_user, df):
    stop_words_path = os.path.join(os.path.dirname(__file__), 'stop_hinglish.txt')
    stop_words = ""
    if os.path.exists(stop_words_path):
        with open(stop_words_path, 'r', encoding='utf-8', errors='ignore') as f:
            stop_words = f.read()

    if selected_user != 'Overall':
        df = df[df['user'] == selected_user]

    temp = df[df['user'] != 'group_notification']
    temp = temp[~temp['message'].astype(str).str.contains('<Media omitted>|Media omitted|omitted', case=False, na=False)]

    words = []
    for message in temp['message']:
        for word in str(message).lower().split():
            if word not in stop_words and len(word) > 1:
                words.append(word)

    if not words:
        return pd.DataFrame(columns=[0, 1])

    most_common_df = pd.DataFrame(Counter(words).most_common(20))
    return most_common_df

def emoji_helper(selected_user, df):
    if selected_user != 'Overall':
        df = df[df['user'] == selected_user]

    emojis = []
    for message in df['message']:
        emojis.extend([c for c in str(message) if emoji.is_emoji(c)])

    if not emojis:
        return pd.DataFrame(columns=[0, 1])

    emoji_df = pd.DataFrame(Counter(emojis).most_common(len(Counter(emojis))))
    return emoji_df

def monthly_timeline(selected_user, df):
    if selected_user != 'Overall':
        df = df[df['user'] == selected_user]

    timeline = df.groupby(['year', 'month_num', 'month']).count()['message'].reset_index()

    time = []
    for i in range(timeline.shape[0]):
        time.append(timeline['month'][i] + "-" + str(timeline['year'][i]))

    timeline['time'] = time
    return timeline

def daily_timeline(selected_user, df):
    if selected_user != 'Overall':
        df = df[df['user'] == selected_user]

    daily_timeline = df.groupby('only_date').count()['message'].reset_index()
    return daily_timeline

def week_activity_map(selected_user, df):
    if selected_user != 'Overall':
        df = df[df['user'] == selected_user]

    return df['day_name'].value_counts()

def month_activity_map(selected_user, df):
    if selected_user != 'Overall':
        df = df[df['user'] == selected_user]

    return df['month'].value_counts()

def activity_heatmap(selected_user, df):
    if selected_user != 'Overall':
        df = df[df['user'] == selected_user]

    days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    periods = [
        '00-01', '01-02', '02-03', '03-04', '04-05', '05-06', '06-07', '07-08',
        '08-09', '09-10', '10-11', '11-12', '12-13', '13-14', '14-15', '15-16',
        '16-17', '17-18', '18-19', '19-20', '20-21', '21-22', '22-23', '23-00'
    ]

    heatmap = df.pivot_table(index='day_name', columns='period', values='message', aggfunc='count').fillna(0)
    heatmap = heatmap.reindex(index=days, columns=periods, fill_value=0)

    return heatmap
