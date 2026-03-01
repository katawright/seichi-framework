# Verification Reference

## Overview

Optional deep-dive companion to the [Verification Stage Guide](README.md),
[Verification Brief Template](../../templates/verification-brief.md), and
[Verification Checklist](checklist.md). Consult when you need specifics or a
starting point for AI-assisted exploration.

### Purpose

- Provide detailed testing strategies, best practices, and result templates for
  each test type
- Cover defect management with severity definitions, lifecycle, and triage
  process
- Document monitoring and instrumentation validation checklists
- Supply red flags reference and common troubleshooting guidance

### How to Use This Reference

1. Start with the [**Verification Stage Guide**](README.md) for workflow and
   rationale
2. Use this reference when you need specifics — detailed strategies, checklists,
   or result templates
3. Follow **AI exploration** prompts in each section to get AI-assisted help
   with that topic

---

## Integration Testing

**Purpose:** Verify components work together correctly.

**What to test:**

- API contract compliance (request/response formats, status codes)
- Component interactions and data flow
- Database integration (ORM mappings, transactions, constraints)
- Third-party integrations (external APIs, webhooks)
- Error paths (service unavailable, timeouts, retries)

**Strategies:**

- Component pairs (incremental integration)
- Vertical slice (feature-based end-to-end)
- Critical path (risk-based, external dependencies first)

**Best practices:**

- Use test containers for real databases/brokers
- Mock external services (WireMock, MockServer)
- Test error paths and idempotency
- Verify data flows correctly across boundaries

<!-- prettier-ignore -->
> **AI exploration:** _"Generate integration test cases for [describe your component interactions and APIs]."_

---

## Functional Testing

**Purpose:** Validate acceptance criteria and business rules are met.

**What to test:**

- Every acceptance criterion from Requirements
- Business logic and workflow state transitions
- Input validation and error handling
- Edge cases and boundary conditions

**Test design strategies:**

- **Equivalence partitioning** — test one value from each equivalence class
- **Boundary value analysis** — test at boundaries where bugs lurk
- **Decision table testing** — for complex multi-condition rules
- **State transition testing** — for workflows with states

**Best practices:**

- Map tests to acceptance criteria (traceability matrix)
- Test happy paths AND error paths
- Use realistic data (not "foo" and "bar")
- Keep tests independent (no execution order dependencies)
- Verify exact responses, don't just exercise code

**BDD (optional):** Tools like Cucumber express tests in natural language tied
to acceptance criteria, readable by non-technical stakeholders.

<!-- prettier-ignore -->
> **AI exploration:** _"Create a test matrix from these acceptance criteria: [paste your criteria]."_

---

## User Acceptance Testing (UAT)

**Purpose:** Business stakeholders validate the system meets their needs.

**UAT is:** Business process validation, usability assessment, real-world
scenario confirmation, formal sign-off.

**UAT is NOT:** Functional testing (QA's job), bug finding (should be caught
earlier), or exploratory testing.

**Process:**

1. **Plan** — identify participants, define scenarios, prepare environment
2. **Prepare** — create UAT scripts with step-by-step instructions and expected
   outcomes
3. **Execute** — business users test scenarios, QA observes and supports
4. **Resolve** — triage feedback (must fix / defer / accept as-is)
5. **Sign-off** — formal approval with conditions and known issues documented

**Best practices:**

- Involve real users, not QA pretending
- Focus on business value and workflows
- Time-box UAT (e.g., 3 days)
- Manage scope creep — defer new ideas to backlog
- Document everything for audit trail

<!-- prettier-ignore -->
> **AI exploration:** _"Help me design UAT scenarios for [describe your feature and business workflows]."_

---

## Performance Testing

**Purpose:** Validate system meets performance NFRs.

**Types:**

- **Load testing** — expected production load
- **Stress testing** — find breaking point
- **Spike testing** — sudden traffic increases
- **Soak testing** — sustained load over time

**Key considerations:**

- Define measurable targets from NFRs (use p95/p99)
- Test in production-like environment
- Monitor system resources during tests
- Document results and compare to NFR thresholds

### Performance Test Result Template

| Scenario | Load      | Target     | Actual   | Result      | Notes |
| -------- | --------- | ---------- | -------- | ----------- | ----- |
| Baseline | [X req/s] | [<Xms p95] | [Xms]    | [Pass/Fail] |       |
| Peak     | [X req/s] | [<Xms p95] | [Xms]    | [Pass/Fail] |       |
| Stress   | [X req/s] | [Graceful] | [Result] | [Pass/Fail] |       |

