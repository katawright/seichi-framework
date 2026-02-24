# Initiation Brief

**Last Updated:** 2026-02-21

> **Purpose:** Define the problem and business case; set goals/success metrics;
> establish scope boundaries, constraints, assumptions, and key risks/unknowns;
> and produce a **range-based plan** to reach **Gate 1 (Initiation complete)**
> for a **proceed/pivot/stop** decision.

**How to use this:** Bullets only. Keep it concise. For deeper guidance, see
[Initiation Guide](initiation-guide.md).

**AI Assistance:** This stage is "AI assist only" per
[AI Assistance Scorecard](../framework-ai-assistance.md) — AI can draft and
suggest, humans own all decisions and correctness. Two ways to work with AI on
this brief:

- **Interview mode:** Describe your idea to AI. It asks structured questions
  based on the template, suggests options, and produces a draft brief for your
  review.
- **Review mode:** Fill out the template yourself, then ask AI to review for
  completeness, suggest improvements, and edit as directed.

---

## Problem statement

- **Write:** Who is affected, what they can't do (or what fails), why, and the
  impact.
- _Example:_ "Support agents can't find the latest customer context in <30s
  because conversations are split across tools, increasing handle time and
  repeat contacts."

## Business case + why now

- **Write:** What value this creates (or risk it reduces) and why it matters
  now.
- _Example:_ "Handle-time reduction is a top Q goal; current tooling drives
  repeat contacts and SLA risk."

## Goals and success metrics

> **Important:** These metrics establish the **measurement throughline** that
> flows through all SDLC stages—from Requirements (what to build) to Design (how
> to measure) to Implementation (instrumentation) to Verification (validation)
> to Deployment (rollout monitoring) to Support (production tracking).

- **Write:** 1–3 measurable outcomes (baseline + target if possible).
- **Measurement approach:** Use framework-agnostic approaches (OKRs, SMART
  goals, KPIs, etc.) appropriate for your organization.
- **Tip:** Prefer a small set of metrics:
  - One outcome metric (customer/business impact)
  - One operational metric (latency/errors)
  - One adoption metric (usage/coverage), if relevant

- _Example:_ "p90 time-to-context < 30s; repeat-contact rate down 10%."

## Scope boundaries

### In scope

- _Example:_ "Unify conversation view across Tool A + Tool B for Support."

### Out of scope / non-goals

- _Example:_ "No UI redesign; no historical backfill; no internationalization in
  v1."

## Assumptions (top 5)

- **Write:** Assumptions that, if wrong, materially change effort/scope.
- _Example:_ "Tool B API supports lookup by customer ID with adequate rate
  limits."

## Risks / unknowns (top 5)

For each:

- **Risk/unknown:** … **Impact if wrong:** … **Likelihood:** L / M / H
  **Mitigation:** (spike/review/fallback)
- _Example:_ "PII handling constraints | Impact: High | Likelihood: Med |
  Mitigation: security review + redaction plan."

## Constraints and dependencies

- **Constraints:** (budget, deadlines, compliance, SLOs, platform limits, team
  capacity, technology restrictions)
- **Dependencies:** (teams, vendors, approvals)

## Options considered (at least one alternative)

- **Option A:** … (pros/cons)
- **Option B:** … (pros/cons)
- **Recommendation:** …
- _Example:_ "Buy vs build; incremental integration vs replacement."

## Hypothesis: staffing + time range (Initiation-level)

> **Important:** This is a **hypothesis**, not a commitment. State confidence
> and assumptions.

- **Confidence:** Low / Medium / High (why)
- **Requirements team hypothesis:** roles/count + time range
- **Delivery team hypothesis (optional):** roles/count + time range

_Example:_ "1 TL + 1 BE + 1 FE + 0.5 PM for 2–4 weeks to reach Gate 2
(Requirements complete)."

## Gate 1 — Proposed decision criteria

> These are **proposed criteria** for stakeholders to evaluate at the end of
> Initiation. The actual gate decision is recorded separately using the
> [Gate Decision Template](../gate-decision-template.md).

**Proposed criteria:**

- **Proceed if:** …
  - _Example:_ "Business case is clear, stakeholders aligned, risks are
    acceptable, sponsor committed"
- **Pivot if:** …
  - _Example:_ "Problem statement needs refinement, scope too large, need to
    explore alternative approach"
- **Stop if:** …
  - _Example:_ "No clear business value, cost exceeds benefit, market
    opportunity closed, better alternatives exist"

**Next step if proceeding:** This brief becomes input to Requirements stage (per
[AI-Assisted SDLC Stages](../framework-stages.md#stage-1-initiation)).

## (Optional) Planning for future gates

Use this section to plan ahead for subsequent decision gates:

**Gate 2 — Requirements complete** (end of Requirements + System Design
foundational pass)

- **Outputs expected:**
  - FRs with acceptance criteria drafted and reviewed
  - NFRs with verification criteria drafted and reviewed (performance,
    security, observability, and others as needed)
  - High-level design direction documented (key trade-offs identified)
  - Top risks addressed (spikes/prototypes/reviews) with mitigations/fallbacks
  - Slice plan with dependencies (for iterative delivery)
  - Updated staffing/timeline range + confidence
  - Cost estimates updated (labor + infrastructure/tooling, with
    assumptions)
  - Recommendation: proceed / pivot / stop

## Project lead and stakeholders

> The project lead is accountable for forward progress and clarity — not for
> doing all the work.

- **Project lead:** name
- **Approvers:** (engineering/product/security as needed)
- **Stakeholders:**

---

## Notes

**Template Last Updated:** 2026-02-16

Added to framework in v0.2.0.
