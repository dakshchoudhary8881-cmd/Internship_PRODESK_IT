import React from 'react';

const Header = () => {
  const headerStyle = {
    backgroundColor: 'var(--color-white)',
    borderBottom: '1px solid var(--color-border)',
    padding: 'var(--space-2) var(--space-4)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '64px',
    position: 'sticky',
    top: 0,
    zIndex: 10,
  };

  const brandStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--space-2)',
  };

  const logoStyle = {
    fontWeight: '700',
    fontSize: '1.25rem',
    color: 'var(--color-black)',
    letterSpacing: '-0.5px',
  };

  const userStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--space-2)',
    fontSize: '0.875rem',
    color: 'var(--color-dark-gray)',
  };

  const avatarStyle = {
    width: '32px',
    height: '32px',
    backgroundColor: 'var(--color-black)',
    color: 'var(--color-white)',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '600',
  };

  return (
    <header style={headerStyle}>
      <div style={brandStyle}>
        <div style={logoStyle}>SkyHigh Airlines</div>
        <div style={{ color: 'var(--color-medium-gray)' }}>|</div>
        <div style={{ fontWeight: 500 }}>Frequent Flyer Portal</div>
      </div>
      <div style={userStyle}>
        <span>Jane Doe (Admin)</span>
        <div style={avatarStyle}>JD</div>
      </div>
    </header>
  );
};

export default Header;
