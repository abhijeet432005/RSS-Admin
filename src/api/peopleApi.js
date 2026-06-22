import { API_BASE_URL, SIMULATED_LATENCY_MS } from './config';
import { MEMBERS, VOLUNTEERS, DONATIONS, findRecordById } from '../data/mockData';

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

/**
 * Each fetcher tries the real API first when a base URL is configured.
 * If that call fails (or no base URL is configured at all) it resolves
 * with the local mock dataset instead, so the UI keeps working offline
 * or before a backend is wired up.
 */
async function fetchCollection(path, mockData, signal) {
  if (!API_BASE_URL) return delay(mockData);
  try {
    return await getJson(path, signal);
  } catch (err) {
    if (err.name === 'AbortError') throw err;
    console.warn(`[api] ${path} unavailable, using mock data instead:`, err.message);
    return delay(mockData);
  }
}

export function fetchMembers(signal) {
  return fetchCollection('/members', MEMBERS, signal);
}

export function fetchVolunteers(signal) {
  return fetchCollection('/volunteers', VOLUNTEERS, signal);
}

export function fetchDonations(signal) {
  return fetchCollection('/donations', DONATIONS, signal);
}

export async function fetchRecordById(kind, id, signal) {
  const path = `/${kind === 'volunteer' ? 'volunteers' : 'members'}/${id}`;
  if (!API_BASE_URL) return delay(findRecordById(kind, id));
  try {
    return await getJson(path, signal);
  } catch (err) {
    if (err.name === 'AbortError') throw err;
    console.warn(`[api] ${path} unavailable, using mock data instead:`, err.message);
    return delay(findRecordById(kind, id));
  }
}
