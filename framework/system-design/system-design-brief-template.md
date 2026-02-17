# System Design Brief

**Last Updated:** YYYY-MM-DD

---

**Project Name:** [Project Name] **Date:** [YYYY-MM-DD] **Author(s):** [Lead
Architect / Engineering Lead] **Reviewers:** [Engineering Team, Product Manager,
DevOps Lead]

---

## Metadata

- **Related Requirements:** [Link to requirements-brief.md]
- **Execution Pattern:** Foundational (see
  [AI-Assisted SDLC Stages](../framework-stages.md))
- **Primary Role:** Engineers / Solutions Architect
- **Supporting Roles:** Product Manager, QA Engineers, DevOps
- **Checkpoints:** Alignment Review, Gate 2
- **Gate:** Gate 2 (build/no-build decision after System Design + Requirements
  complete)

---

## 1. System Architecture Overview

### 1.1 System Context

**What to include:**

- System boundaries (in scope vs. external)
- Key actors (users, administrators, external systems)
- Major integrations (third-party APIs, databases, services)

_Use a simple context diagram (boxes and arrows). Focus on "what" not "how."_

[Describe your system context here]

---

### 1.2 System Architecture

**What to include:**

- Major components and their responsibilities
- Component relationships and communication patterns
- Deployment architecture (client, server, databases, caching, etc.)
- Architectural style (microservices, monolith, serverless, etc.)

_Use architecture diagrams (C4 model recommended). Show data flow between
components._

[Describe your system architecture here]

