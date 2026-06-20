# Implementation Reference

## Overview

Optional deep-dive companion to the [Implementation Stage Guide](README.md),
[Implementation Brief Template](../../templates/implementation-brief.md), and
[Implementation Checklist](checklist.md). Consult when you need specifics or a
starting point for AI-assisted exploration.

### Why Implementation Practices

Implementation is where design decisions meet production code. Common failure
modes — inconsistent logging, missing metrics, unmanaged technical debt, and
weak code review — are preventable but hard to catch without concrete guidance.
This reference supplements the stage guide with detailed patterns and
checklists.

### Goals of This Reference

- Provide detailed logging, metrics, and instrumentation guidance
- Cover security implementation patterns and review checklists
- Document technical debt management, PR strategy, and branching conventions
- Supply code quality red flags, unit testing details, and code review focus
  areas

### Key Principle

Production-readiness is built in during implementation, not bolted on before
deployment. Every code change should be observable, reviewable, and reversible.

### How to Use This Reference

1. Start with the [**Implementation Stage Guide**](README.md) for workflow and
   rationale
2. Use this reference when you need specifics — detailed examples, checklists,
   or implementation patterns
3. Follow **AI exploration** prompts in each section to get AI-assisted help
   with that topic

---

## Logging Best Practices

### Log Levels

- **ERROR** — failures requiring attention
- **WARN** — unexpected but handled conditions
- **INFO** — important business events
- **DEBUG** — diagnostic information

Use structured (JSON) logging for machine readability.

### What to Log

**Always log:** Errors with context, security events, important state changes,
external service calls.

**Never log:** Passwords, PII, API keys, secrets.

### Log Event Examples

| Event       | Format                               | Purpose     |
| ----------- | ------------------------------------ | ----------- |
| User action | `User {id} performed {action}`       | Audit trail |
| Error       | `Failed to {operation}: {error}`     | Debugging   |
| Performance | `Operation {name} took {duration}ms` | Monitoring  |

<!-- prettier-ignore -->
> **AI exploration:** _"Design a logging strategy for
> [describe your application and key operations]."_

---

## Metrics and Telemetry

### Metric Types

- **Counters** — count events (requests, errors)
- **Gauges** — current value (connections, queue depth)
- **Histograms** — distributions (response time)
- **Timers** — durations (API response, query time)

### Success Criteria Instrumentation

```
# Success criterion: Reduce tickets by 30%
metrics.increment('support_ticket.created',
    tags={'category': ticket.category})

# Success criterion: API response < 200ms p95
with metrics.timer('api.request.duration',
    tags={'endpoint': name}):
    result = process_request()
```

### Monitoring and Alerts

Configure alerts for: error rate thresholds, performance degradation, resource
exhaustion, external service failures, and security events.

<!-- prettier-ignore -->
> **AI exploration:** _"Generate instrumentation code for
> [describe your success criteria and tech stack]."_

---

## Security Implementation

Follow security best practices when writing code. Consult OWASP guidance and
your team's security standards.

**Key areas:**

- **Input validation** — validate and sanitize all inputs server-side
- **SQL injection** — use parameterized queries
- **XSS prevention** — escape output in templates
- **Authorization** — check permissions before actions
- **Secrets management** — never hardcode; use environment variables or secret
  managers

### Security Review Checklist

- [ ] Input validation implemented
- [ ] Authentication/authorization checked
- [ ] No SQL injection vulnerabilities
- [ ] No XSS vulnerabilities
- [ ] No sensitive data in logs
- [ ] Secrets stored securely (not hardcoded)
- [ ] HTTPS/TLS enforced where needed
- [ ] Dependencies scanned for vulnerabilities

<!-- prettier-ignore -->
> **AI exploration:** _"Review this code for security
> vulnerabilities: [paste code or describe patterns]."_

---

## Technical Debt Management

**Technical debt** is the implied cost of choosing a quick solution now over a
better approach.

### Types

