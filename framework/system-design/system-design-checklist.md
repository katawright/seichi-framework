# System Design Readiness Checklist

**Purpose:** Quick validation (60-90 seconds) that system design is complete and
ready for Gate 2.

**Usage:** Review before presenting the design to stakeholders for Gate 2.

---

> Items marked **[H]** require human judgment. Other items can be verified or
> assisted by AI.

---

## Checklist Items

### Architecture and Technology

1. [ ] **System architecture documented** (components, boundaries, interactions)
2. [ ] **Technology stack justified with ADRs** (significant selections have
       decision records)
3. [ ] **Data architecture defined** (entity model, relationships, persistence)

### API, Security, and NFRs

4. [ ] **API design principles established** (versioning, auth, error handling)
5. [ ] **Security architecture designed** (auth, encryption, input validation)
6. [ ] **[H] Compliance requirements addressed** (GDPR, HIPAA, etc.)
7. [ ] **Performance targets specified with scalability approach** (p95/p99,
       throughput)

### Observability and Infrastructure

8. [ ] **Monitoring and logging strategy designed** (observability stack,
       alerting)
9. [ ] **[H] Success criteria instrumentation planned** (measurement
       throughline)
10. [ ] **Infrastructure plan covers CI/CD, environments, deployment**
        (bootstrap or assessment complete)

### Increment Plan and Readiness

11. [ ] **[H] Increment plan maps MoSCoW priorities to sequenced increments**
        (Must Haves first, dependencies identified)
12. [ ] **[H] All requirements have architectural approach** (no orphaned FRs or
        NFRs)
13. [ ] **[H] Alignment Review conducted** (stakeholder sign-off obtained)

---

## Final Decision

> **If any items are unchecked, address before proceeding.**

- [ ] **Ready** — Present to stakeholders for Gate 2
- [ ] **Not Ready** — Address weak items and re-check

---

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

**Last Updated:** 2026-02-28

Added to framework in v0.12.0.
