# Team Ownership

Names should be filled in when the project lead assigns the remaining work. Until then, role labels identify responsibility without implying that an unassigned teammate has accepted it.

| Role | Assignee | Status | Primary ownership | Suggested branch |
| --- | --- | --- | --- | --- |
| Project lead and backend foundation | Current milestone author | Current scope completed | Auth, users, meeting API, models, API contracts, reviews, integration releases | `feature/auth-meeting-api` |
| Frontend product member | Unassigned | Ready to start after baseline merge | FE-01 through FE-03: app architecture, authentication UI, meeting workflows, dashboards, accessibility | `feature/frontend-core` |
| Real-time and media member | Unassigned | Ready to start after baseline merge | RT-01 through RT-03: socket security, presence, WebRTC, screen sharing, recording | `feature/realtime-meetings` |
| AI and productivity member | Unassigned | Start AI-01 after meeting contract review | AI-01 through AI-03: transcription, summaries, workspaces, tasks, notifications, analytics | `feature/ai-productivity` |
| Quality and operations member | Unassigned | QA-01 can start immediately | QA-01 and OPS-01 through OPS-02: tests, deployment, observability, performance, security evidence | `feature/production-readiness` |

## Current Handoff

The project lead has delivered the backend foundation documented in [Project Status](PROJECT_STATUS.md). The repository does not yet contain the full product frontend, WebRTC video, production transcription, team management, analytics, or deployment stack.

Detailed task IDs, dependencies, and exit criteria are in [Implementation Plan](IMPLEMENTATION_PLAN.md). Before the next contributor starts, replace `Unassigned` with that contributor's name and create a matching issue.

## How to Assign the Next Work

1. Choose the next unblocked work item from [Implementation Plan](IMPLEMENTATION_PLAN.md).
2. Replace `Unassigned` in the ownership table with the contributor's name.
3. Create one GitHub issue with the work ID, acceptance criteria, dependencies, and expected tests.
4. Ask the contributor to branch from `develop` using the suggested branch name.
5. Require the contributor to update docs in the same pull request when behavior, setup, API contracts, socket events, or environment variables change.
6. Merge only after review approval and both required CI checks are green.

## Contract Ownership

| Contract | Owner | Consumers |
| --- | --- | --- |
| JWT payload `{ id, email, role, name }` | Backend foundation | Frontend, Socket.io, AI routes |
| API response envelope | Backend foundation | Frontend and tests |
| Meeting and action-item models | Backend foundation, then AI/productivity reviewer | Real-time, AI, dashboard, analytics |
| `meeting:*` socket events | Real-time and media | Frontend meeting room |
| AI insight response | AI and productivity | Post-meeting frontend and task conversion |
| Environment and deployment contract | Quality and operations | Every workstream |

## Handoff Rules

- The owner writes or updates the contract before dependent work is merged.
- Consumers review breaking contract changes.
- Database changes include compatibility or migration notes.
- Socket changes include authorization behavior and disconnect/reconnect behavior.
- Frontend screens must represent loading, empty, success, and failure states.
- Operations work begins against a tagged, tested application baseline.

## Recommended Pull Request Order

1. Current backend foundation and documentation into `develop`.
2. Backend integration tests and authenticated socket foundation.
3. Frontend authentication and API client.
4. Meeting lifecycle, signaling, and room UI.
5. Recording, transcription, and AI review workflow.
6. Workspace, task, dashboard, and analytics modules.
7. Deployment, monitoring, load testing, and submission evidence.

Avoid assigning two people to the same source directory without a file-level agreement. Cross-cutting changes should be split by contract first, then by implementation.
