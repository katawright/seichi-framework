# Bootstrap Guide

> **New here?** See [Framework Overview](OVERVIEW.md#bootstrap-guide) for what
> this guide is, why it exists, and how to use it. This file is the operational
> reference.

## Key Principle

The framework operates across three types of location. A workspace organizes
them under a single root directory. Getting these right at the start prevents
confusion and rework later.

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

| Location        | Per Project | Role                | Contents                                                                                   | Agent Access |
| --------------- | ----------- | ------------------- | ------------------------------------------------------------------------------------------ | ------------ |
| **Framework**   | Shared      | Read-only reference | Guides, spec, stages, templates, checklists                                                | Read only    |
| **Artifacts**   | 1           | Project governance  | `docs/briefs/`, `docs/adr/`, `docs/session-logs/`, gate decisions, workspace `adrs/` canon | Read + write |
| **Source code** | 1+          | Project codebase    | Application code, tests, CI/CD config                                                      | Read + write |

**Framework** releases are stored under `frameworks/` by version tag. Each
project's `project.md` specifies which version it uses. Agents must not modify
framework files — framework content is consumed as read-only reference material
at every stage.

> **Session-start guard:** At the start of every session, confirm you are
> operating from an artifacts or source-code location — never the read-only
> framework directory. If launched from the framework location, stop and
> redirect to the project workspace. See
> [Session Protocol: At Session Start](session-protocol.md#at-session-start).

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
├── adrs/                          ← accepted ADRs (canon; created at first promotion)
├── frameworks/
│   └── v<version>/                   ← framework release (read-only)
├── projects/
│   ├── index.md                   ← active and closed projects
│   └── onboarding-tracker/
│       ├── project.md             ← project config (locations + context)
│       └── docs/                  ← artifacts for this project
│           ├── briefs/
│           ├── adr/               ← draft ADRs (pre-Gate 2)
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
│   ├── adrs/                      ← accepted ADRs (canon; created at first promotion)
│   ├── frameworks/
│   │   └── v<version>/               ← framework release (read-only)
│   └── projects/
│       ├── index.md
│       └── payment-migration/
│           ├── project.md
│           └── docs/
│               ├── briefs/
│               ├── adr/           ← draft ADRs (pre-Gate 2)
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

### Portfolio Workspace (Many Projects, Shared App Repos)

A product with several apps, where different projects span different — often
overlapping — subsets of those apps, is just the multi-repo layout with **more
than one project** under `projects/`. No new structure is needed: one governance
repo holds many projects, and each project's `project.md` pins only the app
repos that project touches.

```
~/work/                            ← common parent directory
├── acme-governance/               ← governance git repo (agent starts here)
│   ├── AGENTS.md
│   ├── adrs/                      ← accepted ADRs (canon; created at first promotion; project-scoped ids)
│   ├── frameworks/
│   │   └── v<version>/               ← framework release (read-only)
│   └── projects/
│       ├── index.md
│       ├── checkout-redesign/     ← spans web-store + payments-api
│       │   ├── project.md
│       │   └── docs/
│       ├── loyalty-program/       ← spans web-store + mobile-app + payments-api
│       │   ├── project.md
│       │   └── docs/
│       └── fraud-rules-engine/    ← spans payments-api only
│           ├── project.md
│           └── docs/
├── web-store/                     ← source git repo
├── mobile-app/                    ← source git repo
└── payments-api/                  ← source git repo
```

Each project's `project.md` lists its own Source code subset:

- `checkout-redesign` → `../../../web-store`, `../../../payments-api`
- `loyalty-program` → `../../../web-store`, `../../../mobile-app`,
  `../../../payments-api`
- `fraud-rules-engine` → `../../../payments-api`

The subsets overlap freely: `payments-api` appears in all three projects,
`web-store` in two, `mobile-app` in one. They don't conflict because each
`project.md` declares its own binding.

**The load-bearing rule:** governance binds to source **by relative path in
`project.md`, per project** — so `projects/` is never tied to a single app's
`src/`. The colocated single-repo layout (`projects/`, `frameworks/`, and `src/`
as siblings) is simply the convenience default for the one-app case; the
portfolio layout is the same model with the binding made explicit per project.

The flat, sequential `projects/index.md` (`0001`, `0002`, …) needs no per-app
grouping at product scale — each entry's one-line description names the apps it
spans, and the project number still scopes that project's promoted ADR ids. To
add another project to a portfolio workspace, follow
[Adding a New Project to an Existing Workspace](../QUICKSTART.md#adding-a-new-project-to-an-existing-workspace)
— the procedure is identical to any multi-project workspace.

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
## Seichi Framework Workspace

### Workspace Structure

- `adrs/` — Accepted ADRs (workspace canon; created at first Gate 2 promotion)
- `frameworks/` — Seichi Framework releases (read-only)
- `projects/` — Project governance (briefs, draft ADRs, session logs)
- `src/` — Application source code

### Instructions

1. Read `projects/index.md` to see active projects
2. Ask which project to work on (or continue the most recent active project). If
   the user wants to start a new project, see "Adding a New Project to an
   Existing Workspace" in the framework's `QUICKSTART.md`.
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
adoption), add the `## Seichi Framework Workspace` block to the existing file.
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

### Framework Version Coexistence

Multiple framework versions can coexist in `frameworks/`. Each version lives in
its own directory (e.g., `frameworks/v0.42.0/`, `frameworks/v0.44.0/`). Each
project pins its framework version in its `project.md` via the `Framework`
location field, so projects can use different versions simultaneously without
interfering with each other.

Upgrading the workspace's latest framework version is additive — adding
`frameworks/v0.45.0/` alongside `frameworks/v0.44.0/` never breaks existing
projects. Ongoing projects keep reading their pinned version until the team
decides to upgrade by editing the `Framework` field in their `project.md`.

**Cleaning up old versions.** When a project is completed and no other project
references its pinned framework version, that version directory can be deleted
to reduce clutter. A version directory should only be removed when:

- no active project references it in its `project.md`, and
- no completed project needs to be revisited with that version's conventions
  (for compliance, audit, or historical review).

If in doubt, leave the old version in place — framework releases are small and
keeping them costs almost nothing.

### Project Index

`projects/index.md` lists all projects in the workspace with their current
status. On startup, the agent reads this file and asks which project you're
working on.

```markdown
# Projects

## Active

- 0001 [onboarding-tracker](onboarding-tracker/project.md) — Web app for
  tracking employee onboarding tasks

## Closed

(none)
```

Each project gets the next sequential number when its index entry is created
(`0001`, `0002`, …). The number is the project's stable id: it scopes promoted
ADR ids (see [Framework Guide: ADR Publishing](framework.md#adr-publishing)) and
must never change or be reused, even after the project leaves Active. This is
the manual fallback convention — workspace tooling that assigns project ids
supersedes it.

When a project reaches a terminal state (`closed` or `canceled` — see the
[Canonical-State Spec § Project Lifecycle](../spec/canonical-state.md#project-lifecycle)),
move it from Active to Closed (keeping its number); its `project.md` State line
records which terminal and why.

### Stage-Location Mapping

Each stage operates primarily from one location:

| Stage                       | Operating Location      | Notes                                                     |
| --------------------------- | ----------------------- | --------------------------------------------------------- |
| Initiation–Increment Design | Artifacts               | Read framework; write to artifacts                        |
| Implementation              | Source Code             | Read artifacts and framework; write code                  |
| Verification                | Source Code + Artifacts | Tests run in source code; verification brief in artifacts |
| Deployment                  | Artifacts               | References source code for build artifacts                |
| Closure                     | Artifacts               | References deployed system; project close-out             |

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
- State: [active / paused / completion-claimed / completion-verified / closed /
  canceled]
- State reason: [when the state requires one — e.g., blocked, accepted]

## Context

- Description: [brief description of your project]
- Type: [greenfield / brownfield]
- Tech stack: [if known]
- Stakeholder reach: [solo / within-team / cross-team / cross-org]
- Tier: [Minimal / Standard / Enterprise]
```

The State line renders the normative project lifecycle — six states, two
absorbing terminals (`closed`, `canceled`), with a reason required on `paused`,
`completion-verified`, and both terminals. See the
[Canonical-State Spec § Project Lifecycle](../spec/canonical-state.md#project-lifecycle)
for the transition set and reason codes.

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
- State: active

## Context

- Description: Web application for tracking employee onboarding tasks.
- Type: greenfield
- Tech stack: To be determined
- Stakeholder reach: within-team
- Tier: Standard
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
- State: active

## Context

- Description: Migrate payment processing from legacy gateway to new provider.
- Type: brownfield
- Tech stack: Go (API), React (frontend), PostgreSQL
- Stakeholder reach: cross-team
- Tier: Enterprise
```

Source code paths use three levels of `../` because `project.md` is nested under
`governance-repo/projects/payment-migration/`, and the source repos are siblings
of the governance repo.

---

## Bootstrap Prompts

The [Quick Start](../QUICKSTART.md) covers single-repo projects (idea-only, new,
mid-stream, and add-a-project) with copy/paste prompts. This section provides
the multi-repo bootstrap prompt.

### Multi-Repo Project

1. **Create a new, empty folder** for the governance repo (e.g.,
   `my-project-governance/`) alongside your source repositories
2. **Start your agent** in that folder
3. **Paste this prompt:**

> Download the latest release of the Seichi Framework from
> https://github.com/katawright/seichi-framework into ./frameworks/ using the
> version tag as the directory name (e.g., `frameworks/v<version>/`) if not
> already present.
>
> Then read QUICKSTART.md from the downloaded framework to orient yourself.
>
> This is a multi-repo project. Set up this directory as the governance
> workspace — create the project structure, AGENTS.md, and your agent-specific
> startup file (e.g., CLAUDE.md for Claude Code). The source code lives in
> sibling repositories alongside this directory. Interview me to find out which
> repos are involved and where they are. Then guide me through the first stage.
> Infer project classifications (tier, project type, deployment intent,
> operating posture, executor read path) from our conversation and present them
> as overridable assumptions instead of asking me to choose. Drive the process
> but check decisions with me.

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
Work through the [STAGE NAME] stage at a [Checkpointed / Lights-Out]
operating posture. Drive the stage activities autonomously. Flag
assumptions, pause at gates for my review, and maintain a session log.
```

See the [Agentic Workflow Guide](agentic-workflow.md) for operating postures,
stage routing, and fallback protocols.

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
5. **Review at gates** — even at agent-driven autonomy, review artifacts at gate
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

**Last Updated:** 2026-07-18

Added to framework in v0.9.0.
