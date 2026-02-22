# AI-Assisted SDLC: Verification Stage

**Stage:** 6 of 8 (Verification)

**Primary Audience:** QA Engineers, Engineers

**Execution Pattern:** Iterative (per increment)

For cross-cutting framework concepts, see
[Framework Guide](../framework-guide.md).

## Starting Point

**To begin, you need:**

- Working code from Implementation stage
- Unit tests passing with coverage meeting team threshold (default: 80% line
  coverage — see implementation brief for project-specific target)
- Code review approvals
- Requirements with acceptance criteria
- Implementation brief with notes

## How AI Helps

- **Test case generation:** Describe your acceptance criteria — AI generates
  comprehensive test cases covering happy paths, edge cases, and error scenarios
- **Coverage gap analysis:** AI reviews your test plan against requirements and
  flags untested acceptance criteria or missing test types
- **Test data creation:** AI generates realistic test data and fixtures from
  your data model, including edge-case values and boundary conditions
- **Checklist review:** AI walks through the verification checklist and flags
  gaps before the go/no-go decision

For assistance level details, see the
[AI Assistance Scorecard](../framework-ai-assistance.md).

## Artifacts

| File                             | Description                                            |
| -------------------------------- | ------------------------------------------------------ |
| `verification-brief-template.md` | Template for test planning and results                 |
| `verification-guide.md`          | Stage-specific guidance and rationale                  |
| `verification-checklist.md`      | 60-90 second readiness checklist                       |
| `verification-reference.md`      | Detailed practices and examples for deeper exploration |

## Suggested Workflow

1. Review requirements and acceptance criteria
2. Review test strategy from Increment Design brief
3. Refine test strategy and coverage approach for this cycle
4. Prepare test environment and data
5. Execute integration tests
6. Execute functional tests against acceptance criteria
7. Execute performance tests against NFRs
8. Execute security tests
9. Track and resolve defects
10. Conduct UAT with business stakeholders
11. Validate instrumentation and monitoring
12. Assess production readiness (go/no-go) using the
    [Gate Decision Template](../gate-decision-template.md)
13. Run `verification-checklist.md`
14. Complete verification brief

If verification fails (step 12 results in no-go), work returns to Implementation
for defect fixes. When fixes are complete, start a new verification cycle with a
**fresh brief** — do not overwrite the previous cycle's brief, so each cycle's
results are preserved as a clean historical record.

## Stage Outputs

- Comprehensive test results (all test types)
- UAT approval from business stakeholders
- Production readiness assessment
- Deployment checklist
- Defect resolution documentation

> Verification continues the **measurement throughline** by validating that the
> instrumentation embedded during Implementation actually works — confirming
> that metrics, dashboards, and alerts will function correctly in production.
> See
> [Framework Guide: Measurement Throughline](../framework-guide.md#measurement-throughline).

**Handoff:** On **go** or **conditional go**, Deployment stage receives verified
code, test results, and UAT approval. On **no-go**, work returns to
Implementation for defect fixes, then a new verification cycle begins with a
fresh brief.

---

## Notes

**Framework Version:** 0.18.1

**Last Updated:** 2026-02-21

Added to framework in v0.6.0.
