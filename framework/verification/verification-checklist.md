# Verification Checklist

**Purpose:** Quick validation (60-90 seconds) that verification is complete and
the increment is ready for deployment.

**Usage:** Review after test execution, before deployment approval.

---

> Items marked **[H]** require human judgment. Other items can be verified or
> assisted by AI.

## Checklist Items

### Core

1. [ ] **All acceptance criteria verified with passing tests** (functional tests
       cover every AC)
2. [ ] **Integration tests pass** (component interactions, API contracts, data
       flow)
3. [ ] **[H] No critical or high-severity defects open** (all resolved or
       deferred with justification)
4. [ ] **[H] UAT approved by business stakeholders** (sign-off obtained,
       feedback addressed)
5. [ ] **[H] Go/no-go decision recorded** (production readiness assessed,
       rollback plan documented)

### Supporting

6. [ ] **Performance tests meet NFR targets** (or confirmed N/A with
       justification)
7. [ ] **Security tests pass with no critical vulnerabilities** (or confirmed
       N/A)
8. [ ] **Instrumentation validated** (logging, metrics, dashboards, alerts
       working)
9. [ ] **[H] Deferred defects documented** (justification and target version
       included)
10. [ ] **Verification brief completed** with test results documented
11. [ ] **[H] Deployment prerequisites prepared** (code tagged, runbook created,
        monitoring configured)
12. [ ] **[H] Stakeholders notified** of deployment plan

---

## Final Decision

> **If core items (1-5) are missing, the increment is usually not ready for
> deployment.**

- [ ] **Ready** — Hand off to Deployment stage
- [ ] **Not Ready** — Address blocking items and re-check

---

## Core Items

Why the core items are blocking — if any of these are missing, deployment is
unreliable:

| Item                   | Why It's Blocking                                          |
| ---------------------- | ---------------------------------------------------------- |
| 1. Acceptance criteria | Unverified criteria mean unproven business value           |
| 2. Integration tests   | Broken integrations cause production failures              |
| 3. No critical defects | Critical defects in production damage users and trust      |
| 4. UAT approval        | Without business sign-off, you may deploy the wrong thing  |
| 5. Go/no-go decision   | No readiness assessment means no rollback plan if it fails |

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

**Last Updated:** 2026-02-27

Added to framework in v0.6.0.
