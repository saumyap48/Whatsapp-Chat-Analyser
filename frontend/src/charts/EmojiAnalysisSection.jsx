import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import EmptyState from '../components/EmptyState';

const EMOJI_COLORS = ['#FFB703', '#FF5A5F', '#25D366', '#34B7F1', '#8338EC', '#FB5607', '#06D6A0'];

export const EmojiAnalysisSection = ({ emojiData }) => {
  if (!emojiData || !emojiData.emojis || emojiData.emojis.length === 0) {
    return (
      <div className="glass-card" style={{ padding: '24px' }}>
        <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '8px' }}>
          😂 Emoji Sentiment & Analytics
        </h3>
        <EmptyState title="No Emojis Found" message="No emojis were detected in the analyzed messages." />
      </div>
    );
  }

  const { total_emojis = 0, unique_emojis = 0, emojis = [] } = emojiData;
  const topForPie = emojis.slice(0, 6).map((e) => ({
    name: `${e.emoji} (${e.count})`,
    value: e.count,
    emoji: e.emoji,
    percentage: e.percentage,
  }));

  return (
    <div className="glass-card" style={{ padding: '24px' }}>
      <div style={{ marginBottom: '18px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            😂 Emoji Sentiment & Analytics
          </h3>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
            Most frequently used emojis with share distribution
          </p>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <div style={{ padding: '6px 12px', background: 'var(--bg-card-subtle)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', fontSize: '0.8rem' }}>
            <span style={{ color: 'var(--text-muted)' }}>Total Emojis: </span>
            <strong style={{ color: 'var(--text-main)' }}>{total_emojis.toLocaleString()}</strong>
          </div>
          <div style={{ padding: '6px 12px', background: 'var(--bg-card-subtle)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', fontSize: '0.8rem' }}>
            <span style={{ color: 'var(--text-muted)' }}>Unique: </span>
            <strong style={{ color: 'var(--primary)' }}>{unique_emojis}</strong>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: '20px', alignItems: 'center' }}>
        {/* Pie Chart */}
        <div style={{ width: '100%', height: '260px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={topForPie}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={85}
                paddingAngle={4}
                dataKey="value"
              >
                {topForPie.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={EMOJI_COLORS[index % EMOJI_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                formatter={(val, name, props) => [
                  `${val} uses (${props.payload.percentage}%)`,
                  props.payload.emoji,
                ]}
                contentStyle={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.9rem',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Emoji Chips Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))',
          gap: '10px',
          maxHeight: '260px',
          overflowY: 'auto',
          paddingRight: '4px',
        }}>
          {emojis.slice(0, 16).map((item, idx) => (
            <div
              key={idx}
              style={{
                background: 'var(--bg-card-subtle)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-sm)',
                padding: '8px 10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '8px',
              }}
            >
              <span style={{ fontSize: '1.5rem', lineHeight: 1 }}>{item.emoji}</span>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)' }}>
                  {item.count}
                </div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                  {item.percentage}%
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmojiAnalysisSection;
