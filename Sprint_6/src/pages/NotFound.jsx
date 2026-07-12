import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';

/**
 * Custom 404 Page Component
 */
const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="container" style={{ padding: '6rem 1.5rem', textAlign: 'center', minHeight: '70vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justify: 'center' }}>
      {/* Creative SVG Illustration */}
      <div style={{ marginBottom: '2.5rem', maxWidth: '360px', width: '100%' }}>
        <svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="200" cy="150" r="120" fill="var(--primary-light)" opacity="0.5" />
          <path d="M140 130 C140 120, 160 120, 160 130" stroke="var(--primary)" strokeWidth="8" strokeLinecap="round" />
          <path d="M240 130 C240 120, 260 120, 260 130" stroke="var(--primary)" strokeWidth="8" strokeLinecap="round" />
          <path d="M160 200 Q200 170 240 200" stroke="var(--danger)" strokeWidth="8" strokeLinecap="round" />
          <text x="50%" y="45%" textAnchor="middle" fill="var(--primary)" fontSize="72" fontWeight="900" dy="20" opacity="0.15">404</text>
        </svg>
      </div>

      <h1 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '0.75rem' }}>
        Lost in Cyberspace
      </h1>
      <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', maxWidth: '500px', marginBottom: '2.5rem' }}>
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>

      <Button
        variant="primary"
        size="lg"
        onClick={() => navigate('/')}
      >
        ← Back To Home
      </Button>
    </div>
  );
};

export default NotFound;
