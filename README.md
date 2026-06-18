# IntellMeet - AI Powered Enterprise Meeting & Collaboration Platform

## Overview

IntellMeet is a production-grade enterprise collaboration platform built using the MERN stack. The platform enables teams to conduct real-time meetings, communicate through chat, generate AI-powered meeting summaries, manage tasks, and track productivity through analytics.

## Project Goals

* Real-time video meetings
* Team collaboration
* AI meeting summaries
* Action item extraction
* Task management
* Analytics dashboard
* Enterprise-grade architecture

---

## Technology Stack

### Frontend

* React 19
* TypeScript
* Vite
* Tailwind CSS v4
* shadcn/ui
* TanStack Query
* Zustand
* Socket.io Client

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* Socket.io
* WebRTC
* JWT
* bcrypt

### AI

* OpenAI / Hugging Face

### Storage & Cache

* Cloudinary
* Redis

---

## Project Structure

```text
intellmeet/
│
├── frontend/
│
├── backend/
│
├── docs/
│
├── .github/
│
├── README.md
├── CONTRIBUTING.md
├── .gitignore
└── .env.example
```

---

## Frontend Structure

```text
frontend/
│
├── public/
│
├── src/
│
├── assets/
│
├── components/
│   ├── common/
│   ├── auth/
│   ├── dashboard/
│   ├── meeting/
│   ├── chat/
│   └── task/
│
├── pages/
│   ├── Login/
│   ├── Register/
│   ├── Dashboard/
│   ├── MeetingRoom/
│   ├── Workspace/
│   └── Analytics/
│
├── hooks/
│
├── services/
│
├── store/
│
├── routes/
│
├── types/
│
├── App.tsx
└── main.tsx
```

---

## Backend Structure

```text
backend/
│
├── src/
│
├── config/
│
├── controllers/
│
├── middleware/
│
├── models/
│
├── routes/
│
├── services/
│
├── sockets/
│
├── ai/
│
├── utils/
│
├── validations/
│
└── server.ts
```

---

## Branch Strategy

Never push directly to main.

```text
main
│
develop
│
├── feature/auth
├── feature/frontend
├── feature/realtime
├── feature/meeting
├── feature/dashboard
├── feature/ai
├── feature/tasks
└── feature/analytics
```

---

## Development Workflow

Step 1:

```bash
git checkout develop
git pull origin develop
```

Step 2:

Create feature branch

```bash
git checkout -b feature/feature-name
```

Step 3:

Work on your assigned task.

Step 4:

Commit changes

```bash
git add .
git commit -m "feat: add login page"
```

Step 5:

Push branch

```bash
git push origin feature/feature-name
```

Step 6:

Create Pull Request

```text
feature/feature-name → develop
```

Step 7:

After review, merge into develop.

---

## Team Responsibilities

### Member 1

Authentication

* Login
* Register
* JWT
* User Profile

### Member 2

Frontend Core

* Layout
* Navbar
* Dashboard UI
* Routing

### Member 3

Real-Time Features

* Socket.io
* Chat
* Meeting Room
* WebRTC

### Member 4

AI & Productivity

* AI Summary
* Action Items
* Tasks
* Analytics

---

## Installation

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Backend

```bash
cd backend
npm install
npm run dev
```

---

## Environment Variables

```env
PORT=
MONGO_URI=
JWT_SECRET=
OPENAI_API_KEY=
CLOUDINARY_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
REDIS_URL=
```

---

## Commit Convention

Examples:

```bash
feat: add authentication routes
feat: implement chat module
fix: resolve websocket disconnect issue
docs: update project documentation
refactor: optimize dashboard component
```

---

## Pull Request Rules

* PR must target develop branch
* PR must contain clear description
* PR must pass local testing
* PR must not contain unrelated files
* PR should be reviewed before merging

---

## Merge Policy

Only Project Lead / Repository Owner can merge PRs into develop and main branches.

Contributors must never merge directly into main.
