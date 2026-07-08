<!-- For guidance on Flow delivery mode, see the Stages Guide
     (Flow Delivery Mode) at ../guides/stages.md#flow-delivery-mode. A Flow issue
     is the approved, ready-to-deliver request — distinct from a raw idea
     (../templates/idea.md) or an untriaged friction-log entry
     (../templates/friction-log.md). Do not duplicate them. -->

# Flow Issue

**Purpose:** The folded entry artifact for a small change delivered through
[Flow mode](../guides/stages.md#flow-delivery-mode) — it collapses Initiation
(approval + intent), Requirements (what + acceptance), and consequence-sizing
into one small form carrying enough for autonomous delivery and
self-verification.

**Usage:** One per Flow item. The load-bearing trio for Lights-Out delivery is
**acceptance criteria + verification + consequence** — they let an agent know it
is done and whether it may ship.

**ID:** [FLOW-NNN] **Title:** [short title] **Status:** [Approved / In Progress
/ Shipped] **Type:** [bug / content / enhancement / config]

---

## What & Why

<!-- The requested change AND its intent — deliver the intent, not the literal
     text. An agent must be able to tell when the request is satisfied in spirit. -->

[what is being changed, and why it matters]

---

## Acceptance Criteria

<!-- How we know it is delivered — the folded success criterion. -->

- [ ] [observable, verifiable done-criterion]

---

## Scope Boundary

<!-- What is in, and what is explicitly out. Small changes scope-creep easily;
     name the edges. -->

- **In:** [what this change covers]
- **Out:** [what it explicitly does not touch]

---

## Consequence & Reversibility

<!-- The lever hook: blast radius + how to undo. Sets whether an agent may ship it
     Lights-Out. See ../guides/right-sizing.md. -->

- **Consequence:** [Negligible / Low / Moderate / High / Critical]
- **Blast radius:** [who/what is affected if this is wrong]
- **Reversibility:** [how to undo — quick revert / harder]

---

## Affected Area

<!-- Component, page, or flow — where the work lives, so it can be located. -->

[component / page / flow]

---

## Verification

<!-- How to verify the change — test, visual check, etc. Load-bearing for
     Lights-Out: it lets an agent self-confirm before shipping. -->

[how to verify — the test to run, the page to open, the check to make]

---

## Origin & Provenance

<!-- Who or what filed this, and the link back to the triggering incident, idea,
     or measurement gap (the ops→dev edge — traceability in both directions). -->

- **Filed by:** [human / ops agent / monitoring]
- **Triggered by:** [incident ID / IDEA-NNN / SC-NN measurement gap / — ]

---

## Authorization

<!-- The go decision. The issue's approval is the folded Gate 1 go-decision —
     there is no separate Gate 1. A gate is a non-delegable floor act: resolved by
     an interactive human OR a pre-authorized policy, never a delegated agent; at
     Critical / severe-harm-irreversible consequence, interactive-only. See
     ../spec/canonical-state.md#authorized-parties-for-floor-decisions. -->

- **Clearance mode:** [Interactive human / Pre-authorized policy]
- **Approved by:** _(interactive)_ the deciding party — a unique authorized
  party (name + stable id) on the project's authorized-party roster. _(policy)_
  the policy (name/link) and its **author** — the accountable authorized party —
  with the date authored (so its roster validity at authoring is checkable). For
  a solo project the lone owner is the implicit authorized party — the name
  alone suffices.
- **Date:** YYYY-MM-DD

<!-- Template Last Updated: 2026-07-08 | Added in v0.49.0. -->
