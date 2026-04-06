# Bootstrap Guide

## Overview

Step-by-step instructions for starting AI-assisted SDLC projects with a local
agent.

### Why a Bootstrap Guide

The [Quick Start](../QUICKSTART.md) gets you running with sensible defaults —
create a directory, start your agent, paste a prompt. This guide explains the
underlying model: working locations, project configuration, and setup options.
Use it when you need more control over project structure — custom directory
layouts or higher AI autonomy levels.

### Goals of This Guide

- Define the workspace structure and working locations model
- Explain the project config file, project index, and AGENTS.md
- Provide bootstrap prompts for single-repo and multi-repo projects
- Guide iterative, multi-session stage work

### Key Principle

The framework operates across three types of location. A workspace organizes
them under a single root directory. Getting these right at the start prevents
confusion and rework later.

### How to Use This Guide

1. [**Prerequisites**](#prerequisites) — confirm you have what you need
2. [**Working Locations**](#working-locations) — understand the location model
3. [**Project Config File**](#project-config-file) — set up your project.md
4. [**Bootstrap Prompts**](#bootstrap-prompts) — multi-repo setup prompt

---

## Prerequisites

Before starting a new project with the framework:

1. **A local agent with filesystem access** — Claude Code, Cursor, Cowork, or
   similar. The agent must be able to read files, create directories, and write
   artifacts.
2. **A local copy of the framework** — clone the repository or download a
   release. The agent reads framework files as reference material; it never
   modifies them.

---

## Working Locations

The framework uses three types of location:

| Location        | Per Project | Role                | Contents                                                          | Agent Access |
| --------------- | ----------- | ------------------- | ----------------------------------------------------------------- | ------------ |
| **Framework**   | Shared      | Read-only reference | Guides, stages, templates, checklists                             | Read only    |
| **Artifacts**   | 1           | Project governance  | `docs/briefs/`, `docs/adr/`, `docs/session-logs/`, gate decisions | Read + write |
| **Source code** | 1+          | Project codebase    | Application code, tests, CI/CD config                             | Read + write |

**Framework** releases are stored under `frameworks/` by version tag. Each
project's `project.md` specifies which version it uses. Agents must not modify
framework files — framework content is consumed as read-only reference material
at every stage.

**Artifacts** hold project governance records — briefs, gate decisions, session
logs, and success criteria. Each project has one artifacts location.

**Source code** is where the project's code lives. A single-repo project has one
source directory; multi-repo projects may span multiple repositories.

### Workspace Structure

A workspace organizes all three locations under a single root directory. The
[Quick Start](../QUICKSTART.md) prompt creates this structure automatically for
single-repo projects:

```
my-app/                            ← workspace root
├── AGENTS.md                      ← workspace instructions for AI agents
├── frameworks/
│   └── v<version>/                   ← framework release (read-only)
├── projects/
│   ├── index.md                   ← active and completed projects
│   └── onboarding-tracker/
│       ├── project.md             ← project config (locations + context)
│       └── docs/                  ← artifacts for this project
│           ├── briefs/
│           ├── adr/
│           └── session-logs/
└── src/                           ← application source code
```

Each project gets its own directory under `projects/` containing a `project.md`
config file and a `docs/` directory for artifacts. This keeps governance records
separate from source code, prevents artifacts from one project overwriting
another's, and makes each project self-contained.

### Multi-Repo Workspace

When a project spans multiple source code repositories, the governance files
live in their own git repository alongside the source repos:

```
~/work/                            ← common parent directory
├── my-project-governance/         ← governance git repo (agent starts here)
│   ├── AGENTS.md
│   ├── frameworks/
│   │   └── v<version>/               ← framework release (read-only)
│   └── projects/
│       ├── index.md
│       └── payment-migration/
│           ├── project.md
│           └── docs/
│               ├── briefs/
│               ├── adr/
│               └── session-logs/
├── payment-api/                   ← source git repo
└── checkout-frontend/             ← source git repo
```

The governance repo is a sibling to the source repos — no nested git
repositories, no `.gitignore` coordination. The agent starts in the governance
repo and navigates to source repos when needed (Implementation, Verification).

This layout assumes all repositories are siblings under a common parent
directory. `project.md` references source repos with relative paths (e.g.,
`../../../payment-api`).

### AGENTS.md

`AGENTS.md` is a tool-agnostic instructions file at the workspace root. It
orients agents to the workspace structure — where to find the framework, the
project index, and the source code. The bootstrap prompt also creates an
agent-specific startup file (e.g., `CLAUDE.md` for Claude Code, `.cursorrules`
for Cursor) that references `AGENTS.md`.

In future sessions, the agent reads its startup file automatically, which points
it to `AGENTS.md` for workspace context.

**Template — add this block to `AGENTS.md`:**

```markdown
## AI-Assisted SDLC Workspace

### Workspace Structure

- `frameworks/` — AI-Assisted SDLC framework releases (read-only)
- `projects/` — Project governance (briefs, ADRs, session logs)
- `src/` — Application source code

### Instructions

1. Read `projects/index.md` to see active projects
2. Ask which project to work on (or continue the most recent active project)
3. Read that project's `project.md` for locations, status, and context
4. Read the latest session log to pick up where the last session left off
5. Follow the framework stage guides for the current stage

### Framework Reference

The framework is under `frameworks/`. Each project's `project.md` specifies
which version it uses. Read stage guides and templates from there. Do not modify
framework files.
```

If `AGENTS.md` doesn't exist yet, create it with a top-level heading (e.g.,
`# My App`) and the block above. If it already exists (common in mid-stream
adoption), add the `## AI-Assisted SDLC Workspace` block to the existing file.
Existing content (coding conventions, tech stack, build commands) stays
untouched.

The agent should also create an agent-specific startup file (e.g., `CLAUDE.md`,
`.cursorrules`) that references `AGENTS.md`:

> All workspace instructions are in AGENTS.md. Read that file to orient
> yourself.

Adapt the Workspace Structure section to match the actual layout:

- **Source at root** (no `src/` directory) — replace `src/` with `.` or describe
  the root as the source location
- **Monorepos** — list the relevant packages or services instead of `src/`
- **Multi-repo** — replace `src/` with the source repo names and their locations
  relative to the governance repo

### Project Index

`projects/index.md` lists all projects in the workspace with their current
status. On startup, the agent reads this file and asks which project you're
working on.

```markdown
# Projects

## Active

- [onboarding-tracker](onboarding-tracker/project.md) — Web app for tracking
  employee onboarding tasks

## Completed

(none)
```

When a project finishes, move it from Active to Completed.

### Stage-Location Mapping

Each stage operates primarily from one location:

| Stage                       | Operating Location      | Notes                                                     |
| --------------------------- | ----------------------- | --------------------------------------------------------- |
| Initiation–Increment Design | Artifacts               | Read framework; write to artifacts                        |
| Implementation              | Source Code             | Read artifacts and framework; write code                  |
| Verification                | Source Code + Artifacts | Tests run in source code; verification brief in artifacts |
| Deployment                  | Artifacts               | References source code for build artifacts                |
| Support                     | Artifacts               | References deployed system                                |

When the agent needs to run code (tests, builds, linters), it should operate
from the source code directory. For all other stages, the agent reads and writes
from the artifacts location.

For artifact placement rules (which artifacts stay in the artifacts location vs.
publish to source code), ADR publishing protocol, and cross-location handoff,
see the [Framework Guide: Working Locations](framework.md#working-locations).

---

## Project Config File

A `project.md` file defines the locations and context for a project. The agent
reads this file to orient itself — replacing the need to paste a bootstrap
prompt each session.

### Format

All paths are relative to the `project.md` file's location.

```markdown
# Project: [name]

## Locations

- Framework: ../../frameworks/[version]
- Artifacts: ./docs
- Source code:
  - [relative path to source directory]

## Status

- Stage: [current stage, e.g., Initiation]
- State: [Active / Paused / Completed / Canceled]

## Context

- Description: [brief description of your project]
- Type: [greenfield / brownfield]
- Tech stack: [if known]
- Team size: [solo / small (2-5) / large (6+)]
- Risk tier: [Minimal / Standard / Enterprise]
```

### Single-Repo Example

A solo project within the standard workspace structure:

```markdown
# Project: Onboarding Tracker

## Locations

- Framework: ../../frameworks/v<version>
- Artifacts: ./docs
- Source code:
  - ../../src

## Status

- Stage: Initiation
- State: Active

## Context

- Description: Web application for tracking employee onboarding tasks.
- Type: greenfield
- Tech stack: To be determined
- Team size: small (3 engineers, 1 product manager)
- Risk tier: Standard
```

> **Greenfield projects:** Create the project directory and project.md first
> during Initiation. The source code directory (`src/`) may remain empty until
> the tech stack is decided during System Design. See the
> [Project Foundation Guide](project-foundation.md) for sequencing details.

> **Monorepos:** The single-repo model applies — list the specific packages or
> services the project targets under Source code rather than the repo root. The
> agent discovers which parts are relevant during Initiation and System Design.

### Multi-Repo Example

A project spanning two source repositories, with governance in a sibling repo:

```markdown
# Project: Payment Platform Migration

## Locations

- Framework: ../../frameworks/v<version>
- Artifacts: ./docs
- Source code:
  - ../../../payment-api
  - ../../../checkout-frontend

## Status

- Stage: Implementation
- State: Active

## Context

- Description: Migrate payment processing from legacy gateway to new provider.
- Type: brownfield
- Tech stack: Go (API), React (frontend), PostgreSQL
- Team size: large (8 engineers, 2 PMs)
- Risk tier: Enterprise
```

Source code paths use three levels of `../` because `project.md` is nested under
`governance-repo/projects/payment-migration/`, and the source repos are siblings
of the governance repo.

---

## Bootstrap Prompts

The [Quick Start](../QUICKSTART.md) covers single-repo projects (new and
mid-stream) with copy/paste prompts. This section provides the multi-repo
bootstrap prompt.

### Multi-Repo Project

1. **Create a new, empty folder** for the governance repo (e.g.,
   `my-project-governance/`) alongside your source repositories
2. **Start your agent** in that folder
3. **Paste this prompt:**

> Download the latest release of the AI-Assisted SDLC framework from
> https://github.com/jeffogata/ai-assisted-sdlc into ./frameworks/ using the
> version tag as the directory name (e.g., frameworks/v<version>/) if not already
> present.
>
> Then read QUICKSTART.md from the downloaded framework to orient yourself.
>
> This is a multi-repo project. Set up this directory as the governance
> workspace — create the project structure, AGENTS.md, and your agent-specific
> startup file (e.g., CLAUDE.md for Claude Code). The source code lives in
> sibling repositories alongside this directory. Interview me to find out which
> repos are involved and where they are. Then guide me through the first stage.
> Drive the process but check decisions with me.

The agent creates the workspace structure inside the governance directory, asks
which source repositories are involved, records their paths in `project.md`, and
walks you through [Initiation](../stages/initiation/README.md) interactively.

---

## Resuming Work

When returning to an existing project, start your agent in the workspace root
(or the governance repo for multi-repo projects). If your agent auto-loads its
startup file (e.g., Claude Code reads `CLAUDE.md` on startup), it finds
`AGENTS.md` automatically and you can simply say:

```
Continue working. Read the latest session log for context on where we left off.
```

The agent reads `AGENTS.md`, checks the project index, asks which project you're
working on (or continues the active one), reads the project's `project.md`, and
picks up where the last session ended.

If your agent doesn't auto-load a startup file, point it to `AGENTS.md`:

```
Read AGENTS.md and orient yourself. Continue working on [project name]. Read
the latest session log for context on where we left off.
```

To run a stage at higher autonomy, add preferences to your prompt:

```
Work through the [STAGE NAME] stage at AI-Led autonomy with
[Active / Passive / Minimal] oversight. Drive the stage activities
autonomously. Flag assumptions, pause at gates for my review, and
maintain a session log.
```

See the [Agentic Workflow Guide](agentic-workflow.md) for autonomy tiers, stage
routing, and fallback protocols.

---

## Progression Through Stages

After completing a stage, the agent follows the stage routing in the
[Agentic Workflow Guide](agentic-workflow.md) to determine the next stage. The
`project.md` file persists across stages, so the agent always knows where to
find the framework, artifacts, and source code.

For multi-session work within a stage, the agent maintains a session log using
the
[Session Continuity Protocol](agentic-workflow.md#session-continuity-protocol).

---

## Tips for Effective Agent Collaboration

1. **Be specific about your context** — the more details you provide in
   `project.md` and your prompts, the better the agent can tailor its guidance
2. **Challenge suggestions** — the agent may not know your constraints; push
   back when needed
3. **Iterate openly** — tell the agent when something isn't working and ask for
   alternatives
4. **Reference framework concepts** — use terms from the framework (e.g.,
   "MoSCoW prioritization," "acceptance criteria") to keep aligned
5. **Review at gates** — even at AI-Led autonomy, review artifacts at gate
   checkpoints before the agent proceeds
6. **Mind sensitive content in session logs** — session logs and briefs are
   checked into the repo by default. If the repo is public or broadly shared,
   avoid recording credentials, internal URLs, or confidential business details
   in artifacts

---

## When You Need Multiple Sessions

Expect multiple sessions per stage when:

- **Scope is unclear** — need to explore options before deciding
- **Stakeholder input needed** — must gather information between sessions
- **Complex decisions required** — need time to think through trade-offs
- **Work volume is large** — can't complete all activities in one sitting
- **New information emerges** — need to revise based on discoveries

This is normal and expected. The framework supports iterative work. Use session
logs to maintain continuity between sessions.

---

## Notes

**Last Updated:** 2026-03-30

Added to framework in v0.9.0. Reworked from Manual Process Guide in v0.42.0.
