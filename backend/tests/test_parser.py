import pytest
from app.services.parser import parse_whatsapp_text


def test_parse_12hr_format():
    sample = """12/05/2024, 10:35 pm - Alice: Hey everyone! How are you?
12/05/2024, 10:36 pm - Bob: Doing great, check this https://example.com
12/05/2024, 10:37 pm - Alice: <Media omitted>
"""
    df = parse_whatsapp_text(sample)
    assert len(df) == 3
    assert set(df["user"]) == {"Alice", "Bob"}
    assert df.iloc[0]["message"] == "Hey everyone! How are you?"
    assert df.iloc[1]["has_link"] == True
    assert df.iloc[2]["has_media"] == True


def test_parse_24hr_format():
    sample = """12/05/2024, 22:35 - Alice: Hello there!
12/05/2024, 22:36 - Bob: General Kenobi! 😄
"""
    df = parse_whatsapp_text(sample)
    assert len(df) == 2
    assert df.iloc[0]["user"] == "Alice"
    assert df.iloc[1]["user"] == "Bob"


def test_parse_ios_bracketed_format():
    sample = """[12/05/24, 10:35:12 PM] Alice: First message from iPhone
[12/05/24, 10:36:00 PM] Bob: Second message 👍
"""
    df = parse_whatsapp_text(sample)
    assert len(df) == 2
    assert df.iloc[0]["user"] == "Alice"
    assert df.iloc[1]["user"] == "Bob"


def test_parse_multiline_messages():
    sample = """12/05/2024, 10:35 pm - Alice: Line 1 of message
Line 2 of message
Line 3 of message
12/05/2024, 10:36 pm - Bob: Short response
"""
    df = parse_whatsapp_text(sample)
    assert len(df) == 2
    assert "Line 1 of message\nLine 2 of message\nLine 3 of message" in df.iloc[0]["message"]
    assert df.iloc[1]["user"] == "Bob"


def test_parse_dot_and_hyphen_separators():
    sample_dot = """12.05.2024, 10:35 pm - Alice: Dot formatted date
12.05.2024, 10:36 pm - Bob: Acknowledged
"""
    df_dot = parse_whatsapp_text(sample_dot)
    assert len(df_dot) == 2

    sample_hyphen = """12-05-2024, 10:35 pm - Alice: Hyphen formatted date
12-05-2024, 10:36 pm - Bob: Acknowledged
"""
    df_hyphen = parse_whatsapp_text(sample_hyphen)
    assert len(df_hyphen) == 2


def test_parse_unicode_hindi_and_special_spaces():
    # iOS timestamps often contain \u202f (narrow no-break space)
    sample_ios_special = "[12/05/24,\u202f10:35:12\u202fPM] Alice: नमस्ते दुनिया! कैसे हैं आप? 🙏\n[12/05/24,\u202f10:36:00\u202fPM] Bob: सब बढ़िया है!\n"
    df = parse_whatsapp_text(sample_ios_special)
    assert len(df) == 2
    assert "नमस्ते" in df.iloc[0]["message"]
    assert df.iloc[0]["user"] == "Alice"


def test_parse_empty_and_invalid():
    assert parse_whatsapp_text("").empty
    assert parse_whatsapp_text("Just some random plain text").empty
    assert parse_whatsapp_text("No dates here at all").empty
