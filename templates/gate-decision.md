<!-- For guidance on gates and investment decisions, see guides/checkpoints.md#gates -->

# Gate Decision: [Gate N — Short Title]

**Purpose:** Record a Gate 1 or Gate 2 investment decision.

**Usage:** Use this template for investment gates that decide whether a project
proceeds, is revised, or is stopped. For non-investment checkpoints (quality,
deployment, production ownership), use
[checkpoint-decision.md](checkpoint-decision.md) instead. See the
[Checkpoint Taxonomy](../guides/framework.md#checkpoint-taxonomy) for the full
decision framework.

**Last Updated:** YYYY-MM-DD

**Date:** YYYY-MM-DD

**Status:** Pending / Proceed / Proceed with conditions / Revise / Stop

**Decision makers:**

- **Decided by:** (names/roles)
- **Facilitated by:** (name/role)
- **Consulted:** (names/roles)

**Division of labor:** The Responsible role(s) (R) prepare the gate package —
completing Context, Inputs Reviewed, Artifact Completeness, and Criteria
Evaluated with evidence. When multiple roles share R designation (e.g., Gate 2:
Architect and AppSec), each R-role prepares the sections within their domain.
For Gate 2: Architect prepares Context, Inputs Reviewed, Artifact Completeness,
and Criteria Evaluated. AppSec prepares Security Risk Posture.
The Accountable role (A) reviews the package, leads the decision discussion, and
records the final Decision and Next Steps. The Facilitator (PjM) manages agenda
and time-boxing per the
[Gate Review Facilitation](../guides/roles.md#gate-review-facilitation)
protocol.

---

## Context

- **Stage completed:** (which stage preceded this gate)
- **Decision being made:** (what is being decided)
- **Stage artifact:** (link to the brief or document being evaluated)

---

## Inputs Reviewed

- (List of artifacts and evidence evaluated)
- _Example (Gate 1):_ "Initiation Brief, stakeholder feedback"
- _Example (Gate 2):_ "Requirements Brief, system design brief, spike results,
  updated estimates"

---

## Artifact Completeness

Verify that all required stage outputs listed in the stage README front matter
`outputs` field have been produced before proceeding.

| Artifact | Status                   | Location       |
| -------- | ------------------------ | -------------- |
| …        | Produced / Missing / N/A | (path or link) |

**Blocking:** Any artifact with status "Missing" blocks the gate decision unless
the gate reviewer explicitly approves the omission with documented rationale.

---

## Criteria Evaluated

Criteria may match or differ from what the preceding stage proposed.

| Criterion | Evidence | Assessment                |
| --------- | -------- | ------------------------- |
| …         | …        | Met / Partially / Not Met |

- _Example (Gate 1):_ "Business case clear, stakeholders aligned, risks
  acceptable, sponsor committed"
- _Example (Gate 2):_ "Requirements validated, architecture sound, risks
  mitigated, estimate within budget"

---

## Security Risk Posture

<!-- Gate 2 only. AppSec prepares this section as part of the evidence package. -->

- **Overall risk assessment:** [Low / Medium / High / Critical]
- **Open security findings:** [count and severity breakdown, or "None"]
- **Mitigations in place:** [list key mitigations for identified risks]
- **Residual risk acceptance:** [risks accepted and rationale]
- **Compliance status:** [applicable standards and current status]
- **AppSec recommendation:** [Proceed / Proceed with conditions / Revise]

---

## Decision: Proceed / Proceed with conditions / Revise / Stop

- **Rationale:** (why this decision was made)
- **Conditions:** (if any — e.g., "proceed but address X first")

---

## AI Validation Summary

<!-- Record how AI-assisted work was validated during this stage.
     This section helps gate reviewers assess the quality and reliability
     of AI contributions to stage artifacts. -->

**AI tools/models used:** [List AI tools and models that assisted this stage's
work — e.g., "Claude Sonnet for requirements drafting, GitHub Copilot for code
generation"]

**Validation method:**

- [ ] Human reviewed all AI-generated content for accuracy and completeness
- [ ] AI outputs were cross-checked against source materials (interviews,
      existing docs, data)
- [ ] Domain expert reviewed AI-generated technical recommendations
- [ ] AI-generated artifacts were validated against checklist criteria

**Key findings:** [Note any AI outputs that required significant correction,
areas where AI added unexpected value, or concerns about AI-generated content
quality]

**Reviewer sign-off on AI contributions:**

| Reviewer | Role | AI Contributions Reviewed | Assessment                     |
| -------- | ---- | ------------------------- | ------------------------------ |
| [name]   | …    | [what was reviewed]       | Acceptable / Revised / Flagged |

---

## Next Steps

- (What happens next based on the decision)
- _Example (Gate 1, Proceed):_ "Begin Requirements stage"
- _Example (Gate 1, Revise):_ "Refine problem statement, re-present"
- _Example (Gate 2, Proceed):_ "Begin Increment Design for first increment"
- _Example (Gate 2, Stop):_ "Archive project artifacts, communicate decision to
  stakeholders"
- _Example (Gate 1, Proceed with prep):_ "Proceed — preparation project approved
  as prerequisite. Begin Requirements with preparation scope included."
- _Example (Gate 1, Postpone):_ "Opportunity validated but preparation cost
  exceeds current budget. Revisit when platform modernization completes."

---

<!-- For deployment/support checkpoints, use checkpoint-decision.md.
     For architecture review decisions, record as an ADR with status "Accepted". -->

<!-- Template Last Updated: 2026-03-20 | Added in v0.13.0 -->
