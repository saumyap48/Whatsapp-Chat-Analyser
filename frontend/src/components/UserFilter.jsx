import React from 'react';
import { Filter } from 'lucide-react';

export const UserFilter = ({ users = [], selectedUser, onSelectUser, disabled = false }) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        flexWrap: 'wrap',
        background: 'var(--bg-card)',
        padding: '8px 14px',
        borderRadius: 'var(--radius-sm)',
        border: '1px solid var(--border-subtle)',
      }}
    >
      <label
        htmlFor="user-filter-select"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          color: 'var(--text-muted)',
          fontSize: '0.88rem',
          fontWeight: 600,
          cursor: 'pointer',
        }}
      >
        <Filter size={16} color="var(--primary)" aria-hidden="true" />
        <span>Filter Participant:</span>
      </label>

      <select
        id="user-filter-select"
        value={selectedUser}
        disabled={disabled}
        onChange={(e) => onSelectUser(e.target.value)}
        aria-label="Filter chat analysis by participant"
        style={{
          background: 'var(--bg-card-subtle)',
          color: 'var(--text-main)',
          border: '1px solid var(--border-subtle)',
          padding: '8px 16px',
          borderRadius: 'var(--radius-sm)',
          fontSize: '0.9rem',
          fontWeight: 600,
          cursor: disabled ? 'not-allowed' : 'pointer',
          outline: 'none',
          minWidth: '220px',
          opacity: disabled ? 0.6 : 1,
        }}
      >
        <option value="Overall">👥 Overall (All Chat Members)</option>
        {users.map((u) => (
          <option key={u.username} value={u.username}>
            👤 {u.username} ({u.message_count.toLocaleString()} msgs • {u.percentage}%)
          </option>
        ))}
      </select>
    </div>
  );
};

export default UserFilter;
