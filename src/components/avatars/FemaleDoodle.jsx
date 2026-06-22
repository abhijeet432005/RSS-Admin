export default function FemaleDoodle({ className }) {
  return (
    <svg viewBox="0 0 64 64" className={className} role="img" aria-label="Female profile placeholder">
      <defs>
        <linearGradient id="femaleGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--avatar-female-a)" />
          <stop offset="100%" stopColor="var(--avatar-female-b)" />
        </linearGradient>
      </defs>
      <circle cx="32" cy="32" r="32" fill="url(#femaleGrad)" />
      <path
        d="M19 21c0-7.5 5.8-13.5 13-13.5S45 13.5 45 21c0 3-1 7-2.6 10 .2-1.8-.2-3.2-1.7-3.2-1 0-1.6.8-2.3 2-1.7-1.9-4.2-3-6.4-3-2.2 0-4.7 1.1-6.4 3-.7-1.2-1.3-2-2.3-2-1.5 0-1.9 1.4-1.7 3.2C20 28 19 24 19 21Z"
        fill="rgba(255,255,255,0.55)"
      />
      <path
        d="M32 35c6.6 0 12-5.6 12-13 0-1-.1-2-.3-3-1.7 1.7-4.2 2.6-7 2.6-3.4 0-6.6-1.3-8.8-3.6-1.6 1.1-2.9 2.7-3.6 4.6-.2 1-.3 2-.3 3 0 7.4 5.4 13.4 12 13.4Z"
        fill="rgba(255,255,255,0.92)"
      />
      <path
        d="M32 39c-12.2 0-19 6.6-19 14.7V57c0 .4.3.7.7.7h12.7c-.3-3.6 1.8-7 5.6-7s5.9 3.4 5.6 7h12.7c.4 0 .7-.3.7-.7v-3.3C51 45.6 44.2 39 32 39Z"
        fill="rgba(255,255,255,0.92)"
      />
    </svg>
  );
}
