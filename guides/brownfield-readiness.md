---
id: brownfield-readiness
type: guide
concerns: [brownfield-assessment, readiness-spectrum, codebase-evaluation]
---

# Brownfield Readiness Guide

## Overview

Assessment framework and routing logic for brownfield projects adopting
AI-assisted development — from evaluating codebase state to choosing the right
preparation path.

### Why Brownfield Readiness

Brownfield projects vary enormously. A well-tested codebase with current
documentation needs only a discovery pass before AI-assisted feature work, while
a codebase with no tests, tribal-knowledge-only architecture, and tangled
multi-repo dependencies may need months of preparation. Without a structured
readiness assessment, teams either over-invest in preparation (delaying value)
or under-invest (setting AI tools up to fail on a codebase they can't reason
about effectively).

### Purpose

- Define the full brownfield readiness spectrum from Ready to Rebuild
- Provide a scored rubric for evaluating codebase readiness across six axes
- Route teams to the right preparation path and AI operating mode based on
  assessment results
- Address multi-repository and database considerations that extend beyond a
  single codebase

### Key Principle

Assess the weakest axis, not the average. A single critical gap — such as zero
test coverage or entirely undocumented architecture — can shift the overall
assessment regardless of other axes. If any axis scores 0 (the worst score),
bump the tier down at least one level unless the blast radius of that axis is
small.

### How to Use This Guide

1. Score your codebase using the [**Readiness Rubric**](#readiness-rubric) (six
   axes, 0-4 each)
