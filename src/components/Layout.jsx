import { Suspense, useCallback, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import PageLoader from './PageLoader';
import './layout.css';

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const openSidebar = useCallback(() => setSidebarOpen(true), []);
  const closeSidebar = useCallback(() => setSidebarOpen(false), []);

  return (
    <div className="app-shell">
      <Sidebar open={sidebarOpen} onClose={closeSidebar} />
      <div className="app-main">
        <Topbar onMenuClick={openSidebar} />
        <main className="app-content scroll-y">
          <Suspense fallback={<PageLoader />}>
            <Outlet />
          </Suspense>
        </main>
      </div>
    </div>
  );
}
