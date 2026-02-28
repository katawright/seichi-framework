<!-- For guidance on completing this brief, see initiation/README.md -->

# Initiation Brief

## Right-Sizing This Brief

Choose your tier before filling out the brief. Each section below includes
inline hints for what's expected at each level.

| Practice                  | Minimal                       | Standard                                    | Enterprise                                           |
| ------------------------- | ----------------------------- | ------------------------------------------- | ---------------------------------------------------- |
| **Problem statement**     | Brief description of the need | Structured who/what/why/impact format       | Formal problem analysis with stakeholder input       |
| **Business case**         | Informal justification        | Value, urgency, and strategic alignment     | Formal business case with financial analysis         |
| **Success criteria**      | 1-2 measurable outcomes       | 3-5 criteria with baselines and targets     | Comprehensive KPIs with measurement plans            |
| **Non-goals/assumptions** | Quick list                    | 3-5 explicit non-goals, key assumptions     | Detailed boundary analysis with stakeholder review   |
| **Risk assessment**       | Mental note of key risks      | Documented risks with likelihood and impact | Formal risk register with mitigation plans           |
| **Estimation**            | Rough range                   | Range-based with confidence label           | Multiple estimation techniques, sensitivity analysis |
| **Gate 1 process**        | Informal team agreement       | Structured review with decision criteria    | Formal gate with stakeholder sign-off                |

**Expand Initiation only when needed:**

- **Regulated / compliance-heavy:** Add compliance requirements, formal sign-off
- **Large data migrations:** Add data scope analysis, migration risks
- **Material security / privacy impact:** Add threat summary, privacy
  considerations
- **Multi-team dependency chain:** Add cross-team coordination, dependency
  mapping
- **Hard external deadlines:** Add timeline constraints, phased delivery options

Otherwise, keep the Brief concise and move quickly to Requirements. For full
tier definitions and choosing criteria, see the
[Right-Sizing Guide](../right-sizing-guide.md).

---

## Problem Statement

<!-- Minimal: brief description | Standard: structured who/what/why/impact | Enterprise: formal analysis with stakeholder input -->

- [Who is affected, what they can't do, why, and the impact]

## Business Case + Why Now

<!-- Minimal: informal justification | Standard: value, urgency, and strategic alignment | Enterprise: formal business case with financial analysis -->

- [What value this creates or risk it reduces, and why it matters now]

## Goals and Success Metrics

<!-- Minimal: 1-2 measurable outcomes | Standard: 3-5 criteria with baselines and targets | Enterprise: comprehensive KPIs with measurement plans -->

- [1–3 measurable outcomes with baseline and target where possible]

## Scope Boundaries

### In Scope

- [What this project will deliver]

### Out of Scope / Non-Goals

<!-- Minimal: quick list | Standard: 3-5 explicit non-goals | Enterprise: detailed boundary analysis with stakeholder review -->

- [What this project will not do — 3-5 items]

## Gate 1 — Proposed Decision Criteria

<!-- Minimal: informal team agreement | Standard: structured review with decision criteria | Enterprise: formal gate with stakeholder sign-off -->

**Proposed criteria:**

- **Proceed if:** [conditions]
- **Pivot if:** [conditions]
- **Stop if:** [conditions]

**Next step if proceeding:** This brief becomes input to Requirements stage (per
[AI-Assisted SDLC Stages](../framework-stages.md#stage-1-initiation)).

## Project Lead and Stakeholders

- **Project lead:** [name]
- **Approvers:** [engineering/product/security as needed]
- **Stakeholders:**

## Assumptions (Top 5)

- [Assumptions that, if wrong, materially change effort or scope]

## Risks / Unknowns (Top 5)

<!-- Minimal: mental note of key risks | Standard: documented with likelihood/impact | Enterprise: formal risk register with mitigation plans -->

For each:

- **Risk/unknown:** … **Impact if wrong:** … **Likelihood:** L / M / H
  **Mitigation:** [spike/review/fallback]

## Constraints and Dependencies

- **Constraints:** [budget, deadlines, compliance, SLOs, platform limits, team
  capacity, technology restrictions]
- **Dependencies:** [teams, vendors, approvals]

## Options Considered (At Least One Alternative)

- **Option A:** … [pros/cons]
- **Option B:** … [pros/cons]
- **Recommendation:** …

## Hypothesis: Staffing + Time Range

<!-- Minimal: rough range | Standard: range-based with confidence label | Enterprise: multiple estimation techniques, sensitivity analysis -->

- **Confidence:** Low / Medium / High [why]
- **Requirements team hypothesis:** [roles/count + time range]
- **Delivery team hypothesis (optional):** [roles/count + time range]

---

## (Optional) Planning for Future Gates

**Gate 2 — Requirements complete** (end of Requirements + System Design
foundational pass)

- **Outputs expected:**
  - FRs with acceptance criteria drafted and reviewed
  - NFRs with verification criteria drafted and reviewed (performance, security,
    observability, and others as needed)
  - High-level design direction documented (key trade-offs identified)
  - Top risks addressed (spikes/prototypes/reviews) with mitigations/fallbacks
  - Slice plan with dependencies (for iterative delivery)
  - Updated staffing/timeline range + confidence
  - Cost estimates updated (labor + infrastructure/tooling, with assumptions)
  - Recommendation: proceed / pivot / stop

<!-- Template Last Updated: 2026-02-26 | Added in v0.2.0 -->
