# System Design Readiness Checklist

**Purpose:** Quick validation (60-90 seconds) that system design is complete and
ready for Gate 2.

**Usage:** Check every item before proceeding to Gate 2 decision.

---

> Items marked **[H]** require human judgment. Other items can be verified or
> assisted by AI.

## Architecture and Technology

- [ ] System architecture diagram exists (components, boundaries, interactions)
- [ ] Technology stack documented with justification
- [ ] ADRs created for significant technology selections
- [ ] Data architecture defined (entity model, relationships, persistence)
- [ ] ADRs created for significant data decisions

## API and Integration

- [ ] API design principles established (versioning, auth, error handling)
- [ ] Integration points identified and documented
- [ ] Authentication/authorization approach defined
- [ ] ADRs created for significant API decisions

## Non-Functional Requirements

- [ ] Security architecture designed (auth, encryption, input validation)
- [ ] **[H]** Compliance requirements addressed (GDPR, HIPAA, etc.)
- [ ] Performance targets specified (response time, throughput, concurrency)
- [ ] Scalability approach defined
- [ ] ADRs created for significant non-functional requirements decisions

## Observability and Measurement

- [ ] Monitoring and logging strategy designed
- [ ] Success criteria instrumentation planned
- [ ] **[H]** Measurement throughline validated (NFRs include instrumentation
      needs)
- [ ] ADRs created for significant observability decisions

## Infrastructure

- [ ] CI/CD pipeline designed
- [ ] Environment strategy defined (dev, staging, production)
- [ ] Deployment strategy documented
- [ ] ADRs created for significant infrastructure decisions

## Increment Plan

- [ ] **[H]** Increment 0 need assessed (bootstrap for greenfield, discovery for
      brownfield first AI-assisted, or not needed for subsequent brownfield)
- [ ] Increment plan created with MoSCoW mapping
- [ ] **[H]** Must Have requirements in first increments
- [ ] Should Have requirements sequenced
- [ ] Could Have evaluation approach defined
- [ ] Won't Have requirements documented

## Readiness for Gate 2

- [ ] All requirements have architectural approach
- [ ] **[H]** No major technical unknowns remain
- [ ] **[H]** Design is implementable within constraints
- [ ] **[H]** Alignment Review conducted

---

## Decision: Ready to Proceed?

- [ ] **Ready for Gate 2** — All items checked
- [ ] **Not Ready** — Address unchecked items

---

> For common issues and troubleshooting when items fail, see
> [System Design Reference: Checklist Troubleshooting](system-design-reference.md#checklist-troubleshooting).

> **AI suggestion:** _"Walk me through this checklist for [describe your design]
> and flag items needing attention."_

---

**Related Documents:**

- [System Design Brief Template](system-design-brief-template.md)
- [System Design Guide](system-design-guide.md)
- [System Design Reference](system-design-reference.md)
- [AI-Assisted SDLC Stages](../framework-stages.md)

---

## Notes

**Last Updated:** 2026-02-21

Added to framework in v0.12.0.
