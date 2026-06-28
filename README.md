# IntellMeet

IntellMeet is an enterprise meeting and collaboration platform built around secure meeting workflows, real-time communication, and AI-assisted follow-up. The repository currently contains a working backend foundation and a React frontend scaffold ready for product development.

## Project Status

| Area | Status | Current scope |
| --- | --- | --- |
| Authentication | Implemented | Registration, login, token refresh, Google ID token login, JWT middleware |
| User profiles | Partial | Authenticated profile read endpoint |
| Meetings | Implemented foundation | Create, list, detail, participant access, host-controlled status updates |
| Real-time collaboration | Implemented foundation | Room join, typing, and persisted chat events |
| AI meeting intelligence | Implemented foundation | Transcript input, summary generation, action-item extraction and persistence |
| Frontend | Scaffold only | React, TypeScript, Vite, lint and build configuration |
| Video and screen sharing | Not started | WebRTC meeting room and signaling are still required |
| Team productivity | Not started | Workspaces, projects, boards, tasks, notifications, and analytics |
| Production operations | Partial | Pull-request CI exists; deployment, monitoring, and load testing remain |

Detailed implementation evidence and the remaining assignment scope are recorded in [Project Status](docs/PROJECT_STATUS.md).

## Technology

| Layer | Current technology |
| --- | --- |
| Frontend | React 19, TypeScript, Vite |
| Backend | Node.js 20+, Express, JavaScript ES modules |
| Database | MongoDB, Mongoose |
| Real-time | Socket.io |
| Cache | Redis, optional in local development |
| Authentication | JWT, bcrypt, Google ID token verification |
| AI | OpenAI Responses API with a no-key development fallback |
| Validation and security | Zod, Helmet, CORS, rate limiting |
| Automation | GitHub Actions |

## Repository Layout

```text
intellmeet/
|-- backend/                 Express API, models, services, and Socket.io server
|-- frontend/                React application
|-- docs/                    Architecture, setup, status, ownership, and delivery plan
|-- .github/workflows/       Pull-request checks
|-- CONTRIBUTING.md          Team workflow and review requirements
`-- README.md                Project entry point
```

## Local Development

Prerequisites:

- Node.js 20 or newer
- npm
- MongoDB 7 or a MongoDB Atlas database
- Redis 7 only when Redis-backed work is being developed

For a complete first-time setup, including MongoDB Atlas, local MongoDB, `.env`, JWT secrets, and database verification, follow [Local Setup](docs/LOCAL_SETUP.md).

Start the backend:

```bash
cd backend
cp .env.example .env
npm ci
npm run dev
```

Start the frontend in another terminal:

```bash
cd frontend
npm ci
npm run dev
```

The frontend runs at `http://localhost:5173`. The API defaults to `http://localhost:5000/api/v1`, and its health endpoint is `GET /health` beneath that prefix.

## Documentation

- [Architecture](docs/ARCHITECTURE.md): current components, data flow, and boundaries
- [Local Setup](docs/LOCAL_SETUP.md): database and environment configuration
- [API and Socket Reference](docs/API_REFERENCE.md): implemented contracts and sample payloads
- [CI and Branch Protection](docs/CI_AND_BRANCH_PROTECTION.md): required checks and merge rules
- [Project Status](docs/PROJECT_STATUS.md): delivered features, gaps, and acceptance status
- [Implementation Plan](docs/IMPLEMENTATION_PLAN.md): ordered remaining work and dependencies
- [Team Ownership](docs/TEAM_OWNERSHIP.md): roles, branches, and handoff contracts
- [Submission Checklist](docs/SUBMISSION_CHECKLIST.md): assignment deliverables and release evidence

## Verification

Run checks in both packages before opening a pull request:

```bash
cd backend
npm run lint
npm test
npm run build

cd ../frontend
npm run lint
npm run build
```

Automated backend coverage is not yet established. A passing test command alone must not be reported as feature coverage; see the test workstream in the implementation plan.

## Collaboration

All work should branch from `develop` and return through a reviewed pull request. Do not commit secrets, generated build output, recordings, or local database files. Read [CONTRIBUTING.md](CONTRIBUTING.md) before taking ownership of a module.

Both `Backend CI / Backend quality` and `Frontend CI / Frontend quality` run on pull requests and pushes to `develop` or `main`. A pull request must not be approved, accepted, or merged until both checks pass on the latest commit. Repository administrators must enable the branch rules described in [CI and Branch Protection](docs/CI_AND_BRANCH_PROTECTION.md).

## Assignment Context

This project is being prepared for the Zidio Development MERN assignment, March 2026 industry edition. Performance, concurrency, availability, AI accuracy, and uptime figures in the brief are target requirements until they are measured and documented; they are not claims about the current milestone.
