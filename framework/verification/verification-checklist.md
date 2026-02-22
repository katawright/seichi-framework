# Verification Checklist

**Purpose:** Pre-handoff readiness review that testing is complete and the
increment is ready for deployment.

**Usage:** Review after test execution, before deployment approval.

---

> Items marked **[H]** require human judgment. Other items can be verified or
> assisted by AI.

## Test Planning

- [ ] Increment Design stage test strategy reviewed and confirmed
- [ ] Test types confirmed (integration, functional, performance, security,
      accessibility)
- [ ] Test environments prepared and accessible
- [ ] Test data loaded and validated
- [ ] Acceptance criteria clearly identified

**Gate:** Test plan confirmed → Proceed to execution

---

## Test Execution

- [ ] Integration tests passing (component interactions, API contracts, data
      flow)
- [ ] Functional tests passing (all acceptance criteria verified)
- [ ] Performance tests meet NFR targets (or confirmed N/A)
- [ ] Security tests pass — no critical/high vulnerabilities (or confirmed N/A)
- [ ] Accessibility tests pass (or confirmed N/A)
- [ ] Regression tests passing

**Gate:** All test types executed → Proceed to acceptance

---

## User Acceptance Testing

- [ ] **[H]** UAT scenarios executed with business users
- [ ] **[H]** UAT feedback documented and addressed
- [ ] **[H]** Business stakeholder sign-off obtained
- [ ] Approver name, date, and conditions documented

**Gate:** UAT approved → Proceed to readiness

---

## Monitoring and Instrumentation

- [ ] Logging implemented and tested
- [ ] Metrics collection verified
- [ ] Dashboards display correctly
- [ ] Alerts trigger as expected
- [ ] Success criteria measurement working

**Gate:** Instrumentation verified → Confirm readiness

---

## Defect Status

- [ ] All defects logged and tracked
- [ ] No critical or high-severity defects open
- [ ] **[H]** Deferred defects documented with justification
- [ ] Fixed defects retested and verified

**Gate:** No blocking defects → Proceed to readiness

---

## Production Readiness and Handoff

- [ ] All quality gates passed
- [ ] Verification brief completed
- [ ] **[H]** Known issues and limitations documented
- [ ] Deployment checklist prepared
- [ ] Rollback plan documented
- [ ] Deployment team notified and ready

**Gate:** All sign-offs obtained → Hand off to Deployment

---

## Final Decision

- [ ] **READY FOR DEPLOYMENT** — All checks passed
- [ ] **READY WITH CONDITIONS** — Minor issues, conditions documented
- [ ] **NOT READY** — Critical issues must be resolved. Return to Implementation
      for defect fixes. Start a new verification cycle with a fresh brief when
      fixes are complete.

**Sign-Off:**

- QA Lead: [Name]
- Date: [YYYY-MM-DD]
- Status: [Ready / Ready with conditions / Not ready]

---

> For red flags, troubleshooting guidance, and detailed test type checklists,
> see the [Verification Reference](verification-reference.md).

> **AI suggestion:** _"Walk me through this checklist for [describe your > >
> increment] and flag items that need extra attention."_

---

**Last Updated:** 2026-02-21

_Added to framework in v0.6.0_
