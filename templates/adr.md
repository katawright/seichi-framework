# ADR-DCC: [Title - Short Present Tense Phrase]

> **Draft ADR (pre-Gate 2):** Name this file `ADR-DCC.md` with a two-digit
> counter (e.g., `ADR-D01.md`) and save to the project's `docs/adr/` in the
> artifacts workspace. At Gate 2, accepted drafts are promoted to the workspace
> ADR canon and renumbered to the project-id-scoped `ADR-NNNN-CC.md`. See
> [ADR Publishing](../guides/framework.md#adr-publishing).

**Last Updated:** YYYY-MM-DD

**Date:** YYYY-MM-DD **Status:** [Proposed | Accepted | Deprecated | Superseded
by ADR-XXX] **Deciders:** [Names of people involved in decision]

---

## ADR Criteria Justification

> A decision earns ADR status only if it meets **all three** criteria —
> otherwise it is a design note (a numbered subsection in the System Design
> Brief).

| Criterion                                          | Met?   | Why |
| -------------------------------------------------- | ------ | --- |
| **Significant** (impacts multiple components)      | Yes/No | …   |
| **Hard to reverse** (changing later is costly)     | Yes/No | …   |
| **Contested** (multiple viable options/trade-offs) | Yes/No | …   |

> **What is _not_ the ADR:** the swappable implementation or detail captured as
> a design note — the ADR records the durable decision, not the specifics you
> could change later behind a stable contract.

---

## Context

What is the issue we're trying to solve? What are the constraints and forces at
play?

**Background:**

- [Current situation or problem]
- [Business or technical drivers]
- [Requirements that influence this decision]

**Constraints:**

- [Technical constraints: team skills, existing systems, compatibility]
- [Business constraints: timeline, budget, organizational standards]
- [Non-functional requirements: performance, security, scalability]

---

## Options Considered

### Option 1: [Name] _(chosen)_

**Description:**

- [What this option entails]

**Pros:**

- [Advantage 1]
- [Advantage 2]

**Cons:**

- [Disadvantage 1]
- [Disadvantage 2]

**Cost:**

- [One-time and recurring costs for this option]

### Option 2: [Name]

**Description:**

- [What this option entails]

**Pros:**

- [Advantage 1]
- [Advantage 2]

**Cons:**

- [Disadvantage 1]
- [Disadvantage 2]

**Cost:**

- [One-time and recurring costs]

**Why not chosen:**

- [Primary reason this option was rejected]

### Option 3: [Name]

**Description:**

- [What this option entails]

**Pros:**

- [Advantage 1]
- [Advantage 2]

**Cons:**

- [Disadvantage 1]
- [Disadvantage 2]

**Cost:**

- [One-time and recurring costs]

**Why not chosen:**

- [Primary reason this option was rejected]

---

## Decision

We will **[decision statement]**.

---

## Rationale

Why this option? See Options Considered above for full comparison.

**Pros:**

- [Advantage 1]
- [Advantage 2]
- [Advantage 3]

**Cons:**

- [Disadvantage 1]
- [Disadvantage 2]
- [Disadvantage 3]

**Trade-offs:**

- We accept [con] in exchange for [pro]
- We accept [con] in exchange for [pro]

---

## Consequences

**Positive:**

- [Good outcome 1]
- [Good outcome 2]
- [Good outcome 3]

**Negative:**

- [Bad outcome 1 - and how we'll mitigate it]
- [Bad outcome 2 - and how we'll mitigate it]

**Neutral:**

- [Side effect 1]
- [Side effect 2]

**Cost Considerations:**

- **One-time costs:** [Setup fees, licenses, migration, training]
- **Recurring costs:** [Monthly/annual subscriptions, per-usage fees,
  infrastructure]
- **Scaling costs:** [How costs change at 10x or 100x usage]
- **Comparison to alternatives:** [Cost relative to other options]
- **Total estimated annual cost:** [Projected annual spend]

**⚠️ Note:** Research costs BEFORE making technology decisions to avoid
post-commitment surprises.

---

## Implementation Notes

**What needs to change:**

- [System component 1 changes]
- [System component 2 changes]
- [Configuration or infrastructure changes]

**Migration plan (if applicable):**

- [Steps to transition from current state to new state]
- [Data migration needs]
- [Rollback plan if needed]

**Dependencies:**

- [Other systems or decisions this depends on]
- [Teams or stakeholders who need to be involved]

**Timeline:**

- [When this decision will be implemented]
- [Key milestones]

---

## References

- [Link to requirements document]
- [Link to related ADRs]
- [External documentation or articles]
- [Vendor documentation or pricing pages]
- [Internal wiki or design docs]

---

## Revision History

| Date       | Author | Change      | Reason           |
| ---------- | ------ | ----------- | ---------------- |
| YYYY-MM-DD | [Name] | Created ADR | Initial decision |
|            |        |             |                  |

<!-- Template Last Updated: 2026-06-09 | Added in v0.4.0. ADR Criteria Justification section added in v0.47.0. ADR id scheme and publish target updated in v0.48.0 -->
