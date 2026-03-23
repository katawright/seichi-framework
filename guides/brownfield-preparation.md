# Brownfield Preparation Guide

## Overview

Operational guide for preparing a brownfield codebase for AI-assisted feature
work — from discovery activities through multi-increment preparation projects.

### Why Brownfield Preparation

Brownfield codebases that score below T5 on the
[readiness rubric](brownfield-readiness.md#readiness-rubric) need preparation
work before AI tools can assist feature development effectively. Without
structured preparation guidance, teams either prepare too little (AI-assisted
work fails on an unsuitable codebase) or too much (preparation becomes an
open-ended refactoring project that never reaches feature work).

### Purpose

- Define discovery and preparation activities by readiness dimension
- Provide infrastructure planning guidance for first AI-assisted projects
- Connect preparation work to the framework's iterative stage cycle
- Establish what "enough preparation" means for each dimension

### Key Principle

Preparation is bounded, not open-ended. The goal is "enough to start AI-assisted
feature work in targeted areas," not "perfect codebase." Define the target area,
prepare it, deliver features, then expand preparation incrementally.

The trade-off: bounded preparation means future projects that touch unprepared
areas of the codebase may need their own preparation pass. Factor this into
project planning — preparation is a per-area investment, not a one-time cost.

When modularity is low and coupling is high, isolating a target area may not be
feasible — changes ripple across boundaries and foundational layers can't be
sliced. In these cases, invest in creating isolation first (seams,
anti-corruption layers) or widen the preparation scope to cover the coupled
areas.

### How to Use This Guide

1. Complete the readiness rubric in the
   [Brownfield Readiness Guide](brownfield-readiness.md#readiness-rubric) first
2. Follow [**Discovery Activities**](#discovery-activities) for all brownfield
   projects (T4 and below)
3. Use [**Enablement Workstreams**](#enablement-workstreams) to target the axes
   that scored highest
4. See [**Preparation Activities by Axis**](#preparation-activities-by-axis) for
   what "enough" looks like per axis
5. See [**Infrastructure Planning**](#brownfield-infrastructure-planning) for
   System Design outputs specific to brownfield projects
6. Consider [**Preparation as Adoption Pilot**](#preparation-as-adoption-pilot)
   when treating preparation as your organization's first framework experience

---

## Discovery Activities

All brownfield projects — even those assessed as "AI-Ready" — benefit from a
discovery pass that documents existing systems for AI context. Discovery is the
minimum foundation work for any brownfield project adopting AI assistance.

### What to Discover

- **Architecture:** Component boundaries, data flows, integration points,
  deployment topology
- **Conventions:** Code patterns, naming conventions, directory structure,
  branching strategy
- **Constraints:** Performance SLAs, security policies, API contracts, data
  schemas, deployment windows
- **Infrastructure:** CI/CD pipelines, environments, monitoring, alerting
- **Operational processes:** Incident response, on-call, runbooks, support
  workflows

### Discovery Artifacts

| Artifact                    | Purpose                                            | Location            |
| --------------------------- | -------------------------------------------------- | ------------------- |
| AGENTS.md                   | Project conventions and AI context                 | Project root        |
| Architecture documentation  | Component diagrams, data flows, integration points | `docs/architecture` |
| Dependency map              | Cross-repo and external service dependencies       | `docs/architecture` |
| Infrastructure inventory    | Environments, pipelines, monitoring                | `docs/ops`          |
| Constraints and conventions | Coding standards, deployment rules, SLAs           | AGENTS.md or `docs` |

### How to Scope Discovery

- **Time-box:** 1-2 weeks for Discovery Only; longer for codebases needing
  preparation
- **AI-assisted:** AI tools can draft architecture documentation from code
  analysis — have team experts verify and correct
- **Verification:** Discovery is complete when an AI assistant, given only the
  documented context, can accurately describe the system's architecture,
  conventions, and constraints

**See these guides:**

- **Architecture discovery -->**
  [System Design Reference: First AI-Assisted Project (Discovery)](../stages/system-design/reference.md#first-ai-assisted-project-discovery)
- **Deployment infrastructure -->**
  [Deployment Setup Guide: Brownfield Path](../stages/deployment/setup.md#brownfield-path)
- **Operational processes -->**
  [Support Operations Guide: Brownfield Path](../stages/support/operations.md#brownfield-path)

---

## Enablement Workstreams

Enablement workstreams are the levers that most directly move a codebase up the
readiness spectrum. Pick 2-3 per cycle based on the axes that scored lowest in
the [readiness rubric](brownfield-readiness.md#readiness-rubric).

The tactics listed under each workstream are examples to spark ideation, not
exhaustive checklists. Teams should determine which approaches fit their
codebase and constraints — AI tools can help brainstorm and prioritize tactics
for your specific situation.

### Verifiability

Build the automated verification foundation that makes AI-generated changes safe
to merge.

- **Golden-flow e2e stability** — identify the 5-10 critical user paths and
  ensure they have stable, non-flaky end-to-end tests
- **Contract and integration tests at seams** — test the boundaries between
  modules, services, and external dependencies
- **Test data strategy** — reproducible test data that doesn't depend on
  production state or manual setup

### Modularity

Create the architectural boundaries that let AI reason about one area without
understanding the entire system.

- **Define bounded contexts and API contracts** — explicit interfaces between
  modules or services
- **Reduce cross-module coupling** — extract shared state into explicit
  contracts or services
- **Anti-corruption layers** — wrap legacy hotspots behind clean interfaces so
  AI-assisted code doesn't need to understand legacy internals

### Deployability

Ensure AI-generated changes can ship safely and roll back quickly.

- **One-click deploy and rollback** — automate the deploy pipeline end-to-end
- **Environment reproducibility** — infrastructure as code or documented
  provisioning so environments don't drift
- **Schema discipline** — DB migration tooling, backward-compatible schema
  changes, migration runbooks with rollback strategy
- **Release gating** — health checks, canary or blue-green where possible

### Operability

Ensure the team can see the impact of changes and diagnose issues quickly.

- **Service-level dashboards** — key metrics visible at a glance
- **Structured logs and traces** — in critical paths, enabling fast diagnosis
  without depending on specific people
- **Incident runbooks** — documented response procedures for common failure
  modes

### Discoverability

Replace tribal knowledge with documented, AI-accessible context.

- **Ownership map** — who owns what, how to reach them, decision authority
- **ADR cadence** — document significant decisions as they happen, not
  retroactively
- **"How to change X safely" guides** — for the top 5 most-changed or
  highest-risk areas of the codebase
- **AGENTS.md** — project conventions, tech stack, and workflow in a format AI
  tools can reference

### Transparency

Surface hidden business logic so AI tools can reason about it.

- **Document stored procedures, triggers, and views** — especially those
  containing business rules or data transformations
- **Map external write paths** — ETL jobs, partner integrations, scheduled jobs,
  and event consumers that modify data
- **Add tests for database-layer logic** — contract tests that verify stored
  procedure behavior without requiring full integration tests
- **Extract where practical** — move business logic from the database layer to
  application code where the cost of extraction is justified

---

## Preparation Activities by Axis

For codebases assessed at T3 (Constrained) or below, address gaps in the axes
that scored lowest. "Enough preparation" means the target area — not the entire
system — scores high enough on the
[readiness rubric](brownfield-readiness.md#readiness-rubric) that the axis no
longer blocks AI-assisted work in that area. Re-score the target area after each
preparation cycle to decide whether to continue preparing or start feature work
(see [Exit Checkpoint Protocol](#exit-checkpoint-protocol)).

> **Bounded preparation:** You don't need to prepare the entire codebase — only
> the area targeted for initial AI-assisted feature work. Expand preparation to
> additional areas as you expand AI-assisted development. When low modularity
> makes isolation infeasible, create seams first or widen the preparation scope
> (see [Key Principle](#key-principle)).

### Illustrative Preparation Sequence

For a complete traced example of a T2 codebase going through preparation and
into feature work, see the
[Brownfield Worked Example](worked-example-brownfield.md).

For codebases at T2-T1, treat preparation as a dedicated project with its own
increments:

1. **Increment 1:** Document architecture, map repositories and dependencies
   (Discoverability, Modularity)
2. **Increment 2:** Establish test coverage for critical business paths (Safety
   Net)
3. **Increment 3:** Surface and document database-layer business logic
   (Transparency)
4. **Increment 4:** Harden deployability and observability (Deployability,
   Operability)

Each increment follows the framework's iterative cycle (Increment Design -->
Implementation --> Verification --> Deployment). See the
[Project Foundation Guide](project-foundation.md#how-foundation-work-flows-through-stages)
for how foundation work maps to stages.

---

## Exit Checkpoint Protocol

After each preparation increment, evaluate whether the target area is ready for
AI-assisted feature work. Run the exit checkpoint at minimum after the second
preparation increment — the first increment rarely provides enough signal.

### Decision Framework

| Decision           | Criteria                                                                                                   |
| ------------------ | ---------------------------------------------------------------------------------------------------------- |
| **Go**             | Target area meets exit thresholds for intended AI operating mode; no critical gaps remain                  |
| **Conditional Go** | Most thresholds met; remaining gaps have documented mitigations that don't block feature work              |
| **Extend**         | Clear progress but specific axes still below threshold; one more increment has a concrete improvement plan |
| **Pivot**          | No meaningful improvement after a preparation increment; structural issues resist incremental preparation  |

### Thresholds

Exit thresholds depend on the intended AI operating mode for feature work:

| Intended Mode     | Exit Threshold                              |
| ----------------- | ------------------------------------------- |
| T5 (Ready)        | All axes 3+ in target area                  |
| T4 (Approachable) | All axes 2+, no axis 0                      |
| T3 (Constrained)  | Verifiability and Modularity 3+; rest 2+    |
| Below T3          | Consider Pivot — preparation ROI diminishes |

### Recording the Decision

Use the
[Preparation Exit Decision Template](../templates/brownfield-preparation-decision.md)
to record the before/after scores, completed increments, remaining gaps, and the
go/no-go decision.

> **Cross-reference:** The
> [Readiness Re-Assessment Protocol](brownfield-readiness.md#readiness-re-assessment-protocol)
> describes how to re-score the target area between checkpoints.

---

## Brownfield Infrastructure Planning

During **System Design**, infrastructure planning is a **required output** for
all project types. Brownfield projects have specific infrastructure planning
needs depending on whether this is the first or subsequent AI-assisted project.

### First AI-Assisted Project

- Assessment of existing infrastructure capabilities (team's tribal knowledge)
- ADRs for infrastructure adaptations or extensions
- Integration plan with existing CI/CD pipelines
- Deployment strategy within existing constraints
- Monitoring extensions or dashboard updates
- Security and compliance adjustments
- Readiness assessment using the
  [readiness rubric](brownfield-readiness.md#readiness-rubric) to determine
  foundation scope
- Preparation plan if readiness assessment identifies gaps beyond documentation
  (test coverage, pattern stabilization, dependency mapping, database logic)
- Increment plan identifying **Increment 0 = document existing context for AI**
  - What to document: architecture, conventions, constraints, infrastructure
  - Documentation structure approach (use existing or propose new)
  - Discovery approach (AI tools + team expert verification)
  - **Note:** If Increment 0 reveals significant gaps in team's understanding,
    may trigger return to System Design stage to reassess plans

### Subsequent Projects

- Assessment of existing infrastructure capabilities (use documented context)
- ADRs for infrastructure adaptations or extensions
- Integration plan with existing CI/CD pipelines
- Deployment strategy within existing constraints
- Monitoring extensions or dashboard updates
- Security and compliance adjustments
- Increment plan identifying **Increment 1 = first feature** (no foundation work
  needed)

**Key output:** All project types exit System Design with a clear plan that
enables subsequent feature delivery — greenfield and brownfield-first establish
foundations (infrastructure or documentation), brownfield-subsequent proceeds to
features.

---

## Preparation as Adoption Pilot

When a brownfield codebase needs significant preparation, the preparation
project itself can serve as the organization's adoption pilot for the framework.

**Key insight:** Preparation work — adding tests, documenting architecture,
mapping dependencies — exercises the framework's stages on familiar code. The
team builds framework fluency on territory they already know.

**Approach:**

1. Run 1-2 preparation increments through the framework's full cycle (Increment
   Design --> Implementation --> Verification --> Deployment)
2. Evaluate results using the
   [Adoption Guide success criteria](adoption.md#success-criteria-for-phase-2)
3. Decide whether to complete the full preparation project or adjust the
   approach

**Why this works:**

- Preparation outputs (tests, documentation, dependency maps) have immediate
  value regardless of whether the organization continues with the framework
- The team gains hands-on framework experience before tackling new feature work
- Lower risk than piloting on new feature development — preparation changes are
  additive, not behavior-changing

For the full organizational adoption context, see the
[Organizational Adoption Guide](adoption.md#brownfield-preparation-as-a-pilot).

---

## Common Blind Spots

Preparation scoped too narrowly is the most common cause of brownfield project
failure. Teams focus on the code directly in front of them and miss constraints
that live outside the repository or outside the codebase entirely. When these
surface mid-delivery, preparation scope expands unexpectedly — timelines slip,
stakeholder confidence erodes, and the project loses organizational support.

The items below are not exhaustive — use AI to help identify project-specific
blind spots by prompting it with your architecture context and asking what
preparation gaps it can infer.

- **External service contracts** — vendor APIs, third-party integrations, and
  legacy system interfaces that constrain what AI can safely change. A
  preparation effort that ignores these boundaries will hit them during feature
  delivery, forcing unplanned preparation work under delivery pressure.
- **Database-layer side effects** — triggers, stored procedures, and scheduled
  jobs that fire in response to application changes. The Transparency workstream
  covers documentation, but these are commonly overlooked during preparation
  scoping. AI-assisted changes that unknowingly trigger cascading side effects
  can cause production incidents.
- **Shared cross-repo dependencies** — a change in one repository that silently
  breaks another. Dependency graphs that span repos are easy to miss when
  preparing a single repo, and failures only surface during integration or
  deployment.
- **Undocumented environment-specific behavior** — config, feature flags, and
  infrastructure differences between environments that aren't captured in code.
  AI tools reason about code, not runtime context, so preparation that looks
  complete locally can fail in staging or production.
- **Compliance and regulatory constraints** — data handling rules, audit
  requirements, and regulatory obligations that exist as policy but aren't
  documented alongside the code they constrain. Discovering a compliance
  boundary mid-delivery can halt work entirely until the constraint is
  understood and addressed.

---

## Notes

**Last Updated:** 2026-03-04

Added to framework in v0.37.0. Exit Checkpoint Protocol added in v0.39.0.
