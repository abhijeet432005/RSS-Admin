import { memo } from 'react';

const STYLES = {
  Complete: { color: 'var(--success)', bg: 'var(--success-soft)' },
  Pending: { color: 'var(--warning)', bg: 'var(--warning-soft)' },
  Canceled: { color: 'var(--danger)', bg: 'var(--danger-soft)' },
};

function StatusPillBase({ status }) {
  const style = STYLES[status] || STYLES.Pending;
  return (
    <span
      className="status-pill"
      style={{ color: style.color, background: style.bg }}
    >
      {status}
    </span>
  );
}

export default memo(StatusPillBase);
