# Initiation Brief

**Last Updated:** 2026-02-08

> **Purpose:** Define the problem and business case; set goals/success metrics; establish scope boundaries, constraints, assumptions, and key risks/unknowns; and produce a **range-based plan** to reach **Gate 1 (Requirements complete)** for a **proceed/pivot/stop** decision.

**How to use this:** Bullets only. Keep it concise. For deeper guidance, see **initiation-reference.md**.

**AI Assistance:** This stage is "AI assist only" per [AI_AUTONOMY_SCORECARD.md](../../AI_AUTONOMY_SCORECARD.md) — AI can draft and suggest, humans own all decisions and correctness.

---

## Problem statement
- **Write:** Who is affected, what they can't do (or what fails), why, and the impact.
- *Example:* "Support agents can't find the latest customer context in <30s because conversations are split across tools, increasing handle time and repeat contacts."

## Business case + why now
- **Write:** What value this creates (or risk it reduces) and why it matters now.
- *Example:* "Handle-time reduction is a top Q goal; current tooling drives repeat contacts and SLA risk."

## Goals and success metrics

> **Important:** These metrics establish the **measurement throughline** that flows through all SDLC stages—from Requirements (what to build) to Design (how to measure) to Implementation (instrumentation) to Verification (validation) to Deployment (rollout monitoring) to Support (production tracking).

- **Write:** 1–3 measurable outcomes (baseline + target if possible).
- **Measurement approach:** Use framework-agnostic approaches (OKRs, SMART goals, KPIs, etc.) appropriate for your organization.
- **Tip:** Prefer a small set of metrics:
  - One outcome metric (customer/business impact)
  - One operational metric (latency/errors)
  - One adoption metric (usage/coverage), if relevant

- *Example:* "p90 time-to-context < 30s; repeat-contact rate down 10%."

## Scope boundaries
### In scope
- *Example:* "Unify conversation view across Tool A + Tool B for Support."

### Out of scope / non-goals
- *Example:* "No UI redesign; no historical backfill; no internationalization in v1."

## Assumptions (top 5)
- **Write:** Assumptions that, if wrong, materially change effort/scope.
- *Example:* "Tool B API supports lookup by customer ID with adequate rate limits."

## Risks / unknowns (top 5)
For each:
- **Risk/unknown:** …
  **Impact if wrong:** …
  **Likelihood:** L / M / H
  **Mitigation:** (spike/review/fallback)
- *Example:* "PII handling constraints | Impact: High | Likelihood: Med | Mitigation: security review + redaction plan."

## Constraints and dependencies
- **Constraints:** (deadlines, compliance, SLOs, platform limits)
- **Dependencies:** (teams, vendors, approvals)

## Options considered (at least one alternative)
- **Option A:** … (pros/cons)
- **Option B:** … (pros/cons)
- **Recommendation:** …
- *Example:* "Buy vs build; incremental integration vs replacement."

## Hypothesis: staffing + time range (Initiation-level)
> **Important:** This is a **hypothesis**, not a commitment. State confidence and assumptions.

- **Confidence:** Low / Medium / High (why)
- **Requirements team hypothesis:** roles/count + time range
- **Delivery team hypothesis (optional):** roles/count + time range

*Example:* "1 TL + 1 BE + 1 FE + 0.5 PM for 2–4 weeks to reach Gate 2 (Requirements complete)."

## Gate 1 — Initiation approval (proceed / pivot / stop)

> **Gate 1** = End of Initiation stage. This is an **Investment Gate** - a genuine go/no-go decision with a real option to stop the project. Decision based on this brief.

**Decision criteria:**

- **Proceed if:** …
  - *Example:* "Business case is clear, stakeholders aligned, risks are acceptable, sponsor committed"
- **Pivot if:** …
  - *Example:* "Problem statement needs refinement, scope too large, need to explore alternative approach"
- **Stop if:** …
  - *Example:* "No clear business value, cost exceeds benefit, market opportunity closed, better alternatives exist"

**Next step if proceeding:** This brief becomes input to Requirements stage (per [STAGES.md](../../STAGES.md#stage-1-initiation)).

## (Optional) Planning for future gates

Use this section to plan ahead for subsequent decision gates:

**Gate 2 — Requirements complete** (end of Requirements + Design foundational pass)
- **Outputs expected:**
  - Requirements + acceptance criteria drafted and reviewed
  - NFRs captured (functional, performance, security, and others as needed)
  - High-level design direction documented (key trade-offs identified)
  - Top risks addressed (spikes/prototypes/reviews) with mitigations/fallbacks
  - Slice plan with dependencies (for iterative delivery)
  - Updated staffing/timeline range + confidence
  - Recommendation: proceed / pivot / stop

**Gate 3:** MVP increment in staging (end of Implementation + Verification for first increment)

**Gate 4:** MVP increment in production behind flag (end of Deployment for first increment)

**Gate 5:** GA / rollout complete

> **Note:** Gates 3-5 are placeholders. Gate definitions evolve as the project progresses through Requirements and Design stages.

## Owner / DRI and stakeholders
> **DRI = Directly Responsible Individual** (accountable for forward progress and clarity; not doing all work).

- **DRI:** name
- **Approvers:** (engineering/product/security as needed)
- **Stakeholders:**

