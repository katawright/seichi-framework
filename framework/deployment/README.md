# AI-Assisted SDLC: Deployment Stage

**Framework Version:** 0.8.0 **Last Updated:** 2026-02-14

**Stage:** 6 of 7 (Deployment) **Primary Audience:** DevOps Engineers, Engineers
**Execution Pattern:** Iterative (per increment)

For cross-cutting framework concepts, see
[framework-guide.md](../framework-guide.md).

## Starting Point

**To begin, you need:**

- Verified increment (all tests passing)
- UAT sign-off from business stakeholders
- Production readiness checklist passed
- Test results and known issues documented

## Artifacts

| File                            | Description                              |
| ------------------------------- | ---------------------------------------- |
| `deployment-brief-template.md`  | Template for deployment plan and results |
| `deployment-guide.md`           | Stage-specific guidance and rationale    |
| `deployment-checklist.md`       | 60-90 second readiness checklist         |
| `deployment-ai-agent-prompt.md` | AI prompt for deployment planning        |

## Suggested Workflow

1. Select deployment strategy and define rollback plan
2. Review and approve deployment plan
3. Prepare environment, back up data
4. Notify stakeholders of deployment schedule
5. Execute deployment per chosen strategy
6. Run smoke tests and health checks
7. Validate success criteria instrumentation
8. Monitor stabilization period
9. Confirm deployment success
10. Run `deployment-checklist.md`
11. Complete deployment brief
12. Continue monitoring (24-48 hours)

## Stage Outputs

- Live production release
- Deployment brief with execution details
- Monitoring baselines captured
- Rollback procedure tested and documented

**Handoff:** Support stage receives deployed system, monitoring dashboards, and
support runbook.

---

## Notes

Added to framework in v0.7.0.
