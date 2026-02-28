# System Design Readiness Checklist

**Purpose:** Quick validation (60-90 seconds) that system design is complete and
ready for Gate 2.

**Usage:** Review before presenting the design to stakeholders for Gate 2.

---

> Items marked **[H]** require human judgment. Other items can be verified or
> assisted by AI.

---

## Checklist Items

### Core

1. [ ] **System architecture documented** (components, boundaries, interactions)
2. [ ] **Technology stack justified with ADRs** (significant selections have
       decision records)
3. [ ] **[H] Increment plan maps MoSCoW priorities to sequenced increments**
       (Must Haves first, dependencies identified)
4. [ ] **Security architecture designed** (auth, encryption, input validation)
5. [ ] **Infrastructure plan covers CI/CD, environments, deployment** (bootstrap
       or assessment complete)
6. [ ] **[H] All requirements have architectural approach** (no orphaned FRs or
       NFRs)

### Supporting

7. [ ] **Data architecture defined** (entity model, relationships, persistence)
8. [ ] **API design principles established** (versioning, auth, error handling)
9. [ ] **[H] Compliance requirements addressed** (GDPR, HIPAA, etc.)
10. [ ] **Performance targets specified with scalability approach** (p95/p99,
        throughput)
11. [ ] **Monitoring and logging strategy designed** (observability stack,
        alerting)
12. [ ] **[H] Success criteria instrumentation planned** (measurement
        throughline)
13. [ ] **[H] Alignment Review conducted** (stakeholder sign-off obtained)

---

## Final Decision

> **If core items (1-6) are missing, the design is usually not ready to present
> for Gate 2.**

- [ ] **Ready** — Present to stakeholders for Gate 2
- [ ] **Not Ready** — Address weak items and re-check

---

## Core Items

Why the core items are blocking — if any of these are missing, downstream work
is unreliable:

| Item                     | Why It's Blocking                                                |
| ------------------------ | ---------------------------------------------------------------- |
| 1. Architecture          | Without documented architecture, teams build incompatible pieces |
| 2. Technology ADRs       | Unjustified choices lead to costly reversals                     |
| 3. Increment plan        | No plan means no sequencing, no dependencies, no estimates       |
| 4. Security architecture | Retrofitting security is orders of magnitude more expensive      |
| 5. Infrastructure plan   | No CI/CD or environments blocks all feature delivery             |
| 6. Requirements coverage | Orphaned requirements surface as late-stage surprises            |

> **AI suggestion:** _"Walk me through this checklist for [describe your design]
> and flag items needing attention."_

---

> For common issues and troubleshooting when items fail, see
> [System Design Reference: Checklist Troubleshooting](system-design-reference.md#checklist-troubleshooting).

---

## Related Documents

- [System Design Brief Template](../templates/system-design-brief-template.md)
- [AI-Assisted SDLC: System Design Stage](README.md)
- [System Design Reference](system-design-reference.md)
- [AI-Assisted SDLC Stages](../framework-stages.md)

---

## Notes

**Last Updated:** 2026-02-27

Added to framework in v0.12.0.
