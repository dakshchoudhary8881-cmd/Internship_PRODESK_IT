import { useState, useCallback } from 'react';
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
  closestCorners,
} from '@dnd-kit/core';
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';

import { useLocalStorage } from './hooks/useLocalStorage';
import { COLUMNS, STORAGE_KEY } from './utils/constants';
import Header from './components/Header';
import TaskForm from './components/TaskForm';
import Board from './components/Board';
import { TaskCardOverlay } from './components/TaskCard';
import './App.css';

const initialTasks = {
  [COLUMNS.TODO]: [],
  [COLUMNS.IN_PROGRESS]: [],
  [COLUMNS.DONE]: [],
};

export default function App() {
  const [tasks, setTasks] = useLocalStorage(STORAGE_KEY, initialTasks);
  const [searchText, setSearchText] = useState('');
  const [activeTask, setActiveTask] = useState(null);

  // ── DnD sensors ──
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  // ── Task CRUD ──
  const addTask = useCallback((text, priority) => {
    const newTask = {
      id: `task-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      text,
      priority,
      createdAt: new Date().toISOString(),
    };
    setTasks((prev) => ({
      ...prev,
      [COLUMNS.TODO]: [newTask, ...prev[COLUMNS.TODO]],
    }));
  }, [setTasks]);

  const deleteTask = useCallback((taskId) => {
    setTasks((prev) => {
      const next = {};
      for (const col of Object.values(COLUMNS)) {
        next[col] = prev[col].filter((t) => t.id !== taskId);
      }
      return next;
    });
  }, [setTasks]);

  const moveTask = useCallback((taskId, fromCol, toCol) => {
    setTasks((prev) => {
      const task = prev[fromCol].find((t) => t.id === taskId);
      if (!task) return prev;
      return {
        ...prev,
        [fromCol]: prev[fromCol].filter((t) => t.id !== taskId),
        [toCol]: [task, ...prev[toCol]],
      };
    });
  }, [setTasks]);

  const editTask = useCallback((taskId, newText) => {
    setTasks((prev) => {
      const next = {};
      for (const col of Object.values(COLUMNS)) {
        next[col] = prev[col].map((t) =>
          t.id === taskId ? { ...t, text: newText } : t
        );
      }
      return next;
    });
  }, [setTasks]);

  // ── DnD handlers ──
  const findTaskAndColumn = (id) => {
    for (const col of Object.values(COLUMNS)) {
      const task = tasks[col].find((t) => t.id === id);
      if (task) return { task, columnId: col };
    }
    return null;
  };

  const handleDragStart = (event) => {
    const result = findTaskAndColumn(event.active.id);
    if (result) setActiveTask(result.task);
  };

  const handleDragOver = (event) => {
    const { active, over } = event;
    if (!over) return;

    const activeData = findTaskAndColumn(active.id);
    if (!activeData) return;

    // Determine which column the over element belongs to
    let overCol = null;

    // Is `over.id` a column id?
    if (Object.values(COLUMNS).includes(over.id)) {
      overCol = over.id;
    } else {
      // It's a task — find which column it's in
      const overData = findTaskAndColumn(over.id);
      if (overData) overCol = overData.columnId;
    }

    if (!overCol || activeData.columnId === overCol) return;

    // Move task to new column
    setTasks((prev) => {
      const task = prev[activeData.columnId].find((t) => t.id === active.id);
      if (!task) return prev;

      const fromFiltered = prev[activeData.columnId].filter((t) => t.id !== active.id);

      // Find insertion index in target column
      const overIndex = over.id === overCol
        ? prev[overCol].length // dropped on empty column area → append
        : prev[overCol].findIndex((t) => t.id === over.id);

      const toList = [...prev[overCol]];
      const insertAt = overIndex >= 0 ? overIndex : toList.length;
      toList.splice(insertAt, 0, task);

      return {
        ...prev,
        [activeData.columnId]: fromFiltered,
        [overCol]: toList,
      };
    });
  };

  const handleDragEnd = () => {
    setActiveTask(null);
  };

  // ── Task counts ──
  const taskCounts = {
    todo: tasks[COLUMNS.TODO].length,
    inProgress: tasks[COLUMNS.IN_PROGRESS].length,
    done: tasks[COLUMNS.DONE].length,
  };

  return (
    <div className="app">
      <Header
        searchText={searchText}
        onSearchChange={setSearchText}
        taskCounts={taskCounts}
      />
      <TaskForm onAddTask={addTask} />
      <div className="app__divider" />

      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <Board
          tasks={tasks}
          searchText={searchText}
          onDelete={deleteTask}
          onMove={moveTask}
          onEdit={editTask}
        />

        <DragOverlay dropAnimation={{ duration: 200 }}>
          {activeTask ? <TaskCardOverlay task={activeTask} /> : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}
