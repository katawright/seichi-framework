# Quick Start

Get from zero to your first stage in under five minutes.

---

## The Framework in 30 Seconds

The framework overlays your existing software development process — agile,
waterfall, or hybrid — with structured AI assistance at every stage. You choose
how much autonomy AI gets (from human-driven drafting to fully AI-led
execution), and checkpoints keep humans in control of key decisions.

Eight stages cover the full lifecycle:

- **Foundational** (once per project): Initiation → Requirements → System Design
- **Iterative** (per increment): Increment Design → Implementation →
  Verification → Deployment
- **Continuous** (ongoing): Support

Scale the process to fit your project: **Minimal** (MVPs, prototypes),
**Standard** (production apps), or **Enterprise** (regulated, mission-critical).
See the [Right-Sizing Guide](guides/right-sizing.md).

---

## Get Started

### New Project

**Prerequisites:** A local agent with filesystem access (Claude Code, Cursor,
Cowork, or similar).

1. **Create a new, empty folder** for your application (e.g., `my-app/`)
2. **Start your agent** in that folder
3. **Paste this prompt:**

> Download the latest release of the AI-Assisted SDLC framework from
> https://github.com/jeffogata/ai-assisted-sdlc into ./frameworks/ using the
> version tag as the directory name (e.g., frameworks/v0.42.0/) if not already
> present.
>
> Then read QUICKSTART.md from the downloaded framework to orient yourself.
>
> This is a new, single-repo project. Set up this directory as my workspace —
> create the project structure, AGENTS.md, and your agent-specific startup file
> (e.g., CLAUDE.md for Claude Code). Then guide me through the first stage.
> Drive the process but check decisions with me.

The agent downloads the framework, creates your workspace, and walks you through
[Initiation](stages/initiation/README.md) interactively — starting with your
project name and description, then exploring your problem, goals, and
constraints.

**Workspace structure the agent creates:**

```
my-app/
├── AGENTS.md              ← workspace instructions for AI agents
├── frameworks/
│   └── v0.42.0/           ← framework release (read-only)
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

`AGENTS.md` tells the agent where to find the framework, project index, and
source code. The agent also creates its own startup file (e.g., `CLAUDE.md` for
Claude Code) that references `AGENTS.md`, so it re-orients automatically in
future sessions. On startup, the agent reads `projects/index.md` and asks which
project you're working on.

> **Want more control over the setup?** The
> [Bootstrap Guide](guides/bootstrap.md) explains the underlying location model
> and offers prompts for higher autonomy levels and custom directory structures.

### Joining a Project Mid-Stream

If you're adopting the framework on a project already in progress:

1. **Start your agent** in the project's root directory (where `AGENTS.md`
   lives, if one exists)
2. **Paste this prompt:**

> Download the latest release of the AI-Assisted SDLC framework from
> https://github.com/jeffogata/ai-assisted-sdlc into ./frameworks/ using the
> version tag as the directory name (e.g., frameworks/v0.42.0/) if not already
> present.
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
> stage. Drive the process but check decisions with me.

The agent sets up the governance layer alongside your existing code, interviews
you to determine which [stages](guides/stages.md) are already complete, creates
thin retroactive artifacts (briefs summarizing decisions already made — not full
stage outputs), and picks up the framework at your current stage.

**Workspace structure the agent creates (project with `src/` directory):**

```
my-existing-app/               ← project root = workspace root
├── AGENTS.md                  ← augmented with workspace instructions
├── frameworks/
│   └── v0.42.0/               ← framework release (read-only)
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
│   └── v0.42.0/               ← framework release (read-only)
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
> [Support Stage Guide](stages/support/README.md) and complete the
> [Support Readiness Checklist](stages/support/readiness-checklist.md).

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
> | Support / Operations            | [Support Stage](stages/support/README.md)                                                                |

---

## What's Next

- [**README**](README.md) — full framework overview, governance model, and
  adoption guidance
- [**Right-Sizing Guide**](guides/right-sizing.md) — calibrate process weight to
  your project's risk and team size
- [**Worked Example**](guides/worked-example.md) — see what "done" looks like
  across all stages (greenfield)
- [**Brownfield Worked Example**](guides/worked-example-brownfield.md) — see
  preparation, exit checkpoint, and feature delivery for an existing codebase
- [**Bootstrap Guide**](guides/bootstrap.md) — customize project layout,
  multi-repo setup, and advanced autonomy levels
- [**Delivery Operating Guide**](guides/delivery-operating-guide.md) —
  week-by-week operating rhythm for Sprint and Kanban delivery

---

## Notes

**Last Updated:** 2026-03-30

Added to framework in v0.26.0.
