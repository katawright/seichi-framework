---
id: requirements
stage_number: 2
execution_pattern: foundational
inputs:
  - initiation-brief
  - success-criteria-register
outputs:
  - artifact: requirements-brief
    template: templates/requirements-brief.md
  - artifact: requirements-with-acceptance-criteria
    embedded_in: requirements-brief
  - artifact: prioritized-feature-backlog
    embedded_in: requirements-brief
  - artifact: requirements-traceability
    embedded_in: requirements-brief
  - artifact: non-functional-requirements
    embedded_in: requirements-brief
  - artifact: success-criteria-register
gates:
  - type: human-approval
    name: "Requirements Readiness"
    hard_gate: false
feeds_into: [system-design]
checklist: stages/requirements/checklist.md
reference: stages/requirements/reference.md
---

# AI-Assisted SDLC: Requirements Stage

## Overview

Practical guidance for converting business objectives from the Initiation Brief
into testable, prioritized specifications that drive design, implementation, and
verification.

### Why Requirements

Software projects fail when teams build features that solve the wrong problem or
solve no problem at all. Initiation established _why_ the project matters;
Requirements answers: _"What exactly must the system do?"_

Any stakeholder who completed the Initiation stage can use Requirements
artifacts — the language is intentionally business-focused with technical
precision, accessible to non-technical stakeholders while rigorous enough for
engineering teams.

### Purpose

- Provide stage-specific guidance and rationale for Requirements
- Describe how AI assists at each activity
- Explain right-sizing Requirements effort to project complexity
- Guide practitioners from Initiation Brief to Requirements Readiness checkpoint

### Key Principle

