import React from 'react';
import { Loader2 } from 'lucide-react';

export const LoadingState = ({ message = 'Analyzing your conversation...', showSkeleton = true }) => {
  return (
    <div className="animate-fade-in" style={{ padding: '20px 0' }}>
      {/* Top Banner */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '14px',
          padding: '24px',
          background: 'rgba(17, 27, 33, 0.9)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-md)',
          marginBottom: '28px',
          textAlign: 'center',
        }}
      >
        <Loader2 size={26} color="var(--primary)" style={{ animation: 'spin 1s linear infinite' }} />
        <div>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '2px' }}>
            {message}
          </h3>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
            Processing message records, timestamps, word frequencies, and emoji metrics...
          </p>
        </div>
      </div>

      {showSkeleton && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Skeleton KPI Cards */}
          <div className="grid-5">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="glass-card" style={{ padding: '20px', minHeight: '120px' }}>
                <div className="skeleton" style={{ height: '14px', width: '50%', marginBottom: '14px' }} />
                <div className="skeleton" style={{ height: '32px', width: '70%', marginBottom: '10px' }} />
                <div className="skeleton" style={{ height: '12px', width: '40%' }} />
              </div>
            ))}
          </div>

          {/* Skeleton Charts */}
          <div className="grid-2">
            <div className="glass-card" style={{ padding: '24px', minHeight: '340px' }}>
              <div className="skeleton" style={{ height: '20px', width: '40%', marginBottom: '20px' }} />
              <div className="skeleton" style={{ height: '250px', width: '100%' }} />
            </div>
            <div className="glass-card" style={{ padding: '24px', minHeight: '340px' }}>
              <div className="skeleton" style={{ height: '20px', width: '40%', marginBottom: '20px' }} />
              <div className="skeleton" style={{ height: '250px', width: '100%' }} />
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default LoadingState;
