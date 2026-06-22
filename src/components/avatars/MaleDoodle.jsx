export default function MaleDoodle({ className }) {
  return (
    <svg viewBox="0 0 64 64" className={className} role="img" aria-label="Male profile placeholder">
      <defs>
        <linearGradient id="maleGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--avatar-male-a)" />
          <stop offset="100%" stopColor="var(--avatar-male-b)" />
        </linearGradient>
      </defs>
      <circle cx="32" cy="32" r="32" fill="url(#maleGrad)" />
      <path
        d="M32 34c6.6 0 12-5.4 12-12.5S38.6 9 32 9s-12 5.4-12 12.5S25.4 34 32 34Z"
        fill="rgba(255,255,255,0.92)"
      />
      <path
        d="M32 38c-12.2 0-19 6.6-19 14.7V57c0 .4.3.7.7.7h36.6c.4 0 .7-.3.7-.7v-4.3C51 44.6 44.2 38 32 38Z"
        fill="rgba(255,255,255,0.92)"
      />
      <path
        d="M22 19c0-6 4-10.5 10-10.5 1.8 0 3.4.4 4.8 1.1-1 .3-1.8 1.1-1.8 2.2 0 1.3 1 2.3 2.3 2.3.4 0 .8-.1 1.1-.3.4 1 .6 2.1.6 3.3 0 1-2 1.8-4.5 1.8H24c-1.1 0-2-.9-2-2v-1.9Z"
        fill="rgba(255,255,255,0.55)"
      />
    </svg>
  );
}
