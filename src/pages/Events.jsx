import { useCallback, useMemo, useState } from 'react';
import { Plus, X } from 'lucide-react';
import { fetchEvents } from '../api/eventsApi';
import useApiData from '../hooks/useApiData';
import EventCard from '../components/EventCard';
import EventForm from '../components/EventForm';
import ErrorState from '../components/ErrorState';
import './events.css';

function EventListSkeleton() {
  return (
    <div className="event-timeline">
      {Array.from({ length: 3 }).map((_, i) => (
        <div className="event-row" key={i}>
          <div className="event-rail">
            <span className="skeleton skeleton--date-badge" />
            {i < 2 && <span className="event-rail__line" />}
          </div>
          <div className="event-card skeleton-event-card">
            <span className="skeleton" style={{ width: '50%', height: 16 }} />
            <span className="skeleton" style={{ width: '90%' }} />
            <span className="skeleton" style={{ width: '40%' }} />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function Events() {
  const fetcher = useCallback((signal) => fetchEvents(signal), []);
  const { data, loading, error, refetch } = useApiData(fetcher, 'events');

  // Local, editable copy of the event list. Seeded from the fetched data the
  // first time it arrives (compared by reference, set during render rather
  // than in an effect — React's documented "adjust state on prop change"
  // pattern). Create/update/delete below only ever touch this copy, so admin
  // edits aren't wiped out if the underlying fetch result is reused.
  const [items, setItems] = useState([]);
  const [seededFrom, setSeededFrom] = useState(null);
  if (data && data !== seededFrom) {
    setSeededFrom(data);
    setItems(data);
  }

  const [showForm, setShowForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);

  const openCreateForm = useCallback(() => {
    setEditingEvent(null);
    setShowForm(true);
  }, []);

  const closeForm = useCallback(() => {
    setEditingEvent(null);
    setShowForm(false);
  }, []);

  const toggleForm = useCallback(() => {
    if (showForm) closeForm();
    else openCreateForm();
  }, [showForm, closeForm, openCreateForm]);

  const handleEdit = useCallback((event) => {
    setEditingEvent(event);
    setShowForm(true);
  }, []);

  const handleDelete = useCallback((event) => {
    const confirmed = window.confirm(`Delete "${event.name}"? This can't be undone.`);
    if (!confirmed) return;
    setItems((prev) => prev.filter((e) => e.id !== event.id));
  }, []);

  const handleSubmitForm = useCallback(
    (formData) => {
      if (editingEvent) {
        setItems((prev) =>
          prev.map((e) => (e.id === editingEvent.id ? { ...e, ...formData, id: e.id } : e))
        );
      } else {
        setItems((prev) => [{ ...formData, id: `local-${Date.now()}` }, ...prev]);
      }
      setEditingEvent(null);
      setShowForm(false);
    },
    [editingEvent]
  );

  // Soonest event first — a timeline only reads well in date order.
  const events = useMemo(
    () => [...items].sort((a, b) => new Date(a.date) - new Date(b.date)),
    [items]
  );

  if (loading && items.length === 0 && !data) return <EventListSkeleton />;
  if (error) return <ErrorState message={error.message} onRetry={refetch} />;

  return (
    <div className="events-page">
      <div className="events-page__toolbar">
        <p className="events-page__count">{events.length} upcoming events</p>
        <button
          type="button"
          className={`events-add-btn${showForm ? ' events-add-btn--open' : ''}`}
          onClick={toggleForm}
        >
          {showForm ? <X size={16} /> : <Plus size={16} />}
          {showForm ? 'Close' : 'Add Event'}
        </button>
      </div>

      {showForm && (
        <EventForm
          key={editingEvent ? editingEvent.id : 'new'}
          initialEvent={editingEvent}
          onSubmit={handleSubmitForm}
          onCancel={closeForm}
        />
      )}

      {events.length === 0 ? (
        <p className="events-empty">No events yet — add the first one.</p>
      ) : (
        <div className="event-timeline">
          {events.map((event, i) => (
            <EventCard
              key={event.id}
              event={event}
              isLast={i === events.length - 1}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}