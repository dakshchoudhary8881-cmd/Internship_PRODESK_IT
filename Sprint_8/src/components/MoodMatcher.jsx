import { useState, memo } from 'react';

function MoodMatcher({ onMoodSubmit, isLoading, error }) {
  const [moodInput, setMoodInput] = useState('');

  const handleChange = (event) => {
    setMoodInput(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmedMood = moodInput.trim();
    if (!trimmedMood || isLoading) return;
    onMoodSubmit(trimmedMood);
  };

  return (
    <div className="mood-matcher">
      <div className="mood-matcher-header">
        <span className="mood-ai-badge">✨ AI VIBE MATCH</span>
        <span className="mood-ai-hint">Neural recommendation engine</span>
      </div>
      <form className="mood-matcher-form" onSubmit={handleSubmit}>
        <label className="mood-matcher-label" htmlFor="mood-matcher-input">
          Describe your vibe or emotion
        </label>
        <div className="mood-input-wrapper">
          <input
            id="mood-matcher-input"
            type="text"
            className="mood-matcher-input"
            value={moodInput}
            onChange={handleChange}
            placeholder="e.g. mind-bending cyber thriller, nostalgic 80s quest, emotional sci-fi…"
            autoComplete="off"
            aria-busy={isLoading}
          />
          <button
            type="submit"
            className="mood-matcher-submit"
            disabled={isLoading || !moodInput.trim()}
          >
            <span className="mood-btn-text">
              {isLoading ? '⚡ Neural Processing…' : '⚡ Match Vibe'}
            </span>
          </button>
        </div>
      </form>
      {error && (
        <p className="mood-matcher-error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

export default memo(MoodMatcher);