import React, { useState } from 'react';

interface Props {
  onAdd: (text: string) => Promise<void>;
}

export const TaskForm: React.FC<Props> = ({ onAdd }) => {
  const [text, setText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;

    setIsSubmitting(true);
    setError('');
    
    try {
      await onAdd(text.trim());
      setText('');
    } catch (err) {
      setError('Failed to add task. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div className="input-group">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="What needs to be done?"
          disabled={isSubmitting}
        />
        <button type="submit" disabled={isSubmitting || !text.trim()}>
          {isSubmitting ? 'Adding...' : 'Add Task'}
        </button>
      </div>
      {error && <p className="error-message">{error}</p>}
    </form>
  );
};
