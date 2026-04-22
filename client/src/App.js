import React, { useState, useEffect } from 'react';
import { fetchTodos, createTodo, updateTodo, toggleTodoDone, deleteTodo, clearCompletedTodos } from './services/api';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    try {
      setLoading(true);
      const data = await fetchTodos();
      setTodos(data);
      setError(null);
    } catch (err) {
      setError('Could not connect to the server. Please make sure the backend is running.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTodo = async (todoData) => {
    try {
      const newTodo = await createTodo(todoData);
      setTodos([newTodo, ...todos]);
      toast.success('Task added successfully! ✨');
    } catch (err) {
      toast.error('Failed to add task.');
    }
  };

  const handleToggleTodo = async (id) => {
    const previousTodos = [...todos];
    setTodos(todos.map(t => t._id === id ? { ...t, done: !t.done } : t));

    try {
      await toggleTodoDone(id);
      const todo = todos.find(t => t._id === id);
      toast.info(todo.done ? 'Task marked as pending' : 'Task completed! 🎉');
    } catch (err) {
      setTodos(previousTodos);
      toast.error('Failed to update status.');
    }
  };

  const handleUpdateTodo = async (id, updates) => {
    try {
      const updated = await updateTodo(id, updates);
      setTodos(todos.map(t => t._id === id ? updated : t));
      toast.success('Task updated successfully');
    } catch (err) {
      toast.error('Failed to update task.');
    }
  };

  const handleDeleteTodo = async (id) => {
    const previousTodos = [...todos];
    setTodos(todos.filter(t => t._id !== id));

    try {
      await deleteTodo(id);
      toast.warn('Task deleted');
    } catch (err) {
      setTodos(previousTodos);
      toast.error('Failed to delete task.');
    }
  };

  const handleClearCompleted = async () => {
    const previousTodos = [...todos];
    setTodos(todos.filter(t => !t.done));

    try {
      await clearCompletedTodos();
      toast.success('All completed tasks cleared!');
    } catch (err) {
      setTodos(previousTodos);
      toast.error('Failed to clear tasks.');
    }
  };

  const filteredTodos = todos.filter(t => {
    if (filter === 'completed') return t.done;
    if (filter === 'pending') return !t.done;
    return true;
  });

  const completedCount = todos.filter(t => t.done).length;
  const progress = todos.length > 0 ? (completedCount / todos.length) * 100 : 0;

  return (
    <div className="container">
      <ToastContainer position="bottom-right" theme="dark" pauseOnHover={false} autoClose={2000} />

      <h1>TaskNest</h1>

      <TodoForm onAdd={handleAddTodo} />

      <div className="progress-container glass-card" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
        <div className="progress-info">
          <span>Task Progress</span>
          <span>{completedCount} / {todos.length} Tasks</span>
        </div>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }}></div>
        </div>
      </div>

      {error && (
        <div className="glass-card" style={{ marginBottom: '1.5rem', borderColor: 'var(--error-color)', color: 'var(--error-color)', padding: '1rem' }}>
          {error}
        </div>
      )}

      <div className="filters">
        <button className={`filter-btn ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>All</button>
        <button className={`filter-btn ${filter === 'pending' ? 'active' : ''}`} onClick={() => setFilter('pending')}>Pending</button>
        <button className={`filter-btn ${filter === 'completed' ? 'active' : ''}`} onClick={() => setFilter('completed')}>Completed</button>
        {completedCount > 0 && (
          <button className="clear-btn" onClick={handleClearCompleted}>Clear Completed</button>
        )}
      </div>

      <div className="glass-card">
        {loading ? (
          <div className="loader"></div>
        ) : (
          <TodoList
            todos={filteredTodos}
            onToggle={handleToggleTodo}
            onDelete={handleDeleteTodo}
            onUpdate={handleUpdateTodo}
          />
        )}
      </div>
    </div>
  );
}

export default App;
