import { useState } from 'react';
import { COLUMNS, PRIORITY_CONFIG } from '../utils/constants';
import Column from './Column';
import './Board.css';

export default function Board({ tasks, searchText, onDelete, onMove, onEdit, onClearAll }) {
  const [selectedPriority, setSelectedPriority] = useState('ALL');
  const [sortBy, setSortBy] = useState('DEFAULT');

  // Filter and sort tasks for each column
  const processTasks = (columnTasks) => {
    let result = [...columnTasks];

    // Search filter
    if (searchText.trim()) {
      const query = searchText.toLowerCase();
      result = result.filter((task) =>
        task.text.toLowerCase().includes(query)
      );
    }

    // Priority filter
    if (selectedPriority !== 'ALL') {
      result = result.filter((task) => task.priority === selectedPriority.toLowerCase());
    }

    // Sorting
    if (sortBy === 'PRIORITY') {
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      result.sort((a, b) => (priorityOrder[b.priority] || 0) - (priorityOrder[a.priority] || 0));
    } else if (sortBy === 'NEWEST') {
      result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    return result;
  };

  // Calculate total tasks and active count across all columns
  const allTasksList = Object.values(tasks).flat();
  const totalCount = allTasksList.length;
  const processedCount = Object.values(COLUMNS).reduce(
    (acc, colId) => acc + processTasks(tasks[colId] || []).length,
    0
  );

  return (
    <div className="board-container">
      <div className="board-toolbar">
        <div className="board-toolbar__left">
          <span className="board-toolbar__title">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
            </svg>
            Quick Filters:
          </span>
          <div className="board-toolbar__filters">
            <button
              className={`board-filter-chip ${selectedPriority === 'ALL' ? 'board-filter-chip--active' : ''}`}
              onClick={() => setSelectedPriority('ALL')}
            >
              All Priorities ({totalCount})
            </button>
            {Object.entries(PRIORITY_CONFIG).map(([key, config]) => (
              <button
                key={key}
                className={`board-filter-chip board-filter-chip--${key} ${selectedPriority === key.toUpperCase() ? 'board-filter-chip--active' : ''}`}
                onClick={() => setSelectedPriority(key.toUpperCase())}
              >
                <span className="board-filter-chip__dot" />
                {config.label}
              </button>
            ))}
          </div>
        </div>

        <div className="board-toolbar__right">
          <div className="board-toolbar__sort">
            <span className="board-toolbar__sort-label">Sort By:</span>
            <select
              className="board-toolbar__select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              aria-label="Sort tasks"
            >
              <option value="DEFAULT">Custom Drag Order</option>
              <option value="PRIORITY">Priority (High → Low)</option>
              <option value="NEWEST">Newest Created First</option>
            </select>
          </div>

          {(selectedPriority !== 'ALL' || searchText.trim() || sortBy !== 'DEFAULT') && (
            <button
              className="board-toolbar__reset"
              onClick={() => {
                setSelectedPriority('ALL');
                setSortBy('DEFAULT');
              }}
              title="Reset Filters"
            >
              Reset View
            </button>
          )}

          {totalCount > 0 && (
            <button
              className="board-toolbar__clear-all"
              onClick={onClearAll}
              title="Completely clear all tasks from the board"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
              </svg>
              <span>Clear All Todos</span>
            </button>
          )}
        </div>
      </div>

      {processedCount !== totalCount && (
        <div className="board-filter-banner">
          Showing <strong>{processedCount}</strong> filtered tasks out of <strong>{totalCount}</strong> total tasks
        </div>
      )}

      <div className="board">
        {Object.values(COLUMNS).map((colId) => (
          <Column
            key={colId}
            columnId={colId}
            tasks={processTasks(tasks[colId] || [])}
            onDelete={onDelete}
            onMove={onMove}
            onEdit={onEdit}
          />
        ))}
      </div>
    </div>
  );
}

