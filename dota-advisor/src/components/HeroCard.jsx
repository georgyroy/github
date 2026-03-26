import { heroPortraitUrl, ATTR_COLORS, ATTR_LABELS } from '../services/opendota';

export default function HeroCard({ hero, stats, selected, onClick }) {
  const winRate = stats
    ? ((stats['8_win'] / stats['8_pick']) * 100).toFixed(1)
    : null;

  const attrColor = ATTR_COLORS[hero.primary_attr] ?? '#8b8fa8';
  const attrLabel = ATTR_LABELS[hero.primary_attr] ?? hero.primary_attr;

  return (
    <button
      onClick={() => onClick(hero)}
      title={hero.localized_name}
      style={{
        background: selected ? '#252840' : '#1e2130',
        border: `1px solid ${selected ? '#5b6af0' : '#2e3147'}`,
        borderRadius: '8px',
        overflow: 'hidden',
        cursor: 'pointer',
        textAlign: 'left',
        padding: 0,
        transition: 'border-color 0.15s, background 0.15s, transform 0.1s',
        display: 'flex',
        flexDirection: 'column',
        outline: selected ? '2px solid #5b6af020' : 'none',
      }}
      onMouseEnter={e => {
        if (!selected) {
          e.currentTarget.style.background = '#252840';
          e.currentTarget.style.borderColor = '#3e4460';
        }
        e.currentTarget.style.transform = 'translateY(-2px)';
      }}
      onMouseLeave={e => {
        if (!selected) {
          e.currentTarget.style.background = '#1e2130';
          e.currentTarget.style.borderColor = '#2e3147';
        }
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      <div style={{ position: 'relative', aspectRatio: '256/144', overflow: 'hidden' }}>
        <img
          src={heroPortraitUrl(hero.img)}
          alt={hero.localized_name}
          loading="lazy"
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
        {selected && (
          <div style={{
            position: 'absolute', inset: 0,
            background: 'rgba(91,106,240,0.18)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <CheckIcon />
          </div>
        )}
      </div>
      <div style={{ padding: '8px 10px', flex: 1 }}>
        <p style={{
          fontSize: '12px',
          fontWeight: 600,
          color: '#e8eaf0',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          marginBottom: '4px',
        }}>
          {hero.localized_name}
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{
            fontSize: '10px',
            fontWeight: 500,
            color: attrColor,
            background: `${attrColor}18`,
            padding: '1px 5px',
            borderRadius: '3px',
          }}>
            {attrLabel}
          </span>
          {winRate && (
            <span style={{ fontSize: '10px', color: '#8b8fa8', marginLeft: 'auto' }}>
              {winRate}% WR
            </span>
          )}
        </div>
      </div>
    </button>
  );
}

function CheckIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="11" fill="rgba(91,106,240,0.8)" />
      <path d="M7 12l3.5 3.5L17 8.5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
