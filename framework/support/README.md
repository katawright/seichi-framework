# AI-Assisted SDLC: Support Stage

**Stage:** 8 of 8 (Support)

**Primary Audience:** DevOps Engineers, Support Engineers, Engineers

**Execution Pattern:** Continuous (ongoing)

For cross-cutting framework concepts, see
[Framework Guide](../framework-guide.md).

## Starting Point

**To begin, you need:**

- Deployed increment live in production
- Baseline measurements captured at deployment
- Production monitoring dashboards active

> **First time setting up support?** Start with the
> [Support Operations Guide](support-operations-guide.md) to choose your support
> level and establish one-time infrastructure (incident response, on-call,
> runbooks). Use the
> [Support Readiness Checklist](support-readiness-checklist.md) to verify
> readiness before accepting production ownership.

## How AI Helps

- **Operations setup:** AI helps draft incident response procedures, on-call
  rotation plans, and SLA definitions based on your project context
- **Incident response:** AI analyzes logs and metrics during incidents, suggests
  root causes, and drafts post-mortem reports
- **Runbook generation:** Describe your infrastructure and AI generates
  operational runbooks tailored to your stack
- **Success criteria reporting:** AI drafts progress reports from your metrics
  data, highlighting trends and recommending actions

For assistance level details, see the
[AI Assistance Scorecard](../framework-ai-assistance.md).

## Artifacts

| File                                                          | Description                                            |
| ------------------------------------------------------------- | ------------------------------------------------------ |
| [Support Operations Guide](support-operations-guide.md)       | Strategic guide for establishing support operations    |
| [Support Readiness Checklist](support-readiness-checklist.md) | One-time readiness verification by support level       |
| [Support Brief Template](support-brief-template.md)           | Template for support plan and operations               |
| [Support Guide](support-guide.md)                             | Stage-specific guidance and rationale                  |
| [Support Checklist](support-checklist.md)                     | Ongoing operational readiness checklist                |
| [Support Reference](support-reference.md)                     | Detailed practices and examples for deeper exploration |

## Suggested Workflow

### Continuous Operations

1. Monitor production health dashboards
2. Respond to alerts and incidents per severity
3. Triage and resolve bugs (hotfix or backlog)
4. Track success criteria metrics
5. Process enhancement requests

### Periodic Activities

6. **Weekly:** Review alerts, tune thresholds, team retrospective
7. **Monthly:** Success criteria report to stakeholders, dependency updates
8. **Quarterly:** Business review, strategic planning, process improvement

### Feedback Loop

Enhancements and new features identified in Support feed back to Initiation to
start new increments through the SDLC.

## Stage Outputs

- Production health reports
- Success criteria progress reports
- Incident post-mortems
- Bug fixes and enhancement releases
- Enhancement requests for new increments

> Support closes the **measurement throughline** — success criteria defined in
> Initiation are tracked against real production data here. See
> [Framework Guide: Measurement Throughline](../framework-guide.md#measurement-throughline).

### Readiness Decision

Support does not have a numbered gate, but the team should make a deliberate
decision to accept production ownership. Use the
[Gate Decision Template](../gate-decision-template.md) to record when the team
confirms readiness to own the system in production.

---

## Notes

**Framework Version:** 0.13.0

**Last Updated:** 2026-02-19

Added to framework in v0.8.0.
