import React, { useContext, useEffect, useState, useMemo } from 'react';
import { AuthContext } from '../context/AuthContext';
import * as authService from '../services/auth';
import * as taskService from '../services/tasks';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('create');
  const [currentTask, setCurrentTask] = useState({ title: '', description: '', status: 'pending' });
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');

  // Delete Modal state
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Search & Filter
  const [searchQuery, setSearchQuery] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profileData, tasksData] = await Promise.all([
          authService.getMe(),
          taskService.getTasks()
        ]);
        setProfile(profileData);
        setTasks(tasksData);
      } catch (error) {
        console.error('Error fetching data', error);
        if (error.response && error.response.status === 401) {
          logout();
          navigate('/login');
        }
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchData();
    }
  }, [user, logout, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const openCreateModal = (status = 'pending') => {
    setModalMode('create');
    setCurrentTask({ title: '', description: '', status });
    setError('');
    setIsModalOpen(true);
  };

  const openEditModal = (task) => {
    setModalMode('edit');
    setCurrentTask(task);
    setError('');
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentTask({ title: '', description: '', status: 'pending' });
  };

  const handleTaskChange = (e) => {
    const { name, value } = e.target;
    setCurrentTask(prev => ({ ...prev, [name]: value }));
  };

  const saveTask = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setError('');
    try {
      if (modalMode === 'create') {
        const newTask = await taskService.createTask(currentTask);
        setTasks(prev => [newTask, ...prev]);
      } else {
        const updatedTask = await taskService.updateTask(currentTask._id, currentTask);
        setTasks(prev => prev.map(t => t._id === updatedTask._id ? updatedTask : t));
      }
      closeModal();
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to save this record. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const openDeleteModal = (task) => {
    setTaskToDelete(task);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setTaskToDelete(null);
  };

  const confirmDelete = async () => {
    if (!taskToDelete) return;
    const id = taskToDelete._id;
    
    // Optimistic delete
    const previousTasks = [...tasks];
    setTasks(prev => prev.filter(t => t._id !== id));
    setIsDeleting(true);
    
    try {
      await taskService.deleteTask(id);
      closeDeleteModal();
    } catch (err) {
      setTasks(previousTasks);
      setError("Couldn't delete this task. Please try again.");
      closeDeleteModal();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } finally {
      setIsDeleting(false);
    }
  };

  const updateTaskStatus = async (task, newStatus) => {
    const previousTasks = [...tasks];
    const updatedTask = { ...task, status: newStatus };
    setTasks(prev => prev.map(t => t._id === task._id ? updatedTask : t));
    
    try {
      await taskService.updateTask(task._id, updatedTask);
    } catch (err) {
      setTasks(previousTasks);
      setError("Couldn't update task status. Please try again.");
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Metrics
  const filteredTasks = useMemo(() => {
    return tasks.filter(t => t.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                             t.description.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [tasks, searchQuery]);

  const stats = {
    total: tasks.length,
    pending: tasks.filter(t => t.status === 'pending').length,
    inProgress: tasks.filter(t => t.status === 'in_progress').length,
    completed: tasks.filter(t => t.status === 'completed').length,
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="loading-spinner"></div>
        <p>Loading TaskMatrix Workspace...</p>
      </div>
    );
  }

  const renderKanbanColumn = (statusKey, title, count) => {
    const columnTasks = filteredTasks.filter(t => t.status === statusKey);
    return (
      <div className="kanban-column">
        <div className={`kanban-header border-${statusKey}`}>
          <div className="flex-between">
            <h4>{title} <span className="task-count">{count}</span></h4>
            <button className="btn-icon-small" onClick={() => openCreateModal(statusKey)}>+</button>
          </div>
        </div>
        <div className="kanban-body">
          {columnTasks.length === 0 ? (
            <div className="kanban-empty">No tasks</div>
          ) : (
            columnTasks.map(task => (
              <div key={task._id} className="kanban-card">
                <div className="kanban-card-header">
                  <h5>{task.title}</h5>
                  <div className="kanban-actions">
                    <button onClick={() => openEditModal(task)} className="btn-icon" title="Edit">✏️</button>
                    <button onClick={() => openDeleteModal(task)} className="btn-icon delete" title="Delete">🗑️</button>
                  </div>
                </div>
                <p className="kanban-desc">{task.description}</p>
                <div className="kanban-footer">
                  <select 
                    className={`status-badge status-${task.status}`}
                    value={task.status}
                    onChange={(e) => updateTaskStatus(task, e.target.value)}
                  >
                    <option value="pending">To Do</option>
                    <option value="in_progress">In Progress</option>
                    <option value="completed">Done</option>
                  </select>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="app-layout">
      {/* Top Navigation */}
      <nav className="top-nav">
        <div className="nav-brand">
          <div className="brand-logo">TM</div>
          <span className="brand-name">TaskMatrix</span>
        </div>
        <div className="nav-profile">
          <span className="user-email">{profile ? profile.email : user?.email}</span>
          <div className="avatar">{profile?.name?.charAt(0) || user?.name?.charAt(0) || 'U'}</div>
          <button onClick={handleLogout} className="btn-logout">Logout</button>
        </div>
      </nav>

      <main className="main-content">
        <header className="page-header">
          <div>
            <h1>Dashboard Overview</h1>
            <p className="subtitle">Welcome back, {profile ? profile.name : user?.name || 'User'}! Here's what's happening with your projects today.</p>
          </div>
          <div className="header-actions">
            <button onClick={() => openCreateModal('pending')} className="btn-primary-action">
              + New Task
            </button>
          </div>
        </header>

        {error && <div className="error-message mb-4">{error}</div>}

        {/* Metrics Cards */}
        <div className="metrics-grid">
          <div className="metric-card">
            <div className="metric-icon total-icon">📋</div>
            <div className="metric-info">
              <span className="metric-label">Total Tasks</span>
              <span className="metric-value">{stats.total}</span>
            </div>
          </div>
          <div className="metric-card">
            <div className="metric-icon pending-icon">⏳</div>
            <div className="metric-info">
              <span className="metric-label">To Do</span>
              <span className="metric-value">{stats.pending}</span>
            </div>
          </div>
          <div className="metric-card">
            <div className="metric-icon progress-icon">🏃</div>
            <div className="metric-info">
              <span className="metric-label">In Progress</span>
              <span className="metric-value">{stats.inProgress}</span>
            </div>
          </div>
          <div className="metric-card">
            <div className="metric-icon completed-icon">✅</div>
            <div className="metric-info">
              <span className="metric-label">Done</span>
              <span className="metric-value">{stats.completed}</span>
            </div>
          </div>
        </div>

        {/* Kanban Board Area */}
        <div className="board-section">
          <div className="board-toolbar">
            <input 
              type="text" 
              className="search-input" 
              placeholder="Search tasks..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="kanban-board">
            {renderKanbanColumn('pending', 'To Do', stats.pending)}
            {renderKanbanColumn('in_progress', 'In Progress', stats.inProgress)}
            {renderKanbanColumn('completed', 'Done', stats.completed)}
          </div>
        </div>
      </main>

      {/* Task Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>{modalMode === 'create' ? 'Create New Task' : 'Edit Task'}</h3>
            {error && <div className="error-message">{error}</div>}
            <form onSubmit={saveTask}>
              <div className="form-group">
                <label>Task Title</label>
                <input
                  type="text"
                  name="title"
                  value={currentTask.title}
                  onChange={handleTaskChange}
                  placeholder="E.g. Setup database schema"
                  required
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea
                  name="description"
                  value={currentTask.description}
                  onChange={handleTaskChange}
                  placeholder="Add details about this task..."
                  required
                  rows="4"
                  className="form-textarea"
                />
              </div>
              <div className="form-group">
                <label>Workflow Status</label>
                <select 
                  name="status" 
                  value={currentTask.status} 
                  onChange={handleTaskChange}
                  className="form-select"
                >
                  <option value="pending">To Do</option>
                  <option value="in_progress">In Progress</option>
                  <option value="completed">Done</option>
                </select>
              </div>
              <div className="modal-actions">
                <button type="button" onClick={closeModal} className="btn-secondary" disabled={isSaving}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary" style={{ width: 'auto', marginTop: 0 }} disabled={isSaving}>
                  {isSaving ? 'Saving...' : 'Save Task'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content text-center delete-modal">
            <div className="delete-icon-wrapper">
              ⚠️
            </div>
            <h3 className="delete-title">Delete Task</h3>
            <p className="delete-desc">
              Are you sure you want to delete <strong>"{taskToDelete?.title}"</strong>? 
              <br/><br/>
              This action is permanent and cannot be undone.
            </p>
            <div className="modal-actions center-actions">
              <button type="button" onClick={closeDeleteModal} className="btn-secondary" disabled={isDeleting}>
                Cancel
              </button>
              <button type="button" onClick={confirmDelete} className="btn-danger" disabled={isDeleting}>
                {isDeleting ? 'Deleting...' : 'Delete Permanently'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
