# AI-Assisted SDLC: Deployment Stage

**Stage:** 7 of 8 (Deployment)

**Primary Audience:** DevOps Engineers, Engineers

**Execution Pattern:** Iterative (per increment)

For cross-cutting framework concepts, see
[Framework Guide](../framework-guide.md).

## Starting Point

**To begin, you need:**

- Verified increment (all tests passing)
- UAT sign-off from business stakeholders
- Production readiness checklist passed
- Test results and known issues documented

> **First time deploying this project?** Start with the
> [Deployment Planning Guide](deployment-planning-guide.md) and
> [Deployment Pipeline Checklist](deployment-pipeline-checklist.md) to set up
> your deployment infrastructure before your first increment deployment.

## How AI Helps

- **Deployment script generation:** Describe your infrastructure and AI produces
  deployment scripts, rollback procedures, and runbooks
- **Pre-deployment review:** AI walks through the checklist and flags gaps or
  risks in your deployment plan
- **Communication drafting:** AI drafts stakeholder notifications for each
  deployment phase
- **Monitoring configuration:** AI suggests alert thresholds, dashboard layouts,
  and health check endpoints for your stack

For assistance level details, see the
[AI Assistance Scorecard](../framework-ai-assistance.md).

## Artifacts

| File                                                              | Description                                            |
| ----------------------------------------------------------------- | ------------------------------------------------------ |
| [Deployment Planning Guide](deployment-planning-guide.md)         | Strategic guide for deployment infrastructure setup    |
| [Deployment Pipeline Checklist](deployment-pipeline-checklist.md) | Quick checklist for pipeline readiness                 |
| [Deployment Brief Template](deployment-brief-template.md)         | Template for deployment plan and results               |
| [Deployment Guide](deployment-guide.md)                           | Stage-specific guidance and rationale                  |
| [Deployment Checklist](deployment-checklist.md)                   | 60-90 second readiness checklist                       |
| [Deployment Reference](deployment-reference.md)                   | Detailed practices and examples for deeper exploration |

## Suggested Workflow

> In mature CI/CD pipelines, many of these steps are automated (e.g.,
> environment preparation, deployment execution, smoke tests). The workflow
> describes what needs to happen, not necessarily what a human does manually.

1. Confirm deployment strategy and define rollback plan
2. Review and approve deployment plan
3. Prepare environment, back up data
4. Notify stakeholders of deployment schedule
5. Execute deployment per chosen strategy
6. Run smoke tests and health checks
7. Validate success criteria instrumentation
8. Monitor stabilization period
9. Confirm deployment success
10. Run the [Deployment Checklist](deployment-checklist.md)
11. Complete deployment brief
12. Continue monitoring (24-48 hours)

## Stage Outputs

- Live production release
- Deployment brief with execution details
- Monitoring baselines captured
- Rollback procedure tested and documented

> Deployment confirms that success criteria instrumentation is **active in
> production** and captures initial baselines. This is where the measurement
> throughline transitions from "tested in staging" to "live in production." See
> [Framework Guide: Measurement Throughline](../framework-guide.md#measurement-throughline).

**Handoff:** Support stage receives deployed system, monitoring dashboards, and
support runbook.

**Gate 7:** Record the deployment decision using the
[Gate Decision Template](../gate-decision-template.md).

---

## Notes

**Framework Version:** 0.11.0

**Last Updated:** 2026-02-19

Added to framework in v0.7.0.
