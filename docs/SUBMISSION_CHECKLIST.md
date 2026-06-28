# Submission Checklist

This checklist translates the assignment brief into verifiable repository and release artifacts. Check an item only when evidence exists.

## Repository Quality

- [ ] `main` contains only reviewed, release-ready code.
- [ ] Every feature reached `develop` through a pull request.
- [ ] Backend and frontend lint, tests, and builds pass in CI.
- [ ] `.gitignore` excludes secrets, dependencies, builds, recordings, and local artifacts.
- [ ] No credentials or private keys exist in Git history.
- [ ] README setup works on a clean machine.
- [ ] API, socket, environment, architecture, and ownership docs match the release.
- [ ] License and third-party asset attribution requirements have been reviewed.

## Functional Evidence

- [ ] Authentication and profile workflows are demonstrated.
- [ ] At least two real users can join the same meeting session.
- [ ] Video, audio, chat, screen sharing, presence, and recording are demonstrated where claimed.
- [ ] Transcript, summary, and action-item workflows are demonstrated.
- [ ] Post-meeting history and export workflows are demonstrated.
- [ ] Workspace, project, task, and analytics workflows are demonstrated where claimed.
- [ ] Mobile and tablet layouts are tested.
- [ ] A demo account or no-sign-up path is available to evaluators.

## Security and Reliability Evidence

- [ ] HTTP and socket authorization tests pass.
- [ ] Input validation, rate limiting, and error behavior are documented.
- [ ] Refresh-token rotation and logout/revocation are implemented.
- [ ] Recording consent, access, retention, and deletion behavior are documented.
- [ ] Dependency, secret, and OWASP-oriented scans have been reviewed.
- [ ] Backup and restore have been tested.
- [ ] Health, readiness, logs, metrics, and error reporting are available in staging.

## Performance Evidence

- [ ] Lighthouse results are captured for key public and authenticated screens.
- [ ] API and socket load-test scripts are committed.
- [ ] Video participant limits are tested and architecture-appropriate.
- [ ] Latency, throughput, error rate, and resource usage are reported with test conditions.
- [ ] Unverified assignment targets are labeled as targets, not achieved results.

## Required Submission Package

- [ ] One A4 project report, 8-15 pages and below 10 MB.
- [ ] Public HTTPS demo URL with core functionality available.
- [ ] GitHub repository URL with clear folders and professional README.
- [ ] Three-to-seven-minute demo video link.
- [ ] Five-to-ten high-quality screenshots or GIFs.
- [ ] Architecture diagram.
- [ ] Execution timeline, technical highlights, challenges, deployment notes, and reflection.
- [ ] Final package follows the dashboard naming convention and stays below the stated size limit.

## Report Outline

1. Cover: IntellMeet, tagline, author, date, and version.
2. Vision, target users, use cases, and business value.
3. Feature table with actual acceptance status.
4. Technology choices and alternatives.
5. Architecture and data-flow diagram.
6. Execution timeline and team ownership.
7. Security, performance, scalability, and challenges.
8. Deployment, CI/CD, monitoring, and recovery.
9. Product screenshots and demo links.
10. Learnings and future roadmap.

The final report should distinguish implemented results, measured results, and future targets. That distinction makes the submission more credible and easier to evaluate.
