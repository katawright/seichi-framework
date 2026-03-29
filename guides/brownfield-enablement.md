# Brownfield Enablement Guide

## Overview

Operational guide for brownfield enablement — discovery activities, enablement
workstreams, and infrastructure planning. For strategic decisions about
investment model, preparation scope, and exit criteria, see the
[Brownfield Approach Guide](brownfield-approach.md). For the overall brownfield
preparation process, see the [Brownfield Preparation Guide](brownfield.md).

### Why Brownfield Enablement

Brownfield codebases that score below T5 on the
[readiness rubric](brownfield-readiness.md#readiness-rubric) need preparation
work before AI tools can assist feature development effectively. Without
structured preparation guidance, teams either prepare too little (AI-assisted
work fails on an unsuitable codebase) or too much (preparation becomes an
open-ended refactoring project that never reaches feature work).

### Goals of This Guide

- Define discovery and preparation activities by readiness dimension
- Provide infrastructure planning guidance for first AI-assisted projects
- Connect preparation work to the framework's iterative stage cycle

### Key Principle

Preparation is not open-ended. The goal is "enough to start AI-assisted feature
work," not "perfect codebase." How preparation is scoped — full codebase,
bounded area, or interleaved with feature work — depends on both codebase state
and organizational context. See the
[Brownfield Approach Guide](brownfield-approach.md#preparation-scope) for
scoping strategy and the
[Investment Models](brownfield-approach.md#investment-models) for the range of
approaches.

### How to Use This Guide

1. Complete the readiness assessment in the
   [Brownfield Readiness Guide](brownfield-readiness.md#readiness-rubric)
2. Choose your investment model and preparation scope in the
   [Brownfield Approach Guide](brownfield-approach.md)
3. Follow [**Discovery Activities**](#discovery-activities) for all brownfield
   projects (T4 and below)
4. Review [**Key Decisions**](#key-decisions) that arise during discovery
5. Use [**Enablement Workstreams**](#enablement-workstreams) to target the axes
   that scored lowest
6. See [**Preparation Activities by Axis**](#preparation-activities-by-axis) for
   what "enough" looks like per axis
7. See [**Infrastructure Planning**](#brownfield-infrastructure-planning) for
   System Design outputs specific to brownfield projects

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

## Key Decisions

These tactical decisions recur across brownfield projects. They typically arise
during discovery and shape how enablement workstreams execute.

### Logic Authority

_Where does the authoritative business logic live?_ In brownfield systems,
business logic may be split across application code, stored procedures,
triggers, views, and external services. Identifying logic authority per domain
area is critical for scoping AI-assisted work — AI tools can reason about
application code but need explicit documentation for database-layer and
external-service logic. This directly affects
[Transparency](brownfield-readiness.md#transparency) scoring.

### Wrap vs. Extract

When existing code is poorly structured for AI-assisted modification, teams face
a choice: **wrap** the existing code (build new functionality around it,
treating it as a black box) or **extract** and restructure it (make it
AI-accessible).

| Factor              | Wrap                                                | Extract                                                                       |
| ------------------- | --------------------------------------------------- | ----------------------------------------------------------------------------- |
| **Speed**           | Faster — test without modifying                     | Slower — requires restructuring                                               |
| **Risk**            | Lower — existing behavior unchanged                 | Higher — behavior may change                                                  |
| **AI visibility**   | Low — AI can't see inside the black box             | High — logic in application code                                              |
| **When to choose**  | First AI project, time pressure, high SP complexity | Logic needs modification, team lacks DBA support, AI visibility is a priority |
| **Long-term value** | Safety net for current behavior                     | Architectural improvement                                                     |

> **Default to wrap-first** for initial AI-assisted projects. Wrapping provides
> sufficient safety for feature work without the cost and risk of extraction.
> Extraction can follow as a separate decision when it has independent value.

### External Write Paths

Systems where external processes write directly to the database — ETL jobs,
partner integrations, manual data fixes — create hidden dependencies that
AI-assisted changes may break. Identify and document external write paths during
discovery. These affect both [Modularity](brownfield-readiness.md#modularity)
(hidden coupling) and [Transparency](brownfield-readiness.md#transparency)
(hidden logic).

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

### Consistency

Establish clear conventions so AI follows the right patterns.

- **Document canonical patterns** — for common tasks (API endpoints, error
  handling, data access, validation), document which pattern is the current
  standard in AGENTS.md or a conventions guide
- **Add linting and formatting rules** — automated enforcement catches
  deviations before review
- **Converge gradually** — when migrating between patterns, document which is
  old and which is new; set a migration timeline rather than maintaining both
  indefinitely

### Deployability

> Deployability is not a readiness rubric axis (see
> [Supplementary Considerations](brownfield-readiness.md#supplementary-considerations))
> but remains an important preparation activity for shipping at AI-assisted
> pace.

Ensure AI-generated changes can ship safely and roll back quickly.

- **One-click deploy and rollback** — automate the deploy pipeline end-to-end
- **Environment reproducibility** — infrastructure as code or documented
  provisioning so environments don't drift
- **Schema discipline** — DB migration tooling, backward-compatible schema
  changes, migration runbooks with rollback strategy
- **Release gating** — health checks, canary or blue-green where possible

### Observability

> Observability is not a readiness rubric axis (see
> [Supplementary Considerations](brownfield-readiness.md#supplementary-considerations))
> but remains an important preparation activity for monitoring the higher pace
> of change.

Ensure the team can see the impact of changes and diagnose issues quickly.

- **Service-level dashboards** — key metrics visible at a glance
- **Structured logs and traces** — in critical paths, enabling fast diagnosis
  without depending on specific people
- **Incident runbooks** — documented response procedures for common failure
  modes

---

## Preparation Activities by Axis

For codebases assessed at T3 (Constrained) or below, address gaps in the axes
that scored lowest. "Enough preparation" means the target area — not the entire
system — scores high enough on the
[readiness rubric](brownfield-readiness.md#readiness-rubric) that the axis no
longer blocks AI-assisted work in that area. Re-score the target area after each
preparation cycle to decide whether to continue preparing or start feature work
(see
[Exit Checkpoint Protocol](brownfield-approach.md#exit-checkpoint-protocol)).

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
2. **Increment 2:** Establish test coverage for critical business paths
   (Verifiability)
3. **Increment 3:** Surface and document database-layer business logic;
   establish canonical patterns (Transparency, Consistency)
4. **Increment 4:** Harden deployability and observability (supplementary
   preparation)

Each increment follows the framework's iterative cycle (Increment Design -->
Implementation --> Verification --> Deployment). See the
[Project Foundation Guide](project-foundation.md#how-foundation-work-flows-through-stages)
for how foundation work maps to stages.

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

**Last Updated:** 2026-03-28

Added to framework in v0.37.0. Renamed from Brownfield Preparation Guide to
Brownfield Enablement Guide as part of the brownfield guide restructuring
(readiness → approach → enablement). Exit Checkpoint Protocol and Preparation as
Adoption Pilot moved to the [Brownfield Approach Guide](brownfield-approach.md).
Consistency workstream added; Operability renamed to Observability; workstreams
reordered (rubric axes first, then supplementary). Key Decisions (Logic
Authority, Wrap vs. Extract, External Write Paths) moved from the
[Brownfield Approach Guide](brownfield-approach.md) as tactical decisions that
arise during execution.
