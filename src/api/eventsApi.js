import { API_BASE_URL, SIMULATED_LATENCY_MS } from './config';
import { EVENTS } from '../data/mockData';

function delay(value, ms = SIMULATED_LATENCY_MS) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(value), ms);
  });
}

async function getJson(path, signal) {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    headers: { Accept: 'application/json' },
    signal,
  });
  if (!res.ok) {
    throw new Error(`Request to ${path} failed with status ${res.status}`);
  }
  return res.json();
}

export async function fetchEvents(signal) {
  if (!API_BASE_URL) return delay(EVENTS);
  try {
    return await getJson('/events', signal);
  } catch (err) {
    if (err.name === 'AbortError') throw err;
    console.warn('[api] /events unavailable, using mock data instead:', err.message);
    return delay(EVENTS);
  }
}