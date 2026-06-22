// When VITE_API_BASE_URL is set (see .env.example), the app calls a real
// REST API at that base. When it's not set — e.g. this template running
// stand-alone — every fetch function below transparently falls back to the
// local generated mock dataset, with a small simulated network delay so
// loading states are visible during development.
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';
export const USING_MOCK_API = !API_BASE_URL;
export const SIMULATED_LATENCY_MS = 450;
