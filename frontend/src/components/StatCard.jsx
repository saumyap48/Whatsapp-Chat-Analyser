import React from 'react';

export const StatCard = ({ title, value, icon: Icon, color = 'var(--primary)', subtitle, trend }) => {
  return (
    <div className="glass-card" style={{
      padding: '20px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Glow background accent */}
      <div style={{
        position: 'absolute',
        top: '-20px',
        right: '-20px',
        width: '80px',
        height: '80px',
        borderRadius: '50%',
        background: color,
        opacity: 0.12,
        filter: 'blur(20px)',
        pointerEvents: 'none',
      }} />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
        <span style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-muted)' }}>
          {title}
        </span>
        <div style={{
          padding: '8px',
          borderRadius: '10px',
          background: `rgba(255, 255, 255, 0.04)`,
          border: '1px solid var(--border-subtle)',
          color: color,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <Icon size={20} />
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
        <span style={{
          fontSize: '1.9rem',
          fontWeight: 800,
          letterSpacing: '-0.03em',
          color: 'var(--text-main)',
          lineHeight: 1.1,
        }}>
          {typeof value === 'number' ? value.toLocaleString() : value}
        </span>
      </div>

      {subtitle && (
        <span style={{ fontSize: '0.78rem', color: 'var(--text-dim)', marginTop: '6px' }}>
          {subtitle}
        </span>
      )}
    </div>
  );
};

export default StatCard;
