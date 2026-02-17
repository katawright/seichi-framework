# Implementation Checklist

**Purpose:** Quick validation (60-90 seconds) that implementation is complete
and ready for Verification.

**Usage:** Review after all PRs merged, before handoff.

---

## Requirements

- [ ] All functional requirements for this increment implemented
- [ ] All non-functional requirements addressed
- [ ] Acceptance criteria met for each requirement
- [ ] No critical functionality missing

**Gate:** Requirements complete → Continue

---

## Code Quality and Security

- [ ] Code follows project coding standards
- [ ] No obvious code smells or duplication
- [ ] Error handling implemented for failure scenarios
- [ ] Input validation present where needed
- [ ] No hardcoded secrets (use config/env variables)
- [ ] Dependencies have no known critical vulnerabilities

**Gate:** Quality standards met → Continue

---

## Unit Testing

- [ ] Unit tests written for all new code
- [ ] Coverage meets team threshold
- [ ] All unit tests pass locally
- [ ] Tests cover happy path, edge cases, and errors
- [ ] Tests are meaningful (not padding for coverage)

**Gate:** Tests passing → Continue

---

## Code Review and CI/CD

- [ ] All PRs submitted, reviewed, and approved
- [ ] Review feedback addressed, no open threads
- [ ] Linting and formatting pass
- [ ] CI/CD pipeline passing all checks
- [ ] All PRs merged to target branch

**Gate:** All PRs merged and green → Continue

---

## Instrumentation

- [ ] Logging implemented (errors, key events)
- [ ] No sensitive data in logs (PII, secrets)
- [ ] Metrics/telemetry for key operations
- [ ] Success criteria measurement instrumented

**Gate:** Instrumentation complete → Continue

---

## Handoff Readiness

- [ ] Implementation brief completed
- [ ] Known issues and limitations documented
- [ ] Test scenarios documented for Verification team
- [ ] Environment setup instructions provided
- [ ] Deployment team notified and ready

**Gate:** All items complete → Hand off to Verification

---

## Final Decision

- [ ] **READY** — All checks passed, proceed to Verification
- [ ] **READY WITH CONDITIONS** — Minor issues documented and acceptable
- [ ] **NOT READY** — Critical items must be resolved

**Sign-Off:**

- Name: [Name]
- Role: [Engineer/Tech Lead]
- Date: YYYY-MM-DD

---

> For red flags, code quality details, testing guidance, and detailed
> checklists, see the [Implementation Reference](implementation-reference.md).

> **AI suggestion:** _"Walk me through this checklist for [describe your
> increment] and flag items needing attention."_

---

**Last Updated:** 2026-02-16

_Added to framework in v0.5.0_
