<!-- For guidance on checkpoint types and usage, see guides/framework.md#checkpoint-taxonomy -->

# Checkpoint Decision: [Checkpoint — Short Title]

**Purpose:** Record a non-investment checkpoint decision (quality, deployment,
production ownership, or compliance).

**Usage:** Use this template for operational checkpoints between stages. For
Gate 1 and Gate 2 investment decisions, use [gate-decision.md](gate-decision.md)
instead. See the [Checkpoint Taxonomy](../guides/checkpoints.md) for the full
list of checkpoint types.

**Last Updated:** YYYY-MM-DD

**Date:** YYYY-MM-DD

**Checkpoint Type:** Review / Alignment

**Status:** Pending / Approved / Held / Rejected / Rolled Back

**Decision makers:**

- **Clearance mode:** Interactive human / Pre-authorized policy
- **Decided by:** _(interactive)_ the deciding party — name + role/id. A floor
  decision MUST be discharged by a party on the project's authorized-party
  roster for it (see
  [Canonical-State Spec § Authorized Parties](../spec/canonical-state.md#authorized-parties-for-floor-decisions)).
- **Cleared by policy:** _(pre-authorized policy)_ the policy (name/link) and
  its **author** — the accountable authorized party — with the date authored;
  the run records the evaluating agent and the clearance timestamp (see
  [Record Requirements](../spec/canonical-state.md#record-requirements)).
- **Facilitated by:** (name/role)
- **Consulted:** (names/roles)

---

## Context

- **Stage completed:** (which stage preceded this checkpoint)
- **Decision being made:** (what is being approved/held/rejected)
- **Stage artifact:** (link to deployment brief, operational-handoff record, or
  checklist)

---

## Inputs Reviewed

- (List of artifacts and evidence evaluated)
- _Example (Deployment):_ "Verification brief, deployment checklist, rollback
  plan, monitoring baselines"
- _Example (Production Ownership):_ "Operational handoff record, runbooks,
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
- **Conditions:** (if any) — each is a tracked carry-forward obligation,
  re-checked at every later stage entry per the
  [Canonical-State Spec](../spec/canonical-state.md#minimum-canonical-project-state):

  | Condition | Owner | Discharged at (stage/increment) | Status                     |
  | --------- | ----- | ------------------------------- | -------------------------- |
  | …         | …     | …                               | Open / Satisfied / Blocked |

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
- _Example (Accept with conditions):_ "Operations accepts ownership with listed
  mitigations and follow-up dates"
- _Example (Rollback):_ "Execute rollback runbook and open incident record"

---

<!-- For Gate 1 and Gate 2 investment decisions, use
     gate-decision.md instead of this template. -->

<!-- Template Last Updated: 2026-06-28 | Added in v0.18.1. -->