Testability is the throughline: every functional requirement verifiable, every
acceptance criterion observable, every non-functional requirement measurable.
For the full stage definition (purpose, roles, inputs/outputs, entry/exit
criteria, and gate details), see
[Framework Stages: Requirements](../../guides/stages.md#stage-2-requirements).

### Starting Point

A completed Initiation Brief with Gate 1 approval to proceed. The brief provides
the business case, success criteria, scope boundaries, and constraints that
Requirements will convert into testable specifications.

> This stage operates from the **artifacts location**. See
> [Working Locations](../../guides/framework.md#working-locations).

### How to Use This Guide

1. Read [**How AI Helps**](#how-ai-helps) to determine your AI autonomy tier
2. Confirm your risk tier (it usually carries forward from Initiation, but
   review the [**Right-Sizing Requirements**](#right-sizing-requirements)
   practice table to verify)
3. Fill out the
   [Requirements Brief Template](../../templates/requirements-brief.md) using AI
   according to your chosen autonomy tier — refer to
   [**Why These Requirements Elements Matter**](#why-these-requirements-elements-matter)
   for rationale and examples as you complete each section. See the
   [Manual Process Guide](../../guides/manual-process.md) for prompting tips
4. Review the brief for correctness — you own the final content
5. Complete the [Requirements Checklist](checklist.md) using AI according to
   your chosen autonomy tier
6. Complete the Requirements Readiness checkpoint — present to stakeholders and
   record the ready/not-ready decision using the
   [Checkpoint Decision Template](../../templates/checkpoint-decision.md)

> **See a completed example:** The
> [Worked Example: Requirements](../../guides/worked-example.md#stage-2-requirements)
> shows completed functional requirements with acceptance criteria and
> traceability.

For cross-cutting framework concepts, see
[Framework Guide](../../guides/framework.md).

---

## How AI Helps

AI can assist with Requirements at whatever autonomy tier your team is
comfortable with — from reviewing your draft to driving the entire elicitation
process.

### AI Autonomy Spectrum

Match AI's role to your team's autonomy comfort level. Gate requirements always
apply regardless of tier. See the
[AI Assistance Scorecard: AI Autonomy Spectrum](../../guides/ai-assistance.md#ai-autonomy-spectrum)
for full tier definitions.

| Human-Led                     | Collaborative                              | AI-Led                                                                   |
| ----------------------------- | ------------------------------------------ | ------------------------------------------------------------------------ |
| Human writes reqs; AI reviews | AI drafts reqs from brief; human validates | AI drafts and proactively flags contradictions and gaps; human validates |

At the AI-Led tier, oversight intensity can be tuned from Active to Minimal —
see
[AI Assistance Scorecard: Oversight Intensity](../../guides/ai-assistance.md#oversight-intensity).
For detailed AI-Led patterns, see
[Stage Reference](reference.md#ai-led-patterns).

### AI Assistance Patterns

- **Interview-based drafting:** Share the Initiation Brief with AI — it asks
  structured questions, interviews you about user needs and edge cases, and
  produces a draft requirements document
- **Template review:** Fill out the template yourself, then ask AI to review for
  completeness, testability, and ambiguity
- **Completeness checking:** AI runs through the checklist and flags gaps in
  your requirements
- **Edge case and NFR generation:** AI identifies gaps, suggests NFRs from
  success metrics, and surfaces edge cases you may not have considered

For assistance level details, see the
[AI Assistance Scorecard](../../guides/ai-assistance.md).

> **Required gates:** Human approval — Requirements involve business judgment,
> stakeholder alignment, and domain knowledge that AI cannot independently
> verify. AI can do substantial end-to-end work; humans approve before output is
> relied on.

---

## Right-Sizing Requirements

Not every project needs comprehensive NFRs or formal stakeholder reviews. Match
your Requirements effort to your project's risk tier.

| Practice                        | Minimal                     | Standard                                     | Enterprise                                                          |
| ------------------------------- | --------------------------- | -------------------------------------------- | ------------------------------------------------------------------- |
| **Functional requirements**     | Brief behavior descriptions | Numbered FRs with testable statements        | Formal FRs with traceability matrix                                 |
| **Acceptance criteria**         | Informal "done" definition  | Given/When/Then for each FR                  | Comprehensive ACs with edge cases documented                        |
| **NFRs**                        | Note key quality concerns   | Documented NFRs including observability      | Full NFR catalog with SLOs and compliance mapping                   |
| **Prioritization**              | Informal must/nice-to-have  | MoSCoW classification for all requirements   | MoSCoW baseline plus weighted scoring with formal stakeholder input |
| **Edge cases/data constraints** | Acknowledge known issues    | Document top edge cases and data constraints | Comprehensive edge case analysis, data mapping                      |
| **Stakeholder review**          | Informal check-in           | Alignment review with engineering            | Formal review cycles with sign-off                                  |
| **Compliance**                  | Basic awareness             | Documented compliance requirements           | Full compliance matrix with audit trail                             |
| **Security**                    | Note key security concerns  | Security NFRs with verification criteria     | Full security requirements catalog with compliance traceability     |

Expand Requirements only when needed:

- **Regulated / compliance-heavy:** Add control requirements, compliance
  sign-off
- **Complex data migrations:** Add data mapping, transformation rules
- **Multi-team interface work:** Add interface contracts, cross-team SLAs
- **High availability / performance:** Add detailed SLOs, fault tolerance specs
- **Security-sensitive:** Add threat model, audit requirements

Otherwise, keep Requirements concise and move to System Design.

> These triggers help you decide when to move from Minimal to Standard or
> Enterprise. For full tier definitions and choosing criteria, see the
> [Right-Sizing Guide](../../guides/right-sizing.md).

---

## Requirements Workflow

1. **Review Initiation Brief** — understand objectives, success criteria,
   constraints, and non-goals
2. **Draft functional requirements** — convert business objectives into testable
   behavior statements (FR-1, FR-2, etc.)
3. **Define FR acceptance criteria** — write objective, observable conditions
   for each FR (Given/When/Then format)
4. **Identify non-functional requirements** — capture quality attributes
   including observability NFRs for success metrics, with NFR verification
   criteria
5. **Capture brownfield constraints** — document existing system constraints as
   NFRs (if applicable)
6. **Prioritize with MoSCoW** — classify all requirements as Must Have, Should
   Have, Could Have, or Won't Have
7. **Review with engineering** — conduct alignment review to validate
   feasibility and completeness
8. **Prepare for Gate 2** — compile Requirements Brief for the Gate 2 decision
   package

---

## Why These Requirements Elements Matter

Each section of the
[Requirements Brief Template](../../templates/requirements-brief.md) exists
because skipping it causes predictable failures. This section explains why each
element is included:

1. [**Context**](#context) — carry-forward from Initiation
2. [**Users/Personas**](#userspersonas) — user-centered requirements prevent
   blind spots
3. [**Problem Statement**](#problem-statement) — carry-forward from Initiation
4. [**Goals and Success Criteria**](#goals-and-success-criteria) — measurement
   throughline
5. [**Constraints**](#constraints) — hard limits that shape requirements and
   design
6. [**Scope Baseline (MoSCoW)**](#scope-baseline-moscow) — prevents scope creep,
   enables trade-offs
7. [**Functional Requirements**](#functional-requirements) — testable behavior
   statements
8. [**Acceptance Criteria**](#acceptance-criteria) — objective observable
   conditions
9. [**Traceability Summary**](#traceability-summary) — FRs traced to objectives
   and metrics
10. [**Non-Functional Requirements**](#non-functional-requirements) — quality
    attributes that shape architecture
11. [**Data and Integrations**](#data-and-integrations) — unexamined constraints
    cause schedule slips
12. [**Edge Cases**](#edge-cases) — drive significant design complexity
13. [**Open Questions**](#open-questions) — blockers for System Design
14. [**Requirements Readiness**](#requirements-readiness) — quality checkpoint
    before System Design
15. [**Interface Examples**](#interface-examples) — representative examples of
    primary user interactions
16. [**Change Log**](#change-log) — requirement amendments and review history
17. [**Gate 2 Planning**](#gate-2-planning) — outputs needed for the build
    decision

### Context

Context provides quick orientation — what triggered this requirements work and
where it sits in the roadmap. Since context carries forward from the Initiation
Brief, this section is typically short: reference the Gate 1 approval and any
key decisions that shape the requirements scope.

**What to include:**

- What triggered this work (Gate 1 approval, roadmap item)
- Key decisions from Initiation that constrain requirements

**Good example:**

> "Follow-on to Initiation Gate 1; defining Must Have requirements for Q2
> initial release based on approved business case."

**Bad example:**

> "We need to build something."

### Users/Personas

Requirements that aren't grounded in specific users tend to describe abstract
functionality that nobody actually needs. Identifying users and personas
prevents blind spots — different user types have different needs, and
requirements that serve one persona may create friction for another. Carrying
forward personas from Initiation and adding detail as roles become clearer keeps
requirements user-centered throughout.

**What to include:**

- Primary and secondary users with brief context
- Relevant user characteristics that affect requirements (volume, frequency,
  technical sophistication)

**Good example:**

> "Primary: Support agent (handles 20-30 tickets/day, needs fast context
> switching). Secondary: Support manager (monitors SLA compliance), Compliance
> team (audits PII handling)."

**Bad example:**

> "Users."

### Problem Statement

The problem statement prevents solution-first bias and provides context for why
requirements exist. Carrying it forward from the Initiation Brief ensures
requirements stay grounded in the original business need. Keep this
behavior-focused — what users can't do and why.

**What to include:**

- Problem restated in problem-first form (no solutions)
- User impact and current workaround (if any)

**Good example:**

> "Support agents can't reliably find the latest customer context within 30
> seconds because conversations are split across Tool A and Tool B, increasing
> handle time and driving repeat contacts."

**Bad example:**

> "Build a unified dashboard."

> **Agent instruction (Collaborative/AI-Led):** If the user introduces solution
> language during requirements elicitation, acknowledge the idea, capture it as
> a design consideration for System Design, then redirect to the behavior the
> user needs.

### Goals and Success Criteria

Success criteria from the Initiation Brief establish the measurement throughline
that flows through all subsequent stages (see
[Framework Guide: Measurement Throughline](../../guides/framework.md#measurement-throughline)).
Your role in Requirements: translate metrics into NFRs with instrumentation
targets so they can be measured in production.

**How requirements artifacts relate:**

```
Initiation Objective
  → Success Metric (baseline → target)
    → NFR-Observability (instrumentation to measure it)
    → FR (behavior that delivers the objective)
      → AC (observable condition proving the FR works)
```

**Example:** "Reduce repeat-contact rate from 12% to 10%"

- NFR-Obs-1: Track repeat-contact metric in the dashboard
- FR-1: Unified conversation view across both tools
  - AC-1.1: Messages from both tools appear chronologically

**What to include:**

- Measurable success criteria carried forward from Initiation (baseline →
  target)

**Good example:**

> "p90 time-to-context 75s → <30s; repeat-contact rate 12% → 10%."

**Bad example:**

> "Make things faster."

### Constraints

Constraints are hard limits — budget, deadlines, team capacity, compliance
requirements, and technology restrictions — that bound what requirements are
feasible. Carrying forward constraints from the Initiation Brief and adding new
constraints discovered during requirements elicitation prevents late-stage
surprises. For brownfield projects, existing system constraints (performance
SLAs, API contracts, data schemas) must also be captured as NFRs.

**What to include:**

- Constraints carried forward from the Initiation Brief
- New constraints discovered during stakeholder interviews or technical
  discovery
- Brownfield constraints (existing system boundaries) for brownfield projects

**Good example:**

> "From Initiation: Q2 deadline, no additional headcount. Discovered: Tool B API
> has a 60 req/min rate limit and no bulk export capability."

**Bad example:**

> "Normal constraints apply."

> For detailed brownfield constraint categories with examples, NFR templates,
> and greenfield vs. brownfield comparison, see
> [Requirements Reference: Brownfield Constraints](reference.md#brownfield-constraint-categories).

### Scope Baseline (MoSCoW)

MoSCoW prioritization prevents scope creep and enables faster trade-off
decisions. Without explicit prioritization, "everything is Must Have" and teams
can't make rational trade-offs when constraints tighten. Must Have defines the
minimum viable set; Should Have items are committed but deferred; Could Have
items are opportunistic; Won't Have items are explicit exclusions that prevent
scope creep.

**What to include:**

- Must Have — requirements critical for the first usable release
- Should Have — committed for future releases
- Could Have — desirable if time/resources permit (not committed)
- Won't Have — explicitly excluded to prevent scope creep

**Good example:**

> "Must Have: Unified conversation view, search by phone/email, 30-day history.
> Won't Have: Mobile app, internationalization, historical backfill."

**Bad example:**

> "Everything is high priority."

### Functional Requirements

Functional requirements define what the system must do in testable terms.
Testable FRs enable objective validation in the Verification stage — if you
can't write a test for it, it's not a requirement. Each FR should pass the
"testability test": can you describe a specific input, action, and expected
output?

**What to include:**

- Numbered requirements (FR-1, FR-2) for traceability
- One-line rationale ("Why") — the business need or user problem this FR serves
- Behavior-focused statements (what, not how)
- Unambiguous language with a single interpretation

**Good example:**

> "FR-1: The system shall allow support agents to search by customer phone
> number and display conversation history within 2 seconds."

**Bad example:**

> "Add a search page."

> For detailed definitions, formatting guidance, and more examples, see
> [Requirements Reference: Terminology](reference.md#requirements-terminology).

### Acceptance Criteria

Acceptance criteria define "done" for each requirement with objective,
observable conditions. Without them, "done" becomes a subjective debate during
testing. ACs prevent rework by making validation unambiguous — either the
criterion is met or it isn't.

**What to include:**

- At least one AC per FR; complex FRs may have multiple
- Given/When/Then format or measurable conditions
- Normal and edge case coverage

**Good example:**

> "Given an agent enters a valid 10-digit phone number, when they submit the
> search, then the system returns results within 2 seconds and displays the most
> recent message timestamp."

**Bad example:**

> "Search works well."

> For detailed definitions, formatting guidance, and more examples, see
> [Requirements Reference: Terminology](reference.md#requirements-terminology).

### Traceability Summary

The traceability summary maps each functional requirement back to its Initiation
objective, MoSCoW priority, acceptance criteria, and success metric. This table
provides a single-glance view that confirms every FR is grounded in a business
objective and every success metric has at least one FR driving it. Without
traceability, requirements drift from business goals and gaps go unnoticed until
System Design or later.

**What to include:**

- One row per FR with columns for short name (2-4 words), Initiation objective,
  MoSCoW classification, acceptance criteria references, and success metric

**Good example:**

> "FR-1 (Unified inbox) → Reduce handle time objective → Must Have → AC-1.1,
> AC-1.2 → p90 time-to-context metric."

**Bad example:**

> No traceability table, or a table with missing columns.

### Non-Functional Requirements

Non-functional requirements are quality attributes that shape architecture,
testing, and user experience. Observability is critical — translate success
metrics into instrumentation requirements so you can measure whether the system
is meeting its goals in production.

**NFR categories:**

- **Performance:** Latency, throughput, response time
- **Reliability:** Availability, error budgets, fault tolerance
- **Security:** Authentication, authorization, data protection, audit
- **Scalability:** Load capacity, growth projections, concurrency
- **Usability:** Accessibility, learnability, error recovery
- **Observability:** Logging, metrics, traces, SLOs
- **Compliance:** Regulatory requirements, data retention, privacy

**Key principle:** Include only NFRs that materially affect architecture
decisions, testing plans, or risk.

**Good example:**

> "Search results: p95 < 2s, p99 < 5s under 500 req/min load."

**Bad example:**

> "The system should be fast."

> For detailed definitions, formatting guidance, and more examples, see
> [Requirements Reference: Terminology](reference.md#requirements-terminology).

### Data and Integrations

Many schedule slips come from unexamined data and integration constraints — rate
limits, SLAs, data ownership, authentication requirements, and retention
policies. Documenting these early prevents surprises during Implementation that
force costly redesigns or timeline extensions.

**What to include:**

- Data sources with ownership, retention, and access patterns
- External/internal integrations with constraints (rate limits, SLAs,
  authentication)

**Good example:**

> "Tool A API: 100 req/min rate limit, OAuth 2.0 auth, data owned by Customer
> Success. Tool B API: 60 req/min, no bulk export, 30-day retention."

**Bad example:**

> "We'll use the APIs."

### Edge Cases

Edge cases often drive significant design complexity. Documenting expected
behavior early prevents edge cases from being discovered during testing — when
the cost to address them is highest. Focus on cases that affect user experience
or require specific error handling.

**Edge case categories to consider (Standard+ tier):**

1. **Temporal** — date/time boundaries, scheduling conflicts, timezone issues
2. **State transitions** — reassignment, cancellation, concurrent status changes
3. **Data consistency** — concurrent edits, partial saves, cascade deletes
4. **Integration boundaries** — external dependency failures, timeout handling,
   retry behavior
5. **Role boundaries** — permission edge cases, role transitions

**What to include:**

- Common failure scenarios with expected behavior
- Boundary conditions (empty results, maximum volumes, concurrent access)

**Good example:**

> "Tool B API unavailable → Display Tool A data only with 'Tool B temporarily
> unavailable' banner; retry every 30s."

**Bad example:**

> "Handle errors gracefully."

### Open Questions

Unresolved questions block System Design. Flagging them explicitly — with owners
and blocker/nice-to-know classification — ensures they get resolved before they
cause downstream delays. Questions without owners tend to remain unanswered.

**What to include:**

- Questions that must be answered before or during System Design
- Owner for each question
- Blocker vs. nice-to-know classification

**Good example:**

> "Q1: Does Tool B API support webhooks for real-time sync, or must we poll?
> (Blocker for System Design) — Owner: Solution Architect"

**Bad example:**

> "TBD."

### Requirements Readiness

The requirements readiness section is a quality checkpoint confirming that
requirements are ready for System Design. It captures the sign-off from
reviewers and documents the go/no-go decision. Without an explicit readiness
check, teams move to System Design with incomplete or unvalidated requirements,
causing rework downstream.

**What to include:**

- Readiness criteria (testable FRs, objective ACs, key NFRs, stakeholder review)
- Decision (ready / not-ready)
- Reviewer sign-off table

**Good example:**

> "Ready: All Must Have FRs have ACs, NFRs include observability, engineering
> and product have reviewed. Decision: Ready for System Design."

**Bad example:**

> No readiness check — team moves to System Design by default.

### Interface Examples

Concrete interface examples bridge the gap between abstract requirements and
implementable specifications. When BAs include wireframes, API contract
sketches, or workflow diagrams alongside acceptance criteria, engineers can
validate feasibility before System Design begins. Without them, ambiguity in
"the user can do X" leads to divergent interpretations across the team.

### Change Log

Tracking changes to the requirements brief over time creates an audit trail for
scope decisions. When stakeholders ask "why did the requirements change?" or
"when was this added?", the change log provides a factual answer. It also helps
the team distinguish between original scope and additions that may affect
estimation and delivery timelines.

### Gate 2 Planning

Gate 2 is the major build/no-build decision that occurs at the end of
Requirements + System Design foundational pass. This section helps the team plan
what outputs to produce during System Design so the Gate 2 package is complete.
Including it in the requirements brief ensures continuity between stages and
gives the System Design team a clear target.

**What to include:**

- Expected Gate 2 outputs (what's done in Requirements vs. System Design)
- Focus areas for the System Design team

---

## Common Pitfalls

- **Requirements describe UI, not behavior** → Rewrite as behavior: "The system
  shall allow agents to search by customer phone number."

- **Acceptance criteria are subjective** → Add observable signals: "Results in
  <2s (p95); displays most recent timestamp."

- **"Everything is Must Have"** → Force prioritization; Must Have is the minimum
  usable set.

- **NFRs added late** → Capture performance, security, scalability NFRs early.

- **No observability NFRs** → Add observability NFRs for each success metric.

- **Data/integration constraints ignored** → Document rate limits, SLAs, data
  ownership early.

- **Requirements not reviewed by engineering** → Conduct alignment reviews with
  engineering.

- **Edge cases discovered during testing** → Document top edge cases early.

---

## Stage Outputs

- **Requirements Brief** — FRs with unique identifiers, ACs for each FR, NFRs
  (including observability), MoSCoW prioritization, data/integration
  constraints, edge cases, open questions
- **Requirements with Acceptance Criteria** — testable acceptance criteria for
  each functional requirement
- **Prioritized Feature Backlog** — MoSCoW-classified requirements ready for
  increment planning
- **Requirements Traceability** — mapping of FRs to Initiation objectives,
  success criteria, and acceptance criteria
- **Non-Functional Requirements** — quality attributes including performance,
  security, observability, and compliance
- **Success Criteria Register** — updated register carried forward from
  Initiation with refined metrics and measurement approaches

> Requirements ensures the **measurement throughline** by translating success
> metrics from Initiation into NFRs with observability and instrumentation
> targets. See
> [Framework Guide: Measurement Throughline](../../guides/framework.md#measurement-throughline).

> Requirements continues the **learning throughline** by flagging ambiguous or
> assumption-heavy requirements as learning risks — areas where the team's
> understanding is weakest and surprises are most likely. See
> [Framework Guide: Learning Throughline](../../guides/framework.md#learning-throughline).

> Requirements continues the **security throughline** by defining security NFRs
> from the data sensitivity classification established in Initiation. See
> [Security Guide](../../guides/security.md).

**Handoff:** System Design stage uses your Requirements Brief as its starting
point. Distribute checkpoint or gate decision artifacts to all Informed roles per
the [Information Protocol](../../guides/framework.md#consultation-protocol).

---

## When to Revisit Requirements

Requirements is foundational but revisitable.

**Triggers:**

- System Design reveals better approach (revise decision)
- Business priorities shift or new constraints emerge
- Technical infeasibility discovered
- Stakeholder feedback indicates misalignment
- Compliance or regulatory changes

**Process:**

1. Update Requirements Brief with changes
2. Conduct alignment review with stakeholders
3. Re-run the Requirements Checklist
4. Update System Design artifacts to reflect changes
5. Assess impact on schedule/scope/risk

> **Mid-stage discovery?** If something unexpected surfaces during active work,
> see the [Mid-Stage Discovery](../../guides/framework.md#mid-stage-discovery)
> decision tree to classify the impact — cosmetic, significant, or fundamental —
> and determine whether to rework, amend scope, or defer.

---

## Notes

**Last Updated:** 2026-03-19

Added to framework in v0.3.0.
