import React from 'react';
import { Users, User, Filter } from 'lucide-react';

export const UserFilter = ({ users = [], selectedUser, onSelectUser }) => {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      flexWrap: 'wrap',
      background: 'var(--bg-card)',
      padding: '8px 14px',
      borderRadius: 'var(--radius-sm)',
      border: '1px solid var(--border-subtle)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)', fontSize: '0.88rem', fontWeight: 600 }}>
        <Filter size={16} color="var(--primary)" />
        <span>Filter Analysis:</span>
      </div>

      <select
        value={selectedUser}
        onChange={(e) => onSelectUser(e.target.value)}
        style={{
          background: 'var(--bg-card-subtle)',
          color: 'var(--text-main)',
          border: '1px solid var(--border-subtle)',
          padding: '8px 16px',
          borderRadius: 'var(--radius-sm)',
          fontSize: '0.9rem',
          fontWeight: 600,
          cursor: 'pointer',
          outline: 'none',
          minWidth: '220px',
        }}
      >
        <option value="Overall">👥 Overall (All Chat Members)</option>
        {users.map((u) => (
          <option key={u.username} value={u.username}>
            👤 {u.username} ({u.message_count} msgs - {u.percentage}%)
          </option>
        ))}
      </select>
    </div>
  );
};

export default UserFilter;
