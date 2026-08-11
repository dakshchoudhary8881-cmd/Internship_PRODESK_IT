import React from 'react';

const Spinner = ({ size = 'md', center = false }) => {
  const sizes = {
    sm: '16px',
    md: '24px',
    lg: '32px'
  };

  const spinnerStyle = {
    width: sizes[size] || sizes.md,
    height: sizes[size] || sizes.md,
    border: '3px solid var(--color-border)',
    borderTopColor: 'var(--color-black)',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
    display: 'inline-block'
  };

  const containerStyle = center ? {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 'var(--space-4)',
    width: '100%',
  } : {};

  return (
    <>
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
      <div style={containerStyle} role="status" aria-label="Loading">
        <div style={spinnerStyle} />
        <span className="sr-only">Loading...</span>
      </div>
    </>
  );
};

export default Spinner;
