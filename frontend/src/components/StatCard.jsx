import React from 'react';

export const StatCard = ({
  title,
  value,
  icon: Icon,
  color = 'var(--primary)',
  subtitle,
  isLoading = false,
}) => {
  return (
    <div
      className="glass-card"
      role="region"
      aria-label={`${title} statistic`}
      style={{
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background radial glow */}
      <div
        style={{
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
        }}
        aria-hidden="true"
      />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
        <span style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-muted)' }}>
          {title}
        </span>
        <div
          style={{
            padding: '8px',
            borderRadius: '10px',
            background: 'rgba(255, 255, 255, 0.04)',
            border: '1px solid var(--border-subtle)',
            color: color,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          aria-hidden="true"
        >
          {Icon && <Icon size={20} />}
        </div>
      </div>

      <div>
        {isLoading ? (
          <div className="skeleton" style={{ height: '36px', width: '70%', marginBottom: '6px' }} />
        ) : (
          <span
            style={{
              fontSize: 'clamp(1.6rem, 2.5vw, 2rem)',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              color: 'var(--text-main)',
              lineHeight: 1.1,
              display: 'block',
            }}
          >
            {typeof value === 'number' ? value.toLocaleString() : (value || '0')}
          </span>
        )}
      </div>

      {subtitle && (
        <span style={{ fontSize: '0.78rem', color: 'var(--text-dim)', marginTop: '8px', display: 'block' }}>
          {subtitle}
        </span>
      )}
    </div>
  );
};

export default StatCard;
