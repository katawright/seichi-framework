# Requirements Checklist

**Purpose:** Quick validation (60-90 seconds) that requirements are ready for
System Design.

**Usage:** Review before declaring "requirements ready for System Design."

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

### Functional Requirements

1. [ ] **Functional requirements are testable** (FR-# IDs, behavior-focused, can
       be validated in Verification)
2. [ ] **[J] Each FR has objective acceptance criteria** (ACs define "done" with
       measurable conditions, no subjective language)
3. [ ] **Requirements prioritized with
       [MoSCoW](../../guides/framework.md#moscow-prioritization)** (clear
       Must/Should/Could/Won't Have with dependency understanding)

### Non-Functional and Data

4. [ ] **Key NFRs are captured** (performance, reliability, security/privacy,
       observability for success metrics)
5. [ ] **Security NFRs captured from data sensitivity classification** (auth,
       encryption, audit logging, data retention — scaled to tier)
6. [ ] **Consult AppSec on security NFRs per
       [RACI](../../guides/roles.md#raci-matrix)** (finalize security
       requirements, validate data classification)
7. [ ] **Data sources and integrations identified** (rate limits, SLAs,
       authentication, data ownership documented)
8. [ ] **API contracts documented with example requests/responses** (for
       API-centric projects; mark N/A for UI-only or internal-tool projects)

### Users and Problem Context

9. [ ] **Users/personas are identified** (primary and secondary users documented
       with relevant context)
10. [ ] **Problem statement is problem-first** (describes what users can't do,
        focuses on behavior not implementation)
11. [ ] **Goals and success criteria carried forward from Initiation**
        (enumerated goals G-1, G-2, …; success criteria with baseline → target,
        each mapped to its goal(s))
12. [ ] **Stakeholders consulted per initiation brief** (key stakeholders marked
        as Consulted for Requirements have provided input; see stakeholder table
        in initiation brief)

### Quality and Traceability

13. [ ] **[J] Top edge cases listed** (common failure scenarios with expected
        behavior)
14. [ ] **Open questions listed** (critical blockers flagged with owners)
15. [ ] **Traceability summary present** (FRs traced to Initiation goals and
        success metrics)
16. [ ] **Success Criteria Register referenced** — all success criteria have
        supporting FRs/NFRs and register measurement methods are feasible
17. [ ] **[J] Engineering and product review occurred** (eng and product have
        validated the requirements)
18. [ ] **[H] Security/compliance sign-off obtained when required**
        (tier-conditional — AppSec or the compliance authority signs off; N/A
        when the data-sensitivity classification carries no compliance scope)
19. [ ] **All required stage outputs produced** (requirements brief, acceptance
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

**Last Updated:** 2026-06-22

Added to framework in v0.3.0. Item 11 reworded for the goals/success-criteria
split in v0.45.0. AI-Led mode updated to Lights-Out mode in v0.49.0.
