# AI-Assisted SDLC: Verification Stage

**Framework Version:** 0.10.0 **Last Updated:** 2026-02-15

**Stage:** 5 of 7 (Verification) **Primary Audience:** QA Engineers, Engineers
**Execution Pattern:** Iterative (per increment)

For cross-cutting framework concepts, see
[framework-guide.md](../framework-guide.md).

## Starting Point

**To begin, you need:**

- Working code from Implementation stage
- Unit tests passing with adequate coverage
- Code review approvals
- Requirements with acceptance criteria
- Implementation brief with notes

## Artifacts

| File                             | Description                            |
| -------------------------------- | -------------------------------------- |
| `verification-brief-template.md` | Template for test planning and results |
| `verification-guide.md`          | Stage-specific guidance and rationale  |
| `verification-checklist.md`      | 60-90 second readiness checklist       |

## Suggested Workflow

1. Review requirements and acceptance criteria
2. Define test strategy and coverage approach
3. Prepare test environment and data
4. Execute integration tests
5. Execute functional tests against acceptance criteria
6. Execute performance tests against NFRs
7. Execute security tests
8. Track and resolve defects
9. Conduct UAT with business stakeholders
10. Validate instrumentation and monitoring
11. Assess production readiness (go/no-go)
12. Run `verification-checklist.md`
13. Complete verification brief

## Stage Outputs

- Comprehensive test results (all test types)
- UAT approval from business stakeholders
- Production readiness assessment
- Deployment checklist
- Defect resolution documentation

**Handoff:** Deployment stage receives verified code, test results, and UAT
approval.

---

## Notes

Added to framework in v0.6.0.
