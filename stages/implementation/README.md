---
id: implementation
stage_number: 5
execution_pattern: iterative
inputs:
  - component-designs
  - architecture-diagrams
  - requirements-with-acceptance-criteria
  - success-criteria-register
outputs:
  - artifact: working-code
    template: templates/implementation-brief.md
  - artifact: unit-tests
  - artifact: code-review-approvals
  - artifact: updated-documentation
  - artifact: implementation-brief
  - artifact: session-log
  - artifact: observability-instrumentation
gates:
  - type: ci-validation-human-approval
    name: "PR Review + CI"
feeds_into: [verification]
checklist: stages/implementation/checklist.md
reference: stages/implementation/reference.md
---

# AI-Assisted SDLC: Implementation Stage

## Overview

Practical guidance for translating detailed designs into working, tested code
with AI assistance at every step.

### Why Implementation

Code without review gets bugs. Tests without assertions get false confidence.
Instrumentation skipped during build is rarely retrofitted. Implementation is
where design meets reality — the patterns you follow here determine whether
Verification catches problems early or discovers them late.

### Purpose

- Build working code that implements increment requirements
- Create comprehensive unit tests with meaningful coverage
- Obtain peer review and approval
- Implement instrumentation for observability
- Document decisions for future maintainers

### Key Principle

Build working, tested code that meets design specifications. AI accelerates
every step; humans own every gate.

### Starting Point

A completed Increment Design Brief with detailed component designs, interface
contracts, and test strategy. Your development environment should be set up and
ready.

### How to Use This Guide

