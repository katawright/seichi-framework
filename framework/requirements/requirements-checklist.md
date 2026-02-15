# Requirements Checklist

**Last Updated:** 2026-02-09

Use this checklist before declaring "requirements ready for Design."

**Time required:** 60-90 seconds

**Purpose:** Verify that your Requirements Document meets quality standards and
is ready to guide Design stage work.

---

## Checklist Items

1. **Users/personas are identified.**
   - Primary and secondary users documented with relevant context
   - User needs and workflows understood

2. **Problem statement is problem-first (not solution-first).**
   - Describes what users can't do and why
   - Focuses on behavior, not implementation

3. **Goals include measurable success metrics (baseline → target where
   possible).**
   - Carried forward from Initiation Brief
   - Metrics will inform NFRs and instrumentation

4. **MoSCoW prioritization is explicit (Must Have/Should Have/Could Have/Won't
   Have).**
   - Must Have boundaries clear (minimum for first usable release)
   - Should Have items identified (future releases - committed)
   - Could Have items identified (if time permits - not committed)
   - Won't Have / out-of-scope / non-goals prevent scope creep

5. **Functional requirements are written as testable statements (FR-#).**
   - Each FR has unique identifier for traceability
   - Requirements describe behavior ("shall" or "As a user, I can...")
   - Requirements are testable (can be validated in Verification stage)

6. **Each FR has acceptance criteria that are objective/observable.**
   - ACs define "done" for each requirement
   - ACs use measurable conditions (response time, error states, permissions,
     etc.)
   - ACs avoid subjective language ("works well", "fast", "user-friendly")

7. **Key NFRs are captured (performance, reliability, security/privacy,
   observability).**
   - Performance targets specified (latency, throughput)
   - Reliability requirements defined (availability, error budgets)
   - Security/privacy requirements documented (auth, PII, audit)
   - Observability requirements ensure measurement of success metrics

8. **Data sources and integrations are identified (including
   limits/constraints).**
   - External/internal integrations documented
   - Rate limits, SLAs, authentication methods captured
   - Data ownership and retention policies noted

9. **Top edge cases are listed with expected behavior.**
   - Common failure scenarios addressed
   - Error handling expectations documented
   - UX implications of edge cases considered

10. **Open questions are listed (and owners assigned where possible).**
    - Critical questions flagged as blockers
    - Owners assigned for resolution
    - Timeline for resolution noted

11. **Requirements are prioritized using MoSCoW method.**
    - Must Have (first release), Should Have (future - committed), Could Have
      (if time permits - not committed), Won't Have (out of scope)
    - Clear distinction between committed (Must/Should Have) and aspirational
      (Could Have)
    - Prioritization uses MoSCoW method for coarse prioritization
    - Design stage will map priorities to specific increments via iteration plan
    - Dependencies between requirements understood

12. **A review occurred (engineering + product; security/compliance if
    relevant).**
    - Business stakeholders validated requirements accuracy
    - Engineering reviewed for technical feasibility
    - Security/compliance reviewed if PII, regulated data, or compliance
      requirements exist
    - Alignment achieved (or adjustments documented)

---

## Critical Items

> **If items 5–7 and 11–12 are weak, requirements aren't ready for Design.**

These items are essential for enabling Design work:

- **Item 5 (Testable FRs):** Design can't architect for vague requirements
- **Item 6 (Objective ACs):** Design needs clear definition of "done" to inform
  testing strategy
- **Item 7 (Key NFRs):** Architecture decisions depend on performance, security,
  scalability requirements
- **Item 11 (Prioritization):** Design needs to know what to focus on for
  foundational pass
- **Item 12 (Stakeholder review):** Prevents rework from misalignment

---

## Exit Criteria Alignment

This checklist validates the Requirements stage exit criteria from
[STAGES.md](../../STAGES.md#stage-2-requirements):

- ✅ All high-priority requirements have acceptance criteria (Items 5-6)
- ✅ Requirements reviewed and approved by business and technical stakeholders
  (Item 12)
- ✅ NFRs include measurement/instrumentation needs (Item 7, observability)
- ✅ Requirements are testable and unambiguous (Items 5-6)

---

## Framework Alignment

This checklist aligns with:

- **Stage definition:** [STAGES.md](../../STAGES.md#stage-2-requirements) lines
  230-234 (Exit Criteria)
- **Checkpoint taxonomy:** Quality Checkpoint (ready/not ready) per
  [STAGES.md - Decision Points and Checkpoints](../../STAGES.md#decision-points-and-checkpoints)
- **Next stage:** If ready, proceed to Design stage (foundational pass) per
  [STAGES.md](../../STAGES.md#stage-3-design)

---

## Notes

Added to framework in v0.3.0. Adapted from reference materials v0.1 (2026-02-06)
with exit criteria alignment, critical items emphasis, and framework
cross-references.