- **Deliberate** — conscious trade-off
- **Accidental** — didn't know better
- **Environmental** — dependencies evolve
- **Bit rot** — code degrades over time

### Good vs. Bad Reasons

**Good:** Time-to-market, uncertainty, learning, risk mitigation.

**Bad:** Laziness, ignoring standards, skipping tests or review.

### Managing Debt

1. **Document it** — TODO/FIXME comments with context
2. **Track it** — backlog items with "Tech Debt" label
3. **Prioritize** — high-impact debt blocks features
4. **Plan paydown** — schedule in future increments
5. **Communicate** — stakeholders understand trade-offs

### Technical Debt Tracking Template

| Debt Item | Reason         | Impact | Paydown Plan      |
| --------- | -------------- | ------ | ----------------- |
| [Item]    | [Why incurred] | [Cost] | [When/how to fix] |

<!-- prettier-ignore -->
> **AI exploration:** _"Assess technical debt in [describe your
> codebase area] and suggest a paydown plan."_

---

## Team Onboarding

When new engineers join a project mid-increment or mid-project:

1. **Read the project foundation** — `AGENTS.md` (or equivalent project
   context), recent ADRs, and the current increment design brief
2. **Read the session log** — the
   [Implementation Session Log](../../templates/implementation-session-log.md)
   captures what's been built, what's in progress, and current blockers
3. **Start with a small, well-defined task** — pick a task with clear acceptance
   criteria and existing patterns to follow in the codebase
4. **Pair on the first PR** — have an existing team member review the first
   contribution synchronously to transfer conventions and context
5. **Update the session log** — new engineers should update the log from their
   first session to build the habit and contribute to team continuity

> **For AI agents onboarding to an existing codebase:** Read `AGENTS.md` first,
> then the session log, then the increment design brief. Parse front matter for
> structured context before reading prose.

---

## Multi-Session and Multi-Engineer Work

### Continuity Mechanisms

When implementation spans multiple sessions or engineers:

1. **Implementation brief progress log** — primary handoff document between
   sessions
2. **Draft PRs** — work-in-progress visible to team
3. **TODO/FIXME comments** — mark incomplete work in code
4. **Task tracking** — update tickets with status
5. **Frequent commits** — save progress incrementally
6. **Session notes** — brief updates for the team

### Multi-Engineer Best Practices

- **Divide by component** — minimize overlapping files
- **Agree on interfaces** — define contracts upfront
- **Communicate frequently** — async for updates, sync for decisions and
  blockers

### Session Handoff Checklist

**Before ending:** Commit/push, update progress log, update draft PR, mark
TODOs, post session summary.

**Before starting:** Pull latest, read progress log, check PR status, review
team updates.

### Progress Log Template

Use the standalone
[Implementation Session Log Template](../../templates/implementation-session-log.md)
to track session-by-session progress. Start one from the template at the
beginning of each increment. Have the agent update it at the end of every work
session so the next session's agent can restore context from it.

<!-- prettier-ignore -->
> **AI exploration:** _"Help me write a session handoff summary
> for [describe what you worked on today]."_

---

## Slicing: Decomposing Increments into PRs

