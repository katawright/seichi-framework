# Increment Design Checklist

**Purpose:** Quick validation (60-90 seconds) that increment design is complete
and ready for Implementation.

**Usage:** Check every item before implementing each increment.

---

> **Markers.** _Unmarked_ — mechanical; an agent verifies directly. **[J]** —
> needs judgment, but whether a human, a delegated agent, or pre-authorized
> policy provides it is an operating-model choice. **[H]** — the non-delegable
> floor: **human-owned** regardless of operating model, discharged either
> interactively **or** by pre-authorized policy, never a delegated agent
> (interactive-only at Critical). The marker says only _whether an agent may
> discharge the item_; whether an **[H]** item clears interactively or by policy
> is resolved per project by the consequence + compliance floor (see the
> [Operating Model Guide](../../guides/operating-model.md)), not by the marker.

> **Lights-Out preset:** an agent completes the full checklist and presents
> results for review. **[H]** items stay human-owned — cleared interactively or
> by pre-authorized policy per the operating model. **During interactive stage
> execution, raise [H] items as they arise rather than batching them at the
> end.**

> Not every item applies at every scale — mark items N/A with justification when
> they don't fit your project's tier. See
> [Right-Sizing Guide](../../guides/right-sizing.md).

---

## Checklist Items

### Scope and Components

1. [ ] **Increment scope defined** (requirements, ACs, out-of-scope documented)
2. [ ] **Components detailed enough to implement** (contracts pinned —
       responsibilities, interfaces, dependencies; internal structure detailed
       only on a `guided` read path)
3. [ ] **All ACs and deliverables map to a component or standalone task**
       (cross-reference requirements against the component list; non-code
       deliverables — platform configuration, documentation, manual setup — are
       especially prone to being dropped)
4. [ ] **Component interactions documented** (flows, error handling paths)
5. [ ] **[J] Carry-forward items from previous increment resolved** (N/A for
       first increment; each item addressed, deferred with justification, or
       marked N/A)

### Interfaces, Data, and Conventions

6. [ ] **API specifications complete** (inputs, outputs, error cases)
7. [ ] **Data model changes specified** (with migrations if applicable; N/A for
       stateless tools — document in-memory data flow instead)
8. [ ] **Database-layer logic dependencies identified** (SP contracts referenced
       in design; logic authority confirmed for affected calculations; N/A for
       systems without database-layer business logic)
9. [ ] **[J] Design follows conventions from System Design** (patterns,
       interfaces, naming)

### Architecture and Security

10. [ ] **Consult Architect on design conformance per
        [RACI](../../guides/roles.md#raci-matrix)** (ADR compliance and
        architecture alignment)
11. [ ] **Security implications assessed** (auth, data, or API changes flagged;
        applicable threats from threat model identified)
12. [ ] **Consult AppSec on security implications per
        [RACI](../../guides/roles.md#raci-matrix)** (review auth/data/API
        changes for this increment)

### Testing and Readiness

13. [ ] **[J] Test strategy covers all levels** (unit, integration, acceptance,
        performance where applicable; for single-process tools, integration
        tests may be N/A if unit tests cover the full pipeline)
14. [ ] **Implementation notes provided** (security, performance, patterns)
15. [ ] **[J] No major blockers or unresolved dependencies** (dependencies
        available, risks mitigated)
16. [ ] **Brief is internally consistent** (cross-references trace cleanly —
        interface field lists match the component bodies that populate them,
        stated rules and invariants agree with the data model and each other,
        and no "the implementation will…" claim contradicts another part of the
        brief)
17. [ ] **[J] Design is understood well enough to implement independently** (no
        major unknowns)

### Foundation Concerns (I0 / foundation increments only)

18. [ ] **Foundation concerns reviewed and right-sized to project tier** (code
        quality, testing, security, local dev, documentation, onboarding)
19. [ ] **Deferred concerns documented with justification** (conscious
        deferrals, not omissions)
20. [ ] **All required stage outputs produced** (component designs, API
        specifications, data model changes, test strategy, implementation notes
        — verify against stage README front matter)

---

## Final Decision

> **If any items are unchecked, address before proceeding.**

- [ ] **Ready** — Proceed to Implementation; record the decision using the
      [Checkpoint Decision Template](../../templates/checkpoint-decision.md)
- [ ] **Not Ready** — Address weak items and re-check

---

<!-- prettier-ignore -->
> **AI suggestion:** _"Walk me through this checklist for [describe your increment design] and flag items needing attention."_

---

> For common issues and troubleshooting when items fail, see
> [Increment Design Reference: Checklist Troubleshooting](reference.md#checklist-troubleshooting).

---

## Related Documents

- [Increment Design Brief Template](../../templates/increment-design-brief.md)
- [Seichi Framework: Increment Design Stage](README.md)
- [Increment Design Reference](reference.md)
- [Seichi Framework Stages](../../guides/stages.md)

---

## Notes

**Last Updated:** 2026-07-06

Added to framework in v0.12.0.
