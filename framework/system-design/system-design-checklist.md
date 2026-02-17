# System Design Readiness Checklist

**Purpose:** Quick validation (60-90 seconds) that system design is complete and
ready for Gate 2.

**Usage:** Check every item before proceeding to Gate 2 decision.

---

## Architecture and Technology

- [ ] System architecture diagram exists (components, boundaries, interactions)
- [ ] Technology stack documented with justification
- [ ] Architecture Decision Records (ADRs) created for key decisions
- [ ] Data architecture defined (entity model, relationships, persistence)

## API and Integration

- [ ] API design principles established (versioning, auth, error handling)
- [ ] Integration points identified and documented
- [ ] Authentication/authorization approach defined

## Non-Functional Requirements

- [ ] Security architecture designed (auth, encryption, input validation)
- [ ] Compliance requirements addressed (GDPR, HIPAA, etc.)
- [ ] Performance targets specified (response time, throughput, concurrency)
- [ ] Scalability approach defined

## Observability and Measurement

- [ ] Monitoring and logging strategy designed
- [ ] Success criteria instrumentation planned
- [ ] Measurement throughline validated (NFRs include instrumentation needs)

## Infrastructure

- [ ] CI/CD pipeline designed
- [ ] Environment strategy defined (dev, staging, production)
- [ ] Deployment strategy documented
- [ ] Infrastructure decisions documented in ADRs

## Increment Plan

- [ ] Increment plan created with MoSCoW mapping
- [ ] Must Have requirements in first increments
- [ ] Should Have requirements sequenced
- [ ] Could Have evaluation approach defined
- [ ] Won't Have requirements documented

## Readiness for Gate 2

- [ ] All requirements have architectural approach
- [ ] No major technical unknowns remain
- [ ] Design is implementable within constraints
- [ ] Alignment Review conducted

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

**Last Updated:** 2026-02-16

Added to framework in v0.12.0.
