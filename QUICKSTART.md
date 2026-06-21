# Quick Start

Get from zero to your first stage in under five minutes.

---

## The Framework in 30 Seconds

The framework overlays your existing software development process — agile,
waterfall, or hybrid — with structured AI assistance at every stage. You choose
how the work is run — from humans driving with agents assisting to agents
running unattended — and checkpoints keep humans in control of key decisions.

Eight stages cover the full lifecycle:

- **Foundational** (once per project): Initiation → Requirements → System Design
- **Iterative** (per increment): Increment Design → Implementation →
  Verification → Deployment
- **Terminal** (project end): Closure — then the standing system is run by the
  [Operations](guides/operations.md) process, and small in-place changes run as
  [Flow](guides/stages.md#flow-delivery-mode) items

Scale the process to fit your project: **Minimal** (MVPs, prototypes),
**Standard** (production apps), or **Enterprise** (regulated, mission-critical).
See the [Right-Sizing Guide](guides/right-sizing.md).

---

## Get Started

### I Only Have an Idea

No project name, no description, no plan — just "I have an idea for X." That is
enough to start.

**Prerequisites:** A local agent with filesystem access (Claude Code, Cursor,
Cowork, or similar).

1. **Create a new, empty folder** for your project (e.g., `my-idea/`)
2. **Start your agent** in that folder
3. **Paste this prompt:**

> Download the latest release of the AI-Assisted SDLC framework from
> https://github.com/jeffogata/ai-assisted-sdlc into ./frameworks/ using the
> version tag as the directory name (e.g., `frameworks/v<version>/`) if not
> already present.
>
> Then read QUICKSTART.md from the downloaded framework to orient yourself.
>
> I only have an idea — I'll describe it, and I want you to interview me about
> it before any setup: who has the problem, what it costs today, what better
> would look like, and what would have to be true for it to be worth building.
> Follow the framework's idea-formation entry path (Initiation: "Arriving with
> Only an Idea"). Don't ask me to pick framework tiers or classifications —
> infer them from our conversation and present them as overridable assumptions.
> Once we have a candidate problem statement, a target user, and the riskiest
> assumptions, set up the workspace, seed the Initiation Brief with what we
> found, and guide me through the rest of Initiation.
>
> My idea: [describe it in a sentence or two — rough is fine]

The agent downloads the framework, interviews you from the idea to
Initiation-ready inputs — no workspace ceremony first — then creates the
workspace and seeds the [Initiation](stages/initiation/README.md) Brief with the
interview output. See
[Initiation: Arriving with Only an Idea](stages/initiation/README.md#arriving-with-only-an-idea)
for what the interview extracts and when it is done, and the
[Solo Worked Example](guides/worked-example-solo.md) for what the whole path
looks like completed.

### New Project

You have a formed project in mind — a name and a one-line description.

**Prerequisites:** A local agent with filesystem access (Claude Code, Cursor,
Cowork, or similar).

1. **Create a new, empty folder** for your application (e.g., `my-app/`)
2. **Start your agent** in that folder
3. **Paste this prompt:**

> Download the latest release of the AI-Assisted SDLC framework from
> https://github.com/jeffogata/ai-assisted-sdlc into ./frameworks/ using the
> version tag as the directory name (e.g., `frameworks/v<version>/`) if not
> already present.
>
> Then read QUICKSTART.md from the downloaded framework to orient yourself.
>
> This is a new, single-repo project. Set up this directory as my workspace —
> create the project structure, AGENTS.md, and your agent-specific startup file
> (e.g., CLAUDE.md for Claude Code). Then guide me through the first stage.
> Infer project classifications (tier, project type, deployment intent,
> operating posture) from our conversation and present them as overridable
> assumptions instead of asking me to choose. Drive the process but check
> decisions with me.

The agent downloads the framework, creates your workspace, and walks you through
[Initiation](stages/initiation/README.md) interactively — starting with your
project name and description, then exploring your problem, goals, and
constraints.

**Workspace structure the agent creates:**

```
my-app/
├── AGENTS.md              ← workspace instructions for AI agents
├── frameworks/
│   └── v<version>/           ← framework release (read-only)
├── projects/
│   ├── index.md           ← active and completed projects
│   └── my-first-project/
│       ├── project.md     ← project config (locations + context)
│       └── docs/
│           ├── briefs/
│           ├── adr/
│           └── session-logs/
└── src/                   ← application source code
```

> **Not shown:** a top-level `adrs/` directory — the workspace ADR canon — is
> added at the first Gate 2 promotion, not during scaffolding. See
> [ADR Publishing](guides/framework.md#adr-publishing).

`AGENTS.md` tells the agent where to find the framework, project index, and
source code — see the [Bootstrap Guide](guides/bootstrap.md#agentsmd) for the
template. The agent also creates its own startup file (e.g., `CLAUDE.md` for
Claude Code) that references `AGENTS.md`, so it re-orients automatically in
future sessions. On startup, the agent reads `projects/index.md` and asks which
project you're working on.

> **Want more control over the setup?** The
> [Bootstrap Guide](guides/bootstrap.md) explains the underlying location model,
> the AGENTS.md template, and offers the multi-repo bootstrap prompt.

### Joining a Project Mid-Stream

If you're adopting the framework on a project already in progress:

1. **Start your agent** in the project's root directory (where `AGENTS.md`
   lives, if one exists)
2. **Paste this prompt:**

> Download the latest release of the AI-Assisted SDLC framework from
> https://github.com/jeffogata/ai-assisted-sdlc into ./frameworks/ using the
> version tag as the directory name (e.g., `frameworks/v<version>/`) if not
> already present.
>
> Then read QUICKSTART.md from the downloaded framework to orient yourself.
>
> This is an existing project that I want to bring under the AI-Assisted SDLC
> framework. Set up the workspace structure (frameworks/, projects/, and your
> agent-specific startup file) alongside the existing codebase. If an AGENTS.md
> already exists, augment it with workspace instructions rather than overwriting
> it; otherwise create one. Then interview me to understand the project — what
> we've built, where we are in the development lifecycle, and what decisions
> have already been made. Create lightweight retroactive artifacts for completed
> stages based on our conversation, then guide me forward from the current
> stage. Infer project classifications (tier, project type, deployment intent,
> operating posture) from our conversation and present them as overridable
> assumptions instead of asking me to choose. Drive the process but check
> decisions with me.

The agent sets up the governance layer alongside your existing code, interviews
you to determine which [stages](guides/stages.md) are already complete, creates
thin retroactive artifacts (briefs summarizing decisions already made — not full
stage outputs), and picks up the framework at your current stage.

**Workspace structure the agent creates (project with `src/` directory):**

```
my-existing-app/               ← project root = workspace root
├── AGENTS.md                  ← augmented with workspace instructions
├── frameworks/
│   └── v<version>/               ← framework release (read-only)
├── projects/
│   ├── index.md               ← active and completed projects
│   └── my-first-project/
│       ├── project.md         ← source code: ../../src
│       └── docs/
│           ├── briefs/
│           ├── adr/
│           └── session-logs/
├── src/                       ← existing source code
├── package.json               ← existing project files
└── ...
```

**Workspace structure (source files at project root, no `src/` directory):**

```
my-existing-app/               ← project root = workspace root = source code
├── AGENTS.md                  ← augmented with workspace instructions
├── frameworks/
│   └── v<version>/               ← framework release (read-only)
├── projects/
│   ├── index.md               ← active and completed projects
│   └── my-first-project/
│       ├── project.md         ← source code: ../..
│       └── docs/
│           ├── briefs/
│           ├── adr/
│           └── session-logs/
├── app.py                     ← existing source files at root
├── requirements.txt           ← existing project files
└── ...
```

In both cases, the existing codebase is untouched — the agent only adds
`frameworks/` and `projects/` alongside it.

> **Key insight:** You don't need to go back and formally complete every prior
> stage. The agent creates lightweight retroactive artifacts — enough context
> for the current stage's inputs to be understood — then follows the framework
> forward.

> **Joining to operate an already-deployed system?** Start at the
> [Operations Guide](guides/operations.md). If you are taking over from a
> project that just closed, the
> [Closure handoff record](stages/closure/README.md#the-operational-envelope-handoff-record)
> is what you operate against.

> **Joining in a specific role?**
>
> | Role                            | Start here                                                                                               |
> | ------------------------------- | -------------------------------------------------------------------------------------------------------- |
> | Product Manager / BA            | [Initiation](stages/initiation/README.md)                                                                |
> | Architect / Engineer            | [System Design](stages/system-design/README.md) or [Increment Design](stages/increment-design/README.md) |
> | Project Manager / Delivery Lead | [Delivery Operating Guide](guides/delivery-operating-guide.md)                                           |
> | DevOps / Platform Engineer      | [DevOps Integration Guide](guides/devops-integration.md)                                                 |
> | QA / Test Engineer              | [Verification](stages/verification/README.md)                                                            |
> | Executive / Leadership          | [README: Business Value](README.md#business-value)                                                       |
> | Operations / Production owner   | [Operations Guide](guides/operations.md)                                                                 |

### Adding a New Project to an Existing Workspace

You've set up a workspace before — it has `AGENTS.md` at the root, a
`frameworks/` directory with one or more framework versions, and a `projects/`
subtree with at least one project. Now you want to start a second project
alongside the existing ones: a new domain, a new experiment, or a clean slate
while an existing project stays in maintenance.

The framework is designed for this case. Each project pins its own framework
version in its `project.md`, and `projects/index.md` tracks all active and
completed projects. You don't need to reinitialize the workspace — just download
the latest framework release (if you don't already have it), add a new project
directory, and let the agent guide you through the first stage.

**Prerequisites:** A local agent with filesystem access and an existing
workspace that has `AGENTS.md`, `frameworks/`, and `projects/`.

1. **Start your agent** in the workspace root (where `AGENTS.md` lives)
2. **Paste this prompt:**

> Download the latest release of the AI-Assisted SDLC framework from
> https://github.com/jeffogata/ai-assisted-sdlc into `./frameworks/` using the
> version tag as the directory name (e.g., `frameworks/v<version>/`) if not
> already present. Keep any previous framework versions in place — existing
> projects may reference them via their `project.md`.
>
> Then read `AGENTS.md` to orient yourself to this workspace, followed by
> `projects/index.md` to see existing projects and
> `frameworks/v<version>/QUICKSTART.md` from the version you just downloaded.
>
> I want to start a new project in this workspace. Ask me for the project name
> and a one-line description; infer the operating posture from our conversation
> and present them as overridable assumptions (or I'll specify them here). Then
> create a new project directory under `projects/`, create its `project.md`
> pinning the framework version to use, create a `docs/` subtree, add an entry
> with the next sequential project number to `projects/index.md`, and guide me
> through Initiation.

The agent downloads the latest framework release (keeping any older versions in
place), reads the workspace conventions from `AGENTS.md`, creates the new
project scaffolding, updates `projects/index.md`, and walks you through
Initiation starting with the project name and description. Classifications
(operating posture, tier) are inferred from the conversation and presented as
overridable assumptions — see
[Agentic Workflow Guide: Classification by Inference](guides/agentic-workflow.md#classification-by-inference).

**Workspace structure after adding a second project:**

```
my-workspace/
├── AGENTS.md
├── frameworks/
│   ├── v0.42.0/              ← older version still referenced by first project
│   └── v<version>/           ← new version (latest)
├── projects/
│   ├── index.md              ← now lists both projects
│   ├── my-first-project/
│   │   ├── project.md        ← pinned to v0.42.0
│   │   └── docs/
│   └── my-second-project/    ← newly created
│       ├── project.md        ← pinned to v<version>
│       └── docs/
└── src/                      ← or source repos alongside, per project.md
```

> **Key insight:** Framework versions coexist. Each `project.md` pins the
> version its project uses, so upgrading the workspace's latest version does not
> force ongoing projects to migrate. See
> [Framework Version Coexistence](guides/bootstrap.md#framework-version-coexistence)
> for how multi-version workspaces work and when old versions can be cleaned up.

---

## What's Next

- [**README**](README.md) — full framework overview, governance model, and
  adoption guidance
- [**Right-Sizing Guide**](guides/right-sizing.md) — calibrate process weight to
  your project's consequence and stakeholder reach
- [**Worked Example**](guides/worked-example.md) — see what "done" looks like
  across all stages (greenfield)
- [**Solo Worked Example**](guides/worked-example-solo.md) — see a fuzzy idea
  become a Minimal-tier brief and a Gate 1 self-gate, solo
- [**Brownfield Worked Example**](guides/worked-example-brownfield.md) — see
  preparation, exit checkpoint, and feature delivery for an existing codebase
- [**Bootstrap Guide**](guides/bootstrap.md) — customize project layout,
  multi-repo setup, and advanced operating postures
- [**Delivery Operating Guide**](guides/delivery-operating-guide.md) —
  week-by-week operating rhythm for Sprint and Kanban delivery

---

## Notes

**Last Updated:** 2026-06-20

Added to framework in v0.26.0. Classification-by-inference prompt alignment and
idea-path entry added in v0.48.0. In v0.49.0 the lifecycle list gained the
Terminal Closure stage (with Operations and Flow), and the autonomy-tier
vocabulary was repointed to the operating model (operating posture).
