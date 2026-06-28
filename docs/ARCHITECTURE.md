# Architecture

## Current System

```text
React client
    | HTTP / JSON                       Socket.io
    v                                      |
Express API <------------------------------+
    |-- authentication and validation
    |-- user and meeting controllers
    |-- AI meeting insight service ------> OpenAI API (optional)
    |-- Socket.io meeting handlers
    |
    +--> MongoDB: users, meetings, messages, action items
    `--> Redis: optional connection; application caching is not wired yet
```

The API and Socket.io server share one Node HTTP server. MongoDB is the system of record. The frontend is currently a standalone scaffold and has not yet integrated these contracts.

## Backend Boundaries

| Directory | Responsibility |
| --- | --- |
| `config/` | Environment validation and service connections |
| `controllers/` | HTTP use cases and response construction |
| `middlewares/` | Authentication, authorization helpers, validation, and errors |
| `models/` | Mongoose persistence schemas |
| `routes/` | Versioned HTTP route composition |
| `schemas/` | Zod request validation |
| `services/` | JWT and AI provider integration |
| `socket/` | Meeting room event handlers |
| `utils/` | Shared error and asynchronous handler utilities |

## Current Data Model

- `User`: identity, password hash, provider, role, profile metadata, and last login.
- `Meeting`: host, participants, schedule, lifecycle status, transcript, summary, and recording URL placeholder.
- `MeetingMessage`: meeting-scoped persisted chat message.
- `ActionItem`: meeting-scoped task with optional assignee and due date.

## Implemented Request Flow

1. Zod validates the request body or path parameters.
2. Protected routes verify the bearer access token and attach its identity.
3. Controllers enforce meeting participant or host ownership rules where implemented.
4. Mongoose reads or writes MongoDB.
5. Responses use `{ success, message?, data? }`; errors are normalized by the error middleware.

## Important Gaps

- Socket connections and events are not authenticated or authorized against meeting membership.
- WebRTC signaling and media transport are not implemented.
- Redis is connected optionally but is not used for cache, sessions, or Socket.io clustering.
- Recording upload, transcription ingestion, and object storage are not implemented.
- Refresh tokens are signed but are not persisted, rotated, or revoked.
- Readiness checks do not verify MongoDB, Redis, or external provider health.

These are scheduled work, not hidden assumptions. See [Implementation Plan](IMPLEMENTATION_PLAN.md).

## Target Evolution

The assignment's large concurrency and availability targets require an SFU-based video architecture, authenticated Socket.io clustering, durable media storage, background jobs, observability, and load-tested deployment. A peer-to-peer WebRTC prototype may be used for the first product milestone, but it should not be described as satisfying enterprise-scale participant targets.
