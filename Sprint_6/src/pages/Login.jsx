import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Button from '../components/Button';

/**
 * Modern Guest Login Page Component
 */
const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isLoggedIn } = useAuth();

  const [guestName, setGuestName] = useState('Alex Rivera');
  const [guestEmail, setGuestEmail] = useState('alex.rivera@aurora.dev');

  // If user was redirected from protected route, return there after login
  const destination = location.state?.from?.pathname || '/checkout';

  const handleGuestLogin = (e) => {
    if (e) e.preventDefault();
    login({ name: guestName || 'Guest Shopper', email: guestEmail || 'guest@aurora.store' });
    navigate(destination, { replace: true });
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: 'var(--radius-xl)',
              background: 'linear-gradient(135deg, var(--primary), var(--accent))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontSize: '1.75rem',
              margin: '0 auto 1.25rem',
              boxShadow: '0 8px 24px var(--primary-glow)'
            }}
          >
            🔐
          </div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>
            Welcome to Aurora
          </h1>
          <p style={{ color: 'var(--text-muted)' }}>
            Sign in as a guest to securely complete your order and track shipping.
          </p>
        </div>

        <form onSubmit={handleGuestLogin}>
          <div className="form-group" style={{ textAlign: 'left' }}>
            <label className="form-label">Guest Full Name</label>
            <input
              type="text"
              className="form-input"
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              placeholder="Enter your name"
              required
            />
          </div>

          <div className="form-group" style={{ textAlign: 'left', marginBottom: '2rem' }}>
            <label className="form-label">Email Address (for order receipt)</label>
            <input
              type="email"
              className="form-input"
              value={guestEmail}
              onChange={(e) => setGuestEmail(e.target.value)}
              placeholder="you@domain.com"
              required
            />
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            style={{ width: '100%' }}
          >
            Login As Guest →
          </Button>
        </form>

        <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-color)', fontSize: '0.85rem', color: 'var(--text-light)' }}>
          🔒 Your session is encrypted and securely stored on your local browser.
        </div>
      </div>
    </div>
  );
};

export default Login;
