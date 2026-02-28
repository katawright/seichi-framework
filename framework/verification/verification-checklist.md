# Verification Checklist

**Purpose:** Quick validation (60-90 seconds) that verification is complete and
the increment is ready for deployment.

**Usage:** Review after test execution, before deployment approval.

---

> Items marked **[H]** require human judgment. Other items can be verified or
> assisted by AI.

## Checklist Items

### Test Execution

1. [ ] **All acceptance criteria verified with passing tests** (functional tests
       cover every AC)
2. [ ] **Integration tests pass** (component interactions, API contracts, data
       flow)
3. [ ] **Regression tests passing** (existing functionality unaffected by
       changes)
4. [ ] **Performance tests meet NFR targets** (or confirmed N/A with
       justification)
5. [ ] **Security tests pass with no critical vulnerabilities** (or confirmed
       N/A)
6. [ ] **Accessibility tests pass** (or confirmed N/A with justification)

### Acceptance and Instrumentation

7. [ ] **[H] UAT approved by business stakeholders** (sign-off obtained,
       feedback addressed)
8. [ ] **Instrumentation validated** (logging, metrics, dashboards, alerts
       working)

### Defect Status

9. [ ] **[H] No critical or high-severity defects open** (all resolved or
       deferred with justification)
10. [ ] **[H] Deferred defects documented** (justification and target version
        included)
11. [ ] **Fixed defects retested and verified** (no regressions from fixes)

### Production Readiness

12. [ ] **[H] Go/no-go decision recorded** (production readiness assessed,
        rollback plan documented)
13. [ ] **Verification brief completed with test results documented**
14. [ ] **[H] Deployment prerequisites prepared** (code tagged, runbook created,
        monitoring configured)
15. [ ] **[H] Stakeholders notified of deployment plan**

---

## Final Decision

> **If any items are unchecked, address before proceeding.**

- [ ] **Ready** — Hand off to Deployment stage
- [ ] **Not Ready** — Address blocking items and re-check

---

<!-- prettier-ignore -->
> **AI suggestion:** _"Walk me through this checklist for [describe your
> increment] and flag items needing attention."_

> For red flags, troubleshooting guidance, and detailed test type checklists,
> see the [Verification Reference](verification-reference.md).

---

## Related Documents

- [Verification Brief Template](../templates/verification-brief-template.md)
- [AI-Assisted SDLC: Verification Stage](README.md)
- [AI-Assisted SDLC Stages](../framework-stages.md)

---

## Notes

**Last Updated:** 2026-02-28

Added to framework in v0.6.0.
