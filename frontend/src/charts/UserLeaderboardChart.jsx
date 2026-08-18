import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import EmptyState from '../components/EmptyState';

const COLORS = ['#25D366', '#128C7E', '#34B7F1', '#FFB703', '#FF5A5F', '#8338EC'];

export const UserLeaderboardChart = ({ users = [], selectedUser, onSelectUser }) => {
  if (!users || users.length === 0) {
    return <EmptyState title="No User Data" message="No participants found in this chat." />;
  }

  const topUsers = users.slice(0, 10);

  return (
    <div className="glass-card" style={{ padding: '24px' }} role="region" aria-label="Member Participation Leaderboard">
      <div style={{ marginBottom: '18px' }}>
        <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '8px' }}>
          👥 Member Participation Leaderboard
        </h3>
        <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
          Top message contributors with percentage breakdown (Click any row or bar to filter)
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
        {/* Bar Chart */}
        <div style={{ width: '100%', height: '280px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={topUsers} layout="vertical" margin={{ top: 5, right: 20, left: 30, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(134, 150, 160, 0.12)" horizontal={false} />
              <XAxis type="number" stroke="var(--text-dim)" fontSize={11} tickLine={false} />
              <YAxis
                type="category"
                dataKey="username"
                stroke="var(--text-muted)"
                fontSize={11}
                tickLine={false}
                width={85}
              />
              <Tooltip
                formatter={(val) => [`${val.toLocaleString()} msgs`, 'Volume']}
                contentStyle={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-sm)',
                }}
              />
              <Bar dataKey="message_count" radius={[0, 4, 4, 0]}>
                {topUsers.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.username === selectedUser ? 'var(--primary)' : COLORS[index % COLORS.length]}
                    style={{ cursor: 'pointer' }}
                    onClick={() => onSelectUser(entry.username)}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* User Table with Percentage Bars */}
        <div
          style={{
            maxHeight: '280px',
            overflowY: 'auto',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--border-subtle)',
          }}
        >
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.84rem' }}>
            <thead>
              <tr style={{ background: 'var(--bg-card-subtle)', borderBottom: '1px solid var(--border-subtle)', textAlign: 'left' }}>
                <th style={{ padding: '10px 12px', color: 'var(--text-muted)', fontWeight: 600 }}>User</th>
                <th style={{ padding: '10px 12px', color: 'var(--text-muted)', fontWeight: 600 }}>Messages</th>
                <th style={{ padding: '10px 12px', color: 'var(--text-muted)', fontWeight: 600 }}>Share</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u, i) => {
                const isSelected = u.username === selectedUser;
                return (
                  <tr
                    key={u.username}
                    tabIndex={0}
                    role="button"
                    aria-pressed={isSelected}
                    onClick={() => onSelectUser(u.username)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        onSelectUser(u.username);
                      }
                    }}
                    style={{
                      borderBottom: '1px solid rgba(134, 150, 160, 0.08)',
                      cursor: 'pointer',
                      background: isSelected ? 'rgba(37, 211, 102, 0.14)' : 'transparent',
                      transition: 'background var(--transition-fast)',
                    }}
                  >
                    <td style={{ padding: '10px 12px', fontWeight: isSelected ? 700 : 500, color: isSelected ? 'var(--primary)' : 'var(--text-main)' }}>
                      {i + 1}. {u.username}
                    </td>
                    <td style={{ padding: '10px 12px', color: 'var(--text-muted)' }}>
                      {u.message_count.toLocaleString()}
                    </td>
                    <td style={{ padding: '10px 12px', minWidth: '100px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ flex: 1, background: 'var(--bg-card-subtle)', height: '6px', borderRadius: '3px', overflow: 'hidden' }}>
                          <div
                            style={{
                              width: `${Math.min(u.percentage, 100)}%`,
                              height: '100%',
                              background: isSelected ? 'var(--primary)' : COLORS[i % COLORS.length],
                              borderRadius: '3px',
                            }}
                          />
                        </div>
                        <span style={{ fontSize: '0.78rem', fontWeight: 600, color: isSelected ? 'var(--primary)' : 'var(--text-muted)' }}>
                          {u.percentage}%
                        </span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserLeaderboardChart;
