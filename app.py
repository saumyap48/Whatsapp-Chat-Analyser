import streamlit as st
import preprocessor
import helper
import matplotlib.pyplot as plt
import seaborn as sns

st.set_page_config(
    page_title="WhatsApp Chat Analyzer",
    page_icon="💬",
    layout="wide",
    initial_sidebar_state="expanded"
)

# Custom Styling for WhatsApp Accent
st.markdown("""
    <style>
    .main-title {
        color: #075E54;
        font-size: 2.2rem;
        font-weight: 700;
        margin-bottom: 0.5rem;
    }
    .sub-text {
        color: #546E7A;
        font-size: 1.05rem;
        margin-bottom: 1.5rem;
    }
    div[data-testid="stMetricValue"] {
        color: #128C7E;
        font-size: 1.8rem;
        font-weight: 600;
    }
    </style>
""", unsafe_allow_html=True)

st.sidebar.title("💬 WhatsApp Chat Analyzer")

uploaded_file = st.sidebar.file_uploader("Choose a WhatsApp export file (.txt)", type=["txt"])

if uploaded_file is None:
    st.markdown('<div class="main-title">WhatsApp Chat Analyzer</div>', unsafe_allow_html=True)
    st.markdown('<div class="sub-text">Gain instant insights, timelines, activity patterns, word clouds, and emoji stats from your exported WhatsApp chats.</div>', unsafe_allow_html=True)

    st.info("👈 **Get Started**: Upload your exported WhatsApp chat `.txt` file using the sidebar on the left.")

    with st.expander("ℹ️ How to export your WhatsApp chat"):
        st.markdown("""
        1. Open any WhatsApp chat (Individual or Group) on your phone.
        2. Tap **More options** (⋮ on Android / Tap Contact/Group Name on iOS).
        3. Tap **Export Chat**.
        4. Select **Without Media**.
        5. Upload the generated `.txt` file here!
        """)

else:
    bytes_data = uploaded_file.getvalue()
    data = bytes_data.decode("utf-8", errors="ignore")

    df = preprocessor.preprocess(data)

    if df.empty:
        st.error("⚠️ Unable to parse any valid WhatsApp messages from the uploaded file. Please ensure you uploaded a standard exported WhatsApp chat `.txt` file.")
    else:
        user_list = df['user'].unique().tolist()

        if 'group_notification' in user_list:
            user_list.remove('group_notification')

        user_list.sort()
        user_list.insert(0, "Overall")

        selected_user = st.sidebar.selectbox("Show analysis wrt", user_list)

        if st.sidebar.button("Show Analysis"):
            
            # 1. Top Statistics
            st.markdown('<div class="main-title">Top Statistics</div>', unsafe_allow_html=True)
            num_messages, words, num_media_messages, num_links = helper.fetch_stats(selected_user, df)

            col1, col2, col3, col4 = st.columns(4)

            with col1:
                st.metric("Total Messages", num_messages)

            with col2:
                st.metric("Total Words", words)

            with col3:
                st.metric("Media Shared", num_media_messages)

            with col4:
                st.metric("Links Shared", num_links)

            st.divider()

            # 2. Monthly Timeline
            st.header("Monthly Timeline")
            timeline = helper.monthly_timeline(selected_user, df)
            if not timeline.empty:
                fig, ax = plt.subplots(figsize=(10, 4))
                ax.plot(timeline['time'], timeline['message'], color='#128C7E', marker='o', linewidth=2)
                plt.xticks(rotation=45, ha='right')
                plt.grid(True, linestyle='--', alpha=0.5)
                st.pyplot(fig)
            else:
                st.write("No monthly timeline data available.")

            # 3. Daily Timeline
            st.header("Daily Timeline")
            daily_timeline = helper.daily_timeline(selected_user, df)
            if not daily_timeline.empty:
                fig, ax = plt.subplots(figsize=(10, 4))
                ax.plot(daily_timeline['only_date'], daily_timeline['message'], color='#075E54', linewidth=1.5)
                plt.xticks(rotation=45, ha='right')
                plt.grid(True, linestyle='--', alpha=0.5)
                st.pyplot(fig)
            else:
                st.write("No daily timeline data available.")

            st.divider()

            # 4. Activity Maps
            st.header("Activity Map")
            col1, col2 = st.columns(2)

            with col1:
                st.subheader("Most Busy Day")
                busy_day = helper.week_activity_map(selected_user, df)
                if not busy_day.empty:
                    fig, ax = plt.subplots(figsize=(6, 4))
                    ax.bar(busy_day.index, busy_day.values, color='#25D366')
                    plt.xticks(rotation=45, ha='right')
                    st.pyplot(fig)
                else:
                    st.write("No day activity data available.")

            with col2:
                st.subheader("Most Busy Month")
                busy_month = helper.month_activity_map(selected_user, df)
                if not busy_month.empty:
                    fig, ax = plt.subplots(figsize=(6, 4))
                    ax.bar(busy_month.index, busy_month.values, color='#34B7F1')
                    plt.xticks(rotation=45, ha='right')
                    st.pyplot(fig)
                else:
                    st.write("No month activity data available.")

            # 5. Weekly Activity Heatmap
            st.header("Weekly Activity Map")
            user_heatmap = helper.activity_heatmap(selected_user, df)
            if not user_heatmap.empty:
                fig, ax = plt.subplots(figsize=(12, 5))
                sns.heatmap(user_heatmap, ax=ax, cmap="YlGnBu")
                plt.xticks(rotation=45, ha='right')
                st.pyplot(fig)
            else:
                st.write("No heatmap data available.")

            st.divider()

            # 6. Most Busy Users (Group Only)
            if selected_user == 'Overall':
                st.header("Most Busy Users")
                x, new_df = helper.most_busy_users(df)
                if not x.empty:
                    col1, col2 = st.columns(2)

                    with col1:
                        fig, ax = plt.subplots(figsize=(6, 4))
                        ax.bar(x.index, x.values, color='#E53935')
                        plt.xticks(rotation=45, ha='right')
                        st.pyplot(fig)

                    with col2:
                        st.dataframe(new_df, use_container_width=True)

            st.divider()

            # 7. WordCloud
            st.header("WordCloud")
            df_wc = helper.create_wordcloud(selected_user, df)
            fig, ax = plt.subplots(figsize=(8, 8))
            ax.imshow(df_wc)
            ax.axis("off")
            st.pyplot(fig)

            # 8. Most Common Words
            st.header("Most Common Words")
            most_common_df = helper.most_common_words(selected_user, df)
            if not most_common_df.empty:
                fig, ax = plt.subplots(figsize=(8, 6))
                ax.barh(most_common_df[0], most_common_df[1], color='#128C7E')
                ax.invert_yaxis()
                st.pyplot(fig)
            else:
                st.write("No common words found.")

            st.divider()

            # 9. Emoji Analysis
            st.header("Emoji Analysis")
            emoji_df = helper.emoji_helper(selected_user, df)

            if not emoji_df.empty:
                col1, col2 = st.columns(2)

                with col1:
                    st.dataframe(emoji_df.rename(columns={0: 'Emoji', 1: 'Count'}), use_container_width=True)

                with col2:
                    fig, ax = plt.subplots(figsize=(6, 6))
                    ax.pie(
                        emoji_df[1].head(),
                        labels=emoji_df[0].head(),
                        autopct="%0.2f%%",
                        startangle=140
                    )
                    st.pyplot(fig)
            else:
                st.write("No emojis found in messages.")
