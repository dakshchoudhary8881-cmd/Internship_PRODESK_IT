import { memo } from 'react';

function SearchBar({ value, onChange, placeholder = 'Search titles, actors, or themes…' }) {
  const handleChange = (event) => {
    onChange(event.target.value);
  };

  const handleClear = () => {
    onChange('');
  };

  return (
    <div className="search-bar">
      <label className="search-bar-label" htmlFor="movie-search-input">
        Search movies
      </label>
      <div className="search-bar-wrapper">
        <div className="search-bar-icon" aria-hidden="true">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M20 20L16.5 16.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>
        <input
          id="movie-search-input"
          type="text"
          className="search-bar-input"
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          autoComplete="off"
        />
        {value && (
          <button
            type="button"
            className="search-bar-clear"
            onClick={handleClear}
            aria-label="Clear search"
          >
            <span>✕</span>
          </button>
        )}
      </div>
    </div>
  );
}

export default memo(SearchBar);