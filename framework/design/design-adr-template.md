# ADR-XXX: [Title - Short Present Tense Phrase]

**Last Updated:** YYYY-MM-DD

**Date:** YYYY-MM-DD
**Status:** [Proposed | Accepted | Deprecated | Superseded by ADR-XXX]
**Deciders:** [Names of people involved in decision]

---

## Context

What is the issue we're trying to solve? What are the constraints and forces at play?

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

1. **Option 1:** [Brief description]
2. **Option 2:** [Brief description]
3. **Option 3:** [Brief description]

---

## Decision

We will **[decision statement]**.

---

## Rationale

Why this option?

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
- **Recurring costs:** [Monthly/annual subscriptions, per-usage fees, infrastructure]
- **Scaling costs:** [How costs change at 10x or 100x usage]
- **Comparison to alternatives:** [Cost relative to other options]
- **Total estimated annual cost:** [Projected annual spend]

**⚠️ Note:** Research costs BEFORE making technology decisions to avoid post-commitment surprises.

---

## Alternatives Considered

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
- [Secondary reasons]

---

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
- [Secondary reasons]

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

## Notes

Added to framework in v0.4.0.

---

## Revision History

| Date | Author | Change | Reason |
|------|--------|--------|--------|
| YYYY-MM-DD | [Name] | Created ADR | Initial decision |
| | | | |

---

## ADR Naming Convention

**File naming:** `ADR-XXX-short-description.md`

**Examples:**
- `ADR-001-database-selection.md`
- `ADR-002-file-upload-mechanism.md`
- `ADR-003-authentication-approach.md`
- `ADR-004-frontend-framework.md`

**Location:** Store ADRs in `docs/adr/` directory in your project repository.

**Numbering:** Use sequential numbers (001, 002, 003...) regardless of when created. If ADR-005 is superseded, ADR-006 is the next number (don't reuse numbers).

**Status values:**
- **Proposed:** Decision is under consideration
- **Accepted:** Decision has been approved and will be/is being implemented
- **Deprecated:** Decision is no longer relevant but not superseded
- **Superseded by ADR-XXX:** This decision has been replaced by a newer decision

---

## Tips for Writing Good ADRs

1. **Be concise but complete** - Capture enough context for future engineers to understand why
2. **Document alternatives** - Show what you considered and why you chose this path
3. **Include costs** - Research and document infrastructure/tooling costs
4. **Explain trade-offs** - Be honest about what you're accepting/rejecting
5. **Update status** - Mark as Deprecated or Superseded when decisions change
6. **Link from design-brief** - Reference ADRs from your design document
7. **Version control** - Commit ADRs alongside code; they're part of the design

---

## Example: Referencing This ADR

In your `design-brief.md`:

```markdown
## Technology Stack

**Database:** PostgreSQL 15 (see ADR-001)
**File Upload:** Presigned URLs with object storage (see ADR-002)
**Authentication:** JWT tokens (see ADR-003)

For detailed rationale, alternatives considered, and cost analysis, see Architecture Decision Records in `docs/adr/`.
```

---

**Template Version:** 0.4.0
**Last Updated:** 2026-02-09
