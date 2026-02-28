# Requirements Checklist

**Purpose:** Quick validation (60-90 seconds) that requirements are ready for
System Design.

**Usage:** Review before declaring "requirements ready for System Design."

---

> Items marked **[H]** require human judgment. Other items can be verified or
> assisted by AI.

> Not every item applies at every scale — mark items N/A with justification when
> they don't fit your project's risk tier. See
> [Right-Sizing Guide](../right-sizing-guide.md).

## Checklist Items

### Functional Requirements

1. [ ] **Functional requirements are testable** (FR-# IDs, behavior-focused, can
       be validated in Verification)
2. [ ] **[H] Each FR has objective acceptance criteria** (ACs define "done" with
       measurable conditions, no subjective language)
3. [ ] **Requirements prioritized with MoSCoW** (clear Must/Should/Could/Won't
       Have with dependency understanding)

### Non-Functional and Data

4. [ ] **Key NFRs are captured** (performance, reliability, security/privacy,
       observability for success metrics)
5. [ ] **Data sources and integrations identified** (rate limits, SLAs,
       authentication, data ownership documented)

### Users and Problem Context

6. [ ] **Users/personas are identified** (primary and secondary users documented
       with relevant context)
7. [ ] **Problem statement is problem-first** (describes what users can't do,
       focuses on behavior not implementation)
8. [ ] **Goals include measurable success metrics** (carried forward from
       Initiation Brief, baseline → target)

### Quality and Traceability

9. [ ] **[H] Top edge cases listed** (common failure scenarios with expected
       behavior)
10. [ ] **Open questions listed** (critical blockers flagged with owners)
11. [ ] **Traceability summary present** (FRs traced to Initiation objectives
        and success metrics)
12. [ ] **[H] Review occurred** (engineering + product, and security/compliance
        if relevant, have validated)

---

## Final Decision

> **If items are unchecked, address before proceeding.**

- [ ] **Ready for System Design** — All items checked, proceed to System Design
      stage (foundational pass)
- [ ] **Not Ready** — Address weak items and re-check

---

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

**Last Updated:** 2026-02-28

Added to framework in v0.3.0.
