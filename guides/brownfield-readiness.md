# Brownfield Readiness Guide

## Overview

Assessment framework for evaluating brownfield codebase readiness for
AI-assisted development. Score your codebase, determine your readiness tier,
then proceed to the [Brownfield Approach Guide](brownfield-approach.md) to
choose your preparation strategy. For the overall brownfield preparation
process, see the [Brownfield Preparation Guide](brownfield.md).

### Why Brownfield Readiness

Brownfield projects vary enormously. A well-tested codebase with current
documentation needs only a discovery pass before AI-assisted feature work, while
a codebase with no tests, tribal-knowledge-only architecture, and tangled
multi-repo dependencies may need months of preparation. Without a structured
readiness assessment, teams either over-invest in preparation (delaying value)
or under-invest (setting AI tools up to fail on a codebase they can't reason
about effectively).

### Goals of This Guide

- Define the full brownfield readiness spectrum from Ready to Rebuild
- Provide a scored rubric for evaluating codebase readiness across five axes
- Map scores to readiness tiers that inform preparation strategy
- Address multi-repository and database considerations that extend beyond a
  single codebase

### Key Principle

Assess the weakest axis, not the average. A single critical gap — such as zero
test coverage or entirely undocumented architecture — can shift the overall
assessment regardless of other axes. If any axis scores 0 (the worst score),
bump the tier down at least one level unless the blast radius of that axis is
small.

### How to Use This Guide

1. Score your codebase using the [**Readiness Rubric**](#readiness-rubric) (five
   axes, 0-4 each)
