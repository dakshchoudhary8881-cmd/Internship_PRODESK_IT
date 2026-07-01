import { useState, useRef, useEffect } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { COLUMNS, COLUMN_CONFIG, PRIORITY_CONFIG } from '../utils/constants';
import './TaskCard.css';

export default function TaskCard({ task, columnId, onDelete, onMove, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);
  const inputRef = useRef(null);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: { columnId },
    disabled: isEditing,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleEditSubmit = () => {
    const trimmed = editText.trim();
    if (trimmed && trimmed !== task.text) {
      onEdit(task.id, trimmed);
    } else {
      setEditText(task.text);
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    e.stopPropagation();
    if (e.key === 'Enter') handleEditSubmit();
    if (e.key === 'Escape') {
      setEditText(task.text);
      setIsEditing(false);
    }
  };

  const priorityConfig = PRIORITY_CONFIG[task.priority];
  const moveTargets = Object.values(COLUMNS).filter((col) => col !== columnId);

  // Generate deterministic professional ticket ID from task id
  const idNumbers = task.id.replace(/\D/g, '').slice(-4) || '1042';
  const ticketId = `TASK-${idNumbers}`;

  const formattedDate = new Date(task.createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });

  const getButtonConfig = (targetCol) => {
    if (targetCol === COLUMNS.IN_PROGRESS) {
      return {
        label: 'Start Working (In Progress)',
        shortLabel: '⚡ In Progress',
        className: 'task-card__move-btn--progress',
        icon: (
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
          </svg>
        )
      };
    }
    if (targetCol === COLUMNS.DONE) {
      return {
        label: 'Mark Complete (Done)',
        shortLabel: '✅ Complete Task',
        className: 'task-card__move-btn--done',
        icon: (
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        )
      };
    }
    return {
      label: 'Return to To Do',
      shortLabel: '📋 To Do',
      className: 'task-card__move-btn--todo',
      icon: (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
          <polyline points="17 21 17 13 7 13 7 21" />
          <polyline points="7 3 7 8 15 8" />
        </svg>
      )
    };
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`task-card task-card--${task.priority} ${isDragging ? 'task-card--dragging' : ''}`}
      aria-label={`Task: ${task.text}`}
    >
      <div className="task-card__glow-bar" />
      
      <div className="task-card__header">
        <div className="task-card__meta-left">
          <span className="task-card__ticket-id">{ticketId}</span>
          <span className={`task-card__priority-badge task-card__priority-badge--${task.priority}`}>
            <span className="task-card__priority-dot" />
            {priorityConfig.label}
          </span>
        </div>

        <button
          className="task-card__delete"
          onClick={(e) => {
            e.stopPropagation();
            onDelete(task.id);
          }}
          aria-label={`Delete task: ${task.text}`}
          title="Delete task"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="3 6 5 6 21 6" />
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
          </svg>
        </button>
      </div>

      {isEditing ? (
        <input
          ref={inputRef}
          type="text"
          className="task-card__edit-input"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onBlur={handleEditSubmit}
          onKeyDown={handleKeyDown}
          onPointerDown={(e) => e.stopPropagation()}
          aria-label="Edit task text"
        />
      ) : (
        <p
          className="task-card__text"
          onClick={(e) => {
            e.stopPropagation();
            setIsEditing(true);
          }}
          title="Click to edit description"
        >
          {task.text}
        </p>
      )}

      <div className="task-card__info-row">
        <div className="task-card__assignee">
          <span className="task-card__avatar">Pro</span>
          <span className="task-card__assignee-name">Engineering Lead</span>
        </div>
        <div className="task-card__timestamp">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
          <span>{formattedDate}</span>
        </div>
      </div>

      <div className="task-card__actions-section">
        <div className="task-card__actions-grid">
          {moveTargets.map((targetCol) => {
            const btnConfig = getButtonConfig(targetCol);
            return (
              <button
                key={targetCol}
                className={`task-card__move-btn ${btnConfig.className}`}
                onClick={(e) => {
                  e.stopPropagation();
                  onMove(task.id, columnId, targetCol);
                }}
                aria-label={`Move to ${COLUMN_CONFIG[targetCol].title}`}
                title={`Move to ${COLUMN_CONFIG[targetCol].title}`}
              >
                <span className="task-card__move-btn-icon">{btnConfig.icon}</span>
                <span className="task-card__move-btn-text">{btnConfig.shortLabel}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export function TaskCardOverlay({ task }) {
  const priorityConfig = PRIORITY_CONFIG[task.priority];
  const idNumbers = task.id.replace(/\D/g, '').slice(-4) || '1042';
  const ticketId = `TASK-${idNumbers}`;

  return (
    <div className={`task-card task-card--${task.priority} task-card--drag-overlay`}>
      <div className="task-card__glow-bar" />
      <div className="task-card__header">
        <div className="task-card__meta-left">
          <span className="task-card__ticket-id">{ticketId}</span>
          <span className={`task-card__priority-badge task-card__priority-badge--${task.priority}`}>
            <span className="task-card__priority-dot" />
            {priorityConfig.label}
          </span>
        </div>
      </div>
      <p className="task-card__text">{task.text}</p>
    </div>
  );
}


