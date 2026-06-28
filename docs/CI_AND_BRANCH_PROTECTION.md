# CI, Pull Request Gates, and Branch Protection

This repository uses GitHub Actions as the pull-request quality gate. The current automation is CI-focused: it installs dependencies, lints, tests where available, and verifies builds for both packages. Deployment automation should be added only after the team selects the production platform and secret-management approach.

## Required CI Checks

Every pull request targeting `develop` or `main` runs two independent workflows.

| Required check | Commands |
| --- | --- |
| `Backend CI / Backend quality` | `npm ci`, `npm run lint`, `npm test`, `npm run build` in `backend/` |
| `Frontend CI / Frontend quality` | `npm ci`, `npm run lint`, `npm run build` in `frontend/` |

Both workflows also run after a push to `develop` or `main` and can be started manually from the GitHub Actions page.

## Merge Policy

A pull request must not be approved, accepted, or merged while either required check is pending, skipped, cancelled, or failing. The author must fix the failure and push a new commit. Review approval does not override CI.

Only the project lead merges pull requests. Direct pushes and force pushes to shared branches are not allowed.

This rule applies even when the change appears to touch only documentation, backend code, or frontend code. Both checks protect the shared integration branch.

## One-Time GitHub Configuration

Workflow files run checks, but repository rules are what block a merge. A repository administrator must configure protection after the workflows have run at least once.

1. Open the GitHub repository.
2. Open **Settings**, then **Rules**, then **Rulesets**.
3. Create a branch ruleset named `Protect shared branches`.
4. Set the target branches to `develop` and `main`.
5. Enable **Require a pull request before merging**.
6. Require at least one approval and dismiss stale approvals after new commits.
7. Enable **Require status checks to pass**.
8. Add `Backend CI / Backend quality` and `Frontend CI / Frontend quality` as required checks.
9. Enable **Require branches to be up to date before merging**.
10. Enable conversation resolution before merging.
11. Block force pushes and branch deletion.
12. Do not allow bypass permission except for an emergency repository administrator account.
13. Save and activate the ruleset.

If the repository uses classic branch protection instead of rulesets, apply the same requirements separately to `develop` and `main` under **Settings**, **Branches**.

## Contributor Checklist

Before opening a pull request:

1. Pull the latest `develop`.
2. Run the backend commands locally.
3. Run the frontend commands locally.
4. Update documentation when behavior, setup, endpoints, events, or ownership changes.
5. Confirm `git status` does not include `.env`, `node_modules`, build output, recordings, database dumps, or local exports.

After opening a pull request:

1. Wait for `Backend CI / Backend quality`.
2. Wait for `Frontend CI / Frontend quality`.
3. Fix any red, grey, skipped, cancelled, or pending check before requesting final approval.
4. Do not ask for merge until both checks are green on the latest commit.

## Reading a CI Result

- Green check: the job completed successfully.
- Red cross: open the job, find the first failed step, fix it locally, and push the correction.
- Yellow dot: the job is still running; do not merge.
- Grey or skipped check: treat it as not passed and investigate the workflow trigger.

## Local Check Before Push

Run the same commands that CI uses:

```bash
cd backend
npm ci
npm run lint
npm test
npm run build

cd ../frontend
npm ci
npm run lint
npm run build
```

The backend test command currently discovers no automated test files. Adding route, database, and socket tests remains a priority in the implementation plan; a successful empty test run must not be presented as coverage.
