# Implementation Guide

**Last Updated:** 2026-02-14

> Stage-specific guidance for Implementation. For cross-cutting framework
> concepts, see [framework-guide.md](../framework-guide.md).

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

**Checkpoint:** Quality Checkpoint (code review + tests

- standards) — see
  [Framework Guide: Checkpoints](../framework-guide.md#checkpoint-taxonomy)

**AI autonomy:** High autonomy, bounded scope — see
[Framework Guide: AI Autonomy](../framework-guide.md#ai-autonomy-overview)

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

**Inputs from Design:**

- Detailed design specifications for increment
- API specifications and data models
- Architecture patterns to follow

**Outputs to Verification:**

- Working code in feature branch
- Unit test results and coverage reports
- Code review approval records
- Implementation brief with notes

---

## Execution Pattern

Implementation executes **once per increment** in the Design → Implementation →
Verification → Deployment cycle.

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
    Human review: accuracy and clarity [GATE]
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

## Code Quality

Follow SOLID, DRY, KISS, and YAGNI principles. These are well-documented in
standard engineering references; consult your team's standards or ask your AI
agent for specific guidance.

### Code Review Focus Areas

1. **Correctness** — implements requirements?
2. **Security** — injection, auth bypass, XSS?
3. **Performance** — obvious inefficiencies?
4. **Maintainability** — readable, well-structured?
5. **Testability** — can it be easily tested?
6. **Error handling** — edge cases and failures?
7. **Standards compliance** — team conventions?

---

## Implementation Decision Records (ADRs)

For significant implementation decisions, create ADRs using the framework's
template (`../../adr-template.md`).

**"Reasonable engineer test":** If someone might later ask "why this approach
instead of alternatives?", create an ADR.

**Create ADR for:** Multiple viable approaches, non-obvious trade-offs,
decisions with implications.

**Document inline when:** Single obvious approach, team standard practice,
easily reversible.

Store in `implementation/adr/` with sequential numbering (ADR-001, ADR-002).

---

## Instrumentation and Observability

Implement the measurement infrastructure designed in the Design stage. Success
criteria from Initiation must be measurable in production — see
[Framework Guide: Measurement Throughline](../framework-guide.md#measurement-throughline).

### Logging Best Practices

**Log levels:**

- **ERROR** — failures requiring attention
- **WARN** — unexpected but handled conditions
- **INFO** — important business events
- **DEBUG** — diagnostic information

Use structured (JSON) logging for machine readability.

**Always log:** Errors with context, security events, important state changes,
external service calls.

**Never log:** Passwords, PII, API keys, secrets.

### Metrics and Telemetry

**Metric types:**

- **Counters** — count events (requests, errors)
- **Gauges** — current value (connections, queue depth)
- **Histograms** — distributions (response time)
- **Timers** — durations (API response, query time)

**Implement measurement for success criteria:**

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

Configure alerts for error rate thresholds, performance degradation, resource
exhaustion, external service failures, and security events.

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

---

## Technical Debt Management

**Technical debt** is the implied cost of choosing a quick solution now over a
better approach.

**Types:** Deliberate (conscious trade-off), accidental (didn't know better),
environmental (dependencies evolve), bit rot (code degrades over time).

**Good reasons to incur debt:** Time-to-market, uncertainty, learning, risk
mitigation.

**Bad reasons:** Laziness, ignoring standards, skipping tests or review.

**Managing debt:**

1. **Document it** — TODO/FIXME comments with context
2. **Track it** — backlog items with "Tech Debt" label
3. **Prioritize** — high-impact debt blocks features
4. **Plan paydown** — schedule in future increments
5. **Communicate** — stakeholders understand trade-offs

---

## AI-Assisted Implementation

### Where AI Excels

- Generating code from design specifications
- Implementing standard patterns (CRUD, auth, validation)
- Writing unit tests from acceptance criteria
- Creating data models and API endpoints
- Generating documentation and code comments
- Suggesting refactoring improvements

### Where Human Expertise Is Critical

- Code review and approval — validate AI-generated code
- Security review — check for vulnerabilities
- Business logic correctness — verify requirements met
- Test quality — ensure tests are meaningful, not padding
- Architectural consistency — follows established patterns
- Final merge decision — human owns this

### Best Practices

1. **AI generates, human validates** — never merge without review
2. **Test AI code thoroughly** — verify it works
3. **Review for security** — injection, auth, XSS
4. **Validate test quality** — meaningful assertions
5. **Iterative refinement** — use AI to address review feedback

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
- [Implementation AI Agent Prompt](implementation-ai-agent-prompt.md)
- [ADR Template](../adr-template.md)
- [STAGES.md](../../STAGES.md)

---

## Notes

Added to framework in v0.5.0.
