<!-- For guidance on completing this brief, see system-design/README.md -->

# System Design Brief

> **Convention:** Flag unverified assumptions with `[ASSUMED]` throughout the
> brief for gate reviewers to audit.

**Last Updated:** YYYY-MM-DD

---

**Project Name:** [Project Name] **Date:** [YYYY-MM-DD] **Author(s):** [Lead
Architect / Engineering Lead] **Reviewers:** [Engineering Team, Product Manager,
DevOps Lead]

---

## Metadata

- **Related Requirements:** [Link to requirements-brief.md]
- **Execution Pattern:** Foundational (see
  [AI-Assisted SDLC Stages](../guides/stages.md))
- **Primary Role:** Engineers / Solutions Architect
- **Supporting Roles:** Product Manager, QA Engineers, DevOps
- **Checkpoints:** Alignment Review, Gate 2
- **Gate:** Gate 2 (build/no-build decision after System Design + Requirements
  complete)

---

## 1. System Architecture Overview

### 1.1 System Context

<!-- Minimal: Simple context sketch | Standard: C4 context diagram | Enterprise: Context + container diagrams -->

[Describe your system context here]

### 1.2 System Architecture

<!-- Minimal: Informal component notes | Standard: C4 container diagram with data flow | Enterprise: Formal architecture with stakeholder sign-off -->

[Describe your system architecture here]

<!-- For examples, see ../stages/system-design/reference.md#design-brief-examples -->

---

## 2. Architecture Decision Records (ADRs)

<!-- ADRs are separate files stored in docs/adr/ — not embedded in this brief -->
<!-- docs/adr/ is a project-level location you create in your own repository -->

- **Directory:** `docs/adr/`
- **File naming:** `ADR-XXX-short-description.md`
- **Template:** [ADR Template](adr.md)
- **Index:** `docs/adr/README.md`

| ADR     | Title   | Category | Status   |
| ------- | ------- | -------- | -------- |
| ADR-001 | [Title] | [Area]   | [Status] |
| ADR-002 | [Title] | [Area]   | [Status] |

Reference individual ADRs from the relevant sections below (Technology Stack,
Data Architecture, API Architecture, etc.).

---

## 3. Technology Stack

<!-- Minimal: Document briefly | Standard: Evaluate options, reference ADRs | Enterprise: Formal evaluation matrix -->

| Category     | Choice   | Justification   | ADR     |
| ------------ | -------- | --------------- | ------- |
| **Frontend** | [Choice] | [Justification] | ADR-XXX |
| **Backend**  | [Choice] | [Justification] | ADR-XXX |
| **Database** | [Choice] | [Justification] | ADR-XXX |
| **Cache**    | [Choice] | [Justification] | ADR-XXX |
| **Auth**     | [Choice] | [Justification] | ADR-XXX |
| **Hosting**  | [Choice] | [Justification] | ADR-XXX |
| **CI/CD**    | [Choice] | [Justification] | -       |

---

## 4. Data Architecture

### 4.1 Data Model Overview

<!-- Minimal: Key entities listed | Standard: ER diagram | Enterprise: Full data model with ownership -->

[Describe your data model here]

### 4.2 Data Persistence Strategy

<!-- Minimal: Database choice noted | Standard: Schema approach + migration strategy | Enterprise: Full persistence strategy with DR -->

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

### 6.2 Compliance Requirements

- **Regulations:** [GDPR / HIPAA / SOC 2 / etc.]
- **Data Residency:** [Requirements]
- **Audit Logging:** [Approach and retention]

### Threat Model (Standard and Enterprise tiers)

<!-- Minimal: Skip | Standard: Key threats identified | Enterprise: Full STRIDE analysis -->

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

### 8.2 Scalability Approach

- **Application Tier:** [Horizontal / vertical]
- **Stateless Design:** [Yes/No, approach]
- **Caching:** [Strategy and TTL]
- **Database Scaling:** [Replicas / sharding]
- **CDN:** [Static asset delivery]

---

## NFR Traceability

| NFR ID | Description            | Architectural Approach      | ADR   | Verification Method      |
| ------ | ---------------------- | --------------------------- | ----- | ------------------------ |
| NFR-1  | p95 response < 200ms   | CDN + Redis caching layer   | ADR-6 | Load test in Increment 2 |
| NFR-2  | Data encrypted at rest | AES-256 via managed service | ADR-3 | Security scan + audit    |

---

## 9. Increment Plan

<!-- Minimal: Ordered task list | Standard: Sequenced increments with dependencies | Enterprise: Formal roadmap -->

### Increment 0: [Bootstrap / Discovery] (if applicable)

<!-- Include when: greenfield needs bootstrap, or brownfield first AI-assisted needs discovery -->
<!-- See ../system-design/README.md#infrastructure-planning -->

**Goal:** [Establish infrastructure (greenfield) / Document existing system for
AI context (brownfield first AI)]

**Requirements:** [Infrastructure NFRs / Discovery scope] **Duration:** [X-Y
weeks] (estimate) **Team:** [Composition] **Effort:** [X-Y person-weeks]
(estimate) **Dependencies:** None

**Why first:** [Foundation must exist before feature delivery can begin]

### Increment 1: [Name] (Must Have)

**Goal:** [What this increment delivers]

**Requirements:** [FR-X, FR-Y, NFR-Z] **Duration:** [X-Y weeks] (estimate)
**Team:** [Composition] **Effort:** [X-Y person-weeks] (estimate)
**Dependencies:** [None / Increment 0]

**Why first:** [Rationale for sequencing]

### Increment 2: [Name] ([Priority])

**Goal:** [What this increment delivers]

**Requirements:** [FR-X, FR-Y, NFR-Z] **Duration:** [X-Y weeks] (estimate)
**Team:** [Composition] **Effort:** [X-Y person-weeks] (estimate)
**Dependencies:** [Increment N]

### Could Have Requirements (Opportunistic)

- [FR-X]: [Description]
  - **Evaluate in:** [Increment N]
  - **Effort if easy:** [Duration]
  - **Skip if:** [Condition]

### Won't Have (Out of Scope)

- [FR-X]: [Reason for exclusion]

### Increment Plan Summary

| Inc | Type                  | Requirements    | Duration | Effort  |
| --- | --------------------- | --------------- | -------- | ------- |
| 0   | Bootstrap / Discovery | [If applicable] | [Range]  | [Range] |
| 1   | [Priority]            | [FRs, NFRs]     | [Range]  | [Range] |
| 2   | [Priority]            | [FRs, NFRs]     | [Range]  | [Range] |

**Total Must Have:** [Duration range], [Effort range] **Total Project:**
[Duration range], [Effort range]

<!-- For examples, see ../stages/system-design/reference.md#increment-plan-example -->

### Gate 2 Decision Package

<!-- Record the decision using templates/gate-decision.md -->

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

<!-- For cost examples, see ../stages/system-design/reference.md#gate-2-cost-calculation-example -->

---

## Self-Validation Against System Design Checklist

<!-- Before submitting for gate review, self-assess against the System Design
     Checklist. This catches issues before formal review and improves
     first-pass quality. -->

- [ ] Pre-filled [System Design Checklist](../stages/system-design/checklist.md)
      with self-assessment and evidence for each item
- **Items needing attention:** [List any items that don't fully pass]

<!-- Template Last Updated: 2026-03-03 | Added in v0.12.0 -->
