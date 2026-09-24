# Matchwise

Matchwise is an AI-ready MERN workspace for comparing a resume with a job description and turning the result into a clear, actionable match report.

## Stack

- **React + Vite:** SPA dashboard with Framer Motion, Recharts, Lucide icons, and a Tailwind-ready build.
- **Express + Node:** REST API under `server/`, global error handling, request validation, JWT sessions in HTTP-only cookies, and Socket.io events.
- **MongoDB + Mongoose:** validated `User` and `Analysis` models with indexes for email, user activity, status, and reverse chronological analysis history.

## Architecture

The frontend ships the product dashboard as a polished, interactive first slice. The upload dropzone, job description editor, responsive navigation, score visualizations, skill breakdown, and recent analysis list are ready to connect to the API.

The API is organized by feature:

- `server/config/db.js`: MongoDB connection.
- `server/models/`: strict Mongoose schemas.
- `server/middleware/auth.js`: JWT signing and cookie authentication.
- `server/routes/auth.js`: register, login, logout, and current user.
- `server/routes/analyses.js`: filtered analysis history, creation, and metrics.
- `server/index.js`: Express, CORS, Socket.io, health check, and global error handling.

## Run locally

```bash
npm install
copy .env.example .env
npm run dev
npm run server:dev
```

Use `npm run dev:full` to run Vite and the API together. MongoDB is optional for viewing the frontend; API persistence requires `MONGODB_URI`.

## API surface

- `GET /api/health`
- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/logout`
- `GET /api/auth/me`
- `GET /api/analyses?search=&status=&sort=`
- `POST /api/analyses`
- `GET /api/analyses/metrics`

The next backend integration step is to replace the demo score payload with a document extraction and analysis worker. The current API shape already supports matched skills, missing skills, score, queued status, and real-time `analysis:created` updates.
