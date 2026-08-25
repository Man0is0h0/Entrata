import { useState, useEffect, useMemo } from 'react';
import type { Task, FilterType } from './types';
import { fetchTasks, createTask, updateTask, deleteTask } from './api';
import { TaskForm } from './components/TaskForm';
import { TaskList } from './components/TaskList';
import { FilterBar } from './components/FilterBar';
import './App.css';

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<FilterType>('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Custom cursor tracking
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  
  useEffect(() => {
    const updateCursor = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', updateCursor);
    return () => window.removeEventListener('mousemove', updateCursor);
  }, []);

  useEffect(() => {
    loadTasks();
  }, []);

  // Sync tasks to local storage whenever they change
  useEffect(() => {
    localStorage.setItem('todo-tasks', JSON.stringify(tasks));
  }, [tasks]);

  const loadTasks = async () => {
    try {
      setLoading(true);
      const data = await fetchTasks();
      setTasks(data);
      setError(null);
    } catch (err) {
      console.warn('Backend unreachable, loading from local storage.');
      const cached = localStorage.getItem('todo-tasks');
      if (cached) {
        setTasks(JSON.parse(cached));
      }
      setError('Working offline. Changes will save locally.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddTask = async (text: string) => {
    try {
      const newTask = await createTask(text);
      setTasks([newTask, ...tasks]);
    } catch (err) {
      // Fallback for offline support
      const offlineTask: Task = {
        id: Date.now().toString(),
        text,
        completed: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      setTasks([offlineTask, ...tasks]);
    }
  };

  const handleToggleTask = async (id: string, completed: boolean) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed } : t));
    try {
      await updateTask(id, { completed });
    } catch (err) {
      console.warn('Failed to sync toggle to backend, saved locally.');
    }
  };

  const handleEditTask = async (id: string, text: string) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, text } : t));
    try {
      await updateTask(id, { text });
    } catch (err) {
      console.warn('Failed to sync edit to backend, saved locally.');
    }
  };

  const handleDeleteTask = async (id: string) => {
    setTasks(tasks.filter(t => t.id !== id));
    try {
      await deleteTask(id);
    } catch (err) {
      console.warn('Failed to sync delete to backend, removed locally.');
    }
  };

  const filteredTasks = useMemo(() => {
    if (filter === 'active') return tasks.filter(t => !t.completed);
    if (filter === 'completed') return tasks.filter(t => t.completed);
    return tasks;
  }, [tasks, filter]);

  const completedCount = tasks.filter(t => t.completed).length;

  return (
    <div className="app-container">
      <div 
        className="custom-cursor" 
        style={{ left: `${cursorPos.x}px`, top: `${cursorPos.y}px` }} 
      />
      <section className="left-panel">
        <header className="header">
          <div className="header-top">
            <div>
              <h1>My Tasks</h1>
              <p className="subtitle">Stay organized and focused.</p>
            </div>
            <div className="task-summary">
              {tasks.length} tasks &bull; {completedCount} completed
            </div>
          </div>
        </header>

        <div className="card add-task-card">
          <h2>Create New Task</h2>
          <TaskForm onAdd={handleAddTask} />
        </div>

        <div className="card filter-card">
          <h2>Task Categories</h2>
          <FilterBar currentFilter={filter} setFilter={setFilter} />
        </div>
      </section>

      <section className="right-panel">
        <TaskList
          tasks={filteredTasks}
          loading={loading}
          error={error}
          filter={filter}
          onToggle={handleToggleTask}
          onDelete={handleDeleteTask}
          onEdit={handleEditTask}
        />
      </section>
    </div>
  );
}

export default App;
