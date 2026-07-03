import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import Button from './Button';

/**
 * Modern Compact In-Place Login Modal Component rendered via Portal
 */
const LoginModal = ({ isOpen, onClose }) => {
  const { login } = useAuth();
  const { showToast } = useCart();
  const [email, setEmail] = useState('alex.rivera@aurora.store');
  const [password, setPassword] = useState('secret123');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      const nameFromEmail = email.split('@')[0].replace('.', ' ').replace(/\b\w/g, l => l.toUpperCase());
      login({ name: nameFromEmail || 'Alex Rivera', email });
      showToast(`Welcome back, ${nameFromEmail || 'Alex'}!`);
      onClose();
    }, 500);
  };

  const handleGuestLogin = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      login({ name: 'Guest Shopper', email: 'guest@aurora.store' });
      showToast('Logged in as Guest Shopper!');
      onClose();
    }, 300);
  };

  return ReactDOM.createPortal(
    <div className="modal-overlay" onClick={onClose} style={{ zIndex: 99999 }}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '420px',
          width: '100%',
          padding: '2rem',
          position: 'relative',
          margin: 'auto',
          maxHeight: '90vh',
          overflowY: 'auto',
          textAlign: 'left'
        }}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            background: 'var(--bg-subtle)',
            border: '1px solid var(--border-color)',
            width: '32px',
            height: '32px',
            borderRadius: 'var(--radius-full)',
            fontSize: '1rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--text-main)'
          }}
          aria-label="Close modal"
        >
          ✕
        </button>

        <div style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
          <div style={{ fontSize: '2.2rem', marginBottom: '0.25rem' }}>🔐</div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, margin: 0 }}>Sign In to Aurora</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '0.25rem' }}>
            Access orders, wishlist & member rewards
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label" style={{ fontSize: '0.85rem', marginBottom: '0.3rem' }}>Email Address</label>
            <input
              type="email"
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ padding: '0.7rem 0.95rem', fontSize: '0.9rem' }}
              required
            />
          </div>

          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label" style={{ fontSize: '0.85rem', marginBottom: '0.3rem' }}>Password</label>
            <input
              type="password"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ padding: '0.7rem 0.95rem', fontSize: '0.9rem' }}
              required
            />
          </div>

          <Button type="submit" variant="primary" size="md" loading={loading} style={{ width: '100%', marginTop: '0.5rem', fontWeight: 700, padding: '0.75rem' }}>
            Sign In Now
          </Button>
        </form>

        <div style={{ display: 'flex', alignItems: 'center', margin: '1.25rem 0', color: 'var(--text-light)' }}>
          <div style={{ flex: 1, height: '1px', background: 'var(--border-color)' }}></div>
          <span style={{ padding: '0 0.6rem', fontSize: '0.75rem', fontWeight: 700 }}>OR</span>
          <div style={{ flex: 1, height: '1px', background: 'var(--border-color)' }}></div>
        </div>

        <Button
          variant="outline"
          size="md"
          style={{ width: '100%', fontWeight: 700, fontSize: '0.9rem', padding: '0.75rem' }}
          onClick={handleGuestLogin}
        >
          👤 Instant One-Click Guest Sign In
        </Button>
      </div>
    </div>,
    document.body
  );
};

export default LoginModal;
