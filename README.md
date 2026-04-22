# TaskNest - Full-Stack TODO App

A premium TODO application built with React, Node.js, Express, and MongoDB.

## Project Structure

```text
hiring-fullstack-todo/
├── client/         # React frontend
├── server/         # Express backend
└── README.md       # Project overview
```

## Features

- **CRUD Operations**: Create, Read, Update, and Delete tasks.
- **Toggle Done**: Quickly mark tasks as completed with visual feedback.
- **Premium UI**: Modern glassmorphism design with a responsive layout.
- **Optimistic Updates**: Snappy UI with immediate feedback on actions.
- **Modern Tech Stack**: React 19, Express 5, and Mongoose for schema modeling.

## Database Setup

You don't need to manually create any tables or collections. Mongoose will automatically create the `todos` collection once you save your first task.

### Option A: Local MongoDB (Recommended for Offline)
1.  **Install**: Download [MongoDB Community Server](https://www.mongodb.com/try/download/community).
2.  **Run**: Ensure the MongoDB service is running.
3.  **Config**: The default `MONGODB_URI` in `.env` (`mongodb://localhost:27017/todoapp`) should work out of the box.

### Option B: MongoDB Atlas (Cloud - Free)
1.  **Account**: Create a free account at [mongodb.com/atlas](https://www.mongodb.com/cloud/atlas).
2.  **Cluster**: Create a free "Shared Cluster".
3.  **Security**: 
    - In **Network Access**, click "Add IP Address" and select "Allow Access from Anywhere" (for testing).
    - In **Database Access**, create a user with a password.
4.  **Connect**: Click "Connect" -> "Connect your application". Copy the connection string.
5.  **Config**: Update `server/.env` with your connection string:
    ```env
    MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.abcde.mongodb.net/todoapp?retryWrites=true&w=majority
    ```

## Prerequisites

- Node.js (v18 or higher)
- MongoDB (Local or Atlas)

## Getting Started

The project is set up as a monorepo using **npm workspaces**. You can manage both frontend and backend from the root directory.

### 1. Installation

Install all dependencies for the root, client, and server:

```bash
npm install
```

### 2. Configuration

Create a `.env` file in the `server` directory (see the [Database Setup](#database-setup) section for more details):

```env
MONGODB_URI=mongodb://localhost:27017/todoapp
PORT=5000
```

### 3. Run the Application

You can start both the client and server concurrently with a single command from the root:

```bash
# Production mode
npm start

# Development mode (with nodemon for backend)
npm run dev
```

The frontend will be available at `http://localhost:3000` and the backend at `http://localhost:5000`.

## API Documentation

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| GET | /api/todos | Get all TODO items |
| POST | /api/todos | Create a new TODO item |
| PUT | /api/todos/:id | Update a TODO (title/description) |
| PATCH | /api/todos/:id/done | Toggle the done status |
| DELETE | /api/todos/:id | Delete a TODO |
