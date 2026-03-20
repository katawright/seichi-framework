# Gate Decision: [Gate N — Short Title]

**Last Updated:** YYYY-MM-DD

**Date:** YYYY-MM-DD

**Status:** Pending / Proceed / Revise / Stop

**Usage:** Gate 1 and Gate 2 investment decisions

**Decision makers:**

- **Decided by:** (names/roles)
- **Facilitated by:** (name/role)
- **Consulted:** (names/roles)

---

## Context

- **Stage completed:** (which stage preceded this gate)
- **Decision being made:** (what is being decided)
- **Stage artifact:** (link to the brief or document being evaluated)

---

## Inputs Reviewed

- (List of artifacts and evidence evaluated)
- _Example (Gate 1):_ "Initiation Brief, stakeholder feedback"
- _Example (Gate 2):_ "Requirements doc, system design brief, spike results,
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

## Decision: Proceed / Revise / Stop

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

<!-- Template Last Updated: 2026-03-19 | Added in v0.13.0 -->
