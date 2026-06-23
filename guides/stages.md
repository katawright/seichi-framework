---
pipeline:
  - id: initiation
    stage_number: 1
    execution_pattern: foundational
    feeds_into: [requirements]
    revisit_conditions: [scope-change, stakeholder-change, budget-reallocation]
  - id: requirements
    stage_number: 2
    execution_pattern: foundational
    feeds_into: [system-design]
    revisit_conditions:
      [scope-creep, new-stakeholder-requirements, failed-verification]
  - id: system-design
    stage_number: 3
    execution_pattern: foundational
    feeds_into: [increment-design]
    revisit_conditions:
      [
        technology-constraint-change,
        scale-requirement-change,
        security-incident,
      ]
  - id: increment-design
    stage_number: 4
    execution_pattern: iterative
    feeds_into: [implementation]
    revisit_conditions: [requirements-change, design-review-rejection]
  - id: implementation
    stage_number: 5
    execution_pattern: iterative
    feeds_into: [verification]
    revisit_conditions: [design-change, blocking-dependency]
  - id: verification
    stage_number: 6
    execution_pattern: iterative
    feeds_into: [deployment, implementation]
    revisit_conditions: [new-defects, requirements-change, uat-rejection]
  - id: deployment
    stage_number: 7
    execution_pattern: iterative
    feeds_into: [closure, increment-design]
    revisit_conditions: [deployment-failure, rollback-required]
  - id: closure
    stage_number: 8
    execution_pattern: terminal
    feeds_into: [initiation]
    revisit_conditions: [reopened-scope, post-closure-defect]
---

# AI-Assisted SDLC Stages

## Overview

**8 stages** that balance comprehensive coverage with practical simplicity for
AI-assisted software delivery.

### Why Defined Stages

Software projects have natural phases, but without explicit stage definitions
teams skip critical activities, handoffs between roles break down, and goals set
early never connect to what gets measured in production. AI amplifies this
problem — it can generate artifacts quickly, but without clear inputs, outputs,
and exit criteria for each stage, teams lose track of what's been validated and
what's just been drafted.

### Goals of This Guide

- Define what happens at each stage — inputs, activities, outputs, and exit
  criteria
- Provide methodology-agnostic stages that work for agile, waterfall, and hybrid
  approaches
- Ensure cross-functional handoffs between business and technical stakeholders
- Establish a measurement throughline from goals to production metrics

For who runs the process and how autonomously at each stage, see the
**[Operating Model Guide](operating-model.md)**.

### Key Principle

Each stage is led by the role best suited to the work, with AI assistance
bounded by verifiability and risk. Success criteria established in Initiation
flow through every subsequent stage.

### How to Use This Guide

