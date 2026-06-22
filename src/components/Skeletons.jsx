export function TableSkeleton({ rows = 8 }) {
  return (
    <div className="skeleton-table">
      <div className="skeleton-table__toolbar">
        <span className="skeleton skeleton--pill" style={{ width: 280 }} />
        <span className="skeleton skeleton--pill" style={{ width: 120 }} />
      </div>
      {Array.from({ length: rows }).map((_, i) => (
        <div className="skeleton-table__row" key={i}>
          <span className="skeleton skeleton--circle" />
          <span className="skeleton" style={{ width: '22%' }} />
          <span className="skeleton" style={{ width: '18%' }} />
          <span className="skeleton" style={{ width: '14%' }} />
          <span className="skeleton" style={{ width: '10%' }} />
        </div>
      ))}
    </div>
  );
}

export function ProfileSkeleton() {
  return (
    <div className="skeleton-profile">
      <span className="skeleton skeleton--avatar-xl" />
      <span className="skeleton" style={{ width: '40%', height: 16 }} />
      <span className="skeleton" style={{ width: '60%', height: 12 }} />
      <div className="skeleton-profile__grid">
        {Array.from({ length: 4 }).map((_, i) => (
          <span className="skeleton" style={{ height: 40 }} key={i} />
        ))}
      </div>
    </div>
  );
}
