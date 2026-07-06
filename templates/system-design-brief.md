<!-- For guidance on completing this brief, see ../stages/system-design/README.md -->

# System Design Brief

> **Before starting a session on this brief:** follow the steps in
> [Session Protocol](../guides/session-protocol.md). Check it at session start
> so nothing is missed as the protocol evolves.

> **Stage guide:** [System Design](../stages/system-design/README.md)

> **Convention:** Flag unverified assumptions with `[ASSUMED]` throughout the
> brief for gate reviewers to audit. During review, each `[ASSUMED]` item should
> be **confirmed** (verified — remove tag), **challenged** (incorrect — update
> and remove tag), or **carried forward** (unverifiable now — leave tag and note
> as a gate condition).

> **Tier annotations:** Sections marked
> `<!-- Minimal: skip this section entirely -->` should be omitted in full — do
> not write N/A. Sections marked
> `<!-- Minimal: ... | Standard: ... | Enterprise: ... -->` indicate how to
> adapt the section's content depth for your project tier. Annotations are HTML
> comments and are invisible in rendered output.

**Last Updated:** YYYY-MM-DD

---

**Project Name:** [Project Name] **Date:** [YYYY-MM-DD] **Author(s):** [Lead
Architect / Engineering Lead] **Reviewers:** [Engineering Team, Product Manager,
DevOps Lead, Project Manager]

---

## Metadata

- **Related Requirements:** [Link to requirements-brief.md]
- **Execution Pattern:** Foundational (see
  [Seichi Framework Stages](../guides/stages.md))
- **Primary Role:** Architect
- **Supporting Roles:** Product Manager, QA Engineers, DevOps, Project Manager
- **Checkpoints:** Alignment, Gate 2
- **Gate:** Gate 2 (build/no-build decision after System Design + Requirements
  complete)

---

## 1. System Architecture Overview

### 1.1 Architecture Principles

