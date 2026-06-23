# IntellMeet Backend (TypeScript)

Production-grade backend for the IntellMeet collaboration platform.

## Stack
- Node.js + Express + TypeScript
- MongoDB + Mongoose
- Socket.io (real-time chat/signaling)
- Redis (optional for cache/sessions)
- OpenAI (optional for meeting intelligence)

## Quick Start

1. Copy `.env.example` to `.env`.
2. Fill required environment variables.
3. Install dependencies:
   - `npm install`
4. Run in dev mode:
   - `npm run dev`

## How To Check The Backend

1. Start MongoDB locally or provide a valid `MONGODB_URI`.
2. If you want Redis features, start Redis and set `REDIS_URL`.
3. Run `npm run dev`.
4. Open `GET /api/v1/health` in Postman or your browser.
5. Test auth first:
   - `POST /api/v1/auth/register`
   - `POST /api/v1/auth/login`
6. Use the returned JWT in the `Authorization: Bearer <token>` header.
7. Test meetings and AI endpoints after auth:
   - `POST /api/v1/meetings`
   - `GET /api/v1/meetings`
   - `POST /api/v1/ai/meeting-insights`

## Verification Commands

1. Install dependencies: `npm install`
2. TypeScript build check: `npm run build`
3. Development server: `npm run dev`

If `npm run build` passes, the TypeScript code is compiling successfully.

## Testing Strategy

### Current coverage target
- Start with API route tests for auth, meetings, and AI.
- Add integration tests for MongoDB-backed flows.
- Add socket event tests for chat and join events.

### Recommended test stack
- Unit and integration tests: Node test runner or Jest
- HTTP tests: Supertest
- Mocking: Sinon or Jest mocks
- Socket tests: socket.io-client

### What to test first
1. `POST /auth/register` should create a user and return tokens.
2. `POST /auth/login` should reject bad credentials and accept valid ones.
3. `POST /meetings` should require a valid JWT.
4. `GET /meetings/:meetingId` should only allow participants.
5. `POST /ai/meeting-insights` should persist summary and action items.
6. Socket chat events should broadcast to the room.

## DevOps / Quality Ownership Checklist

### JWT + bcrypt
- Already implemented in backend auth flow.
- Check by registering a user, logging in, and verifying protected routes.

### Redis cache
- Redis connection scaffold exists.
- Check by setting `REDIS_URL` and confirming startup logs show a successful connection.

### File storage (Cloudinary / AWS S3)
- Not implemented yet in code.
- Next step is to add upload service, credential config, and media endpoints.

### Docker multi-stage
- Not implemented yet in code.
- Next step is to add backend `Dockerfile` and a `docker-compose.yml` for local stack.

### Kubernetes + Helm
- Not implemented yet in code.
- Next step is to create deployment, service, configmap, secret, and Helm chart templates.

### GitHub Actions CI/CD
- Not implemented yet in code.
- Next step is to add workflow jobs for install, lint, build, tests, and deployment.

### Prometheus, Grafana, Sentry
- Not implemented yet in code.
- Next step is to expose metrics, add error reporting, and build dashboards.

## Current Status

- Backend TypeScript foundation: done
- Auth JWT + bcrypt: done
- Redis connection layer: done
- AI summary service scaffold: done
- Docker/Kubernetes/CI/CD/monitoring: pending

So the backend is successfully developed as a working foundation, but the production DevOps layer still needs to be added for a fully enterprise-ready release.

## Build and Run

1. `npm run build`
2. `npm run start`

## API Prefix
Default API prefix is `/api/v1`.

## Key Endpoints

### Health
- `GET /api/v1/health`

### Auth
- `POST /api/v1/auth/register`
- `POST /api/v1/auth/login`
- `POST /api/v1/auth/refresh-token`

### User
- `GET /api/v1/users/me`

### Meetings
- `POST /api/v1/meetings`
- `GET /api/v1/meetings`
- `GET /api/v1/meetings/:meetingId`
- `PATCH /api/v1/meetings/:meetingId/status`

### AI
- `POST /api/v1/ai/meeting-insights`

## Socket Events

### Client -> Server
- `meeting:join`
- `meeting:typing`
- `meeting:chat`

### Server -> Client
- `meeting:user-joined`
- `meeting:typing`
- `meeting:chat`

## Team Ownership
- Backend foundation/auth/meetings: Member A
- Realtime/video signaling: Member B
- AI summarization/action extraction: Member C
- DevOps/CI-CD/monitoring/performance: Member D

See `IMPLEMENTATION_PLAN.md` for dependency mapping and detailed phase plan.
