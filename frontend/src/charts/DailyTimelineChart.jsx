import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import EmptyState from '../components/EmptyState';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border-subtle)',
        padding: '10px 14px',
        borderRadius: 'var(--radius-sm)',
        boxShadow: 'var(--shadow-md)',
      }}>
        <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Date: {label}</p>
        <p style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--secondary)' }}>
          {payload[0].value.toLocaleString()} <span style={{ fontSize: '0.8rem', fontWeight: 500, color: 'var(--text-muted)' }}>messages</span>
        </p>
      </div>
    );
  }
  return null;
};

export const DailyTimelineChart = ({ data = [] }) => {
  if (!data || data.length === 0) {
    return <EmptyState title="No Daily Timeline Data" message="Unable to extract daily timeline points for this selection." />;
  }

  return (
    <div className="glass-card" style={{ padding: '24px' }}>
      <div style={{ marginBottom: '18px' }}>
        <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '8px' }}>
          📈 Daily Message Activity
        </h3>
        <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
          High-resolution daily conversation volume fluctuations
        </p>
      </div>

      <div style={{ width: '100%', height: '320px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 20, left: -10, bottom: 25 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(134, 150, 160, 0.12)" />
            <XAxis
              dataKey="only_date"
              stroke="var(--text-dim)"
              fontSize={11}
              tickLine={false}
              angle={-25}
              textAnchor="end"
              minTickGap={20}
            />
            <YAxis stroke="var(--text-dim)" fontSize={11} tickLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="message"
              stroke="var(--secondary)"
              strokeWidth={2}
              dot={data.length < 50 ? { r: 3, fill: 'var(--secondary)' } : false}
              activeDot={{ r: 6, fill: '#FFFFFF', stroke: 'var(--secondary)', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DailyTimelineChart;
