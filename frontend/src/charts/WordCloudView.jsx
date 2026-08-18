import React, { useMemo } from 'react';
import EmptyState from '../components/EmptyState';

const WORD_PALETTES = [
  '#25D366',
  '#34B7F1',
  '#128C7E',
  '#FFB703',
  '#FF5A5F',
  '#8338EC',
  '#06D6A0',
  '#118AB2',
  '#E76F51',
];

export const WordCloudView = ({ words = [] }) => {
  if (!words || words.length === 0) {
    return <EmptyState title="No Word Cloud Data" message="Unable to generate word cloud from available chat tokens." />;
  }

  // Normalize font sizes between 13px and 42px
  const { minVal, maxVal } = useMemo(() => {
    let min = Infinity;
    let max = -Infinity;
    words.forEach((w) => {
      if (w.value < min) min = w.value;
      if (w.value > max) max = w.value;
    });
    if (min === max) {
      min = 0;
      max = max || 1;
    }
    return { minVal: min, maxVal: max };
  }, [words]);

  const getFontSize = (val) => {
    const range = maxVal - minVal || 1;
    const normalized = (val - minVal) / range;
    return Math.round(13 + normalized * 26);
  };

  return (
    <div className="glass-card" style={{ padding: '24px' }}>
      <div style={{ marginBottom: '18px' }}>
        <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '8px' }}>
          ☁️ Interactive Word Cloud
        </h3>
        <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
          Relative keyword dominance visualization
        </p>
      </div>

      <div style={{
        minHeight: '280px',
        maxHeight: '340px',
        overflowY: 'auto',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '12px 16px',
        padding: '16px',
        background: 'rgba(0, 0, 0, 0.2)',
        borderRadius: 'var(--radius-sm)',
        border: '1px solid var(--border-subtle)',
      }}>
        {words.slice(0, 50).map((item, index) => {
          const fontSize = getFontSize(item.value);
          const color = WORD_PALETTES[index % WORD_PALETTES.length];

          return (
            <span
              key={`${item.text}-${index}`}
              title={`${item.text}: ${item.value} mentions`}
              style={{
                fontSize: `${fontSize}px`,
                color: color,
                fontWeight: fontSize > 24 ? 800 : fontSize > 18 ? 600 : 500,
                cursor: 'default',
                transition: 'transform 0.2s ease, text-shadow 0.2s ease',
                padding: '2px 6px',
                userSelect: 'none',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.15)';
                e.currentTarget.style.textShadow = `0 0 12px ${color}`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.textShadow = 'none';
              }}
            >
              {item.text}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default WordCloudView;
