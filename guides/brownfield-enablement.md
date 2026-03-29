# Brownfield Enablement Guide

## Overview

Tactical guide for brownfield enablement — specific techniques for improving
readiness across each assessment axis, discovery activities, and key decisions
that arise during preparation. For T0-T1 codebases where the chosen approach is
replacement rather than improvement, this guide also covers rebuild execution
patterns. For strategic decisions about investment model, preparation scope, and
exit criteria, see the [Brownfield Approach Guide](brownfield-approach.md). For
the overall brownfield preparation process, see the
[Brownfield Preparation Guide](brownfield.md).

### Why Brownfield Enablement

Brownfield codebases that score below T5 on the
[readiness rubric](brownfield-readiness.md#readiness-rubric) need some level of
preparation — from a focused documentation pass at T4 to targeted technical
improvements at T3 and below — before AI tools can assist feature development
effectively. Without structured preparation guidance, teams either prepare too
little (AI-assisted work fails on an unsuitable codebase) or too much
(preparation becomes an open-ended refactoring project that never reaches
feature work).

### Goals of This Guide

- Provide specific, actionable techniques for improving each readiness axis
- Define discovery activities and key decisions for brownfield preparation
- Cover rebuild execution patterns for T0-T1 scenarios
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
4. Use [**Enablement Tactics**](#enablement-tactics) to target the axes that
   scored lowest
5. If Rebuild is the chosen approach, see
   [**Rebuild Tactics**](#rebuild-tactics) for execution patterns
6. See [**Preparation Sequencing**](#preparation-sequencing) for how to order
   preparation work across increments
7. Review [**Common Blind Spots**](#common-blind-spots) for preparation gaps
   specific to your project

---

## Discovery Activities

All brownfield projects — even those assessed as "AI-Ready" — benefit from a
discovery pass that documents existing systems for AI context. Discovery is the
minimum foundation work for any brownfield project adopting AI assistance.

### When Discovery Happens

Discovery takes shape during **System Design**, where the detailed readiness
assessment is itself an exercise in understanding the existing system. The
formal discovery deliverables — AGENTS.md, architecture documentation,
dependency maps — are then produced as **Increment 0**, the first iterative
increment following System Design. For codebases at T5-T4, discovery may
complete within System Design itself. For T3 and below, Increment 0 is a
dedicated increment focused on producing the artifacts below. See the
[Brownfield Worked Example](worked-example-brownfield.md#discovery-increment-increment-0)
for a traced illustration.

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

- **Architecture discovery:**
  [System Design Reference: First AI-Assisted Project (Discovery)](../stages/system-design/reference.md#first-ai-assisted-project-discovery)
- **Deployment infrastructure:**
  [Deployment Setup Guide: Brownfield Path](../stages/deployment/setup.md#brownfield-path)
- **Operational processes:**
  [Support Operations Guide: Brownfield Path](../stages/support/operations.md#brownfield-path)

---

## Enablement Tactics

For each readiness axis, this section describes specific techniques that move a
codebase up the readiness spectrum. Pick 2-3 axes per preparation cycle based on
the axes that scored lowest in the
[readiness rubric](brownfield-readiness.md#readiness-rubric).

The techniques listed are starting points, not exhaustive checklists. Teams
should determine which approaches fit their codebase and constraints — AI tools
can help brainstorm and prioritize techniques for your specific situation.

### Verifiability

When test coverage is low (scored 0-2), AI-generated changes can't be verified
automatically. Every change requires manual verification, eliminating the speed
advantage. These techniques build the verification foundation that makes
AI-generated code safe to merge.

- **Characterization tests** — Before modifying legacy code, write tests that
  capture the code's current behavior — including edge cases and unexpected
  outputs. These are not tests of "correct" behavior; they document what the
  code actually does today. If an AI-generated change breaks a characterization
  test, the change has side effects that need investigation. Start with the code
  you plan to modify first. (Search: "characterization testing", Feathers
  _Working Effectively with Legacy Code_)

- **Introduce seams** — A seam is a point in the code where behavior can be
  changed without editing the code under test. When code has hard-wired
  dependencies — direct database calls, static method calls, file I/O — you
  can't test it in isolation. Introducing a seam (extracting an interface,
  wrapping a dependency in a method that can be overridden, injecting a
  dependency through a constructor) makes the code testable without
  restructuring the entire module. Seams are the minimum change needed to get
  tests around legacy code. (Search: "seam types legacy code", Feathers _Working
  Effectively with Legacy Code_)

- **Refactor impure statics** — Static methods that read configuration, hit
  databases, or produce side effects are a common testability blocker. They
  can't be overridden or mocked in most languages, so any code that calls them
  is untestable in isolation. Extract the static logic into instance methods on
  a class that can be injected, or wrap the static call in a virtual method that
  tests can override. This is often the single highest-leverage change for
  improving test coverage in legacy code. (Search: "static cling anti-pattern",
  Fowler _Refactoring_)

- **Golden-flow e2e tests** — Identify the 5-10 most critical user paths — the
  flows that, if broken, would stop business operations — and ensure they have
  stable, non-flaky end-to-end tests. These provide a safety net for broader
  changes even before unit test coverage improves. Focus on stability over
  coverage: a small number of reliable e2e tests is more valuable than a large
  suite of flaky ones.

- **Test data strategy** — When tests depend on production data snapshots or
  manual database setup, they're fragile, slow, and hard to run in CI. Establish
  reproducible test data through factories, builders, or seed scripts that
  create known-good state without depending on production. This is a
  prerequisite for reliable CI — without it, test flakiness erodes confidence in
  AI-generated changes.

- **Contract tests at integration boundaries** — Test the boundaries between
  modules, services, and external dependencies. When module A calls module B, a
  contract test verifies that B still accepts A's inputs and returns expected
  outputs. These catch breakage at seams — the exact points where AI-generated
  changes in one module are most likely to affect another.

### Modularity

When coupling is high (scored 0-2), AI can't reason about one area without
understanding the entire system. Changes ripple across module boundaries in ways
AI doesn't anticipate. These techniques create the architectural boundaries that
let AI work within a defined scope.

- **Wrap vs. extract** — When existing code is poorly structured for AI-assisted
  modification, teams face a choice: **wrap** it (build around it, treating it
  as a black box) or **extract** and restructure it (make it AI-accessible).
  Default to wrap-first for initial AI-assisted projects — wrapping provides
  sufficient safety without the cost and risk of extraction. Extraction can
  follow as a separate decision when it has independent value.

  | Factor              | Wrap                                                              | Extract                                                                       |
  | ------------------- | ----------------------------------------------------------------- | ----------------------------------------------------------------------------- |
  | **Speed**           | Faster — test without modifying                                   | Slower — requires restructuring                                               |
  | **Risk**            | Lower — existing behavior unchanged                               | Higher — behavior may change                                                  |
  | **AI visibility**   | Low — AI can't see inside the black box                           | High — logic in application code                                              |
  | **When to choose**  | First AI project, time pressure, high stored procedure complexity | Logic needs modification, team lacks DBA support, AI visibility is a priority |
  | **Long-term value** | Safety net for current behavior                                   | Architectural improvement                                                     |

- **Anti-corruption layers** — When a legacy subsystem has complex internals
  that AI shouldn't need to understand, wrap it behind a clean interface. The
  rest of the system (including AI-generated code) interacts with the wrapper,
  not the legacy internals. The wrapper translates between the legacy model and
  your domain model, isolating complexity. Especially valuable for subsystems
  you don't plan to modify — AI can treat them as black boxes with documented
  contracts. (Search: "anti-corruption layer pattern", Evans _Domain-Driven
  Design_)

- **Extract bounded contexts** — When business domains are tangled — when
  changing customer logic requires understanding billing, which requires
  understanding inventory — identify the domain boundaries and establish
  explicit contracts between them. Start with the area targeted for AI-assisted
  work: define what it owns, what it depends on, and how those dependencies are
  accessed. The goal isn't perfect domain modeling — it's enough isolation that
  AI can reason about one domain without understanding all of them. (Search:
  "bounded context extraction", Evans _Domain-Driven Design_)

- **Dependency inversion at module boundaries** — When modules depend directly
  on concrete implementations of other modules, changes propagate unpredictably.
  Introduce abstractions (interfaces, contracts) at module boundaries so modules
  depend on the abstraction, not the implementation. This lets AI modify the
  internals of one module without affecting consumers. (Search: "dependency
  inversion principle")

- **Facade over tangled subsystems** — When a subsystem is internally complex
  but externally used through a few common patterns, create a simplified
  interface (facade) that covers the common use cases. AI-generated code
  interacts with the facade rather than navigating the subsystem's internals.
  Unlike an anti-corruption layer (which translates between models), a facade
  simplifies access without changing the underlying model.

- **Break circular dependencies** — When modules depend on each other (directly
  or through a chain), neither can be reasoned about in isolation. Identify
  cycles in the dependency graph and break them by extracting shared concepts
  into a separate module, introducing events or callbacks, or inverting one
  direction of the dependency. AI tools struggle most with circular dependencies
  because they can't establish a bounded reasoning scope.

### Discoverability

When system knowledge lives in people's heads (scored 0-2), AI fills knowledge
gaps with plausible guesses — producing output that sounds right but may be
wrong. These techniques replace tribal knowledge with documented, AI-accessible
context.

> **Relationship to Discovery Activities:** The
> [Discovery Activities](#discovery-activities) section covers the minimum
> documentation foundation for all brownfield projects. This section goes
> further — addressing deeper knowledge gaps in codebases where discoverability
> scored low enough to warrant targeted improvement beyond basic discovery.

- **AGENTS.md** — Create a project conventions file in the repository root that
  captures the information AI tools need: tech stack, architectural decisions,
  coding patterns, naming conventions, and constraints. This is the single
  highest-leverage discoverability improvement — AI tools read it automatically
  and use it to calibrate their output. Include what patterns are canonical,
  what anti-patterns to avoid, and any project-specific constraints that aren't
  obvious from the code. Update it as conventions evolve.

- **Architecture decision records (ADRs)** — Document significant decisions as
  they happen, not retroactively. Each ADR captures the context (what prompted
  the decision), the decision itself, and the consequences (what this enables
  and constrains going forward). ADRs are valuable for AI because they explain
  _why_ the system is structured a certain way — without them, AI may suggest
  changes that unknowingly reverse deliberate decisions. (Search: "lightweight
  architecture decision records")

- **"How to change X safely" guides** — For the top 5 most-changed or
  highest-risk areas of the codebase, document the steps, risks, and
  verification needed to make changes safely. These capture the procedural
  knowledge that experienced engineers carry but rarely write down: "if you
  change the pricing engine, you also need to update the tax calculation and
  re-run the reconciliation suite." AI tools can reference these guides to
  produce changes that account for non-obvious dependencies.

- **Ownership map** — Document who owns what, decision authority for each area,
  and how to reach them. AI can't ask "who should I talk to about this?" — an
  ownership map bridges that gap and helps AI tools flag when a change crosses
  ownership boundaries, prompting human coordination.

- **AI-assisted documentation drafting** — Use AI tools in advisory mode to
  draft architecture documentation from code analysis. AI can trace call graphs,
  identify module boundaries, and produce initial architecture descriptions that
  are 70-80% accurate. Have team experts review and correct — this is
  dramatically faster than writing documentation from scratch. The verification
  step is critical: AI-generated documentation inherits any gaps in AI's
  understanding of the system.

### Transparency

When business logic is hidden in database layers (scored 0-2), AI generates code
that silently conflicts with rules it can't see. Changes may work at the
application layer but violate business rules enforced by stored procedures,
triggers, or scheduled jobs. These techniques surface hidden logic for AI
reasoning.

- **Stored procedure contract documentation** — For each stored procedure,
  trigger, or view containing business rules, document: inputs (with validation
  rules), outputs (including error cases), side effects (audit writes, cascade
  updates, notification triggers), and business rules enforced. This
  documentation is the stored procedure equivalent of an API contract — it tells
  AI what will happen when application code interacts with the database layer,
  without requiring AI to parse SQL. Prioritize stored procedures called from
  the target area of the codebase.

- **Version-control stored procedure definitions** — Bring stored procedure,
  trigger, and view definitions into the repository as version-controlled
  scripts using a database migration tool (e.g., Flyway, Liquibase, dbmate).
  This makes database-layer logic visible in PRs, reviewable in diffs, and
  testable in CI. Without version control, stored procedure changes happen
  outside the development workflow — invisible to code review and to AI tools.
  (Search: "database migration tool setup", "version-controlled stored
  procedures")

- **MCP server for database schema access** — Build or configure an MCP (Model
  Context Protocol) server that exposes database metadata — table structures,
  column types, foreign key relationships, stored procedure definitions, trigger
  definitions, and view definitions — to AI agents. This gives AI direct access
  to database-layer information without requiring code changes or data
  extraction. Note that this improves AI's _visibility_ into the database layer
  but doesn't address _verifiability_ — AI can read stored procedure definitions
  but still can't test changes against them without separate contract tests.
  (Search: "MCP server database", "Model Context Protocol")

- **Logic authority mapping** — In brownfield systems, business logic may be
  split across application code, stored procedures, triggers, views, and
  external services. For each significant business calculation or rule,
  establish whether the application code or the database layer is authoritative.
  When both contain the same calculation — and they may have diverged — document
  which is the source of truth and whether the other should be updated to match
  or removed. This directly addresses the "who is right?" ambiguity that causes
  AI-generated code to conflict with database-layer logic. Identifying logic
  authority per domain area is critical for scoping AI-assisted work — AI tools
  can reason about application code but need explicit documentation for
  database-layer and external-service logic.

- **External write path inventory** — Systems where external processes write
  directly to the database — ETL jobs, partner integrations, scheduled imports,
  manual data fixes — create hidden dependencies that AI-assisted changes may
  break. Identify and document all external write paths during discovery: what
  writes, what it writes to, when, and what business rules it enforces or
  bypasses. Without this inventory, AI-generated schema changes or data
  validation logic may silently break processes that operate outside the
  application layer.

- **Contract tests for database-layer logic** — Write integration tests that
  verify stored procedure behavior through their inputs and outputs, without
  requiring a full end-to-end test setup. These tests document expected behavior
  and catch regressions when stored procedures are modified. For stored
  procedures with business rules, each rule should have at least one test
  verifying the expected outcome. This bridges the verifiability gap for
  database-layer logic.

### Consistency

When patterns are contradictory (scored 0-2), AI picks patterns by prevalence —
not by which is current or correct. It may blend approaches from different eras
of the codebase or invent new variations by synthesizing from conflicting
examples. These techniques establish the clear signals AI needs to follow the
right patterns.

- **Document canonical patterns** — For common tasks (API endpoints, error
  handling, data access, validation), identify which pattern is the current
  standard and document it in AGENTS.md or a conventions guide. When multiple
  patterns exist, explicitly state which is canonical and which is deprecated.
  AI tools can then be directed to follow the canonical pattern rather than
  picking from whatever it sees most in the code.

- **Automated linting and formatting** — Add linting rules and formatters that
  enforce the canonical patterns. These catch deviations before review —
  including deviations in AI-generated code. Start with the patterns that cause
  the most confusion: if the team argues about error handling approaches in code
  review, that's where a linting rule adds the most value.

- **Pattern migration strategy** — When migrating between patterns (e.g., from
  callbacks to async/await, from one ORM to another), document which is old and
  which is new. Set a timeline for convergence and track progress. Without a
  migration strategy, both patterns persist indefinitely and AI randomly picks
  between them. A gradual, tracked convergence gives AI clear signals about
  which pattern to use in new code.

- **Exemplar modules** — Designate 2-3 well-structured modules as reference
  implementations that follow all canonical patterns. AI tools can be directed
  to follow the patterns in exemplar modules rather than learning from the
  codebase at large. This is particularly useful early in a consistency
  improvement effort, before the majority of the codebase has converged.

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

## Rebuild Tactics

For T0-T1 codebases, enabling AI-assisted development may mean building new
rather than improving existing. When the readiness assessment indicates T0-T1
and the organization has chosen the
[Rebuild investment model](brownfield-approach.md#rebuild-parallel-build), the
challenge shifts from preparing the existing codebase to incrementally replacing
it. These techniques enable gradual replacement while maintaining the existing
system. AI operates at full greenfield effectiveness on the new system while the
existing system continues to handle unmigrated functionality.

- **Strangler fig pattern** — Build new functionality alongside the existing
  system. Route requests through a proxy or gateway that directs some traffic to
  the new system and some to the old. New features go straight to the new
  system; existing features migrate one by one. The old system shrinks as the
  new system grows until it can be decommissioned. This avoids big-bang cutover
  risk and lets the team validate the new system under real traffic before
  committing to full migration. (Search: "strangler fig pattern")

- **Branch by abstraction** — When replacing a specific component within the
  existing system (rather than building a parallel system), introduce an
  abstraction layer between the consumers and the component being replaced.
  Implement the new version behind the abstraction. Toggle between old and new
  implementations using feature flags or configuration. Once the new
  implementation is validated, remove the old one and the abstraction layer.
  Works well for database layers, third-party integrations, and internal
  libraries. (Search: "branch by abstraction")

- **Event-driven decoupling** — Introduce an event bus or message queue between
  old and new systems. When data changes in either system, events are published
  and consumed by the other. This allows the systems to evolve independently
  while staying synchronized. Particularly useful when the old system can't be
  modified to call the new system directly — the event bus acts as a neutral
  boundary. (Search: "event-driven migration", "CQRS migration pattern")

- **Data migration strategy** — Plan how data moves from the old system to the
  new one. Options include: bulk migration (copy all data at once during a
  maintenance window), trickle migration (migrate data record-by-record as it's
  accessed), and dual-write with reconciliation (write to both systems and
  verify consistency). The choice depends on data volume, tolerance for
  downtime, and consistency requirements. AI can help generate migration scripts
  and reconciliation checks, but the strategy decision requires human judgment
  about acceptable risk.

---

## Preparation Sequencing

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
   considerations)

Each increment follows the framework's iterative cycle (Increment Design -->
Implementation --> Verification --> Deployment). See the
[Project Foundation Guide](project-foundation.md#how-foundation-work-flows-through-stages)
for how foundation work maps to stages.

---

## Brownfield Infrastructure Planning

During System Design, infrastructure planning is a required output for all
project types. Brownfield projects have specific planning needs depending on
whether this is the first or subsequent AI-assisted project. For detailed
guidance — including first-project discovery checklists, existing infrastructure
assessment, and deployment strategy — see the
[System Design Reference: Brownfield Infrastructure Planning](../stages/system-design/reference.md#brownfield-infrastructure-planning).

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
  jobs that fire in response to application changes. The Transparency enablement
  tactics cover documentation, but these are commonly overlooked during
  preparation scoping. AI-assisted changes that unknowingly trigger cascading
  side effects can cause production incidents.
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

**Last Updated:** 2026-03-29

Added to framework in v0.37.0. Renamed from Brownfield Preparation Guide to
Brownfield Enablement Guide as part of the brownfield guide restructuring
(readiness → approach → enablement). Exit Checkpoint Protocol and Preparation as
Adoption Pilot moved to the [Brownfield Approach Guide](brownfield-approach.md).
Consistency workstream added; Operability renamed to Observability; workstreams
reordered (rubric axes first, then supplementary). Enablement Workstreams
deepened to Enablement Tactics with specific per-axis techniques and canonical
references. Rebuild Tactics section added for T0-T1 execution patterns.
Infrastructure Planning replaced with cross-reference to
[System Design Reference](../stages/system-design/reference.md#brownfield-infrastructure-planning).
Preparation Activities by Axis slimmed to Preparation Sequencing. Key Decisions
(Logic Authority, Wrap vs. Extract, External Write Paths) folded into per-axis
enablement tactics (Modularity, Transparency).
