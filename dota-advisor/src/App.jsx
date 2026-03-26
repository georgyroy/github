import { useState, useEffect, useCallback } from 'react';
import HeroPicker from './components/HeroPicker';
import { fetchHeroStats } from './services/opendota';

export default function App() {
  const [heroes, setHeroes] = useState([]);
  const [statsMap, setStatsMap] = useState(null);
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchHeroStats()
      .then(data => {
        // heroStats returns full hero data including portrait + stats
        const map = {};
        data.forEach(h => { map[h.id] = h; });
        setStatsMap(map);
        setHeroes(data);
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const handleToggle = useCallback((heroId) => {
    setSelectedIds(prev => {
      const next = new Set(prev);
      next.has(heroId) ? next.delete(heroId) : next.add(heroId);
      return next;
    });
  }, []);

  const handleClear = () => setSelectedIds(new Set());

  return (
    <div style={{ minHeight: '100svh', background: '#0f1117' }}>
      {/* Header */}
      <header style={{
        borderBottom: '1px solid #1e2130',
        padding: '0 24px',
        height: '56px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        position: 'sticky',
        top: 0,
        background: '#0f1117',
        zIndex: 10,
      }}>
        <DotaIcon />
        <span style={{ fontSize: '18px', fontWeight: 700, color: '#e8eaf0', letterSpacing: '-0.3px' }}>
          Dota Advisor
        </span>
        <span style={{
          fontSize: '11px',
          color: '#4a4e6a',
          background: '#1e2130',
          border: '1px solid #2e3147',
          borderRadius: '4px',
          padding: '2px 7px',
          marginLeft: '4px',
        }}>
          Hero Picker
        </span>

        {selectedIds.size > 0 && (
          <button
            onClick={handleClear}
            style={{
              marginLeft: 'auto',
              fontSize: '13px',
              color: '#8b8fa8',
              background: 'transparent',
              border: '1px solid #2e3147',
              borderRadius: '6px',
              padding: '5px 12px',
              cursor: 'pointer',
            }}
          >
            Clear ({selectedIds.size})
          </button>
        )}
      </header>

      {/* Main */}
      <main style={{ maxWidth: '1400px', margin: '0 auto', padding: '24px 24px 60px' }}>
        {loading && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 0', gap: '12px', color: '#4a4e6a' }}>
            <Spinner />
            <span>Loading heroes…</span>
          </div>
        )}

        {error && (
          <div style={{
            background: '#2a1a1a',
            border: '1px solid #5a2a2a',
            borderRadius: '8px',
            padding: '16px 20px',
            color: '#f87171',
            fontSize: '14px',
          }}>
            Failed to load heroes: {error}
          </div>
        )}

        {!loading && !error && (
          <HeroPicker
            heroes={heroes}
            statsMap={statsMap}
            selectedIds={selectedIds}
            onToggle={handleToggle}
          />
        )}
      </main>
    </div>
  );
}

function DotaIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <rect width="28" height="28" rx="6" fill="#5b6af0" />
      <path d="M7 21V7l7 7 7-7v14l-7-7-7 7z" fill="white" />
    </svg>
  );
}

function Spinner() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ animation: 'spin 0.8s linear infinite' }}>
      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
      <circle cx="12" cy="12" r="10" stroke="#2e3147" strokeWidth="3" />
      <path d="M12 2a10 10 0 0 1 10 10" stroke="#5b6af0" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}
