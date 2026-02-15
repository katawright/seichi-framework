# Framework Guide

**Last Updated:** 2026-02-14

> Framework-wide concepts that apply across all stages. Stage-specific guidance
> is in each stage's guide.

---

## What Is This Framework?

The AI-Assisted SDLC framework is a lightweight, practical guide for integrating
AI assistance into software development. It helps both technical and
non-technical stakeholders work through every stage of a project — from initial
idea to production support.

By providing clear guidance and AI assistance from the very first stage, the
framework enables anyone with an idea to create a professional project
proposal—without needing deep process knowledge or technical expertise. This
democratizes project initiation, ensuring good ideas can come from anywhere in
the organization.

**Design principles:**

1. **AI as assistant, not replacement** — AI is a productivity tool that humans
   control
2. **Practical over theoretical** — actionable guidance, not academic
   completeness
3. **Lightweight process** — avoid bureaucratic overhead
4. **Professional standards** — humans evaluate and validate all AI output
5. **Cross-functional accessibility** — usable by both technical and
   non-technical stakeholders
6. **Role-appropriate guidance** — each stage tailored to its primary role

**Target audiences:**

- **Primary:** Engineers who may be skeptical about AI tools or unfamiliar with
  AI's strengths and weaknesses
- **Secondary:** Product Managers, Business Analysts, Marketing, and Executives
  who need to initiate and plan projects
- **Tertiary:** Any organization seeking a structured approach to integrating AI
  assistance across the software development lifecycle

---

## Key Concepts

This guide covers five major concepts that structure the framework:

