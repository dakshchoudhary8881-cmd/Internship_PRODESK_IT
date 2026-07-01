import { useState } from 'react';
import { PRIORITIES, PRIORITY_CONFIG } from '../utils/constants';
import './TaskForm.css';

export default function TaskForm({ onAddTask }) {
  const [text, setText] = useState('');
  const [priority, setPriority] = useState(PRIORITIES.MEDIUM);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;

    onAddTask(trimmed, priority);
    setText('');
    setPriority(PRIORITIES.MEDIUM);
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div className="task-form__console">
        <div className="task-form__icon-prefix" aria-hidden="true">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
          </svg>
        </div>

        <div className="task-form__input-wrapper">
          <input
            id="task-input"
            type="text"
            className="task-form__input"
            placeholder="Type a new task description or action item..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            aria-label="Task description"
            autoComplete="off"
          />
        </div>

        <div className="task-form__controls">
          <div className="task-form__select-wrapper">
            <select
              id="priority-select"
              className="task-form__select"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              aria-label="Task priority"
            >
              {Object.values(PRIORITIES).map((p) => (
                <option key={p} value={p}>
                  {PRIORITY_CONFIG[p].icon} {PRIORITY_CONFIG[p].label} Priority
                </option>
              ))}
            </select>
            <span className="task-form__select-arrow">▼</span>
          </div>

          <button
            id="add-task-btn"
            type="submit"
            className="task-form__btn"
            disabled={!text.trim()}
          >
            <span className="task-form__btn-icon">+</span>
            <span>Create Task</span>
          </button>
        </div>
      </div>
    </form>
  );
}

