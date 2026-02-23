# Requirements Checklist

**Purpose:** Quick validation (60-90 seconds) that requirements are ready for
System Design.

**Usage:** Review before declaring "requirements ready for System Design."

---

> Items marked **[H]** require human judgment. Other items can be verified or
> assisted by AI.

## Checklist Items

1. **Users/personas are identified** — primary and secondary users documented
   with relevant context

2. **Problem statement is problem-first** — describes what users can't do,
   focuses on behavior not implementation

3. **Goals include measurable success metrics** — carried forward from
   Initiation Brief (baseline -> target)

4. **MoSCoW prioritization is explicit** — Must Have boundaries clear,
   Should/Could/Won't Have items identified

5. **Functional requirements are testable (FR-#)** — unique IDs,
   behavior-focused, can be validated in Verification

6. **[H] Each FR has objective acceptance criteria** — ACs define "done" with
   measurable conditions, no subjective language

7. **Key NFRs are captured** — performance, reliability, security/privacy,
   observability for success metrics

8. **Data sources and integrations identified** — rate limits, SLAs,
   authentication, data ownership documented

9. **[H] Top edge cases listed** — common failure scenarios with expected
   behavior

10. **Open questions listed** — critical blockers flagged with owners

11. **Requirements prioritized (MoSCoW)** — clear Must/Should/Could/Won't Have
    with dependency understanding

12. **[H] Review occurred** — engineering + product (and security/compliance if
    relevant) have validated

---

## Final Decision

> **If items 5-7 and 11-12 are weak, requirements aren't ready for System
> Design.**

- [ ] **Ready for System Design** — All items checked, proceed to System Design
      stage (foundational pass)
- [ ] **Not Ready** — Address weak items and re-check

> For critical items rationale and exit criteria alignment, see
> [Requirements Reference: Checklist Reference](requirements-reference.md#checklist-reference).

> **AI suggestion:** _"Walk me through this checklist for my requirements and flag items needing attention."_ Or: _"Review my requirements document against this checklist and identify weak areas or gaps."_ AI can help by evaluating each checklist item against your requirements and highlighting where more detail is needed."_

---

**Related Documents:**

- [Requirements Brief Template](requirements-brief-template.md)
- [Requirements Guide](requirements-guide.md)
- [Requirements Reference](requirements-reference.md)
- [AI-Assisted SDLC Stages](../framework-stages.md)

---

## Notes

**Last Updated:** 2026-02-21

Added to framework in v0.3.0.
