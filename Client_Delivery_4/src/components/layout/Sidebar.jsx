import React from 'react';

const Sidebar = ({ currentPath, onNavigate }) => {
  const sidebarStyle = {
    width: '240px',
    backgroundColor: 'var(--color-white)',
    borderRight: '1px solid var(--color-border)',
    display: 'flex',
    flexDirection: 'column',
    padding: 'var(--space-3) 0',
    flexShrink: 0,
  };

  const navItemStyle = (isActive) => ({
    padding: '12px var(--space-4)',
    cursor: 'pointer',
    backgroundColor: isActive ? 'var(--color-light-gray)' : 'transparent',
    color: isActive ? 'var(--color-black)' : 'var(--color-dark-gray)',
    fontWeight: isActive ? '600' : '400',
    borderRight: isActive ? '3px solid var(--color-black)' : '3px solid transparent',
    transition: 'all 0.2s',
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--space-2)',
  });

  return (
    <nav style={sidebarStyle} aria-label="Main Navigation">
      <div 
        style={navItemStyle(currentPath === 'dashboard')} 
        onClick={() => onNavigate('dashboard')}
        role="button"
        tabIndex="0"
        onKeyDown={(e) => e.key === 'Enter' && onNavigate('dashboard')}
      >
        Dashboard
      </div>
      <div 
        style={navItemStyle(currentPath === 'flyers')} 
        onClick={() => onNavigate('flyers')}
        role="button"
        tabIndex="0"
        onKeyDown={(e) => e.key === 'Enter' && onNavigate('flyers')}
      >
        Members Management
      </div>
    </nav>
  );
};

export default Sidebar;
