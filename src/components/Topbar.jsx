import { memo } from 'react';
import { useLocation } from 'react-router-dom';
import { Bell, Search, Menu } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import Avatar from './Avatar';

const TITLES = {
  '/': 'Dashboard',
  '/members': 'Members',
  '/volunteers': 'Volunteers',
  '/donations': 'Donations',
  '/events': 'Events',
  '/communication/email': 'Email',
  '/communication/whatsapp': 'WhatsApp',
  '/communication/message': 'Message',
  '/profile': 'My Profile',
};

function resolveTitle(pathname) {
  if (TITLES[pathname]) return TITLES[pathname];
  if (pathname.startsWith('/members/')) return 'Member Profile';
  if (pathname.startsWith('/volunteers/')) return 'Volunteer Profile';
  return 'Dashboard';
}

function TopbarBase({ onMenuClick }) {
  const { pathname } = useLocation();
  const title = resolveTitle(pathname);

  return (
    <header className="topbar">
      <div className="topbar__title">
        <button type="button" className="topbar__menu-btn" onClick={onMenuClick} aria-label="Open menu">
          <Menu size={20} />
        </button>
        <h1>{title}</h1>
      </div>
      <div className="topbar__actions">
        <div className="topbar__search">
          <Search size={15} />
          <input type="text" placeholder="Quick search…" />
          <kbd>⌘K</kbd>
        </div>
        <ThemeToggle />
        <button type="button" className="topbar__icon-btn" aria-label="Notifications">
          <Bell size={18} />
          <span className="topbar__badge">2</span>
        </button>
        <Avatar name="Anshan Handgun" gender="female" size={36} />
      </div>
    </header>
  );
}

const Topbar = memo(TopbarBase);
export default Topbar;
