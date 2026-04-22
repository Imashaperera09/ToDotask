require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/todoapp';

// Mongoose model
const todoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  done: { type: Boolean, default: false },
  priority: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
  category: { type: String, enum: ['Work', 'Personal', 'Study', 'Other'], default: 'Other' },
  dueDate: Date,
}, { timestamps: true });
const Todo = mongoose.model('Todo', todoSchema);

// Middleware for error handling
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// API Endpoints
app.get('/api/todos', asyncHandler(async (req, res) => {
  const todos = await Todo.find().sort({ createdAt: -1 });
  res.json(todos);
}));

app.post('/api/todos', asyncHandler(async (req, res) => {
  const { title, description, priority, category, dueDate } = req.body;
  if (!title || typeof title !== 'string' || title.trim() === '') {
    return res.status(400).json({ error: 'Title is required' });
  }
  const todo = new Todo({
    title: title.trim(),
    description,
    priority,
    category,
    dueDate
  });
  await todo.save();
  res.status(201).json(todo);
}));

app.delete('/api/todos/clear-completed', asyncHandler(async (req, res) => {
  await Todo.deleteMany({ done: true });
  res.status(204).end();
}));

app.put('/api/todos/:id', asyncHandler(async (req, res) => {
  const { title, description, priority, category, dueDate } = req.body;
  if (!title || typeof title !== 'string' || title.trim() === '') {
    return res.status(400).json({ error: 'Title is required' });
  }
  const todo = await Todo.findByIdAndUpdate(
    req.params.id,
    { title: title.trim(), description, priority, category, dueDate },
    { new: true, runValidators: true }
  );
  if (!todo) return res.status(404).json({ error: 'Todo not found' });
  res.json(todo);
}));


app.patch('/api/todos/:id/done', asyncHandler(async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  if (!todo) return res.status(404).json({ error: 'Todo not found' });
  todo.done = !todo.done;
  await todo.save();
  res.json(todo);
}));

app.delete('/api/todos/:id', asyncHandler(async (req, res) => {
  const todo = await Todo.findByIdAndDelete(req.params.id);
  if (!todo) return res.status(404).json({ error: 'Todo not found' });
  res.status(204).end();
}));

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error', message: err.message });
});

mongoose.connect(MONGODB_URI)
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