1. Review the [**Quick Reference**](#quick-reference) table to see all 8 stages
   at a glance
2. Understand [**How Stages Execute**](#how-stages-execute) (Foundational,
   Iterative, Terminal) and the [**Flow delivery mode**](#flow-delivery-mode)
3. Check [**Stage Altitude**](#stage-altitude) to see the abstraction level and
   scope each stage works at
4. Drill into individual [**stage definitions**](#stage-1-initiation) for
   inputs, activities, outputs, and exit criteria
5. See [**Checkpoint Taxonomy**](checkpoints.md) for the gate and review types
   that govern progression

---

## Quick Reference

<!-- Keep this table in sync with guides/framework.md and README.md -->

| #   | Stage            | Primary Role             | Pattern      | Purpose                                                                                                                                      |
| --- | ---------------- | ------------------------ | ------------ | -------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | Initiation       | Product Manager          | Foundational | Establish business case with measurable success criteria                                                                                     |
| 2   | Requirements     | Product Manager          | Foundational | Define testable requirements with functional requirement (FR) acceptance criteria and non-functional requirement (NFR) verification criteria |
| 3   | System Design    | Architect                | Foundational | Establish or assess system architecture and technical approach                                                                               |
| 4   | Increment Design | Engineers                | Iterative    | Plan implementation approach AND test strategy for increment                                                                                 |
| 5   | Implementation   | Engineers                | Iterative    | Execute implementation plan from Increment Design                                                                                            |
| 6   | Verification     | QA Engineers / Engineers | Iterative    | Execute test strategy from Increment Design, validate FR acceptance criteria and NFR verification criteria                                   |
| 7   | Deployment       | DevOps / Engineers       | Iterative    | Release to production                                                                                                                        |
| 8   | Closure          | DevOps                   | Terminal     | Hand the system off to Operations and close the project                                                                                      |

---

## How Stages Execute

The 8 stages follow three execution patterns:

- **Foundational** (Initiation, Requirements, System Design) — Execute once per
  project to establish the project foundation. Revisit when:
  - User feedback shows requirements miss the mark
  - Implementation reveals unanticipated constraints
  - Business priorities or context shift significantly
  - Measurement shows success criteria are off-target or need adjustment

- **Iterative** (Increment Design, Implementation, Verification, Deployment) —
  Repeat for each increment of deliverable work. An "increment" maps to whatever
  unit your methodology uses: epic, feature, sprint deliverable, or release.
  Each iterative stage occupies one slot per increment; the slot is always
  present, but whether Deployment produces a production release is an elective
  per-increment decision — see [Stage 7](#stage-7-deployment).

- **Terminal** (Closure) — Runs once at project end: hands the running system to
  the [Operations](operations.md) process, transfers production ownership, and
  closes the project against the completion contract. Reaching it is the
  **normal** project terminal, not an early completion.

> **Continuous operation is not a stage.** Monitoring, incident response, and
> maintenance — the standing work that outlives delivery — belong to the
> [Operations](operations.md) process, a sibling to the SDLC. A project _ends_
> at Closure; the system it produced is _operated_ there. Small in-place
> software changes run as [Flow](#flow-delivery-mode) items.

### Stage Flow

#### Linear Flow (Waterfall-style)

```
Initiation → Requirements → System Design → Increment Design
→ Implementation → Verification → Deployment → Closure
```

#### Iterative Flow (Agile-style)

```
Initiation (once)
    ↓
Requirements (once)
    ↓
System Design (once)
    ↓
┌────────────────────────────────────────────┐
│ Per Increment:                             │
│   Increment Design                         │
│      ↓                                     │
│   Implementation                           │
│      ↓                                     │
│   Verification                             │
│      ↓                                     │
│   Deployment   →   release  or  defer      │
└────────────────────────────────────────────┘
    ↓
Closure (terminal)  →  Operations (the system runs on)
```

> **Reading the Deployment slot:** Every increment has a Deployment slot, but a
> production release is elective. Each slot resolves as **Released** (this
> increment ships) or **Deferred** (work accumulates toward a later release). A
> full Verification pass normally precedes a release. See
> [Stage 7: Deployment](#stage-7-deployment).

> **Brownfield projects:** If you are working with an existing codebase, the
> scope of foundation work between Gate 2 and your first feature increment
> depends on codebase readiness. See the
> [Brownfield Readiness Guide](brownfield-readiness.md) for the assessment and
> routing.

---

## Flow Delivery Mode

The SDLC runs in two **delivery modes**. Everything above describes **Project
mode** — a bounded investment that runs the full stage sequence, passes Gate 1
and Gate 2, and ends at [Closure](../stages/closure/README.md). **Flow mode** is
the other: a continuous, queue-driven lane for small changes that are too small
to be a project but still **change the software**.

Together with the standing-system [Operations](operations.md) process, these are
the **three work-shapes, one operating model**:

| Work-shape     | What it is                        | Entry                                          | Terminal                                                                     |
| -------------- | --------------------------------- | ---------------------------------------------- | ---------------------------------------------------------------------------- |
| **Project**    | A bounded investment              | Initiation + Gate 1                            | [Closure](../stages/closure/README.md)                                       |
| **Flow**       | A continuous per-issue change     | An approved issue                              | Ship + close the issue                                                       |
| **Operations** | A standing system (its own guide) | [Closure handoff](../stages/closure/README.md) | [Decommission](operations.md#decommission-the-terminal-of-a-standing-system) |

All three reuse the same [operating model](operating-model.md) — configurable
functions, floors, capability coverage, Lights-Out, escalation and stop,
evidence — so each can be performed by humans, agents, or a mix. Project and
Flow live in this guide; Operations is a [separate process](operations.md).

### When to Use Flow

Flow is for small, ad-hoc changes that **change the software** — a button-text
fix, a small enhancement, a low-risk patch. Because they change code, they are
delivery work, not [Operations](operations.md#the-remediation-boundary); because
they are small and self-contained, they do not warrant a project's Initiation
and Closure. A change that is substantial — new scope, architectural impact, a
real investment decision — is a **project**, not a Flow item. When in doubt,
size by [consequence](right-sizing.md): if it needs a Gate-1-style investment
decision, it is a project.

### How Flow Folds the Stages

Flow runs the same stage _concerns_ at per-issue granularity, with two folds:

- **The issue's approval is the folded go-decision.** There is no Initiation and
  no Gate 1 — approving the issue _is_ the authorization to deliver it. The
  consequence-sizing that Initiation would do is folded into the issue itself.
- **Ship-and-close is the terminal.** There is no Closure handoff, because the
  system is **already owned and operated** — a Flow item modifies a running
  system, it does not hand off a new one.

What remains is the core delivery loop, per issue:

```text
approved issue → implement → verify → ship + close
```

Design, implementation, and verification still happen — folded to the size of
the change. The load-bearing concerns are **acceptance criteria**,
**verification**, and **consequence**: they say when the change is done and
whether it may ship.

### Lights-Out Flow

Flow is the shared execution substrate for human-filed small changes **and**
agent-spawned fixes — including the
[ops→dev edge](operations.md#the-opsdev-edge), where an operations agent
diagnoses a code fix and hands it to Flow. An agent may monitor the queue and
deliver approved issues unattended **up to a consequence floor**; above it, a
human reviews and approves before ship. This is the same bounded-delegated-run
discipline the [Delegated-Run Spec](../spec/delegated-run.md) defines, with a
single issue as the unit.

### The Flow Issue

Each Flow item is captured with the
[Flow Issue Template](../templates/flow-issue.md) — the folded entry artifact
that collapses Initiation (approval + intent), Requirements (what + acceptance),
and consequence-sizing into one small form carrying enough for autonomous
delivery and self-verification. A Flow issue is the **approved,
ready-to-deliver** request — distinct from a raw [Idea](../templates/idea.md)
(backlog, not yet validated) or an untriaged
[Friction Log](../templates/friction-log.md) entry. Note the relationship; do
not duplicate them.

---

## Stage Altitude

Every stage works at a characteristic **altitude** — the level of abstraction
its decisions belong at. A stage stays at altitude when its artifacts sit at its
own level, and _slips_ when they drift up (re-deciding a higher stage's
concerns) or down (settling a lower stage's). Altitude slippage — a goal that is
really a feature, a requirement that is really a design choice — is expensive
because it is usually caught only on human review, after the artifact has been
_structured_ around the wrong level.

Altitude runs along two orthogonal axes. The first is **abstraction** — how far
a decision sits from intent toward built code:

```
why (Initiation)
  → outcome (Initiation Goals)
    → behavior-what (Requirements)
      → architectural-how + sequencing (System Design)
        → component-how (Increment Design)
          → built (Implementation)
```

The second is **scope** — how much of the system a decision covers. This is the
[execution pattern](#how-stages-execute) above: foundational stages reason about
the **whole system, once**; iterative stages reason about **one increment,
repeated**. The two axes are independent — the System Design → Increment Design
step is mostly a _scope_ narrowing (whole-system architecture → this increment's
components), not only an abstraction drop. That is why System Design sets
architecture and conventions but **does not design individual features**; that
is Increment Design's altitude.

| Stage              | Altitude (abstraction)            | Scope              | Slips when it…                                                                                                  |
| ------------------ | --------------------------------- | ------------------ | --------------------------------------------------------------------------------------------------------------- |
| Initiation (Goals) | outcome — the _why_ made concrete | whole project      | names a feature, metric, or mechanism dressed as an outcome (too low), or reaches above the project (too high)  |
| Requirements       | behavior — _what_ the system does | whole system       | states a _chosen_ design framing (too low — belongs in System Design)                                           |
| System Design      | architectural _how_ + sequencing  | whole system, once | designs an individual feature (too low — belongs in Increment Design)                                           |
| Increment Design   | component _how_ + test design     | one increment      | re-opens architecture (too high), or drops into implementation code — bodies and logic, not contracts (too low) |
| Implementation     | built                             | one increment      | redesigns instead of building to the design (too high)                                                          |

**The altitude test — imposed vs chosen.** Naming something concrete — a format,
a protocol, a limit — is not automatically too low; what matters is _why_ it is
there. An **imposed constraint** is one the outside world hands you: an external
mandate, a platform limit, a regulatory rule, or a format or protocol a system
you must integrate with dictates. It belongs at the stage that records it — name
it, and name its cause (a third-party API's rate limit is a legitimate
Requirements constraint). A **chosen mechanism** is one _you_ selected to meet
the need; it is premature and belongs one stage down. Internal implementation —
a data structure, an algorithm — is the clearest chosen case, because the
outside world never dictates it. Ask of any concrete noun: is it _imposed on
us_, or _chosen by us_?

**Code in design briefs.** Design altitude is not "no code." Code belongs in a
design brief when it expresses a **contract** — what a unit exposes to the
outside: signatures, request/response schemas, type or interface definitions,
shared conventions. It drops too low when it expresses **construction** — the
logic behind that contract (method bodies, algorithms, queries, control flow),
which is Implementation's altitude. The two design stages split on scope as
usual: System Design holds system-wide contracts (API conventions, the
error-response envelope, a shared data model); Increment Design holds this
increment's contracts (a service's method signatures, an endpoint's
request/response shape, a migration's columns). The
[Worked Example](worked-example.md) shows the gradient end to end — conventions
at System Design, signatures and schemas at Increment Design, method bodies at
Implementation.

**Off the ladder — Verification, Deployment, Closure.** These are not rungs on
the abstraction ladder; Implementation is its bottom rung. Each is governed by a
question rather than an altitude:

- **Verification** — does the built increment match the upper rungs (its
  behavior-what, and the outcome behind it)?
- **Deployment** — is this increment ready to release, and should it ship now?
- **Closure** — is the delivered scope complete, and is the system ready to hand
  off and the project to close?

Goals, success criteria, and requirements relate as **siblings of a goal**, not
a sequence — see
[Framework Guide: The Traceability Chain](framework.md#the-traceability-chain).
Each stage's README carries its own slippage examples (see Initiation § Goals
and the Requirements Functional Requirements and Common Pitfalls sections).

---

## Measurement Throughline

Measurable success criteria established in Initiation flow through all stages:

| Stage                | How Measurement Is Used                                                                                                       |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| **Initiation**       | Define goals and measurable success criteria; establish measurement approach and targets                                      |
| **Requirements**     | Ensure NFRs include verification criteria and instrumentation/telemetry; FR acceptance criteria ladder up to success criteria |
| **System Design**    | Design analytics infrastructure, dashboards, monitoring systems, and data collection                                          |
| **Increment Design** | Plan test strategy, specify what to measure per increment                                                                     |
| **Implementation**   | Implement logging, metrics collection, instrumentation, and measurement systems                                               |
| **Verification**     | Test that measurement systems work; validate FR acceptance criteria and NFR verification criteria tied to success criteria    |
| **Deployment**       | Deploy with monitoring configured; on releasing increments, capture baseline measurements in production                       |
| **Closure**          | Reconcile success criteria against outcomes one last time; pending criteria carry a Re-check Date into Operations             |

This ensures goals aren't just documented and forgotten—they actively guide
development and enable data-driven validation of success.

---

## Learning Throughline

Continuous learning — anticipating failure modes early and reflecting on what
actually happened — keeps teams from repeating mistakes across increments:

| Stage                | Learning role                                                          |
| -------------------- | ---------------------------------------------------------------------- |
| **Initiation**       | Pre-mortem: identify top failure modes before committing               |
| **Requirements**     | Flag ambiguous or assumption-heavy requirements as learning risk       |
| **System Design**    | Pre-mortem lens on architecture: what's hardest to reverse?            |
| **Increment Design** | Review pre-mortem assumptions; carry forward prior retro actions       |
| **Implementation**   | Note surprises and deviations; route mid-stage discoveries             |
| **Verification**     | Capture what tests reveal; assess impact of failures                   |
| **Deployment**       | Run increment retrospective; triage friction-log entries               |
| **Closure**          | Project wrap-up retro; triage and route the friction log one last time |

Pre-mortems happen once at the project level (Initiation); retrospectives happen
at every increment boundary and at project wrap-up. Capture friction throughout
the increment in the project's standing friction log; triage its entries during
the retrospective session. For the full friction → retrospective → idea-backlog
loop, see [The Learning Loop](learning-loop.md).

---

## Security Throughline

Security activities flow through every stage, from data classification in
Initiation through deployment hardening, and continue into ongoing vulnerability
management in [Operations](operations.md). Security decisions compound across
stages — data sensitivity classified in Initiation drives NFRs in Requirements,
which drive architecture in System Design, which drive scanning in
Implementation. For the stage-by-stage breakdown, AI automation levels, and
Secure Software Development Framework (SSDF) traceability, see the
[Security Guide](security.md).

---

## Stage 1: Initiation

- **Primary Role:** Product Manager
- **Supporting Roles:** Executives, Architect, Engineers, Project Manager
- **Execution Pattern:** Foundational (once per project, revisitable)
- **Stage Guide:** [Initiation](../stages/initiation/README.md)

### Goals

Establish the business case, define goals with measurable success criteria, set
scope boundaries, and produce a plan to reach the first major decision gate
(proceed/revise/stop).

### Inputs

**Required:**

- Business opportunity or problem statement
- Initial stakeholder list
- Rough budget constraints

**Optional:**

- Market research or competitive analysis
- Existing system documentation (for enhancements)
- Regulatory or compliance requirements

### Entry Criteria

- Business opportunity identified and sponsor assigned
- Initial funding/resources allocated for discovery
- Key stakeholders available for interviews

### Key Activities

- Define business case and value proposition
- Establish goals with measurable success criteria
- Identify scope boundaries, constraints, and assumptions
- Assess major risks and unknowns
- Create range-based plan for discovery phase (Requirements + Design)
- Define success metrics (business, technical, project)

### Outputs

- **Initiation Brief** - One-page summary of project (see
  [Initiation Brief Template](../templates/initiation-brief.md))
- **Success Criteria Register** - Success criteria with baselines and targets
  (see [Success Criteria Register](../templates/success-criteria-register.md))
- Goals with measurable success criteria documented
- Assumptions and risks list
- High-level timeline and resource estimate (range-based)

### Exit Criteria

- Stakeholders approve business case and goals
- Success metrics are defined and measurable
- Scope boundaries are clear
- Go/no-go decision made

### Checkpoints

- **Gate 1 (Investment Decision):** End of Initiation stage
  - **Decision:** Approve brief and proceed to Requirements, revise to refine
    the idea, or stop the project
  - **Based on:** Completed Initiation Brief (which proposes decision criteria)
  - **Criteria:** Business case clear, stakeholders aligned, risks acceptable,
    sponsor committed
  - **Record decision:** Use the
    [Gate Decision Template](../templates/gate-decision.md)
  - **AI validation:** Human review ensures AI-assisted brief analysis is sound
    and recommendations are appropriate

### Handoff to Next Stage

Requirements stage receives: Initiation Brief with goals, measurable success
criteria, constraints, and stakeholder list.

---

## Stage 2: Requirements

- **Primary Role:** Product Manager
- **Supporting Roles:** Engineers, Architects, QA Engineers, Project Manager
- **Execution Pattern:** Foundational (once per project, revisitable)
- **Stage Guide:** [Requirements](../stages/requirements/README.md)

### Goals

Convert goals into testable requirements with FR acceptance criteria and NFR
verification criteria that enable coherent design decisions, accurate test
planning, and reduced rework from ambiguity.

### Inputs

**Required:**

- Initiation Brief (with goals and measurable success criteria)
- Stakeholder list and availability

**Optional:**

- Existing system documentation
- User research or personas
- Regulatory/compliance requirements
- Competitive analysis

### Entry Criteria

- Initiation Brief approved
- Stakeholders available for requirements elicitation
- Key success metrics defined

### Key Activities

- Elicit and document functional requirements (FRs)
- Define FR acceptance criteria (AC) for each functional requirement
- Identify non-functional requirements (NFRs): performance, security,
  scalability, usability
- Prioritize requirements for incremental delivery (MVP vs. future)
- Ensure NFRs include verification criteria and instrumentation for measuring
  success criteria
- Validate requirements with stakeholders

### Outputs

- **Requirements Brief** - Functional and non-functional requirements (see
  [Requirements Brief Template](../templates/requirements-brief.md))
- User stories or use cases with FR acceptance criteria
- Prioritized feature backlog
- Requirements traceability to goals and success criteria

### Exit Criteria

- All high-priority FRs have acceptance criteria
- Requirements reviewed and approved by business and technical stakeholders
- NFRs include verification criteria and measurement/instrumentation needs
- Requirements are testable and unambiguous

### Checkpoints

- **Requirements Readiness (Review):** End of Requirements stage
  - **Decision:** Ready (proceed to System Design) / Not Ready (remediate and
    re-review)
  - **Based on:** Requirements Brief with acceptance criteria, prioritized
    backlog, NFRs with verification criteria
  - **Criteria:** All high-priority FRs have acceptance criteria, NFRs include
    verification criteria, requirements are testable and unambiguous
  - **Record decision:** Use the
    [Checkpoint Decision Template](../templates/checkpoint-decision.md)

### Handoff to Next Stage

System Design stage receives: Requirements Brief with FR acceptance criteria,
prioritized backlog, NFRs with verification criteria, and success criteria to be
instrumented.

---

## Stage 3: System Design

- **Primary Role:** Architect
- **Supporting Roles:** Product Manager, QA Engineers, DevOps, Project Manager
- **Execution Pattern:** Foundational (once per project, revisitable)
- **Stage Guide:** [System Design](../stages/system-design/README.md)

### Goals

Establish overall system architecture, technology choices, infrastructure plan,
and increment roadmap. Translate requirements into a technical foundation that
guides all subsequent implementation work.

### Inputs

**Required:**

- Requirements Brief with FR acceptance criteria
- Non-functional requirements (performance, security, etc.)
- Success criteria requiring instrumentation

**Optional:**

- Existing system architecture (for enhancements)
- Technology constraints or standards
- Third-party API documentation

### Entry Criteria

- Requirements approved and prioritized
- NFRs are clear
- Technical team assigned

### Key Activities

- Define system architecture and major components
- Select technology stack and frameworks
- Design data models and persistence strategy
- Plan observability/monitoring for success criteria
- Create API contracts and conventions
- Assess security and compliance requirements
- Plan for scalability and performance
- Plan infrastructure (CI/CD, deployment, environments)
- Create increment plan mapping MoSCoW (Must / Should / Could / Won't Have)
  priorities to increments

### Outputs

- **Architecture Diagrams** — System components and interactions
- **Technology Stack** — Decisions documented in ADRs
- **Data/API Architecture** — Entity models, API conventions, integration
  patterns
- **Infrastructure Plan** — CI/CD, environments, deployment, monitoring
- **Increment Plan** — Requirements mapped to increments with estimates
- **Gate 2 Decision Package** — Cost estimates, risks, recommendation

### Exit Criteria

- Architecture reviewed and approved
- Technology choices documented in ADRs with cost analysis
- Increment plan created with MoSCoW mapping
- Security, performance, and observability addressed
- NFR traceability table links each NFR to architectural approach and
  verification method
- Infrastructure plan complete
- Gate 2 decision made (proceed/revise/stop)

### Checkpoints

- **Architecture Review (Alignment):** Architecture and technology decisions
  reviewed with stakeholders
- **Gate 2 (Investment Decision):** After Requirements and System Design are
  both complete
  - **Decision:** Commit to building this, revise the approach, or stop
  - **Based on:** Architecture, increment plan, cost estimates, risk assessment
  - **Criteria:** Technical approach sound, costs acceptable, risks manageable,
    security risk posture reviewed (AppSec prepares security evidence)
  - **AI validation:** Human review ensures AI-assisted design is
    architecturally sound

### Handoff to Next Stage

Increment Design stage receives: System architecture, technology decisions, API
conventions, data architecture, infrastructure plan, and increment plan.

---

## Stage 4: Increment Design

- **Primary Role:** Engineers
- **Supporting Roles:** QA Engineers, Product Manager, Project Manager
- **Execution Pattern:** Iterative (per increment)
- **Stage Guide:** [Increment Design](../stages/increment-design/README.md)

### Goals

Create detailed specifications for implementing a specific increment, including
component designs, API specs, data model changes, and test strategy for
Verification.

### Inputs

**Required:**

- System design brief and architecture diagrams from System Design
- Increment plan identifying current increment scope
- Requirements with acceptance criteria for this increment

**Optional:**

- Retrospective action items from previous increments
- Updated constraints from implementation feedback

### Entry Criteria

- System Design approved (Gate 2 passed)
- Current increment identified from increment plan
- Dependencies for this increment available (or mocked)

### Key Activities

- Detail component designs for increment features
- Define component interactions and data flow
- Create database schema changes with migrations
- Specify API endpoints with request/response formats
- Plan testing approach for Verification stage
- Document implementation guidance

### Outputs

- **Component Designs** — Detailed specifications per component
- **API Specifications** — Endpoint details with validation and error handling
- **Data Model Changes** — Schema changes with migration and rollback plans
- **Test Strategy** — Unit, integration, acceptance, and performance test plans
- **Implementation Notes** — Security, performance, and code pattern guidance

### Exit Criteria

- Component designs detailed enough to implement
- API specs complete and follow established conventions
- Data model changes include migration and rollback
- Test strategy ready for Verification stage
- No major unknowns or blockers

### Checkpoints

- **Design Review (Review):** End of Increment Design
  - **Decision:** Ready to implement, or revise designs
  - **Based on:** Increment Design Brief with component designs, API specs, and
    test strategy
  - **Criteria:** Designs implementable, test strategy defined, no major
    unknowns
  - **Record decision:** Use the
    [Checkpoint Decision Template](../templates/checkpoint-decision.md)

### Handoff to Next Stage

Implementation stage receives: Detailed component designs, API specs, data
models, test strategy, and implementation notes.

---

## Stage 5: Implementation

- **Primary Role:** Engineers
- **Supporting Roles:** Architects, DevOps, QA Engineers, Project Manager
- **Execution Pattern:** Iterative (per increment)
- **Stage Guide:** [Implementation](../stages/implementation/README.md)

### Goals

Build working code that implements the detailed design for the current
increment, following engineering best practices and professional standards.

### Inputs

**Required:**

- Detailed design from Increment Design stage
- Architecture diagrams and API specifications
- Requirements with FR acceptance criteria
- Success criteria requiring measurement

**Optional:**

- Existing codebase (for enhancements)
- Code style guides and standards
- Reusable components or libraries

### Entry Criteria

- Design approved for increment
- Development environment ready
- Dependencies and APIs available (or mocked)

### Key Activities

- Write code following design specifications
- Implement instrumentation for success criteria
- Create unit tests
- Perform peer code reviews
- Refactor for code quality
- Document code and APIs

### Outputs

- **Working Code** — Committed to version control
- **Unit Tests** — With passing results
- **Code Review Approvals**
- **Updated Documentation**
- **Implementation Brief** — Summary of what was built, decisions made, and
  deviations from design (see
  [Implementation Brief Template](../templates/implementation-brief.md))
- **Session Log** — Session-by-session progress log (see
  [Session Log Template](../templates/implementation-session-log.md))
- **Observability Instrumentation** — Logging, metrics, and tracing hooks

### Exit Criteria

- Code complete for increment scope
- Unit tests pass
- Code review approved
- Code meets quality standards (linting, coverage thresholds)

### Handoff to Next Stage

Verification stage receives: Working code, implementation brief, requirements
with acceptance criteria, test strategy, and component designs.

---

## Stage 6: Verification

- **Primary Role:** QA Engineers / Engineers
- **Supporting Roles:** Product Manager, Architect, AppSec, Project Manager
- **Execution Pattern:** Iterative (per increment)
- **Stage Guide:** [Verification](../stages/verification/README.md)

### Goals

Validate that the increment works correctly through comprehensive testing and
acceptance. Encompasses verification (built correctly) and validation (built the
right thing).

### Inputs

**Required:**

- Working code from Implementation
- Implementation brief from Implementation
- Increment design brief from Increment Design
- Requirements with FR acceptance criteria
- Test strategy from Increment Design stage

**Optional:**

- Test data or fixtures
- Performance benchmarks
- Security testing requirements

### Entry Criteria

- Code complete and unit tests pass
- Production-representative test environment available
- Test data available

### Key Activities

- Establish a production-representative environment for environment-dependent
  tests (integration, UAT, performance, end-to-end)
- Execute integration testing
- Perform functional testing against FR acceptance criteria
- Conduct User Acceptance Testing (UAT) with business stakeholders
- Run performance and load testing
- Execute security testing (vulnerability scans, penetration testing)
- Validate accessibility requirements
- Test instrumentation/monitoring systems
- Verify success criteria are measurable

### Outputs

- **Verification Brief** — consolidated verification record (see
  [Verification Brief Template](../templates/verification-brief.md))
- Test results (all test types with pass/fail status)
- Defect reports and resolution status
- UAT sign-off from business stakeholders
- Performance test results
- Security scan results
- Verified code (code that passed all verification checks)
- Production readiness assessment

### Exit Criteria

- All FR acceptance criteria and NFR verification criteria met
- No critical or high-priority defects
- UAT approved by business stakeholders
- Performance meets NFRs
- Security vulnerabilities addressed
- Monitoring/instrumentation verified

### Handoff to Next Stage

Deployment stage receives: Verified code, UAT sign-off, production readiness
assessment, and implementation brief.

---

## Stage 7: Deployment

- **Primary Role:** DevOps / Engineers
- **Supporting Roles:** Product Manager, Engineers, Project Manager
- **Execution Pattern:** Iterative (per increment)
- **Stage Guide:** [Deployment](../stages/deployment/README.md)

### Goals

Release verified increments to production through a controlled, human-owned
decision — made synchronously at deploy time or via a pre-authorized automated
path — with monitoring and rollback capabilities. The production release is an
elective per-increment action: each increment's Deployment slot resolves as
released or deferred.

> **Elective release.** Whether a given increment ships to production is a
> delivery choice. See
> [Deployment: Release Disposition](../stages/deployment/README.md#release-disposition)
> for the released/deferred model, the synchronous vs. pre-positioned decision
> locus, and the guarantee of at least one release by project end.

### Inputs

**Required:**

- Verified code
- UAT sign-off
- Production readiness assessment
- Infrastructure plan (from System Design)
- Implementation brief

**Optional:**

- Canary or blue-green deployment strategy

### Entry Criteria

- All verification tests pass
- UAT approved
- Production environment ready
- Deployment plan reviewed

> **First-time setup:** If no production environment exists, see the
> [Deployment Setup Guide](../stages/deployment/setup.md) for infrastructure
> setup during foundation work. Projects with no deployment target (local-only
> tools, spikes) may
> [skip this stage](../stages/deployment/setup.md#when-you-dont-need-this-guide).

### Key Activities

- Execute deployment procedures
- Configure monitoring and alerting
- Verify health checks and smoke tests
- Monitor initial production behavior
- Capture baseline measurements for success criteria
- Update documentation and runbooks
- Communicate release to stakeholders

### Outputs

- **Deployment Brief** — consolidated deployment record (see
  [Deployment Brief Template](../templates/deployment-brief.md))
- **Deployed System** — increment live in production
- Deployment log
- Updated runbooks and operational procedures
- Release notes and change documentation
- Baseline measurements captured
- Monitoring dashboards
- Incident response procedures
- Rollback procedure
- Retrospective (with action items for next increment)

### Exit Criteria

- Increment successfully deployed
- Health checks pass
- Monitoring active and baseline measurements captured
- Rollback procedures tested (if applicable)
- Stakeholders notified

### Handoff to Next Stage

Between increments, Deployment feeds back to Increment Design for the next
increment. At project end, the Closure stage receives: the deployed system,
monitoring dashboards, updated runbooks, incident response procedures, baseline
measurements, release notes, success criteria register, and rollback procedure —
the raw material for the operational handoff record.

---

## Stage 8: Closure

- **Primary Role:** DevOps
- **Supporting Roles:** Product Manager, Project Manager, Architect, Engineers,
  Executives
- **Execution Pattern:** Terminal (once at project end)
- **Stage Guide:** [Closure](../stages/closure/README.md)

### Goals

Hand the running system off to operations, transfer production ownership, and
close the project against its goals — rendering the completion contract (claimed
→ verified → accepted → closed) and bookending the Initiation Brief. Reaching
Closure is the **normal** project terminal, not an early completion.

### Inputs

**Required:**

- Deployed system in production (or "nothing to operate" for a project that
  never shipped one)
- Completion evidence from Verification and the run
- [Success Criteria Register](../templates/success-criteria-register.md) with
  baselines and targets
- The project's standing friction log
- Increment retrospectives accumulated across the build

**Optional:**

- Operating-envelope and compliance obligations that persist into operation

### Entry Criteria

- The project's delivered scope is complete (final increment shipped, or the
  project is being sunset)
- Verification and assurance evidence available for the completion claim

### Key Activities

- Produce the operational-envelope handoff record (the six-item dev→ops seam)
- Transfer production ownership of the running system
- Reconcile completion: every in-scope requirement disposed, success criteria
  measured or dated, defects and limitations disclosed
- Run the project wrap-up retrospective and route every friction-log entry
- Produce the Project Close-Out Summary

### Outputs

- **Operational Handoff Record** — the six-item dev→ops seam (see
  [Operational Handoff Template](../templates/operational-handoff.md))
- **Project Close-Out Summary** — the readable render of the completion contract
  (see [Project Close-Out Summary](../templates/project-closeout.md))

### Exit Criteria

- Operational handoff record produced and production ownership accepted (or
  Closure marked N/A — nothing to operate)
- Completion contract closed: claimed → verified → accepted → closed
- Friction log fully triaged and routed
- Project Close-Out Summary produced

### Handoff to Next Stage

Closure is the project's terminal. Where it leads next is a new lifecycle, not a
later stage:

- **Operations** ([guide](operations.md)): the running system is operated under
  its new owner via the handoff record.
- **A follow-on project**: reopened or new scope re-enters at
  [Initiation](../stages/initiation/README.md).
- **Flow** ([mode](#flow-delivery-mode)): a small in-place change to the
  now-operated system runs as a Flow item.

---

## Checkpoints

For the full checkpoint taxonomy (three checkpoint types, Decision-Rights
Matrix, and per-stage checkpoint mapping), see
[Checkpoint Taxonomy](checkpoints.md). Each stage definition above references
its specific checkpoints in the `### Checkpoints` subsection.

---

## Notes

**Last Updated:** 2026-06-22

Added to framework in v0.9.0. Stage Altitude section added in v0.46.0.
AI-assistance pointer repointed to the Operating Model Guide in v0.49.0.
