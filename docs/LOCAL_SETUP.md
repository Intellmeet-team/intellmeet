# Local Setup

This guide is written for a first-time contributor. Follow the steps in order. The database setup does not require manual collection creation; the application creates the required MongoDB collections after the first successful request that writes data.

## Prerequisites

- Node.js 20 or newer
- npm
- Git
- MongoDB 7 locally, or a free MongoDB Atlas connection string
- Redis 7 when working on cache or clustered real-time features

## 1. Confirm the Required Tools

Open PowerShell, Terminal, or a command prompt and run:

```bash
node --version
npm --version
git --version
```

The Node.js version must start with `v20` or a newer supported major version. Install the current Node.js LTS release and Git if a command is not recognized, then close and reopen the terminal.

## 2. Open the Project

If the repository is already on your computer, open a terminal in the `intellmeet` folder. Otherwise:

```bash
git clone <repository-url>
cd intellmeet
```

Replace `<repository-url>` with the HTTPS URL shown on the GitHub repository page.

## 3. Install Packages

```bash
cd backend
npm ci

cd ../frontend
npm ci
```

`npm ci` installs the exact versions recorded in each `package-lock.json`. If it reports that the lock file is out of date, do not delete the lock file; ask the owner of the dependency change to correct it.

## 4. Configure MongoDB

MongoDB stores users, meetings, messages, summaries, and action items. Choose one option:

- Use **MongoDB Atlas** if you want the simplest setup and do not want to install a database service on your computer.
- Use **Local MongoDB** if you already have MongoDB installed or need to work fully offline.

Only one option is required.

### Option A: MongoDB Atlas

1. Create or sign in to a MongoDB Atlas account.
2. Create a free database deployment.
3. Create a database user and store its username and password privately.
4. Add your current IP address to the project's network access list. Use broad public access only for temporary development when the team has explicitly accepted the risk.
5. Open the deployment's connection options and choose the driver connection method for Node.js.
6. Copy the connection string. It will resemble:

```text
mongodb+srv://<username>:<password>@<cluster-host>/intellmeet?retryWrites=true&w=majority
```

7. Replace `<username>`, `<password>`, and `<cluster-host>` with the real values. Keep `/intellmeet` as the database name.
8. Put the completed URI in `backend/.env` as `MONGODB_URI`.

Never place the real URI in `.env.example`, documentation, chat, screenshots, commits, or pull requests. If the password contains reserved URL characters such as `@`, `:`, `/`, or `#`, percent-encode those characters.

### Option B: Local MongoDB

1. Install MongoDB Community Server for your operating system.
2. Keep the default port `27017` unless your machine already uses it.
3. Start the MongoDB service.
4. Use this connection string in `backend/.env`:

```dotenv
MONGODB_URI=mongodb://127.0.0.1:27017/intellmeet
```

5. Continue to the next section. The application creates the `intellmeet` database after the first successful write.

No seed or migration command is currently required for either option.

## 5. Create the Backend Environment File

Run one command from the repository root.

Windows PowerShell:

```powershell
Copy-Item backend/.env.example backend/.env
```

macOS or Linux:

```bash
cp backend/.env.example backend/.env
```

Open `backend/.env` in a text editor and update it:

```dotenv
NODE_ENV=development
PORT=5000
CLIENT_ORIGIN=http://localhost:5173
API_PREFIX=/api/v1

MONGODB_URI=mongodb://127.0.0.1:27017/intellmeet
REDIS_URL=

JWT_ACCESS_SECRET=replace_with_a_random_secret_of_at_least_16_characters
JWT_ACCESS_EXPIRES_IN=15m
JWT_REFRESH_SECRET=replace_with_a_different_random_secret_of_at_least_16_characters
JWT_REFRESH_EXPIRES_IN=7d

GOOGLE_CLIENT_ID=
OPENAI_API_KEY=
OPENAI_SUMMARY_MODEL=gpt-4.1-mini
```

| Variable | Required | Purpose |
| --- | --- | --- |
| `MONGODB_URI` | Yes | MongoDB connection string |
| `JWT_ACCESS_SECRET` | Yes | Signs access tokens; minimum 16 characters |
| `JWT_REFRESH_SECRET` | Yes | Signs refresh tokens; minimum 16 characters and different from the access secret |
| `PORT` | No | API port, default `5000` |
| `CLIENT_ORIGIN` | No | Allowed browser origin, default `http://localhost:5173` |
| `API_PREFIX` | No | Route prefix, default `/api/v1` |
| `REDIS_URL` | No | Enables the Redis connection |
| `GOOGLE_CLIENT_ID` | No | Verifies the audience of Google ID tokens |
| `OPENAI_API_KEY` | No | Enables provider-generated meeting insights |
| `OPENAI_SUMMARY_MODEL` | No | OpenAI model used by the insight service |

When `OPENAI_API_KEY` is absent, the service returns a simple transcript-based fallback summary and no action items. This is for local continuity, not AI quality testing.

Generate two long random strings for the JWT secrets. They must be different and must never be copied from another contributor's `.env` file.

Quick checklist before starting the backend:

- `backend/.env` exists.
- `MONGODB_URI` points to Atlas or local MongoDB.
- `JWT_ACCESS_SECRET` and `JWT_REFRESH_SECRET` are not the placeholder values.
- `JWT_ACCESS_SECRET` and `JWT_REFRESH_SECRET` are different from each other.
- Optional values can stay blank until that feature is being developed.

## 6. Optional Redis

Run Redis locally and set:

```dotenv
REDIS_URL=redis://127.0.0.1:6379
```

The server continues without Redis if the variable is blank or the connection fails. Current application behavior does not depend on Redis yet.

## 7. Start the Applications

Backend terminal:

```bash
cd backend
npm run dev
```

Frontend terminal:

```bash
cd frontend
npm run dev
```

Leave both terminals open. A successful backend startup prints the MongoDB connection message and the API port. Vite prints the frontend URL.

## 8. Verify the Setup

Open this URL in a browser:

```text
http://localhost:5000/api/v1/health
```

It should return JSON in this shape:

```json
{
  "success": true,
  "service": "intellmeet-backend",
  "uptime": 12.34,
  "timestamp": "2026-06-28T10:00:00.000Z"
}
```

Then register a user using the example in [API_REFERENCE.md](API_REFERENCE.md). If startup fails before listening, check the environment validation message and MongoDB connectivity first.

## 9. Confirm the Database

1. Register one test user through the API.
2. In Atlas, open the database collection browser; for local MongoDB, open MongoDB Compass if installed.
3. Find the `intellmeet` database and its `users` collection.
4. Confirm that the user record exists and that no plain-text password is stored.

The database may not appear until the first successful registration. This is expected.

If the database still does not appear after registration, confirm that the backend terminal says it connected to MongoDB, then check that the frontend or API client is sending requests to `http://localhost:5000/api/v1`.

## 10. Run the Same Checks as CI

Before pushing a branch, run the commands in [CI and Branch Protection](CI_AND_BRANCH_PROTECTION.md). A pull request cannot be accepted or merged until both backend and frontend CI checks pass.

## Common Problems

| Symptom | Check |
| --- | --- |
| Invalid environment variables | JWT secret length and presence of `MONGODB_URI` |
| MongoDB server selection timeout | Local service status, Atlas IP access list, credentials, and URI encoding |
| Browser CORS error | Exact frontend URL in `CLIENT_ORIGIN` |
| Redis errors during startup | Redis service and `REDIS_URL`; leave it blank if not needed |
| AI fallback instead of generated output | `OPENAI_API_KEY` and `OPENAI_SUMMARY_MODEL` |
