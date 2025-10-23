import React, { useState } from 'react';

/**
 * TodoInput - Input field with add button
 * @param {{ onAdd: (text: string) => void }} props
 */
// PUBLIC_INTERFACE
export default function TodoInput({ onAdd }) {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');

  const submit = () => {
    if (!value.trim()) {
      setError('Please enter a todo');
      return;
    }
    onAdd(value.trim());
    setValue('');
    setError('');
  };

  const onKeyDown = (e) => {
    if (e.key === 'Enter') {
      submit();
    }
  };

  return (
    <div className="input-wrap" aria-label="Add todo">
      <input
        type="text"
        placeholder="Add a new task and press Enter…"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          if (error && e.target.value.trim()) setError('');
        }}
        onKeyDown={onKeyDown}
        aria-invalid={!!error}
        aria-describedby={error ? 'input-error' : undefined}
      />
      <button className="btn-primary" onClick={submit} aria-label="Add todo">
        Add
      </button>
      {error && (
        <div id="input-error" className="muted" role="alert" style={{ gridColumn: '1 / -1' }}>
          {error}
        </div>
      )}
    </div>
  );
}
