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

## 2. Architecture Decision Records (ADRs)

ADRs document significant decisions across all aspects of the architecture —
technology stack, data, API, security, infrastructure, and more. They are
**separate files**, not embedded in this brief.

> **Project artifact note:** `docs/adr/` is a project-level location you create
> in your own repository when applying this framework. It is not a directory
> shipped under `framework/`.

- **Directory:** `docs/adr/`
- **File naming:** `ADR-XXX-short-description.md`
- **Template:** [ADR Template](../adr-template.md)
- **Index:** `docs/adr/README.md`

| ADR     | Title   | Category | Status   |
| ------- | ------- | -------- | -------- |
| ADR-001 | [Title] | [Area]   | [Status] |
| ADR-002 | [Title] | [Area]   | [Status] |

Reference individual ADRs from the relevant sections below (Technology Stack,
Data Architecture, API Architecture, etc.).

---

## 3. Technology Stack

**What to include:**

- Frontend framework and language
- Backend language and framework
- Database and data storage
- Caching layer
- Authentication and authorization approach
- Hosting and cloud platform
- CI/CD tooling

_For each selection, document the choice, justification, and reference the
relevant ADR._

[Describe your technology stack here]

---

## 4. Data Architecture

### 4.1 Data Model Overview

**What to include:**

- Key entities and relationships
- Data ownership and boundaries

_Use Entity-Relationship Diagrams or simple descriptions. Focus on business
entities._

[Describe your data model here]

---

### 4.2 Data Persistence Strategy

**What to include:**

- Database schema approach and data access patterns (ORM, raw SQL, query
  builders)
- Migration strategy
- Backup and disaster recovery approach
- Caching strategy

_Document significant data decisions (database selection, schema approach) in
ADRs._

[Describe your persistence strategy here]

---

## 5. API Architecture

### 5.1 API Design Principles

- **Style:** [REST / GraphQL / gRPC]
- **Versioning:** [URL-based / header-based]
- **Authentication:** [JWT / OAuth / API keys]
- **Authorization:** [RBAC / ABAC]
- **Error Format:** [Standard error structure]
- **Rate Limiting:** [Limits per user/endpoint]

_Document significant API decisions (style, versioning strategy) in ADRs._

---

### 5.2 Integration Points

| Integration | Purpose   | Pattern   | Error Handling |
| ----------- | --------- | --------- | -------------- |
| [Service]   | [Purpose] | [Pattern] | [Strategy]     |

---

## 6. Security and Compliance Design

### 6.1 Security Architecture

- **Authentication:** [Mechanism]
- **Authorization:** [Approach and roles]
- **Encryption:** [In transit / at rest]
- **Input Validation:** [Approach]
- **Security Scanning:** [Tools]
- **Secrets Management:** [Approach]

_Document significant security decisions (auth mechanism, encryption approach,
secrets management) in ADRs._

---

### 6.2 Compliance Requirements

- **Regulations:** [GDPR / HIPAA / SOC 2 / etc.]
- **Data Residency:** [Requirements]
- **Audit Logging:** [Approach and retention]

---

### Threat Model (Standard and Enterprise tiers)

Identify threats using STRIDE or equivalent methodology:

| Asset / Surface  | Threat (STRIDE) | Likelihood | Impact | Mitigation        | NFR Ref |
| ---------------- | --------------- | ---------- | ------ | ----------------- | ------- |
| [e.g., Auth API] | Spoofing        | Medium     | High   | JWT + rate limits | NFR-3   |

Link each mitigation to an NFR so it is traceable through Verification.

---

## 7. Observability and Monitoring Design

### 7.1 Instrumentation Strategy

- **Logging:** [Approach, tool, centralization]
- **Metrics:** [Application + infrastructure metrics]
- **Tracing:** [Distributed tracing approach]
- **Dashboards:** [Monitoring dashboards]
- **Alerts:** [Alert tool and thresholds]

_Document significant observability decisions (stack selection, retention
policies) in ADRs._

---

### 7.2 Success Criteria Measurement

| Success Criterion (from Initiation) | Metric   | Collection Method | Dashboard |
| ----------------------------------- | -------- | ----------------- | --------- |
| [Criterion]                         | [Metric] | [How collected]   | [Where]   |

---

## 8. Performance and Scalability Design

### 8.1 Performance Targets

- **API Response Time:** [p95 / p99 targets]
- **Page Load Time:** [FCP target]
- **Throughput:** [Requests/second]
- **Concurrency:** [Simultaneous users]
- **Database Query Time:** [p95 target]

---

### 8.2 Scalability Approach

- **Application Tier:** [Horizontal / vertical]
- **Stateless Design:** [Yes/No, approach]
- **Caching:** [Strategy and TTL]
- **Database Scaling:** [Replicas / sharding]
- **CDN:** [Static asset delivery]

_Document significant scaling decisions (horizontal vs. vertical, sharding
strategy) in ADRs._

---

## NFR Traceability

| NFR ID | Description            | Architectural Approach      | ADR   | Verification Method      |
| ------ | ---------------------- | --------------------------- | ----- | ------------------------ |
| NFR-1  | p95 response < 200ms   | CDN + Redis caching layer   | ADR-6 | Load test in Increment 2 |
| NFR-2  | Data encrypted at rest | AES-256 via managed service | ADR-3 | Security scan + audit    |

---

## 9. Increment Plan

**What to include:**

- Increment definitions with requirements mappings
- Dependencies between increments
- Estimated duration and effort ranges for each
- Could Have evaluation approach

_Start with Must Haves. Be realistic about size (typically 1-3 weeks each). Make
Could Haves opportunistic._

### Increment 0: [Bootstrap / Discovery] (if applicable)

> **Include Increment 0 when:** greenfield projects need infrastructure
> bootstrap, or brownfield first AI-assisted projects need discovery and
> documentation. Subsequent brownfield projects skip Increment 0 and begin at
> Increment 1. See
> [System Design Guide: Infrastructure Planning](system-design-guide.md#infrastructure-planning).

**Goal:** [Establish infrastructure (greenfield) / Document existing system for
AI context (brownfield first AI)]

**Requirements:** [Infrastructure NFRs / Discovery scope] **Duration:** [X-Y
weeks] (estimate) **Team:** [Composition] **Effort:** [X-Y person-weeks]
(estimate) **Dependencies:** None

**Why first:** [Foundation must exist before feature delivery can begin]

---

### Increment 1: [Name] (Must Have)

**Goal:** [What this increment delivers]

**Requirements:** [FR-X, FR-Y, NFR-Z] **Duration:** [X-Y weeks] (estimate)
**Team:** [Composition] **Effort:** [X-Y person-weeks] (estimate)
**Dependencies:** [None / Increment 0]

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

| Inc | Type                  | Requirements    | Duration | Effort  |
| --- | --------------------- | --------------- | -------- | ------- |
| 0   | Bootstrap / Discovery | [If applicable] | [Range]  | [Range] |
| 1   | [Priority]            | [FRs, NFRs]     | [Range]  | [Range] |
| 2   | [Priority]            | [FRs, NFRs]     | [Range]  | [Range] |

**Total Must Have:** [Duration range], [Effort range] **Total Project:**
[Duration range], [Effort range]

> For detailed increment plan examples, see
> [System Design Reference: Increment Plan Example](system-design-reference.md#increment-plan-example).

---

### Gate 2 Decision Package

> **Purpose:** Provide executives and stakeholders with the information needed
> to make the build/no-build decision. Record the decision using the
> [Gate Decision Template](../gate-decision-template.md).

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

**Template Last Updated:** 2026-02-21

Added to framework in v0.12.0.
