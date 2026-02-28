# Implementation Reference

## Overview

Optional deep-dive companion to the [Implementation Stage Guide](README.md),
[Implementation Brief Template](../templates/implementation-brief-template.md),
and [Implementation Checklist](implementation-checklist.md). Consult when you
need specifics or a starting point for AI-assisted exploration.

### Purpose

- Provide detailed logging, metrics, and instrumentation guidance
- Cover security implementation patterns and review checklists
- Document technical debt management, PR strategy, and branching conventions
- Supply code quality red flags, unit testing details, and code review focus
  areas

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
[Implementation Session Log Template](../templates/implementation-session-log-template.md)
to track session-by-session progress. Start one from the template at the
beginning of each increment. Have the AI agent update it at the end of every
work session so the next session's agent can restore context from it.

<!-- prettier-ignore -->
> **AI exploration:** _"Help me write a session handoff summary
> for [describe what you worked on today]."_

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

## Notes

**Last Updated:** 2026-02-27

Added to framework in v0.12.0.
