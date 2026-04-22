# TODO App Frontend

A premium React frontend for the TODO application.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start development server:
   ```bash
   npm start
   ```

## Features

- **Glassmorphism UI**: Stunning visual design using semi-transparent cards and backdrop filters.
- **Optimistic UI**: Immediate feedback for task status toggling and deletion.
- **Animated Transitions**: Smooth fade and slide animations for task entry and removal.
- **Modern React**: Built with React 19 functional components and hooks (`useState`, `useEffect`).
- **Responsive**: Perfectly aligned and spacious design for all screens.

## Implementation Details

- **Services**: Dedicated API service layer in `src/services/api.js`.
- **Components**: Modular approach with `TodoForm`, `TodoList`, and `TodoItem`.
- **Styling**: Pure Vanilla CSS design system in `src/index.css`.

## Assumptions

- The backend is running on `http://localhost:5000`.