> For examples, see
> [System Design Reference: Design Brief Examples](system-design-reference.md#design-brief-examples).

---

## 2. Technology Stack

### 2.1 Technology Selections

| Category     | Choice               | Justification | ADR       |
| ------------ | -------------------- | ------------- | --------- |
| **Frontend** | [Framework]          | [Why]         | [ADR-XXX] |
| **Backend**  | [Language/Framework] | [Why]         | [ADR-XXX] |
| **Database** | [Database]           | [Why]         | [ADR-XXX] |
| **Cache**    | [Cache system]       | [Why]         | [ADR-XXX] |
| **Auth**     | [Auth approach]      | [Why]         | [ADR-XXX] |
| **Hosting**  | [Platform]           | [Why]         | [ADR-XXX] |
| **CI/CD**    | [Tool]               | [Why]         | -         |

Reference ADRs for detailed rationale, alternatives, and cost analysis. ADRs are
stored as separate files in `docs/adr/`.

---

### 2.2 Architecture Decision Records (ADRs)

**ADRs are separate files**, not embedded in this brief.

- **Directory:** `docs/adr/`
- **File naming:** `ADR-XXX-short-description.md`
- **Template:** [ADR Template](../adr-template.md)
- **Index:** `docs/adr/README.md`

| ADR     | Title   | Status   | Cost Impact |
| ------- | ------- | -------- | ----------- |
| ADR-001 | [Title] | [Status] | [Cost/year] |
| ADR-002 | [Title] | [Status] | [Cost/year] |

**Total infrastructure cost from ADRs:** $X/year

**Critical:** Research costs BEFORE creating ADRs.

---

## 3. Data Architecture

### 3.1 Data Model Overview

**What to include:**

- Key entities and relationships
- Data ownership and boundaries

_Use Entity-Relationship Diagrams or simple descriptions. Focus on business
entities._

[Describe your data model here]

---

### 3.2 Data Persistence Strategy

**What to include:**

- Database schema approach and data access patterns (ORM, raw SQL, query
  builders)
- Migration strategy
- Backup and disaster recovery approach
- Caching strategy

[Describe your persistence strategy here]

---

## 4. API Architecture

### 4.1 API Design Principles

- **Style:** [REST / GraphQL / gRPC]
- **Versioning:** [URL-based / header-based]
- **Authentication:** [JWT / OAuth / API keys]
- **Authorization:** [RBAC / ABAC]
- **Error Format:** [Standard error structure]
- **Rate Limiting:** [Limits per user/endpoint]

---

### 4.2 Integration Points

| Integration | Purpose   | Pattern   | Error Handling |
| ----------- | --------- | --------- | -------------- |
| [Service]   | [Purpose] | [Pattern] | [Strategy]     |

---

## 5. Security and Compliance Design

### 5.1 Security Architecture

- **Authentication:** [Mechanism]
- **Authorization:** [Approach and roles]
- **Encryption:** [In transit / at rest]
- **Input Validation:** [Approach]
- **Security Scanning:** [Tools]
- **Secrets Management:** [Approach]

---

### 5.2 Compliance Requirements

- **Regulations:** [GDPR / HIPAA / SOC 2 / etc.]
- **Data Residency:** [Requirements]
- **Audit Logging:** [Approach and retention]

---

## 6. Observability and Monitoring Design

### 6.1 Instrumentation Strategy

- **Logging:** [Approach, tool, centralization]
- **Metrics:** [Application + infrastructure metrics]
- **Tracing:** [Distributed tracing approach]
- **Dashboards:** [Monitoring dashboards]
- **Alerts:** [Alert tool and thresholds]

---

### 6.2 Success Criteria Measurement

| Success Criterion (from Initiation) | Metric   | Collection Method | Dashboard |
| ----------------------------------- | -------- | ----------------- | --------- |
| [Criterion]                         | [Metric] | [How collected]   | [Where]   |

---

## 7. Performance and Scalability Design

### 7.1 Performance Targets

- **API Response Time:** [p95 / p99 targets]
- **Page Load Time:** [FCP target]
- **Throughput:** [Requests/second]
- **Concurrency:** [Simultaneous users]
- **Database Query Time:** [p95 target]

---

### 7.2 Scalability Approach

- **Application Tier:** [Horizontal / vertical]
- **Stateless Design:** [Yes/No, approach]
- **Caching:** [Strategy and TTL]
- **Database Scaling:** [Replicas / sharding]
- **CDN:** [Static asset delivery]

---

## 8. Increment Plan

**What to include:**

- Increment definitions with requirements mappings
- Dependencies between increments
- Estimated duration and effort ranges for each
- Could Have evaluation approach

_Start with Must Haves. Be realistic about size (typically 1-3 weeks each). Make
Could Haves opportunistic._

### Increment 1: [Name] (Must Have)

**Goal:** [What this increment delivers]

**Requirements:** [FR-X, FR-Y, NFR-Z] **Duration:** [X-Y weeks] (estimate)
**Team:** [Composition] **Effort:** [X-Y person-weeks] (estimate)
**Dependencies:** [None / Increment N]

**Why first:** [Rationale for sequencing]

---

### Increment 2: [Name] ([Priority])

**Goal:** [What this increment delivers]

**Requirements:** [FR-X, FR-Y, NFR-Z] **Duration:** [X-Y weeks] (estimate)
**Team:** [Composition] **Effort:** [X-Y person-weeks] (estimate)
**Dependencies:** [Increment N]

_Add more increments as needed._

---

### Could Have Requirements (Opportunistic)

- [FR-X]: [Description]
  - **Evaluate in:** [Increment N]
  - **Effort if easy:** [Duration]
  - **Skip if:** [Condition]

---

### Won't Have (Out of Scope)

- [FR-X]: [Reason for exclusion]

---

### Increment Plan Summary

| Inc | Type       | Requirements | Duration | Effort  |
| --- | ---------- | ------------ | -------- | ------- |
| 1   | [Priority] | [FRs, NFRs]  | [Range]  | [Range] |
| 2   | [Priority] | [FRs, NFRs]  | [Range]  | [Range] |

**Total Must Have:** [Duration range], [Effort range] **Total Project:**
[Duration range], [Effort range]

> For detailed increment plan examples, see
> [System Design Reference: Increment Plan Example](system-design-reference.md#increment-plan-example).

---

### Gate 2 Decision Package

> **Purpose:** Provide executives and stakeholders with the information needed
> to make the build/no-build decision.

**Project Timeline:**

- **Must Have (minimum viable):** [Duration range]
- **Should Have (committed):** [Additional duration]
- **Total delivery:** [Total range]

**Effort Estimate:**

- **Must Have:** [Person-weeks range]
- **Should Have:** [Person-weeks range]
- **Total:** [Person-weeks range]

**Team Composition:**

- [Role and time commitment for each team member]

**Cost Calculation:**

Total effort range x hours/week x blended rate = project cost range.

| Blended Rate | Cost Range (estimate) |
| ------------ | --------------------- |
| $[X]/hour    | $[Low]-$[High]        |

**Infrastructure & Tooling Costs (Recurring):**

| Category   | Service   | Monthly Cost | Annual Cost |
| ---------- | --------- | ------------ | ----------- |
| Hosting    | [Service] | $X/month     | $X/year     |
| Database   | [Service] | $X/month     | $X/year     |
| Monitoring | [Service] | $X/month     | $X/year     |
| **TOTAL**  |           | **$X/month** | **$X/year** |

**One-Time Costs:** $X (setup, migration, licenses, training)

**Total Project Cost (First Year):**

- **Labor (one-time):** $X
- **Infrastructure (recurring):** $X/year
- **TOTAL YEAR 1:** $X
- **ONGOING (Years 2+):** $X/year

**Comparison to Initiation Estimate:**

- **Initiation estimate:** [Original range]
- **Design estimate:** [Refined range]
- **Key refinements:** [What changed and why]

**Risks and Mitigation:** [Top 3-5 risks with impact, probability, and
mitigation]

**Recommendation:**

- [ ] **Proceed** — Business case sound, cost acceptable
- [ ] **Pivot** — [What would change]
- [ ] **Stop** — [Why]

**Decision Rationale:** [1-2 paragraphs]

> For cost calculation examples and infrastructure cost templates, see
> [System Design Reference: Gate 2 Cost Calculation](system-design-reference.md#gate-2-cost-calculation-example).

---

## Checklist

Before proceeding to Gate 2, validate:

- [ ] System architecture addresses all requirements
- [ ] Technology stack justified with ADRs
- [ ] Increment plan created with boundaries
- [ ] Security and compliance addressed
- [ ] Observability and monitoring designed
- [ ] Performance and scalability defined
- [ ] Infrastructure plan complete
- [ ] Alignment Review conducted and approved

**Handoff to Increment Design:**

- [ ] Architecture documented for increment-level design
- [ ] Conventions established (API patterns, data access, error handling)
- [ ] Increment plan ready for detailed design work

---

## Notes

**Template Last Updated:** 2026-02-16

Added to framework in v0.12.0.
