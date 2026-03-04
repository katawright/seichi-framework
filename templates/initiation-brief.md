<!-- For guidance on completing this brief, see initiation/README.md -->

# Initiation Brief

> **Convention:** Flag unverified assumptions with `[ASSUMED]` throughout the
> brief for gate reviewers to audit.

## Right-Sizing This Brief

<!-- See initiation/README.md#right-sizing-initiation for the full
     practice table and expansion triggers. -->

**Tier chosen:** [Minimal / Standard / Enterprise]

**Project type:** [Greenfield / Brownfield (first AI project) / Brownfield (has
context)]

<!-- See ../guides/framework.md#greenfield-vs-brownfield-projects -->

**Deployment intent:** [Production service / Internal tool / Local-only (CLI,
spike, experiment) / TBD]

<!-- Local-only projects may skip Deployment and Support setup. -->

---

## Problem Statement

<!-- Minimal: brief description | Standard: structured who/what/why/impact | Enterprise: formal analysis with stakeholder input -->

- [Who is affected, what they can't do, why, and the impact]

---

## Business Case + Why Now

<!-- Minimal: informal justification | Standard: value, urgency, and strategic alignment | Enterprise: formal business case with financial analysis -->

- [What value this creates or risk it reduces, and why it matters now]

---

## Goals and Success Criteria

<!-- Minimal: 1-2 measurable outcomes | Standard: 3-5 criteria with baselines and targets | Enterprise: comprehensive KPIs with measurement plans -->

- [1–3 measurable outcomes with baseline and target where possible]

---

## Scope Boundaries

### In Scope

- [What this project will deliver]

### Out of Scope / Non-Goals

<!-- Minimal: quick list | Standard: 3-5 explicit non-goals | Enterprise: detailed boundary analysis with stakeholder review -->

- [What this project will not do — 3-5 items]

---

## Gate 1 — Proposed Decision Criteria

<!-- Minimal: informal team agreement | Standard: structured review with decision criteria | Enterprise: formal gate with stakeholder sign-off -->

**Proposed criteria:**

- **Proceed if:** [conditions]
- **Pivot if:** [conditions]
- **Stop if:** [conditions]

**Next step if proceeding:** This brief becomes input to Requirements stage (per
[AI-Assisted SDLC Stages](../guides/stages.md#stage-1-initiation)).

---

## Project Lead and Stakeholders

- **Project lead:** [name]
- **Approvers:** [engineering/product/security as needed]
- **Stakeholders:**

---

## Assumptions (Top 5)

- [Assumptions that, if wrong, materially change effort or scope]

---

## Risks / Unknowns (Top 5)

<!-- Minimal: mental note of key risks | Standard: documented with likelihood/impact | Enterprise: formal risk register with mitigation plans -->

For each:

- **Risk/unknown:** … **Impact if wrong:** … **Likelihood:** L / M / H
  **Mitigation:** [spike/review/fallback]

---

## Pre-Mortem (Optional)

<!-- Imagine the project has failed. What went wrong? Identify 2-3 plausible
     failure modes before committing resources. -->

For each:

- **Failure mode:** … **Why plausible:** … **Early signal to watch:** …

---

## Data Sensitivity and Compliance

<!-- Security throughline: classify data sensitivity so downstream stages know the
     security posture required. See guides/security.md. -->

**Data sensitivity:** [Public / Internal / Confidential / Restricted]

**Compliance scope:** [None / GDPR / HIPAA / SOC 2 / PCI-DSS / Other: ___]

**Notes:** [Brief justification — e.g., "Handles customer PII → Confidential;
GDPR applies because EU users are in scope"]

---

## Constraints and Dependencies

- **Constraints:** [budget, deadlines, compliance, SLOs, platform limits, team
  capacity, technology restrictions]
- **Dependencies:** [teams, vendors, approvals]

## Brownfield Readiness Assessment (if applicable)

<!-- Include this section for brownfield projects (first AI-assisted). Omit for
     greenfield or subsequent brownfield projects. See
     guides/brownfield-readiness.md#5-dimension-readiness-assessment for assessment
     guidance and indicative thresholds. -->

| Dimension                 | Current State | Assessment                                    |
| ------------------------- | ------------- | --------------------------------------------- |
| Test coverage             | [describe]    | [Ready / Needs Prep / Needs Significant Prep] |
| Documentation             | [describe]    | [Ready / Needs Prep / Needs Significant Prep] |
| Architectural consistency | [describe]    | [Ready / Needs Prep / Needs Significant Prep] |
| Dependency health         | [describe]    | [Ready / Needs Prep / Needs Significant Prep] |
| Database/business logic   | [describe]    | [Ready / Needs Prep / Needs Significant Prep] |

**Overall readiness:** [Ready / Needs Preparation / Needs Significant Prep]

**Foundation work implications:** [Discovery only / Extended foundation /
Preparation project — and estimated scope]

---

## Options Considered (At Least One Alternative)

- **Option A:** … [pros/cons]
- **Option B:** … [pros/cons]
- **Recommendation:** …

---

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

---

## Self-Validation Against Initiation Checklist

<!-- Before submitting for gate review, self-assess against the Initiation
     Checklist. This catches issues before formal review and improves
     first-pass quality. -->

- [ ] Pre-filled [Initiation Checklist](../stages/initiation/checklist.md) with
      self-assessment and evidence for each item
- **Items needing attention:** [List any items that don't fully pass]

<!-- Template Last Updated: 2026-03-03 | Added in v0.2.0 -->
