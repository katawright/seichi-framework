# Verification Guide

> Stage-specific guidance for Verification. For cross-cutting framework
> concepts, see [Framework Guide](../framework-guide.md).

---

## Quick Reference

**Purpose:** Execute the test strategy planned in Design stage to validate that
implemented increments work correctly through comprehensive testing and business
acceptance before deployment.

**Primary roles:** QA Engineers, Engineers

**Execution pattern:** Iterative (per increment)

**Key inputs:** Working code, unit test results, code review approvals,
implementation brief

**Key outputs:** Verified code, test results, UAT approval, production readiness
assessment, deployment checklist

**What good looks like:**

- All acceptance criteria verified with tests
- Integration, functional, performance, and security tests pass
- UAT approved by business stakeholders
- No critical or high-severity defects
- Instrumentation verified working
- Production readiness confirmed

**Common pitfalls:**

- Testing only happy paths
- Skipping performance testing until staging
- UAT becomes feature request session
- No traceability from tests to acceptance criteria
- Missing security testing
- Insufficient test data realism

**Checkpoint:** Quality Checkpoints + Deployment Approval — see
[Framework Guide: Checkpoints](../framework-guide.md#checkpoint-taxonomy)

**AI assistance:** High assistance + CI gates — see
[Framework Guide: AI Assistance](../framework-guide.md#ai-assistance-overview)

---

## What Is Verification?

Verification answers two critical questions:

1. **Verification:** Did we build it correctly? (Meets technical specifications)
2. **Validation:** Did we build the right thing? (Meets business needs)

This stage encompasses both — testing technical correctness AND validating
business value before deployment.

**Inputs from Design:**

- Test strategy planned in Design stage
  ([design-brief section 13](design-brief-template.md#13-testing-strategy-for-this-increment))
- Test types selected (integration, functional, performance, security)
- Coverage targets and acceptance criteria traceability
- Performance benchmarks from NFRs

**Inputs from Implementation:**

- Working code on branch/environment
- Unit test results (already passing)
- Implementation brief and code review approvals

**Outputs to Deployment:**

- Verified code ready for release
- Comprehensive test results
- UAT approval from business stakeholders
- Production readiness assessment
- Deployment checklist

**Relationship to Design Stage:**

Verification **executes and refines** the test strategy planned during Design
stage (iterative). The Design stage identifies what to test, coverage targets,
and test approaches. Verification stage executes those tests, adapts based on
implementation realities, and validates acceptance criteria.

**Design plans → Verification executes → Deployment deploys**

---

## Test Types Overview

The Verification stage includes multiple test types. Unit tests are already done
during Implementation; Verification focuses on higher-level testing.

### Integration Testing

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

### Functional Testing

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

### User Acceptance Testing (UAT)

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

### Performance Testing

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

Consult your team's performance testing tools and practices, or ask your AI
agent for guidance on specific testing scenarios.

### Security Testing

**Purpose:** Identify vulnerabilities and validate security controls.

**Types:**

- **SAST** — static analysis of source code
- **DAST** — dynamic analysis of running application
- **Dependency scanning** — vulnerable libraries
- **Penetration testing** — if applicable

**Key areas:** Authentication, authorization, input validation/injection, data
protection, OWASP Top 10.

Consult [OWASP](https://owasp.org/Top10/) for current guidance and your team's
security testing standards.

### Accessibility Testing

**Purpose:** Ensure system is usable by people with disabilities.

Test against WCAG guidelines (A, AA levels minimum). Key areas: keyboard
navigation, screen reader compatibility, color contrast. Tools: axe, WAVE,
Lighthouse.

### Regression Testing

**Purpose:** Ensure new changes don't break existing functionality.

Run automated test suites from previous iterations after bug fixes and before
deployment.

---

## Test Data Management

**Strategies:**

- Inline data (simple, in test code)
- Fixtures/seed files (reusable, version-controlled)
- Synthetic data generation (realistic, scalable)
- Builders/factories (flexible, type-safe)

**Best practices:**

- Isolate test data per test
- Clean up after tests (transactions, containers)
- Version control fixture files
- Use separate test databases
- Automate data generation

---

## Defect Management

### Severity vs. Priority

- **Severity** (technical impact): Critical, High, Medium, Low
- **Priority** (business urgency): P0 (fix now), P1 (fix before deploy), P2 (fix
  soon), P3 (when convenient)

### Defect Lifecycle

New → Triaged → Assigned → In Progress → Fixed → Verified → Closed (or Deferred
/ Won't Fix)

### Writing Good Defect Reports

Include: clear summary, steps to reproduce, expected vs. actual result,
environment details, severity/ priority, screenshots/logs, related acceptance
criteria.

### Triage Process

Regular triage meetings to review, assign severity/ priority, and decide: fix
now, fix before deploy, defer, or won't fix.

---

## Production Readiness

### Readiness Checklist

**Testing:**

- All test types executed
- 100% of acceptance criteria verified
- No critical/high defects
- Performance meets NFRs
- Security vulnerabilities addressed
- UAT approved

**Quality gates:**

- Automated tests green
- Code coverage meets thresholds
- Static analysis clean

**Deployment artifacts:**

- Code tagged and versioned
- Deployment runbook created
- Rollback plan documented
- Database migrations tested

**Monitoring:**

- Logging verified
- Metrics collection tested
- Dashboards and alerts configured
- Success criteria measurement working

**Sign-offs:**

- QA Lead, Tech Lead, Product Owner
- Security (if applicable)

### Go/No-Go Decision

- **Go:** All critical gates passed, UAT approved, rollback plan exists
- **No-go:** Critical defects, UAT not approved, performance below NFRs
- **Conditional go:** Minor issues accepted with workarounds documented

---

## Verification Workflow

```
-- PHASE 1: TEST PLANNING (builds on Design stage test strategy) --

 1. Review requirements and acceptance criteria
 2. Review test strategy from Design stage (design-brief section 13)
 3. Refine test strategy and coverage approach based on implementation
    [Human approves strategy]
 4. Prepare test environment and data

-- PHASE 2: TEST EXECUTION --

 4. Execute integration tests [CI gate]
 5. Execute functional tests [Quality gate: all ACs]
 6. Execute performance tests [Gate: meets NFRs]
 7. Execute security tests [Gate: no critical vulns]
 8. Track and resolve defects
    [Return to Implementation if needed]

-- PHASE 3: ACCEPTANCE AND READINESS --

 9. Conduct UAT [Business stakeholder sign-off]
 10. Validate instrumentation and monitoring
 11. Assess production readiness [Go/no-go]
 12. Complete verification brief

HANDOFF TO DEPLOYMENT
```

---

## Measurement Validation

Verification validates that measurement systems work correctly. See
[Framework Guide: Measurement Throughline](../framework-guide.md#measurement-throughline).

**Verification activities:**

- Test logging and metrics collection
- Validate dashboards and monitoring
- Confirm alerts trigger correctly
- Verify instrumentation captures required data
- Test success criteria measurement mechanisms

---

## AI Assistance

**AI excels at:**

- Generating test cases from acceptance criteria
- Creating test matrices for edge cases
- Writing integration and E2E tests
- Generating test data and fixtures
- Analyzing test results and patterns
- Identifying coverage gaps

**Human responsibilities:**

- Approve test strategy and coverage
- Decide go/no-go for deployment
- Prioritize defect fixes vs. deferral
- Sign off on UAT and production readiness
- Assess acceptable risk levels

---

## When to Revisit Verification

**During current iteration:**

- New defects from UAT or performance testing
- Requirements or design changes
- Regression in previously passing tests

**After deployment:**

- Production incidents reveal test gaps
- Real-world usage uncovers untested scenarios
- Monitoring reveals instrumentation issues

**For future iterations:**

- Update test strategy based on production learnings
- Expand coverage for high-risk areas
- Improve test data realism

---

## Related Documents

- [Verification Brief Template](verification-brief-template.md)
- [Verification Checklist](verification-checklist.md)
- [AI-Assisted SDLC Stages](../framework-stages.md)

---

## Notes

**Last Updated:** 2026-02-15

Added to framework in v0.6.0.
