# Requirements Checklist

**Purpose:** Quick validation (60-90 seconds) that requirements are ready for
System Design.

**Usage:** Review before declaring "requirements ready for System Design."

---

> Items marked **[H]** require human judgment. Other items can be verified or
> assisted by AI.

## Checklist Items

### Core

1. [ ] **Functional requirements are testable** (FR-# IDs, behavior-focused, can
       be validated in Verification)

2. [ ] **[H] Each FR has objective acceptance criteria** (ACs define "done" with
       measurable conditions, no subjective language)

3. [ ] **Key NFRs are captured** (performance, reliability, security/privacy,
       observability for success metrics)

4. [ ] **Requirements prioritized with MoSCoW** (clear Must/Should/Could/Won't
       Have with dependency understanding)

5. [ ] **[H] Review occurred** (engineering + product, and security/compliance
       if relevant, have validated)

### Supporting

6. [ ] **Users/personas are identified** (primary and secondary users documented
       with relevant context)

7. [ ] **Problem statement is problem-first** (describes what users can't do,
       focuses on behavior not implementation)

8. [ ] **Goals include measurable success metrics** (carried forward from
       Initiation Brief, baseline → target)

9. [ ] **Data sources and integrations identified** (rate limits, SLAs,
       authentication, data ownership documented)

10. [ ] **[H] Top edge cases listed** (common failure scenarios with expected
        behavior)

11. [ ] **Open questions listed** (critical blockers flagged with owners)

12. [ ] **Traceability summary present** (FRs traced to Initiation objectives
        and success metrics)

---

## Final Decision

> **If core items (1-5) are weak, requirements aren't ready for System Design.**

- [ ] **Ready for System Design** — All items checked, proceed to System Design
      stage (foundational pass)
- [ ] **Not Ready** — Address weak items and re-check

---

## Core Items

Why the core items are blocking — if any of these are missing, downstream work
is unreliable:

| Item                     | Why It's Blocking                                                       |
| ------------------------ | ----------------------------------------------------------------------- |
| 1. Testable FRs          | System Design can't architect for vague requirements                    |
| 2. Objective ACs         | System Design needs clear "done" definition for test planning           |
| 3. Key NFRs              | Architecture depends on performance, security, scalability requirements |
| 4. MoSCoW prioritization | System Design needs focus for foundational pass                         |
| 5. Review occurred       | Prevents rework from misalignment                                       |

> **AI suggestion:** _"Walk me through this checklist for my requirements and
> flag items needing attention."_ Or: _"Review my requirements document against
> this checklist and identify weak areas or gaps."_

---

## Related Documents

- [Requirements Brief Template](../templates/requirements-brief-template.md)
- [AI-Assisted SDLC: Requirements Stage](README.md)
- [Requirements Reference](requirements-reference.md)
- [AI-Assisted SDLC Stages](../framework-stages.md)

---

## Notes

**Last Updated:** 2026-02-27

Added to framework in v0.3.0.
