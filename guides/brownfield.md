# Brownfield Preparation Guide

> **New here?** See
> [Framework Overview](OVERVIEW.md#brownfield-preparation-guide) for what this
> guide is, why it exists, and how to use it. This file is the operational
> reference.

## Key Principle

The goal is bounded preparation — assess what you have, decide how much to
invest, enable the target area, then start delivering features. For codebases
where bounding is not feasible, the assessment surfaces that reality early,
before the organization commits to an approach that won't deliver value.

---

## What Brownfield Preparation Involves

Every brownfield project starts with an existing system — but the complexity of
that system varies enormously. It may be a single-repo application with clean
architecture, or a multi-repo system with business logic spread across
application code, stored procedures, triggers, and views. How much preparation a
project needs depends on the current state of its target area — not on whether
this is the organization's first or fifth AI-assisted project:

- **Area not yet assessed** — full discovery and readiness assessment needed.
  May lead to enablement work depending on what the assessment reveals.
- **Area partially prepared** — a previous project did discovery or partial
  enablement. Assess remaining gaps and continue from where prior work left off.
- **Area fully prepared** — preparation is complete, whether from a dedicated
  preparation effort or codebase-wide investment. Proceed directly to feature
  delivery.

The readiness assessment ([Step 1](#step-1-assess-readiness)) determines which
case applies.

### Why AI Tools Need Preparation

AI tools reason about code they can see and context they're given. The readiness
assessment may surface gaps that limit AI effectiveness — common ones include:

- **Tribal knowledge** — architecture, conventions, and constraints that exist
  only in people's heads
- **Hidden business logic** — stored procedures, triggers, ETL jobs, and event
  consumers that contain rules AI can't analyze from application code
- **Undocumented dependencies** — cross-repo coupling, external service
  contracts, and shared databases that constrain what can safely change
- **Missing verification** — without automated tests, every AI-generated change
  requires manual verification, eliminating the speed advantage

Well-maintained codebases may have few or none of these gaps — which is what the
assessment determines. Where gaps exist, preparation makes invisible constraints
visible and verifiable so AI tools can reason about them effectively.

---

## The Preparation Process

Brownfield preparation follows three steps. Each has a dedicated guide with
detailed execution guidance.

### Step 1: Assess Readiness

Score your codebase across five axes (Verifiability, Modularity,
Discoverability, Transparency, Consistency) to determine your readiness tier
(T0-T5). The tier tells you how much preparation, if any, is needed before
AI-assisted feature work can begin.

**Next step:** [Brownfield Readiness Guide](brownfield-readiness.md)

### Step 2: Choose Your Approach

Based on your readiness tier and organizational context, decide how to invest in
preparation — from full system replacement to opportunistic improvement. Choose
your preparation scope and key technical decisions (wrap vs. extract, logic
authority). The approach guide includes
[foundation work by tier](brownfield-approach.md#foundation-work-by-tier) — what
each tier means in practice for scope and exit thresholds.

**Next step:** [Brownfield Approach Guide](brownfield-approach.md)

### Step 3: Enable AI-Assisted Development

Execute the preparation plan — run discovery activities, target enablement
tactics where axes scored low, and plan infrastructure for AI-assisted delivery.
Map preparation work to the framework's iterative stages.

**Next step:** [Brownfield Enablement Guide](brownfield-enablement.md)

---

## Business Justification for Preparation

When preparation involves meaningful investment (typically T3 and below),
non-technical stakeholders may question why work that produces no user-facing
output deserves funding. T4-T5 codebases need minimal preparation that rarely
requires separate justification. The challenge is real: a sales-led organization
measures value in features shipped, not in test coverage or architecture
documentation. Preparation needs to be framed in terms stakeholders understand.

### Framing Preparation as Risk Reduction

Preparation reduces the risk that AI-assisted development produces incorrect,
unstable, or unshippable output. Without preparation, AI tools generate code
against a codebase they can't reason about effectively — leading to:

- Plausible but incorrect code that passes review but fails in production
- Changes that break undocumented dependencies or hidden business logic
- Generated code that can't be verified because tests don't exist
- Features that can't be deployed safely because rollback mechanisms are missing

Frame each preparation activity in terms of the failure mode it prevents:

> "Without SP contract documentation, AI-generated code may conflict with
> business rules that exist only in stored procedures. The last time this
> happened, [specific incident or estimated cost]."

### Preparation as Future Delivery Speed

Preparation is an investment in delivery velocity. Each improvement — adding
tests, documenting contracts, creating seams — reduces the cost and risk of
future feature delivery in that area. The return is cumulative: the second
AI-assisted project in a prepared area is faster than the first, the third
faster than the second.

For stakeholders who respond to timelines: estimate the delivery time for the
next 2-3 planned features with and without preparation. The difference is the
cost of not preparing.

### Gathering Evidence

Different leaders respond to different types of evidence. Industry benchmarks
carry independent credibility and don't require interpretation; internal data
grounds the case in your organization's specific reality. Use both where
possible — especially early on, when there may be no AI-assisted baseline to
compare against internally.

**Industry benchmarks:**

The DORA State of DevOps reports (published annually) and _Accelerate_
(Forsgren, Humble, Kim) provide independent evidence that deployment frequency,
lead time, change failure rate, and mean time to recovery correlate with
engineering effectiveness. These are useful for establishing that the dimensions
preparation targets — verifiability, deployability, operability — are the same
dimensions that predict engineering performance industry-wide.

AI tool vendors (GitHub, Anthropic, Google, JetBrains) and independent analysts
publish effectiveness research on AI-assisted development regularly. Specific
productivity numbers evolve fast and age quickly, so look for current studies
rather than relying on any single citation. The durable finding across studies:
AI tools are more effective on well-structured, well-tested codebases with
documented context, and AI-generated code still requires human review and
automated verification to be production-safe. Both findings directly reinforce
the case for preparation investment.

**Internal data:**

Where available, internal numbers make the case specific. Pull from your own
systems to show where preparation gaps have concrete costs:

- Production incidents caused by undocumented dependencies or hidden business
  logic (incident tracker)
- Hours spent manually verifying changes in areas without test coverage (team
  estimates or time logs)
- Rollback frequency and mean time to recovery in the target area (deployment
  logs)
- Time-to-merge for PRs in well-tested areas vs. poorly-tested areas (Git +
  CI/CD timestamps)
- Rework rate — PRs requiring significant revision after review — in documented
  vs. undocumented areas (PR history)
- Onboarding time for new team members in the target area (proxy for how long it
  takes AI to become productive there)

For formal measurement frameworks (DORA metrics, quality metrics, developer
experience surveys), see the
[Organizational Adoption Guide](adoption.md#measuring-adoption-success). The
adoption guide's baseline guidance applies to preparation projects too — capture
metrics before preparation starts to demonstrate improvement afterward.

### Connecting to Investment Models

Different [investment models](brownfield-approach.md#investment-models) have
different justification profiles:

- **Rebuild:** Justify the full replacement cost against the compounding cost of
  maintaining and extending a system that resists improvement.
- **Full preparation:** Justify the upfront pause against the cumulative
  velocity gain across all future projects.
- **Project-bounded:** Justify the preparation project's timeline against the
  specific feature it enables.
- **Feature-interleaved:** Preparation overhead is embedded in feature delivery
  — less visible to stakeholders but also less confrontational.
- **Opportunistic:** No justification needed (no explicit investment), but also
  no organizational commitment to outcomes.

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

## Supporting Resources

| Resource                                                                              | Purpose                                                               |
| ------------------------------------------------------------------------------------- | --------------------------------------------------------------------- |
| [Brownfield Readiness Guide](brownfield-readiness.md)                                 | Readiness tiers, AI operating modes, rubric, re-assessment protocol   |
| [Brownfield Approach Guide](brownfield-approach.md)                                   | Investment models, key decisions, exit checkpoints                    |
| [Brownfield Enablement Guide](brownfield-enablement.md)                               | Discovery activities, enablement tactics, rebuild patterns            |
| [Preparation Exit Decision Template](../templates/brownfield-preparation-decision.md) | Record go/no-go decisions at exit checkpoints                         |
| [Brownfield Worked Example](worked-example-brownfield.md)                             | End-to-end traced example from T2 assessment through feature delivery |
| [Organizational Adoption Guide](adoption.md#codebase-readiness-brownfield)            | How brownfield readiness fits into organizational adoption planning   |

---

## Notes

**Last Updated:** 2026-06-26

Added to framework in v0.42.0 as part of the brownfield guide restructuring
(readiness → approach → enablement). Umbrella guide providing process overview
and routing to the three brownfield sub-guides. Added Rebuild to "Connecting to
Investment Models" list.
