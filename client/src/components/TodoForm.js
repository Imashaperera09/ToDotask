import React, { useState } from 'react';

const TodoForm = ({ onAdd, initialData, onCancel }) => {
    const [title, setTitle] = useState(initialData?.title || '');
    const [description, setDescription] = useState(initialData?.description || '');
    const [priority, setPriority] = useState(initialData?.priority || 'medium');
    const [category, setCategory] = useState(initialData?.category || 'Other');
    const [dueDate, setDueDate] = useState(initialData?.dueDate ? new Date(initialData.dueDate).toISOString().split('T')[0] : '');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title.trim()) return;

        onAdd({
            title,
            description,
            priority,
            category,
            dueDate: dueDate || null
        });

        if (!initialData) {
            setTitle('');
            setDescription('');
            setPriority('medium');
            setCategory('Other');
            setDueDate('');
        }
    };

    return (
        <form className={initialData ? "edit-form" : "todo-form glass-card"} onSubmit={handleSubmit}>
            <div className="input-group">
                <input
                    type="text"
                    placeholder="What needs to be done?"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </div>
            <div className="input-group">
                <textarea
                    placeholder="Description (optional)"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows="2"
                />
            </div>

            <div className="form-row">
                <div className="input-group">
                    <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Priority</label>
                    <select
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                        style={{ padding: '0.75rem', borderRadius: '0.75rem', background: 'rgba(15, 23, 42, 0.5)', color: 'white', border: '1px solid var(--border-color)' }}
                    >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                </div>
                <div className="input-group">
                    <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Category</label>
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        style={{ padding: '0.75rem', borderRadius: '0.75rem', background: 'rgba(15, 23, 42, 0.5)', color: 'white', border: '1px solid var(--border-color)' }}
                    >
                        <option value="Work">Work</option>
                        <option value="Personal">Personal</option>
                        <option value="Study">Study</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
            </div>

            <div className="input-group">
                <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Due Date (optional)</label>
                <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                />
            </div>

            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
                    {initialData ? 'Save Changes' : 'Add Task'}
                </button>
                {onCancel && (
                    <button type="button" className="btn btn-icon" onClick={onCancel} style={{ flex: 0.3 }}>
                        Cancel
                    </button>
                )}
            </div>
        </form>
    );
};

export default TodoForm;
