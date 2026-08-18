import React from 'react';
import {
  AreaChart,
  Area,
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
        <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '4px' }}>{label}</p>
        <p style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--primary)' }}>
          {payload[0].value.toLocaleString()} <span style={{ fontSize: '0.8rem', fontWeight: 500, color: 'var(--text-muted)' }}>messages</span>
        </p>
      </div>
    );
  }
  return null;
};

export const MonthlyTimelineChart = ({ data = [] }) => {
  if (!data || data.length === 0) {
    return <EmptyState title="No Monthly Timeline Data" message="Unable to extract monthly timeline points for this selection." />;
  }

  return (
    <div className="glass-card" style={{ padding: '24px' }}>
      <div style={{ marginBottom: '18px' }}>
        <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '8px' }}>
          📅 Monthly Message Trend
        </h3>
        <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
          Historical message count evolution grouped by month & year
        </p>
      </div>

      <div style={{ width: '100%', height: '320px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 20, left: -10, bottom: 25 }}>
            <defs>
              <linearGradient id="monthlyGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.45} />
                <stop offset="95%" stopColor="var(--primary)" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(134, 150, 160, 0.12)" />
            <XAxis
              dataKey="time"
              stroke="var(--text-dim)"
              fontSize={11}
              tickLine={false}
              angle={-25}
              textAnchor="end"
            />
            <YAxis stroke="var(--text-dim)" fontSize={11} tickLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="message"
              stroke="var(--primary)"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#monthlyGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MonthlyTimelineChart;
