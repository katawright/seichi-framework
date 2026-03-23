<!-- For guidance on checkpoint types and usage, see guides/framework.md#checkpoint-taxonomy -->

# Checkpoint Decision: [Checkpoint — Short Title]

**Purpose:** Record a non-investment checkpoint decision (quality, deployment,
production ownership, or compliance).

**Usage:** Use this template for operational checkpoints between stages. For
Gate 1 and Gate 2 investment decisions, use [gate-decision.md](gate-decision.md)
instead. See the
[Checkpoint Taxonomy](../guides/framework.md#checkpoint-taxonomy) for the full
list of checkpoint types.

**Last Updated:** YYYY-MM-DD

**Date:** YYYY-MM-DD

**Checkpoint Type:** Review / Alignment

**Status:** Pending / Approved / Held / Rejected / Rolled Back

**Decision makers:**

- **Decided by:** (names/roles)
- **Facilitated by:** (name/role)
- **Consulted:** (names/roles)

---

## Context

- **Stage completed:** (which stage preceded this checkpoint)
- **Decision being made:** (what is being approved/held/rejected)
- **Stage artifact:** (link to deployment brief, support brief, or checklist)

---

## Inputs Reviewed

- (List of artifacts and evidence evaluated)
- _Example (Deployment):_ "Verification brief, deployment checklist, rollback
  plan, monitoring baselines"
- _Example (Production Ownership):_ "Support readiness checklist, runbooks,
  on-call plan, escalation contacts"

---

## Artifact Completeness

Verify that all required stage outputs listed in the stage README front matter
`outputs` field have been produced before proceeding.

| Artifact | Status                   | Location       |
| -------- | ------------------------ | -------------- |
| …        | Produced / Missing / N/A | (path or link) |

**Blocking:** Any artifact with status "Missing" blocks the checkpoint decision
unless the checkpoint reviewer explicitly approves the omission with documented
rationale.

---

## Criteria Evaluated

| Criterion | Evidence | Assessment                |
| --------- | -------- | ------------------------- |
| …         | …        | Met / Partially / Not Met |

---

## Decision

- **Decision type (choose one):**
  - **Review:** Ready / Not Ready
  - **Alignment:** Aligned / Adjustments Needed
- **Rationale:** (why this decision was made)
- **Conditions:** (if any — e.g., "accept with mitigation X by date Y")

---

## AI Validation Summary (Optional)

<!-- Record how AI-assisted work was validated during this stage.
     Optional for CI-validation checkpoints where AI involvement is
     limited to automated scanning. Required when AI contributed
     significantly to stage artifacts. -->

**AI tools/models used:** [List AI tools — or "N/A" if AI was not used]

**Validation approach:** [Brief description of how AI outputs were validated —
e.g., "All AI-drafted runbook entries reviewed by on-call engineer" or "N/A"]

**Concerns or corrections:** [Note any significant corrections to AI output, or
"None"]

---

## Next Steps

- (What happens next based on the decision)
- _Example (Deploy):_ "Proceed with production deployment"
- _Example (Hold):_ "Address blockers and re-run readiness checks"
- _Example (Accept with conditions):_ "Support accepts ownership with listed
  mitigations and follow-up dates"
- _Example (Rollback):_ "Execute rollback runbook and open incident record"

---

<!-- For Gate 1 and Gate 2 investment decisions, use
     gate-decision.md instead of this template. -->

<!-- Template Last Updated: 2026-03-20 | Added in v0.18.1 -->
