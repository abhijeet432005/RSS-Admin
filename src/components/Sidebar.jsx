import { useState, memo, useCallback } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  HeartHandshake,
  HandCoins,
  CalendarDays,
  MessageSquare,
  Mail,
  MessageCircle,
  Send,
  ChevronDown,
  LogOut,
  Sparkles,
  X,
} from 'lucide-react';
import Avatar from './Avatar';
import './sidebar.css';

const NAV_ITEMS = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/members', label: 'Members', icon: Users },
  { to: '/volunteers', label: 'Volunteers', icon: HeartHandshake },
  { to: '/donations', label: 'Donations', icon: HandCoins },
  { to: '/events', label: 'Events', icon: CalendarDays },
];

const COMM_CHILDREN = [
  { to: '/communication/email', label: 'Email', icon: Mail },
  { to: '/communication/whatsapp', label: 'WhatsApp', icon: MessageCircle },
  { to: '/communication/message', label: 'Message', icon: Send },
];

function NavItem({ to, label, icon: Icon, end }) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) => `nav-item${isActive ? ' nav-item--active' : ''}`}
    >
      <span className="nav-item__bar" />
      <Icon size={18} strokeWidth={2} className="nav-item__icon" />
      <span className="nav-item__label">{label}</span>
    </NavLink>
  );
}

function CommunicationMenu() {
  const location = useLocation();
  const isChildActive = COMM_CHILDREN.some((c) => location.pathname.startsWith(c.to));
  const [open, setOpen] = useState(isChildActive);

  const toggle = useCallback(() => setOpen((o) => !o), []);

  return (
    <div className="nav-group">
      <button
        type="button"
        className={`nav-item nav-item--parent${isChildActive ? ' nav-item--active-parent' : ''}`}
        onClick={toggle}
        aria-expanded={open}
      >
        <span className="nav-item__bar" />
        <MessageSquare size={18} strokeWidth={2} className="nav-item__icon" />
        <span className="nav-item__label">Communication</span>
        <ChevronDown
          size={16}
          className="nav-item__chevron"
          style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
        />
      </button>
      <div className={`nav-submenu${open ? ' nav-submenu--open' : ''}`}>
        {COMM_CHILDREN.map((child) => (
          <NavLink
            key={child.to}
            to={child.to}
            className={({ isActive }) =>
              `nav-subitem${isActive ? ' nav-subitem--active' : ''}`
            }
          >
            <span className="nav-subitem__dot" />
            {child.label}
          </NavLink>
        ))}
      </div>
    </div>
  );
}

function SidebarBase({ open = false, onClose }) {
  const navigate = useNavigate();

  const handleLogout = useCallback(() => {
    // Placeholder logout action — wire up real auth flow later.
    navigate('/login');
    onClose?.();
  }, [navigate, onClose]);

  return (
    <>
      {open && <div className="sidebar-backdrop" onClick={onClose} aria-hidden="true" />}
      <aside className={`sidebar${open ? ' sidebar--open' : ''}`}>
        <div className="sidebar__brand">
          <span className="sidebar__logo">
            <Sparkles size={20} strokeWidth={2.4} />
          </span>
          <span className="sidebar__brand-name">CauseHub</span>
          <button type="button" className="sidebar__close" onClick={onClose} aria-label="Close menu">
            <X size={18} />
          </button>
        </div>

        <div className="sidebar__scroll scroll-y" onClick={onClose}>
          <p className="sidebar__section-label">Overview</p>
          {NAV_ITEMS.map((item) => (
            <NavItem key={item.to} {...item} />
          ))}

          <p className="sidebar__section-label">Outreach</p>
          <CommunicationMenu />
        </div>

        <div className="sidebar__footer">
          <NavLink to="/profile" className="sidebar__profile" onClick={onClose}>
            <Avatar name="Anshan Handgun" gender="female" size={36} />
            <span className="sidebar__profile-meta">
              <span className="sidebar__profile-name">Anshan Handgun</span>
              <span className="sidebar__profile-role">UI/UX Designer</span>
            </span>
          </NavLink>
          <button type="button" className="sidebar__logout" onClick={handleLogout}>
            <LogOut size={17} strokeWidth={2} />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}

// Sidebar re-renders when the mobile `open` state toggles, but otherwise
// has stable props — memoize to skip re-rendering the whole nav tree on
// unrelated route/content changes.
const Sidebar = memo(SidebarBase);
export default Sidebar;
