# AI-Assisted SDLC Framework

## Overview

A practical, stage-by-stage guide for AI-assisted software delivery — giving
teams and leaders the guidance, visibility, and oversight they need at every
stage.

> **Agents:** Start at [agentic-workflow.md](guides/agentic-workflow.md) for
> stage routing, fallback protocols, and execution guidance.

> **Just want to start?** See the [Quick Start](QUICKSTART.md) — zero to your
> first stage in one session.

### Why This Framework

Teams are adopting AI development tools rapidly, but without structure the
results are inconsistent — some teams over-rely on AI without adequate review,
others avoid it and miss productivity gains, and leadership has no visibility
into how AI is being used or whether it's helping. Ad-hoc adoption also means no
shared language for discussing AI's role, no consistent quality gates, and no
way to scale what works from one team to the next.

### Goals of This Guide

- Overlay your existing process (agile, waterfall, or hybrid), not replace it —
  your sprint ceremonies, PR review process, and CI/CD pipeline stay. The
  framework adds: an initiation brief to define the problem, verification
  checklists to confirm quality before shipping, and optional stage briefs
  scaled to your tier.
- Provide structured AI assistance with appropriate human oversight at every
  stage
- Give leaders explicit investment gates and checkpoint records for governance

### Key Principle

AI assistance is bounded by verifiability and risk. How autonomously the work
runs — who performs it and who decides — is a per-project
[operating-model](guides/operating-model.md) choice, not a fixed property of
each stage.

### How to Use This Guide