Slicing breaks an increment's scope into PR-sized implementation units — each
independently reviewable, testable, and mergeable. Good slices keep PRs small
(see [PR Size](#pr-size) below) while ensuring each slice delivers a coherent
change.

### Cross-Cutting Slices

A cross-cutting slice spans multiple components or layers to establish shared
infrastructure or conventions that subsequent slices depend on.

**When to use:** Foundation increments (I0), shared dependencies, cross-cutting
concerns (auth, logging, error handling), database schema setup.

**Example:** "Set up project structure, CI pipeline, and database schema" —
touches multiple layers but is a prerequisite for all feature work.

### Vertical Slices

A vertical slice delivers a thin, end-to-end path through all layers — from UI
(if applicable) through business logic to data storage — for a single
user-facing behavior.

**When to use:** Feature increments (I1+), user stories,
acceptance-criteria-driven work.

**Example:** "User can create a new project" — includes the API endpoint,
validation logic, database write, and confirmation response.

### Choosing a Slicing Strategy

| Factor            | Cross-Cutting                      | Vertical                            |
| ----------------- | ---------------------------------- | ----------------------------------- |
| Best for          | Foundation, shared infra, I0       | Feature delivery, I1+               |
| PR scope          | Multiple components, one concern   | All layers, one behavior            |
| Dependency risk   | Later slices depend on this        | Independent of other feature slices |
| Testability       | Infrastructure tests, smoke tests  | End-to-end acceptance tests         |
| Review complexity | Higher — reviewers need broad view | Lower — reviewers follow one flow   |

Most increments use a mix: one or two cross-cutting slices for setup, followed
by vertical slices for features.

### Decomposition Steps

1. List the increment's requirements and acceptance criteria
2. Identify shared dependencies and cross-cutting concerns → cross-cutting
   slices
3. Group remaining requirements by user-facing behavior → vertical slices
4. Order slices by dependency (cross-cutting first, then vertical by priority)
5. Validate each slice is independently reviewable and testable
6. Record the slice plan in the implementation brief

<!-- prettier-ignore -->
> **AI exploration:** _"Help me decompose [describe your
> increment scope] into PR-sized slices, identifying which
> are cross-cutting and which are vertical."_

---

## PR Strategy and Branching

### PR Size

Keep PRs reviewable — industry guidance suggests 200-400 lines for optimal
review quality. Larger PRs get rubber-stamped; smaller PRs catch more bugs.

PR size targets are a team convention — document in `AGENTS.md`.

### Single vs. Multiple PRs

- **Single PR:** Small increments (<500 lines), simple cohesive changes
- **Multiple PRs:** Larger increments, break by architectural layer, component,
  or dependency order

The increment remains the unit of work for Verification — all PRs must merge
first.

### Branching Strategies

**Trunk-Based (Recommended):** Short-lived branches merge to `main`, feature
flags hide incomplete work. Best for frequent deployment, strong CI/CD.

**Increment Branch:** Long-running branch per increment, merges to `main` after
Verification. Best for infrequent deployment, no feature flags.

Document your branching strategy in `AGENTS.md`.

### Unit Testing Requirements

**Non-negotiable:** Tests must pass before any code integration.

**Enforcement hierarchy:**

1. Pre-commit hooks (ideal — catches before commit)
2. CI/CD enforcement (required — blocks merge)
3. Manual runs (minimum — honor system)

Broken tests block the team and fix cost increases exponentially over time.

<!-- prettier-ignore -->
> **AI exploration:** _"Recommend a PR and branching strategy
> for [describe your team size, deployment cadence, and
> CI/CD maturity]."_

---

## Code Quality Red Flags

### Code Quality

- Methods/functions longer than 50-100 lines
- Classes with more than 10 public methods
- Deeply nested conditionals (>3 levels)
- Copy-pasted code blocks
- Commented-out code (should be removed)

### Testing

- Coverage looks good but tests don't assert anything meaningful
- Tests pass in isolation but fail together (test interdependence)
- Tests take a long time to run (should be fast)
- Tests are flaky (sometimes pass, sometimes fail)

### Security

- SQL queries built with string concatenation
- User input rendered directly in HTML without escaping
- Authentication bypassed or incomplete
- Secrets visible in code or logs

### Performance

- Loops inside loops (O(n^2) complexity)
- Database queries inside loops (N+1 problem)
- Loading entire large datasets into memory
- No pagination for large result sets

<!-- prettier-ignore -->
> **AI exploration:** _"Review this code for red flags:
> [paste code or describe the module]."_

---

## Unit Testing Details

### Test Coverage Targets

| Metric           | Target | Notes             |
| ---------------- | ------ | ----------------- |
| Overall coverage | 80%+   | Team-configurable |
| Branch coverage  | 75%+   | Team-configurable |
| Critical path    | 100%   | Non-negotiable    |

### Test Organization

- Unit test structure (per file, per class, per feature)
- Test file naming convention
- Test data/fixtures approach
- Mock strategy for external dependencies

### Key Test Scenario Categories

1. **Happy path** — expected inputs and flows
2. **Edge cases** — boundary conditions, empty inputs
3. **Error handling** — invalid inputs, failures
4. **Integration points** — mocked external services

### Test Quality Checklist

- [ ] Tests are meaningful (not padding for coverage)
- [ ] Test naming is clear and descriptive
- [ ] Tests are fast (no external dependencies)
- [ ] Tests are independent (no execution order)
- [ ] Tests cover happy path, edge cases, and errors

<!-- prettier-ignore -->
> **AI exploration:** _"Generate unit tests for [describe your
> function/module and acceptance criteria]."_

