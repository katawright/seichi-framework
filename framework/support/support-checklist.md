# Support Checklist

Use this checklist to verify ongoing operational readiness and health. Review
regularly (weekly recommended).

> **First-time setup?** For one-time support infrastructure readiness (choosing
> support level, establishing incident response, setting up on-call), use the
> [Support Readiness Checklist](support-readiness-checklist.md) instead. This
> checklist covers ongoing operations.

Not all items apply to all support levels. Teams at the Minimal level may skip
items that reference formal on-call rotations or SLAs. See the
[Support Operations Guide](support-operations-guide.md) for level definitions.

> Items marked **[H]** require human judgment. Other items can be verified or
> assisted by AI.

## Support Readiness

1. **[H] Support team identified with roles and on-call rotation.**
2. **Production access granted (VPN, MFA, credentials documented).**
3. **Support brief completed and up to date.**
4. **Runbooks created for common operational tasks.**
5. **[H] Handoff from deployment team completed (training, walkthrough).**
6. **Escalation contacts identified and documented.**

## Monitoring and Alerting

7. **Production monitoring dashboard configured and accessible.**
8. **Alerts configured with severity-appropriate routing (page vs. Slack vs.
   email).**
9. **[H] Alert thresholds tested and tuned (not too noisy, not too quiet).**
10. **Error tracking and log aggregation configured.**
11. **Success criteria dashboard shows current values against targets.**

## Incident Response Readiness

12. **Incident response procedure documented with severity levels.**
13. **On-call rotation published with backup identified.**
14. **Rollback procedure documented and tested.**
15. **Post-incident review process defined.**

## Ongoing Operations

16. **[H] Daily: Dashboards reviewed, new issues triaged.**
17. **[H] Bug triage process active (severity, impact, urgency).**
18. **[H] Enhancement backlog maintained and reviewed.**
19. **Dependency scanning active (vulnerabilities tracked).**
20. **[H] Documentation updated after incidents and releases.**

## Success Criteria

21. **Success criteria from Initiation are being measured per schedule.**
22. **[H] Trends analyzed (improving, declining, stable).**
23. **[H] Reports distributed to stakeholders.**
24. **[H] Action items created when metrics are behind target.**

> If items 1-6 and 12-14 are not met, the team is not ready to own production.

For detailed operational checklists, decision trees, and red flags, see
[Support Reference](support-reference.md) or use AI to generate checklists
tailored to your tools and processes.

---

## Exit Criteria Alignment

This checklist aligns with the formal exit criteria in
[AI-Assisted SDLC Stages](../framework-stages.md#stage-8-support):

- Support team ready and on-call rotation active (items 1-6)
- Monitoring and alerting operational (items 7-11)
- Incident response process ready (items 12-15)
- Success criteria tracked and reported (items 21-24)

---

## Notes

**Last Updated:** 2026-02-21

_Added to framework in v0.8.0_