1. Use the [**Start Here**](#start-here) table below to pick a path matching
   your interest
2. Review the [**Stage Overview**](#stage-overview) to understand the eight
   stages
3. See [**How AI Fits In**](#how-ai-fits-in) to understand who runs the process
4. Follow the [**Adoption Path**](#adoption-path) when ready to pilot

---

## Start Here

Pick the path that matches your interest.

| I want to…                                       | Start with                                                            | Then                                                                                             | Next step                                                  |
| ------------------------------------------------ | --------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ | ---------------------------------------------------------- |
| Start from just an idea                          | [Quick Start: I Only Have an Idea](QUICKSTART.md#i-only-have-an-idea) | [Initiation: Arriving with Only an Idea](stages/initiation/README.md#arriving-with-only-an-idea) | [Solo Worked Example](guides/worked-example-solo.md)       |
| Understand the ROI and governance model          | [Business Value](#business-value)                                     | [Governance](#governance-at-a-glance)                                                            | [Adoption Path](#adoption-path)                            |
| See how AI fits into each stage                  | [How AI Fits In](#how-ai-fits-in)                                     | [Stage Overview](#stage-overview)                                                                | [Adoption Path](#adoption-path)                            |
| Kick off a new project                           | [Try It Now](#try-it-now)                                             | [Stage Overview](#stage-overview)                                                                | [Initiation](stages/initiation/README.md)                  |
| Execute technical stages (design → verification) | [Stage Overview](#stage-overview)                                     | [System Design](stages/system-design/README.md)                                                  | [Worked Example](guides/worked-example.md)                 |
| Set up deployment pipelines and infrastructure   | [DevOps Integration Guide](guides/devops-integration.md)              | [Deployment Setup](stages/deployment/setup.md)                                                   | [Deployment](stages/deployment/README.md)                  |
| Run delivery and manage sprint cadence           | [Delivery Operating Guide](guides/delivery-operating-guide.md)        | [Governance](#governance-at-a-glance)                                                            | [Stage Overview](#stage-overview)                          |
| Verify and test an increment                     | [Verification](stages/verification/README.md)                         | [Verification Brief](templates/verification-brief.md)                                            | [Verification Checklist](stages/verification/checklist.md) |
| Close out a project and hand it to operations    | [Closure Stage](stages/closure/README.md)                             | [Operational Handoff Template](templates/operational-handoff.md)                                 | [Operations Guide](guides/operations.md)                   |
| Operate and maintain a production system         | [Operations Guide](guides/operations.md)                              | [Operating Model Guide](guides/operating-model.md)                                               | [Right-Sizing Guide](guides/right-sizing.md)               |
| Assess security across stages                    | [Security Guide](guides/security.md)                                  | [Governance](#governance-at-a-glance)                                                            | [Verification](stages/verification/README.md)              |

---

## How AI Fits In

The framework separates two questions the old single "autonomy tier" bundled
together — **who performs the work** and **who decides** — and sets them through
the [operating model](guides/operating-model.md), per project, not as a fixed
property of each stage:

| Question                                    | Setting                                                     | Stays human                           |
| ------------------------------------------- | ----------------------------------------------------------- | ------------------------------------- |
| **Who performs the work?** (Work Execution) | Humans · Collaborative · Agents                             | —                                     |
| **Who decides?** (Authority)                | Interactive human · Pre-authorized policy · Delegated agent | investment gates, compliance sign-off |

Humans remain accountable for decisions and correctness regardless of setting.
For a pilot, start conservative (humans drive, agents assist) and shift
execution toward Agents as confidence and capability grow — investment decisions
(Gates) and compliance sign-offs stay human throughout. The same governance
structure that guides a cautious first pilot scales to a future where agents
fill most of the execution and humans govern through checkpoints.

See the [Operating Model Guide](guides/operating-model.md) for the full model —
the configurable functions, capability coverage, and where unattended
("Lights-Out") operation is possible.

---

## Stage Overview

The framework defines eight stages. Foundational stages run once per project
(though they can be revisited); iterative stages repeat each increment.

| Stage                                                 | Type         | What happens                                            |
| ----------------------------------------------------- | ------------ | ------------------------------------------------------- |
| [Initiation](stages/initiation/README.md)             | Foundational | Define the problem, stakeholders, and success criteria  |
| [Requirements](stages/requirements/README.md)         | Foundational | Capture what to build and how to verify it              |
| [System Design](stages/system-design/README.md)       | Foundational | Choose architecture, patterns, and tech stack           |
| [Increment Design](stages/increment-design/README.md) | Iterative    | Plan one increment's scope and approach                 |
| [Implementation](stages/implementation/README.md)     | Iterative    | Build the increment with AI assistance                  |
| [Verification](stages/verification/README.md)         | Iterative    | Test, review, and validate the increment                |
| [Deployment](stages/deployment/README.md)             | Iterative    | Release to production                                   |
| [Closure](stages/closure/README.md)                   | Terminal     | Hand the system off to operations and close the project |

Beyond the eight project stages, the framework defines two more **work-shapes**
that share the same [operating model](guides/operating-model.md): a
[**Flow**](guides/stages.md#flow-delivery-mode) delivery mode for small in-place
changes, and the [**Operations**](guides/operations.md) process for running a
standing system after a project closes. Together: three work-shapes (Project ·
Flow · Operations), one operating model.

For full stage definitions, inputs, outputs, and criteria, see
[AI-Assisted SDLC Stages](guides/stages.md).

---

## What Using the Framework Looks Like

A quick scenario — building an internal dashboard — to make the stages concrete:

### Product manager's view

> In **Initiation**, a product manager drafts a project brief using the
> template. AI helps with stakeholder analysis and risk identification. The team
> presents at **Gate 1** and gets approval to proceed.
>
> In **Requirements**, the PM and engineers use AI to draft user stories and
> acceptance criteria from the brief. The team reviews, refines, and validates
> with stakeholders.
>
> In **System Design**, engineers define the architecture. AI generates options
> and trade-off analysis. The team reviews and decides. At **Gate 2**,
> leadership commits to build.
>
> Each **increment** then cycles through design → build → verify → deploy, with
> AI assistance increasing as outputs become more testable.

### Engineer's view

> In **System Design**, an engineer asks the AI to compare three data pipeline
> options against latency and cost constraints. The trade-off summary goes into
> the System Design Brief for the Gate 2 review.
>
> In **Increment Design**, the engineer scopes the first increment and uses AI
> to break work items into tasks with estimated complexity.
>
> In **Implementation**, the AI scaffolds the API layer from the approved
> design, generating endpoint stubs, data models, and initial tests. The
> engineer reviews, adjusts, and fills in business logic.
>
> In **Verification**, the AI flags a coverage gap in edge-case handling. The
> engineer adds the missing tests before the increment ships.

---

## Business Value

The framework improves delivery outcomes in four ways:

- **Faster time-to-value** — AI-assisted drafting and structured handoffs reduce
  cycle time from idea to working deliverable.
- **Lower risk and rework** — Explicit quality checkpoints and verification
  criteria surface problems earlier.
- **Stronger governance** — Gate decisions and checkpoint records make
  investment decisions and accountability visible.
- **Wider project pipeline** — Non-technical stakeholders can initiate projects
  with structure, not just technical gatekeepers.

| Outcome          | Without Framework                | With Framework                            |
| ---------------- | -------------------------------- | ----------------------------------------- |
| Time-to-value    | Slow, inconsistent starts        | Faster starts, clearer execution flow     |
| Delivery quality | Ambiguity discovered late        | Earlier clarity, fewer downstream defects |
| Governance       | Ad hoc decision trail            | Explicit gates and checkpoint records     |
| Project pipeline | Depends on technical gatekeepers | Structured initiation for all roles       |

**Pilot cost.** First-project setup (Initiation through Gate 1) takes 2-4 hours
at the Minimal tier. Most of that time is thinking, not process — AI drafts the
brief, you review it. A full pilot (two increments through Deployment) depends
on project scope: a small greenfield team using AI-assisted workflows may
complete in 3-4 weeks; a brownfield pilot with limited AI tooling should plan
for 6-8 weeks. See the [Right-Sizing Guide](guides/right-sizing.md) to calibrate
for your context. Standard-tier overhead is modest — primarily right-sizing
selection, brief completion, and gate preparation — and decreases as the team
builds familiarity.

### Industry Context

Published studies on AI-assisted development report productivity gains ranging
from 20–55% on well-scoped coding tasks (GitHub/Microsoft Copilot research,
2023–2024). These numbers measure code generation speed in controlled settings —
actual project-level ROI depends on team experience, AI maturity, task fit, and
process overhead. This framework does not guarantee specific gains; it provides
the structure to realize and measure them.

### Measuring Success

Track these during a pilot to validate ROI:

| Metric                               | What it tells you                      |
| ------------------------------------ | -------------------------------------- |
| Time-to-decision (Gate 1 → Gate 2)   | Are we making investment calls faster? |
| Time-to-first-deliverable            | Are we shipping sooner?                |
| Budget predictability                | Are estimates holding?                 |
| Defect and rework trend              | Are we catching issues earlier?        |
| Stakeholder confidence in governance | Do leaders trust the process?          |

Your pilot generates the first real ROI data for your organization — industry
benchmarks provide context, not targets.

For a deeper measurement model — DORA metrics, quality metrics, and developer
experience surveys — see
[Measuring Adoption Success](guides/adoption.md#measuring-adoption-success).

---

## Governance at a Glance

The framework uses **two investment gates** — explicit
proceed/proceed-with-conditions/revise/stop decisions where "investment" means
committing team capacity, time, and budget.

| Gate   | When                               | Decision                             | Accountable |
| ------ | ---------------------------------- | ------------------------------------ | ----------- |
| Gate 1 | End of Initiation                  | Continue to requirements work? (Y/N) | Executive   |
| Gate 2 | After Requirements + System Design | Commit to building? (Y/N)            | Executive   |

After Gate 2, the project is committed. Checkpoints govern the remaining stages:
Reviews (criteria verification at each stage) and Alignments (stakeholder
consensus). These control quality, readiness, and compliance — not whether to
continue. Security governance flows through every stage via the AppSec role and
automated scanning — see the [Security Guide](guides/security.md) for the full
throughline.

**Executive role.** The Executive (sponsor, VP, or department head) reviews the
Initiation Brief at Gate 1 and the cost/risk/timeline package at Gate 2. After
Gate 2, executives receive notification of checkpoint outcomes but are not
required to participate — see the [RACI matrix](guides/roles.md#raci-matrix) for
the full responsibility breakdown and the
[Decision-Rights Matrix](guides/checkpoints.md#decision-rights-matrix) for
per-checkpoint roles.

> **Why two gates?** Gate 1 is a low-cost screen: spend a little to learn
> whether the idea is worth full requirements and design work. Gate 2 is the
> real commitment: the team, timeline, and budget are locked. This lets teams
> explore early without over-committing — and gives leadership a clear stop
> point before the full build begins.

For full checkpoint types and decision records, see the
[Checkpoint Taxonomy](guides/checkpoints.md). For stage definitions and
execution patterns, see [AI-Assisted SDLC Stages](guides/stages.md).

---

## Readiness Check

Use this quick screen to decide: **adopt now**, **try first** (limited pilot),
or **defer briefly**.

**Good fit — adopt now if:**

- Your teams already use or are evaluating AI coding assistants
- You want structure instead of ad-hoc AI adoption
- You need governance guardrails for AI-assisted development
- You want non-technical stakeholders to initiate projects

**Try first (limited pilot) if:**

- You have an AI usage policy but limited practical experience
- Only one or two teams have used AI tools — others are curious but untested
- Leadership supports experimentation but hasn't committed to broader adoption

**Defer if:**

- Your organization has no AI usage policy yet (see
  [Readiness Assessment](guides/adoption.md#defer-briefly) for what to include
  and how to create one quickly)
- Teams have zero experience with AI tools (see
  [Readiness Assessment](guides/adoption.md#defer-briefly) for foundational
  skill areas to target before adopting)

> **What does a pilot require?** One project team, one Standard-tier project,
> two increments (~4–8 weeks depending on scope). No special tooling beyond the
> AI coding assistants your team already uses plus your existing CI/test
> pipeline.

If there are no defer signals, continue to [Adoption Path](#adoption-path). For
detailed pre-pilot readiness criteria, see the
[Organizational Adoption Guide](guides/adoption.md#pre-pilot-readiness-checklist).

---

## Adoption Path

The recommended path is a **single pilot project**. Scope it to match your
readiness: "try first" teams should limit to one team and one increment (~4
weeks) to validate the framework with minimal commitment; "adopt now" teams can
run a full Standard-tier pilot across two increments (~4–8 weeks). This section
is an overview; see the [Organizational Adoption Guide](guides/adoption.md) for
full detail. If you want to try the framework on your own before proposing an
organizational pilot, start with [Try It Now](#try-it-now).

### Choose your project type

| Project type                                         | When to choose                                                                                       | First step                                                                                      |
| ---------------------------------------------------- | ---------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| **Greenfield** (new project)                         | Preferred for first pilot — fewer legacy constraints                                                 | Start at Initiation                                                                             |
| **Brownfield** (existing codebase, AI-ready)         | Architecture and conventions already documented for AI use (e.g., prior project completed discovery) | Start at feature delivery                                                                       |
| **Brownfield** (existing codebase, not yet AI-ready) | Most common — existing system without AI context documented                                          | [Assess codebase readiness](guides/brownfield-readiness.md#readiness-rubric) to determine scope |

**Brownfield without documented context?** The
[Brownfield Readiness Guide](guides/brownfield-readiness.md) walks you through a
scored readiness rubric (five axes, 0-4 each, 4 = best) that determines your
tier and AI operating mode — from focused discovery to enablement programs for
codebases with pervasive issues.

See
[Greenfield vs. Brownfield](guides/framework.md#greenfield-vs-brownfield-projects)
for conceptual overview.

### Pre-pilot prerequisites

Confirm these before pilot kickoff:

- **Policy baseline:** Approved AI usage expectations and constraints
- **Delivery baseline:** Functioning CI/test workflow for pilot scope
- **Recovery baseline:** Rollback or mitigation path for deployment issues
- **Ownership baseline:** Named owners for gate and checkpoint decisions

For detailed readiness criteria, see the
[Organizational Adoption Guide](guides/adoption.md#pre-pilot-readiness-checklist).

### Pilot sequence

**1. Pre-pilot setup**

- Select tier using the [Right-Sizing Guide](guides/right-sizing.md).
- Choose the initial operating posture (start conservative) using the
  [Operating Model Guide](guides/operating-model.md).

**2. Pilot execution**

- Run one Standard-tier project through two increments.
- Copy the bootstrap prompt from the
  [Bootstrap Guide](guides/bootstrap.md#bootstrap-prompts) and fill in your
  project details (~15 minutes).
- Start with the [Initiation stage](stages/initiation/README.md) — use the
  guide, brief template, and checklist.
- Use the [Framework Guide](guides/framework.md) when deeper context is needed.

**3. Expansion decision**

- Review pilot outcomes (cycle time, defect rate, team satisfaction).
- Decide whether and how to expand to more teams or projects.

---

## Your First 2 Weeks (Organizational Pilot)

This checklist assumes you have organizational backing for a pilot. If you want
to try the framework solo or with your team first, skip to
[Try It Now](#try-it-now).

1. Select one pilot project and confirm
   [prerequisites](#pre-pilot-prerequisites).
2. Choose tier ([Right-Sizing Guide](guides/right-sizing.md)).
3. Select the initial operating posture
   ([Operating Model Guide](guides/operating-model.md)).
4. Copy and complete the bootstrap prompt
   ([Bootstrap Guide](guides/bootstrap.md#bootstrap-prompts)) — plan ~15
   minutes.
5. Complete Initiation artifacts using the
   [Initiation stage](stages/initiation/README.md) guide, brief template, and
   checklist.
6. Schedule and run the Gate 1 decision.
7. **(Executives)** Review the Initiation Brief and gate-decision record; make
   the Gate 1 proceed/revise/stop decision.

**Expected early outputs:**

- Pilot scope and ownership clarity
- Initial artifact set and decision trail
- A clear go/no-go decision for requirements work

> **Your first session:** Complete steps 1–4, then open the
> [Initiation stage](stages/initiation/README.md) guide and work through the
> brief template with your AI assistant. Most teams complete the first stage in
> a single working session.

---

## Try It Now

No organizational approval needed — try the framework on a real task in under an
hour.

**Using an AI coding agent?** Point your agent at this framework's `README.md` —
it will find the agent entry point automatically and guide you through the
process. See the [Agentic Workflow Guide](guides/agentic-workflow.md) for
details.

1. **Learn the operating model (~10 min).** Read the
   [Operating Model Guide](guides/operating-model.md) to understand who runs the
   process and how autonomously.
2. **Calibrate process weight (~5 min).** Use the
   [Right-Sizing Guide](guides/right-sizing.md) to match framework rigor to your
   project's size and risk.
3. **Bootstrap your project (~15 min).** Copy the bootstrap prompt from the
   [Bootstrap Guide](guides/bootstrap.md#bootstrap-prompts) and fill in your
   project details.
4. **Work through Initiation (~20 min).** Open the
   [Initiation stage](stages/initiation/README.md) guide and complete the brief
   template with your AI assistant.

If the experiment goes well, see [Adoption Path](#adoption-path) to propose a
wider pilot.

---

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for how to suggest improvements or submit
changes.

---

## Notes

**Last Updated:** 2026-06-26

Added to framework in v0.17.0. Idea-path entry added to Start Here in v0.48.0.
Autonomy-tier links repointed to the Operating Model Guide in v0.49.0. In
v0.49.0 the dev/ops split renamed the 8th stage Support → Closure (terminal),
moved standing operations to the [Operations Guide](guides/operations.md), and
added the [Flow](guides/stages.md#flow-delivery-mode) delivery mode.
