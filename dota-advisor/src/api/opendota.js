const BASE_URL = 'https://api.opendota.com/api';

async function request(path, params = {}) {
  const url = new URL(`${BASE_URL}${path}`);
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  const res = await fetch(url);
  if (!res.ok) throw new Error(`OpenDota API error: ${res.status} ${res.statusText}`);
  return res.json();
}

export function getPlayer(accountId) {
  return request(`/players/${accountId}`);
}

export function getPlayerRecentMatches(accountId) {
  return request(`/players/${accountId}/recentMatches`);
}

export function getPlayerMatches(accountId, params = {}) {
  return request(`/players/${accountId}/matches`, params);
}

export function getPlayerHeroes(accountId) {
  return request(`/players/${accountId}/heroes`);
}

export function getPlayerWinLoss(accountId, params = {}) {
  return request(`/players/${accountId}/wl`, params);
}

export function getMatch(matchId) {
  return request(`/matches/${matchId}`);
}

export function getHeroes() {
  return request('/heroes');
}

export function getHeroStats() {
  return request('/heroStats');
}

export function searchPlayers(query) {
  return request('/search', { q: query });
}
