<!-- For guidance on brownfield exit decisions, see guides/brownfield-approach.md#exit-checkpoint-protocol -->

# Preparation Exit Decision: [Project — Target Area]

**Purpose:** Record the go/no-go decision at the brownfield preparation exit
checkpoint.

**Usage:** Complete after the final preparation increment. See the
[Brownfield Approach Guide](../guides/brownfield-approach.md#exit-checkpoint-protocol)
for exit criteria and the recommendation options.

**Last Updated:** YYYY-MM-DD

**Date:** YYYY-MM-DD

**Decision:** Ready / Not Ready <!-- checkpoint-outcome: review -->

<!-- The exit checkpoint is a Review: were the target conditions met? The
     preparation-specific next step (Go / Conditional Go / Continue, or an
     end-of-scope gate recommendation) rides as the Recommendation below —
     it elaborates this decision and is never a second outcome. -->

**Decision makers:**

- **Clearance mode:** Interactive human / Pre-authorized policy
- **Decided by:** (names/roles)
- **Evidence independence:** Self-asserted / Context-independent /
  Organizationally-independent — how this evaluation stood relative to the
  producing context
  ([CS-084](../spec/canonical-state.md#cs-084--evidence-independence-grade)).
  Self-asserted is the normal, honest grade for a solo operator; it caps the
  floor claim
  ([CS-086](../spec/canonical-state.md#cs-086--self-asserted-floor-discharge-rule-grade-capping)),
  not the work.
- **Attribution source:** Client-claimed — hand-filled record; identities here
  are self-reported. `platform-verified` applies only when a recording platform
  authenticates the actor; platform-generated records carry per-act grades
  ([CS-085](../spec/canonical-state.md#cs-085--attribution-source-grade-platform-verified--client-claimed)).
- **Consulted:** (names/roles)

---

## Readiness Comparison

| Axis            | Initial Score | Current Score | Target | Delta |
| --------------- | ------------: | ------------: | -----: | ----: |
| Verifiability   |               |               |        |       |
| Modularity      |               |               |        |       |
| Discoverability |               |               |        |       |
| Transparency    |               |               |        |       |
| Consistency     |               |               |        |       |

- **Initial tier:** T\_\_
- **Current tier:** T\_\_

---

## Preparation Completed

| Increment | Focus                         | Key Outcomes |
| --------- | ----------------------------- | ------------ |
| 1         | (e.g., Discovery, Modularity) |              |
| 2         | (e.g., Verifiability)         |              |
| …         |                               |              |

---

## Remaining Gaps

| Gap | Severity            | Mitigation if Proceeding |
| --- | ------------------- | ------------------------ |
|     | Critical / Moderate | (how to proceed safely)  |

---

## Decision Detail

The decision itself is recorded once, in the header above. This section
elaborates it.

**Checkpoint timing:** Within committed scope / End of committed scope

**Recommendation:** (the preparation-specific next step this decision routes to)

<!-- Within committed scope — Ready: "Go" (target conditions met; early exit
     to feature work) or "Conditional Go" (early exit with tracked conditions
     — list them below); Not Ready: "Continue" (committed increments remain;
     continue with the next increment).
     End of committed scope — the recommendation feeds a gate re-evaluation,
     where the gate's own closed outcome set governs: "Close to target"
     (request approval for 1-2 additional increments with a concrete plan);
     "Meaningful progress" (request re-evaluation: adjust target mode, extend
     scope, or stop); "No meaningful progress" (recommend pivot: change
     investment model or stop). -->

**Rationale:** (why this decision)

**Conditions:** (if Conditional Go — list constraints, mitigations, and review
dates)

---

## Next Steps

- (Actions following the decision)
- _Example (Go):_ "Begin Increment Design for first feature increment"
- _Example (Conditional Go):_ "Proceed with feature work in target area; limit
  AI to T3 operating mode until Verifiability reaches 3+"
- _Example (Continue):_ "Proceed to Increment 2 per committed plan"
- _Example (Close to target):_ "Submit gate request for 1 additional increment
  focused on Transparency"
- _Example (No meaningful progress):_ "Submit gate request to re-evaluate;
  recommend pivot to Rebuild model"

---

<!-- For standard stage-gate checkpoints (quality, deployment, closure),
     use checkpoint-decision.md instead.
     For Gate 1 and Gate 2 investment decisions, use gate-decision.md. -->

<!-- Template Last Updated: 2026-07-18 | Added in v0.39.0. -->
