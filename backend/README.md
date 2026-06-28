# IntellMeet Backend

Express and Socket.io backend for IntellMeet. It uses JavaScript ES modules and requires Node.js 20 or newer.

## Run Locally

```bash
cp .env.example .env
npm ci
npm run dev
```

MongoDB and valid JWT secrets are required. Redis and OpenAI are optional for local development. Full configuration instructions are in [Local Setup](../docs/LOCAL_SETUP.md).

## Commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start with Node watch mode |
| `npm start` | Start without watch mode |
| `npm run lint` | Run ESLint |
| `npm test` | Run Node's test runner |
| `npm run build` | Confirm the JavaScript package is build-ready |

## Implemented Modules

- JWT authentication, refresh tokens, and Google ID token login
- Authenticated user profile lookup
- Meeting creation, history, detail, and status updates
- Socket.io meeting join, typing, and persisted chat events
- Transcript-based summary and action-item generation
- MongoDB persistence and optional Redis connection
- Security headers, CORS, auth rate limiting, validation, and centralized errors

See [API and Socket Reference](../docs/API_REFERENCE.md) for contracts and [Project Status](../docs/PROJECT_STATUS.md) for limitations.
