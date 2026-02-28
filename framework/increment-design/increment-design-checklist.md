# Increment Design Readiness Checklist

**Purpose:** Quick validation (60-90 seconds) that increment design is complete
and ready for Implementation.

**Usage:** Check every item before implementing each increment.

---

> Items marked **[H]** require human judgment. Other items can be verified or
> assisted by AI.

---

## Checklist Items

### Core

1. [ ] **Increment scope defined** (requirements, ACs, out-of-scope documented)
2. [ ] **Components detailed enough to implement** (responsibilities, structure,
       dependencies)
3. [ ] **Component interactions documented** (flows, error handling paths)
4. [ ] **[H] Test strategy covers all levels** (unit, integration, acceptance,
       performance where applicable)
5. [ ] **[H] Design follows conventions from System Design** (patterns,
       interfaces, naming)

### Supporting

6. [ ] **Interface specifications complete** (inputs, outputs, error cases)
7. [ ] **Data/state changes specified** (with migrations if applicable)
8. [ ] **Implementation notes provided** (security, performance, patterns)
9. [ ] **[H] No major blockers or unresolved dependencies** (dependencies
       available, risks mitigated)
10. [ ] **[H] Engineers understand the design and can implement independently**
        (no major unknowns)

---

## Final Decision

> **If core items (1-5) are missing, the increment is usually not ready for
> Implementation.**

- [ ] **Ready** — Proceed to Implementation
- [ ] **Not Ready** — Address weak items and re-check

---

## Core Items

Why the core items are blocking — if any of these are missing, implementation is
unreliable:

| Item                      | Why It's Blocking                                                |
| ------------------------- | ---------------------------------------------------------------- |
| 1. Increment scope        | Without clear scope, engineers build the wrong thing or too much |
| 2. Component design       | Vague components lead to misaligned implementations and rework   |
| 3. Component interactions | Undocumented flows cause integration failures and missing errors |
| 4. Test strategy          | Without a test plan, Verification has nothing to execute against |
| 5. Convention adherence   | Ignoring System Design conventions creates inconsistent code     |

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

**Last Updated:** 2026-02-27

Added to framework in v0.12.0.
