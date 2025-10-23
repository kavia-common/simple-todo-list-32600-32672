import React, { useEffect, useRef, useState } from 'react';

/**
 * TodoItem - Single todo with inline editing
 * @param {{ item: {id: string, text: string, done: boolean}, onToggle: Function, onDelete: Function, onUpdate: Function }} props
 */
// PUBLIC_INTERFACE
export default function TodoItem({ item, onToggle, onDelete, onUpdate }) {
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(item.text);
  const [confirm, setConfirm] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [editing]);

  const save = () => {
    const trimmed = text.trim();
    if (!trimmed) {
      setText(item.text);
      setEditing(false);
      return;
    }
    if (trimmed !== item.text) onUpdate(item.id, trimmed);
    setEditing(false);
  };

  const cancel = () => {
    setText(item.text);
    setEditing(false);
  };

  const onKeyDown = (e) => {
    if (e.key === 'Enter') save();
    if (e.key === 'Escape') cancel();
  };

  return (
    <div className="item" role="listitem">
      <input
        className="checkbox"
        type="checkbox"
        checked={item.done}
        onChange={() => onToggle(item.id)}
        aria-label={item.done ? 'Mark as active' : 'Mark as completed'}
      />
      {!editing ? (
        <div className={`text ${item.done ? 'done' : ''}`} onDoubleClick={() => setEditing(true)}>
          {item.text}
        </div>
      ) : (
        <div className="edit-row">
          <input
            ref={inputRef}
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={onKeyDown}
            aria-label="Edit todo"
          />
          <button className="btn-primary" onClick={save} aria-label="Save edit">
            Save
          </button>
          <button className="btn-muted" onClick={cancel} aria-label="Cancel edit">
            Cancel
          </button>
        </div>
      )}
      <div className="actions">
        {!editing && (
          <button className="btn-muted" onClick={() => setEditing(true)} aria-label="Edit todo">
            Edit
          </button>
        )}
        {!confirm ? (
          <button
            className="btn-ghost"
            onClick={() => setConfirm(true)}
            aria-label="Delete todo"
            style={{ color: '#EF4444' }}
          >
            Delete
          </button>
        ) : (
          <span className="confirm">
            Confirm?
            <button
              className="btn-ghost"
              onClick={() => onDelete(item.id)}
              style={{ color: '#EF4444' }}
              aria-label="Confirm delete"
            >
              Yes
            </button>
            <button className="btn-ghost" onClick={() => setConfirm(false)} aria-label="Cancel delete">
              No
            </button>
          </span>
        )}
      </div>
    </div>
  );
}
