import { useMemo, useState, useCallback, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Eye, Pencil, Trash2, Plus, Download } from 'lucide-react';
import useDebouncedValue from '../hooks/useDebouncedValue';
import useInfiniteScroll from '../hooks/useInfiniteScroll';
import StatusPill from './StatusPill';
import Avatar from './Avatar';
import './datatable.css';

const STATUS_OPTIONS = ['All Status', 'Complete', 'Pending', 'Canceled'];
const PAGE_SIZE = 25;

function currency(n) {
  return `₹${n.toLocaleString('en-IN')}`;
}

const Row = memo(function Row({ record, variant, onView, onDelete }) {
  return (
    <tr className="dt-row" onClick={() => onView(record)}>
      <td className="dt-cell dt-cell--check" onClick={(e) => e.stopPropagation()}>
        <input type="checkbox" />
      </td>
      <td className="dt-cell dt-cell--id">{record.id}</td>
      <td className="dt-cell">
        <div className="dt-user">
          <Avatar src={record.avatarUrl} name={record.name} gender={record.gender} size="md" />
          <div className="dt-user__meta">
            <span className="dt-user__name">{record.name}</span>
            <span className="dt-user__email">{record.email}</span>
          </div>
        </div>
      </td>
      <td className="dt-cell">{record.phone}</td>
      {variant === 'donations' ? (
        <>
          <td className="dt-cell">{currency(record.amount)}</td>
          <td className="dt-cell">{record.method}</td>
        </>
      ) : (
        <td className="dt-cell">{currency(record.donations)}</td>
      )}
      <td className="dt-cell">
        <StatusPill status={record.status} />
      </td>
      <td className="dt-cell dt-cell--actions" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="dt-icon-btn" onClick={() => onView(record)} aria-label="View">
          <Eye size={15} />
        </button>
        <button type="button" className="dt-icon-btn" aria-label="Edit">
          <Pencil size={15} />
        </button>
        <button
          type="button"
          className="dt-icon-btn dt-icon-btn--danger"
          aria-label="Delete"
          onClick={() => onDelete(record)}
        >
          <Trash2 size={15} />
        </button>
      </td>
    </tr>
  );
});

export default function DataTable({
  data,
  title,
  addLabel,
  variant = 'people',
  detailRoute,
}) {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('All Status');
  const debouncedQuery = useDebouncedValue(query, 250);

  // Filtering is the expensive part for large lists — only recompute when the
  // debounced query or status filter actually changes.
  const filtered = useMemo(() => {
    const q = debouncedQuery.trim().toLowerCase();
    return data.filter((r) => {
      const statusMatch = status === 'All Status' || r.status === status;
      if (!statusMatch) return false;
      if (!q) return true;
      return (
        r.name.toLowerCase().includes(q) ||
        r.email.toLowerCase().includes(q) ||
        r.phone.toLowerCase().includes(q)
      );
    });
  }, [data, debouncedQuery, status]);

  const { visibleItems, sentinelRef, hasMore } = useInfiniteScroll(filtered, PAGE_SIZE);

  const handleView = useCallback(
    (record) => {
      if (detailRoute) navigate(`${detailRoute}/${record.id}`);
    },
    [navigate, detailRoute]
  );

  const handleDelete = useCallback((record) => {
    window.alert(`Delete "${record.name}"? Wire this up to your API.`);
  }, []);

  const handleQueryChange = useCallback((e) => setQuery(e.target.value), []);

  return (
    <div className="dt-card">
      <div className="dt-toolbar">
        <div className="dt-search">
          <Search size={15} />
          <input
            type="text"
            placeholder={`Search ${data.length} records…`}
            value={query}
            onChange={handleQueryChange}
          />
        </div>
        <div className="dt-toolbar__right">
          <select className="dt-select" value={status} onChange={(e) => setStatus(e.target.value)}>
            {STATUS_OPTIONS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          <button type="button" className="dt-btn-icon" aria-label="Export">
            <Download size={16} />
          </button>
          <button type="button" className="dt-btn-primary">
            <Plus size={16} />
            {addLabel || `Add ${title}`}
          </button>
        </div>
      </div>

      <div className="dt-scroll scroll-y">
        <div className="dt-scroll-x">
        <table className="dt-table">
          <thead>
            <tr>
              <th className="dt-cell--check">
                <input type="checkbox" />
              </th>
              <th>#</th>
              <th>User Info</th>
              <th>Contact</th>
              {variant === 'donations' ? (
                <>
                  <th>Amount</th>
                  <th>Method</th>
                </>
              ) : (
                <th>Donations</th>
              )}
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {visibleItems.map((record) => (
              <Row
                key={record.id}
                record={record}
                variant={variant}
                onView={handleView}
                onDelete={handleDelete}
              />
            ))}
            {visibleItems.length === 0 && (
              <tr>
                <td colSpan={8} className="dt-empty">
                  No records match your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        </div>
        {hasMore && (
          <div ref={sentinelRef} className="dt-sentinel">
            <span className="dt-sentinel__spinner" />
            Loading more…
          </div>
        )}
      </div>
    </div>
  );
}
