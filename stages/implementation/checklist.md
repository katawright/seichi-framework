# Implementation Checklist

**Purpose:** Quick validation (60-90 seconds) that implementation is complete
and ready for Verification.

**Usage:** Review after all PRs merged, before handoff to Verification.

---

> Items marked **[H]** require human judgment. Other items can be verified or
> assisted by AI.

> Not every item applies at every scale — mark items N/A with justification when
> they don't fit your project's risk tier. See
> [Right-Sizing Guide](../../guides/right-sizing.md).

## Checklist Items

### Requirements and Code Quality

1. [ ] **All increment requirements implemented** (FRs, NFRs, acceptance
       criteria met)
2. [ ] **Code follows project standards** (linting, formatting, no code smells)
3. [ ] **Error handling covers failure scenarios** (graceful degradation, no
       unhandled exceptions)
4. [ ] **[H] No critical security vulnerabilities** (input validation, secrets
       managed, dependencies scanned, no PII in logs)

### Testing and Review

5. [ ] **Unit tests pass with adequate coverage** (coverage target met; happy
       path, edge cases, and error scenarios)
6. [ ] **[H] Code review approved and all PRs merged** (feedback addressed, CI
       green)

### Instrumentation and Handoff

7. [ ] **[H] Instrumentation implemented for success criteria** (logging,
       metrics, alerts)
8. [ ] **Implementation brief completed with decisions documented** (ADRs for
       significant choices)
9. [ ] **[H] Known issues and limitations documented** (tech debt tracked)
10. [ ] **Test environment prepared for Verification** (setup instructions, test
        data ready)
11. [ ] **[H] Engineers can explain implementation decisions and trade-offs**

---

## Final Decision

> **If any items are unchecked, address before proceeding.**

- [ ] **Ready** — Proceed to Verification
- [ ] **Not Ready** — Address weak items and re-check

---

<!-- prettier-ignore -->
> **AI suggestion:** _"Walk me through this checklist for [describe your
> increment] and flag items needing attention."_

> For red flags, code quality details, testing guidance, and troubleshooting
> when items fail, see the
> [Implementation Reference](reference.md).

---

## Related Documents

- [Implementation Brief Template](../../templates/implementation-brief.md)
- [AI-Assisted SDLC: Implementation Stage](README.md)
- [Implementation Reference](reference.md)
- [AI-Assisted SDLC Stages](../../guides/stages.md)

---

## Notes

**Last Updated:** 2026-02-28

Added to framework in v0.5.0.
