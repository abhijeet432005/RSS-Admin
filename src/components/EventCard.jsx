import { memo } from 'react';
import { Clock, MapPin, Video, StickyNote, Wifi, WifiOff, Pencil, Trash2 } from 'lucide-react';

function getDateParts(dateStr) {
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return { day: '--', month: '---' };
  return {
    day: d.toLocaleDateString('en-IN', { day: '2-digit' }),
    month: d.toLocaleDateString('en-IN', { month: 'short' }).toUpperCase(),
  };
}

function formatTime(timeStr) {
  if (!timeStr) return '—';
  const [h, m] = timeStr.split(':').map(Number);
  const period = h >= 12 ? 'PM' : 'AM';
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  return `${hour12}:${String(m).padStart(2, '0')} ${period}`;
}

function EventCardBase({ event, isLast, onEdit, onDelete }) {
  const isOnline = event.mode === 'online';
  const { day, month } = getDateParts(event.date);

  return (
    <div className="event-row">
      <div className="event-rail">
        <div className={`event-date-badge${isOnline ? ' event-date-badge--online' : ''}`}>
          <span className="event-date-badge__day">{day}</span>
          <span className="event-date-badge__month">{month}</span>
        </div>
        {!isLast && <span className="event-rail__line" />}
      </div>

      <article className={`event-card${isOnline ? ' event-card--online' : ''}`}>
        <header className="event-card__header">
          <h3 className="event-card__title">{event.name}</h3>
          <div className="event-card__header-actions">
            <span className={`event-mode-pill${isOnline ? ' event-mode-pill--online' : ''}`}>
              {isOnline ? <Wifi size={13} /> : <WifiOff size={13} />}
              {isOnline ? 'Online' : 'Offline'}
            </span>
            <div className="event-card__actions">
              <button
                type="button"
                className="event-icon-btn"
                aria-label={`Edit ${event.name}`}
                onClick={() => onEdit(event)}
              >
                <Pencil size={14} />
              </button>
              <button
                type="button"
                className="event-icon-btn event-icon-btn--danger"
                aria-label={`Delete ${event.name}`}
                onClick={() => onDelete(event)}
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        </header>

        <p className="event-card__desc">{event.description}</p>

        <div className="event-meta">
          <span className="event-meta__item">
            <Clock size={14} />
            {formatTime(event.time)}
          </span>

          {isOnline && event.meetLink ? (
            <a className="event-meta__item event-meta__item--link" href={event.meetLink} target="_blank" rel="noreferrer">
              <Video size={14} />
              Join online
            </a>
          ) : (
            <span className="event-meta__item">
              <MapPin size={14} />
              {event.venue}
            </span>
          )}
        </div>

        {event.note && (
          <div className="event-note">
            <StickyNote size={13} />
            {event.note}
          </div>
        )}
      </article>
    </div>
  );
}

// One row per event in a scrolling timeline — memoize so unrelated re-renders
// (e.g. typing in the create-event form) don't re-render every row.
export default memo(EventCardBase);