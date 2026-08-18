import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  MessageSquare,
  FileText,
  Image,
  Link2,
  Users,
  Calendar,
  Clock,
  ArrowLeft,
  RefreshCw,
  Sparkles,
} from 'lucide-react';
import api from '../api/api';
import StatCard from '../components/StatCard';
import UserFilter from '../components/UserFilter';
import LoadingState from '../components/LoadingState';
import ErrorState from '../components/ErrorState';
import MonthlyTimelineChart from '../charts/MonthlyTimelineChart';
import DailyTimelineChart from '../charts/DailyTimelineChart';
import ActivityHeatmap from '../charts/ActivityHeatmap';
import UserLeaderboardChart from '../charts/UserLeaderboardChart';
import EmojiAnalysisSection from '../charts/EmojiAnalysisSection';
import WordFrequencyChart from '../charts/WordFrequencyChart';
import WordCloudView from '../charts/WordCloudView';

export const DashboardPage = () => {
  const { analysisId } = useParams();
  const [selectedUser, setSelectedUser] = useState('Overall');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const fetchAnalytics = async (userToFetch = selectedUser) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.getFullAnalytics(analysisId, userToFetch);
      setData(response);
    } catch (err) {
      console.error('Failed to load analytics:', err);
      const detail = err.response?.data?.detail || err.message || 'Unable to retrieve chat analysis data.';
      setError(detail);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (analysisId) {
      fetchAnalytics(selectedUser);
    }
  }, [analysisId, selectedUser]);

  if (loading && !data) {
    return <LoadingState message="Processing WhatsApp Chat Insights..." />;
  }

  if (error) {
    return <ErrorState message={error} onRetry={() => fetchAnalytics(selectedUser)} />;
  }

  if (!data) {
    return <ErrorState message="No data received for this analysis." />;
  }

  const { overview, users = [], monthly_timeline, daily_timeline, activity, heatmap, words, emojis } = data;

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {/* Dashboard Top Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '16px',
        paddingBottom: '16px',
        borderBottom: '1px solid var(--border-subtle)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <Link
            to="/"
            style={{
              padding: '8px 12px',
              background: 'var(--bg-card-subtle)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-sm)',
              color: 'var(--text-main)',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.86rem',
              fontWeight: 600,
            }}
          >
            <ArrowLeft size={16} />
            <span>Upload New</span>
          </Link>

          <div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.02em' }}>
              Conversation Dashboard
            </h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              <span>Filtering: <strong style={{ color: 'var(--primary)' }}>{selectedUser}</strong></span>
              <span>•</span>
              <span style={{ color: 'var(--secondary)' }}>{overview.total_messages.toLocaleString()} messages analyzed</span>
            </div>
          </div>
        </div>

        {/* User Filter Dropdown */}
        <UserFilter
          users={users}
          selectedUser={selectedUser}
          onSelectUser={(newVal) => setSelectedUser(newVal)}
        />
      </div>

      {/* Overview Stat Cards Grid */}
      <div className="grid-5">
        <StatCard
          title="Total Messages"
          value={overview.total_messages}
          icon={MessageSquare}
          color="var(--primary)"
          subtitle={selectedUser === 'Overall' ? 'Across all members' : `Sent by ${selectedUser}`}
        />
        <StatCard
          title="Total Words"
          value={overview.total_words}
          icon={FileText}
          color="var(--secondary)"
          subtitle="Total vocabulary volume"
        />
        <StatCard
          title="Media Shared"
          value={overview.media_shared}
          icon={Image}
          color="var(--accent-amber)"
          subtitle="Photos, videos, audio & docs"
        />
        <StatCard
          title="Links Shared"
          value={overview.links_shared}
          icon={Link2}
          color="var(--accent-purple)"
          subtitle="Web URLs and hyperlinks"
        />
        <StatCard
          title="Chat Members"
          value={overview.total_users}
          icon={Users}
          color="var(--accent-rose)"
          subtitle="Identified participants"
        />
      </div>

      {/* Member Leaderboard (Shown in Overall mode) */}
      {selectedUser === 'Overall' && (
        <UserLeaderboardChart
          users={users}
          selectedUser={selectedUser}
          onSelectUser={(username) => setSelectedUser(username)}
        />
      )}

      {/* Timelines Section */}
      <div className="grid-2">
        <MonthlyTimelineChart data={monthly_timeline} />
        <DailyTimelineChart data={daily_timeline} />
      </div>

      {/* Activity Section: Heatmap + Peak Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <ActivityHeatmap heatmapData={heatmap} />

        {/* Peak Activity Badges */}
        <div className="grid-2">
          <div className="glass-card" style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{
              width: '46px',
              height: '46px',
              borderRadius: '12px',
              background: 'rgba(37, 211, 102, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--primary)',
            }}>
              <Calendar size={24} />
            </div>
            <div>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>Busiest Day of the Week</span>
              <h4 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)' }}>
                {activity.busiest_day || 'N/A'}
              </h4>
            </div>
          </div>

          <div className="glass-card" style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{
              width: '46px',
              height: '46px',
              borderRadius: '12px',
              background: 'rgba(52, 183, 241, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--secondary)',
            }}>
              <Clock size={24} />
            </div>
            <div>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>Busiest Month of the Year</span>
              <h4 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)' }}>
                {activity.busiest_month || 'N/A'}
              </h4>
            </div>
          </div>
        </div>
      </div>

      {/* Vocabulary Section: Word Frequency & Word Cloud */}
      <div className="grid-2">
        <WordFrequencyChart words={words.common_words} />
        <WordCloudView words={words.word_cloud} />
      </div>

      {/* Emoji Analysis Section */}
      <EmojiAnalysisSection emojiData={emojis} />
    </div>
  );
};

export default DashboardPage;
