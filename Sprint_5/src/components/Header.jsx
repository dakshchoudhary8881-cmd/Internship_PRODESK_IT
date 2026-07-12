import './Header.css';

export default function Header({ searchText, onSearchChange, taskCounts }) {
  return (
    <header className="header">
      <div className="header__brand">
        <div className="header__logo" aria-hidden="true">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
          </svg>
          <div className="header__logo-glow" />
        </div>
        <div>
          <div className="header__title-row">
            <h1 className="header__title">TaskFlow</h1>
            <span className="header__pro-badge">PRO</span>
          </div>
          <p className="header__subtitle">
            <span className="header__live-dot" /> Sprint 05 · Advanced Kanban Engine
          </p>
        </div>
      </div>

      <div className="header__search">
        <span className="header__search-icon" aria-hidden="true">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </span>
        <input
          id="global-search"
          type="text"
          className="header__search-input"
          placeholder="Search across all tasks…"
          value={searchText}
          onChange={(e) => onSearchChange(e.target.value)}
          aria-label="Search tasks"
        />
        {!searchText ? (
          <span className="header__search-shortcut" aria-hidden="true">/</span>
        ) : (
          <button
            className="header__search-clear"
            onClick={() => onSearchChange('')}
            aria-label="Clear search"
          >
            ✕
          </button>
        )}
      </div>

      <div className="header__stats">
        <div className="header__stat-badge header__stat-badge--todo">
          <span className="stat-dot stat-dot--todo" />
          <span className="stat-label">To Do</span>
          <span className="header__stat-count">{taskCounts.todo}</span>
        </div>
        <div className="header__stat-badge header__stat-badge--progress">
          <span className="stat-dot stat-dot--progress" />
          <span className="stat-label">In Progress</span>
          <span className="header__stat-count">{taskCounts.inProgress}</span>
        </div>
        <div className="header__stat-badge header__stat-badge--done">
          <span className="stat-dot stat-dot--done" />
          <span className="stat-label">Done</span>
          <span className="header__stat-count">{taskCounts.done}</span>
        </div>
      </div>
    </header>
  );
}

