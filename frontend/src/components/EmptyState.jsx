import React from 'react';
import { FileQuestion } from 'lucide-react';

export const EmptyState = ({ title = 'No Data Found', message = 'There are no records matching the selected criteria.' }) => {
  return (
    <div style={{
      padding: '40px 20px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      color: 'var(--text-muted)',
    }}>
      <div style={{
        padding: '14px',
        borderRadius: '50%',
        background: 'var(--bg-card-subtle)',
        marginBottom: '14px',
        color: 'var(--text-dim)',
      }}>
        <FileQuestion size={28} />
      </div>
      <h4 style={{ fontSize: '1.05rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '4px' }}>
        {title}
      </h4>
      <p style={{ fontSize: '0.86rem', maxWidth: '380px' }}>
        {message}
      </p>
    </div>
  );
};

export default EmptyState;
