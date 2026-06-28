# IntellMeet Frontend

React 19, TypeScript, and Vite workspace for the IntellMeet web client.

The package is currently a starter scaffold. Authentication screens, routing, meeting workflows, WebRTC media, collaboration views, and post-meeting dashboards have not been implemented yet. Track that work in the repository [Implementation Plan](../docs/IMPLEMENTATION_PLAN.md).

## Run Locally

```bash
npm ci
npm run dev
```

Vite serves the application at `http://localhost:5173` by default.

## Commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm run lint` | Run ESLint |
| `npm run build` | Type-check and produce a production build |
| `npm run preview` | Preview the production build locally |

New frontend work should use the API and event contracts documented in [API_REFERENCE.md](../docs/API_REFERENCE.md).
