# Contributing to IntellMeet

This guide defines how the team assigns work, changes contracts, and moves code into shared branches.

## Before Starting

1. Read the [project status](docs/PROJECT_STATUS.md) and [implementation plan](docs/IMPLEMENTATION_PLAN.md).
2. Confirm ownership in [Team Ownership](docs/TEAM_OWNERSHIP.md). Record the assignee before implementation begins.
3. Complete the [Local Setup](docs/LOCAL_SETUP.md), including MongoDB and `backend/.env`.
4. Pull the latest `develop` branch and create one focused branch.
5. Copy the relevant `.env.example`; never share or commit real credentials.

## Branches

`main` contains release-ready code. `develop` is the integration branch. Feature work must use a short-lived branch:

```text
feature/webrtc-meeting-room
feature/team-workspaces
fix/socket-authorization
test/auth-integration
docs/deployment-guide
```

```bash
git checkout develop
git pull origin develop
git checkout -b feature/short-description
```

Do not push directly to `main` or `develop`, force-push a shared branch, or merge your own pull request.

## Development Standards

- Keep changes within the module named in the issue or ownership table.
- Preserve the existing API prefix and response shape unless the contract change is agreed first.
- Validate all external input and enforce authorization server-side.
- Add tests for new behavior and regressions. Do not rely only on manual verification.
- Update the relevant documentation in the same pull request.
- Use meaningful names and comments only where the reason is not evident from the code.
- Do not commit `.env`, keys, tokens, recordings, database dumps, `node_modules`, or build output.

The backend uses JavaScript ES modules. The frontend uses TypeScript. New backend files should not reintroduce TypeScript unless the team approves a complete migration.

## Commit Messages

Use a conventional type and an imperative summary:

```text
feat: add authenticated WebRTC signaling
fix: restrict meeting chat to participants
test: cover refresh token rejection
docs: document Atlas database setup
chore: add local service container
```

Prefer small commits that leave the affected package in a runnable state.

## Required Checks

Every pull request runs the backend and frontend workflows, even when a change appears to affect only one package. A pull request must not be approved, accepted, or merged unless both required checks are green on the latest commit:

- `Backend CI / Backend quality`
- `Frontend CI / Frontend quality`

Pending, skipped, cancelled, or failing checks do not count as passed. Review approval never overrides CI. See [CI and Branch Protection](docs/CI_AND_BRANCH_PROTECTION.md) for the repository rules that enforce this policy.

Backend:

```bash
cd backend
npm ci
npm run lint
npm test
npm run build
```

Frontend:

```bash
cd frontend
npm ci
npm run lint
npm run build
```

When a change affects an endpoint, socket event, database model, or environment variable, update the corresponding file in `docs/`.

## Pull Requests

Open feature pull requests against `develop`. A pull request should contain:

```markdown
## Summary
What changed and why.

## Scope
- Included behavior
- Explicitly excluded behavior

## Verification
- Commands run
- Manual scenarios checked

## Contract or data changes
Endpoints, events, models, migrations, or environment variables. Write "None" when applicable.

## Evidence
Screenshots, API output, or logs relevant to the change.

## Follow-up
Known limitations or linked tasks.
```

The reviewer checks correctness, access control, validation, failure behavior, test coverage, compatibility, and documentation. Resolve review threads before merge.

## Shared Contracts

Coordinate before changing JWT payloads, database schemas, API response envelopes, socket events, environment variable names, package manifests, CI workflows, or deployment configuration. Breaking changes require a migration note and updates to both producers and consumers.

## Definition of Done

A task is complete when:

- Its acceptance criteria are demonstrably met.
- Relevant lint, build, and test commands pass.
- Authorization and validation paths are covered.
- Documentation and environment examples are current.
- No secrets, debug artifacts, or unrelated changes are included.
- A reviewer other than the author approves the pull request.
- Both required GitHub Actions checks pass on the latest commit.

Only the project lead merges into `develop` and promotes a tested integration build to `main`.
