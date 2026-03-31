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
- Provide bootstrap prompt templates for local AI agents
- Document agent-driven and user-driven setup approaches
- Guide iterative, multi-session stage work

### Key Principle

The framework operates across three types of location. A workspace organizes
them under a single root directory. Getting these right at the start prevents
confusion and rework later.

### How to Use This Guide

1. [**Prerequisites**](#prerequisites) — confirm you have what you need
2. [**Working Locations**](#working-locations) — understand the location model
3. [**Project Config File**](#project-config-file) — set up your project.md
4. [**Bootstrap Prompt Template**](#bootstrap-prompt-template) — choose
   agent-driven or user-driven setup

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
│   └── v0.42.0/                   ← framework release (read-only)
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

### AGENTS.md

`AGENTS.md` is a tool-agnostic instructions file at the workspace root. It tells
agents where to find the framework, the project index, and the source code. The
bootstrap prompt also creates an agent-specific startup file (e.g., `CLAUDE.md`
for Claude Code, `.cursorrules` for Cursor) that references `AGENTS.md`.

In future sessions, the agent reads its startup file automatically, which points
it to `AGENTS.md` for workspace context.

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

### Example

A solo project within the standard workspace structure:

```markdown
# Project: Onboarding Tracker

## Locations

- Framework: ../../frameworks/v0.42.0
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

> **Multi-repo projects** require a different workspace layout. Guidance is
> forthcoming — for now, add multiple entries under Source code in `project.md`.

---

## Bootstrap Prompt Template

The [Quick Start](../QUICKSTART.md) prompt handles most new projects. For more
control, choose one of these approaches. Both produce the same result: a
workspace with `AGENTS.md`, a project index, and a first project directory.

### Agent-Driven Setup

Let the agent interview you and create the workspace. Best when you're new to
the framework or unsure about directory structure.

1. Open your local agent in a terminal
2. Give the agent a minimal bootstrap prompt:

```
Read [framework-path]/guides/bootstrap.md and orient yourself in the
AI-Assisted SDLC framework.

I want to start a new, single-repo project. Help me set up a workspace with
the project structure, AGENTS.md, and your agent-specific startup file. Then
guide me through the Initiation stage.
```

3. The agent reads the framework, asks about your project, creates the workspace
   structure (AGENTS.md, project index, project directory, artifact folders),
   and begins Initiation

> **What the agent will ask about:** Your project name and description, whether
> a source code directory exists yet (greenfield projects may create it later
> during System Design), and your project's risk tier and team size.

### User-Driven Setup

Set up the workspace yourself before engaging the agent. Best when you have
clear preferences or are adding a second project to an existing workspace.

1. Create the workspace structure:
   ```
   my-app/
   ├── AGENTS.md
   ├── frameworks/
   │   └── v0.42.0/             ← download framework releases here
   ├── projects/
   │   ├── index.md
   │   └── my-first-project/
   │       ├── project.md
   │       └── docs/
   │           ├── briefs/
   │           ├── adr/
   │           └── session-logs/
   └── src/
   ```
2. Fill in `AGENTS.md`, `projects/index.md`, and `project.md` using the formats
   in this guide
3. Start the agent in the workspace root:

```
Read AGENTS.md and orient yourself. Guide me through the Initiation stage
for [project name].
```

---

## Resuming Work

When returning to an existing project, start your agent in the workspace root.
If your agent auto-loads its startup file (e.g., Claude Code reads `CLAUDE.md`
on startup), it finds `AGENTS.md` automatically and you can simply say:

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

---

## AI-Led Bootstrap

For teams operating at the AI-Led autonomy tier, add autonomy and oversight
preferences to the bootstrap prompt:

```
Read AGENTS.md and the framework's guides/agentic-workflow.md.

Work through the [STAGE NAME] stage for [project name] at AI-Led autonomy
with [Active / Passive / Minimal] oversight. Drive the stage activities
autonomously. Flag assumptions, pause at gates for my review, and
maintain a session log.
```

The agent reads the workspace instructions and framework files, parses the
structured front matter for stage routing, and follows the fallback protocols
documented in the [Agentic Workflow Guide](agentic-workflow.md).

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
