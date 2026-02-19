# Verification Guide

> Stage-specific guidance for Verification. For cross-cutting framework
> concepts, see [Framework Guide](../framework-guide.md).

---

## Quick Reference

**Purpose:** Execute the test strategy planned in Increment Design stage to
validate that implemented increments work correctly through comprehensive
testing and business acceptance before deployment.

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

**Relationship to Increment Design Stage:**

Verification **executes and refines** the test strategy planned during Increment
Design stage. The Increment Design stage identifies what to test, coverage
targets, and test approaches. Verification executes those tests, adapts based on
implementation realities, and validates acceptance criteria.

**Increment Design plans → Verification executes → Deployment deploys**

---

## Test Types Overview

Unit tests are already done during Implementation; Verification focuses on
higher-level testing.

| Test Type     | Purpose                  | Key Question                         |
| ------------- | ------------------------ | ------------------------------------ |
| Integration   | Components work together | Do APIs, DB, and services connect?   |
| Functional    | Acceptance criteria met  | Does it do what was specified?       |
| UAT           | Business needs met       | Does it solve the business problem?  |
| Performance   | NFRs met                 | Is it fast and stable enough?        |
| Security      | No vulnerabilities       | Is it safe?                          |
| Accessibility | Usable by all            | Is it accessible?                    |
| Regression    | Nothing broke            | Did changes break existing features? |

> For detailed test strategies, best practices, and result templates for each
> test type, see the [Verification Reference](verification-reference.md).

---

## Defect Management

Track defects by **severity** (technical impact: Critical → Low) and
**priority** (business urgency: P0 → P3).

**Key rules:**

- No critical or high-severity defects open at deployment
- Deferred defects must have justification and target version
- Fixed defects must be retested and verified
- Regular triage meetings to review and prioritize

> For severity definitions, defect lifecycle, triage process, and tracking
> templates, see
> [Verification Reference: Defect Management](verification-reference.md#defect-management).

---

## Production Readiness

### Go/No-Go Decision

> For structuring gate decisions, use the
> [Gate Decision Template](../gate-decision-template.md).

- **Go:** All critical gates passed, UAT approved, rollback plan exists
- **No-go:** Critical defects, UAT not approved, performance below NFRs
- **Conditional go:** Minor issues accepted with workarounds documented

### Readiness Requirements

- All test types executed with passing results
- 100% of acceptance criteria verified
- UAT approved by business stakeholders
- Monitoring and instrumentation verified
- Deployment artifacts prepared (code tagged, runbook created, rollback plan
  documented)

> For quality gate status template and deployment prerequisites, see
> [Verification Reference: Production Readiness](verification-reference.md#production-readiness-details).

---

## Verification Workflow

```
-- PHASE 1: TEST PLANNING --
   (builds on Increment Design stage test strategy)

 1. Review requirements and acceptance criteria
 2. Review test strategy from Increment Design stage
    (increment-design-brief section 5)
 3. Refine test strategy based on implementation
    [Human approves strategy]
 4. Prepare test environment and data

-- PHASE 2: TEST EXECUTION --

 5. Execute integration tests [CI gate]
 6. Execute functional tests [Gate: all ACs]
 7. Execute performance tests [Gate: meets NFRs]
 8. Execute security tests [Gate: no critical vulns]
 9. Track and resolve defects
    [Return to Implementation if needed]

-- PHASE 3: ACCEPTANCE AND READINESS --

 10. Conduct UAT [Business stakeholder sign-off]
 11. Validate instrumentation and monitoring
 12. Assess production readiness [Go/no-go]
 13. Complete verification brief

HANDOFF TO DEPLOYMENT
```

**When verification fails:** If the go/no-go decision (step 12) results in
**no-go**, work returns to the Implementation stage for defect fixes. Once fixes
are complete, a **new verification cycle** begins — start a fresh brief from the
template (Cycle 2, Cycle 3, etc.) rather than overwriting the previous cycle's
brief. This preserves each cycle's results as a clean historical record and
makes it easy to see what changed between cycles. The new brief's Cycle Context
section links to the prior brief and summarizes what was fixed.

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
- [Verification Reference](verification-reference.md)
- [AI-Assisted SDLC Stages](../framework-stages.md)

---

## Notes

**Last Updated:** 2026-02-18

Added to framework in v0.6.0.