**[SDLC Stages](#sdlc-stages)** — The framework defines stages that work for any
methodology (agile, waterfall, hybrid). Stages follow different execution
patterns: foundational (once per project), iterative (per deliverable
increment), and continuous (ongoing).

**[Checkpoint Taxonomy](#checkpoint-taxonomy)** — Five types of checkpoints
ensure quality and alignment: Gates (investment decisions), Quality Checkpoints
(standards verification), Deployment Approvals (release authorization),
Alignment Reviews (stakeholder sync), and Compliance Approvals (regulatory
sign-offs).

**[Measurement Throughline](#measurement-throughline)** — Measurable success
criteria established in the Initiation stage flow through all subsequent stages,
ensuring goals actively guide development and enable data-driven validation.

**[MoSCoW Prioritization](#moscow-prioritization)** — A coarse prioritization
method (Must/Should/Could/Won't Have) used during Requirements to organize
features before increment boundaries are defined.

**[AI Autonomy Overview](#ai-autonomy-overview)** — Guidance for how
independently AI can operate at each stage before requiring human approval,
balanced against verifiability and risk.

---

## SDLC Stages

The framework defines stages with different execution patterns: **foundational**
(execute once per project), **iterative** (repeat per deliverable increment),
and **continuous** (ongoing). An "increment" is a discrete, deliverable chunk of
work — map it to your methodology's terminology (epic, feature, sprint,
milestone, etc.).

This section provides a high-level overview. For complete stage definitions
including inputs, outputs, entry/exit criteria, and handoffs, see the
[SDLC Stages](framework-stages.md) document.

### Execution Patterns

**Foundational stages** execute once per project but can be revisited when
significant new information emerges:

- **Initiation** — project vision and business case
- **Requirements** — what to build
- **Design** (foundational pass) — system architecture

**Iterative stages** repeat for each deliverable increment:

- **Design** (iterative pass) — detailed design for the current increment
- **Implementation** — build the increment
- **Verification** — test and validate the increment
- **Deployment** — release the increment

**Continuous stages** run ongoing after first deployment:

- **Support** — monitor, maintain, enhance

### Stage Overview

| #   | Stage          | Primary Role          | Pattern                  | Purpose                                                  |
| --- | -------------- | --------------------- | ------------------------ | -------------------------------------------------------- |
| 1   | Initiation     | PM / BA               | Foundational             | Establish business case with measurable success criteria |
| 2   | Requirements   | BA / PM               | Foundational             | Define testable requirements with acceptance criteria    |
| 3   | Design         | Engineers / Architect | Foundational + Iterative | Create architecture and detailed designs                 |
| 4   | Implementation | Engineers             | Iterative                | Build working code                                       |
| 5   | Verification   | QA / Engineers        | Iterative                | Validate through testing and acceptance                  |
| 6   | Deployment     | DevOps / Engineers    | Iterative                | Release to production                                    |
| 7   | Support        | Engineers / DevOps    | Continuous               | Monitor, maintain, and enhance                           |

### Terminology: Increments

The framework uses **"increment"** as a neutral term for a discrete, deliverable
chunk of work. Map it to your methodology:

- **Agile/Scrum:** Epic, Feature, or Sprint deliverable
- **SAFe:** Feature or Capability
- **Kanban:** Work Item or Deliverable
- **Traditional PM:** Milestone or Work Package
- **Lean/XP:** Story collection or Release increment

### Stage Flow

**Linear (waterfall-style):**

```
Initiation → Requirements → Design →
Implementation → Verification → Deployment →
Support
```

**Iterative (agile-style):**

```
Initiation (once)
  → Requirements (once)
    → Design - foundational (once)
      → [Per increment: Design → Implementation
         → Verification → Deployment]
        → Support (continuous)
```

**Feedback loops:**

- Support → Requirements (user feedback)
- Support → Design (performance issues)
- Verification → Implementation (test failures)
- Verification → Design (design flaws)
- Support → Initiation (objectives need revision)

---

---

## Checkpoint Taxonomy

Throughout the SDLC, checkpoints ensure quality, alignment, and sound
decision-making. The framework defines five types:

### 1. Gates (Investment Decisions)

**Purpose:** Decide whether to continue investing **Outcome:** Proceed / Pivot /
Stop **Real stop option:** Yes

- **Gate 1** (end of Initiation): Approve brief and fund Requirements work?
- **Gate 2** (end of Requirements + Design foundational): Commit to building
  this?

After Gate 2, the project is funded and team committed. Later checkpoints focus
on "when/how" rather than "if."

### 2. Quality Checkpoints

**Purpose:** Ensure standards met before proceeding **Outcome:** Ready / Not
Ready (remediate and retry) **Real stop option:** No

Examples: code review, test coverage thresholds, security scan pass,
documentation completeness.

### 3. Deployment Approvals

**Purpose:** Authorize deployment to an environment **Outcome:** Deploy / Hold /
Rollback **Real stop option:** No (timing, not cancellation)

Examples: staging approval, production go/no-go, rollout gates (10% → 50% →
100%).

### 4. Alignment Reviews

**Purpose:** Synchronize stakeholders, gather feedback **Outcome:** Aligned /
Adjustments Needed **Real stop option:** No

Examples: design review, sprint review/demo, architecture review, requirements
walkthrough.

### 5. Compliance Approvals

**Purpose:** Required sign-offs from legal, security, or regulatory teams
**Outcome:** Approved / Remediation Required **Real stop option:** Rarely
(usually remediate)

Examples: legal review, security review, accessibility compliance, data privacy
assessment.

**Human validation of AI output is required at all checkpoint types.** See the
[AI Autonomy Scorecard](framework-ai-autonomy.md) for stage-specific guidance.

---

## Measurement Throughline

Measurable success criteria established in Initiation flow through all stages,
ensuring goals actively guide development.

| Stage              | How Measurement Is Used                                                               |
| ------------------ | ------------------------------------------------------------------------------------- |
| **Initiation**     | Define objectives with measurable success criteria; set targets                       |
| **Requirements**   | Ensure NFRs include instrumentation/telemetry; ACs ladder up to success criteria      |
| **Design**         | Design analytics infrastructure, dashboards, monitoring, data collection              |
| **Implementation** | Implement logging, metrics collection, instrumentation                                |
| **Verification**   | Test that measurement systems work; validate ACs tied to success criteria             |
| **Deployment**     | Deploy with monitoring configured; capture baseline measurements                      |
| **Support**        | Monitor success criteria in production; validate objectives achieved; report progress |

**The framework is agnostic to goal-setting methodology.** Use OKRs, SMART
goals, KPIs, Balanced Scorecard, or simple success metrics — whatever fits your
organization.

**Minimum requirement:** At least one measurable success criterion per project,
with baseline (current state) and target (desired state).

---

## MoSCoW Prioritization

The framework uses MoSCoW for coarse prioritization at the Requirements stage,
before increment boundaries are known.

**Must Have** — Critical for the first usable release. Without these, the
solution cannot deliver core value. The minimum threshold for viability.

**Should Have** — Important requirements that **will** be delivered (committed)
in future releases. They add significant value but aren't required for initial
viability.

**Could Have** — Desirable if time/resources permit. **Not committed** —
opportunistic. "Build if easy, skip if hard."

**Won't Have** — Explicitly excluded from this project scope. Captured as
non-goals to prevent scope creep.

**Key distinction:**

- Should Have = "We WILL build this, just later" (committed)
- Could Have = "We'd like to, but no commitment" (aspirational)

**How priorities map to increments:** During Design (foundational pass), the
iteration plan maps MoSCoW priorities to specific increments:

- Must Have → early increments (Increment 1-2)
- Should Have → later increments, based on dependencies and value
- Could Have → evaluated during implementation
- Won't Have → not included in any increment

---

## AI Autonomy Overview

AI autonomy levels are bounded and controlled with explicit human gates.
"Autonomy" means how independently AI can operate before requiring human
approval — not uncontrolled operation.

**Core principle:** Increase AI autonomy as verifiability increases; tighten
human gates as risk increases.

| #   | Stage          | Autonomy Level                 | Best Uses                                               |
| --- | -------------- | ------------------------------ | ------------------------------------------------------- |
| 1   | Initiation     | AI assist only                 | Draft briefs, risks, options, sizing                    |
| 2   | Requirements   | AI agent + human gate          | Goals → stories + ACs, ambiguity detection, NFR prompts |
| 3   | Design         | AI agent + strong gates        | Propose architectures, ADR drafts, slice plans          |
| 4   | Implementation | High autonomy, bounded scope   | Generate/refactor code, keep PR-sized slices            |
| 5   | Verification   | High autonomy + CI gates       | Generate tests, test matrices, expand coverage          |
| 6   | Deployment     | AI assist only + runbook gates | Draft release steps, rollback plans; humans execute     |
| 7   | Support        | AI agent + human gate          | Triage, incident comms, runbooks, dependency updates    |

For full autonomy level definitions (6 levels) and operational guidance, see the
[AI Autonomy Scorecard](framework-ai-autonomy.md).

---

## Key Terms

**Acceptance Criteria (AC)** — Objective, observable conditions that define
"done" for a requirement. Format: Given/When/Then or measurable conditions.

**Architecture Decision Record (ADR)** — A short document capturing a
significant design decision and the reasoning behind it. Stored in `docs/adr/`.

**Foundational stage** — Executes once per project but can be revisited. Sets
the project foundation.

**Functional Requirement (FR)** — A statement of required system behavior.
Format: "The system shall..." or user story format.

**Gate** — A checkpoint with a real option to stop the project. A genuine
go/no-go investment decision.

**Increment** — A discrete, deliverable chunk of work. See
[Terminology: Increments](#terminology-increments).

**Iterative stage** — Repeats for each increment in the Design → Implementation
→ Verification → Deployment cycle.

**Continuous stage** — Runs ongoing after first production deployment (Support).

**Non-Functional Requirement (NFR)** — A quality attribute or constraint
(performance, security, scalability, usability, observability, compliance) that
shapes design and testing.

**Discovery** — Early-stage investigative work to reduce uncertainty. Maps to
the Initiation and Requirements stages.

---

## Future Sections

The following topics will be added to this guide as the framework matures:

- **Greenfield vs. brownfield guidance** — How the framework adapts for new
  projects vs. existing systems
- **Team size adaptation** — How to scale the framework for solo developers,
  small teams, and large organizations

---

## Notes

Added to framework in v0.9.0.
