import React, { useState } from 'react';
import EmptyState from '../components/EmptyState';

export const ActivityHeatmap = ({ heatmapData }) => {
  const [hoveredCell, setHoveredCell] = useState(null);

  if (!heatmapData || !heatmapData.matrix || heatmapData.matrix.length === 0) {
    return <EmptyState title="No Heatmap Data" message="Unable to compute activity matrix for this selection." />;
  }

  const { days = [], periods = [], matrix = [] } = heatmapData;

  // Compute maximum cell value for dynamic color scaling
  let maxCount = 1;
  matrix.forEach((row) => {
    row.forEach((val) => {
      if (val > maxCount) maxCount = val;
    });
  });

  const getCellColor = (count) => {
    if (count === 0) return 'rgba(32, 44, 51, 0.45)';
    const intensity = count / maxCount;
    if (intensity < 0.25) return 'rgba(37, 211, 102, 0.3)';
    if (intensity < 0.5) return 'rgba(37, 211, 102, 0.55)';
    if (intensity < 0.75) return 'rgba(37, 211, 102, 0.8)';
    return '#25D366';
  };

  return (
    <div className="glass-card" style={{ padding: '24px' }} role="region" aria-label="Weekly Activity Heatmap">
      <div style={{ marginBottom: '18px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            🗓️ Weekly Activity Heatmap
          </h3>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
            Conversation volume distribution across days of the week and hours of the day
          </p>
        </div>

        {/* Legend */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: 'var(--text-muted)' }} aria-hidden="true">
          <span>Low</span>
          <div style={{ display: 'flex', gap: '3px' }}>
            <span style={{ width: '12px', height: '12px', borderRadius: '3px', background: 'rgba(32, 44, 51, 0.45)', border: '1px solid var(--border-subtle)' }} />
            <span style={{ width: '12px', height: '12px', borderRadius: '3px', background: 'rgba(37, 211, 102, 0.3)' }} />
            <span style={{ width: '12px', height: '12px', borderRadius: '3px', background: 'rgba(37, 211, 102, 0.55)' }} />
            <span style={{ width: '12px', height: '12px', borderRadius: '3px', background: 'rgba(37, 211, 102, 0.8)' }} />
            <span style={{ width: '12px', height: '12px', borderRadius: '3px', background: '#25D366' }} />
          </div>
          <span>High</span>
        </div>
      </div>

      {/* Heatmap Grid Container */}
      <div style={{ overflowX: 'auto', paddingBottom: '8px' }}>
        <div style={{ minWidth: '720px' }}>
          {/* Header Row: Hours */}
          <div style={{ display: 'grid', gridTemplateColumns: '90px repeat(24, 1fr)', gap: '4px', marginBottom: '4px' }} aria-hidden="true">
            <div />
            {periods.map((p, idx) => (
              <div
                key={p}
                style={{
                  fontSize: '0.68rem',
                  color: 'var(--text-dim)',
                  textAlign: 'center',
                  fontWeight: 600,
                  whiteSpace: 'nowrap',
                }}
              >
                {idx % 2 === 0 ? p.split('-')[0] : ''}
              </div>
            ))}
          </div>

          {/* Day Rows */}
          {days.map((day, dIdx) => (
            <div
              key={day}
              style={{
                display: 'grid',
                gridTemplateColumns: '90px repeat(24, 1fr)',
                gap: '4px',
                marginBottom: '4px',
                alignItems: 'center',
              }}
            >
              <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-muted)' }}>
                {day}
              </span>

              {periods.map((p, pIdx) => {
                const count = matrix[dIdx] ? matrix[dIdx][pIdx] || 0 : 0;
                const isHovered = hoveredCell?.day === day && hoveredCell?.period === p;
                return (
                  <button
                    key={`${day}-${p}`}
                    type="button"
                    aria-label={`${day} between ${p}:00, ${count} messages`}
                    onMouseEnter={() => setHoveredCell({ day, period: p, count })}
                    onMouseLeave={() => setHoveredCell(null)}
                    onFocus={() => setHoveredCell({ day, period: p, count })}
                    onBlur={() => setHoveredCell(null)}
                    style={{
                      height: '24px',
                      borderRadius: '4px',
                      background: getCellColor(count),
                      border: isHovered ? '1px solid #FFFFFF' : '1px solid rgba(255, 255, 255, 0.04)',
                      transition: 'transform 0.15s ease, border-color 0.15s ease',
                      cursor: 'pointer',
                      transform: isHovered ? 'scale(1.2)' : 'none',
                      zIndex: isHovered ? 10 : 1,
                      padding: 0,
                    }}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Dynamic Tooltip Footer */}
      <div
        style={{
          marginTop: '12px',
          minHeight: '28px',
          display: 'flex',
          alignItems: 'center',
          fontSize: '0.86rem',
          color: hoveredCell ? 'var(--text-main)' : 'var(--text-dim)',
          background: 'rgba(0, 0, 0, 0.2)',
          padding: '6px 12px',
          borderRadius: 'var(--radius-sm)',
          border: '1px solid var(--border-subtle)',
        }}
        aria-live="polite"
      >
        {hoveredCell ? (
          <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <strong style={{ color: 'var(--primary)' }}>{hoveredCell.day}</strong> at{' '}
            <strong style={{ color: 'var(--secondary)' }}>{hoveredCell.period}:00</strong> —{' '}
            <strong style={{ color: '#FFFFFF' }}>{hoveredCell.count.toLocaleString()} messages</strong>
          </span>
        ) : (
          <span>Hover over or focus any cell to view the exact message count</span>
        )}
      </div>
    </div>
  );
};

export default ActivityHeatmap;
