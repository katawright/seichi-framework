---
id: system-design
inputs:
  - requirements-brief
  - non-functional-requirements
  - success-criteria-register
outputs:
  - artifact: system-design-brief
    template: templates/system-design-brief.md
  - artifact: architecture-diagrams
    embedded_in: system-design-brief
  - artifact: technology-stack-adrs
    template: templates/adr.md
  - artifact: data-api-architecture
    embedded_in: system-design-brief
  - artifact: infrastructure-plan
    embedded_in: system-design-brief
  - artifact: security-approach
    embedded_in: system-design-brief
  - artifact: observability-strategy
    embedded_in: system-design-brief
  - artifact: increment-plan
    embedded_in: system-design-brief
  - artifact: gate-2-decision-package
    template: templates/gate-decision.md
checkpoints:
  - type: alignment
    protocol: alignment-review
    name: "Architecture Review"
    responsible_roles: [arch, appsec]
  - type: gate
    protocol: human-approval
    name: "Gate 2 (Investment Decision)"
    responsible_roles: [pm, arch, appsec]
    accountable_role: [exec]
checklist: stages/system-design/checklist.md
reference: stages/system-design/reference.md
working_location: artifacts
session_log_template: templates/session-log.md
raci_roles:
  { R: [arch], A: [arch], C: [pm, eng, qa, devops, appsec, pjm], I: [exec] }
---

# AI-Assisted SDLC: System Design Stage

## Overview

Practical guidance for establishing or assessing system architecture, technology
choices, infrastructure plans, and increment roadmaps that guide all
implementation work.

### Why System Design

System Design turns _what we need to build_ (Requirements) into _how we will
build it_ at the architectural level — the system structure, technology choices,
conventions, and increment order that every later stage builds within. Without
it, teams jump straight to coding with no architecture, no increment plan, and
no infrastructure — leading to costly rework, security afterthoughts, and budget
surprises. System Design exists to answer: _"How should we build this, and in
what order?"_

