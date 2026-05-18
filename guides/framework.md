# Framework Guide

## Overview

Cross-cutting concepts that apply across all stages — design principles, roles,
governance, greenfield/brownfield adaptation, and pointers to the authoritative
references for stages, checkpoints, measurement, AI assistance, and
right-sizing.

### Why This Guide

Individual stage guides cover their own scope. Dedicated references cover stages
([stages.md](stages.md)), AI assistance ([ai-assistance.md](ai-assistance.md)),
and right-sizing ([right-sizing.md](right-sizing.md)). This guide is the hub for
concepts that span multiple documents: roles, governance, MoSCoW (Must / Should
/ Could / Won't Have), greenfield/brownfield adaptation, compliance, and key
terms.

### Goals of This Guide

- Define the framework's design principles and key benefits
- Explain cross-stage concepts (MoSCoW, roles, governance, compliance)
- Document greenfield vs. brownfield adaptation
- Link to authoritative references for stages, checkpoints, measurement, AI
  assistance, and right-sizing

### Key Principle

AI as assistant, not replacement — AI is a productivity tool that humans
control.

### How to Use This Guide

1. [**What Is This Framework?**](#what-is-this-framework) — design principles
   and benefits
2. [**How to Use This Framework**](#how-to-use-this-framework) — getting started
   (manual process or application)
3. [**Key Concepts**](#key-concepts) — linked overview of all cross-stage topics
4. Drill into individual concept sections as needed

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

### Key Benefits

- **Lower AI adoption risk** — clear guardrails at every stage prevent costly AI
  missteps in architecture and production
- **Faster project starts** — non-technical stakeholders can initiate projects
  with AI guidance, no process expertise required
- **Consistent governance** — auditable checkpoints satisfy compliance,
  security, and executive oversight needs
- **Scalable across teams** — right-sizing from solo developer to enterprise;
  methodology-agnostic (agile, waterfall, hybrid)
- **Progressive AI adoption** — start Human-Led to build trust, evolve to
  Collaborative and AI-Led as confidence grows

### Who Benefits

- **Engineers** — structured guidance for using AI safely and effectively, with
  clear boundaries at each stage
- **Product Managers and Business Analysts** — initiate and plan projects with
  AI assistance, even without technical expertise
- **Engineering Leaders and Executives** — governance visibility across the
  development lifecycle with auditable checkpoints and measurable success
  criteria
- **Project Managers and Delivery Leads** — structured coordination points at
  every gate and increment boundary, with clear accountability for delivery
  tracking and cross-team dependency management
- **Application Security** — cross-stage security touchpoints from data
  classification through compliance sign-off, with severity-based escalation
  authority. See the [Security Guide](security.md) and
  [AppSec role definition](roles.md#application-security-appsec)
- **Organizations** — a repeatable, scalable approach to AI-assisted development
  that works across teams and methodologies

---

## How to Use This Framework

The AI-Assisted SDLC framework can be used in two ways, depending on whether
dedicated tooling exists for your team.

### Option 1: AI-Assisted Manual Process (Available Now)

Work through the framework by asking your AI assistant to guide you through each
stage. The framework documents provide the structure and concepts; your AI
assistant helps you apply them to your specific project context.

**Getting started:**

See the **[Bootstrap Guide](bootstrap.md)** for setup instructions and a
ready-to-use prompt template. The guide includes:

- Template prompt with project context placeholders
- Two setup approaches (agent-driven and user-driven)
- Example prompts for each stage
- Tips for effective AI collaboration across multiple sessions

**Using this approach:**

1. Start with the Initiation stage
2. Use the Manual Process Guide to engage your AI assistant
3. Work iteratively across multiple sessions as needed (stages aren't
   one-conversation tasks)
4. Complete the brief template for each stage (outputs)
5. Validate with the checklist before proceeding to the next stage
6. Adapt prompts based on your AI tool's capabilities and project needs

**Key principle:** The framework provides the process structure and guidance.
Your AI assistant helps you think through the activities and produce the
artifacts. You remain in control of all decisions and outputs.

### Option 2: Framework Application (Planned)

A dedicated application is planned that would automate framework orchestration —
reading framework documents, generating contextual prompts, managing artifact
progression, and tracking completion across stages.

**Current status:** This application does not exist yet. No timeline is
committed. Use **Option 1: AI-Assisted Manual Process** — it is the production
workflow today, not a stopgap.

If the application is developed, it will complement the manual process as an
accelerator. The framework documents remain the source of truth regardless of
tooling.

---

## Key Concepts

This guide covers the major concepts that structure the framework:

**[SDLC Stages](#sdlc-stages)** — Eight stages across three execution patterns
(foundational, iterative, continuous). Full reference: [stages.md](stages.md).

**[Checkpoint Taxonomy](#checkpoint-taxonomy)** — Three checkpoint types
ensuring quality and alignment. Full reference:
[Checkpoint Taxonomy](checkpoints.md).

**[Measurement Throughline](#measurement-throughline)** — Measurable success
criteria flowing from Initiation through all stages. Full reference:
[stages.md § Measurement](stages.md#measurement-throughline).

**[Learning Throughline](#learning-throughline)** — Pre-mortems at project start
and retrospectives at increment/project boundaries drive continuous improvement.
Full reference: [stages.md § Learning](stages.md#learning-throughline).

**[Mid-Stage Discovery](#mid-stage-discovery)** — Decision tree for handling
discoveries during active work: rework, scope amendment, or defer.

**[Security Throughline](#security-throughline)** — Security activities at every
stage, from data classification through vulnerability management, with AI
automation making baseline security nearly free. Full reference:
[security.md](security.md).

**[MoSCoW Prioritization](#moscow-prioritization)** — Coarse prioritization
(Must/Should/Could/Won't Have) used during Requirements before increment
boundaries are defined.

**[Greenfield vs. Brownfield Projects](#greenfield-vs-brownfield-projects)** —
How the framework adapts for new projects versus extensions to existing systems.

**[CD Workflow Adaptations](#cd-workflow-adaptations)** — How the framework
adapts for projects that deploy continuously per-slice rather than in batches.

**[Right-Sizing Your Process](#right-sizing-your-process)** — Match process
rigor to project risk and team size. Full reference:
[right-sizing.md](right-sizing.md).

**[AI Assistance Overview](#ai-assistance-overview)** — Stage-by-stage gate
requirements and AI autonomy tiers. Full reference:
[ai-assistance.md](ai-assistance.md).

**[Working Locations](#working-locations)** — Three repository locations that
structure where framework guidance, project artifacts, and source code live.

**[Roles and Responsibilities](#roles-and-responsibilities)** — Cross-stage RACI
matrix for stages and gate decisions.

**[Architecture Governance](#architecture-governance)** — Tiered governance
models from self-review (Minimal) to architecture council (Enterprise).

**[Compliance and Regulatory Considerations](#compliance-and-regulatory-considerations)**
— IP, data privacy, audit trails, and emerging AI regulation considerations.

---

## SDLC Stages

The framework defines eight stages across three execution patterns —
foundational (once per project), iterative (per increment), and continuous
(ongoing). For complete stage definitions including inputs, outputs, entry/exit
criteria, stage flow diagrams, and handoffs, see the
[AI-Assisted SDLC Stages](stages.md) reference.

---

## Checkpoint Taxonomy

The framework defines three checkpoint types — each with distinct decision
rights, required evidence, and decision records.

| Type          | When                                                                    | Purpose                                          |
| ------------- | ----------------------------------------------------------------------- | ------------------------------------------------ |
| **Gate**      | End of Initiation (Gate 1), after Requirements + System Design (Gate 2) | Investment decision — proceed, revise, or stop   |
| **Review**    | End of each stage                                                       | Criteria verification — does this meet the bar?  |
| **Alignment** | After System Design                                                     | Stakeholder consensus — are we on the same page? |

For the full taxonomy, per-checkpoint decision-rights matrix, and required
evidence, see the [Checkpoint Taxonomy](checkpoints.md) reference.

---

## The Traceability Chain

The framework's artifacts form a single traceability chain: every requirement,
test, and metric should trace back to a reason it exists. The chain is anchored
by the project's **goals** — the enumerated outcomes defined in the Initiation
Brief.

A goal is the **join point**. From it the chain forks into two branches: a
**measurement branch** (how you will know the outcome happened) and a
**construction branch** (what you will build to make it happen).

```
Business Case            why the project exists, and why now
      │
      ▼
Goal  (G-1, G-2, …)      intended outcomes — not necessarily measurable
      │
      ├───────────────►  Success Criterion (SC-01, …)      ─ measurement branch
      │                    metric + baseline + target;
      │                    the check that verifies the goal
      │
      └───────────────►  Functional Requirement (FR-1, …)  ─ construction branch
                             │
                             ├──►  Acceptance Criterion (AC-1.1, …)
                             │       observable "done" check for the FR
                             │
                             └──►  Non-Functional Requirement
                                     quality bar + verification criteria
```

Five properties of this chain are worth keeping in mind:

1. **The goal is the join point — success criteria and requirements are
   siblings, not a sequence.** Both are projections of the same goal: the
   success criterion projects it onto measurement, the functional requirement
   onto behavior. You do not derive requirements from success criteria; both are
   chosen to serve the goal.
2. **Metrics live on success criteria, not goals.** A goal is a qualitative
   outcome; the metric, baseline, and target belong to the success criterion
   that verifies it. A goal is "measurable" only in the sense that it has
   success criteria.
3. **Acceptance criteria verify construction; success criteria verify outcome.**
   Passing every acceptance criterion proves the requirements were built as
   specified — it does not prove the goal's success criteria were met.
   Construction is confirmed at Verification; the success criteria are confirmed
   later, in production, during Support.
4. **Non-functional requirements are heterogeneous.** Observability NFRs exist
   to make a success criterion measurable; performance and reliability NFRs are
   system-level targets that can serve as an early indicator for a
   performance-flavored success criterion; security and compliance NFRs descend
   from the Initiation Brief's Data Sensitivity and Compliance section — a
   parallel root, not from a goal.
5. **The chain guarantees coverage, not sufficiency.** Tracing every artifact to
   a goal confirms _coverage_ (no success criterion is unowned, no goal is
   unchecked) and _alignment_ (everything serves a stated outcome). It does not
   guarantee that the requirements, once built, will move a success criterion to
   its target — that is an empirical bet, de-risked progressively through the
   pre-mortem, verification, and production monitoring.

Because security and compliance obligations enter through a different door, the
framework has **two roots**, not one:

```
Business Case  ──►  Goals  ──►  Success Criteria / FRs / ACs    outcome chain

Data Sensitivity & Compliance  ──►  Security & Compliance NFRs  constraint chain
```

The outcome chain answers _what value the project delivers_; the constraint
chain answers _what the solution must respect regardless_. Both are established
in the Initiation Brief and meet downstream in Requirements and System Design.

For the dynamic, stage-by-stage view of how success criteria travel this chain,
see the [Measurement Throughline](#measurement-throughline). For a worked
instance of the whole chain on a real feature, see
[Worked Example: The Full Traceability Chain](worked-example.md#the-full-traceability-chain).

---

## Measurement Throughline

For the stage-by-stage breakdown of how success criteria flow from Initiation
through Support, see
[AI-Assisted SDLC Stages § Measurement Throughline](stages.md#measurement-throughline).

---

## Learning Throughline

For the stage-by-stage breakdown of pre-mortems and retrospectives, see
[AI-Assisted SDLC Stages § Learning Throughline](stages.md#learning-throughline).

---

## Mid-Stage Discovery

Discoveries during active stage work are inevitable — a broken assumption, a
small enhancement opportunity, or a large new requirement. When something
unexpected surfaces mid-stage, use this decision tree to determine the right
response rather than defaulting to scope creep or unnecessary ceremony.

### Decision Tree

Assess the discovery's impact to choose the correct path:

1. **Breaks something** (design infeasible, NFR unmet, assumption invalidated) →
   **Assess.** Use the two diagnostic questions below to determine the right
   response — which may range from a localized fix to stopping the project.
2. **Adds something small and safe** (no AC impact, low cost, immediate benefit,
   no new risk) → **Amend.** Record the decision and proceed (see
   [Scope Amendment Criteria](#scope-amendment-criteria)).
3. **Adds something large or risky** (changes ACs, introduces risk, significant
   effort) → **Defer** to the next increment or project backlog.

> **Note:** Amend and Defer are direct actions with defined outcomes. Assess is
> a process — the two diagnostic questions below determine the resolution, which
> may include fixing in place, recording a design change, re-evaluating the
> investment decision, adjusting scope, deferring, or stopping the project.

### Impact Assessment

When a discovery breaks something, answer two independent diagnostic questions
to determine the appropriate response. Both questions are spectrums — not binary
yes/no — and the answers depend on project context: remaining budget, schedule
health, risk appetite, and organizational culture. The framework provides the
questions and factors to consider; practitioners apply judgment.

**Question 1 — Does this change the design?**

Ranges from a localized tweak (rename a function, fix a logic error) to an
architectural shift (replace a core technology, redesign a subsystem). Changes
further along this spectrum are more likely to warrant an Architecture Decision
Record (ADR) to capture the rationale and trade-offs.

**Question 2 — Does this affect the investment assumptions (cost, schedule,
risk)?**

Ranges from negligible impact to project-threatening. A two-day delay on a
healthy eight-week project is noise; the same delay on a project already four
weeks over may be material. Some changes increase cost but also unlock an
opportunity — weigh both sides. Material changes warrant re-evaluating the gate
decision: convene the original decision-makers, present updated evidence, and
record the new decision in the original gate record — even if that decision is
to continue as planned.

**Common combinations:**

The table below shows how the two questions typically map to process responses.
These are illustrative, not prescriptive — use them as a reference, not a
mechanical classifier.

| Design change? | Investment impact? | Process                                                                                               | Example                                                                                            |
| -------------- | ------------------ | ----------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| No             | No                 | Fix in place, update artifact. Non-trivial effort: get R/A approval first.                            | Off-by-one bug; performance refactor within existing design and budget                             |
| No             | Yes                | Re-evaluate gate decision with updated evidence; record new decision in original gate record.         | Service costs 10x assumption — no design alternative, but budget impact requires investment review |
| Yes            | No                 | Record ADR, delta-only brief, update affected artifacts.                                              | Library can't support concurrent writes — swap library within approved budget and timeline         |
| Yes            | Yes                | Record ADR, delta-only brief, re-evaluate gate decision; record new decision in original gate record. | Technology can't meet NFR and replacement blows the budget                                         |

> **Assessment doesn't always mean immediate action.** A gate re-evaluation
> could result in stopping the project or deferring the response to the next
> increment. A design concern might need further investigation before anyone can
> decide. When the right response isn't clear or isn't urgent, capture the
> discovery and the assessment so far, then revisit when more information is
> available.

**Recording guidance:**

- **ADRs** record design decisions — when the design changes, capture what
  changed, why, and what alternatives were considered.
- **Gate record amendments** record investment re-evaluations — when cost,
  schedule, or risk assumptions change materially, re-evaluate the gate decision
  with the original decision-makers and update the gate record with new evidence
  and the resulting decision. Don't reopen the gate from scratch.
- **Delta-only briefs** document only what changed — reference the prior cycle's
  brief for unchanged context rather than duplicating it.

### Scope Amendment Criteria

A discovery qualifies as a scope amendment only when **all four** criteria are
met:

1. **No AC impact** — existing acceptance criteria are unchanged
2. **Small cost** — the addition is low-effort relative to current work
3. **Immediate benefit** — the value is realized in the current increment
4. **No new risk** — no new technical, security, or schedule risk introduced

Record scope amendments in the session log for the current stage. If any
criterion is not met, the discovery requires assessment (if it breaks something)
or deferral (if it adds something large).

### Deferral

When a discovery adds something valuable but large or risky, capture it for
future action rather than absorbing it into the current increment:

- Add the item to the project backlog or parking lot
- If the discovery is a value idea (feature possibility, technical improvement,
  architectural opportunity), tag it in the retrospective's Captured Feedback
  table so it surfaces during the Future Value Candidates harvest at project
  wrap-up (see [Retrospective Template](../templates/retrospective.md))

> **Stage-specific triggers:** Each stage has a "When to Revisit" section with
> triggers specific to that stage's concerns. The decision tree above applies
> universally; stage-specific triggers help you recognize when a discovery has
> occurred.

---

## Security Throughline

For the full stage-by-stage breakdown, AI automation tiers, and NIST SSDF
traceability, see the [Security Guide](security.md).

---

## MoSCoW Prioritization

The framework uses MoSCoW for coarse prioritization at the Requirements stage,
before increment boundaries are known.

**Must Have** — Critical for core value. Without these, the solution cannot be
delivered. Prioritized to the earliest increments.

**Should Have** — Important requirements that **will** be delivered (committed)
in later increments. They add significant value but aren't required for the
earliest increments.

**Could Have** — Desirable if time/resources permit. **Not committed** —
opportunistic. "Build if easy, skip if hard."

**Won't Have** — Explicitly excluded from this project scope. May be deferred to
a future project or dropped entirely. Captured as non-goals to prevent scope
creep.

**Key distinction:**

- Should Have = "We WILL build this, just later" (committed)
- Could Have = "We'd like to, but no commitment" (aspirational)

**How priorities map to increments:** MoSCoW is a prioritization input defined
during Requirements. The **increment plan** is a separate System Design output
that groups and sequences requirements into deliverable increments. During
System Design, the increment plan maps MoSCoW priorities to specific increments:

- Must Have → early increments (Increment 1-2)
- Should Have → later increments, based on dependencies and value
- Could Have → evaluated during implementation
- Won't Have → not included in any increment

---

## AI Assistance Overview

AI assistance levels are bounded and controlled with explicit human gates at
every stage. Teams also choose an AI autonomy tier (Human-Led, Collaborative, or
AI-Led) that adjusts who drives the process. For stage-by-stage gate
requirements, the autonomy spectrum, and operational guidance, see the
[AI Assistance Scorecard](ai-assistance.md).

---

## Working Locations

The framework operates across three types of location: framework (read-only
reference), artifacts (project governance), and source code (project codebase).
A project may span multiple source code repositories. For the full location
model, setup instructions, and the project config file format, see the
[Bootstrap Guide: Working Locations](bootstrap.md#working-locations).

### Artifact Placement

Not all project artifacts stay in the artifacts location. Some are drafted in
the artifacts repo during design stages and then published to the source code
repo when implementation begins. Understanding which artifacts live where — and
when they move — prevents duplication, lost context, and orphaned records.

| Artifact              | Home Location | Notes                                                             |
| --------------------- | ------------- | ----------------------------------------------------------------- |
| Briefs                | Artifacts     | Governance records; stay in artifacts for the project's life      |
| Gate decisions        | Artifacts     | Governance records; stay in artifacts                             |
| Session logs          | Artifacts     | Governance records; stay in artifacts                             |
| Success criteria reg. | Artifacts     | Governance records; stay in artifacts                             |
| Retrospectives        | Artifacts     | Governance records; stay in artifacts                             |
| ADRs                  | Source Code   | Drafted in artifacts; published to source code at Gate 2          |
| Design diagrams       | Source Code   | Snapshot in artifacts; canonical copy in `docs/design/`           |
| Visual designs        | Source Code   | Canonical in team's design tool; gate-frozen exports in `assets/` |
| API contracts         | Source Code   | Drafted during design; canonical copy with owning service         |

> **Snapshot preservation:** Artifact-repo copies of published artifacts (ADRs,
> diagrams) remain as point-in-time records of design-stage decisions. They are
> not deleted or moved — they serve as the governance record of what was decided
> and when.

#### ADR Publishing

ADRs are drafted in the artifacts repo during System Design and published to the
source code repo when implementation begins (Gate 2).

**Draft numbering:** Use a `D` prefix during System Design (`ADR-D001.md`,
`ADR-D002.md`). The prefix makes draft status self-evident and keeps numbering
scoped to the current project's artifacts. The title is in the ADR heading, not
the filename.

**Publishing at Gate 2:** When ADRs move to the source code repo, renumber them
to 4-digit sequential format (e.g., `ADR-D001.md` → `ADR-0023.md`). Update the
artifact-repo copy with a pointer:

> Published as ADR-0023 in [code repo].

**Traceability:** One-directional by default — the artifact-repo copy points
forward to the published ADR. Bidirectional pointers (code repo back to artifact
repo) are optional and useful when a unique project identifier is available
(e.g., platform-enforced project numbers). Without a project identifier,
`ADR-D001` is ambiguous across projects, so the back-reference is omitted.

#### Design Diagrams

System design diagrams follow the same pattern as ADRs: the artifacts repo holds
a snapshot from the design stage, while the canonical copy lives in the source
code repo (e.g., `docs/design/`). Engineers update the canonical copy during
implementation; the artifact-repo snapshot remains untouched as a point-in-time
record.

### Cross-Location Handoff

Stages that cross location boundaries — particularly Implementation (source
code) feeding back to artifacts (briefs, session logs) — require explicit
sync-back of decisions, deferrals, and deviations. Without deliberate handoff,
implementation decisions stay in the engineer's head or in code comments, and
artifacts drift from reality.

For the full protocol — what flows back, sync points, and agent steps — see
[Agentic Workflow Guide: Cross-Location Handoff Protocol](agentic-workflow.md#cross-location-handoff-protocol).

---

## Key Terms

> **Canonical glossary:** This section is the single authoritative source for
> term definitions used across the framework. Stage-level documents link here
> rather than redefining terms.

**Acceptance Criteria (AC)** — Objective, observable conditions that define
"done" for a requirement. Format: Given/When/Then or measurable conditions.

**Architecture Decision Record (ADR)** — A short document capturing a
significant design decision and the reasoning behind it. ADRs are drafted in the
artifacts repo during System Design (using `ADR-DNNN` draft numbering) and
published to the source code repo at Gate 2 (renumbered to `ADR-NNNN`). See
[Artifact Placement: ADR Publishing](#adr-publishing) for the full lifecycle and
the [ADR Template](../templates/adr.md) for the document format.

> **Artifact location note:** Paths like `docs/adr/`, `docs/api/`, and
> `AGENTS.md` refer to project-level artifacts created in your project
> repository when applying this framework. They are not directories shipped
> under `framework/`. See [Working Locations](#working-locations) for how
> framework, artifacts, and source code locations relate.

**Foundational stage** — Executes once per project but can be revisited. Sets
the project foundation.

**Functional Requirement (FR)** — A statement of required system behavior.
Format: "The system shall..." or user story format.

**Gate** — A checkpoint with a real option to stop the project. A genuine
go/no-go investment decision.

**Increment** — A discrete, deliverable chunk of work. A neutral term that maps
to epic, feature, sprint, milestone, or deliverable depending on your
methodology.

**Mid-stage discovery** — Something unexpected that surfaces during active stage
work — a broken assumption, a small enhancement opportunity, or a large new
requirement. See [Mid-Stage Discovery](#mid-stage-discovery) for the decision
tree.

**Iterative stage** — Repeats for each increment in the Increment Design →
Implementation → Verification → Deployment cycle.

**Continuous stage** — Runs ongoing after first production deployment (Support).

**Non-Functional Requirement (NFR)** — A quality attribute or constraint
(performance, security, scalability, usability, observability, compliance) that
shapes design and testing.

**Discovery** — Early-stage investigative work to reduce uncertainty. Maps to
the Initiation and Requirements stages.

**Greenfield project** — A new software project built from scratch with no
existing system, codebase, or infrastructure.

**Brownfield project** — A project that extends, modifies, or enhances an
existing system with established codebase, infrastructure, and constraints.

**CD (Continuous Deployment / Continuous Delivery)** — A delivery practice where
each merged slice is automatically deployed to production. CD changes _when_
iterative stage activities happen (per-slice instead of per-increment), not
_whether_ they happen. See [CD Workflow Adaptations](#cd-workflow-adaptations).

---

## Roles and Responsibilities

See the [Roles and Responsibilities Guide](roles.md) for role definitions, the
RACI matrix, consultation and information protocols, and expanded role guidance
for PjM and AppSec.

### Cadence Mapping

The framework is methodology-agnostic (see [Stage Definitions](stages.md) for
details). The table below shows how stages and gates typically map to common
delivery cadences. For a week-by-week operating view of one increment cycle, see
the [Delivery Operating Guide](delivery-operating-guide.md).

| Framework Element      | 2-Week Sprint              | 1-Week Sprint            | Kanban / Flow              |
| ---------------------- | -------------------------- | ------------------------ | -------------------------- |
| Foundational stages    | Span 1–3 sprints           | Span 2–6 sprints         | Complete before flow start |
| Gate 1                 | End of foundational sprint | End of foundational week | Explicit pull trigger      |
| One increment          | ≈ 1 sprint                 | ≈ 1–2 sprints            | WIP-limited batch          |
| Gate 2 close-out check | End of last increment      | End of last increment    | Explicit pull trigger      |
| Cross-increment sync   | Sprint review / planning   | Weekly sync              | Standup + board review     |

**Notes:**

- Foundational stages often span multiple sprints; do not force them into a
  single iteration.
- One increment maps roughly to one sprint; scope accordingly.
- Track cross-increment dependencies using the
  [Dependency Register](../templates/dependency-register.md).
- Gate 2 close-out check reflects _confirmation_ that Gate 2 criteria remain met
  at project close. The initial Gate 2 decision occurs after Requirements and
  System Design (see
  [Governance at a Glance](../README.md#governance-at-a-glance)).

Security and compliance accountability should be explicit at the checkpoint
level, especially for regulated or enterprise environments:

| Stage / Checkpoint                      | Accountable Role                   | Typical Trigger                                                |
| --------------------------------------- | ---------------------------------- | -------------------------------------------------------------- |
| Initiation (risk and policy framing)    | Project lead + AppSec/compliance   | Sensitive data, regulated domains, external AI tools           |
| Gate 1 / Gate 2 input (risk posture)    | AppSec/compliance (advisory A\*)   | New legal/privacy/security risk exposure                       |
| Verification (control evidence)         | QA/engineering + AppSec/compliance | Security, privacy, or audit controls required for release      |
| Compliance Approval checkpoint          | AppSec/compliance/legal (A)        | Contractual, regulatory, or internal policy sign-off required  |
| Deployment Approval (release readiness) | DevOps/engineering + AppSec (C/A)  | Production change with material risk, data impact, or exposure |

\*Investment gate ownership remains with executive decision-makers; security and
compliance provide required risk and policy input before approval.

---

## Greenfield vs. Brownfield Projects

The framework adapts to both greenfield (new) and brownfield (existing) projects
by normalizing the experience: **both project types converge at the same point
where working infrastructure exists and feature delivery can proceed
consistently**.

### Definitions

**Greenfield project** — Building a new system from scratch. Everything must be
created: codebase, infrastructure, CI/CD pipelines, deployment systems,
monitoring, and observability. Examples: new product launch, startup MVP,
internal tool for new capability.

**Brownfield project** — Extending or enhancing an existing system. The codebase
exists, infrastructure is in place, and there are established patterns,
constraints, and technical debt. Examples: adding features to production
application, modernizing legacy system, migrating to new architecture. Note that
a brownfield "codebase" may span multiple repositories and include business
logic in database-layer artifacts (stored procedures, triggers, views).

**Brownfield projects have two scenarios:**

- **First AI-assisted project:** System exists but architecture, infrastructure,
  and conventions are not documented for AI use. Requires discovery and
  documentation (similar to greenfield bootstrap).
- **Subsequent AI-assisted projects:** AI context exists from prior work. Can
  proceed directly to feature delivery.

### Key Principle

**Greenfield projects invest foundation work in establishing infrastructure;
brownfield first AI-assisted projects invest foundation work in discovering and
documenting existing systems.** The scope of brownfield foundation work varies
along a scored readiness spectrum (T0-T5) — from codebases that need only a
discovery pass to those requiring dedicated enablement programs. See the
[Brownfield Preparation Guide](brownfield.md) for the full
assessment-to-enablement process. After foundation work (where applicable), all
project types deliver features using the same iterative cycle.

### How the Framework Adapts

The framework's 8 stages apply to both project types, but activities and
emphasis differ:

| Stage                                   | Greenfield                                | Brownfield (First AI)                                                                                                                                                     | Brownfield (Has Context)                          |
| --------------------------------------- | ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------- |
| **Initiation**                          | Define vision and objectives from scratch | Understand existing system + define new goals                                                                                                                             | Understand existing system + define new goals     |
| **Requirements**                        | All requirements are new                  | New requirements + existing system constraints                                                                                                                            | New requirements + existing system constraints    |
| **System Design**                       | Full architecture + infrastructure plan   | Assess existing + plan discovery for foundation work                                                                                                                      | Adapt/extend architecture + assess infrastructure |
| **Increment Design**                    | Plan bootstrap increment details          | Plan discovery increment details                                                                                                                                          | Plan first feature increment details              |
| **Increment 0 (bootstrap / discovery)** | **Establish infrastructure** (bootstrap)  | **Discover, document, and prepare** (scope depends on [readiness](brownfield-readiness.md#readiness-rubric)) (not a separate stage — executed using the iterative stages) | N/A — proceed directly to feature delivery        |
| **Increment 1+**                        | Deliver features with established infra   | Deliver features with established infra + documented context                                                                                                              | Deliver features with established infra           |
| **Support**                             | Monitor new system                        | Monitor changes, consider existing user base                                                                                                                              | Monitor changes, consider existing user base      |

### Project Foundation

> For a practical walkthrough of foundation activities — including sequencing,
> infrastructure planning by project type, brownfield requirements constraints,
> and links to stage-specific setup guides — see the
> [Project Foundation Guide](project-foundation.md).

**Greenfield** projects invest foundation work in a **bootstrap increment** —
establishing CI/CD, environments, monitoring, and deployment from scratch.

**Brownfield (first AI-assisted)** projects invest foundation work in a
**discovery increment** — documenting architecture, infrastructure, and
conventions for AI context. When discovery reveals deeper gaps, foundation may
extend into active enablement. See the
[Brownfield Preparation Guide](brownfield.md) for the full process.

**Brownfield (subsequent)** projects require no foundation work — proceed
directly to feature delivery.

### When Both Types Converge

After foundation work (where applicable), **both greenfield and brownfield
projects operate identically** — infrastructure is established, and feature
delivery follows the same iterative cycle.

---

## CD Workflow Adaptations

Continuous Deployment (CD) deploys every merged slice to production
automatically rather than batching slices into a discrete deployment event. The
framework supports CD by treating it as a delivery practice modifier — CD
changes _when_ iterative stage activities happen (per-slice instead of
per-increment), not _whether_ they happen.

### CD Is a Delivery Practice, Not a Risk Tier

CD is orthogonal to the three risk tiers (Minimal, Standard, Enterprise). A
project can be Minimal+CD or Enterprise+CD. The risk tier determines _what_
practices you adopt; CD determines _when_ they execute. The 3-tier model is
unchanged — CD simply shifts the execution cadence from batch to continuous for
the iterative stages.

### How CD Changes Stage Timing

| Stage          | Batch (default)                 | CD                                         |
| -------------- | ------------------------------- | ------------------------------------------ |
| Implementation | All slices, then increment gate | Per-slice gate (PR + CI); summary at close |
| Verification   | Batch verification after code   | Per-slice CI; increment-close summary      |
| Deployment     | Discrete deployment event       | Per-merge automated pipeline               |
| Support        | Handoff after deployment        | Monitoring active from first deploy        |

Foundational stages (Initiation, Requirements, System Design, Increment Design)
are unaffected — CD applies only to the iterative execution stages.

### When Stages Can Be Folded

CD doesn't skip stages — it folds their concerns into the continuous flow. When
the CD pipeline fully automates a stage's activities (e.g., deployment is a
zero-touch pipeline, support monitoring is active from the first deploy), the
stage's per-increment ceremony can be folded into the continuous workflow.

When folding Deployment or Support, record the rationale using the
[Checkpoint Decision Template](../templates/checkpoint-decision.md). Include
re-evaluation triggers so the team revisits the decision if conditions change
(e.g., a breaking migration requires manual deployment coordination).

### Stage-Specific CD Guidance

Each iterative stage includes a CD subsection with stage-specific adaptations:

- [Implementation: CD Projects — Per-Slice Gates](../stages/implementation/README.md#cd-projects-per-slice-gates)
- [Verification: CD Projects — Lightweight Verification](../stages/verification/README.md#cd-projects-lightweight-verification)
- [Deployment: CD Projects — Minimal Deployment](../stages/deployment/README.md#cd-projects-minimal-deployment)
- [Support: CD Projects — Minimal Support](../stages/support/README.md#cd-projects-minimal-support)

For how CD interacts with right-sizing tiers, see
[Right-Sizing Guide: CD as a Delivery Practice Modifier](right-sizing.md#cd-as-a-delivery-practice-modifier).

---

## Right-Sizing Your Process

Right-sizing has three independent dimensions: **project risk tier** (Minimal,
Standard, Enterprise) determines _what_ practices you adopt, **team size**
determines _how formally_ you apply them, and **AI autonomy tier** (Human-Led,
Collaborative, AI-Led) determines _how much AI involvement_ you allow. The
framework's eight stages remain the same regardless — what changes is formality,
documentation detail, and coordination. For the full model, tier definitions,
team-size guidance, and choosing criteria, see the
[Right-Sizing Guide](right-sizing.md).

---

## Architecture Governance

Right-size architecture governance to your team and project tier:

| Tier       | Review Forum               | ADR Approval          | Design Review              |
| ---------- | -------------------------- | --------------------- | -------------------------- |
| Minimal    | Self-review or pair review | Author + one reviewer | Informal, async comment    |
| Standard   | Team PR review or design   | Tech lead sign-off    | Weekly design meeting      |
|            | sync                       |                       |                            |
| Enterprise | Architecture council       | Council vote or       | Formal design review board |
|            |                            | delegate              |                            |

### Architecture Council (Enterprise Tier)

For Enterprise-tier projects, establish a formal architecture council:

- **Membership:** Tech leads, principal engineers, security representative, and
  (optionally) a compliance representative
- **Meeting cadence:** Bi-weekly or monthly, depending on project velocity and
  volume of architecture decisions
- **Decision authority:** ADR approval, technology stack changes, cross-team API
  contracts, and significant infrastructure decisions
- **Escalation path:** Deadlocked decisions escalate to VP Engineering or CTO
  with a written summary of positions and trade-offs

### When Architecture Review Is Triggered

Not every change needs formal review. Use this guide:

| Change Type                  | Minimal     | Standard    | Enterprise     |
| ---------------------------- | ----------- | ----------- | -------------- |
| New external dependency      | Self-review | Tech lead   | Council review |
| API contract change          | Self-review | Team review | Council review |
| Database schema change       | Self-review | Tech lead   | Team review    |
| New service or component     | Self-review | Design sync | Council review |
| Technology stack change      | N/A         | Tech lead   | Council vote   |
| Security architecture change | Self-review | AppSec +    | Council +      |
|                              |             | tech lead   | AppSec         |

---

## Compliance and Regulatory Considerations

AI-assisted development introduces specific compliance considerations that
organizations should evaluate before adoption.

### Key Considerations

- **IP and licensing:** AI-generated code may have licensing implications. Human
  review at every stage mitigates this risk. Establish a policy on AI-generated
  code ownership and attribution.
- **Data privacy:** AI assistants process project context. Verify that your AI
  tool's data handling meets your compliance requirements before use — check
  data residency, training data opt-out policies, and data retention terms.
- **Audit trail:** The framework's gate decisions, checklists, and briefs create
  a natural audit trail of human decision-making at every stage. This is
  valuable for regulatory audits and compliance reviews.
- **Liability:** Human validation at all checkpoints maintains human
  accountability for all outputs. AI generates; humans approve.

### Enterprise-Tier Controls

Organizations in regulated industries (healthcare, finance, government) should
use the Enterprise risk tier, which adds formal gates for security review,
compliance validation, and Change Advisory Board approval. See
[Right-Sizing Guide](right-sizing.md) for tier definitions.

### AI-Specific Policies

An AI usage policy defines the organizational boundaries for using AI tools in
development. It typically covers approved tools, data boundaries (what can and
cannot be shared with AI), code review standards for AI-generated output, and
disclosure rules. Without a policy, teams risk data leakage, IP exposure,
inconsistent tooling choices, and regulatory gaps. A one-page policy covering
these four areas is sufficient to start — the checklist below can serve as a
template.

Before adopting the framework, ensure your organization has addressed:

- [ ] **AI usage policy** — which AI tools are approved, what data can be shared
      with them, and what restrictions apply
- [ ] **Code review standards** — how to review AI-generated code (same
      standards as human code, with additional attention to licensing and
      security)
- [ ] **Data classification** — which project data can be used as AI context and
      which must be excluded
- [ ] **Disclosure requirements** — whether AI-assisted development must be
      disclosed to customers, regulators, or auditors

### Emerging AI Regulation

Monitor applicable AI regulations (e.g., EU AI Act) for any disclosure or
documentation requirements for AI-generated software artifacts. The framework's
audit trail and human-in-the-loop design position teams well for emerging
regulatory requirements.

---

## Notes

**Last Updated:** 2026-05-18

Added to framework in v0.9.0. Visual designs row added to Artifact Placement
table in v0.44.0. Traceability Chain section added in v0.45.0.
