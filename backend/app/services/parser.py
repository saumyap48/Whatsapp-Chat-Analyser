import re
import pandas as pd
from typing import List
from urlextract import URLExtract

extractor = URLExtract()

# Pure non-capturing regex patterns for WhatsApp date/time headers
PATTERNS = [
    # 12-hr standard: 15/09/20, 11:20 pm - or 15/09/2020, 11:20:49 PM -
    r'\d{1,2}/\d{1,2}/\d{2,4},\s\d{1,2}:\d{2}(?::\d{2})?\s?[aApP][mM]\s-\s',
    # 24-hr standard: 15/09/20, 23:20 - or 15/09/2020, 23:20:49 -
    r'\d{1,2}/\d{1,2}/\d{2,4},\s\d{1,2}:\d{2}(?::\d{2})?\s-\s',
    # iOS bracketed 12-hr: [15/09/20, 11:20:49 PM]
    r'\[\d{1,2}/\d{1,2}/\d{2,4},\s\d{1,2}:\d{2}(?::\d{2})?\s?[aApP][mM]\]\s',
    # iOS bracketed 24-hr: [15/09/20, 23:20:49]
    r'\[\d{1,2}/\d{1,2}/\d{2,4},\s\d{1,2}:\d{2}(?::\d{2})?\]\s',
    # Dot separator 12-hr: 15.09.20, 11:20 pm -
    r'\d{1,2}\.\d{1,2}\.\d{2,4},\s\d{1,2}:\d{2}(?::\d{2})?\s?[aApP][mM]\s-\s',
    # Dot separator 24-hr: 15.09.20, 23:20 -
    r'\d{1,2}\.\d{1,2}\.\d{2,4},\s\d{1,2}:\d{2}(?::\d{2})?\s-\s',
    # Hyphen date 12-hr: 15-09-20, 11:20 pm -
    r'\d{1,2}-\d{1,2}-\d{2,4},\s\d{1,2}:\d{2}(?::\d{2})?\s?[aApP][mM]\s-\s',
    # Hyphen date 24-hr: 15-09-20, 23:20 -
    r'\d{1,2}-\d{1,2}-\d{2,4},\s\d{1,2}:\d{2}(?::\d{2})?\s-\s',
]

MEDIA_PATTERNS = r'<Media omitted>|Media omitted|omitted|image omitted|video omitted|audio omitted|sticker omitted|document omitted|Contact card omitted'


def parse_whatsapp_text(data: str) -> pd.DataFrame:
    """
    Parses raw WhatsApp chat export text into a structured DataFrame.
    Supports Android & iOS exports, 12/24-hour formats, and multiline messages.
    """
    if not data or not isinstance(data, str):
        return pd.DataFrame()

    # Normalize Unicode whitespaces (like narrow non-breaking space in iOS timestamps)
    normalized_data = data.replace('\u202f', ' ').replace('\xa0', ' ').replace('\u200e', '')

    dates: List[str] = []
    raw_messages: List[str] = []

    for pattern in PATTERNS:
        found_dates = re.findall(pattern, normalized_data)
        if len(found_dates) > 0:
            dates = found_dates
            # Since pattern has no capturing groups, re.split gives [before_first, msg1, msg2, ...]
            split_parts = re.split(pattern, normalized_data)
            raw_messages = split_parts[1:]
            break

    if not dates or not raw_messages or len(dates) != len(raw_messages):
        return pd.DataFrame()

    # Clean date strings
    cleaned_dates = [d.strip('[] - \t\r\n') for d in dates]

    df = pd.DataFrame({
        'raw_date': cleaned_dates,
        'raw_message': raw_messages
    })

    # Parse timestamps with mixed formats
    df['date'] = pd.to_datetime(df['raw_date'], errors='coerce', format='mixed')
    df = df.dropna(subset=['date'])

    if df.empty:
        return pd.DataFrame()

    users = []
    messages = []
    is_system_list = []
    has_media_list = []
    has_link_list = []

    for raw_msg in df['raw_message']:
        msg_str = raw_msg.strip()
        # Split on user: message
        entry = re.split(r'([\w\W]+?):\s', msg_str, maxsplit=1)
        if len(entry) > 1:
            user = entry[1].strip()
            text = entry[2].strip()
            is_sys = False
        else:
            user = 'group_notification'
            text = entry[0].strip()
            is_sys = True

        users.append(user)
        messages.append(text)
        is_system_list.append(is_sys)

        # Detect media
        has_media = bool(re.search(MEDIA_PATTERNS, text, re.IGNORECASE))
        has_media_list.append(has_media)

        # Detect links
        found_links = extractor.find_urls(text)
        has_link_list.append(len(found_links) > 0)

    df['user'] = users
    df['message'] = messages
    df['is_system'] = is_system_list
    df['has_media'] = has_media_list
    df['has_link'] = has_link_list

    # Date / Time derived attributes
    df['only_date'] = df['date'].dt.date.astype(str)
    df['year'] = df['date'].dt.year
    df['month_num'] = df['date'].dt.month
    df['month'] = df['date'].dt.month_name()
    df['day'] = df['date'].dt.day
    df['day_name'] = df['date'].dt.day_name()
    df['hour'] = df['date'].dt.hour
    df['minute'] = df['date'].dt.minute

    # Period generation
    periods = []
    for hour in df['hour']:
        if hour == 23:
            periods.append("23-00")
        elif hour == 0:
            periods.append("00-01")
        else:
            periods.append(f"{hour:02d}-{(hour+1):02d}")
    df['period'] = periods

    return df
