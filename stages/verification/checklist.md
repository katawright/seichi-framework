# Verification Checklist

**Purpose:** Quick validation (60-90 seconds) that verification is complete and
the increment is ready for deployment.

**Usage:** Review after test execution, before deployment review.

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
       N/A; consult [AppSec per RACI](../../guides/roles.md#raci-matrix) for
       sign-off)
7. [ ] **Accessibility tests pass** (or confirmed N/A with justification)
8. [ ] **Schema compatibility with existing consumers verified** (N/A for
       greenfield or non-database changes; brownfield: confirm schema changes
       are backward-compatible with stored procedures, external write paths, and
       cross-schema dependencies)
9. [ ] **Database-layer logic regression passing** (SP regression suite green;
       logic authority verified for modified calculations; N/A for systems
       without database-layer business logic or greenfield)
10. [ ] **[J] Readiness re-assessment completed** (N/A except after brownfield
        preparation increments; re-score target area per
        [Re-Assessment Protocol](../../guides/brownfield-readiness.md#readiness-re-assessment-protocol);
        for preparation increments, use binary pass/fail criteria per readiness
        axis defined at System Design; for discovery increments, verification is
        document review — mark test execution items N/A with rationale)

### Acceptance and Instrumentation

11. [ ] **[H] UAT approved by business stakeholders** (sign-off obtained,
        feedback addressed; Minimal: informal approval with documented
        participants and feedback; Standard+: formal sign-off)
12. [ ] **Instrumentation validated** (logging, metrics, dashboards, alerts
        working)

### Defect Status

13. [ ] **[J] No critical or high-severity defects open** (all resolved or
        deferred with justification)
14. [ ] **[J] Deferred defects documented** (justification and target version
        included)
15. [ ] **Fixed defects retested and verified** (no regressions from fixes)

### Production Readiness

16. [ ] **[J] Compliance controls validated** (N/A unless the project has
        compliance scope; the required controls are met, with evidence — the
        validation sweep that feeds the deploy
        [Compliance Approval](../deployment/README.md#compliance-approval-is-a-floor-authorization).
        Agent-able at any tier; `condition: compliance`, Standard/Enterprise;
        per release)
17. [ ] **[H] Go/no-go decision recorded** (production readiness assessed,
        rollback plan documented)
18. [ ] **Verification brief completed with test results documented**
19. [ ] **[J] Deployment prerequisites prepared** (code tagged, runbook created,
        monitoring configured; if Deployment was skipped at Gate 2, reference
        that decision and confirm no re-evaluation triggers activated)
20. [ ] **Stakeholders notified of deployment plan**
21. [ ] **All required stage outputs produced** (verification brief, test
        results, defect reports — verify against stage README front matter)

---

## Final Decision

> **If any items are unchecked, address them or document as conditions before
> selecting a final decision below.**

- [ ] **Ready** — Hand off to Deployment stage; record the decision using the
      [Checkpoint Decision Template](../../templates/checkpoint-decision.md)
- [ ] **Ready with conditions** — Document conditions in Verification Brief;
      hand off to Deployment with conditions noted; record the decision using
      the [Checkpoint Decision Template](../../templates/checkpoint-decision.md)
- [ ] **Not Ready** — Route to Implementation for rework (see
      [Rework Cycle](README.md#when-verification-fails))

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

**Last Updated:** 2026-06-28

Added to framework in v0.6.0. Database-layer logic regression and preparation
increment verification guidance added in v0.42.0. AI-Led mode updated to
Lights-Out mode in v0.49.0. v0.52.0 split the [H] marker into [J]/[H] (CL-1) and
added the tier-conditional compliance-validation [J] item (CL-2).
