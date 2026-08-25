import React from 'react';
import type { Task } from '../types';
import { TaskItem } from './TaskItem';

interface Props {
  tasks: Task[];
  onToggle: (id: string, completed: boolean) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newText: string) => void;
  loading: boolean;
  error: string | null;
  filter: string;
}

export const TaskList: React.FC<Props> = ({ tasks, onToggle, onDelete, onEdit, loading, error, filter }) => {
  if (loading && tasks.length === 0) {
    return <div className="loading-state">Loading tasks...</div>;
  }

  if (error && tasks.length === 0) {
    return <div className="error-state">{error}</div>;
  }

  if (tasks.length === 0) {
    return (
      <div className="empty-state">
        {filter === 'all' && 'No tasks yet. Add one above!'}
        {filter === 'active' && 'No active tasks. You are all caught up!'}
        {filter === 'completed' && 'No completed tasks yet.'}
      </div>
    );
  }

  return (
    <div className="task-list">
      {tasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
};
