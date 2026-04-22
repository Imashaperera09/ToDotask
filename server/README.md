# TODO App Backend

A robust Node.js/Express backend for the TODO application.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Configure `.env`:
   - `MONGODB_URI`: Your MongoDB connection string.
   - `PORT`: Server port (default: 5000).

## Commands

- `npm start`: Runs the server in production mode.
- `npm run dev`: Runs the server with `nodemon` for development.

## Implementation Details

- **Validation**: Ensures titles are non-empty and trimmed.
- **Error Handling**: Centralized error handling for all routes.
- **Mongoose**: Clean schema modeling with timestamps.
- **API Endpoints**: Full RESTful implementation (GET, POST, PUT, PATCH, DELETE).

## Assumptions

- MongoDB is running locally on port 27017 unless specified in `.env`.
- Port 5000 is available for the backend.
