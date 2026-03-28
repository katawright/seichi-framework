# Brownfield Approach Guide

## Overview

Strategic guide for choosing how to prepare a brownfield codebase for
AI-assisted development — from organizational investment model to tactical
decisions about preparation scope and execution strategy. For the overall
brownfield preparation process, see the
[Brownfield Preparation Guide](brownfield.md).

### Why This Guide

Assessing a codebase's readiness (see the
[Brownfield Readiness Guide](brownfield-readiness.md)) tells you where you
stand. This guide helps you decide what to do about it. The right approach
depends on more than codebase state — organizational context, leadership
support, financial capacity, and business priorities all shape the decision. A
sales-led organization that can't pause feature delivery needs a different
approach than an engineering-led organization with executive buy-in for a
dedicated preparation effort.

### Goals of This Guide

- Present the range of investment models for brownfield preparation
- Help teams choose an approach that fits their organizational context
- Define AI operating modes for each readiness tier
- Provide decision frameworks for key preparation choices (wrap vs. extract,
  preparation scope, logic authority)
- Establish exit criteria for knowing when preparation is sufficient

### Key Principle

Match the investment to the organizational reality. There is no single correct
approach — a dedicated preparation project, feature-interleaved improvement, and
opportunistic fixes all have valid use cases depending on leadership support,
financial capacity, and codebase state. The wrong approach is not the one that
moves slowly — it's the one that doesn't fit the organization's constraints and
stalls entirely.

### How to Use This Guide