---

## Code Review Focus Areas

1. **Correctness** — implements requirements?
2. **Security** — injection, auth bypass, XSS?
3. **Performance** — obvious inefficiencies?
4. **Maintainability** — readable, well-structured?
5. **Testability** — can it be easily tested?
6. **Error handling** — edge cases and failures?
7. **Standards compliance** — team conventions?

<!-- prettier-ignore -->
> **AI exploration:** _"Review this PR for code quality
> issues: [paste code or describe changes]."_

---

## Agent-Led Patterns

### What Agents Drive

- Full slice implementation: feature code, tests, and instrumentation together
- Code generation and refactoring within the defined module boundary
- Database migrations and infrastructure-as-code
- PR-sized slices following the increment design specifications
- Proactive identification of issues and inconsistencies with the design or
  adjacent code

### What Humans Validate

- PR review — checking intent, correctness, and security, not just that tests
  pass
- CI results: tests, linting, and security scans
- No auth changes, schema changes, or cross-service boundary changes proceed
  without explicit human approval
- Feature flag compliance — incomplete work is behind flags before merge

**Oversight at this stage.** How closely a human watches the work is no longer a
separate dial — it folds into **Required Assurance** (how independently the work
is evaluated) and **Authority** (who decides), set in the operating model. See
the [Operating Model Guide](../../guides/operating-model.md).

### Common Failure Modes

- **Over-engineering** — implementing beyond what the increment design
  specifies, adding abstractions or features not asked for
- **Design drift** — deviating from increment design specifications without
  flagging the deviation
- **Incomplete error handling** — happy path works but edge cases and failures
  are unhandled
- **Security vulnerabilities** — injection, XSS, or auth bypass introduced
  during generation
- **Oversized PRs** — bundling too much work into a single PR, making review
  impractical

### Session Handoff Notes

Capture the following at the end of each session:

- PRs submitted and their current review status
- PRs in progress and the current implementation state
- Test suite status (passing or failing, and what's failing)
- Remaining implementation tasks from the increment design
- Any environment or dependency issues encountered that the next session needs
  to know about

---

## Fallback Protocol

These protocols apply at every operating posture, not only unattended
(Lights-Out) runs. See
[Agentic Workflow Guide: Error and Fallback Guidance](../../guides/agentic-workflow.md#error-and-fallback-guidance)
for the central fallback protocols.

**Extends:** Failed Gate, Missing Input. **Overrides:** none.

- Run tests after every meaningful change — don't accumulate failures
- Revert to last known-good state if tests fail after reasonable remediation
  attempts (don't dig deeper into a broken state)
- Request human review for any changes that touch outside the defined module
  boundary
- Flag deviations from design specs explicitly rather than silently adapting

---

## Related Documents

- [Implementation Stage Guide](README.md)
- [Implementation Checklist](checklist.md)
- [Implementation Brief Template](../../templates/implementation-brief.md)
- [Implementation Session Log Template](../../templates/implementation-session-log.md)

---

## Notes

**Last Updated:** 2026-06-20

Added to framework in v0.12.0. v0.49: vocabulary and oversight model updated.
