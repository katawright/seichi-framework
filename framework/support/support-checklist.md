# Support Checklist

**Purpose:** Verify ongoing operational readiness and production health.
**Usage:** Review regularly (weekly recommended) throughout the support stage.

---

> Items marked **[H]** require human judgment. Other items can be verified or
> assisted by AI.

> Not every item applies at every scale — mark items N/A with justification when
> they don't fit your project's risk tier. See
> [Right-Sizing Guide](../right-sizing-guide.md).

## Support Readiness

1. [ ] **[H] Support team identified with roles and on-call rotation** (schedule
       published and accessible)
2. [ ] **Production access granted** (VPN, MFA, credentials documented)
3. [ ] **Support brief completed and up to date** (reviewed within last quarter)
4. [ ] **Runbooks created for common operational tasks** (deploy, rollback,
       scale)
5. [ ] **[H] Handoff from deployment team completed** (training and walkthrough
       done)
6. [ ] **Escalation contacts identified and documented** (L1 through L3)

**Gate:** All items checked → team is ready to own production.

---

## Monitoring and Alerting

7. [ ] **Production monitoring dashboard configured and accessible** (team can
       view at any time)
8. [ ] **Alerts configured with severity-appropriate routing** (page vs. Slack
       vs. email)
9. [ ] **[H] Alert thresholds tested and tuned** (not too noisy, not too quiet)
10. [ ] **Error tracking and log aggregation configured** (errors searchable and
        indexed)
11. [ ] **Success criteria dashboard shows current values against targets**
        (baselines captured)

**Gate:** All items checked → monitoring infrastructure is operational.

---

## Incident Response Readiness

12. [ ] **Incident response procedure documented with severity levels** (P0
        through P3 defined)
13. [ ] **On-call rotation published with backup identified** (no single point
        of failure)
14. [ ] **Rollback procedure documented and tested** (verified within last
        quarter)
15. [ ] **Post-incident review process defined** (blameless format with action
        items)

**Gate:** All items checked → team can respond to production incidents.

---

## Ongoing Operations

16. [ ] **[H] Daily: Dashboards reviewed, new issues triaged** (no unreviewed
        alerts older than 24h)
17. [ ] **[H] Bug triage process active** (severity, impact, urgency assessed)
18. [ ] **[H] Enhancement backlog maintained and reviewed** (prioritized
        regularly)
19. [ ] **Dependency scanning active** (vulnerabilities tracked and patched per
        schedule)
20. [ ] **[H] Documentation updated after incidents and releases** (runbooks and
        knowledge base current)

**Gate:** All items checked → ongoing operations are healthy and sustainable.

---

## Success Criteria

21. [ ] **Success criteria from Initiation are being measured per schedule**
        (daily, weekly, or monthly as defined)
22. [ ] **[H] Trends analyzed** (improving, declining, or stable assessed)
23. [ ] **[H] Reports distributed to stakeholders** (monthly at minimum)
24. [ ] **[H] Action items created when metrics are behind target** (assigned
        with due dates)

**Gate:** All items checked → business objectives are actively tracked.

---

<!-- prettier-ignore -->
> **AI suggestion:** _"Walk me through this checklist for [describe your
> project, support level, and team] and flag any items that need extra
> attention."_

---

## Related Documents

- [Support Stage Guide](README.md)
- [Support Readiness Checklist](support-readiness-checklist.md)
- [Support Operations Guide](support-operations-guide.md)
- [Support Reference](support-reference.md)

---

## Notes

**Last Updated:** 2026-02-28

Added to framework in v0.8.0.