<!-- prettier-ignore -->
> **AI exploration:** _"Design a performance test plan for [describe your system, expected load, and NFRs]."_

---

## Security Testing

**Purpose:** Identify vulnerabilities and validate security controls.

**Types:**

- **SAST** — static analysis of source code
- **DAST** — dynamic analysis of running application
- **Dependency scanning** — vulnerable libraries
- **Penetration testing** — if applicable

**Key areas:** Authentication, authorization, input validation/injection, data
protection, OWASP Top 10.

### Vulnerability Scan Result Template

| Severity | Count | Status                    |
| -------- | ----- | ------------------------- |
| Critical | [X]   | [All resolved / deferred] |
| High     | [X]   | [All resolved / deferred] |
| Medium   | [X]   | [X resolved, X deferred]  |
| Low      | [X]   | [X resolved, X deferred]  |

Consult [OWASP](https://owasp.org/Top10/) for current guidance and your team's
security testing standards.

<!-- prettier-ignore -->
> **AI exploration:** _"Identify security test cases for [describe your application's auth model and data sensitivity]."_

---

## Accessibility Testing

**Purpose:** Ensure system is usable by people with disabilities.

Test against WCAG guidelines (A, AA levels minimum).

**Key areas:** Keyboard navigation, screen reader compatibility, color contrast.

**Tools:** axe, WAVE, Lighthouse.

### Accessibility Test Result Template

| Test Area      | Standard   | Result      | Issues  |
| -------------- | ---------- | ----------- | ------- |
| Keyboard nav   | WCAG 2.1.1 | [Pass/Fail] | [Count] |
| Color contrast | WCAG 1.4.3 | [Pass/Fail] | [Count] |
| Alt text       | WCAG 1.1.1 | [Pass/Fail] | [Count] |

<!-- prettier-ignore -->
> **AI exploration:** _"Audit our UI for accessibility issues against WCAG 2.1 AA: [describe your UI]."_

---

## Regression Testing

**Purpose:** Ensure new changes don't break existing functionality.

Run automated test suites from previous iterations after bug fixes and before
deployment.

---

## Test Data Management

### Strategies

- Inline data (simple, in test code)
- Fixtures/seed files (reusable, version-controlled)
- Synthetic data generation (realistic, scalable)
- Builders/factories (flexible, type-safe)

### Best Practices

- Isolate test data per test
- Clean up after tests (transactions, containers)
- Version control fixture files
- Use separate test databases
- Automate data generation

<!-- prettier-ignore -->
> **AI exploration:** _"Design a test data strategy for [describe your data model and testing needs]."_

---

## Defect Management

### Severity vs. Priority

- **Severity** (technical impact): Critical, High, Medium, Low
- **Priority** (business urgency): P0 (fix now), P1 (fix before deploy), P2 (fix
  soon), P3 (when convenient)

### Severity Definitions

- **Critical:** Blocks core functionality, data loss, security breach
- **High:** Major functionality broken, no workaround
- **Medium:** Functionality impaired, workaround available
- **Low:** Minor issue, cosmetic, edge case

### Defect Lifecycle

New → Triaged → Assigned → In Progress → Fixed → Verified → Closed (or Deferred
/ Won't Fix)

### Writing Good Defect Reports

Include: clear summary, steps to reproduce, expected vs. actual result,
environment details, severity/priority, screenshots/logs, related acceptance
criteria.

### Triage Process

Regular triage meetings to review, assign severity/priority, and decide: fix
now, fix before deploy, defer, or won't fix.

### Defect Tracking Template

| ID      | Description | Severity | Priority | Test Type | Status   | Assignee |
| ------- | ----------- | -------- | -------- | --------- | -------- | -------- |
| DEF-001 | [Issue]     | [Sev]    | [Pri]    | [Type]    | [Status] | [Name]   |

<!-- prettier-ignore -->
> **AI exploration:** _"Help me triage these defects and recommend fix-vs-defer decisions: [paste defect list]."_

---

## Monitoring and Instrumentation Validation

### Logging Validation

- [ ] Application logs capture key events
- [ ] Error logs include stack traces and context
- [ ] Log levels configured correctly (INFO, WARN, ERROR)
- [ ] Logs include correlation IDs for request tracing
- [ ] PII/sensitive data not logged

### Metrics Validation

- [ ] Success criteria metrics collected
- [ ] Performance metrics captured (response time, throughput)
- [ ] Error rates and failure modes tracked
- [ ] Resource utilization metrics available

### Dashboard Validation

- [ ] Success criteria dashboards display correctly
- [ ] Real-time metrics update as expected
- [ ] Historical trends visible

### Alerting Validation

- [ ] Critical alerts trigger correctly
- [ ] Alert notifications delivered (email, Slack, PagerDuty)
- [ ] Alert thresholds appropriate
- [ ] Runbook links included in alerts

<!-- prettier-ignore -->
> **AI exploration:** _"Review our monitoring setup for [describe your stack] and identify instrumentation gaps."_

---

## Red Flags Reference

### Stop Deployment

- Critical or high-severity defects unresolved
- UAT not approved by business stakeholders
- Critical or high-severity security vulnerabilities
- Performance NFRs significantly missed without approval
- Acceptance criteria not fully tested
- Monitoring/instrumentation not working
- No rollback plan documented
- Required sign-offs missing

### Investigate Further

- Multiple medium-severity defects deferred
- Test coverage below 80% of acceptance criteria
- Performance borderline on NFRs
- Medium-severity security issues accepted
- Limited UAT participation or feedback
- Test evidence sparse or missing
- Deployment prerequisites unclear

### Acceptable to Proceed (with documentation)

- Low-severity defects deferred to future iterations
- Known limitations documented and communicated
- Acceptable risks documented with mitigation plans
- Conditional approval with clear conditions met

<!-- prettier-ignore -->
> **AI exploration:** _"Given our test results [summarize results], assess deployment readiness and flag any red flags."_

---

## Common Troubleshooting

**Integration tests failing:** Return to Implementation stage to fix code. Don't
proceed until tests are green.

**UAT not approved:** Address UAT feedback, re-test, get re-approval. Never
deploy without business sign-off.

**Performance NFRs not met:** Performance tuning or NFR renegotiation. Document
accepted performance if NFRs relaxed.

**Security vulnerabilities:** Remediate critical/high before deployment.
Document accepted risk for medium/low (with approval).

**Monitoring not working:** Fix instrumentation before deployment. Cannot
measure success without working monitoring.

<!-- prettier-ignore -->
> **AI exploration:** _"Help me troubleshoot [describe your failing tests or verification issue]."_

---

## AI-Led Patterns

### What AI Drives

- Test generation from acceptance criteria — functional, integration, and edge
  case tests
- Test matrix expansion beyond the obvious scenarios
- Synthetic test data creation for realistic, scalable test coverage
- Contract test implementation for cross-service boundaries
- Coverage gap identification and iteration until CI passes
- Performance test scripting and security scan configuration

### What Humans Validate

- Test intent and coverage quality — are the right things being tested, not just
  that line coverage numbers are met
- Edge case adequacy — does the test suite cover the scenarios that actually
  matter for this feature
- Acceptance criteria coverage completeness — every AC has a corresponding test
- Whether tests verify behavior rather than implementation details

### Oversight Intensity at This Stage

**Passive or Minimal.** Verification has very high verifiability — test results
are machine-checkable. Minimal oversight is appropriate when acceptance criteria
are clear and the CI pipeline is mature. Active oversight is reserved for
complex business logic or security-critical paths where test intent is harder to
assess automatically.

### Common Failure Modes

- **Testing implementation, not behavior** — brittle tests tied to internal
  structure rather than observable behavior; break on refactoring even when
  behavior is correct
- **Ignoring edge cases and error paths** — good coverage of happy paths but
  poor coverage of validation failures, timeouts, and error states
- **Coverage padding** — generating tests for getters, setters, or trivial code
  to hit coverage targets, with no real verification value
- **Tests that don't validate requirements** — tests pass but don't actually
  assert that acceptance criteria are met

### Fallback Protocol

- Re-read acceptance criteria and requirements when uncertain what to test —
  tests should trace back to documented requirements
- Consult the increment design test strategy as the authoritative source for
  what coverage targets and test types were planned
- Request human clarification on ambiguous acceptance criteria before generating
  tests for them — incorrect tests are worse than missing tests
- Never mark verification complete with failing tests, even low-priority ones

### Session Handoff Notes

Capture the following at the end of each session:

- Test coverage status: current coverage vs. target, by test type
- Remaining test scenarios from the test matrix not yet implemented
- Known test gaps and their priority (deferral rationale if deferred)
- Defects discovered during verification and their current status
- Performance and security test results with pass/fail against NFRs

---

## Notes

**Last Updated:** 2026-03-01

Added to framework in v0.12.0.
