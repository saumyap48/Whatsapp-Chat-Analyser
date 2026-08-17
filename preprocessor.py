import re
import pandas as pd

def preprocess(data):
    """
    Parses exported WhatsApp chat text files into a cleaned Pandas DataFrame.
    Supports both 12-hour (with AM/PM) and 24-hour formats across standard Android/iOS export formats.
    """
    if not data or not isinstance(data, str):
        return pd.DataFrame(columns=[
            'date', 'user', 'message', 'only_date', 'year', 'month_num',
            'month', 'day', 'day_name', 'hour', 'minute', 'period'
        ])

    # Regex patterns for common WhatsApp export date/time formats
    # 12-hr format: 15/09/20, 11:20 pm -  or 15/09/2020, 11:20:49 PM - 
    pattern_12hr = r'\d{1,2}/\d{1,2}/\d{2,4},\s\d{1,2}:\d{2}(?::\d{2})?\s?[aApP][mM]\s-\s'
    
    # 24-hr format: 15/09/20, 23:20 -  or 15/09/2020, 23:20:49 - 
    pattern_24hr = r'\d{1,2}/\d{1,2}/\d{2,4},\s\d{1,2}:\d{2}(?::\d{2})?\s-\s'
    
    # iOS bracketed 12-hr format: [15/09/20, 11:20:49 PM] 
    pattern_ios_12hr = r'\[\d{1,2}/\d{1,2}/\d{2,4},\s\d{1,2}:\d{2}(?::\d{2})?\s?[aApP][mM]\]\s'
    
    # iOS bracketed 24-hr format: [15/09/20, 23:20:49] 
    pattern_ios_24hr = r'\[\d{1,2}/\d{1,2}/\d{2,4},\s\d{1,2}:\d{2}(?::\d{2})?\]\s'
    
    # Dot separator 12-hr format: 15.09.20, 11:20 pm - 
    pattern_dot_12hr = r'\d{1,2}\.\d{1,2}\.\d{2,4},\s\d{1,2}:\d{2}(?::\d{2})?\s?[aApP][mM]\s-\s'

    # Dot separator 24-hr format: 15.09.20, 23:20 - 
    pattern_dot_24hr = r'\d{1,2}\.\d{1,2}\.\d{2,4},\s\d{1,2}:\d{2}(?::\d{2})?\s-\s'

    patterns = [
        pattern_12hr,
        pattern_24hr,
        pattern_ios_12hr,
        pattern_ios_24hr,
        pattern_dot_12hr,
        pattern_dot_24hr
    ]

    dates = []
    messages = []

    for pattern in patterns:
        found_dates = re.findall(pattern, data)
        if len(found_dates) > 0:
            dates = found_dates
            messages = re.split(pattern, data)[1:]
            break

    if not dates or not messages:
        # Fallback to general regex format split if pattern matching didn't yield results
        fallback_pattern = r'\d{1,2}/\d{1,2}/\d{2,4},\s\d{1,2}:\d{2}\s?(?:am|pm|AM|PM)\s-\s'
        messages = re.split(fallback_pattern, data)[1:]
        dates = re.findall(fallback_pattern, data)

    if not dates or not messages or len(dates) != len(messages):
        return pd.DataFrame(columns=[
            'date', 'user', 'message', 'only_date', 'year', 'month_num',
            'month', 'day', 'day_name', 'hour', 'minute', 'period'
        ])

    df = pd.DataFrame({'user_message': messages, 'message_date': dates})

    # Clean date strings before conversion
    cleaned_dates = df['message_date'].astype(str).str.strip('[] -')
    
    df['date'] = pd.to_datetime(cleaned_dates, errors='coerce', format='mixed')

    # Filter out empty or unparseable date rows
    df = df.dropna(subset=['date'])
    if df.empty:
        return pd.DataFrame(columns=[
            'date', 'user', 'message', 'only_date', 'year', 'month_num',
            'month', 'day', 'day_name', 'hour', 'minute', 'period'
        ])

    users = []
    parsed_messages = []

    for message in df['user_message']:
        entry = re.split(r'([\w\W]+?):\s', message, maxsplit=1)
        if len(entry) > 1:
            users.append(entry[1].strip())
            parsed_messages.append(entry[2])
        else:
            users.append('group_notification')
            parsed_messages.append(entry[0])

    df['user'] = users
    df['message'] = parsed_messages
    df.drop(columns=['user_message', 'message_date'], inplace=True, errors='ignore')

    df['only_date'] = df['date'].dt.date
    df['year'] = df['date'].dt.year
    df['month_num'] = df['date'].dt.month
    df['month'] = df['date'].dt.month_name()
    df['day'] = df['date'].dt.day
    df['day_name'] = df['date'].dt.day_name()
    df['hour'] = df['date'].dt.hour
    df['minute'] = df['date'].dt.minute

    period = []
    for hour in df['hour']:
        if hour == 23:
            period.append("23-00")
        elif hour == 0:
            period.append("00-01")
        else:
            period.append(f"{hour:02d}-{(hour+1):02d}")
    df['period'] = period

    return df
