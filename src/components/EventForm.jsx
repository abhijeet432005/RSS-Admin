import { useState, useCallback } from "react";
import { X, Check } from "lucide-react";

const EMPTY_FORM = {
  name: "",
  description: "",
  date: "",
  time: "",
  venue: "",
  mode: "offline",
  meetLink: "",
  note: "",
};

export default function EventForm({ initialEvent, onSubmit, onCancel }) {
  const isEditing = Boolean(initialEvent);
  const [form, setForm] = useState(() =>
    initialEvent ? { ...EMPTY_FORM, ...initialEvent } : EMPTY_FORM,
  );

  const handleChange = useCallback(
    (field) => (e) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
    },
    [],
  );

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (!form.name.trim()) return;
      onSubmit({
        ...form,
        venue:
          form.mode === "online"
            ? form.venue || "Online (link shared below)"
            : form.venue,
      });
      if (!isEditing) setForm(EMPTY_FORM);
    },
    [form, onSubmit, isEditing],
  );

  return (
    <form className="event-form" onSubmit={handleSubmit}>
      <div className="event-form__header">
        <h3>{isEditing ? "Edit Event" : "Add Event"}</h3>
        <button
          type="button"
          className="event-form__close"
          onClick={onCancel}
          aria-label="Close"
        >
          <X size={16} />
        </button>
      </div>

      <div className="event-form__field">
        <label htmlFor="ev-name">Event Name</label>
        <input
          id="ev-name"
          type="text"
          value={form.name}
          onChange={handleChange("name")}
          placeholder="e.g. Annual Fundraising Gala"
          required
        />
      </div>

      <div className="event-form__field">
        <label htmlFor="ev-desc">Description</label>
        <textarea
          id="ev-desc"
          rows={3}
          value={form.description}
          onChange={handleChange("description")}
          placeholder="What's this event about?"
        />
      </div>

      <div className="event-form__field">
        <label htmlFor="ev-date">Date</label>
        <input
          id="ev-date"
          type="date"
          value={form.date}
          onChange={handleChange("date")}
          required
        />
      </div>

      <div className="event-form__field">
        <label htmlFor="ev-time">Time</label>
        <input
          id="ev-time"
          type="time"
          value={form.time}
          onChange={handleChange("time")}
          required
        />
      </div>

      <div className="event-form__field">
        <label htmlFor="ev-mode">Online / Offline</label>
        <select id="ev-mode" value={form.mode} onChange={handleChange("mode")}>
          <option value="offline">Offline</option>
          <option value="online">Online</option>
        </select>
      </div>

      <div className="event-form__field">
        <label htmlFor="ev-venue">
          {form.mode === "online" ? "Platform (optional)" : "Venue"}
        </label>
        <input
          id="ev-venue"
          type="text"
          value={form.venue}
          onChange={handleChange("venue")}
          placeholder={
            form.mode === "online"
              ? "e.g. Zoom, Google Meet"
              : "e.g. Community Hall, MG Road"
          }
          required={form.mode === "offline"}
        />
      </div>

      {form.mode === "online" && (
        <div className="event-form__field">
          <label htmlFor="ev-link">Meet Link</label>
          <input
            id="ev-link"
            type="url"
            value={form.meetLink}
            onChange={handleChange("meetLink")}
            placeholder="https://meet.google.com/…"
            required
          />
        </div>
      )}

      <div className="event-form__field">
        <label htmlFor="ev-note">Special Note</label>
        <textarea
          id="ev-note"
          rows={2}
          value={form.note}
          onChange={handleChange("note")}
          placeholder="Anything attendees should know? (optional)"
        />
      </div>

      <div className="event-form__actions">
        <button
          type="button"
          className="event-form__btn event-form__btn--cancel"
          onClick={onCancel}
        >
          Cancel
        </button>
        <button type="submit" className="event-form__btn event-form__btn--save">
          <Check size={15} />
          {isEditing ? "Update Event" : "Save Event"}
        </button>
      </div>
    </form>
  );
}