> **Altitude:** System Design works at _architectural_ altitude — whole-system
> decisions made once. It sets architecture and conventions but does not design
> individual features; that is
> [Increment Design](../increment-design/README.md)'s altitude, one increment at
> a time. See [Stage Altitude](../../guides/stages.md#stage-altitude) for how
> every stage's abstraction and scope line up.

### Goals of This Guide

- Provide stage-specific guidance and rationale for System Design
- Describe how AI assists at each activity
- Explain right-sizing System Design effort to project complexity
- Guide practitioners from requirements to Gate 2 decision

### Key Principle

Architecture decisions made here have the highest blast radius of any stage —
they affect every component, every increment, and every team member. Getting
them right (and documenting them in ADRs) is the highest-leverage technical
activity in the SDLC. For the full stage definition (purpose, roles,
inputs/outputs, entry/exit criteria, and gate details), see
[Framework Stages: System Design](../../guides/stages.md#stage-3-system-design).

### Starting Point

Three upstream artifacts feed into System Design:

- **[Requirements Brief](../../templates/requirements-brief.md)** — with MoSCoW
  priorities and acceptance criteria
- **Non-Functional Requirements** — performance, security, scalability, and
  other quality attributes (in the
  [Requirements Brief](../../templates/requirements-brief.md#non-functional-requirements))
- **[Success Criteria Register](../../templates/success-criteria-register.md)**
  — measurable success criteria requiring instrumentation

For brownfield first AI-assisted projects, also gather existing architecture
documentation, ADRs, infrastructure configuration, and known technical debt.

> This stage operates from the **artifacts location**. See
> [Working Locations](../../guides/framework.md#working-locations).

### How to Use This Guide

1. Read [**How AI Helps**](#how-ai-helps) to determine your operating posture
   (see the Operating Model Guide)
2. Read [**Right-Sizing System Design**](#right-sizing-system-design) to
   calibrate effort to your project's risk tier
3. Fill out the
   [System Design Brief Template](../../templates/system-design-brief.md) using
   AI according to your operating posture — refer to
   [**Why These System Design Elements Matter**](#why-these-system-design-elements-matter)
   for rationale as you complete each section. See the
   [Bootstrap Guide](../../guides/bootstrap.md) for prompting tips
4. Review the brief for correctness — you own the final content
5. Complete the [System Design Checklist](checklist.md) using AI according to
   your operating posture
6. Complete Gate 2 — present to stakeholders and record the proceed/revise/stop
   decision using the [Gate Decision Template](../../templates/gate-decision.md)

> **See a completed example:** The
> [Worked Example: System Design](../../guides/worked-example.md#stage-3-system-design)
> shows a finished brief for calibration.

For cross-cutting framework concepts, see
[Framework Guide](../../guides/framework.md).

---

## How AI Helps

AI can assist with System Design at whatever autonomy level your team is
comfortable with — from suggesting patterns to driving the entire architecture
exploration.

How autonomously this stage runs — who performs the work and who decides — is an
operating-model choice, not a fixed property of the stage. It is set per project
(with per-stage overrides) along two functions: **Work Execution** (Humans ·
Collaborative · Agents) and **Authority** (interactive human · pre-authorized
policy · delegated agent). Gate requirements always apply regardless. See the
[Operating Model Guide](../../guides/operating-model.md).

### AI Assistance Patterns

- **Architecture exploration:** Describe your requirements and constraints — an
  agent generates multiple architecture options with trade-off analysis
- **Technology evaluation:** An agent researches pricing, compares frameworks,
  and drafts ADRs with cost analysis
- **Diagram generation:** An agent produces diagram-as-code (Mermaid, PlantUML)
  as first drafts — layout and details typically need human refinement before
  publication
- **Increment planning:** An agent maps MoSCoW priorities to increments,
  identifies dependencies, and estimates effort ranges

For assistance level details, see the
[Operating Model Guide](../../guides/operating-model.md).

> **Required gates:** Alignment + gate (human approval) — System Design produces
> foundational decisions with high blast radius, requiring architecture council
> or tech lead sign-off, security review, and explicit rollback plans.

---

## Right-Sizing System Design

Not every project needs a formal architecture document or comprehensive ADRs.
Match your System Design effort to your project's risk tier.

| Practice                | Minimal                              | Standard                                      | Enterprise                                           |
| ----------------------- | ------------------------------------ | --------------------------------------------- | ---------------------------------------------------- |
| **Architecture docs**   | Informal notes or diagrams           | Architecture document with key diagrams       | Formal architecture review with stakeholder sign-off |
| **ADRs**                | Mental notes or brief chat messages  | ADRs for major technology and design choices  | Comprehensive ADRs with alternatives analysis        |
| **Technology choices**  | Pick what you know, document briefly | Evaluate options, document rationale          | Formal evaluation matrix, proof of concepts          |
| **Security design**     | Basic security awareness             | Threat model for key areas, security baseline | Comprehensive threat model, compliance mapping       |
| **Infrastructure plan** | Simplest viable hosting              | Environment strategy, basic IaC               | Multi-environment, HA design, disaster recovery      |
| **Increment plan**      | Ordered task list                    | Sequenced increments with dependencies        | Formal roadmap with cross-team coordination          |

Expand System Design only when needed:

- **Multi-service architecture:** Add service interaction diagrams, API
  contracts, deployment topology
- **High availability / performance:** Add capacity planning, failover design,
  SLO architecture
- **Security-sensitive / compliance:** Add comprehensive threat model,
  compliance mapping, audit controls
- **Multi-team coordination:** Add cross-team interface contracts, shared
  component ownership
- **Complex data architecture:** Add data flow diagrams, migration strategy,
  consistency models

Otherwise, keep design lightweight and move to Increment Design.

> These triggers help you decide when to move from Minimal to Standard or
> Enterprise. For full tier definitions and choosing criteria, see the
> [Right-Sizing Guide](../../guides/right-sizing.md).

---

## Why These System Design Elements Matter

Each section of the System Design Brief exists because skipping it causes
predictable failures. This section explains why each element is included,
ordered to match the
[System Design Brief Template](../../templates/system-design-brief.md) sections:

1. [**Architecture Principles**](#architecture-principles) — foundational design
   guardrails (§1 System Architecture Overview)
2. [**Architecture Decision Records (ADRs)**](#architecture-decision-records-adrs)
   — significant decisions captured (§2)
3. [**Technology Selection**](#technology-selection) — justified choices with
   cost research (§3 Technology Stack)
4. [**System-Level Interface Contracts**](#system-level-interface-contracts) —
   API boundaries for parallel work (§5 API Architecture)
5. [**Cross-Cutting Concerns**](#cross-cutting-concerns) — security,
   performance, observability traceability (§6 Security and Compliance Design)
6. [**Observability and Monitoring Design**](#observability-and-monitoring-design)
   — instrumentation strategy and success criteria measurement (§7)
7. [**Performance and Scalability Design**](#performance-and-scalability-design)
   — performance targets and scaling approach (§8)
8. [**NFR Traceability**](#nfr-traceability) — mapping non-functional
   requirements to architectural decisions and verification methods (§9)
9. [**Versioning Strategy**](#versioning-strategy) — app and API versioning,
   release tagging, changelogs (§10)
10. [**Creating Increment Plans**](#creating-increment-plans) — sequenced
    delivery roadmap (§11)
11. [**Infrastructure Planning**](#infrastructure-planning) — CI/CD,
    environments, deployment (§12)
12. [**Design Documentation**](#design-documentation) — architecture diagrams
    and decision records
13. [**Additional Topics**](#additional-topics) — deep-dive reference pointer

### Architecture Principles

Architecture principles prevent "Big Ball of Mud" designs where components are
tightly coupled and boundaries are unclear. Without agreed principles, each
developer makes independent structural decisions that compound into an
inconsistent codebase — making changes expensive and AI assistance less
effective.

Follow established principles — SOLID, Separation of Concerns, DRY, YAGNI, KISS
— when making design decisions. Consult your team's standards or ask your AI
agent for guidance.

### Architecture Decision Records (ADRs)

ADRs document significant decisions and reasoning. They are **separate project
files** — drafted in the artifacts repo during System Design and published to
the source code repo at Gate 2.

**Create an ADR only when a decision meets _all three_ criteria:**

- **Significant:** Impacts multiple components
- **Hard to reverse:** Changing later is costly
- **Contested:** Multiple viable options with trade-offs

All three must hold. The common failure mode is drafting an ADR for a decision
that is significant and contested but **cheap to reverse** — that is a **design
note** (a numbered subsection in the System Design Brief), not an ADR. The
discriminator: **separate the durable decision from its swappable
implementation** — ADR the part that is hard to undo; design-note the specifics
you could swap later behind a stable contract.

Recurring cases that are **design notes, not ADRs**:

- an additive, single-consumer API field;
- an implementation choice behind a stable contract or port;
- a "we chose not to change / not to build X yet" deferral (no commitment
  introduced);
- a deliverable artifact (a rubric, an increment plan).

Key sections: Context, ADR criteria justification, options considered (with cost
analysis), decision and rationale, consequences, alternatives.

**Draft numbering:** Use a `D` prefix with a two-digit counter during System
Design: `ADR-DCC.md` (e.g., `ADR-D01.md`, `ADR-D02.md`). The title is in the ADR
heading, not the filename. The prefix makes draft status self-evident and keeps
numbering scoped to the current project's artifacts.

**Template:** [ADR Template](../../templates/adr.md)

**Location during System Design:** Store draft ADRs in `docs/adr/` within the
artifacts repo. At Gate 2, accepted ADRs are promoted to the workspace ADR canon
(top-level `adrs/` in the artifacts location) and renumbered to the
project-id-scoped format (`ADR-NNNN-CC.md`). See
[Artifact Placement: ADR Publishing](../../guides/framework.md#adr-publishing)
for the full publishing workflow.

**Critical:** ADRs must include cost research to prevent budget surprises.

#### ADR Workflow Checklist

End-to-end flow from draft to publication:

1. **Draft** — Create ADRs using the [ADR template](../../templates/adr.md) with
   draft numbering (`ADR-DCC.md`) in `docs/adr/`.
2. **Record in brief** — List all ADRs in the System Design Brief's
   [ADR section](../../templates/system-design-brief.md#2-architecture-decision-records-adrs)
   with status and category.
3. **Review** — ADRs are reviewed as part of the Architecture Review checkpoint
   (see [Checkpoints](../../guides/checkpoints.md)).
4. **Publish at Gate 2** — Promote accepted ADRs from draft (`ADR-DCC.md`) to
   the project-id-scoped final form (`ADR-NNNN-CC.md`) in the workspace ADR
   canon and update the canon index at `adrs/README.md`. See
   [ADR Publishing](../../guides/framework.md#adr-publishing).

#### ADR Lifecycle

ADRs follow a propose → review → approve → record → evolve lifecycle:

1. **Propose:** Author creates an ADR with status "Proposed" and opens a review
   (PR, design meeting, or async comment thread)
2. **Review:** Right-size the review forum to your tier:
   - Minimal: Self-review or pair discussion
   - Standard: Team review via PR or design meeting
   - Enterprise: Architecture council or tech lead board
3. **Approve:** Reviewers accept; author updates status to "Accepted" and
   records who decided
4. **Record:** ADR is merged to version control alongside code
5. **Evolve:** When a decision is superseded, create a new ADR and set the
   original's status to "Superseded by ADR-XXX"

**Status values:**

- **Proposed:** Decision is under consideration
- **Accepted:** Decision has been approved and will be/is being implemented
- **Deprecated:** Decision is no longer relevant but not superseded
- **Superseded by ADR-XXX:** This decision has been replaced by a newer decision

#### Tips for Writing Good ADRs

1. **Be concise but complete** — capture enough context for future engineers to
   understand why
2. **Document alternatives** — show what you considered and why you chose this
   path
3. **Include costs** — research and document infrastructure/tooling costs
4. **Explain trade-offs** — be honest about what you're accepting/rejecting
5. **Update status** — mark as Deprecated or Superseded when decisions change
6. **Link from brief** — reference ADRs from your system-design-brief,
   increment-design-brief, or implementation-brief
7. **Version control** — commit ADRs alongside code; they're part of your
   project history
8. **Use the "reasonable engineer test"** — if a reasonable engineer might ask
   "why this instead of alternatives?", document it

#### Referencing ADRs from Briefs

In your `system-design-brief.md` (System Design stage — draft numbering):

```markdown
## Technology Stack

**Database:** PostgreSQL 15 (see [ADR-D01](adr/ADR-D01.md)) **File Upload:**
Presigned URLs with object storage (see [ADR-D02](adr/ADR-D02.md))
**Authentication:** JWT tokens (see [ADR-D03](adr/ADR-D03.md))

For detailed rationale, alternatives, and cost analysis, see ADRs in
`docs/adr/`.
```

In your `implementation-brief.md` (Implementation stage):

```markdown
## Key Implementation Decisions

| #   | Decision                               | Type    | ADR         | Date       |
| --- | -------------------------------------- | ------- | ----------- | ---------- |
| 1   | Use Builder pattern for PaymentRequest | Pattern | ADR-0012-01 | 2024-02-10 |
| 2   | Cache user permissions for 5 minutes   | Caching | ADR-0012-02 | 2024-02-10 |
```

### Technology Selection

Evaluate team skills, organizational standards, requirements fit, ecosystem
maturity, maintainability, performance/scalability, and security/compliance when
choosing technologies.

**Cost research is mandatory** — research pricing BEFORE selecting technology.
Document costs in ADRs.

> For detailed evaluation criteria, cost research guidance, and common
> trade-offs, see
> [System Design Reference: Technology Selection](reference.md#technology-selection-details).

### System-Level Interface Contracts

For multi-service or multi-team architectures, define formal interface contracts
at System Design to enable parallel increment work.

**When contracts are needed:**

- Multiple services communicate over an API boundary
- Multiple teams develop components in parallel
- External parties will consume the API

**Recommended formats:**

- REST APIs: OpenAPI (YAML/JSON)
- Event-driven: AsyncAPI
- RPC: protobuf / gRPC
- Internal schemas: JSON Schema

**Storage and governance:**

- Store contracts in `docs/api/` or alongside the owning service
- Version contracts using semantic versioning
- Treat contract changes as ADR-worthy decisions
- Increment Design contracts are refinements of system-level contracts

### Cross-Cutting Concerns

The following concerns apply across all stages. Define your approach at System
Design and trace it through implementation and verification:

| Concern             | Define at           | Verify at               | Framework Reference                                                                                                       |
| ------------------- | ------------------- | ----------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| Security            | System Design       | Verification            | [System Design Brief](../../templates/system-design-brief.md) (Security section) + Verification Checklist (security gate) |
| Performance         | System Design       | Verification            | [Requirements Brief](../../templates/requirements-brief.md) (NFR section)                                                 |
| Observability       | Requirements/Design | Operations              | [Measurement Throughline](../../guides/framework.md#measurement-throughline)                                              |
| Accessibility       | Requirements        | Verification            | Verification Checklist                                                                                                    |
| Resilience          | System Design       | Verification/Operations | [System Design Brief](../../templates/system-design-brief.md) (Rollback and DR sections)                                  |
| Data privacy        | System Design       | Verification            | [System Design Brief](../../templates/system-design-brief.md) (Compliance section)                                        |
| Visual architecture | System Design       | Verification            | [Visual Architecture](#visual-architecture) + Verification Checklist                                                      |

### Visual Architecture

For UI-bearing systems, design-language decisions — design system, component
library, design tokens, theming, responsive strategy — deserve explicit
treatment during System Design. Left to Implementation, these decisions happen
by accident and become expensive to unify later.

**ADR candidates:** design system or component library selection, token scales
and naming, theming approach, responsive breakpoints, accessibility baseline
(e.g., WCAG 2.2 AA). Capture each as an ADR alongside technical architecture
decisions.

**Artifact capture:** canonical live work stays in the team's design tool (e.g.,
Figma, Sketch, Penpot) and is linked from the System Design Brief. Gate-relevant
frozen frames — such as the mockup Gate 2 approved — get exported to an
`assets/` folder in the source-code repo so the governance record survives
upstream edits. Prototypes stay as external links; they don't belong in the
repo. See the [Artifact Placement](../../guides/framework.md#artifact-placement)
table for where visual design artifacts live alongside other project outputs.

These decisions translate to testable criteria at Verification — visual
regression tests, WCAG audits, and brand-compliance checks.

### Observability and Monitoring Design

Designing observability into the system from the start ensures that production
issues can be detected, diagnosed, and resolved quickly. This includes logging
strategy, metrics collection, alerting thresholds, and dashboard design. Without
upfront observability design, teams add monitoring reactively after incidents,
leaving gaps in coverage during the most critical early production period. See
[System Design Reference: Observability](reference.md#observability-and-monitoring-design)
for detailed guidance.

### Performance and Scalability Design

Performance targets and scalability approaches must be defined during system
design, not discovered during load testing. This section captures response time
targets, throughput requirements, caching strategy, database optimization
approach, and scaling triggers. Defining these early ensures that architecture
decisions account for load characteristics and that verification has concrete
targets to test against. See
[System Design Reference: Performance](reference.md#performance-and-scalability-design)
for detailed guidance.

### NFR Traceability

Map each non-functional requirement from the
[Requirements Brief](../../templates/requirements-brief.md) to the architectural
decision that addresses it and the verification method that will confirm it.
Create one row per NFR in the
[System Design Brief](../../templates/system-design-brief.md) NFR Traceability
table, linking each to the relevant ADR. The Verification stage uses this table
to confirm every NFR has been tested — gaps here become gaps in test coverage.

### Versioning Strategy

Define how you version your software, APIs, and releases. This is most relevant
for greenfield projects; brownfield projects with existing conventions should
document and follow them.

- **App versioning:** Semantic Versioning (MAJOR.MINOR.PATCH), CalVer, or
  project-specific scheme. Choose based on release cadence and audience
  expectations.
- **API versioning:** URL path (`/v1/`), header-based, or query parameter.
  Decide on backward compatibility guarantees and deprecation policy.
- **Release tagging:** Git tag convention (e.g., `v1.2.3`), branch strategy for
  releases, and relationship between tags and deployments.
- **Changelog approach:** Automated from commit history, manually curated, or
  hybrid. Define audience (developers, end users, or both) and update cadence.

Document versioning decisions as ADRs when they involve trade-offs (e.g.,
choosing between URL-based and header-based API versioning).

### Creating Increment Plans

The increment plan is a **key output of System Design**. It maps MoSCoW
priorities from Requirements to specific, deliverable increments. See
[Framework Guide: MoSCoW](../../guides/framework.md#moscow-prioritization) for
priority definitions.

#### Planning Best Practices

- **Use range-based estimates:** Express duration and effort as ranges (e.g.,
  1.5-2.5 weeks), not single points
- **Deliver value incrementally:** each increment ships something usable
- **Build foundations first:** auth, database, API framework before features
- **De-risk early:** technically uncertain work in early increments
- **Allow for discovery:** don't over-plan distant increments
- **Make Could Haves truly optional:** don't commit in timelines
- **Articulate value per increment:** state what users or the project gains when
  the increment ships

#### Planning Process

1. **Review requirements** — all FRs, NFRs, MoSCoW priorities, acceptance
   criteria
2. **Identify dependencies** — which requirements depend on others?
3. **Determine Increment 0 need** — greenfield projects require a bootstrap
   Increment 0; brownfield first AI-assisted projects require a discovery
   Increment 0; subsequent brownfield projects skip directly to Increment 1
4. **Assess risk and complexity** — uncertain items first
5. **Group into increments** — Must Haves first, delivering testable value;
   articulate the value each increment delivers to users or the project
6. **Sequence increments** — dependencies first, then risk/value balance
7. **Map Should Haves** — assign to later increments
8. **Handle Could Haves** — mark as opportunistic
9. **Document Won't Haves** — explicitly list exclusions
10. **Estimate duration and effort as ranges**
11. **Calculate cost range for Gate 2** — effort x blended rate, compare to
    Initiation estimates

> For increment sizing guidance, estimation techniques, and methodology-specific
> examples, see
> [System Design Reference: Increment Sizing](reference.md#increment-sizing-guidance)
> and [Estimation](reference.md#increment-estimation-guidance).

> **Gate 2:** The increment plan feeds into the Gate 2 Decision Package in the
> [System Design Brief Template](../../templates/system-design-brief.md#gate-2-decision-package).
> Record the proceed/revise/stop decision using the
> [Gate Decision Template](../../templates/gate-decision.md).

### Infrastructure Planning

Infrastructure planning is a **required output** of System Design. The goal is
to ensure working development, testing, deployment, and monitoring
infrastructure exists before feature delivery begins.

**Greenfield projects:** Infrastructure must be created. Increment 0 becomes the
**bootstrap** increment establishing CI/CD, environments, monitoring, and
deployment automation. Feature delivery begins at Increment 1.

**Brownfield projects (first AI-assisted):** Increment 0 focuses on **discovery
and documentation** — capturing existing architecture, infrastructure, and
conventions for effective AI assistance. Feature delivery begins at Increment 1.

**Brownfield projects (subsequent):** No Increment 0 is needed. Increment 1
proceeds to **feature delivery**, using and updating existing documentation.
Infrastructure adaptations are included within feature increments.

**Feature flags for brownfield modifications:** When modifying existing
endpoints or shared components, consider feature flags to de-risk the change —
new behavior deploys dark, validates in production, and replaces the old path
only after confirmation. For flags that span multiple increments, create an ADR
documenting the flag lifecycle, cleanup timeline, and ownership.

Infrastructure decisions are architectural decisions and must be documented in
ADRs.

> For detailed greenfield/brownfield planning outputs, discovery approach,
> infrastructure ADR examples, and anti-patterns, see
> [System Design Reference: Infrastructure Planning](reference.md#infrastructure-planning).

### Design Documentation

#### What to Document

- **Architecture diagrams:** System context, container, component (C4 model
  recommended)
- **Technology decisions:** Stack choices with justification (ADRs)
- **Data and API architecture:** ER diagrams, API conventions, integration
  patterns
- **Increment plan:** Increment definitions with requirements mapping

**C4 diagram levels and when to use them:**

| Level     | What it shows              | When required                 |
| --------- | -------------------------- | ----------------------------- |
| Context   | System and external actors | Always (all tiers)            |
| Container | Major deployable units     | Standard and Enterprise       |
| Component | Internal structure         | Enterprise or complex systems |
| Code      | Class/function level       | Rarely needed; use sparingly  |

For Minimal-tier projects, a whiteboard context sketch is sufficient. Use
Mermaid or PlantUML for diagram-as-code.

#### Documentation Principles

- Keep docs in version control alongside code
- Document architecture and key decisions; code should be self-explanatory
- Use diagrams-as-code (Mermaid, PlantUML) when possible
- Update docs during code reviews
- Document "why" not "what" — clean code explains what

### Additional Topics

The [System Design Reference](reference.md) covers these topics in depth:

- **Security and compliance design** — authentication, authorization,
  encryption, OWASP, compliance mapping
- **Performance and scalability design** — targets, caching, database
  optimization, scaling approaches
- **Observability and monitoring design** — logging, metrics, alerting, success
  criteria instrumentation
- **Common design anti-patterns** — Big Ball of Mud, God Object, Analysis
  Paralysis, and fixes
- **Design brief examples** — system context, architecture, tech stack,
  increment plans
- **Gate 2 cost calculation** — estimation examples and infrastructure cost
  templates

---

## Stage Outputs

- **System Design Brief** — the containing artifact for the design deliverables
  below, produced from the
  [System Design Brief Template](../../templates/system-design-brief.md)
- **Architecture Diagrams** — system context, container, and component diagrams
- **Technology Stack ADRs** — justified technology choices with decision records
- **Data/API Architecture** — data models, API conventions, integration patterns
- **Infrastructure Plan** — CI/CD, environments, deployment strategy
- **Security Approach** — threat model, authentication, authorization,
  compliance mapping
- **Observability Strategy** — logging, metrics, alerting, success criteria
  instrumentation
- **Increment Plan** — sequenced increments with requirements mapping
- **Gate 2 Decision Package** — compiled evidence for the build/no-build
  decision

> System Design ensures the **measurement throughline** by designing analytics
> infrastructure, instrumenting success criteria into observability systems, and
> validating that NFR targets are architecturally achievable. See
> [Framework Guide: Measurement Throughline](../../guides/framework.md#measurement-throughline).

> System Design continues the **learning throughline** by applying a pre-mortem
> lens to architecture — identifying decisions that are hardest to reverse and
> documenting them in ADRs. See
> [Framework Guide: Learning Throughline](../../guides/framework.md#learning-throughline).

> System Design continues the **security throughline** by designing the security
> architecture and creating a threat model scaled to the project's risk tier.
> See [Security Guide](../../guides/security.md).

**Handoff:** Increment Design stage receives architecture, increment plan, and
foundational conventions. Distribute checkpoint or gate decision artifacts to
all Informed roles per the
[Information Protocol](../../guides/roles.md#information-protocol).

---

## When to Revisit System Design

**Triggers:**

- Architecture proves infeasible during implementation
- NFRs can't be met within cost or time constraints
- Technology choice doesn't support needed capabilities
- Major requirements change or new constraints emerge
- Production issues reveal architectural problems

**Revision process:**

1. Identify trigger (what new information?)
2. Assess impact (which components/increments?)
3. Update design artifacts
4. Create ADR documenting the change
5. Communicate to affected teams
6. Update increment plan and downstream work

**Proactive architecture evolution:**

In addition to reactive triggers, consider scheduled architecture reviews:

- **Quarterly review:** Assess technical debt backlog and fitness of current
  architecture against current load and team size
- **Tech debt tracking:** Maintain a tech debt backlog category alongside the
  feature backlog; review at each increment planning session
- **Fitness functions:** For long-lived systems, define automated checks that
  validate architectural constraints (e.g., no circular dependencies, response
  time budgets). Run as part of CI.
- **ADR refresh:** When a decision is superseded proactively (not due to
  failure), create a new ADR and mark the original as "Superseded by ADR-XXX"
  with a brief rationale.

> **Mid-stage discovery?** If a technology choice can't meet an NFR or an
> architectural assumption is invalidated, see the
> [Mid-Stage Discovery](../../guides/framework.md#mid-stage-discovery) decision
> tree to determine whether to assess, amend, or defer.

---

## Notes

**Last Updated:** 2026-06-20

Added to framework in v0.12.0. Visual architecture cross-cutting concern and
subsection added in v0.44.0. Stage altitude note and bridging-sentence
reconciliation added in v0.46.0. ADR all-three-criteria rule + design-note
discriminator added in v0.47.0. ADR id scheme and canon promotion updated in
v0.48.0. v0.49: autonomy vocabulary repointed to the operating model;
Support→Operations refs updated.
