# Implementation Guide

> Stage-specific guidance for Implementation. For cross-cutting framework
> concepts, see [Framework Guide](../framework-guide.md).

---

## Quick Reference

**Purpose:** Build working, tested code per increment that meets design
specifications and quality standards.

**Primary roles:** Engineers

**Execution pattern:** Iterative (per increment)

**Key inputs:** Detailed design specs, API specs, data models, test strategy,
requirements with ACs

**Key outputs:** Working code with tests, code review approval, implementation
brief, instrumentation

**What good looks like:**

- All requirements for increment implemented
- Unit tests pass with adequate coverage
- Code review approved by peers
- Instrumentation for success criteria implemented
- No critical defects
- Ready for Verification stage

**Common pitfalls:**

- Skipping code review ("it's a small change")
- Test padding (coverage without meaningful assertions)
- No instrumentation for success criteria
- Ignoring technical debt without documenting it
- Large PRs that get rubber-stamped
- Merging without tests passing

**Checkpoint:** Quality Checkpoint — code review + tests + standards must pass
before handoff. See
[Framework Guide: Checkpoints](../framework-guide.md#checkpoint-taxonomy) for
type definitions.

**AI Assistance:** Collaborative by default — AI generates drafts, human reviews
all output. See
[Framework Guide: AI Assistance](../framework-guide.md#ai-assistance-overview)
for level definitions.

---

## What Is Implementation?

The Implementation stage translates detailed designs into working, tested code.
Engineers build software following professional standards, with AI assistance
accelerating each step.

**Goals:**

- Build working code that implements requirements
- Create comprehensive unit tests
- Obtain peer review and approval
- Implement instrumentation for observability
- Document decisions for future maintainers

---

## AI Assistance

> **Required gates:** CI validation + human approval — Implementation outputs
> are highly verifiable through tests and CI, enabling AI to iterate quickly
> within defined boundaries. Humans gate merge via PR review + CI results.

### AI Autonomy Spectrum

Match AI's role to your team's autonomy comfort level. Gate requirements always
apply regardless of tier. See the
[AI Assistance Scorecard: AI Autonomy Spectrum](../framework-ai-assistance.md#ai-autonomy-spectrum)
for full tier definitions.

**At a glance:**

| Human-Led                                  | Collaborative                                     | AI-Led                                                           |
| ------------------------------------------ | ------------------------------------------------- | ---------------------------------------------------------------- |
| Engineer writes; AI completes and suggests | AI generates from specs; engineer reviews each PR | AI implements full slices, identifies issues; engineer validates |

**By activity:**

| Activity          | Human-Led                                  | Collaborative                                | AI-Led                                                                                     |
| ----------------- | ------------------------------------------ | -------------------------------------------- | ------------------------------------------------------------------------------------------ |
| **Code writing**  | Engineer writes; AI completes and suggests | AI generates from specs; engineer reviews    | AI implements full slices, identifies integration issues; engineer validates               |
| **Unit tests**    | Engineer writes; AI suggests cases         | AI drafts tests from ACs; engineer validates | AI writes and iterates until passing                                                       |
| **Code review**   | Full line-by-line review of AI output      | Human reviews diffs + AI summary             | Human reviews intent + CI results                                                          |
| **PR process**    | Engineer creates PR with AI assistance     | AI drafts PR; engineer reviews and submits   | AI creates PR; engineer reviews and merges                                                 |
| **Refactoring**   | Engineer directs each change; AI suggests  | AI proposes refactors; engineer approves     | AI identifies refactoring opportunities and executes within boundaries; engineer validates |
| **Documentation** | Engineer writes; AI suggests improvements  | AI drafts docs from code; engineer reviews   | AI identifies documentation gaps and maintains docs; engineer spot-checks                  |

---

## Right-Sizing Implementation

Not every project needs formal pull request processes or comprehensive
instrumentation. Match your Implementation effort to your project's risk tier.

| Practice               | Minimal                            | Standard                                        | Enterprise                                         |
| ---------------------- | ---------------------------------- | ----------------------------------------------- | -------------------------------------------------- |
| **Code review**        | Self-review or informal peer check | PR-based review with at least one reviewer      | Formal review with multiple reviewers, audit trail |
| **ADRs**               | Brief notes on key decisions       | ADRs for significant implementation choices     | Comprehensive ADRs with compliance traceability    |
| **Unit test coverage** | Tests for critical paths           | Coverage targets (e.g., 80%), CI enforcement    | High coverage targets, mutation testing            |
| **Instrumentation**    | Basic logging                      | Structured logging, key metrics, error tracking | Full observability — traces, metrics, logs, alerts |
| **Security practices** | Avoid known vulnerabilities        | Dependency scanning, basic security review      | SAST/DAST scanning, security review gates          |
| **PR size/process**    | Commit directly or small PRs       | Small PRs with descriptive messages             | Small PRs with linked tickets, change management   |

Expand Implementation only when needed:

- **Regulated / compliance-heavy:** Add formal code review audit trail,
  compliance traceability
- **Security-sensitive code:** Add SAST/DAST scanning, dedicated security review
  gates
- **High-traffic / performance-critical:** Add performance benchmarks,
  structured observability, load testing in CI
- **Multi-team or shared codebase:** Add PR review policies, branch protection,
  change management
- **Complex business logic:** Add comprehensive unit tests with mutation
  testing, detailed ADRs

Otherwise, keep Implementation lightweight and move to Verification.

> These triggers help you decide when to move from Minimal to Standard or
> Enterprise. For full tier definitions and choosing criteria, see the
> [Right-Sizing Guide](../right-sizing-guide.md).

---

## Implementation Workflow

AI assists at every step; humans maintain ownership through review and approval
gates. For increments with multiple PRs, steps 3-11 repeat for each PR.

```
-- ONCE PER INCREMENT --

 1. Review design brief for current increment
 2. Set up / verify development environment

-- FOR EACH PR --

 3. Create feature branch
 4. Write code for this PR's scope
    Human review: correctness and security [GATE]
 5. Implement instrumentation (logging, metrics)
    Human review: measurement completeness [GATE]
 6. Document code
 7. Run tests locally, verify passing
 8. Update implementation brief (progress log)
 9. Submit PR for peer review [GATE]
 10. Address review feedback
 11. Get approval and merge [GATE]
     More PRs needed? Return to step 3.

-- ONCE PER INCREMENT (after all PRs merged) --

 12. Run implementation checklist
     Human sign-off [GATE]
 13. Finalize implementation brief
 14. Prepare handoff to Verification [FINAL GATE]

 15. Proceed to Verification stage
```

**Key principles:**

- AI assists at every step to accelerate work
- Humans maintain ownership through gates
- Steps 3-11 loop for each PR
- All PRs must merge before Verification handoff

---

## Implementation Guidance

### Code Quality

Follow SOLID, DRY, KISS, and YAGNI principles. Consult your team's standards or
ask your AI agent for guidance.

**Code review focus areas:** Correctness, security, performance,
maintainability, testability, error handling, standards compliance.

> For detailed code review focus areas and code quality check templates, see
> [Implementation Reference: Code Review](implementation-reference.md#code-review-focus-areas).

### Implementation Decision Records (ADRs)

For significant decisions, create ADRs using the framework's template
(`../adr-template.md`).

**"Reasonable engineer test":** If someone might later ask "why this approach
instead of alternatives?", create an ADR.

**Create ADR for:** Multiple viable approaches, non-obvious trade-offs,
decisions with implications.

**Document inline when:** Single obvious approach, team standard practice,
easily reversible.

Store in `implementation/adr/` with sequential numbering.

### Instrumentation and Observability

Implement the measurement infrastructure designed in the System Design stage.
Success criteria from Initiation must be measurable in production — see
[Framework Guide: Measurement Throughline](../framework-guide.md#measurement-throughline).

**What to implement:**

- Structured logging (errors, key events, security)
- Metrics for key operations (counters, histograms, timers)
- Success criteria measurement
- Alert configuration

> For logging best practices, metric types, code examples, and alert guidance,
> see
> [Implementation Reference: Logging](implementation-reference.md#logging-best-practices)
> and [Metrics](implementation-reference.md#metrics-and-telemetry).

### Additional Topics

The [Implementation Reference](implementation-reference.md) covers these topics
in depth:

- **Security implementation** — input validation, SQL injection, XSS, secrets
  management
- **Technical debt management** — types, good/bad reasons, tracking and paydown
- **Multi-session work** — continuity mechanisms, session handoff checklists
- **PR strategy and branching** — PR sizing, trunk-based vs. increment branch,
  unit testing enforcement
- **Code quality red flags** — code, testing, security, and performance warning
  signs
- **Unit testing details** — coverage targets, test organization, scenario
  categories

---

## When to Revisit Implementation

**Triggers:**

- Verification tests fail (bugs, performance)
- Code review identifies significant issues
- Requirements clarified during implementation
- Design changed or better approach identified
- Technical debt identified needing attention

**Revision process:**

1. Identify what needs to change and why
2. Assess rework scope
3. Update code and tests
4. Re-review if significant changes
5. Update documentation and brief
6. Communicate if schedule impacted

---

## Related Documents

- [Implementation Brief Template](implementation-brief-template.md)
- [Implementation Checklist](implementation-checklist.md)
- [Implementation Reference](implementation-reference.md)
- [ADR Template](../adr-template.md)
- [AI-Assisted SDLC Stages](../framework-stages.md)

---

## Notes

**Last Updated:** 2026-02-21

Added to framework in v0.5.0.
