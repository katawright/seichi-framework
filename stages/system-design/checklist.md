# System Design Checklist

**Purpose:** Quick validation (60-90 seconds) that system design is complete and
ready for Gate 2.

**Usage:** Review before presenting the design to stakeholders for Gate 2.

---

> Items marked **[H]** require human judgment. Other items can be verified or
> assisted by AI.

> **AI-Led mode:** AI completes the full checklist and presents results to the
> human reviewer. Humans review all items and confirm **[H]** items, which
> require human judgment that AI cannot substitute for.

> Not every item applies at every scale — mark items N/A with justification when
> they don't fit your project's risk tier. See
> [Right-Sizing Guide](../../guides/right-sizing.md).

---

## Checklist Items

### Architecture and Technology

1. [ ] **System architecture documented** (components, boundaries, interactions)
2. [ ] **Technology stack justified with ADRs** (significant selections have
       decision records)
3. [ ] **Data architecture defined** (entity model, relationships, persistence)

### API, Security, and NFRs

4. [ ] **API design principles established** (versioning, auth, error handling)
5. [ ] **Security architecture designed** (auth, encryption, input validation;
       consult [AppSec per RACI](../../guides/roles.md#raci-matrix))
6. [ ] **[H] Compliance requirements addressed** (GDPR, HIPAA, etc.; consult
       [AppSec per RACI](../../guides/roles.md#raci-matrix))
7. [ ] **Performance targets specified with scalability approach** (p95/p99,
       throughput)

### Observability and Infrastructure

8. [ ] **Monitoring and logging strategy designed** (observability stack,
       alerting)
9. [ ] **[H] Success criteria instrumentation planned** — each criterion from
       the Success Criteria Register (Standard+) has a defined collection
       method, metric name, and delivery increment
10. [ ] **Infrastructure plan covers CI/CD, environments, deployment**
        (bootstrap or assessment complete)

### Versioning and Conventions

11. [ ] **Versioning strategy defined** (app versioning, API versioning, release
        tagging, changelog approach; N/A if brownfield with existing
        conventions)

### Increment Plan and Readiness

12. [ ] **[H] Increment plan maps MoSCoW priorities to sequenced increments**
        (Must Haves first, dependencies identified, each increment articulates
        value delivered)
13. [ ] **[H] All requirements have architectural approach** (no orphaned FRs or
        NFRs)
14. [ ] **[H] Alignment conducted** (stakeholder sign-off obtained)

### Handoff to Increment Design

15. [ ] **Architecture documented for increment-level design** (sufficient
        detail for teams to begin)
16. [ ] **Conventions established** (API patterns, data access, error handling)
17. [ ] **Increment plan ready for detailed design work** (boundaries, goals,
        and dependencies clear)
18. [ ] **All required stage outputs produced** (system design brief, ADRs,
        architecture diagrams, increment plan — verify against stage README
        front matter)

---

## Final Decision

> **If any items are unchecked, address before proceeding.**

- [ ] **Ready** — Present to stakeholders for Gate 2; record the decision using
      the [Gate Decision Template](../../templates/gate-decision.md)
- [ ] **Not Ready** — Address weak items and re-check

---

> **AI suggestion:** _"Walk me through this checklist for [describe your design]
> and flag items needing attention."_

---

> For common issues and troubleshooting when items fail, see
> [System Design Reference: Checklist Troubleshooting](reference.md#checklist-troubleshooting).

---

## Related Documents

- [System Design Brief Template](../../templates/system-design-brief.md)
- [AI-Assisted SDLC: System Design Stage](README.md)
- [System Design Reference](reference.md)
- [AI-Assisted SDLC Stages](../../guides/stages.md)

---

## Notes

**Last Updated:** 2026-03-19

Added to framework in v0.12.0.
