import { AlertTriangle, RotateCw } from 'lucide-react';

export default function ErrorState({ message, onRetry }) {
  return (
    <div className="error-state">
      <span className="error-state__icon">
        <AlertTriangle size={20} />
      </span>
      <h3>Couldn't load this data</h3>
      <p>{message || 'Something went wrong while talking to the server.'}</p>
      {onRetry && (
        <button type="button" className="btn-secondary" onClick={onRetry}>
          <RotateCw size={14} />
          Try again
        </button>
      )}
    </div>
  );
}
