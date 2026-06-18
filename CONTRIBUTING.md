# CONTRIBUTING.md

# Contributing to IntellMeet

Thank you for contributing to IntellMeet.

This document defines the official development workflow, branch strategy, pull request process, repository structure, ownership rules, and collaboration standards.

Every contributor must follow this document before making any code changes.

---

# Repository Governance

## Project Lead

The Project Lead is responsible for:

* Repository configuration
* Branch protection
* Pull Request reviews
* Merge approvals
* Release management
* Production deployment

Only the Project Lead may merge code into:

```text
develop
main
```

Contributors must never merge their own Pull Requests.

---

# Branch Strategy

The repository follows a Git Flow inspired workflow.

## Permanent Branches

```text
main
develop
```

### main

Production-ready code only.

Rules:

* No direct commits
* No direct pushes
* Merge only from develop

---

### develop

Integration branch.

Rules:

* Feature branches merge here
* Testing occurs here
* Only Project Lead merges PRs

---

# Feature Branch Naming

Every task must have its own branch.

Format:

```text
feature/<feature-name>
```

Examples:

```text
feature/authentication
feature/dashboard-ui
feature/meeting-room
feature/chat-module
feature/ai-summary
feature/task-management
feature/analytics
```

Bug fixes:

```text
fix/socket-connection
fix/login-validation
```

Documentation:

```text
docs/api-documentation
docs/readme-update
```

---

# First Time Setup

Clone repository:

```bash
git clone <repo-url>
```

Move into repository:

```bash
cd intellmeet
```

Checkout develop:

```bash
git checkout develop
```

Pull latest code:

```bash
git pull origin develop
```

---

# Creating a Feature Branch

Never work directly on develop.

Create your own branch:

```bash
git checkout develop

git pull origin develop

git checkout -b feature/chat-module
```

Example:

```bash
git checkout -b feature/authentication
```

---

# Daily Development Workflow

Before starting work every day:

```bash
git checkout develop

git pull origin develop
```

Update your feature branch:

```bash
git checkout feature/chat-module

git merge develop
```

Resolve conflicts if any.

Then continue development.

---

# Commit Rules

Every commit must be meaningful.

## Allowed

```text
feat: add login endpoint
feat: create dashboard layout
fix: resolve websocket disconnect issue
refactor: optimize auth middleware
docs: update api documentation
test: add auth test cases
```

## Not Allowed

```text
update
done
latest
work
new
final
```

---

# Pull Request Process

After completing work:

```bash
git add .

git commit -m "feat: implement chat module"

git push origin feature/chat-module
```

Create Pull Request:

```text
feature/chat-module
        ↓
develop
```

PR title example:

```text
feat: implement real-time chat module
```

---

# Pull Request Requirements

Before creating PR ensure:

* Project builds successfully
* No TypeScript errors
* No ESLint errors
* No console warnings
* No unnecessary files
* Documentation updated if needed

---

# Pull Request Template

Include:

## Summary

Describe what was implemented.

## Changes

* Added feature X
* Added API Y
* Updated component Z

## Testing

* Tested locally
* Screenshots attached

---

# Code Review Process

The Project Lead reviews:

* Folder structure
* Code quality
* Naming conventions
* Performance
* Security concerns

Review outcomes:

```text
Approved
Changes Requested
Rejected
```

---

# Merge Policy

Only Project Lead may merge.

Flow:

```text
feature/*
      ↓
Pull Request
      ↓
Review
      ↓
develop
      ↓
Testing
      ↓
main
```

Contributors are NOT allowed to:

* Merge into develop
* Merge into main
* Force push shared branches

---

# Repository Structure

## Root Structure

```text
intellmeet/

├── frontend/
├── backend/
├── docs/

├── README.md
├── CONTRIBUTING.md
├── .env.example
├── .gitignore
```

---

# Frontend Structure

```text
frontend/src

├── assets/
├── components/
│
├── pages/
│
├── hooks/
│
├── services/
│
├── routes/
│
├── store/
│
├── types/
│
├── App.tsx
└── main.tsx
```

---

# Component Structure

Each component must have its own folder.

Example:

```text
components/

Navbar/
├── Navbar.tsx
├── Navbar.types.ts
└── index.ts

ChatBox/
├── ChatBox.tsx
├── ChatBox.types.ts
└── index.ts
```

---

# Backend Structure

```text
backend/src

├── config/
├── controllers/
├── middleware/
├── models/
├── routes/
├── services/
├── sockets/
├── ai/
├── validations/
├── utils/
└── server.ts
```

---

# Ownership Matrix

## Member 1

Authentication

Branch:

```text
feature/authentication
```

Ownership:

* User Model
* Login
* Register
* JWT
* Profile

---

## Member 2

Frontend

Branch:

```text
feature/frontend-core
```

Ownership:

* Layout
* Navbar
* Dashboard
* Routing

---

## Member 3

Real-Time

Branch:

```text
feature/realtime
```

Ownership:

* Socket.io
* Chat
* Meeting Room
* Notifications
* WebRTC

---

## Member 4

AI & Productivity

Branch:

```text
feature/ai
```

Ownership:

* AI Summary
* Action Items
* Tasks
* Analytics

---

# Protected Files

Only Project Lead may modify:

```text
package.json
vite.config.ts
tsconfig.json
docker-compose.yml
github workflows
deployment files
```

without discussion.

---

# Prohibited Actions

Never:

* Push directly to main
* Push directly to develop
* Commit .env
* Commit API keys
* Delete another member's code
* Force push shared branches

---

# Development Lifecycle

```text
Repository Setup
        ↓
Feature Branch Creation
        ↓
Development
        ↓
Commit
        ↓
Push
        ↓
Pull Request
        ↓
Code Review
        ↓
Merge into Develop
        ↓
Testing
        ↓
Merge into Main
        ↓
Release
```

Following this workflow is mandatory for all contributors.
