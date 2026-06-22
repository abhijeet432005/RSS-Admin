import { useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { fetchRecordById } from '../api/peopleApi';
import useApiData from '../hooks/useApiData';
import Avatar from '../components/Avatar';
import StatusPill from '../components/StatusPill';
import { ProfileSkeleton } from '../components/Skeletons';
import ErrorState from '../components/ErrorState';
import './profile.css';

function SocialBadge({ label, color }) {
  return (
    <span className="social-badge" style={{ background: color }}>
      {label}
    </span>
  );
}

const TABS = ['Profile', 'Personal', 'My Account', 'Activity', 'Settings'];

export default function RecordProfile({ kind }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const fetcher = useCallback((signal) => fetchRecordById(kind, id, signal), [kind, id]);
  const { data: record, loading, error, refetch } = useApiData(fetcher, `${kind}-${id}`);

  const backLabel = kind === 'volunteer' ? 'Volunteers' : 'Members';

  if (loading && !record) {
    return (
      <div className="profile-page">
        <button type="button" className="profile-back" onClick={() => navigate(-1)}>
          <ArrowLeft size={15} /> Back to {backLabel}
        </button>
        <ProfileSkeleton />
      </div>
    );
  }

  if (error) {
    return (
      <div className="profile-page">
        <button type="button" className="profile-back" onClick={() => navigate(-1)}>
          <ArrowLeft size={15} /> Back to {backLabel}
        </button>
        <ErrorState message={error.message} onRetry={refetch} />
      </div>
    );
  }

  if (!record) {
    return (
      <div className="profile-page">
        <button type="button" className="profile-back" onClick={() => navigate(-1)}>
          <ArrowLeft size={15} /> Back
        </button>
        <p>Record not found.</p>
      </div>
    );
  }

  const [firstName, ...rest] = record.name.split(' ');
  const lastName = rest.join(' ');

  return (
    <div className="profile-page">
      <button type="button" className="profile-back" onClick={() => navigate(-1)}>
        <ArrowLeft size={15} /> Back to {backLabel}
      </button>

      <div className="profile-tabs">
        {TABS.map((tab) => (
          <span key={tab} className={`profile-tab${tab === 'Personal' ? ' profile-tab--active' : ''}`}>
            {tab}
          </span>
        ))}
      </div>

      <div className="profile-grid">
        <div className="profile-card">
          <h2 className="profile-card__title">Personal Information</h2>

          <div className="profile-avatar-row">
            <Avatar src={record.avatarUrl} name={record.name} gender={record.gender} size="xl" />
            <span className="profile-avatar-row__name">{record.name}</span>
            <span className="profile-avatar-row__role">{record.role}</span>
          </div>

          <div className="profile-field-grid">
            <div className="profile-field">
              <label>First Name</label>
              <div className="profile-field__value">{firstName}</div>
            </div>
            <div className="profile-field">
              <label>Last Name</label>
              <div className="profile-field__value">{lastName || '—'}</div>
            </div>
            <div className="profile-field">
              <label>Country</label>
              <div className="profile-field__value">{record.country}</div>
            </div>
            <div className="profile-field">
              <label>Zipcode</label>
              <div className="profile-field__value">{record.zipcode}</div>
            </div>
            <div className="profile-field profile-field--full">
              <label>Bio</label>
              <textarea readOnly rows={3} value={record.bio} />
            </div>
            <div className="profile-field">
              <label>Cause Supported</label>
              <div className="profile-field__value">{record.cause}</div>
            </div>
            <div className="profile-field">
              <label>Status</label>
              <div className="profile-field__value">
                <StatusPill status={record.status} />
              </div>
            </div>
          </div>

          <div className="profile-actions">
            <button type="button" className="btn-secondary" onClick={() => navigate(-1)}>
              Cancel
            </button>
            <button type="button" className="btn-primary">
              Update Profile
            </button>
          </div>
        </div>

        <div>
          <div className="profile-card profile-side-card">
            <h2 className="profile-card__title">Social Network</h2>
            <div className="profile-social-row">
              <span className="profile-social-row__left">
                <SocialBadge label="X" color="#1d9bf0" /> Twitter
              </span>
              <span className="profile-social-row__value">Connect</span>
            </div>
            <div className="profile-social-row">
              <span className="profile-social-row__left">
                <SocialBadge label="f" color="#1877f2" /> Facebook
              </span>
              <span className="profile-social-row__value">{record.name}</span>
            </div>
            <div className="profile-social-row">
              <span className="profile-social-row__left">
                <SocialBadge label="in" color="#0a66c2" /> LinkedIn
              </span>
              <span className="profile-social-row__value">Connect</span>
            </div>
          </div>

          <div className="profile-card profile-side-card">
            <h2 className="profile-card__title">Contact Information</h2>
            <div className="profile-field" style={{ marginBottom: 14 }}>
              <label>Phone Number</label>
              <div className="profile-field__value">{record.phone}</div>
            </div>
            <div className="profile-field" style={{ marginBottom: 14 }}>
              <label>Email Address</label>
              <div className="profile-field__value">{record.email}</div>
            </div>
            <div className="profile-field">
              <label>Address</label>
              <div className="profile-field__value">{record.address}</div>
            </div>
          </div>

          <div className="profile-card">
            <h2 className="profile-card__title">Contribution Summary</h2>
            <div className="profile-stat-row">
              <span className="profile-stat-row__label">Total Donations</span>
              <span className="profile-stat-row__value">
                ₹{record.donations.toLocaleString('en-IN')}
              </span>
            </div>
            <div className="profile-stat-row">
              <span className="profile-stat-row__label">Joined</span>
              <span className="profile-stat-row__value">{record.joined}</span>
            </div>
            <div className="profile-stat-row">
              <span className="profile-stat-row__label">Age</span>
              <span className="profile-stat-row__value">{record.age}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
