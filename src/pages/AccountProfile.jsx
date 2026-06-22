import Avatar from '../components/Avatar';
import './profile.css';

function SocialBadge({ label, color }) {
  return (
    <span className="social-badge" style={{ background: color }}>
      {label}
    </span>
  );
}

const TABS = ['Profile', 'Personal', 'My Account', 'Change Password', 'Role', 'Settings'];

export default function AccountProfile() {
  return (
    <div className="profile-page">
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
            <Avatar name="Anshan Handgun" gender="female" size="xl" />
          </div>

          <div className="profile-field-grid">
            <div className="profile-field">
              <label>First Name</label>
              <input className="profile-field__value" defaultValue="Anshan" />
            </div>
            <div className="profile-field">
              <label>Last Name</label>
              <input className="profile-field__value" defaultValue="Handgun" />
            </div>
            <div className="profile-field">
              <label>Country</label>
              <input className="profile-field__value" defaultValue="New York" />
            </div>
            <div className="profile-field">
              <label>Zipcode</label>
              <input className="profile-field__value" defaultValue="956754" />
            </div>
            <div className="profile-field profile-field--full">
              <label>Bio</label>
              <textarea
                rows={3}
                defaultValue="Hello, I'm Anshan Handgun, Admin & Program Coordinator. I oversee member onboarding, volunteer coordination and donation tracking for the organisation."
              />
            </div>
            <div className="profile-field">
              <label>Experience</label>
              <select className="profile-field__value">
                <option>Start Up</option>
                <option>Mid Level</option>
                <option>Senior</option>
              </select>
            </div>
          </div>

          <div className="profile-actions">
            <button type="button" className="btn-secondary">
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
              <span className="profile-social-row__value">Anshan Handgun</span>
            </div>
            <div className="profile-social-row">
              <span className="profile-social-row__left">
                <SocialBadge label="in" color="#0a66c2" /> LinkedIn
              </span>
              <span className="profile-social-row__value">Connect</span>
            </div>
          </div>

          <div className="profile-card">
            <h2 className="profile-card__title">Contact Information</h2>
            <div className="profile-field" style={{ marginBottom: 14 }}>
              <label>Phone Number</label>
              <input className="profile-field__value" defaultValue="+1 (865) 423-9581" />
            </div>
            <div className="profile-field" style={{ marginBottom: 14 }}>
              <label>Email Address</label>
              <input className="profile-field__value" defaultValue="stebin.ben@gmail.com" />
            </div>
            <div className="profile-field">
              <label>Address</label>
              <input
                className="profile-field__value"
                defaultValue="Street 110-B Kalians Bag, Dewan, M.P. New York"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
