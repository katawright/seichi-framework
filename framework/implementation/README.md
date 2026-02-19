# AI-Assisted SDLC: Implementation Stage

**Stage:** 5 of 8 (Implementation)

**Primary Audience:** Engineers

**Execution Pattern:** Iterative (per increment)

For cross-cutting framework concepts, see
[Framework Guide](../framework-guide.md).

## Starting Point

**To begin, you need:**

- Detailed design complete for current increment
- Requirements and acceptance criteria clear
- Development environment set up
- Design specs and interface contracts available

## How AI Helps

- **Code generation and scaffolding:** Describe a component or function — AI
  generates implementation code aligned with your design specs and conventions
- **Test writing:** AI drafts unit tests from acceptance criteria, covering
  happy path, edge cases, and error scenarios
- **Session continuity and handoff:** Share your session log at the start of
  each session — AI restores context and suggests priorities for the current
  session
- **Checklist review:** AI walks through the implementation checklist and flags
  gaps before handoff to Verification

For assistance level details, see the
[AI Assistance Scorecard](../framework-ai-assistance.md).

## Artifacts

| File                                     | Description                                            |
| ---------------------------------------- | ------------------------------------------------------ |
| `implementation-brief-template.md`       | Template for documenting implementation work           |
| `implementation-session-log-template.md` | Template for tracking progress across work sessions    |
| `implementation-guide.md`                | Stage-specific guidance and rationale                  |
| `implementation-checklist.md`            | 60-90 second readiness checklist                       |
| `implementation-reference.md`            | Detailed practices and examples for deeper exploration |
| `adr/`                                   | Directory for implementation decision records          |

## Suggested Workflow

For increments with multiple PRs, steps 4-8 repeat for each PR. For
multi-session work, have the AI agent update the session log at the end of each
session so the next session's AI agent can restore context from it.

1. Review design brief for current increment
2. Verify development environment ready
3. Start session log from `implementation-session-log-template.md`
4. Create feature branch, write code for PR scope
5. Write unit tests, implement instrumentation
6. Submit PR for peer review
7. Address review feedback, get approval and merge
8. Update session log after each work session
9. Repeat steps 4-8 if more PRs needed
10. Run `implementation-checklist.md`
11. Finalize implementation brief
12. Handoff to Verification stage

## Stage Outputs

- Working code with unit tests passing
- Code review approval
- Implementation brief with decisions documented
- Session log with progress across work sessions
- Instrumentation for observability

> Implementation continues the **measurement throughline** by instrumenting
> success criteria for observability — embedding the metrics, logging, and
> telemetry that Verification and Support stages rely on. See
> [Framework Guide: Measurement Throughline](../framework-guide.md#measurement-throughline).

**Handoff:** Verification stage receives working code, test results, session
log, and review approvals.

---

## Notes

**Framework Version:** 0.11.0

**Last Updated:** 2026-02-18

Added to framework in v0.5.0.