2. Map your total score to a [**Readiness Tier**](#readiness-tiers) (T0-T5)
3. Follow the [**AI Operating Mode**](#ai-operating-modes) for your tier
4. Check
   [**Multi-Repository and Database Considerations**](#multi-repository-and-database-considerations)
   if your system extends beyond a single repository

### When to Assess

The readiness rubric is scored twice — once roughly, once with evidence:

- **Initiation (quick pass):** A technical person familiar with the codebase
  scores the rubric roughly (~15 minutes) to get an approximate tier and cost
  signal for the Gate 1 investment decision. The goal is a go/no-go on the
  preparation investment, not a detailed preparation plan. Capture the estimated
  tier, rough preparation effort, and Gate 1 implication in the
  [Initiation Brief](../templates/initiation-brief.md#brownfield-readiness--quick-pass-if-applicable).
- **System Design (detailed pass):** Score with evidence — test reports, CI
  logs, architecture diagrams, dependency audits — to confirm the tier, identify
  specific preparation needs, and scope Increment 0. This feeds into the Gate 2
  investment decision and the
  [Brownfield Preparation Guide](brownfield-preparation.md).

The quick pass may shift by a tier once detailed scoring happens — that's
expected and acceptable. The point is to surface order-of-magnitude cost before
committing to Requirements and System Design work.

---

## Readiness Rubric

Score each axis **0-4** (4 = best). Total score range **0-24**.

**Scoring scope:** The rubric can be applied at two levels:

- **System-level** — score the entire codebase for the initial assessment to
  determine tier and preparation strategy
- **Area-level** — score only the target area when deciding if
  [bounded preparation](#bounded-preparation) is sufficient to begin AI-assisted
  feature work there

The axis definitions work at both scopes. Use system-level scoring to plan; use
area-level scoring to decide when a prepared area is ready.

### Bounded Preparation

The goal of preparation is not to fix the entire codebase — it's to make a
specific target area ready for AI-assisted feature work. Define the area,
prepare it, deliver features, then expand preparation incrementally to
additional areas. This keeps preparation focused and time-boxed, but has two
consequences:

- Future projects touching unprepared areas may need their own preparation pass
  — preparation is a per-area investment, not a one-time cost
- When modularity is low and coupling is high, isolating a target area may not
  be feasible — invest in isolation (seams, anti-corruption layers) first, or
  widen the preparation scope

See the [Brownfield Preparation Guide](brownfield-preparation.md#key-principle)
for operational details.

### Verifiability

_Tests + CI signal: can you verify that changes — including database logic —
don't break things?_

AI generates code confidently but can't self-verify correctness. Without
automated tests, every AI-generated change requires manual verification,
eliminating the speed advantage.

| Score | Definition                                                                                                                                        |
| ----: | ------------------------------------------------------------------------------------------------------------------------------------------------- |
|     4 | Strong unit/integration coverage in critical domains; stable CI; fast feedback.                                                                   |
|     3 | Good automated regression safety net; CI mostly stable.                                                                                           |
|     2 | E2E exists but limited or flaky; unit tests sparse; CI reliability issues.                                                                        |
|     1 | Minimal automated regression; tests don't cover core flows reliably. Database-layer logic (stored procedures, triggers, scheduled jobs) untested. |
|     0 | No meaningful automated tests; validation is manual or production-only. Database-layer logic unverified and unverifiable without manual effort.   |

### Modularity

_Coupling + architecture boundaries: can you change one thing — within or across
projects — without breaking another?_

AI reasons best within clear boundaries. High coupling means AI must understand
the entire system to change one part, increasing hallucination risk and blast
radius.

| Score | Definition                                                                                                                                                 |
| ----: | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
|     4 | Clear module/service boundaries (service, package, project, or bounded context); consistent patterns; low coupling.                                        |
|     3 | Mostly consistent; some legacy hotspots; boundaries usually respected.                                                                                     |
|     2 | Mixed patterns; notable coupling; changes often ripple across modules. Cross-project references or shared dependencies add hidden coupling.                |
|     1 | High coupling + unclear ownership; business logic split across tiers without contracts. Cross-project shared dependencies make isolated changes difficult. |
|     0 | Pervasive shared state; no stable seams to test or replace.                                                                                                |

### Deployability

_Environments + releases + schema: can you ship changes safely and roll back?_

AI can produce changes faster than teams can ship them. Without safe, automated
deploys, AI-generated changes pile up or ship without rollback options.

| Score | Definition                                                                               |
| ----: | ---------------------------------------------------------------------------------------- |
|     4 | Automated deploys; easy rollback; automated DB migrations; reproducible environments.    |
|     3 | Automated deploys; schema mostly disciplined; environments mostly reproducible.          |
|     2 | Deploy pipeline exists but brittle; partial automation; schema changes sometimes manual. |
|     1 | Manual deploy steps; environment drift; schema changes manual or risky.                  |
|     0 | Releases are rare/high-risk; environments are snowflakes; schema is unmanaged.           |

### Operability

_Observability + incident readiness: can you see what's happening and respond?_

AI-generated changes may have subtle behavioral differences. Without
observability, teams can't tell whether AI-assisted changes are working
correctly in production.

| Score | Definition                                                                 |
| ----: | -------------------------------------------------------------------------- |
|     4 | Strong metrics, logs, and tracing; SLOs defined; runbooks; fast diagnosis. |
|     3 | Good logs and metrics; reasonable alerting; some runbooks.                 |
|     2 | Partial visibility; diagnosis often depends on specific people.            |
|     1 | Weak observability; incidents are long and chaotic; limited runbooks.      |
|     0 | Failures hard to detect or understand; recovery is ad hoc.                 |

### Discoverability

_Docs + ownership + workflow: can a new team member (or AI) understand the
system?_

AI tools rely on written context. Tribal knowledge is invisible to AI, so
undocumented systems force AI to guess — producing plausible but wrong output.

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
logic, ETL pipelines, or event-driven side effects. Hidden logic creates blind
spots where AI-generated changes silently conflict with business rules.

| Score | Definition                                                                                                               |
| ----: | ------------------------------------------------------------------------------------------------------------------------ |
|     4 | Business logic in application code; DB is a persistence layer; data flows are documented.                                |
|     3 | Some stored procedures or triggers, but documented and accessible; data pipelines are visible.                           |
|     2 | Moderate logic in stored procedures or ETL jobs; partially documented.                                                   |
|     1 | Significant logic in DB layer or event consumers; not accessible to AI tools without separate documentation.             |
|     0 | Critical business rules live in stored procedures, triggers, or scheduled jobs — invisible to AI tools and undocumented. |

---

## Readiness Tiers

Map your total score (sum of all six axes) to a readiness tier.

| Total | Tier | Label            | Default Posture                                                    |
| ----: | ---- | ---------------- | ------------------------------------------------------------------ |
| 20-24 | T5   | **Ready**        | AI can accelerate broadly with normal controls.                    |
| 15-19 | T4   | **Approachable** | One focused enablement increment, then operate as T5.              |
| 10-14 | T3   | **Constrained**  | AI in narrow lanes while hardening continuously.                   |
|   6-9 | T2   | **Challenging**  | Dedicated enablement program before AI helps at scale.             |
|   2-5 | T1   | **Entrenched**   | Multi-phase stabilization + architecture work; expect slow gains.  |
|   0-1 | T0   | **Rebuild**      | Consider strangler or parallel build; remediation ROI likely poor. |

> **Override rule:** If any single axis scores **0**, bump down at least one
> tier unless the blast radius of that axis is contained to a small, isolatable
> area.

### Mapping to Foundation Work

| Tier | Foundation Work                                                                                                 | Exit Threshold                           |
| ---- | --------------------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| T5   | Minimal — create AGENTS.md with conventions                                                                     | N/A — already ready                      |
| T4   | Focused discovery increment (1-2 weeks)                                                                         | All axes 2+, no axis 0                   |
| T3   | Extended foundation — discovery + targeted preparation (time-boxed)                                             | Verifiability and Modularity 3+; rest 2+ |
| T2   | Dedicated enablement project spanning multiple increments                                                       | Target area reaches T3+ thresholds       |
| T1   | Multi-phase stabilization; may need architecture changes before preparation yields value                        | Target area reaches T3+ thresholds       |
| T0   | Strategic evaluation — strangler/parallel build likely more cost-effective than preparing the existing codebase | N/A — different approach                 |

See [Bounded preparation](#readiness-rubric) above for how preparation scope
affects foundation work.

---

## Readiness Re-Assessment Protocol

After preparation increments, re-score the target area to measure progress and
inform the
[Exit Checkpoint](brownfield-preparation.md#exit-checkpoint-protocol).

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

## AI Operating Modes

Each tier defines how AI tools should be used — not just whether preparation is
needed, but what "using AI" means at that readiness level.

### T5 — Ready

AI writes and refactors code routinely; generates tests; assists reviews. Normal
guardrails apply: lint/type checks, CI gates, PR review.

### T4 — Approachable

Run an **enablement increment** (2-4 weeks) targeting the lowest-scoring axis.
Focus on documentation and discovery — creating AGENTS.md, documenting
architecture, and capturing conventions. After the increment, operate as T5.

**Next step:**
[Brownfield Preparation Guide: Discovery Activities](brownfield-preparation.md#discovery-activities)

### T3 — Constrained

AI use is allowed but scoped to well-understood areas:

- AI for **analysis, documentation, test scaffolding, and refactor suggestions**
  broadly
- AI writes production code only in **well-covered modules** (Verifiability and
  Modularity scored 3-4 for that area)
- Smaller PRs, stricter review, more "proof by tests"

Harden continuously while delivering features. Target the 2-3 lowest axes each
cycle. For high-risk changes in constrained areas, consider
[shadow mode](../stages/deployment/README.md#shadow-mode-and-gradual-rollout) to
validate behavior under production conditions before user impact. See the
[Brownfield Worked Example](worked-example-brownfield.md#shadow-mode-deployment)
for a concrete illustration of shadow mode in a T3 brownfield project.

**Next step:**
[Brownfield Preparation Guide: Enablement Workstreams](brownfield-preparation.md#enablement-workstreams)

### T2 — Challenging

AI is mostly **advisory** until safety improves. AI assists with analysis,
documentation drafting, test generation, and code review — but does not drive
production code changes at scale.

Run an **enablement program** (2-4 months) through the framework's iterative
stages before expecting major velocity gains from AI-assisted feature work.
During the preparation-to-feature transition, consider
[shadow mode](../stages/deployment/README.md#shadow-mode-and-gradual-rollout) to
supplement limited test coverage with production-level validation.

**Next step:**
[Brownfield Preparation Guide: Enablement Workstreams](brownfield-preparation.md#enablement-workstreams)

> **Preparation as a pilot:** This enablement program can serve as your
> organization's adoption pilot. See the
> [Organizational Adoption Guide](adoption.md#brownfield-preparation-as-a-pilot)
> for details.

### T1 — Entrenched

AI can help locally (single-module improvements, documentation, test
generation), but system-level change remains expensive due to deep structural
issues.

Use a **strangler strategy** — focus on creating seams and contracts that
isolate areas for AI-assisted work. Expect multi-phase stabilization over
quarters, not weeks.

**Next step:**
[Brownfield Preparation Guide: Enablement Workstreams](brownfield-preparation.md#enablement-workstreams)

### T0 — Rebuild

Don't "AI your way out" of fundamental structural problems. When remediation ROI
is poor, plan a **parallel build + migration** — use AI to accelerate the new
build and migration tooling rather than trying to improve the existing codebase.

**Indicators that T0 applies:**

- Preparation effort estimated at 6+ months with uncertain outcomes
- Architecture is fundamentally incompatible with incremental modification
- Business logic is distributed across untestable layers with no documentation
- The system is already a candidate for replacement on other grounds

> **TODO (deferred):** How far the framework should go on this end of the
> spectrum — flag-only vs. light evaluation criteria vs. full decision guide.
> Currently this tier serves as a recognition flag, not a decision framework.

---

## Assessment Output Template

The readiness assessment produces a structured output that feeds into Initiation
and System Design:

```
Tier:                T__
Axis scores:         Verifiability__ Modularity__ Deployability__
                     Operability__ Discoverability__ Transparency__
                     (total: __)
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

**Sequencing advice:**

1. Start with the central or most-depended-upon repository
2. Document cross-repo contracts and integration points
3. Treat database logic as a separate documentation and testing effort — AI
   tools analyze application code effectively but need explicit documentation
   for database-layer logic

**Scoring note:** When the system spans multiple repositories, score each axis
for the repository targeted for initial AI-assisted work. Note cross-repo
dependencies that affect Modularity and Transparency even if they originate in
other repositories.

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

## Key Concepts

The following concepts are important for brownfield readiness decisions.

### Logic Authority

_Where does the authoritative business logic live?_ In brownfield systems,
business logic may be split across application code, stored procedures,
triggers, views, and external services. Identifying logic authority per domain
area is critical for scoping AI-assisted work — AI tools can reason about
application code but need explicit documentation for database-layer and
external-service logic. This directly affects Transparency scoring.

### Wrap vs. Extract Decision

When existing code is poorly structured for AI-assisted modification, teams face
a choice: **wrap** the existing code (build new functionality around it,
treating it as a black box) or **extract** and restructure it (make it
AI-accessible). The right choice depends on the scope of planned changes, the
cost of extraction, and whether the existing code is a temporary or long-term
fixture.

### External Write Paths

Systems where external processes write directly to the database — ETL jobs,
partner integrations, manual data fixes — create hidden dependencies that
AI-assisted changes may break. Identify and document external write paths during
readiness assessment. These affect both Modularity (hidden coupling) and
Transparency (hidden logic).

---

## Notes

**Last Updated:** 2026-03-04

Added to framework in v0.37.0. Re-Assessment Protocol and exit thresholds added
in v0.39.0.