1. Read [**How AI Helps**](#how-ai-helps) to determine your AI autonomy tier
2. Read [**Right-Sizing Implementation**](#right-sizing-implementation) to match
   effort to project complexity
3. Start a session log from the
   [Implementation Session Log Template](../../templates/implementation-session-log.md)
4. For each PR: create feature branch, write code, write unit tests, implement
   instrumentation, submit PR for peer review, address feedback, get approval
   and merge (see [workflow detail](#implementation-workflow) below)
5. Update the session log at the end of each work session
6. After all PRs merge, complete the [Implementation Checklist](checklist.md)
   and finalize the
   [Implementation Brief](../../templates/implementation-brief.md)

7. Hand off to Verification stage

> **Brief vs. Session Log:** The
> [Implementation Brief](../../templates/implementation-brief.md) is the final
> record of what was built — scope, decisions, and outcomes. The
> [Session Log](../../templates/implementation-session-log.md) is the working
> journal — session-by-session progress, blockers, and handoff notes. Start the
> session log at the beginning of each increment; finalize the brief at the end.

**If the checklist results in NOT READY:** Resolve the blocking items and re-run
the checklist before proceeding.

**If code review is rejected:** Address all feedback and re-submit for review.

**If CI fails:** Fix all failures before handing off to Verification. Do not
proceed with a red pipeline.

For cross-cutting framework concepts, see
[Framework Guide](../../guides/framework.md).

### Implementation Workflow

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

---

## How AI Helps

### AI Autonomy Spectrum

Match AI's role to your team's autonomy comfort level. Gate requirements always
apply regardless of tier. See the
[AI Assistance Scorecard: AI Autonomy Spectrum](../../guides/ai-assistance.md#ai-autonomy-spectrum)
for full tier definitions.

| Human-Led                                  | Collaborative                                     | AI-Led                                                           |
| ------------------------------------------ | ------------------------------------------------- | ---------------------------------------------------------------- |
| Engineer writes; AI completes and suggests | AI generates from specs; engineer reviews each PR | AI implements full slices, identifies issues; engineer validates |

At the AI-Led tier, oversight intensity can be tuned from Active to Minimal —
see
[AI Assistance Scorecard: Oversight Intensity](../../guides/ai-assistance.md#oversight-intensity).
For detailed AI-Led patterns, see
[Stage Reference](reference.md#ai-led-patterns).

### AI Assistance Patterns

- **Code generation and scaffolding:** Describe a component or function — AI
  generates implementation code aligned with your design specs and conventions
- **Test writing:** AI drafts unit tests from acceptance criteria, covering
  happy path, edge cases, and error scenarios
- **Session continuity and handoff:** Share your session log at the start of
  each session — AI restores context and suggests priorities for the current
  session
- **Checklist review:** AI walks through the implementation checklist and flags
  gaps before handoff to Verification

> **Required gates:** CI validation + human approval — Implementation outputs
> are highly verifiable through tests and CI, enabling AI to iterate quickly
> within defined boundaries. Humans gate merge via PR review + CI results.

For assistance level details, see the
[AI Assistance Scorecard](../../guides/ai-assistance.md).

---

## Right-Sizing Implementation

Not every project needs formal pull request processes or comprehensive
instrumentation. Match your Implementation effort to your project's risk tier.

| Practice               | Minimal                                   | Standard                                        | Enterprise                                         |
| ---------------------- | ----------------------------------------- | ----------------------------------------------- | -------------------------------------------------- |
| **Code review**        | Self-review or informal peer check        | PR-based review with at least one reviewer      | Formal review with multiple reviewers, audit trail |
| **ADRs**               | Brief notes on key decisions              | ADRs for significant implementation choices     | Comprehensive ADRs with compliance traceability    |
| **Unit test coverage** | Tests for critical paths                  | Coverage targets (e.g., 80%), CI enforcement    | High coverage targets, mutation testing            |
| **Instrumentation**    | Basic logging                             | Structured logging, key metrics, error tracking | Full observability — traces, metrics, logs, alerts |
| **Security practices** | AI-automated dep scan + secrets detection | Dependency scanning, SAST, security review      | SAST/DAST scanning, security review gates          |
| **PR size/process**    | Commit directly or small PRs              | Small PRs with descriptive messages             | Small PRs with linked tickets, change management   |

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
> [Right-Sizing Guide](../../guides/right-sizing.md).

---

## Why These Implementation Elements Matter

### Code Quality

Follow SOLID, DRY, KISS, and YAGNI principles. Consult your team's standards or
ask your AI agent for guidance.

**Code review focus areas:** Correctness, security, performance,
maintainability, testability, error handling, standards compliance.

> For detailed code review focus areas and code quality check templates, see
> [Implementation Reference: Code Review](reference.md#code-review-focus-areas).

### Implementation Decision Records (ADRs)

For significant decisions, create ADRs using the framework's template
(`../../templates/adr.md`).

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
[Framework Guide: Measurement Throughline](../../guides/framework.md#measurement-throughline).

**What to implement:**

- Structured logging (errors, key events, security)
- Metrics for key operations (counters, histograms, timers)
- Success criteria measurement
- Alert configuration

> For logging best practices, metric types, code examples, and alert guidance,
> see [Implementation Reference: Logging](reference.md#logging-best-practices)
> and [Metrics](reference.md#metrics-and-telemetry).

### Multi-Session Work

When implementation spans multiple sessions or engineers, use the
[Implementation Session Log Template](../../templates/implementation-session-log.md)
to maintain continuity. Have the AI agent update it at the end of each work
session so the next session's agent can restore context. At the start of a
session, the AI agent reads the log to restore context and suggest priorities.

> For detailed continuity mechanisms, multi-engineer practices, and session
> handoff checklists, see
> [Implementation Reference: Multi-Session Work](reference.md#multi-session-and-multi-engineer-work).

### Additional Topics

The [Implementation Reference](reference.md) covers these topics in depth:

- **Security implementation** — input validation, SQL injection, XSS, secrets
  management
- **Technical debt management** — types, good/bad reasons, tracking and paydown
- **PR strategy and branching** — PR sizing, trunk-based vs. increment branch,
  unit testing enforcement
- **Code quality red flags** — code, testing, security, and performance warning
  signs
- **Unit testing details** — coverage targets, test organization, scenario
  categories

---

## Stage Outputs

- **Working Code** — production-ready code with unit tests passing
- **Unit Tests** — comprehensive test coverage meeting team threshold
- **Code Review Approvals** — peer review sign-off on all PRs
- **Updated Documentation** — project documentation reflecting implemented
  changes
- **Implementation Brief** — decisions, scope, and outcomes documented
- **Session Log** — progress across work sessions for continuity
- **Observability Instrumentation** — logging, metrics, and telemetry for
  success criteria measurement

> Implementation continues the **measurement throughline** by instrumenting
> success criteria for observability — embedding the metrics, logging, and
> telemetry that Verification and Support stages rely on. See
> [Framework Guide: Measurement Throughline](../../guides/framework.md#measurement-throughline).

> Implementation continues the **learning throughline** by noting surprises and
> deviations as they happen — capturing where reality diverges from the design
> so retrospectives have concrete data. See
> [Framework Guide: Learning Throughline](../../guides/framework.md#learning-throughline).

> Implementation continues the **security throughline** by applying secure
> coding practices with AI-automated scanning — dependency checks, SAST, and
> secrets detection run in CI with zero additional effort. See
> [Security Guide](../../guides/security.md).

**Handoff:** Verification stage receives working code, test results, session
log, and review approvals. Before handoff, ensure:

- Test environment is available and accessible to QA
- Test data is prepared or generation scripts are ready

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

### Rework Briefs (Delta-Only)

When rework is triggered by verification failure, use delta-only briefs:

- **Document only what changed** — don't duplicate the full implementation brief
  from the prior cycle
- **Reference the prior cycle** — e.g., "Rework addresses defects D-1 and D-3
  from verification-brief-i2-c1.md"
- **Scope narrowly** — rework briefs cover the fix, not a re-examination of the
  full increment

See
[Agentic Workflow Guide: Rework Cycles](../../guides/agentic-workflow.md#rework-cycles)
for the full convention.

---

## Notes

**Last Updated:** 2026-03-04

Added to framework in v0.5.0.
