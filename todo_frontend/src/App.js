import React, { useEffect, useMemo, useState } from 'react';
import './index.css';
import './styles/theme.css';
import Header from './components/Header';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';

/**
 * App - Single page Todo application (client-side only)
 * - Manages todos state and persistence to localStorage
 * - Applies Ocean Professional theme
 */
// PUBLIC_INTERFACE
function App() {
  /** LocalStorage key for persisting todos */
  const STORAGE_KEY = 'kavia_todos_v1';

  const [todos, setTodos] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  const [filter, setFilter] = useState('all');

  // Persist todos to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    } catch {
      // noop: storage might be unavailable
    }
  }, [todos]);

  // PUBLIC_INTERFACE
  const addTodo = (text) => {
    if (!text || !text.trim()) return;
    const newTodo = {
      id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
      text: text.trim(),
      createdAt: Date.now(),
      done: false,
    };
    setTodos((prev) => [newTodo, ...prev]);
  };

  // PUBLIC_INTERFACE
  const updateTodo = (id, newText) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, text: newText.trim() } : t))
    );
  };

  // PUBLIC_INTERFACE
  const toggleTodo = (id) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  };

  // PUBLIC_INTERFACE
  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  const filtered = useMemo(() => {
    switch (filter) {
      case 'active':
        return todos.filter((t) => !t.done);
      case 'completed':
        return todos.filter((t) => t.done);
      default:
        return todos;
    }
  }, [todos, filter]);

  return (
    <div className="app-root">
      <Header filter={filter} onFilterChange={setFilter} />
      <main className="container">
        <section className="surface card">
          <TodoInput onAdd={addTodo} />
          <TodoList
            items={filtered}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
            onUpdate={updateTodo}
          />
          {todos.length === 0 && (
            <p className="muted empty-hint">Start by adding your first task above.</p>
          )}
        </section>
      </main>
      <footer className="footer">
        <span className="muted">Todos are stored locally in your browser.</span>
      </footer>
    </div>
  );
}

export default App;
