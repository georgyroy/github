const BASE_URL = 'https://api.opendota.com/api';

// Returns array of hero objects with id, name, localized_name, primary_attr, attack_type, roles, img, icon
export async function fetchHeroes() {
  const res = await fetch(`${BASE_URL}/heroes`);
  if (!res.ok) throw new Error(`Failed to fetch heroes: ${res.status}`);
  return res.json();
}

// Returns object keyed by hero_id with win rates and other stats
// mode: 0 = All Pick, 1 = Single Draft, 2 = All Random, etc.
export async function fetchHeroStats() {
  const res = await fetch(`${BASE_URL}/heroStats`);
  if (!res.ok) throw new Error(`Failed to fetch hero stats: ${res.status}`);
  return res.json();
}

// Portrait URL for a hero given its img path (e.g. "/apps/dota2/images/dota_react/heroes/antimage.png?")
export function heroPortraitUrl(imgPath) {
  return `https://cdn.cloudflare.steamstatic.com${imgPath}`;
}

// Icon URL for a hero
export function heroIconUrl(iconPath) {
  return `https://cdn.cloudflare.steamstatic.com${iconPath}`;
}

export const ATTR_LABELS = {
  agi: 'Agility',
  str: 'Strength',
  int: 'Intelligence',
  all: 'Universal',
};

export const ATTR_COLORS = {
  agi: '#4ade80',   // green
  str: '#f87171',   // red
  int: '#60a5fa',   // blue
  all: '#a78bfa',   // purple
};
