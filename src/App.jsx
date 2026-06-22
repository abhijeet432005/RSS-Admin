import { lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';

// Route-level code splitting: each page is only downloaded when first
// navigated to, keeping the initial bundle small.
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Members = lazy(() => import('./pages/Members'));
const Volunteers = lazy(() => import('./pages/Volunteers'));
const Donations = lazy(() => import('./pages/Donations'));
const Events = lazy(() => import('./pages/Events'));
const CommEmail = lazy(() => import('./pages/communication/Email'));
const CommWhatsApp = lazy(() => import('./pages/communication/WhatsApp'));
const CommMessage = lazy(() => import('./pages/communication/Message'));
const AccountProfile = lazy(() => import('./pages/AccountProfile'));
const RecordProfile = lazy(() => import('./pages/RecordProfile'));
const Login = lazy(() => import('./pages/Login'));
const NotFound = lazy(() => import('./pages/NotFound'));

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="members" element={<Members />} />
        <Route path="members/:id" element={<RecordProfile kind="member" />} />
        <Route path="volunteers" element={<Volunteers />} />
        <Route path="volunteers/:id" element={<RecordProfile kind="volunteer" />} />
        <Route path="donations" element={<Donations />} />
        <Route path="events" element={<Events />} />
        <Route path="communication/email" element={<CommEmail />} />
        <Route path="communication/whatsapp" element={<CommWhatsApp />} />
        <Route path="communication/message" element={<CommMessage />} />
        <Route path="profile" element={<AccountProfile />} />
        <Route path="*" element={<NotFound />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
