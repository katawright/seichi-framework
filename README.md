---
agent_entry_point: guides/agentic-workflow.md
---

# AI-Assisted SDLC Framework

## Overview

A practical, stage-by-stage guide for AI-assisted software delivery — giving
teams and leaders the guidance, visibility, and oversight they need at every
stage.

> **Just want to start?** See the [Quick Start](QUICKSTART.md) — zero to your
> first stage in under 5 minutes.

### Why This Framework

Teams are adopting AI development tools rapidly, but without structure the
results are inconsistent — some teams over-rely on AI without adequate review,
others avoid it and miss productivity gains, and leadership has no visibility
into how AI is being used or whether it's helping. Ad-hoc adoption also means no
shared language for discussing AI's role, no consistent quality gates, and no
way to scale what works from one team to the next.

### Purpose

- Overlay your existing process (agile, waterfall, or hybrid), not replace it
- Provide structured AI assistance with appropriate human oversight at every
  stage
- Give leaders explicit investment gates and checkpoint records for governance

### Key Principle

AI assistance increases as verifiability increases. Early stages use AI for
drafting and analysis under tighter human control; later stages allow higher
autonomy because outputs are directly testable.

### How to Use This Guide

1. Use the [**Start Here**](#start-here) table below to pick a path matching
   your interest
2. Review the [**Stage Overview**](#stage-overview) to understand the eight
   stages
3. See [**How AI Fits In**](#how-ai-fits-in) to understand autonomy tiers
4. Follow the [**Adoption Path**](#adoption-path) when ready to pilot

---

## Start Here

Pick the path that matches your interest. Each takes under 5 minutes.

| I want to…                                        | Start with                                                    | Then                                                          | Next step                                                      |
| ------------------------------------------------- | ------------------------------------------------------------- | ------------------------------------------------------------- | -------------------------------------------------------------- |
| Understand the ROI and governance model            | [Business Value](#business-value)                             | [Governance](#governance-at-a-glance)                         | [Adoption Path](#adoption-path)                                |
| See how AI fits into each stage                    | [How AI Fits In](#how-ai-fits-in)                             | [Stage Overview](#stage-overview)                             | [Adoption Path](#adoption-path)                                |
| Kick off a new project                             | [Try It Now](#try-it-now)                                     | [Stage Overview](#stage-overview)                             | [Initiation](stages/initiation/README.md)                      |
| Execute technical stages (design → verification)   | [Stage Overview](#stage-overview)                             | [System Design](stages/system-design/README.md)              | [Worked Example](guides/worked-example.md)                     |
| Set up deployment pipelines and infrastructure     | [DevOps Integration Guide](guides/devops-integration.md)     | [Deployment Setup](stages/deployment/setup.md)               | [Deployment](stages/deployment/README.md)                      |
| Run delivery and manage sprint cadence             | [Delivery Operating Guide](guides/delivery-operating-guide.md) | [Governance](#governance-at-a-glance)                       | [Stage Overview](#stage-overview)                              |
| Verify and test an increment                       | [Verification](stages/verification/README.md)                | [Verification Brief](templates/verification-brief.md)        | [Verification Checklist](stages/verification/checklist.md)     |
| Operate and maintain a production system           | [Support](stages/support/README.md)                          | [Support Operations](stages/support/operations.md)           | [Support Readiness Checklist](stages/support/readiness-checklist.md) |
| Assess security across stages                      | [Security Guide](guides/security.md)                         | [Governance](#governance-at-a-glance)                         | [Verification](stages/verification/README.md)                  |

---

## How AI Fits In

Teams choose an autonomy tier per stage:

| Tier              | Human role                        | AI role                       | Typical stages                  |
| ----------------- | --------------------------------- | ----------------------------- | ------------------------------- |
| **Human-Led**     | Drives all decisions              | Suggests, drafts on request   | Initiation, Requirements        |
| **Collaborative** | Reviews, selects, approves        | Co-authors, generates options | System Design, Increment Design |
| **AI-Led**        | Sets constraints, verifies output | Executes with guardrails      | Implementation, Verification    |

Humans remain accountable for decisions and correctness at every tier. For a
pilot, start with Human-Led and adjust as team confidence grows.

See the [AI Assistance Scorecard](guides/ai-assistance.md) for selection
criteria and full guidance.

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
| [Support](stages/support/README.md)                   | Continuous   | Monitor, maintain, and feed back into future increments |

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
for 6-8 weeks. See the [Right-Sizing Guide](guides/right-sizing.md) to
calibrate for your context. Standard-tier overhead is modest — primarily right-sizing selection, brief
completion, and gate preparation — and decreases as the team builds familiarity.

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

The framework uses **two investment gates** — explicit proceed/revise/stop
decisions where "investment" means committing team capacity, time, and budget.

| Gate   | When                               | Decision                             | Accountable |
| ------ | ---------------------------------- | ------------------------------------ | ----------- |
| Gate 1 | End of Initiation                  | Continue to requirements work? (Y/N) | Executive   |
| Gate 2 | After Requirements + System Design | Commit to building? (Y/N)            | Executive   |

After Gate 2, the project is committed. Checkpoints govern the remaining
stages: Quality Checkpoints (peer review of stage artifacts),
Alignment Reviews (design conformance), Deployment Approval (production
readiness), and Compliance Approval (regulatory sign-off when required). These
control quality, deployment timing, and compliance — not whether to continue.
Security governance flows through every stage via the AppSec role and automated
scanning — see the [Security Guide](guides/security.md) for the full
throughline.

**Executive role.** The Executive (sponsor, VP, or department head) reviews the
Initiation Brief at Gate 1 and the cost/risk/timeline package at Gate 2. After
Gate 2, executives receive notification of checkpoint outcomes but are not
required to participate — see the
[RACI matrix](guides/framework.md#roles-and-responsibilities) for the full
responsibility breakdown and the
[Decision-Rights Matrix](guides/stages.md#decision-rights-matrix) for
per-checkpoint roles.

> **Why two gates?** Gate 1 is a low-cost screen: spend a little to learn
> whether the idea is worth full requirements and design work. Gate 2 is the
> real commitment: the team, timeline, and budget are locked. This lets teams
> explore early without over-committing — and gives leadership a clear stop
> point before the full build begins.

For full checkpoint types and decision records, see
[Checkpoint Taxonomy](guides/framework.md#checkpoint-taxonomy) in the
[Framework Guide](guides/framework.md). For stage definitions and execution
patterns, see [AI-Assisted SDLC Stages](guides/stages.md).

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
- Engineering teams are broadly resistant to AI adoption (see
  [Readiness Assessment](guides/adoption.md#defer-briefly) for how to build
  organizational readiness before introducing the framework)

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
weeks) to validate the framework with minimal commitment; "adopt now" teams
can run a full Standard-tier pilot across two increments (~4–8 weeks). This section is an overview; see the
[Organizational Adoption Guide](guides/adoption.md) for full detail. If you want
to try the framework on your own before proposing an organizational pilot, start
with [Try It Now](#try-it-now).

### Choose your project type

| Project type                                         | When to choose                                                                                       | First step                                                                                      |
| ---------------------------------------------------- | ---------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| **Greenfield** (new project)                         | Preferred for first pilot — fewer legacy constraints                                                 | Start at Initiation                                                                             |
| **Brownfield** (existing codebase, AI-ready)         | Architecture and conventions already documented for AI use (e.g., prior project completed discovery) | Start at feature delivery                                                                       |
| **Brownfield** (existing codebase, not yet AI-ready) | Most common — existing system without AI context documented                                          | [Assess codebase readiness](guides/brownfield-readiness.md#readiness-rubric) to determine scope |

**Brownfield without documented context?** The
[Brownfield Readiness Guide](guides/brownfield-readiness.md) walks you through a
scored readiness rubric (six axes, 0-4 each, 4 = best) that determines your tier
and AI operating tier — from focused discovery to enablement programs for
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

- Select risk tier using the [Right-Sizing Guide](guides/right-sizing.md).
- Choose initial AI autonomy tier (typically Human-Led) using the
  [AI Assistance Scorecard](guides/ai-assistance.md).

**2. Pilot execution**

- Run one Standard-tier project through two increments.
- Copy the bootstrap prompt from the
  [Manual Process Guide](guides/manual-process.md#bootstrap-prompt-template) and
  fill in your project details (~15 minutes).
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
2. Choose risk tier ([Right-Sizing Guide](guides/right-sizing.md)).
3. Select initial AI autonomy tier
   ([AI Assistance Scorecard](guides/ai-assistance.md)).
4. Copy and complete the bootstrap prompt
   ([Manual Process Guide](guides/manual-process.md#bootstrap-prompt-template))
   — plan ~15 minutes.
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

1. **Learn the autonomy tiers (~10 min).** Read the
   [AI Assistance Scorecard Quick Reference](guides/ai-assistance.md#quick-reference)
   to understand Human-Led, Collaborative, and AI-Led modes.
2. **Calibrate process weight (~5 min).** Use the
   [Right-Sizing Guide](guides/right-sizing.md) to match framework rigor to your
   project's size and risk.
3. **Bootstrap your project (~15 min).** Copy the bootstrap prompt from the
   [Manual Process Guide](guides/manual-process.md#bootstrap-prompt-template)
   and fill in your project details.
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

**Last Updated:** 2026-03-19

Added to framework in v0.17.0.