2. Map your total score to a [**Readiness Tier**](#readiness-tiers) (T0-T5)
3. Check
   [**Multi-Repository and Database Considerations**](#multi-repository-and-database-considerations)
   if your system extends beyond a single repository
4. Proceed to the [**Brownfield Approach Guide**](brownfield-approach.md) to
   choose your investment model, AI operating mode, and preparation strategy

### When to Assess

The readiness rubric is scored in up to two passes — a rough pass at Initiation
and, if the project proceeds, a detailed pass at System Design:

- **Initiation (quick pass):** A technical person familiar with the codebase
  scores the rubric roughly (~15 minutes) to get an approximate tier and cost
  signal for the Gate 1 investment decision. The goal is a go/no-go on the
  preparation investment, not a detailed preparation plan. Capture the estimated
  tier, rough preparation effort, and Gate 1 implication in the
  [Initiation Brief](../templates/initiation-brief.md#brownfield-readiness--quick-pass-if-applicable).
  If Gate 1 stops the project, no further assessment is needed.
- **System Design (detailed pass):** If the project proceeds past Gate 1, score
  with evidence — test reports, CI logs, architecture diagrams, dependency
  audits — to confirm the tier, identify specific preparation needs, and scope
  Increment 0. This feeds into the Gate 2 investment decision, the
  [Brownfield Approach Guide](brownfield-approach.md), and the
  [Brownfield Enablement Guide](brownfield-enablement.md).

The quick pass may shift by a tier once detailed scoring happens — that's
expected and acceptable. The point is to surface order-of-magnitude cost before
committing to Requirements and System Design work.

---

## Why These Axes

### The Mental Model

An AI agent operating on a codebase is functionally a very fast, very capable
new engineer who can only learn from written artifacts. It cannot ask someone in
Slack, absorb context from pairing sessions, or pattern-match from watching the
team work. Everything it knows comes from what it can read — code, tests,
documentation, configuration.

This means the attributes that make brownfield codebases hostile to AI agents
are the same attributes that make them hostile to new human engineers — but
amplified. A new engineer who encounters a gap in documentation can ask a
colleague. An AI agent that encounters the same gap fills it with a plausible
guess — confidently, without flagging the uncertainty. The readiness axes
measure the dimensions where this gap between "can ask" and "must guess" creates
the most risk.

### What the Axes Measure

Each rubric axis targets a specific way AI agents fail when codebase conditions
are poor:

| Axis            | AI Limitation                                                                                                       |
| --------------- | ------------------------------------------------------------------------------------------------------------------- |
| Verifiability   | AI generates with confidence and no self-doubt — it cannot self-verify correctness without automated tests          |
| Modularity      | AI is worse than humans at knowing what it doesn't know — high coupling forces it to reason about the entire system |
| Discoverability | AI fills knowledge gaps with hallucination, not questions — tribal knowledge produces plausible but wrong output    |
| Transparency    | AI cannot see logic in stored procedures, triggers, or ETL pipelines — hidden logic creates blind spots             |
| Consistency     | AI picks patterns by prevalence, not correctness — conflicting patterns produce blended or invented approaches      |

### Important But Not AI-Readiness-Specific

Two dimensions matter for AI-assisted development but are not included in the
readiness rubric because they affect all engineering work equally, regardless of
whether a human or AI wrote the code:

- **Deployability** creates a bottleneck: AI produces changes faster than teams
  can ship them, but poor deployability doesn't affect AI's ability to reason
  about code or generate correct output. A codebase with perfect deployability
  and zero tests is still hostile to AI; a codebase with strong tests and manual
  deploys works fine for AI — just slower to ship.
- **Observability** helps monitor the higher pace of change: AI-generated
  changes don't produce a different class of defects than human-generated
  changes, but the higher volume means issues surface faster. Poor observability
  makes diagnosis harder for everyone, not just for AI-assisted work.

Evaluate both alongside the rubric — see
[Supplementary Considerations](#supplementary-considerations) for scoring
guidance — but do not include their scores in the tier calculation.

---

## Readiness Rubric

Score each axis **0-4** (4 = best). Total score range **0-20**.

**Scoring scope:** The rubric can be applied at two levels:

- **System-level** — score the entire codebase for the initial assessment to
  determine tier and preparation strategy
- **Area-level** — score only the target area when deciding if
  [bounded preparation](brownfield-approach.md#bounded-preparation) is
  sufficient to begin AI-assisted feature work there

The axis definitions work at both scopes. Use system-level scoring to plan; use
area-level scoring to decide when a prepared area is ready.

### Verifiability

_Tests + CI signal: can you verify that changes — including database logic —
don't break things?_

AI generates code confidently but can't self-verify correctness. A human
engineer might hesitate, ask for a second opinion, or manually test edge cases.
AI produces output with equal confidence whether tests exist or not — making
automated verification the only reliable safety net. Without it, every
AI-generated change requires manual verification, eliminating the speed
advantage.

| Score | Definition                                                                                                                                        |
| ----: | ------------------------------------------------------------------------------------------------------------------------------------------------- |
|     4 | Strong unit/integration coverage in critical domains; stable CI; fast feedback.                                                                   |
|     3 | Good automated regression safety net; CI mostly stable.                                                                                           |
|     2 | E2E exists but limited or flaky; unit tests sparse; CI reliability issues.                                                                        |
|     1 | Minimal automated regression; tests don't cover core flows reliably. Database-layer logic (stored procedures, triggers, scheduled jobs) untested. |
|     0 | No meaningful automated tests; validation is manual or production-only. Database-layer logic unverified and unverifiable without manual effort.   |

> **Coverage expectations:** The goal is not 100% automated coverage — it's
> enough automated verification that AI-generated changes can be merged with
> reasonable confidence. Some manual verification is expected, particularly for
> visual correctness, complex business logic edge cases, and cross-system
> integration. For UI-heavy systems, visual regression testing (screenshot
> comparison against a known-good baseline) can catch unintended visual side
> effects from AI-generated changes, but it is a diff tool, not a correctness
> tool — it flags what changed, not whether new UI is correct. Factor the cost
> of residual manual review into your assessment of AI-assisted velocity gains.

### Modularity

_Coupling + architecture boundaries: can you change one thing — within or across
projects — without breaking another?_

AI reasons best within clear boundaries. A human engineer working in a highly
coupled codebase might sense that a change "feels risky" and investigate
dependencies before proceeding. AI is worse at knowing what it doesn't know — it
will make the change without recognizing that it needs to understand the broader
system, increasing hallucination risk and blast radius.

| Score | Definition                                                                                                                                                 |
| ----: | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
|     4 | Clear module/service boundaries (service, package, project, or bounded context); consistent patterns; low coupling.                                        |
|     3 | Mostly consistent; some legacy hotspots; boundaries usually respected.                                                                                     |
|     2 | Mixed patterns; notable coupling; changes often ripple across modules. Cross-project references or shared dependencies add hidden coupling.                |
|     1 | High coupling + unclear ownership; business logic split across tiers without contracts. Cross-project shared dependencies make isolated changes difficult. |
|     0 | Pervasive shared state; no stable seams to test or replace.                                                                                                |

### Discoverability

_Docs + ownership + workflow: can a new team member (or AI) understand the
system?_

AI tools rely on written context. A new human engineer with incomplete
documentation can ask colleagues, sit in on architecture discussions, or absorb
context through code review conversations. AI has none of these channels —
tribal knowledge is invisible to it. Where a human would ask a question, AI
fills the gap with a plausible guess, producing output that sounds right but may
be wrong.

| Score | Definition                                                                                       |
| ----: | ------------------------------------------------------------------------------------------------ |
|     4 | Docs and ADRs current; clear ownership; onboarding reliable; decisions traceable.                |
|     3 | Reasonable docs; ownership mostly clear; tribal knowledge limited.                               |
|     2 | Docs incomplete; ownership unclear in places; key-person dependencies exist.                     |
|     1 | Major silos; limited docs; repeated rediscovery; inconsistent review standards.                  |
|     0 | System understanding lives in tribal knowledge; changes depend on finding someone who remembers. |

### Transparency

_Database logic + ETL + event-driven side effects: is business logic visible to
AI tools?_

AI tools analyze application code directly but cannot see into database-layer
logic, ETL pipelines, or event-driven side effects. A human engineer might learn
about stored procedures through a DBA, discover triggers through incident
post-mortems, or stumble on ETL jobs during debugging. AI has no equivalent
discovery path — hidden logic creates blind spots where AI-generated changes
silently conflict with business rules.

| Score | Definition                                                                                                               |
| ----: | ------------------------------------------------------------------------------------------------------------------------ |
|     4 | Business logic in application code; DB is a persistence layer; data flows are documented.                                |
|     3 | Some stored procedures or triggers, but documented and accessible; data pipelines are visible.                           |
|     2 | Moderate logic in stored procedures or ETL jobs; partially documented.                                                   |
|     1 | Significant logic in DB layer or event consumers; not accessible to AI tools without separate documentation.             |
|     0 | Critical business rules live in stored procedures, triggers, or scheduled jobs — invisible to AI tools and undocumented. |

> **Stored procedure systems:** For codebases with significant database-layer
> business logic, score Transparency based on whether SP contracts (inputs,
> outputs, side effects, error conditions) are documented and whether
> [logic authority](brownfield-approach.md#logic-authority) is established —
> which component is authoritative for each business calculation. SP
> transparency has a different remediation path than application-code
> transparency: contract documentation and test wrapping rather than inline
> documentation and code-level test coverage. See the
> [Brownfield Enablement Guide](brownfield-enablement.md#enablement-workstreams)
> for preparation tactics.

### Consistency

_Patterns + conventions: does AI get clear signals about which approach to
follow?_

When multiple patterns exist for the same task — three error handling
approaches, two data access styles, inconsistent naming across modules — AI has
to guess which to follow. It picks based on prevalence in the code it can see,
not on which pattern is current or correct. It may blend patterns from different
eras of the codebase or invent new variations by synthesizing from conflicting
examples. A human engineer facing the same ambiguity would ask "which pattern
should I use here?" — AI just picks.

Consistency is distinct from Discoverability (patterns are visible, there are
just too many of them) and Modularity (well-modularized code can still have
inconsistent patterns across modules). The remediation path is also distinct:
establish conventions (AGENTS.md, linter rules, style guides), document which
pattern is canonical, and converge gradually.

| Score | Definition                                                                                                                                            |
| ----: | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
|     4 | Consistent patterns across the codebase; conventions documented (AGENTS.md, linters, style guides); AI can follow established approaches confidently. |
|     3 | Mostly consistent; some variation in older areas but dominant patterns clear; AI follows the right pattern most of the time.                          |
|     2 | Multiple patterns coexist for common tasks; conventions partially documented; AI must guess in some areas and may pick the wrong pattern.             |
|     1 | Significant inconsistency; contradictory patterns for the same concern; no documented conventions; AI output blends approaches unpredictably.         |
|     0 | No discernible conventions; every module follows different patterns, naming, and structural approaches; AI output will be arbitrary.                  |

---

## Supplementary Considerations

Deployability and Observability are important dimensions for AI-assisted
development but are not included in the readiness rubric score. They affect the
team's ability to ship and monitor changes at AI-assisted pace, but they do not
affect AI's ability to reason about code, generate correct output, or follow
conventions. Evaluate them alongside the rubric to inform preparation planning,
but do not include their scores in the tier calculation.

### Deployability

_Environments + releases + schema: can you ship changes safely and roll back?_

AI can produce changes faster than teams can ship them. Without safe, automated
deploys, AI-generated changes pile up or ship without rollback options. This
creates a bottleneck that limits the value of AI-assisted development regardless
of how well the codebase scores on readiness axes.

| Score | Definition                                                                               |
| ----: | ---------------------------------------------------------------------------------------- |
|     4 | Automated deploys; easy rollback; automated DB migrations; reproducible environments.    |
|     3 | Automated deploys; schema mostly disciplined; environments mostly reproducible.          |
|     2 | Deploy pipeline exists but brittle; partial automation; schema changes sometimes manual. |
|     1 | Manual deploy steps; environment drift; schema changes manual or risky.                  |
|     0 | Releases are rare/high-risk; environments are snowflakes; schema is unmanaged.           |

### Observability

_Metrics + logs + tracing: can you see what's happening and respond?_

AI-generated changes don't produce a different class of defects than
human-generated changes, but the higher pace of AI-assisted development means
issues surface faster and in higher volume. Without observability, the team
loses the feedback signal needed to validate that changes — from any source —
are working correctly in production.

| Score | Definition                                                                 |
| ----: | -------------------------------------------------------------------------- |
|     4 | Strong metrics, logs, and tracing; SLOs defined; runbooks; fast diagnosis. |
|     3 | Good logs and metrics; reasonable alerting; some runbooks.                 |
|     2 | Partial visibility; diagnosis often depends on specific people.            |
|     1 | Weak observability; incidents are long and chaotic; limited runbooks.      |
|     0 | Failures hard to detect or understand; recovery is ad hoc.                 |

---

## Readiness Tiers

Map your total score (sum of all five axes) to a readiness tier.

| Total | Tier | Label            | Default Posture                                                    |
| ----: | ---- | ---------------- | ------------------------------------------------------------------ |
| 17-20 | T5   | **Ready**        | AI can accelerate broadly with normal controls.                    |
| 13-16 | T4   | **Approachable** | One focused enablement increment, then operate as T5.              |
|  9-12 | T3   | **Constrained**  | AI in narrow lanes while hardening continuously.                   |
|   5-8 | T2   | **Challenging**  | Dedicated enablement program before AI helps at scale.             |
|   2-4 | T1   | **Entrenched**   | Multi-phase stabilization + architecture work; expect slow gains.  |
|   0-1 | T0   | **Rebuild**      | Consider strangler or parallel build; remediation ROI likely poor. |

> **Override rule:** If any single axis scores **0**, bump down at least one
> tier unless the blast radius of that axis is contained to a small, isolatable
> area.

See the
[Brownfield Approach Guide](brownfield-approach.md#foundation-work-by-tier) for
what each tier means in terms of foundation work, exit thresholds, and AI
operating modes.

---

## Readiness Re-Assessment Protocol

After preparation increments, re-score the target area to measure progress and
inform the [Exit Checkpoint](brownfield-approach.md#exit-checkpoint-protocol).

### When to Re-Assess

- After each preparation increment completes
- Before running an exit checkpoint
- After significant codebase events (major refactor, dependency upgrade,
  infrastructure migration)

### How to Re-Assess

1. Re-score the target area using the same [Readiness Rubric](#readiness-rubric)
   at **area-level** scope
2. Compare against the initial assessment scores
3. Record the before/after comparison in the
   [Preparation Exit Decision Template](../templates/brownfield-preparation-decision.md)

### What Changes Between Assessments

| Aspect       | Initial Assessment                | Re-Assessment                            |
| ------------ | --------------------------------- | ---------------------------------------- |
| **Scope**    | System-level or target area       | Target area only                         |
| **Evidence** | Estimates, tribal knowledge       | Concrete artifacts from preparation work |
| **Speed**    | 15 min (quick) to 2 hours         | 30-60 min (evidence already exists)      |
| **Audience** | Gate 1/Gate 2 investment decision | Exit checkpoint go/no-go decision        |

> **Pivot signal:** If a re-assessment shows no meaningful improvement after a
> preparation increment, this is a strong signal to Pivot rather than Extend.
> The preparation approach may not be addressing the root structural issues.

---

## Assessment Output Template

The readiness assessment produces a structured output that feeds into Initiation
and System Design:

```
Tier:                T__
Axis scores:         Verifiability__ Modularity__ Discoverability__
                     Transparency__ Consistency__
                     (total: __)
Supplementary:       Deployability__ Observability__
Top 3 risks:         (1) ...  (2) ...  (3) ...
Next 2 workstreams:  ..., ...
AI operating mode:   T__ mode
```

For the initiation brief template, see the
[Brownfield Readiness — Quick Pass section](../templates/initiation-brief.md#brownfield-readiness--quick-pass-if-applicable).

---

## Multi-Repository and Database Considerations

"The codebase" may extend beyond a single repository. Consider:

- **Multiple repositories** with shared dependencies or a central dependency
  repo
- **Cross-repository contracts** — API boundaries, shared types, and dependency
  graphs that span repos
- **Database-layer business logic** — stored procedures, triggers, and views
  containing business rules that AI tools cannot analyze directly from
  application code

### Discovery: Cross-Repo Dependency Graph

For multi-repo systems, produce a **cross-repo dependency graph** as a standard
discovery deliverable. The graph should document:

- Service-to-service API calls, noting direction (and whether bidirectional)
- Shared database consumers — services or tools that read/write directly to
  another service's database, bypassing its API
- Message queue or event bus dependencies
- Direct database access paths that bypass APIs (ETL jobs, import tools,
  reporting queries, finance exports)
- Cross-schema stored procedure calls

This graph feeds into deployment ordering analysis (see
[Deployment Stage](../stages/deployment/README.md#multi-service-deployment-ordering))
and becomes a living document maintained across increments.

### AGENTS.md for Multi-Repo Systems

Each per-repo AGENTS.md should contain a **cross-repo context section**:

- Other repos in the system, their boundaries, and their responsibilities
- Shared dependencies (databases, message queues, configuration services)
- Warnings about cross-boundary coupling (e.g., "order-service reads directly
  from inventory schema — changes to inventory tables affect order-service")
- API contracts that span repos, with links to contract documentation

For systems with **3+ repos**, consider a **system-level AGENTS.md** that
provides the high-level architecture map and links to per-repo files. This gives
AI agents system-wide context without duplicating per-repo details.

### Deployment Ordering

When services have dependencies, determine deployment order during discovery:

- **Producer before consumer** — deploy the service that provides data or events
  before the service that consumes them
- **Database before application** — apply schema changes before deploying
  application code that depends on them
- **Application before feature activation** — deploy code before enabling
  feature flags that route traffic to it

Document the ordering rationale — it feeds into the
[Deployment Stage](../stages/deployment/README.md#multi-service-deployment-ordering).

### Rollback Sequencing

Rollback order is generally the **reverse of deployment order**, with
exceptions:

- Feature flags can roll back independently (instant disable)
- Application rollback may not require database rollback if schema changes are
  backward-compatible
- Different components may have different rollback timelines — see
  [Heterogeneous Rollback](../stages/deployment/README.md#heterogeneous-rollback)

### Scoring

When the system spans multiple repositories, score each axis for the repository
targeted for initial AI-assisted work. Note cross-repo dependencies that affect
Modularity and Transparency even if they originate in other repositories.

---

## Brownfield Requirements: Capturing Constraints

During **Requirements**, brownfield projects must **capture existing system
constraints** that new work must satisfy:

- **Performance constraints:** Existing SLAs (e.g., "API responses < 1 second")
- **Security policies:** Authentication, authorization, data encryption
  standards
- **API contracts:** Existing interfaces that must remain compatible
- **Data schemas:** Database structures, data formats, integration formats
- **Compliance requirements:** Regulatory constraints already in place
- **Architectural constraints:** Patterns, frameworks, languages in use
- **Operational constraints:** Deployment windows, rollback requirements

These constraints become **Non-Functional Requirements (NFRs)** that shape
design and testing. See the
[Requirements Stage Guide](../stages/requirements/README.md#constraints) for
detailed guidance.

---

## Notes

**Last Updated:** 2026-03-28

Added to framework in v0.37.0. Re-Assessment Protocol and exit thresholds added
in v0.39.0. T0 decision framework, Transparency SP note, and multi-repo
expansion added in v0.42.0. AI Operating Modes, Foundation Work by Tier, Key
Concepts, and Bounded Preparation moved to the
[Brownfield Approach Guide](brownfield-approach.md) as part of the brownfield
guide restructuring. Rubric restructured from six axes to five: added
Consistency, moved Deployability and Observability (formerly Operability) to
supplementary considerations, added "Why These Axes" rationale section, and
recalculated tier thresholds for 0-20 scoring range.
