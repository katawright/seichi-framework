# AI-Assisted SDLC: Implementation Stage

**Stage:** 5 of 8 (Implementation) **Primary Audience:** Engineers **Execution
Pattern:** Iterative (per increment)

For cross-cutting framework concepts, see
[Framework Guide](../framework-guide.md).

## Starting Point

**To begin, you need:**

- Detailed design complete for current increment
- Requirements and acceptance criteria clear
- Development environment set up
- Architecture and API specs available

## Artifacts

| File                               | Description                                            |
| ---------------------------------- | ------------------------------------------------------ |
| `implementation-brief-template.md` | Template for documenting implementation work           |
| `implementation-guide.md`          | Stage-specific guidance and rationale                  |
| `implementation-checklist.md`      | 60-90 second readiness checklist                       |
| `implementation-reference.md`      | Detailed practices and examples for deeper exploration |
| `adr/`                             | Directory for implementation decision records          |

## Suggested Workflow

For increments with multiple PRs, steps 3-7 repeat for each PR.

1. Review design brief for current increment
2. Verify development environment ready
3. Create feature branch, write code for PR scope
4. Write unit tests, implement instrumentation
5. Submit PR for peer review
6. Address review feedback, get approval and merge
7. Repeat steps 3-6 if more PRs needed
8. Run `implementation-checklist.md`
9. Finalize implementation brief
10. Handoff to Verification stage

## Stage Outputs

- Working code with unit tests passing
- Code review approval
- Implementation brief with decisions documented
- Instrumentation for observability

**Handoff:** Verification stage receives working code, test results, and review
approvals.

---

## Notes

**Framework Version:** 0.11.0

**Last Updated:** 2026-02-16

Added to framework in v0.5.0.
