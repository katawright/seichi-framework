# Implementation Checklist

**Purpose:** Quick validation (60-90 seconds) that implementation is complete
and ready for Verification.

**Usage:** Review after all PRs merged, before handoff to Verification.

---

> Items marked **[H]** require human judgment. Other items can be verified or
> assisted by AI.

## Checklist Items

### Core

1. [ ] **All increment requirements implemented** (FRs, NFRs, acceptance
       criteria met)
2. [ ] **Unit tests pass with adequate coverage** (coverage target met,
       meaningful assertions)
3. [ ] **[H] Code review approved and all PRs merged** (feedback addressed, CI
       green)
4. [ ] **[H] No critical security vulnerabilities** (input validation, secrets
       managed, dependencies scanned)
5. [ ] **[H] Instrumentation implemented for success criteria** (logging,
       metrics, alerts)

### Supporting

6. [ ] **Code follows project standards** (linting, formatting, no code smells)
7. [ ] **Implementation brief completed with decisions documented** (ADRs for
       significant choices)
8. [ ] **[H] Known issues and limitations documented** (tech debt tracked)
9. [ ] **Test environment prepared for Verification** (setup instructions, test
       data ready)
10. [ ] **[H] Engineers can explain implementation decisions and trade-offs**

---

## Final Decision

> **If core items (1-5) are missing, the implementation is not ready for
> Verification.**

- [ ] **Ready** — Proceed to Verification
- [ ] **Not Ready** — Address weak items and re-check

---

## Core Items

Why the core items are blocking — if any of these are missing, Verification
cannot proceed reliably:

| Item               | Why It's Blocking                                                      |
| ------------------ | ---------------------------------------------------------------------- |
| 1. Requirements    | Incomplete requirements mean Verification tests the wrong thing        |
| 2. Unit tests      | Without passing tests, defects discovered late cost exponentially more |
| 3. Code review     | Unreviewed code carries hidden defects, security gaps, and style drift |
| 4. Security        | Security vulnerabilities found post-deployment are orders more costly  |
| 5. Instrumentation | Without instrumentation, success criteria can't be measured            |

<!-- prettier-ignore -->
> **AI suggestion:** _"Walk me through this checklist for [describe your
> increment] and flag items needing attention."_

> For red flags, code quality details, testing guidance, and troubleshooting
> when items fail, see the
> [Implementation Reference](implementation-reference.md).

---

## Related Documents

- [Implementation Brief Template](../templates/implementation-brief-template.md)
- [AI-Assisted SDLC: Implementation Stage](README.md)
- [Implementation Reference](implementation-reference.md)
- [AI-Assisted SDLC Stages](../framework-stages.md)

---

## Notes

**Last Updated:** 2026-02-27

Added to framework in v0.5.0.
