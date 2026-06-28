# System Design Checklist

**Purpose:** Quick validation (60-90 seconds) that system design is complete and
ready for Gate 2.

**Usage:** Review before presenting the design to stakeholders for Gate 2.

---

> **Markers.** _Unmarked_ — mechanical; an agent verifies directly. **[J]** —
> needs judgment, but whether a human, a delegated agent, or pre-authorized
> policy provides it is an operating-model choice. **[H]** — the non-delegable
> floor: **human-owned** regardless of operating model, discharged either
> interactively **or** by pre-authorized policy, never a delegated agent
> (interactive-only at Critical). The marker says only _whether an agent may
> discharge the item_; whether an **[H]** item clears interactively or by policy
> is resolved per project by the consequence + compliance floor (see the
> [Operating Model Guide](../../guides/operating-model.md)), not by the marker.

> **Lights-Out preset:** an agent completes the full checklist and presents
> results for review. **[H]** items stay human-owned — cleared interactively or
> by pre-authorized policy per the operating model. **During interactive stage
> execution, raise [H] items as they arise rather than batching them at the
> end.**

> Not every item applies at every scale — mark items N/A with justification when
> they don't fit your project's tier. See
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
9. [ ] **[J] Success criteria instrumentation planned** — each criterion from
       the Success Criteria Register has a defined collection method, metric
       name, and delivery increment
10. [ ] **Infrastructure plan covers CI/CD, environments, deployment**
        (bootstrap or assessment complete)

### Versioning and Conventions

11. [ ] **Versioning strategy defined** (app versioning, API versioning, release
        tagging, changelog approach; N/A if brownfield with existing
        conventions)

### Brownfield and Cross-Service

12. [ ] **Brownfield preparation plan includes binary readiness re-assessment
        criteria** (per-axis pass/fail thresholds for each preparation
        increment, with named outcomes: Go, Conditional Go, Continue, or
        returning to gate; N/A for greenfield or T4+ brownfield)
13. [ ] **Cross-service security reviewed** (new inter-service communication has
        authentication and authorization; new database users have minimal
        grants; N/A for single-service projects)

### Increment Plan and Readiness

14. [ ] **[J] Increment plan maps MoSCoW priorities to sequenced increments**
        (Must Haves first, dependencies identified, each increment articulates
        value delivered)
15. [ ] **[J] All requirements have architectural approach** (no orphaned FRs or
        NFRs)
16. [ ] **[J] Design assumptions consistent with upstream artifacts** (user
        scale, data volume, concurrency, and growth projections align with
        requirements brief; any departures are justified with documented
        rationale and business input)
17. [ ] **[H] Alignment conducted** (stakeholder sign-off obtained; record using
        [Checkpoint Decision Template](../../templates/checkpoint-decision.md))

### Handoff to Increment Design

18. [ ] **Architecture documented for increment-level design** (sufficient
        detail for teams to begin)
19. [ ] **Conventions established** (API patterns, data access, error handling)
20. [ ] **Increment plan ready for detailed design work** (boundaries, goals,
        and dependencies clear)
21. [ ] **All required stage outputs produced** (system design brief, ADRs,
        architecture diagrams, increment plan — verify against stage README
        front matter)
22. [ ] **Draft ADRs use correct naming and location** (`ADR-DCC.md` in
        project's `docs/adr/`; ready for Gate 2 promotion to the workspace ADR
        canon per [ADR Publishing](../../guides/framework.md#adr-publishing))
23. [ ] **[J] Each draft ADR earns its position** (meets all three criteria —
        significant, hard to reverse, contested; decisions that fail
        hard-to-reverse are demoted to design-note subsections in the brief, not
        kept as ADRs; every load-bearing decision has an ADR)

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

**Last Updated:** 2026-06-28

Added to framework in v0.12.0. ADR earns-its-position check (item 23) added in
v0.47.0. ADR naming check updated to the two-digit draft form in v0.48.0. AI-Led
mode updated to Lights-Out mode in v0.49.0. v0.52.0 re-marked items to the
three-tier `[J]`/`[H]` scheme and rewrote the marker legend (CL-1).
