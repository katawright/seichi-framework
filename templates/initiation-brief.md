<!-- For guidance on completing this brief, see ../stages/initiation/README.md -->

# Initiation Brief

> **Stage guide:** [Initiation](../stages/initiation/README.md)

> **Need an example?** See the
> [Worked Example: Initiation](../guides/worked-example.md#stage-1-initiation)
> for a completed brief.

> **Convention:** Flag unverified assumptions with `[ASSUMED]` throughout the
> brief for gate reviewers to audit. During review, each `[ASSUMED]` item should
> be **confirmed** (verified — remove tag), **challenged** (incorrect — update
> and remove tag), or **carried forward** (unverifiable now — leave tag and note
> as a gate condition).

> **Tier annotations:** Sections marked
> `<!-- Minimal: skip this section entirely -->` should be omitted in full — do
> not write N/A. Sections marked
> `<!-- Minimal: ... | Standard: ... | Enterprise: ... -->` indicate how to
> adapt the section's content depth for your project tier. Annotations are HTML
> comments and are invisible in rendered output.

**Last Updated:** YYYY-MM-DD

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
<!-- For adoption or usage-based criteria, define the measurement method even at
     Minimal — "how will we know users adopted this?" prevents ad hoc measurement
     plans at project close -->
<!-- Qualitative criteria (PoCs, spikes, exploratory projects) are acceptable when numeric baselines are not feasible. Use the Question / Evaluation criteria / Timeframe template from initiation/reference.md#when-criteria-are-qualitative. -->

- [outcomes with baseline and target where measurable; explicit evaluation
  criteria where qualitative]
  - **Why:** [One-line rationale — why this goal matters]

---

## Scope Boundaries and Non-Goals

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
- **Revise if:** [conditions]
- **Stop if:** [conditions]

**Next step if proceeding:** This brief becomes input to Requirements stage (per
[AI-Assisted SDLC Stages](../guides/stages.md#stage-1-initiation)).

---

## Project Lead and Stakeholders

<!-- Minimal: the stakeholder table may be simplified to a bulleted list if
     formal participation tracking is unnecessary -->
<!-- Identify anyone whose input is needed for requirements, whose sign-off is
     needed for acceptance, or who will be a primary user of the delivered
     system. See guides/roles.md#domain-stakeholders for guidance. -->

- **Project lead:** [name, role]
- **Approvers (Gate 1):** [names/roles — who decides proceed/revise/stop]
- **Stakeholder advocate:** [name — usually PM; responsible for ensuring
  stakeholders are engaged per the participation plan below]

### Key Stakeholders

| Name   | Role / Title | Organization | Participation | Stages                                         |
| ------ | ------------ | ------------ | ------------- | ---------------------------------------------- |
| [name] | [role]       | [org/dept]   | C or I        | [e.g., Initiation, Requirements, Verification] |

<!-- Participation: C = Consulted (provides input), I = Informed (kept in the loop).
     Stages: list the stages where this stakeholder should be engaged.
     Typical pattern: C at Initiation, Requirements, and Verification/UAT; I elsewhere. -->

---

## Assumptions (Top 5)

<!-- Minimal: top 3 assumptions sufficient | Standard: top 5 with impact
     analysis | Enterprise: assumption register with owners -->

- [Assumptions that, if wrong, materially change effort or scope]

---

## Risks / Unknowns (Top 5)

<!-- Minimal: mental note of key risks | Standard: documented with
     likelihood/impact | Enterprise: formal risk register with mitigation plans
     -->
<!-- For internal tools: include adoption risk explicitly — the risk that the
     tool is built but not used -->

For each:

- **Risk/unknown:** … **Impact if wrong:** … **Likelihood:** L / M / H
  **Mitigation:** [spike/review/fallback]

---

## Pre-Mortem

<!-- Minimal: 1–2 bullets minimum; do not skip entirely — pre-mortem reliably
     surfaces adoption and scope risks even on small projects | Standard: 2–3
     failure modes with early warning signals | Enterprise: structured
     risk-assumption mapping with stakeholder input -->
<!-- Imagine the project has failed. What went wrong? Identify 2-3 plausible
     failure modes before committing resources. -->

For each:

- **Failure mode:** … **Why plausible:** … **Early signal to watch:** …

---

## Data Sensitivity and Compliance

<!-- Minimal: note data classification and compliance scope only; security
     architecture is addressed in System Design (Gate 2 concern) -->
<!-- Security throughline: classify data sensitivity so downstream stages know the
     security posture required. See guides/security.md. -->

**Data sensitivity:** [Public / Internal / Confidential / Restricted]

**Compliance scope:** [None / GDPR / HIPAA / SOC 2 / PCI-DSS / Other: ___]

**Notes:** [Brief justification — e.g., "Handles customer PII → Confidential;
GDPR applies because EU users are in scope"]

---

## Constraints and Dependencies

<!-- Minimal: brief bulleted list sufficient | Standard: structured with
     resolution path and owner -->

- **Constraints:** [budget, deadlines, compliance, SLOs, platform limits, team
  capacity, technology restrictions]
- **Dependencies:** [teams, vendors, approvals]

## Brownfield Readiness — Quick Pass (if applicable)

<!-- Include this section for brownfield projects (first AI-assisted). Omit for
     greenfield or subsequent brownfield projects. A technical person familiar
     with the codebase scores the readiness rubric roughly (~15 min) to get a
     cost signal for Gate 1. The detailed, evidence-based pass happens at System
     Design (Gate 2). See guides/brownfield-readiness.md#when-to-assess for the
     two-pass model and #readiness-rubric for axis definitions. -->

**Estimated readiness tier:** [T0-T5] — [Ready / Approachable / Constrained /
Challenging / Entrenched / Rebuild]

**Estimated preparation effort:** [e.g., "None", "1-2 week discovery", "2-4
month enablement program"]

**Gate 1 implication:**

- [ ] Proceed — preparation cost is negligible or already factored into
      timeline/budget
- [ ] Proceed with prep — preparation approved as prerequisite; include in scope
      and estimates
- [ ] Postpone — opportunity validated but preparation cost exceeds current
      budget; revisit when [condition]
- [ ] Abandon — preparation investment not justified by the opportunity

---

## Options Considered (At Least One Alternative)

<!-- Minimal: 1–2 alternatives noted briefly; prose acceptable | Standard:
     structured evaluation with pros/cons -->

- **Option A:** … [pros/cons]
- **Option B:** … [pros/cons]
- **Recommendation:** …

---

## Range-Based Estimation

<!-- Minimal: rough range | Standard: range-based with confidence label |
     Enterprise: multiple estimation techniques, sensitivity analysis -->
<!-- Solo or small team: combine into a single range estimate; "requirements team
     hypothesis" / "delivery team hypothesis" framing assumes a larger split
     team — omit those fields if not applicable -->

- **Confidence:** Low / Medium / High [why]
- **Requirements team hypothesis:** [Time range the requirements/design team
  estimates for foundational stages]
- **Delivery team hypothesis (optional):** [Time range the delivery team
  estimates for iterative stages]

---

## Self-Validation Against Initiation Checklist

<!-- Before submitting for gate review, self-assess against the Initiation
     Checklist. This catches issues before formal review and improves
     first-pass quality. -->

> **Timing:** Complete this section after drafting the brief and before
> submitting for Gate 1 review. Reviewers use it to confirm that self-assessment
> was performed, not skipped.

- [ ] Pre-filled [Initiation Checklist](../stages/initiation/checklist.md) with
      self-assessment and evidence for each item
- **Items needing attention:** [List any items that don't fully pass, or "None"
  if all items pass]

<!-- Template Last Updated: 2026-03-27 | Added in v0.2.0. Tier annotations added in v0.42.0 -->
