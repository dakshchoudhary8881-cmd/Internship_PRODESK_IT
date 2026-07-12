import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { COLUMN_CONFIG } from '../utils/constants';
import TaskCard from './TaskCard';
import './Column.css';

export default function Column({ columnId, tasks, onDelete, onMove, onEdit }) {
  const config = COLUMN_CONFIG[columnId];

  const { setNodeRef, isOver } = useDroppable({
    id: columnId,
  });

  const taskIds = tasks.map((t) => t.id);

  const getEmptyIllustration = (col) => {
    switch (col) {
      case 'todo':
        return { icon: '✨', title: 'Clear deck!', subtitle: 'Add tasks above to begin planning' };
      case 'inProgress':
        return { icon: '⚡', title: 'In the zone', subtitle: 'Drag tasks here when you start working' };
      case 'done':
        return { icon: '🏆', title: 'Zero completed yet', subtitle: 'Finish tasks and celebrate achievements' };
      default:
        return { icon: '📭', title: 'Empty Column', subtitle: 'Drop tasks here' };
    }
  };

  const emptyState = getEmptyIllustration(columnId);

  return (
    <div className={`column column--${columnId}`}>
      <div className="column__header">
        <div className="column__title-group">
          <span className="column__accent-strip" style={{ background: config.gradient }} />
          <span className="column__icon" aria-hidden="true">{config.icon}</span>
          <h2 className="column__title">{config.title}</h2>
        </div>
        <span
          className="column__count"
          style={{ background: config.gradient }}
        >
          {tasks.length}
        </span>
      </div>

      <SortableContext items={taskIds} strategy={verticalListSortingStrategy}>
        <div
          ref={setNodeRef}
          className={`column__body ${isOver ? 'column__body--over' : ''}`}
        >
          {tasks.length === 0 ? (
            <div className="column__empty">
              <div className="column__empty-icon-box">
                <span className="column__empty-icon">{emptyState.icon}</span>
              </div>
              <span className="column__empty-title">{emptyState.title}</span>
              <span className="column__empty-subtitle">{emptyState.subtitle}</span>
            </div>
          ) : (
            tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                columnId={columnId}
                onDelete={onDelete}
                onMove={onMove}
                onEdit={onEdit}
              />
            ))
          )}
        </div>
      </SortableContext>
    </div>
  );
}

