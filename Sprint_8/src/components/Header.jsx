import { memo } from 'react';

const VIEW_OPTIONS = [
  { id: 'popular', label: '🔥 Popular & Trending' },
  { id: 'favorites', label: '💖 My Watchlist' },
];

function Header({ activeView, onViewChange }) {
  return (
    <header className="app-header">
      <div
        className="brand"
        onClick={() => onViewChange('popular')}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onViewChange('popular');
          }
        }}
      >
        <div className="brand-logo-icon" aria-hidden="true">
          <span>⚡</span>
        </div>
        <div className="brand-text">
          <span className="brand-name">CINEVERSE</span>
          <span className="brand-tag">AI STUDIO</span>
        </div>
      </div>
      <nav className="nav-actions" aria-label="Main navigation">
        {VIEW_OPTIONS.map((option) => (
          <button
            key={option.id}
            type="button"
            className={
              activeView === option.id
                ? 'nav-action nav-action-active'
                : 'nav-action'
            }
            aria-pressed={activeView === option.id}
            onClick={() => onViewChange(option.id)}
          >
            <span className="nav-action-label">{option.label}</span>
            {activeView === option.id && <span className="nav-action-glow" />}
          </button>
        ))}
      </nav>
    </header>
  );
}

export default memo(Header);