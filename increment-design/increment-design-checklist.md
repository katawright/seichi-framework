# Increment Design Readiness Checklist

**Purpose:** Quick validation (60-90 seconds) that increment design is complete
and ready for Implementation.

**Usage:** Check every item before implementing each increment.

---

> Items marked **[H]** require human judgment. Other items can be verified or
> assisted by AI.

> Not every item applies at every scale — mark items N/A with justification when
> they don't fit your project's risk tier. See
> [Right-Sizing Guide](../right-sizing-guide.md).

---

## Checklist Items

### Scope and Components

1. [ ] **Increment scope defined** (requirements, ACs, out-of-scope documented)
2. [ ] **Components detailed enough to implement** (responsibilities, structure,
       dependencies)
3. [ ] **Component interactions documented** (flows, error handling paths)

### Interfaces, Data, and Conventions

4. [ ] **Interface specifications complete** (inputs, outputs, error cases)
5. [ ] **Data/state changes specified** (with migrations if applicable)
6. [ ] **[H] Design follows conventions from System Design** (patterns,
       interfaces, naming)

### Testing and Readiness

7. [ ] **[H] Test strategy covers all levels** (unit, integration, acceptance,
       performance where applicable)
8. [ ] **Implementation notes provided** (security, performance, patterns)
9. [ ] **[H] No major blockers or unresolved dependencies** (dependencies
       available, risks mitigated)
10. [ ] **[H] Engineers understand the design and can implement independently**
        (no major unknowns)

---

## Final Decision

> **If any items are unchecked, address before proceeding.**

- [ ] **Ready** — Proceed to Implementation
- [ ] **Not Ready** — Address weak items and re-check

---

<!-- prettier-ignore -->
> **AI suggestion:** _"Walk me through this checklist for [describe your increment design] and flag items needing attention."_

---

> For common issues and troubleshooting when items fail, see
> [Increment Design Reference: Checklist Troubleshooting](increment-design-reference.md#checklist-troubleshooting).

---

## Related Documents

- [Increment Design Brief Template](../templates/increment-design-brief-template.md)
- [AI-Assisted SDLC: Increment Design Stage](README.md)
- [Increment Design Reference](increment-design-reference.md)
- [AI-Assisted SDLC Stages](../framework-stages.md)

---

## Notes

**Last Updated:** 2026-02-28

Added to framework in v0.12.0.
