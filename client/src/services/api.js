const API_URL = 'http://localhost:5000/api/todos';

export const fetchTodos = async () => {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('Failed to fetch todos');
    return response.json();
};

export const createTodo = async (todo) => {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(todo),
    });
    if (!response.ok) throw new Error('Failed to create todo');
    return response.json();
};

export const updateTodo = async (id, updates) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
    });
    if (!response.ok) throw new Error('Failed to update todo');
    return response.json();
};

export const toggleTodoDone = async (id) => {
    const response = await fetch(`${API_URL}/${id}/done`, {
        method: 'PATCH',
    });
    if (!response.ok) throw new Error('Failed to toggle todo');
    return response.json();
};

export const deleteTodo = async (id) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete todo');
    return true;
};

export const clearCompletedTodos = async () => {
    const response = await fetch(`${API_URL}/clear-completed`, {
        method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to clear completed todos');
    return true;
};

