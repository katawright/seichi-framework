# Implementation Checklist

**Purpose:** Quick validation (60-90 seconds) that implementation is complete
and ready for Verification.

**Usage:** Review after all PRs merged, before handoff to Verification.

---

> Items marked **[H]** require human judgment. Other items can be verified or
> assisted by AI.

> **Lights-Out preset:** an agent completes the full checklist and presents
> results for review. A human reviews all items and confirms **[H]** items,
> which require judgment an agent cannot substitute for. **During interactive
> stage execution, raise [H] items as they arise rather than batching them at
> the end.**

> Not every item applies at every scale — mark items N/A with justification when
> they don't fit your project's tier. See
> [Right-Sizing Guide](../../guides/right-sizing.md).

---

## Checklist Items

### Requirements and Code Quality

1. [ ] **All increment requirements implemented** (FRs, NFRs, acceptance
       criteria met)
2. [ ] **Code follows project standards** (linting, formatting, no code smells)
3. [ ] **Error handling covers failure scenarios** (graceful degradation, no
    unhandled exceptions)
<!-- Minimal: skip AppSec consultation if the increment introduces no auth
     flows, cryptographic operations, external API integrations, or sensitive
     data handling -->
4. [ ] **[H] No critical security vulnerabilities** (input validation, secrets
       managed, dependencies scanned, SAST clean, no PII in logs; consult
       [AppSec per RACI](../../guides/roles.md#raci-matrix) for new auth flows,
       crypto usage, external API integrations, or data handling changes)
5. [ ] **Implementation aligns with Increment Design Brief** (component
       interaction flows, API contracts, and data model match design — document
       deviations in implementation brief)

### Testing and Review

6. [ ] **Unit tests pass with adequate coverage** (default: 80% line coverage —
       see implementation brief for project-specific target; report both overall
       and critical-path coverage; happy path, edge cases, and error scenarios)
7. [ ] **[H] Code review approved and all PRs merged** (feedback addressed, CI
       green)
8. [ ] **Stored procedure integration tests pass** (N/A for greenfield or
       applications without database-layer logic; brownfield: confirm
       application changes don't break stored procedure contracts)
9. [ ] **Schema compatibility verified** (N/A for non-database changes or
       greenfield with no existing consumers; confirm migrations are
       backward-compatible with existing consumers and rollback-safe)

### Instrumentation and Handoff

10. [ ] **[H] Instrumentation implemented for success criteria** (logging,
        metrics, alerts)
11. [ ] **Implementation brief completed with decisions documented** (ADRs for
        significant choices)
12. [ ] **Session log created at increment start and finalized** (all sessions
        recorded, deviations and decisions documented, context for Verification
        included)
13. [ ] **[H] Known issues and limitations documented** (tech debt tracked)
14. [ ] **Test environment prepared for Verification** (setup instructions, test
        data ready; for local-only tools, satisfied by setup instructions and
        test data)
15. [ ] **[H] Engineers can explain implementation decisions and trade-offs**
16. [ ] **All required stage outputs produced** (implementation brief, session
        log, working code, test results — verify against stage README front
        matter)

---

## Final Decision

> **If any items are unchecked, address before proceeding.**
>
> The PR Review + CI checkpoint is satisfied per-PR during implementation. No
> additional checkpoint decision record is needed for the Verification handoff.

- [ ] **Ready** — Proceed to Verification
- [ ] **Not Ready** — Address weak items and re-check

---

<!-- prettier-ignore -->
> **AI suggestion:** _"Walk me through this checklist for [describe your
> increment] and flag items needing attention."_

> For red flags, code quality details, testing guidance, and troubleshooting
> when items fail, see the [Implementation Reference](reference.md).

---

## Related Documents

- [Implementation Brief Template](../../templates/implementation-brief.md)
- [AI-Assisted SDLC: Implementation Stage](README.md)
- [Implementation Reference](reference.md)
- [AI-Assisted SDLC Stages](../../guides/stages.md)

---

## Notes

**Last Updated:** 2026-06-22

Added to framework in v0.5.0. Session-log item covers creation through
finalization in v0.47.0. AI-Led mode updated to Lights-Out mode in v0.49.0.
