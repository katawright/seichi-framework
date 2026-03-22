# Requirements Checklist

**Purpose:** Quick validation (60-90 seconds) that requirements are ready for
System Design.

**Usage:** Review before declaring "requirements ready for System Design."

---

> Items marked **[H]** require human judgment. Other items can be verified or
> assisted by AI.

> **AI-Led mode:** AI completes the full checklist and presents results to the
> human reviewer. Humans review all items and confirm **[H]** items, which
> require human judgment that AI cannot substitute for.

> Not every item applies at every scale — mark items N/A with justification when
> they don't fit your project's risk tier. See
> [Right-Sizing Guide](../../guides/right-sizing.md).

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
5. [ ] **Security NFRs captured from data sensitivity classification** (auth,
       encryption, audit logging, data retention — scaled to tier)
6. [ ] **Consult AppSec on security NFRs per
       [RACI](../../guides/framework.md#roles-and-responsibilities)** (finalize
       security requirements, validate data classification)
7. [ ] **Data sources and integrations identified** (rate limits, SLAs,
       authentication, data ownership documented)
8. [ ] **API contracts documented with example requests/responses** (for
       API-centric projects; mark N/A for UI-only or internal-tool projects)

### Users and Problem Context

9. [ ] **Users/personas are identified** (primary and secondary users documented
       with relevant context)
10. [ ] **Problem statement is problem-first** (describes what users can't do,
        focuses on behavior not implementation)
11. [ ] **Goals include measurable success metrics** (carried forward from
        Initiation Brief, baseline → target)

### Quality and Traceability

12. [ ] **[H] Top edge cases listed** (common failure scenarios with expected
        behavior)
13. [ ] **Open questions listed** (critical blockers flagged with owners)
14. [ ] **Traceability summary present** (FRs traced to Initiation objectives
        and success metrics)
15. [ ] **Success Criteria Register referenced (Standard+)** — all success
        criteria have supporting FRs/NFRs and register measurement methods are
        feasible
16. [ ] **[H] Review occurred** (engineering + product, and security/compliance
        if relevant, have validated)
17. [ ] **All required stage outputs produced** (requirements brief, acceptance
        criteria, prioritized backlog, NFRs — verify against stage README front
        matter)

---

## Final Decision

> **If items are unchecked, address before proceeding.**

- [ ] **Ready for System Design** — All items checked, proceed to System Design
      stage (foundational pass)
- [ ] **Not Ready** — Address weak items and re-check

Record the decision using the
[Checkpoint Decision Template](../../templates/checkpoint-decision.md).

---

> **AI suggestion:** _"Walk me through this checklist for my requirements and
> flag items needing attention."_ Or: _"Review my requirements document against
> this checklist and identify weak areas or gaps."_

---

## Related Documents

- [Requirements Brief Template](../../templates/requirements-brief.md)
- [AI-Assisted SDLC: Requirements Stage](README.md)
- [Requirements Reference](reference.md)
- [AI-Assisted SDLC Stages](../../guides/stages.md)

---

## Notes

**Last Updated:** 2026-03-19

Added to framework in v0.3.0.