1. Complete the readiness assessment in the
   [Brownfield Readiness Guide](brownfield-readiness.md#readiness-rubric) first
2. Review [**Investment Models**](#investment-models) to understand the range of
   approaches
3. Check the [**AI Operating Mode**](#ai-operating-modes) for your readiness
   tier
4. Review [**Foundation Work by Tier**](#foundation-work-by-tier) for scope
   guidance
5. Evaluate [**Preparation Scope**](#preparation-scope) to determine whether
   preparation can be bounded
6. Review [**Key Decisions**](#key-decisions) that shape your preparation
   strategy
7. Proceed to the [Brownfield Enablement Guide](brownfield-enablement.md) for
   execution

---

## Investment Models

How an organization invests in brownfield preparation depends on its codebase
state, leadership support, financial capacity, and business priorities. Four
models span the spectrum from maximum upfront investment to minimal dedicated
effort.

### Full Preparation

Halt feature work. Prepare the entire codebase — or at least all areas where
AI-assisted development is planned. Resume feature delivery once preparation is
complete.

This is the fastest path to full AI value. The entire team benefits
simultaneously, there are no prepared/unprepared boundary management costs, and
future projects don't need their own preparation passes.

**When this fits:**

- Small-to-medium codebases where full preparation is measured in weeks, not
  months
- Leadership that understands the investment case and can communicate it to
  stakeholders
- Financial runway to absorb a feature delivery pause
- The preparation effort is bounded and estimable (typically T4 or high T3
  codebases)

**When this doesn't fit:**

- Large codebases where full preparation would take months
- Organizations under delivery pressure that can't pause feature work
- T2 or below, where preparation scope is uncertain and may expand

### Project-Bounded Preparation

Dedicate a project to preparing a specific target area of the codebase. Deliver
features in that area once prepared, then expand preparation to additional areas
incrementally.

This is the model the framework's
[Brownfield Enablement Guide](brownfield-enablement.md) primarily describes. It
balances upfront investment against continued feature delivery in other areas,
but requires the codebase to be modular enough that a target area can be
isolated.

**When this fits:**

- The codebase has enough modularity to isolate a target area (Modularity scored
  2+)
- The organization can fund a dedicated preparation project (even if it can't
  halt all feature work)
- There's a specific area where AI-assisted work would deliver clear value —
  giving the preparation project a concrete business case

**When this doesn't fit:**

- High coupling makes isolation infeasible (Modularity scored 0-1) — changes
  ripple across boundaries
- The organization can't justify any dedicated preparation time to stakeholders

See [Preparation Scope](#preparation-scope) for how to evaluate whether bounding
is feasible for your codebase.

### Feature-Interleaved Preparation

No dedicated preparation project. Each feature increment includes preparation
work alongside feature delivery — improving the area being worked on as part of
delivering features there.

This model produces a gradual AI contribution curve. Early increments deliver
features with minimal AI assistance while improving the codebase. As preparation
accumulates, AI contribution grows — slowly at first, then accelerating as
prepared areas connect and compound.

The effectiveness of this model depends heavily on whether engineering
leadership maintains a cohesive plan. With a plan, each increment targets the
highest-value preparation work for the next increment's area, and improvements
build on each other. Without a plan, preparation accumulates randomly and may
never reach the tipping point where AI contribution accelerates.

**When this fits:**

- The organization won't fund dedicated preparation time, but engineering
  leadership understands the need
- Teams can absorb modest preparation overhead (10-20% of increment capacity)
  within feature delivery
- Engineering leadership has a cohesive improvement plan that sequences
  preparation work strategically across increments

**When this doesn't fit:**

- The codebase is so hostile (T1-T2) that meaningful preparation requires
  focused effort — 10-20% overhead won't move the needle
- Engineering leadership lacks the organizational authority or team alignment to
  maintain a cohesive plan across increments
- Feature delivery pressure is so intense that any non-feature work gets cut
  from every increment

### Opportunistic Improvement

Individual engineers improve the codebase where they can, when they can. No
dedicated investment, no cohesive plan. Engineers who understand the value of
preparation make improvements in the course of their regular work.

This is the slowest and least predictable path. It depends on individual
initiative and produces inconsistent results — some areas improve while others
don't, and improvements may not align with where AI-assisted work would deliver
the most value.

**When this is what happens:**

- The organization doesn't understand or support preparation investment
- Engineering leadership lacks the authority to allocate time for improvement
- This is often the default when no explicit decision is made — it's what
  happens when engineers know the codebase needs work but have no organizational
  support

**The risk:**

Preparation may never accumulate enough to reach the tipping point where AI
contribution accelerates. Without a plan, improvements move in various
directions — some engineers add tests, others improve documentation, others
refactor coupling — without building toward a coherent prepared state.

### Choosing an Investment Model

The right model depends on organizational context as much as codebase state:

| Factor                       | Full          | Project-Bounded      | Interleaved            | Opportunistic         |
| ---------------------------- | ------------- | -------------------- | ---------------------- | --------------------- |
| **Leadership understanding** | High          | Moderate             | Low-moderate           | Low                   |
| **Financial capacity**       | Feature pause | Preparation project  | 10-20% overhead        | No dedicated capacity |
| **Codebase size**            | Small-medium  | Any (bounded area)   | Any                    | Any                   |
| **Modularity requirement**   | Any           | Moderate+ (isolable) | Any                    | Any                   |
| **Readiness tier**           | T3-T4         | T2-T4                | T3-T4                  | Any                   |
| **Time to AI value**         | Fastest       | Moderate             | Gradual (hockey stick) | Slowest / uncertain   |

> **No model is inherently wrong.** Each reflects a different organizational
> reality. The framework's
> [Brownfield Enablement Guide](brownfield-enablement.md) provides the most
> detailed execution guidance for the project-bounded model, but the principles
> (discovery, enablement workstreams, exit criteria) apply to all models.

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
[Brownfield Enablement Guide: Discovery Activities](brownfield-enablement.md#discovery-activities)

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
[Brownfield Enablement Guide: Enablement Workstreams](brownfield-enablement.md#enablement-workstreams)

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
[Brownfield Enablement Guide: Enablement Workstreams](brownfield-enablement.md#enablement-workstreams)

> **Preparation as a pilot:** This enablement program can serve as your
> organization's adoption pilot. See
> [Preparation as Adoption Pilot](brownfield.md#preparation-as-adoption-pilot)
> for details.

### T1 — Entrenched

AI can help locally (single-module improvements, documentation, test
generation), but system-level change remains expensive due to deep structural
issues.

Use a **strangler strategy** — focus on creating seams and contracts that
isolate areas for AI-assisted work. Expect multi-phase stabilization over
quarters, not weeks.

**Next step:**
[Brownfield Enablement Guide: Enablement Workstreams](brownfield-enablement.md#enablement-workstreams)

### T0 — Rebuild

Don't "AI your way out" of fundamental structural problems. When remediation ROI
is poor, plan a **parallel build + migration** — use AI to accelerate the new
build and migration tooling rather than trying to improve the existing codebase.

**Indicators that T0 applies:**

- Preparation effort estimated at 6+ months with uncertain outcomes
- Architecture is fundamentally incompatible with incremental modification
- Business logic is distributed across untestable layers with no documentation
- The system is already a candidate for replacement on other grounds

**Decision criteria:** Compare estimated preparation cost (to reach T3 for the
target area) against estimated parallel-build cost (to reach minimum viable
replacement):

- **Parallel build cheaper or comparable:** Prefer parallel build + migration.
  Use AI to accelerate the new build and migration tooling.
- **Preparation boundable to a specific area:** Even at T0 system-level, bounded
  preparation of a specific target area may be justified if that area's value
  supports the investment. Score the target area separately — it may be T2 or T3
  even when the system overall is T0.
- **Wrapping has independent value:** T0 systems where wrapping specific
  components (testing them as black boxes behind contracts) provides safety for
  ongoing maintenance may justify partial preparation investment. See
  [Wrap vs. Extract](#wrap-vs-extract) for the decision framework.

---

## Foundation Work by Tier

| Tier | Foundation Work                                                                                                 | Exit Threshold                           |
| ---- | --------------------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| T5   | Minimal — create AGENTS.md with conventions                                                                     | N/A — already ready                      |
| T4   | Focused discovery increment (1-2 weeks)                                                                         | All axes 2+, no axis 0                   |
| T3   | Extended foundation — discovery + targeted preparation (time-boxed)                                             | Verifiability and Modularity 3+; rest 2+ |
| T2   | Dedicated enablement project spanning multiple increments                                                       | Target area reaches T3+ thresholds       |
| T1   | Multi-phase stabilization; may need architecture changes before preparation yields value                        | Target area reaches T3+ thresholds       |
| T0   | Strategic evaluation — strangler/parallel build likely more cost-effective than preparing the existing codebase | N/A — different approach                 |

See [Preparation Scope](#preparation-scope) for how preparation scope affects
foundation work.

---

## Preparation Scope

Whether preparation targets the entire codebase or a specific area is both a
strategic choice (see [Investment Models](#investment-models)) and a technical
feasibility question. Even when the organization chooses project-bounded or
feature-interleaved preparation, the codebase may not cooperate — high coupling
and low modularity can make it impossible to isolate a target area.

### Bounded Preparation

Bounded preparation targets a specific area of the codebase rather than the
entire system. Define the target area, prepare it for AI-assisted feature work,
deliver features there, then expand preparation to additional areas
incrementally. This keeps effort focused and time-boxed.

Bounding works when:

- The target area has clear boundaries (module, service, package, bounded
  context)
- Changes within the area don't routinely ripple into unprepared areas
- The area's dependencies are documented and stable
- Modularity scored 2+ for the target area

Bounding is a per-area investment — future projects touching unprepared areas
may need their own preparation pass. Factor this into project planning.

### When Bounding Is Not Feasible

When modularity is low and coupling is high (Modularity scored 0-1), isolating a
target area may not be feasible. Changes ripple across boundaries and
foundational layers can't be sliced. In these cases:

- **Invest in isolation first:** Create seams and anti-corruption layers that
  establish boundaries, then bound preparation within them. This is itself a
  preparation activity — it produces the modularity that makes bounded
  preparation possible.
- **Widen the preparation scope:** If the coupled area is manageable in size,
  prepare the full coupled region rather than trying to slice it.
- **Choose a different investment model:** If isolation investment is too large
  and the coupled region is too wide, the project-bounded model may not be the
  right fit. Consider full preparation (if the organization can support it) or
  feature-interleaved (if it can't).

See the [Brownfield Readiness Guide](brownfield-readiness.md#modularity) to
score modularity for your target area.

---

## Key Decisions

These decisions shape preparation strategy and recur across brownfield projects.

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
the readiness assessment. These affect both
[Modularity](brownfield-readiness.md#modularity) (hidden coupling) and
[Transparency](brownfield-readiness.md#transparency) (hidden logic).

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

## Notes

**Last Updated:** 2026-03-28

Added to framework as part of the brownfield guide restructuring (readiness →
approach → enablement). Content moved from the Brownfield Readiness Guide (AI
Operating Modes, Foundation Work by Tier, Preparation Scope, Key Concepts) and
the Brownfield Enablement Guide (Exit Checkpoint Protocol). Business
Justification and Preparation as Adoption Pilot moved to the
[Brownfield Preparation Guide](brownfield.md) as process-level content.
