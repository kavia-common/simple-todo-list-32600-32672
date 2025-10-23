import React from 'react';

/**
 * Header - App header with brand and filter controls
 * @param {{filter: 'all'|'active'|'completed', onFilterChange: (val:string)=>void}} props
 */
// PUBLIC_INTERFACE
export default function Header({ filter, onFilterChange }) {
  return (
    <header className="app-header">
      <div className="header-wrap">
        <div className="brand">
          <div className="brand-mark" aria-hidden="true" />
          <div>
            <h1>Ocean Tasks</h1>
            <p>Focus your day with a clean, modern todo list.</p>
          </div>
          <div className="filters" role="tablist" aria-label="Filter todos">
            <button
              className={`btn-ghost ${filter === 'all' ? 'badge' : ''}`}
              onClick={() => onFilterChange('all')}
              aria-selected={filter === 'all'}
            >
              All
            </button>
            <button
              className={`btn-ghost ${filter === 'active' ? 'badge' : ''}`}
              onClick={() => onFilterChange('active')}
              aria-selected={filter === 'active'}
            >
              Active
            </button>
            <button
              className={`btn-ghost ${filter === 'completed' ? 'badge' : ''}`}
              onClick={() => onFilterChange('completed')}
              aria-selected={filter === 'completed'}
            >
              Completed
            </button>
          </div>
        </div>
        <div className="toolbar">
          <span className="badge">Ocean Professional</span>
        </div>
      </div>
    </header>
  );
}
