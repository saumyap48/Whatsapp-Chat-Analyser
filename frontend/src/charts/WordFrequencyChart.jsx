import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import EmptyState from '../components/EmptyState';

export const WordFrequencyChart = ({ words = [] }) => {
  if (!words || words.length === 0) {
    return <EmptyState title="No Common Words" message="No meaningful words detected after stop word filtering." />;
  }

  const data = words.slice(0, 15);

  return (
    <div className="glass-card" style={{ padding: '24px' }}>
      <div style={{ marginBottom: '18px' }}>
        <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '8px' }}>
          🔤 Most Common Words
        </h3>
        <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
          Top ranked vocabulary terms with Hinglish & common stop words filtered out
        </p>
      </div>

      <div style={{ width: '100%', height: '320px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ top: 5, right: 20, left: 30, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(134, 150, 160, 0.12)" horizontal={false} />
            <XAxis type="number" stroke="var(--text-dim)" fontSize={11} tickLine={false} />
            <YAxis
              type="category"
              dataKey="word"
              stroke="var(--text-muted)"
              fontSize={11}
              tickLine={false}
              width={75}
            />
            <Tooltip
              formatter={(val) => [`${val.toLocaleString()} mentions`, 'Occurrences']}
              contentStyle={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-sm)',
              }}
            />
            <Bar dataKey="count" fill="var(--primary-dark)" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default WordFrequencyChart;
