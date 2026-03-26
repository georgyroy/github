import { useState, useMemo, useCallback } from 'react';
import HeroCard from './HeroCard';
import { ATTR_LABELS } from '../services/opendota';

const ATTACK_TYPES = ['All', 'Melee', 'Ranged'];
const ATTR_FILTERS = ['All', 'str', 'agi', 'int', 'all'];

export default function HeroPicker({ heroes, statsMap, selectedIds, onToggle }) {
  const [search, setSearch] = useState('');
  const [attrFilter, setAttrFilter] = useState('All');
  const [attackFilter, setAttackFilter] = useState('All');

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return heroes.filter(h => {
      if (q && !h.localized_name.toLowerCase().includes(q)) return false;
      if (attrFilter !== 'All' && h.primary_attr !== attrFilter) return false;
      if (attackFilter !== 'All' && h.attack_type !== attackFilter) return false;
      return true;
    });
  }, [heroes, search, attrFilter, attackFilter]);

  const handleToggle = useCallback((hero) => {
    onToggle(hero.id);
  }, [onToggle]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Search + filters */}
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ position: 'relative', flex: '1 1 220px', minWidth: '180px' }}>
          <SearchIcon />
          <input
            type="text"
            placeholder="Search heroes..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              width: '100%',
              background: '#1e2130',
              border: '1px solid #2e3147',
              borderRadius: '8px',
              padding: '9px 12px 9px 36px',
              color: '#e8eaf0',
              fontSize: '14px',
              outline: 'none',
              transition: 'border-color 0.15s',
            }}
            onFocus={e => (e.target.style.borderColor = '#5b6af0')}
            onBlur={e => (e.target.style.borderColor = '#2e3147')}
          />
        </div>

        <FilterGroup
          label="Attribute"
          options={ATTR_FILTERS}
          value={attrFilter}
          onChange={setAttrFilter}
          labelFn={v => (v === 'All' ? 'All' : ATTR_LABELS[v] ?? v)}
        />
        <FilterGroup
          label="Attack"
          options={ATTACK_TYPES}
          value={attackFilter}
          onChange={setAttackFilter}
        />
      </div>

      {/* Result count */}
      <p style={{ fontSize: '13px', color: '#4a4e6a' }}>
        {filtered.length} hero{filtered.length !== 1 ? 'es' : ''}
        {selectedIds.size > 0 && (
          <span style={{ color: '#5b6af0', marginLeft: '10px' }}>
            {selectedIds.size} selected
          </span>
        )}
      </p>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 0', color: '#4a4e6a' }}>
          No heroes match your search.
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
          gap: '10px',
        }}>
          {filtered.map(hero => (
            <HeroCard
              key={hero.id}
              hero={hero}
              stats={statsMap?.[hero.id]}
              selected={selectedIds.has(hero.id)}
              onClick={handleToggle}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function FilterGroup({ options, value, onChange, labelFn }) {
  return (
    <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
      {options.map(opt => {
        const active = value === opt;
        return (
          <button
            key={opt}
            onClick={() => onChange(opt)}
            style={{
              padding: '7px 12px',
              borderRadius: '6px',
              border: `1px solid ${active ? '#5b6af0' : '#2e3147'}`,
              background: active ? '#5b6af020' : '#1e2130',
              color: active ? '#6e7df5' : '#8b8fa8',
              fontSize: '13px',
              cursor: 'pointer',
              fontWeight: active ? 600 : 400,
              transition: 'all 0.15s',
            }}
          >
            {labelFn ? labelFn(opt) : opt}
          </button>
        );
      })}
    </div>
  );
}

function SearchIcon() {
  return (
    <svg
      width="16" height="16" viewBox="0 0 24 24" fill="none"
      stroke="#4a4e6a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}
    >
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}