<!-- List the guiding principles that shaped this design (e.g., "Prefer managed
     services over self-hosted", "Minimize cross-service dependencies"). Omit if
     the project has no explicit architecture principles. -->

- [Principle 1: description and rationale]
- [Principle 2: description and rationale]

### 1.2 System Context

<!-- Minimal: Simple context sketch | Standard: C4 context diagram | Enterprise: Context + container diagrams -->

[Describe your system context here]

### 1.3 System Architecture

<!-- Minimal: Informal component notes | Standard: C4 container diagram with data flow | Enterprise: Formal architecture with stakeholder sign-off -->

[Describe your system architecture here]

<!-- For examples, see ../stages/system-design/reference.md#design-brief-examples -->

---

## 2. Architecture Decision Records (ADRs)

<!-- Minimal: inline decision notes in this brief using a '### Decision: [topic]'
     sub-heading per decision rather than separate files in docs/adr/ -->
<!-- ADRs are separate files stored in docs/adr/ — not embedded in this brief -->
<!-- Use draft numbering (ADR-DCC) during System Design; renumber at Gate 2  -->

> **Visual architecture:** If the project has a UI, design-system, token,
> component-library, and responsive-strategy decisions are ADR candidates — see
> [System Design Guide: Visual Architecture](../stages/system-design/README.md#visual-architecture).

- **Directory:** `docs/adr/`
- **File naming:** `ADR-DCC.md` (draft prefix with two-digit counter during
  design; title is in the ADR heading, not the filename)
- **Template:** [ADR Template](adr.md)
- **Index:** `docs/adr/README.md`

| ADR     | Title   | Category | Status   |
| ------- | ------- | -------- | -------- |
| ADR-D01 | [Title] | [Area]   | [Status] |
| ADR-D02 | [Title] | [Area]   | [Status] |

Reference individual ADRs from the relevant sections below (Technology Stack,
Data Architecture, API Architecture, etc.).

---

## 3. Technology Stack

<!-- Minimal: omit rows that don't apply to your architecture — a CLI tool has no
     Frontend, Cache, or Hosting rows; delete inapplicable rows rather than
     writing N/A | Standard: evaluate options, reference ADRs | Enterprise:
     formal evaluation matrix -->

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

> **Right-sizing:** Minimal — skip this section entirely if the system has no
> external API surface or inter-service integration.

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

### 5.3 System-Level Interface Contracts

> **Right-sizing:** Minimal — skip this section entirely. System-level interface
> contracts apply to multi-service architectures.

| Interface     | Provider    | Consumer    | Contract Format | Versioning |
| ------------- | ----------- | ----------- | --------------- | ---------- |
| [API / Event] | [Component] | [Component] | [OpenAPI / etc] | [Strategy] |

- **Contract testing approach:** [How contracts are validated — e.g.,
  consumer-driven contract tests, schema validation]
- **Breaking change policy:** [How breaking changes are communicated and
  managed]

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

> **Right-sizing:** Minimal — skip this section entirely for local-only or
> non-production tools with no infrastructure monitoring. Note logging approach
> in Section 1 if relevant.

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

> **Right-sizing:** Minimal — skip this section entirely for non-production
> tools. Record known performance constraints as NFRs in Section 9 instead.

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

## 9. NFR Traceability

| NFR ID | Description            | Architectural Approach      | ADR     | Verification Method      |
| ------ | ---------------------- | --------------------------- | ------- | ------------------------ |
| NFR-1  | p95 response < 200ms   | CDN + Redis caching layer   | ADR-D06 | Load test in Increment 2 |
| NFR-2  | Data encrypted at rest | AES-256 via managed service | ADR-D03 | Security scan + audit    |

---

## 10. Versioning Strategy

<!-- Most relevant for greenfield projects. Brownfield projects with existing
     conventions should document and follow them rather than inventing new ones. -->

- **App Versioning Scheme:** [e.g., Semantic Versioning (MAJOR.MINOR.PATCH),
  CalVer, custom]
- **API Versioning Approach:** [e.g., URL path (/v1/), header-based, query
  parameter; backward compatibility policy]
- **Release Tagging Convention:** [e.g., v1.2.3 git tags, branch strategy for
  releases]
- **Changelog Approach:** [e.g., automated from commits, manually curated,
  hybrid; audience and cadence]

---

## 11. Increment Plan

<!-- Minimal: Ordered task list | Standard: Sequenced increments with dependencies | Enterprise: Formal roadmap -->

### Increment 0: [Bootstrap / Discovery] (if applicable)

<!-- Include when: greenfield needs bootstrap, or brownfield first AI-assisted needs discovery -->
<!-- See ../stages/system-design/README.md#infrastructure-planning -->

**Goal:** [Establish infrastructure (greenfield) / Document existing system for
AI context (brownfield first AI)]

**Value Delivered:** [What users or the project gains when this increment ships]

**Requirements:** [Infrastructure NFRs / Discovery scope] **Duration:** [X-Y
weeks] (estimate) **Team:** [Composition] **Effort:** [X-Y person-weeks]
(estimate) **Dependencies:** None

**Why first:** [Foundation must exist before feature delivery can begin]

#### Brownfield Readiness Assessment (refined)

> **Right-sizing:** Greenfield projects — omit this sub-section entirely. It
> applies only to brownfield first-AI-assisted increments.

<!-- Include for brownfield first AI-assisted projects. Refine the Initiation
     assessment with evidence gathered during System Design discovery. -->

| Axis            | Initiation Score  | Refined Score | Evidence                                    |
| --------------- | ----------------- | ------------- | ------------------------------------------- |
| Verifiability   | [from initiation] | [updated]     | [e.g., measured 62% line coverage]          |
| Modularity      | [from initiation] | [updated]     | [e.g., service boundaries leak in 2 areas]  |
| Discoverability | [from initiation] | [updated]     | [e.g., 3 of 7 services documented]          |
| Transparency    | [from initiation] | [updated]     | [e.g., 12 stored procs with business logic] |
| Consistency     | [from initiation] | [updated]     | [e.g., 2 conflicting patterns in API layer] |

**Readiness change:** [Summary of how assessment changed from Initiation — e.g.,
"Verifiability moved from 2 to 3 after measuring 62% coverage; Transparency
remains at 1 — 12 stored procedures with undocumented business logic"]

**Impact on Increment 0:** [How refined assessment changes Increment 0 scope,
duration, or deliverables]

### Increment 1: [Name] (Must Have)

**Goal:** [What this increment delivers]

**Value Delivered:** [What users or the project gains when this increment ships]

**Requirements:** [FR-X, FR-Y, NFR-Z] **Duration:** [X-Y weeks] (estimate)
**Team:** [Composition] **Effort:** [X-Y person-weeks] (estimate)
**Dependencies:** [None / Increment 0]

**Why first:** [Rationale for sequencing]

### Increment 2: [Name] ([Priority])

**Goal:** [What this increment delivers]

**Value Delivered:** [What users or the project gains when this increment ships]

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

| Inc | Type                  | Value Delivered | Requirements    | Duration | Effort  | Dependencies |
| --- | --------------------- | --------------- | --------------- | -------- | ------- | ------------ |
| 0   | Bootstrap / Discovery | [Short phrase]  | [If applicable] | [Range]  | [Range] | None         |
| 1   | [Priority]            | [Short phrase]  | [FRs, NFRs]     | [Range]  | [Range] | [Inc N]      |
| 2   | [Priority]            | [Short phrase]  | [FRs, NFRs]     | [Range]  | [Range] | [Inc N]      |

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
- [ ] **Proceed with conditions** — [conditions to carry forward as tracked
      obligations]
- [ ] **Revise** — [What would change]
- [ ] **Stop** — [Why]

**Decision Rationale:** [1-2 paragraphs]

<!-- For cost examples, see ../stages/system-design/reference.md#gate-2-cost-calculation-example -->

---

## 12. Infrastructure Plan

> **Right-sizing:** Minimal — skip this section entirely for local-only tools
> with no deployment infrastructure. Record the skip rationale in Stage Skip
> Decisions below.

<!-- Scale to project tier:
     Minimal: brief notes on hosting and deployment approach
     Standard: CI/CD pipeline, environment strategy, infrastructure components
     Enterprise: full infrastructure architecture with DR, scaling, and compliance -->

**Hosting / Deployment:** [Cloud provider, service type, region strategy]

**Environments:** [Development, Staging, Production — access controls and
promotion strategy]

**CI/CD Pipeline:** [Build, test, deploy stages — tool choices and automation
level]

**Infrastructure as Code:** [Terraform, Pulumi, CloudFormation — or N/A with
justification]

**Scaling Strategy:** [Horizontal/vertical, auto-scaling triggers, capacity
planning]

**Disaster Recovery:** [RPO/RTO targets, backup strategy, failover approach —
Enterprise tier]

---

## Stage Skip Decisions (if applicable)

<!-- Record any downstream stages that are skipped for this project, with
     rationale. This section is the formal skip record referenced by Gate 2.
     Omit this section entirely if no stages are being skipped. -->

| Stage                | Skipped?   | Rationale                                                            |
| -------------------- | ---------- | -------------------------------------------------------------------- |
| Deployment (Stage 7) | [Yes / No] | [e.g., local-only tool; no deployment infrastructure]                |
| Closure (Stage 8)    | [Yes / No] | [e.g., disposable experiment; no formal close-out or handoff needed] |

---

## Open Questions

<!-- Tag each question with the consulted role (e.g., @Architect, @AppSec).
     See guides/roles.md#consultation-protocol -->

- **Q1:** [@Role]
- **Q2:** [@Role]

---

## Self-Validation Against System Design Checklist

<!-- Before submitting for gate review, self-assess against the System Design
     Checklist. This catches issues before formal review and improves
     first-pass quality. -->

- [ ] Pre-filled [System Design Checklist](../stages/system-design/checklist.md)
      with self-assessment and evidence for each item
- **Items needing attention:** [List any items that don't fully pass]

<!-- Template Last Updated: 2026-07-05 | Added in v0.12.0. -->
