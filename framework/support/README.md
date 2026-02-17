# AI-Assisted SDLC: Support Stage

**Stage:** 8 of 8 (Support) **Primary Audience:** DevOps Engineers, Support
Engineers, Engineers **Execution Pattern:** Continuous (ongoing)

For cross-cutting framework concepts, see
[Framework Guide](../framework-guide.md).

## Starting Point

**To begin, you need:**

- Deployed increment live in production
- Baseline measurements captured at deployment
- Production monitoring dashboards active
- Support runbook and on-call rotation ready

## Artifacts

| File                        | Description                                            |
| --------------------------- | ------------------------------------------------------ |
| `support-brief-template.md` | Template for support plan and operations               |
| `support-guide.md`          | Stage-specific guidance and rationale                  |
| `support-checklist.md`      | 60-90 second readiness checklist                       |
| `support-reference.md`      | Detailed practices and examples for deeper exploration |

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

---

## Notes

**Framework Version:** 0.11.0

**Last Updated:** 2026-02-16

Added to framework in v0.8.0.
