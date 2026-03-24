# Increment Design Checklist

**Purpose:** Quick validation (60-90 seconds) that increment design is complete
and ready for Implementation.

**Usage:** Check every item before implementing each increment.

---

> Items marked **[H]** require human judgment. Other items can be verified or
> assisted by AI.

> **AI-Led mode:** AI completes the full checklist and presents results to the
> human reviewer. Humans review all items and confirm **[H]** items, which
> require human judgment that AI cannot substitute for.

> Not every item applies at every scale — mark items N/A with justification when
> they don't fit your project's risk tier. See
> [Right-Sizing Guide](../../guides/right-sizing.md).

---

## Checklist Items

### Scope and Components

1. [ ] **Increment scope defined** (requirements, ACs, out-of-scope documented)
2. [ ] **Components detailed enough to implement** (responsibilities, structure,
       dependencies)
3. [ ] **Component interactions documented** (flows, error handling paths)
4. [ ] **[H] Carry-forward items from previous increment resolved** (N/A for
       first increment; each item addressed, deferred with justification, or
       marked N/A)

### Interfaces, Data, and Conventions

5. [ ] **API specifications complete** (inputs, outputs, error cases)
6. [ ] **Data model changes specified** (with migrations if applicable; N/A for
       stateless tools — document in-memory data flow instead)
7. [ ] **[H] Design follows conventions from System Design** (patterns,
       interfaces, naming)

### Architecture and Security

8. [ ] **Consult Architect on design conformance per
       [RACI](../../guides/roles.md#raci-matrix)** (ADR
       compliance and architecture alignment)
9. [ ] **Security implications assessed** (auth, data, or API changes flagged;
       applicable threats from threat model identified)
10. [ ] **Consult AppSec on security implications per
        [RACI](../../guides/roles.md#raci-matrix)** (review
        auth/data/API changes for this increment)

### Testing and Readiness

11. [ ] **[H] Test strategy covers all levels** (unit, integration, acceptance,
        performance where applicable; for single-process tools, integration tests
        may be N/A if unit tests cover the full pipeline)
12. [ ] **Implementation notes provided** (security, performance, patterns)
13. [ ] **[H] No major blockers or unresolved dependencies** (dependencies
        available, risks mitigated)
14. [ ] **[H] Engineers understand the design and can implement independently**
        (no major unknowns)

### Foundation Concerns (I0 / foundation increments only)

15. [ ] **Foundation concerns reviewed and right-sized to project tier** (code
        quality, testing, security, local dev, documentation, onboarding)
16. [ ] **Deferred concerns documented with justification** (conscious
        deferrals, not omissions)
17. [ ] **All required stage outputs produced** (component designs, API
        specifications, data model changes, test strategy, implementation
        notes — verify against stage README front matter)

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
- [AI-Assisted SDLC: Increment Design Stage](README.md)
- [Increment Design Reference](reference.md)
- [AI-Assisted SDLC Stages](../../guides/stages.md)

---

## Notes

**Last Updated:** 2026-03-19

Added to framework in v0.12.0.
