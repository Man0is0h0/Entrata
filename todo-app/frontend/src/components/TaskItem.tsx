import React, { useState, useRef, useEffect } from 'react';
import type { Task } from '../types';

interface Props {
  task: Task;
  onToggle: (id: string, completed: boolean) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newText: string) => void;
}

export const TaskItem: React.FC<Props> = ({ task, onToggle, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleSave = () => {
    if (editText.trim() && editText !== task.text) {
      onEdit(task.id, editText.trim());
    } else {
      setEditText(task.text); // Reset if empty
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSave();
    if (e.key === 'Escape') {
      setEditText(task.text);
      setIsEditing(false);
    }
  };

  return (
    <div className={`task-card ${task.completed ? 'completed' : ''}`}>
      <div className="task-content">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={(e) => onToggle(task.id, e.target.checked)}
          className="task-checkbox"
        />
        
        {isEditing ? (
          <input
            ref={inputRef}
            type="text"
            className="edit-input"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onBlur={handleSave}
            onKeyDown={handleKeyDown}
          />
        ) : (
          <span className="task-text" onDoubleClick={() => setIsEditing(true)}>
            {task.text}
          </span>
        )}
      </div>

      <div className="task-actions">
        {!isEditing && (
          <button onClick={() => setIsEditing(true)} className="action-btn edit" aria-label="Edit task" title="Edit">
            ✎
          </button>
        )}
        <button onClick={() => onDelete(task.id)} className="action-btn delete" aria-label="Delete task" title="Delete">
          ✕
        </button>
      </div>
    </div>
  );
};
