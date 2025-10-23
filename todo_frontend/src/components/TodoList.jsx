import React from 'react';
import TodoItem from './TodoItem';

/**
 * TodoList - Renders list of todo items
 * @param {{ items: Array, onToggle: Function, onDelete: Function, onUpdate: Function }} props
 */
// PUBLIC_INTERFACE
export default function TodoList({ items, onToggle, onDelete, onUpdate }) {
  if (!items.length) {
    return <div className="hr" aria-hidden="true" />;
  }
  return (
    <div className="list" role="list">
      {items.map((item) => (
        <TodoItem
          key={item.id}
          item={item}
          onToggle={onToggle}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      ))}
    </div>
  );
}
