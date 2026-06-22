import { useNavigate } from 'react-router-dom';
import { LogIn } from 'lucide-react';
import './login.css';

export default function Login() {
  const navigate = useNavigate();

  return (
    <div className="login-screen">
      <div className="login-card">
        <span className="login-card__logo">
          <LogIn size={20} />
        </span>
        <h1>You've been logged out</h1>
        <p>Sign back in to return to your dashboard.</p>
        <button type="button" className="btn-primary" onClick={() => navigate('/')}>
          Back to Sign In
        </button>
      </div>
    </div>
  );
}
