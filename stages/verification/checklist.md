# Verification Checklist

**Purpose:** Quick validation (60-90 seconds) that verification is complete and
the increment is ready for deployment.

**Usage:** Review after test execution, before deployment approval.

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

### Test Execution

1. [ ] **All acceptance criteria verified with passing tests** (functional tests
       cover every AC; at Minimal tier, manual acceptance tests with documented
       results are sufficient)
2. [ ] **Integration tests pass** (component interactions, API contracts, data
       flow)
3. [ ] **Implementation matches component interaction flows from Increment
       Design Brief** (no undocumented simplifications — verify key interaction
       sequences align with design)
4. [ ] **Regression tests passing** (existing functionality unaffected by
       changes)
5. [ ] **Performance tests meet NFR targets** (or confirmed N/A with
       justification)
6. [ ] **Security tests pass with no critical vulnerabilities** (or confirmed
       N/A)
7. [ ] **Accessibility tests pass** (or confirmed N/A with justification)
8. [ ] **Schema compatibility with existing consumers verified** (N/A for
       greenfield or non-database changes; brownfield: confirm schema changes
       are backward-compatible with stored procedures, external write paths, and
       cross-schema dependencies)
9. [ ] **[H] Readiness re-assessment completed** (N/A except after brownfield
       preparation increments; re-score target area per
       [Re-Assessment Protocol](../../guides/brownfield-readiness.md#readiness-re-assessment-protocol))

### Acceptance and Instrumentation

10. [ ] **[H] UAT approved by business stakeholders** (sign-off obtained,
        feedback addressed; Minimal: informal approval with documented
        participants and feedback; Standard+: formal sign-off)
11. [ ] **Instrumentation validated** (logging, metrics, dashboards, alerts
        working)

### Defect Status

12. [ ] **[H] No critical or high-severity defects open** (all resolved or
        deferred with justification)
13. [ ] **[H] Deferred defects documented** (justification and target version
        included)
14. [ ] **Fixed defects retested and verified** (no regressions from fixes)

### Production Readiness

15. [ ] **[H] Go/no-go decision recorded** (production readiness assessed,
        rollback plan documented)
16. [ ] **Verification brief completed with test results documented**
17. [ ] **[H] Deployment prerequisites prepared** (code tagged, runbook created,
        monitoring configured; if Deployment was skipped at Gate 2, reference
        that decision and confirm no re-evaluation triggers activated)
18. [ ] **[H] Stakeholders notified of deployment plan**
19. [ ] **All required stage outputs produced** (verification brief, test
        results, defect reports — verify against stage README front matter)

---

## Final Decision

> **If any items are unchecked, address before proceeding.**

- [ ] **Ready** — Hand off to Deployment stage
- [ ] **Ready with conditions** — Document conditions in Verification Brief;
      hand off to Deployment with conditions noted
- [ ] **Not Ready** — Address blocking items and re-check

---

<!-- prettier-ignore -->
> **AI suggestion:** _"Walk me through this checklist for [describe your
> increment] and flag items needing attention."_

> For red flags, troubleshooting guidance, and detailed test type checklists,
> see the [Verification Reference](reference.md).

---

## Related Documents

- [Verification Brief Template](../../templates/verification-brief.md)
- [AI-Assisted SDLC: Verification Stage](README.md)
- [Verification Reference](reference.md)
- [AI-Assisted SDLC Stages](../../guides/stages.md)

---

## Notes

**Last Updated:** 2026-03-19

Added to framework in v0.6.0.
