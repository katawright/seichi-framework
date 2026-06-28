# Brownfield Approach Guide

> **New here?** See [Framework Overview](OVERVIEW.md#brownfield-approach-guide)
> for what this guide is, why it exists, and how to use it. This file is the
> operational reference.

## Key Principle

Match the investment to the organizational reality. There is no single correct
approach — a dedicated preparation project, feature-interleaved improvement, and
opportunistic fixes all have valid use cases depending on leadership support,
financial capacity, and codebase state. The wrong approach is not the one that
moves slowly — it's the one that doesn't fit the organization's constraints and
stalls entirely.

---

## Investment Models

How an organization invests in brownfield preparation depends on its codebase
state, leadership support, financial capacity, and business priorities. Five
models span the spectrum from full system replacement to minimal dedicated
effort.

### Rebuild (Parallel Build)

Replace the existing system rather than preparing it. Build a new system in
parallel — using AI to accelerate the greenfield build and migration tooling —
while maintaining the existing system until the replacement is ready.

This is the most expensive model and requires the highest level of
organizational commitment. It is also the only model that addresses codebases
where preparation itself is not cost-effective — where the structural issues are
so deep that incremental improvement cannot reach a viable AI-assisted state
within a reasonable timeframe.

**When this fits:**

- Preparation effort estimated at 6+ months with uncertain outcomes
- Architecture is fundamentally incompatible with incremental modification
- Business logic is distributed across untestable layers with no documentation
- The system is already a candidate for replacement on other grounds
- Executive leadership understands and supports a full replacement commitment

**When this doesn't fit:**

- Preparation can be bounded to a specific target area — even at T0
  system-level, a target area may score T2 or T3 and justify bounded preparation
  instead of full replacement. Score the target area separately.
- Wrapping specific components (testing them as black boxes behind contracts)
  provides enough safety for ongoing maintenance and targeted AI-assisted work.
  See
  [Brownfield Enablement Guide: Modularity](brownfield-enablement.md#modularity)
  for the wrap vs. extract decision framework.
- The organization lacks the financial capacity or leadership alignment for a
  replacement project — in which case a preparation model or
  [no investment](#when-no-investment-is-made) may be the realistic outcome.

**Decision criteria:** Compare estimated preparation cost (to reach T3 for the
target area) against estimated parallel-build cost (to reach minimum viable
replacement). When preparation is cheaper or boundable, prefer a preparation
model. When parallel build is cheaper or comparable and the system is already a
replacement candidate, prefer Rebuild.

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
- T2 or below, where preparation scope is uncertain and may expand — at T1,
  evaluate whether stabilization is realistic before committing; if not,
  consider [Rebuild](#rebuild-parallel-build) instead

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

| Factor                     | Rebuild              | Full          | Project-Bounded      | Interleaved            | Opportunistic         |
| -------------------------- | -------------------- | ------------- | -------------------- | ---------------------- | --------------------- |
| **Leadership commitment**  | Very high            | High          | Moderate             | Low-moderate           | Low                   |
| **Financial capacity**     | Replacement project  | Feature pause | Preparation project  | 10-20% overhead        | No dedicated capacity |
| **Codebase size**          | Any                  | Small-medium  | Any (bounded area)   | Any                    | Any                   |
| **Modularity requirement** | N/A (building new)   | Any           | Moderate+ (isolable) | Any                    | Any                   |
| **Readiness tier**         | T0-T1                | T1-T4         | T1-T4                | T3-T4                  | Any                   |
| **Time to AI value**       | Fast (on new system) | Fastest       | Moderate             | Gradual (hockey stick) | Slowest / uncertain   |

> **No model is inherently wrong.** Each reflects a different organizational
> reality. The framework's
> [Brownfield Enablement Guide](brownfield-enablement.md) provides the most
> detailed execution guidance for the project-bounded model, but the principles
> (discovery, enablement tactics, exit criteria) apply to all models.

### When No Investment Is Made

When neither leadership commits to a preparation or rebuild effort nor
individual engineers self-organize to improve the codebase, the result is no
AI-assisted development in that area. This is distinct from Opportunistic
improvement — Opportunistic assumes willing engineers making progress without
organizational support; no investment means neither organizational nor
individual effort is applied.

This outcome is not a failure of the assessment process. Recognizing that
AI-assisted development is not viable for a particular codebase — given current
organizational constraints — is itself a valuable conclusion. The readiness
assessment has surfaced the gap between the codebase's current state and what
AI-assisted work requires; the organization has decided (explicitly or by
default) not to close it.

The assessment remains valid. If organizational conditions change — new
leadership support, different financial priorities, a triggering event like a
major incident or competitive pressure — teams can return to the readiness
assessment and choose an investment model at that point.

---

## Foundation Work by Tier

Target conditions define the minimum axis scores at which the target area
supports safe AI-assisted feature work. They are not total-score targets — they
ensure the specific axes that matter most for each operating mode are strong
enough. (For what each tier's operating mode means, see the
[readiness tier definitions](brownfield-readiness.md#readiness-tiers).) T4
targets T5 because the gap is small and documentation-level. T3's target
conditions keep it at T3 — the goal is making the T3 operating mode safe to run
in, not reaching T4. T2 and T1 both target T3 because that is the lowest tier at
which AI contributes production code.

| Tier | Foundation Work                                                                                                     | Target Conditions                              |
| ---- | ------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------- |
| T5   | Minimal — create AGENTS.md with conventions                                                                         | N/A — already ready                            |
| T4   | Focused discovery increment (1-2 weeks)                                                                             | All axes 3+; at least two axes 4+ (target: T5) |
| T3   | Extended foundation — discovery + targeted preparation (time-boxed)                                                 | Verifiability and Modularity 3+; rest 2+       |
| T2   | Dedicated enablement project spanning multiple increments                                                           | Target area reaches T3 conditions              |
| T1   | Multi-phase stabilization; may need architecture changes before preparation yields value                            | Target area reaches T3 conditions              |
| T0   | [Rebuild](#rebuild-parallel-build) — parallel build likely more cost-effective than preparing the existing codebase | N/A — different approach                       |

Teams can choose a different target mode than the defaults above. For example, a
T2 team that wants to reach T4 (Approachable) before beginning feature work
should target: all axes 2+; at least three axes 3+.

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
  right fit. Consider full preparation (if the organization can support it),
  feature-interleaved (if it can't), or [Rebuild](#rebuild-parallel-build) if
  the cost of creating isolation exceeds the value of preparing the existing
  system.

See the [Brownfield Readiness Guide](brownfield-readiness.md#modularity) to
score modularity for your target area.

---

## Exit Checkpoint Protocol

Gate 2 commits to a specific number of preparation increments — typically 1-3,
scoped during System Design based on the readiness assessment and the
[Foundation Work by Tier](#foundation-work-by-tier) table. The exit checkpoint
runs after each preparation increment as an **early exit opportunity**: have we
met the target conditions ahead of schedule? If so, stop preparing and start
delivering features.

### Within Committed Scope

After each preparation increment, re-score the target area (see
[Re-Assessment Protocol](brownfield-readiness.md#readiness-re-assessment-protocol))
and compare against the target conditions in
[Foundation Work by Tier](#foundation-work-by-tier).

| Decision           | When                                                                                          |
| ------------------ | --------------------------------------------------------------------------------------------- |
| **Go**             | Target area meets conditions for intended operating mode; proceed to feature work             |
| **Conditional Go** | Most conditions met; remaining gaps have documented mitigations that don't block feature work |
| **Continue**       | Committed increments remain and conditions are not yet met; continue with the next increment  |

**Go** and **Conditional Go** are early exits — preparation ends before the
committed scope is exhausted because the target area is ready. **Continue** is
the default when increments remain; it does not require justification beyond
confirming that the preparation plan is still on track.

### At the End of Committed Scope

If the final committed increment completes and the target area has not reached
the intended conditions, this is not a decision the exit checkpoint can make
alone. It requires a **return to the gate system** for a new investment
decision:

| Outcome                    | Gate Action                                                                                                     |
| -------------------------- | --------------------------------------------------------------------------------------------------------------- |
| **Close to target**        | Gate approves 1-2 additional increments with a concrete plan — a new, bounded commitment                        |
| **Meaningful progress**    | Gate re-evaluates the investment: adjust the target operating mode (e.g., T4 → T3), extend scope, or stop       |
| **No meaningful progress** | Gate pivots: change the investment model (e.g., from project-bounded to rebuild) or stop preparation investment |

The key distinction: extending preparation beyond the committed scope is an
**investment decision**, not a preparation-team decision. It goes back through
the gate process with updated evidence (before/after scores, completed work,
remaining gaps) so that stakeholders who approved the original investment can
evaluate whether continued preparation is justified.

### Recording the Decision

Use the
[Preparation Exit Decision Template](../templates/brownfield-preparation-decision.md)
to record the before/after scores, completed increments, remaining gaps, and the
decision. For end-of-scope decisions that require a new gate approval, use the
[Gate Decision Template](../templates/gate-decision.md) for the investment
decision and reference the exit checkpoint evidence.

---

## Notes

**Last Updated:** 2026-06-28

Added to framework in v0.42.0.
