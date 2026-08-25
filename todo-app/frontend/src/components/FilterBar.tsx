import React from 'react';
import type { FilterType } from '../types';

interface Props {
  currentFilter: FilterType;
  setFilter: (filter: FilterType) => void;
}

export const FilterBar: React.FC<Props> = ({ currentFilter, setFilter }) => {
  return (
    <div className="filter-bar">
      <button
        className={currentFilter === 'all' ? 'active' : ''}
        onClick={() => setFilter('all')}
      >
        All Tasks
      </button>
      <button
        className={currentFilter === 'active' ? 'active' : ''}
        onClick={() => setFilter('active')}
      >
        Active
      </button>
      <button
        className={currentFilter === 'completed' ? 'active' : ''}
        onClick={() => setFilter('completed')}
      >
        Completed
      </button>
    </div>
  );
};
