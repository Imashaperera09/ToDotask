import React, { useState } from 'react';
import TodoForm from './TodoForm';

const TodoItem = ({ todo, onToggle, onDelete, onUpdate }) => {
    const [isEditing, setIsEditing] = useState(false);

    const isOverdue = todo.dueDate && !todo.done && new Date(todo.dueDate) < new Date(new Date().setHours(0, 0, 0, 0));
    const createdDate = new Date(todo.createdAt).toLocaleDateString();
    const dueDate = todo.dueDate ? new Date(todo.dueDate).toLocaleDateString() : null;

    if (isEditing) {
        return (
            <div className={`todo-item editing priority-${todo.priority}`}>
                <TodoForm
                    initialData={todo}
                    onAdd={(updates) => {
                        onUpdate(todo._id, updates);
                        setIsEditing(false);
                    }}
                    onCancel={() => setIsEditing(false)}
                />
            </div>
        );
    }

    return (
        <div className={`todo-item ${todo.done ? 'done' : ''} priority-${todo.priority}`}>
            <div className="checkbox-container" onClick={() => onToggle(todo._id)}>
                <div className="checkbox">
                    {todo.done && (
                        <svg className="checkbox-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                        </svg>
                    )}
                </div>
            </div>

            <div className="todo-content" onClick={() => onToggle(todo._id)}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.25rem' }}>
                    <span className="category-tag">{todo.category}</span>
                    <h3 style={{ textDecoration: todo.done ? 'line-through' : 'none', margin: 0 }}>{todo.title}</h3>
                </div>
                {todo.description && <p>{todo.description}</p>}
                <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
                    <span className="date-text">Created: {createdDate}</span>
                    {dueDate && (
                        <span className={`date-text ${isOverdue ? 'overdue' : ''}`}>
                            Due: {dueDate} {isOverdue ? '(Overdue!)' : ''}
                        </span>
                    )}
                </div>
            </div>

            <div className="actions">
                <button className="btn-icon" onClick={() => setIsEditing(true)} title="Edit">
                    <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                </button>
                <button className="btn-icon delete" onClick={() => onDelete(todo._id)} title="Delete">
                    <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default TodoItem;
