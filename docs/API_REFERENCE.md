# API and Socket Reference

Base URL: `http://localhost:5000/api/v1`

JSON responses generally use:

```json
{
  "success": true,
  "message": "Optional status message",
  "data": {}
}
```

Protected endpoints require `Authorization: Bearer <accessToken>`.

## Health

### `GET /health`

Returns process uptime and a timestamp. It does not currently test database or provider readiness.

## Authentication

### `POST /auth/register`

```json
{
  "name": "Asha Rao",
  "email": "asha@example.com",
  "password": "a-strong-password",
  "role": "member"
}
```

`role` is optional and accepts `admin` or `member`. The response contains `data.user` and `data.tokens`.

### `POST /auth/login`

```json
{
  "email": "asha@example.com",
  "password": "a-strong-password"
}
```

### `POST /auth/refresh-token`

```json
{
  "refreshToken": "<refresh-token>"
}
```

Returns a new access and refresh token pair.

### `POST /auth/oauth/google`

```json
{
  "idToken": "<google-id-token>"
}
```

The frontend must obtain a real Google ID token. When `GOOGLE_CLIENT_ID` is set, its audience is verified.

## Users

### `GET /users/me`

Returns the authenticated user without `passwordHash`.

## Meetings

All meeting endpoints are protected.

### `POST /meetings`

```json
{
  "title": "Quarterly planning",
  "description": "Agree on Q3 priorities",
  "startTime": "2026-07-01T09:30:00.000Z",
  "participantUserIds": ["507f1f77bcf86cd799439011"]
}
```

The authenticated host is added to `participants` automatically.

### `GET /meetings`

Returns up to 100 meetings containing the authenticated user, newest start time first.

### `GET /meetings/:meetingId`

Returns one meeting plus its persisted `messages` and `actionItems`. The caller must be a participant.

### `PATCH /meetings/:meetingId/status`

```json
{
  "status": "completed",
  "endTime": "2026-07-01T10:15:00.000Z"
}
```

Allowed statuses are `scheduled`, `live`, `completed`, and `cancelled`. Only the host may update status.

## AI Meeting Insights

### `POST /ai/meeting-insights`

```json
{
  "meetingId": "507f1f77bcf86cd799439011",
  "transcript": "A transcript containing at least twenty characters."
}
```

The caller must be a meeting participant. The endpoint stores the transcript and summary, creates action-item records, and returns them. Without `OPENAI_API_KEY`, it returns a basic fallback summary and an empty action-item list.

## Socket.io

Socket.io uses the backend origin. The current server does not authenticate the socket handshake; consumers must treat the events as development contracts until authorization is added.

### Client to Server

`meeting:join`

```json
{
  "meetingId": "507f1f77bcf86cd799439011",
  "user": { "id": "507f1f77bcf86cd799439012", "name": "Asha Rao" }
}
```

`meeting:typing`

```json
{
  "meetingId": "507f1f77bcf86cd799439011",
  "userId": "507f1f77bcf86cd799439012",
  "isTyping": true
}
```

`meeting:chat`

```json
{
  "meetingId": "507f1f77bcf86cd799439011",
  "senderId": "507f1f77bcf86cd799439012",
  "body": "The design review starts at 10:00."
}
```

### Server to Client

- `meeting:user-joined`: `{ userId, name, at }`
- `meeting:typing`: `{ userId, isTyping }`
- `meeting:chat`: `{ _id, meetingId, senderId, body, createdAt }`

## Contract Change Rule

Any endpoint, payload, response, event, status enum, or environment-variable change must update this file in the same pull request. Coordinate breaking changes with all frontend and backend owners first.
