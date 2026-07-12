export const COLUMNS = {
  TODO: 'todo',
  IN_PROGRESS: 'inProgress',
  DONE: 'done',
};

export const COLUMN_CONFIG = {
  [COLUMNS.TODO]: {
    title: 'To Do',
    icon: '📋',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    accentColor: '#667eea',
  },
  [COLUMNS.IN_PROGRESS]: {
    title: 'In Progress',
    icon: '⚡',
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    accentColor: '#f093fb',
  },
  [COLUMNS.DONE]: {
    title: 'Done',
    icon: '✅',
    gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    accentColor: '#4facfe',
  },
};

export const PRIORITIES = {
  HIGH: 'high',
  MEDIUM: 'medium',
  LOW: 'low',
};

export const PRIORITY_CONFIG = {
  [PRIORITIES.HIGH]: {
    label: 'High',
    color: '#ef4444',
    bgColor: 'rgba(239, 68, 68, 0.15)',
    icon: '🔴',
  },
  [PRIORITIES.MEDIUM]: {
    label: 'Medium',
    color: '#f59e0b',
    bgColor: 'rgba(245, 158, 11, 0.15)',
    icon: '🟡',
  },
  [PRIORITIES.LOW]: {
    label: 'Low',
    color: '#22c55e',
    bgColor: 'rgba(34, 197, 94, 0.15)',
    icon: '🟢',
  },
};

export const STORAGE_KEY = 'kanban-board-tasks';
