import React, { useState } from 'react';
import EmptyState from '../components/EmptyState';

export const ActivityHeatmap = ({ heatmapData }) => {
  const [hoveredCell, setHoveredCell] = useState(null);

  if (!heatmapData || !heatmapData.matrix || heatmapData.matrix.length === 0) {
    return <EmptyState title="No Heatmap Data" message="Unable to compute activity matrix." />;
  }

  const { days = [], periods = [], matrix = [] } = heatmapData;

  // Calculate max count for color interpolation
  let maxCount = 1;
  matrix.forEach(row => {
    row.forEach(val => {
      if (val > maxCount) maxCount = val;
    });
  });

  const getCellColor = (count) => {
    if (count === 0) return 'rgba(32, 44, 51, 0.4)';
    const intensity = count / maxCount;
    if (intensity < 0.25) return 'rgba(37, 211, 102, 0.25)';
    if (intensity < 0.5) return 'rgba(37, 211, 102, 0.5)';
    if (intensity < 0.75) return 'rgba(37, 211, 102, 0.75)';
    return '#25D366';
  };

  return (
    <div className="glass-card" style={{ padding: '24px' }}>
      <div style={{ marginBottom: '18px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            🗓️ Weekly Activity Heatmap
          </h3>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
            Chat activity concentration across days of the week and hours of the day
          </p>
        </div>

        {/* Legend */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
          <span>Low</span>
          <div style={{ display: 'flex', gap: '3px' }}>
            <span style={{ width: '12px', height: '12px', borderRadius: '3px', background: 'rgba(32, 44, 51, 0.4)', border: '1px solid var(--border-subtle)' }} />
            <span style={{ width: '12px', height: '12px', borderRadius: '3px', background: 'rgba(37, 211, 102, 0.25)' }} />
            <span style={{ width: '12px', height: '12px', borderRadius: '3px', background: 'rgba(37, 211, 102, 0.5)' }} />
            <span style={{ width: '12px', height: '12px', borderRadius: '3px', background: 'rgba(37, 211, 102, 0.75)' }} />
            <span style={{ width: '12px', height: '12px', borderRadius: '3px', background: '#25D366' }} />
          </div>
          <span>High</span>
        </div>
      </div>

      {/* Heatmap Grid Container */}
      <div style={{ overflowX: 'auto', paddingBottom: '10px' }}>
        <div style={{ minWidth: '700px' }}>
          {/* Header Row: Hours */}
          <div style={{ display: 'grid', gridTemplateColumns: '90px repeat(24, 1fr)', gap: '4px', marginBottom: '4px' }}>
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
                return (
                  <div
                    key={`${day}-${p}`}
                    onMouseEnter={() => setHoveredCell({ day, period: p, count })}
                    onMouseLeave={() => setHoveredCell(null)}
                    style={{
                      height: '24px',
                      borderRadius: '4px',
                      background: getCellColor(count),
                      border: '1px solid rgba(255, 255, 255, 0.04)',
                      transition: 'transform 0.15s ease',
                      cursor: 'pointer',
                      transform: hoveredCell?.day === day && hoveredCell?.period === p ? 'scale(1.2)' : 'none',
                      zIndex: hoveredCell?.day === day && hoveredCell?.period === p ? 10 : 1,
                    }}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Dynamic Hover Tooltip Footer */}
      <div style={{
        marginTop: '12px',
        minHeight: '28px',
        display: 'flex',
        alignItems: 'center',
        fontSize: '0.84rem',
        color: hoveredCell ? 'var(--text-main)' : 'var(--text-dim)',
      }}>
        {hoveredCell ? (
          <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontWeight: 700, color: 'var(--primary)' }}>{hoveredCell.day}</span> at{' '}
            <span style={{ fontWeight: 600, color: 'var(--secondary)' }}>{hoveredCell.period}:00</span> —{' '}
            <span style={{ fontWeight: 700 }}>{hoveredCell.count} messages</span>
          </span>
        ) : (
          <span>Hover over any cell to see detailed message volume</span>
        )}
      </div>
    </div>
  );
};

export default ActivityHeatmap;
