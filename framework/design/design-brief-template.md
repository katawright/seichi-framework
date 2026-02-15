# Design Brief

**Last Updated:** 2026-02-15

---

**Project Name:** [Project Name] **Design Type:** [ ] Foundational (Initial
Architecture) | [ ] Iterative (Increment Detail) **Date:** [YYYY-MM-DD]
**Author(s):** [Lead Architect / Engineering Lead] **Reviewers:** [Engineering
Team, Product Manager, DevOps Lead]

---

## Metadata

- **Related Requirements:** [Link to requirements-brief.md]
- **Increment:** [If iterative: Increment number/name] | [If foundational: N/A]
- **Execution Pattern:** Foundational + Iterative (see
  [STAGES.md](../../STAGES.md))
- **Primary Role:** Engineers / Solutions Architect
- **Supporting Roles:** Product Manager, QA Engineers, DevOps
- **Checkpoints:** Alignment Review (foundational), Quality Checkpoint
  (iterative, optional)
- **Gate:** Gate 2 (build/no-build decision after foundational design +
  requirements complete)

---

# Part A: Foundational Design (Complete Once per Project)

> **Purpose:** Establish the system architecture, technology choices, and
> increment plan that will guide all implementation work.
>
> **When to complete:** After Requirements stage, before first increment
> implementation.
>
> **Complete this section once** at the start of the project. This creates the
> architectural foundation for all subsequent increments.

---

## 1. System Architecture Overview

### 1.1 System Context

**What it is:** High-level view of the system and its external interactions
(users, systems, services).

**What to include:**

- System boundaries (what's in scope, what's external)
- Key actors (users, administrators, external systems)
- Major integrations (third-party APIs, databases, services)

**Guidance:**

- Use a simple context diagram (boxes and arrows)
- Focus on "what" not "how"
- Keep it understandable to non-technical stakeholders

**Example:**

```
[System Context Diagram or Description]

Actors:
- End Users: Access via web browser
- Administrators: Manage system via admin portal
- Payment Service: External Stripe API for payments
- Email Service: SendGrid for transactional emails

External Systems:
- Authentication: Auth0 for user identity
- Analytics: Google Analytics for usage tracking
```

---

### 1.2 System Architecture

**What it is:** How the system is structured internally (components, layers,
modules).

**What to include:**

- Major components and their responsibilities
- Component relationships and communication patterns
- Deployment architecture (client, server, databases, caching, etc.)

**Guidance:**

- Use architecture diagrams (C4 model, layered architecture, etc.)
- Show data flow between components
- Explain architectural style (microservices, monolith, serverless, etc.)

**Example:**

```
Architecture Style: Three-tier web application

Components:
1. Frontend (React SPA)
   - User interface
   - Client-side routing
   - API client

2. Backend API (Node.js/Express)
   - REST API endpoints
   - Business logic
   - Authentication/authorization
   - Data access layer

3. Database (PostgreSQL)
   - Relational data storage
   - User data, content, transactions

4. Cache (Redis)
   - Session storage
   - API response caching

5. Background Jobs (Bull/Redis)
   - Async processing (emails, reports)
```

---

## 2. Technology Stack

### 2.1 Technology Selections

**What it is:** Specific languages, frameworks, platforms, and tools chosen for
the project.

**What to include:**

- Programming languages
- Frameworks and libraries
- Database(s)
- Infrastructure and hosting
- Development tools

**Guidance:**

- Justify each major choice (why this over alternatives?)
- Consider team skills, organizational standards, long-term maintenance
- Document trade-offs

**Example:**

| Category        | Choice                 | Justification                    | ADR     |
| --------------- | ---------------------- | -------------------------------- | ------- |
| **Frontend**    | React 18               | Team expertise, large ecosystem  | ADR-004 |
| **Backend**     | Node.js 20 + Express   | JavaScript full-stack, async I/O | ADR-005 |
| **Database**    | PostgreSQL 15          | ACID compliance, relational data | ADR-001 |
| **Cache**       | Redis 7                | In-memory speed, pub/sub support | ADR-006 |
| **File Upload** | Presigned URLs         | Cost-effective, scalable         | ADR-002 |
| **Auth**        | JWT tokens             | Stateless, widely supported      | ADR-003 |
| **Hosting**     | Cloud managed services | Scalability, reduced ops burden  | ADR-007 |
| **CI/CD**       | GitHub Actions         | Integrated with repo, free tier  | -       |

**Note:** Reference ADRs (Architecture Decision Records) for detailed rationale,
alternatives considered, and cost analysis. ADRs are stored as separate files in
`docs/adr/` directory.

---

### 2.2 Architecture Decision Records (ADRs)

**What it is:** Documentation of significant architectural decisions and the
reasoning behind them.

**⚠️ Important:** ADRs are **separate files**, not embedded in this
design-brief.

**Where ADRs live:**

- **Directory:** `docs/adr/` in your project repository
- **File naming:** `ADR-XXX-short-description.md`
  - Example: `ADR-001-database-selection.md`
  - Example: `ADR-002-file-upload-mechanism.md`
- **Template:** Use `design-adr-template.md` from the framework
- **Index:** Create `docs/adr/README.md` listing all ADRs with status

**What to include in each ADR:**

- Context and problem statement
- Options considered with **cost analysis** (critical!)
- Decision and rationale
- Consequences (positive, negative, cost implications)
- Alternatives and why not chosen
- References to requirements, vendor docs, pricing pages

**When to create an ADR:**

- Significant technology choices (database, framework, cloud platform)
- Architecture style decisions (monolith, microservices, serverless)
- Security or compliance approaches
- Infrastructure choices with cost implications (managed services, hosting)
- Integration patterns (API design, message queues, caching)
- Any decision that's hard to reverse or impacts multiple components

**Example ADR list for this project:**

| ADR     | Title                                  | Status   | Cost Impact   |
| ------- | -------------------------------------- | -------- | ------------- |
| ADR-001 | Database Selection (PostgreSQL)        | Accepted | ~$3-6K/year   |
| ADR-002 | File Upload Mechanism (Presigned URLs) | Accepted | ~$60-180/year |
| ADR-003 | Authentication Approach (JWT)          | Accepted | Minimal       |
| ADR-004 | Frontend Framework (React)             | Accepted | Free (OSS)    |
| ADR-005 | Backend Framework (Express)            | Accepted | Free (OSS)    |
| ADR-006 | Caching Strategy (Redis)               | Accepted | ~$1-2K/year   |
| ADR-007 | Hosting Platform Selection             | Accepted | ~$5-10K/year  |

**Total infrastructure cost from ADRs:** ~$9-18K/year (included in Gate 2
Decision Package)

**ADR Index:** For full details on each architectural decision including
alternatives considered, trade-offs, and cost analysis, see:

- `docs/adr/README.md` - Index of all ADRs
- `docs/adr/ADR-001-database-selection.md`
- `docs/adr/ADR-002-file-upload-mechanism.md`
- `docs/adr/ADR-003-authentication-approach.md`
- etc.

**Critical reminder:** Research costs BEFORE creating ADRs to prevent surprises
like discovering a managed service costs 20x more than expected after committing
to it.

---

## 3. Data Architecture

### 3.1 Data Model Overview

**What it is:** High-level view of data entities and relationships.

**What to include:**

- Key entities (users, products, orders, etc.)
- Relationships (one-to-many, many-to-many)
- Data ownership and boundaries

**Guidance:**

- Use Entity-Relationship Diagrams (ERD) or simple descriptions
- Focus on business entities, not implementation details
- Show how data maps to requirements

**Example:**

```
Core Entities:
- User: id, email, name, role, created_at
- Post: id, user_id, title, content, status, created_at
- Comment: id, post_id, user_id, content, created_at
- Tag: id, name

Relationships:
- User has many Posts (one-to-many)
- Post has many Comments (one-to-many)
- Post has many Tags (many-to-many via post_tags join table)
```

---

### 3.2 Data Persistence Strategy

**What it is:** How data is stored, accessed, and managed.

**What to include:**

- Database schema approach
- Data access patterns (ORM, raw SQL, query builders)
- Migration strategy
- Backup and disaster recovery approach

**Guidance:**

- Consider read vs. write patterns
- Plan for schema evolution
- Address data retention and deletion policies

**Example:**

- **ORM:** Sequelize for Node.js
- **Migrations:** Version-controlled via Sequelize CLI
- **Backup:** Daily automated RDS snapshots (7-day retention)
- **Data Access:** Repository pattern with Sequelize models
- **Caching:** Redis for frequently-read data (user sessions, post lists)

---

## 4. API Architecture

### 4.1 API Design Principles

**What it is:** Standards and conventions for API design across the system.

**What to include:**

- API style (REST, GraphQL, gRPC)
- Versioning strategy
- Authentication and authorization approach
- Error handling conventions

**Guidance:**

- Establish patterns to ensure consistency
- Document standards for the team to follow
- Consider API evolution and backward compatibility

**Example:**

- **Style:** RESTful JSON API
- **Versioning:** URL-based (e.g., /api/v1/users)
- **Authentication:** JWT tokens (Auth0)
- **Authorization:** Role-based access control (RBAC)
- **Error Format:** JSON with `{error: {code, message, details}}`
- **Rate Limiting:** 100 requests/minute per user

---

### 4.2 Integration Points

**What it is:** How the system integrates with external services and APIs.

**What to include:**

- Third-party APIs and SDKs
- Integration patterns (webhooks, polling, events)
- Error handling and retry logic
- Authentication to external services

**Guidance:**

- Document each integration's purpose and data flow
- Plan for integration failures (fallbacks, retries)
- Consider rate limits and quotas

**Example:**

| Integration      | Purpose             | Pattern             | Error Handling                              |
| ---------------- | ------------------- | ------------------- | ------------------------------------------- |
| Auth0            | User authentication | OAuth 2.0           | Fallback to local auth if Auth0 unavailable |
| Stripe           | Payment processing  | REST API + webhooks | Retry with exponential backoff              |
| SendGrid         | Email delivery      | REST API            | Queue for retry if API down                 |
| Google Analytics | Usage tracking      | Client-side SDK     | Fail silently if blocked                    |

---

## 5. Security and Compliance Design

### 5.1 Security Architecture

**What it is:** How the system protects data and prevents unauthorized access.

**What to include:**

- Authentication and authorization mechanisms
- Data encryption (at rest, in transit)
- Input validation and sanitization
- Security scanning and monitoring

**Guidance:**

- Address OWASP Top 10 vulnerabilities
- Plan for least-privilege access
- Document security controls and safeguards

**Example:**

- **Authentication:** JWT tokens via Auth0 (OAuth 2.0)
- **Authorization:** RBAC with roles: Admin, User, Guest
- **Encryption:** TLS 1.3 in transit, AES-256 at rest (RDS encryption)
- **Input Validation:** Server-side validation on all inputs, parameterized
  queries
- **Security Scanning:** Dependabot for dependency vulnerabilities, OWASP ZAP
  for penetration testing
- **Secrets Management:** AWS Secrets Manager for API keys, DB credentials

---

### 5.2 Compliance Requirements

**What it is:** Regulatory, legal, or organizational compliance needs.

**What to include:**

- Relevant regulations (GDPR, HIPAA, SOC 2, etc.)
- Data residency and sovereignty requirements
- Audit logging and retention

**Guidance:**

- Identify applicable regulations early
- Design compliance into the architecture
- Document how each requirement is addressed

**Example:**

- **GDPR:** User data deletion API, consent tracking, data export functionality
- **Data Residency:** All EU user data stored in eu-west-1 region
- **Audit Logging:** All data modifications logged with user, timestamp, change
  details (7-year retention)

---

## 6. Observability and Monitoring Design

### 6.1 Instrumentation Strategy

**What it is:** How the system will be monitored, logged, and measured.

**What to include:**

- Logging approach (what, where, how)
- Metrics collection (application, infrastructure)
- Distributed tracing (if applicable)
- Alerting thresholds

**Guidance:**

- Design for observability from the start
- Align with success criteria from Initiation stage
- Plan for troubleshooting and debugging

**Example:**

- **Logging:** Structured JSON logs via Winston, centralized in CloudWatch
- **Metrics:** Custom application metrics (business KPIs) + infrastructure
  metrics (CloudWatch)
- **Tracing:** AWS X-Ray for distributed tracing (API → database → external
  services)
- **Dashboards:** Grafana dashboards for real-time monitoring
- **Alerts:** PagerDuty integration for critical errors (error rate >1%, API
  latency >2s)

---

### 6.2 Success Criteria Measurement

**What it is:** How success criteria from the Initiation stage will be measured
in production.

**What to include:**

- Metrics to track for each success criterion
- Data collection mechanisms
- Dashboards and reporting

**Guidance:**

- Link directly to objectives from initiation-brief
- Ensure NFRs include instrumentation requirements
- Plan for baseline capture and ongoing tracking

**Example:**

| Success Criterion (from Initiation) | Metric                               | Collection Method                      | Dashboard                   |
| ----------------------------------- | ------------------------------------ | -------------------------------------- | --------------------------- |
| Reduce support tickets by 30%       | Support ticket count by category     | Webhook from Zendesk to analytics DB   | Weekly trend chart          |
| Improve page load time to <2s       | Page load time (p95)                 | Real User Monitoring (RUM) via Datadog | Real-time latency dashboard |
| Increase user engagement by 20%     | Daily active users, session duration | Google Analytics + custom events       | Monthly engagement report   |

---

## 7. Performance and Scalability Design

### 7.1 Performance Targets

**What it is:** Specific performance requirements the system must meet.

**What to include:**

- Response time targets (API, page load)
- Throughput requirements (requests per second)
- Concurrency expectations (simultaneous users)

**Guidance:**

- Derive from NFRs in requirements stage
- Be specific and measurable
- Consider peak vs. average load

**Example:**

- **API Response Time:** p95 <500ms, p99 <1s
- **Page Load Time:** First Contentful Paint <1.5s
- **Throughput:** 1000 requests/second peak
- **Concurrency:** 500 simultaneous users
- **Database Query Time:** p95 <100ms

---

### 7.2 Scalability Approach

**What it is:** How the system will scale to meet growing demand.

**What to include:**

- Horizontal vs. vertical scaling strategy
- Stateless vs. stateful components
- Caching strategy
- Database scaling approach

**Guidance:**

- Design for scalability even if not needed immediately
- Identify bottlenecks and mitigation strategies
- Consider cost vs. performance trade-offs

**Example:**

- **Application Tier:** Horizontal scaling via ECS auto-scaling (2-10 instances)
- **Stateless Design:** No server-side sessions (JWT tokens), supports load
  balancing
- **Caching:** Redis for session data, API responses (5-minute TTL)
- **Database:** Read replicas for query scaling, connection pooling via
  PgBouncer
- **CDN:** CloudFront for static assets (images, CSS, JS)
- **Background Jobs:** Distributed job queue via Bull (multiple workers)

---

## 8. Increment Plan

**What it is:** The roadmap for delivering the system incrementally, mapping
MoSCoW priorities to specific increments.

**What to include:**

- Increment definitions with requirements mappings
- Dependencies between increments
- Estimated duration and goals for each increment
- Could Have evaluation approach

**Guidance:**

- Start with Must Have requirements (minimum viable system)
- Sequence based on dependencies, risk, and value
- Be realistic about increment size (typically 1-3 weeks each)
- Make Could Haves opportunistic (build if easy, skip if hard)

**Example:**

### Increment 1: Foundation (Must Have)

**Goal:** Establish authentication, database, and core API infrastructure

**Requirements:**

- FR-1: User registration and login
- FR-2: User profile management
- NFR-1: PostgreSQL database setup
- NFR-2: JWT authentication
- NFR-3: API error handling

**Duration:** 1.5-2.5 weeks (estimate) **Team:** 2 full-stack engineers, 1
solutions architect (25% time) **Effort:** 3.5-5.5 person-weeks (estimate)
**Dependencies:** None

**Why first:**

- Foundation for all user-facing features
- De-risks authentication early
- Establishes development patterns

---

### Increment 2: Core Features (Must Have)

**Goal:** Deliver primary user-facing functionality

**Requirements:**

- FR-3: Create and view posts
- FR-4: Comment on posts
- FR-5: Search posts by keyword
- NFR-4: API response time <500ms

**Duration:** 1.5-2.5 weeks (estimate) **Team:** 2 full-stack engineers, 1 QA
engineer (50% time) **Effort:** 4-6 person-weeks (estimate) **Dependencies:**
Increment 1 (requires authentication)

**Why second:**

- Delivers core value proposition
- Enables UAT and user feedback
- Tests performance under load

---

### Increment 3: Enhancements (Should Have)

**Goal:** Add important features that improve user experience

**Requirements:**

- FR-6: Tag posts with categories
- FR-7: Filter posts by tags
- FR-8: User notifications for comments
- NFR-5: Email delivery via SendGrid

**Duration:** 1.5-2.5 weeks (estimate) **Team:** 2 full-stack engineers, 1 QA
engineer (50% time) **Effort:** 4-6 person-weeks (estimate) **Dependencies:**
Increment 2 (requires posts and comments)

**Why third:**

- Enhances discoverability
- Improves engagement
- Committed to delivery but not minimum viability

---

### Increment 4: Advanced Features (Should Have)

**Goal:** Add advanced functionality for power users

**Requirements:**

- FR-9: Export user data (GDPR compliance)
- FR-10: Admin dashboard for moderation
- NFR-6: Audit logging

**Duration:** 1.5-2.5 weeks (estimate) **Team:** 2 full-stack engineers, 1
DevOps engineer (25% time), 1 QA engineer (50% time) **Effort:** 4.5-6.5
person-weeks (estimate) **Dependencies:** Increment 3

**Why fourth:**

- Compliance requirement (GDPR)
- Supports content moderation
- Lower user-facing priority

---

### Could Have Requirements (Opportunistic)

**Evaluated during implementation - build if easy, skip if complex:**

- FR-11: Dark mode UI theme
  - **Evaluate in:** Increment 2 (frontend work)
  - **Effort if easy:** 1 day (CSS variables)
  - **Skip if:** Requires significant rework of component library

- FR-12: Real-time comment updates (WebSockets)
  - **Evaluate in:** Increment 3 (notification work)
  - **Effort if easy:** 2 days (if WebSocket infrastructure already exists)
  - **Skip if:** Requires new infrastructure (Socket.io, connection management)

- FR-13: Keyboard shortcuts for power users
  - **Evaluate in:** Increment 2 (UI work)
  - **Effort if easy:** 1 day (simple event handlers)
  - **Skip if:** Conflicts with accessibility requirements or complex to
    implement

---

### Won't Have (Out of Scope)

**Explicitly excluded from this project:**

- FR-14: Mobile native apps (iOS, Android) - Defer to Phase 2
- FR-15: Multi-language support (i18n) - Not needed for initial English-only
  launch
- FR-16: Video/image upload - Too complex, use external links instead
- FR-17: Social media integration (share to Twitter, etc.) - Low priority, defer

**Why Won't Have:**

- Reduces scope to deliver faster
- Avoids complexity for features with uncertain value
- Can revisit in future projects

---

### Increment Plan Summary

| Increment | Type        | Requirements                    | Duration (estimate) | Team                               | Effort (estimate)    |
| --------- | ----------- | ------------------------------- | ------------------- | ---------------------------------- | -------------------- |
| 1         | Must Have   | FR-1, FR-2, NFR-1, NFR-2, NFR-3 | 1.5-2.5 weeks       | 2 engineers + 0.25 architect       | 3.5-5.5 person-weeks |
| 2         | Must Have   | FR-3, FR-4, FR-5, NFR-4         | 1.5-2.5 weeks       | 2 engineers + 0.5 QA               | 4-6 person-weeks     |
| 3         | Should Have | FR-6, FR-7, FR-8, NFR-5         | 1.5-2.5 weeks       | 2 engineers + 0.5 QA               | 4-6 person-weeks     |
| 4         | Should Have | FR-9, FR-10, NFR-6              | 1.5-2.5 weeks       | 2 engineers + 0.25 DevOps + 0.5 QA | 4.5-6.5 person-weeks |
| -         | Could Have  | FR-11, FR-12, FR-13             | Opportunistic       | Evaluated during implementation    | TBD                  |
| -         | Won't Have  | FR-14, FR-15, FR-16, FR-17      | Out of scope        | N/A                                | N/A                  |

**Total Must Have:** 3-5 weeks duration (estimate), 7.5-11.5 person-weeks effort
(estimate) **Total Should Have:** 3-5 weeks duration (estimate), 8.5-12.5
person-weeks effort (estimate) **Total Project (without Could Haves):** 6-10
weeks duration (estimate), 16-24 person-weeks effort (estimate)

---

### Gate 2 Decision Package

> **Purpose:** Provide executives and stakeholders with the information needed
> to make the build/no-build decision at Gate 2 (end of Requirements + Design
> foundational pass).

**Project Timeline:**

- **Must Have (minimum viable):** 3-5 weeks (estimate)
- **Should Have (committed scope):** Additional 3-5 weeks (6-10 weeks total,
  estimate)
- **Total delivery:** 6-10 weeks from start of Implementation to final
  Deployment (estimate)

**Effort Estimate:**

- **Must Have:** 7.5-11.5 person-weeks (estimate)
- **Should Have:** 8.5-12.5 person-weeks (estimate)
- **Total:** 16-24 person-weeks (estimate)

**Team Composition:**

- 2 full-stack engineers (full-time, 6-10 weeks)
- 1 QA engineer (part-time, ~50% over 4-8 weeks)
- 1 solutions architect (part-time, ~25% over 1.5-2.5 weeks)
- 1 DevOps engineer (part-time, ~25% over 1.5-2.5 weeks)

**Cost Calculation:**

To calculate project cost range, apply your organization's blended rate (salary
+ benefits + overhead) to the effort estimate range:

1. **Determine your blended rate:**
   - Typical range: $100-$250 per hour depending on location, seniority, and
     organization
   - Include: base salary, benefits, taxes, overhead, equipment, facilities
   - Calculate: annual fully-loaded cost per employee ÷ 2080 hours

2. **Calculate total cost range:**
   - Total effort range × hours per week × blended rate
   - Example low: 16 person-weeks × 40 hours = 640 hours
   - Example high: 24 person-weeks × 40 hours = 960 hours

3. **Example calculations:**

| Blended Rate | Cost Range (estimate) | Monthly Run Rate (estimate) |
| ------------ | --------------------- | --------------------------- |
| $100/hour    | $64,000-$96,000       | $32,000-$48,000/month       |
| $150/hour    | $96,000-$144,000      | $48,000-$72,000/month       |
| $200/hour    | $128,000-$192,000     | $64,000-$96,000/month       |
| $250/hour    | $160,000-$240,000     | $80,000-$120,000/month      |

**Note:** Rates vary significantly by organization, geography, and team
composition. Use your actual costs.

---

**Infrastructure & Tooling Costs:**

> **Critical:** Research and document infrastructure costs BEFORE Gate 2.
> Managed services, cloud platforms, and SaaS tools can significantly impact
> total project cost.

**Recurring Costs (Annual):**

| Category       | Service/Tool             | Purpose                  | Monthly Cost | Annual Cost |
| -------------- | ------------------------ | ------------------------ | ------------ | ----------- |
| **Hosting**    | Cloud compute instances  | Application servers      | $X/month     | $X/year     |
| **Database**   | Managed database service | PostgreSQL RDS           | $X/month     | $X/year     |
| **Storage**    | Object storage           | File uploads, backups    | $X/month     | $X/year     |
| **CDN**        | Content delivery network | Static assets            | $X/month     | $X/year     |
| **Auth**       | Authentication service   | User identity (optional) | $X/month     | $X/year     |
| **Monitoring** | Observability platform   | Logs, metrics, alerts    | $X/month     | $X/year     |
| **Email**      | Transactional email      | SendGrid, Postmark, etc. | $X/month     | $X/year     |
| **Other**      | [Other services]         | [Purpose]                | $X/month     | $X/year     |
| **TOTAL**      |                          |                          | **$X/month** | **$X/year** |

**Example (moderate web application):**

- Hosting: $200/month (application servers, load balancer)
- Database: $300/month (managed PostgreSQL with HA)
- Storage: $20/month (object storage for uploads)
- CDN: $50/month (CloudFront, Cloudflare, etc.)
- Monitoring: $100/month (observability platform)
- Email: $30/month (transactional email service)
- **Total recurring: ~$700/month (~$8,400/year)**

**One-Time Costs:**

- Setup fees: $X
- Migration costs: $X
- Licenses (if applicable): $X
- Training: $X
- **Total one-time: $X**

**Scaling Cost Considerations:**

- [How infrastructure costs scale with usage - linear, exponential, step
  function?]
- [What happens at 10x traffic? 100x?]
- [Any per-user or per-transaction costs that scale automatically?]

**Total Project Cost (First Year):**

- **Labor (one-time):** $80K-$200K (depending on blended rate)
- **Infrastructure (recurring):** $X/year
- **One-time costs:** $X
- **TOTAL YEAR 1:** $XX,XXX
- **ONGOING (Years 2+):** $X/year (recurring infrastructure only)

---

**Comparison to Initiation Estimate:**

- **Initiation estimate:** [Original range from initiation-brief, e.g., "3-5
  engineers, 2-4 months, $200K-$400K"]
- **Design estimate:** 2-3 engineers, 1.5-2.5 months, 16-24 person-weeks
  (~$64K-$240K depending on rates, estimate)
- **Confidence level:** Medium-High (based on detailed increment plan with known
  technology stack, ±25% per 25/75 standard)
- **Key refinements:**
  - Better understanding of requirements after Requirements stage
  - Clearer increment boundaries and dependencies from increment plan
  - Identified technical risks and mitigation strategies

**Risks and Mitigation:**

- [List top 3-5 risks that could impact timeline/cost]
- [For each risk: impact, probability, mitigation strategy]

**Recommendation:**

- [ ] **Proceed** - Business case is sound, cost is acceptable, team is
      available
- [ ] **Pivot** - [What would need to change: reduce scope, different approach,
      etc.]
- [ ] **Stop** - [Why: cost too high, business case weak, better alternatives
      exist]

**Decision Rationale:** [1-2 paragraphs explaining the recommendation]

---

# Part B: Iterative Design (Complete Per Increment)

> **Purpose:** Provide detailed specifications for implementing a specific
> increment.
>
> **When to complete:** Before implementing each increment.
>
> **Complete this section for each increment** defined in the increment plan.
> Copy and fill out sections 9-13 for every increment.

---

## 9. Increment Scope

**Increment Number/Name:** [e.g., Increment 1: Foundation]

**Requirements in Scope:**

- [List requirement IDs from increment plan, e.g., FR-1, FR-2, NFR-1]

**Acceptance Criteria:**

- [List key acceptance criteria from requirements-brief that apply to this
  increment]

**Out of Scope for This Increment:**

- [Clarify what's NOT included to prevent scope creep]

**Example:**

**Increment:** Increment 1: Foundation

**In Scope:**

- FR-1: User registration with email/password
- FR-2: User login with JWT token generation
- NFR-1: PostgreSQL database with users table
- NFR-2: Password hashing with bcrypt
- NFR-3: API error handling (4xx/5xx responses)

**Acceptance Criteria:**

- User can register with valid email and password
- User can login and receive JWT token
- Invalid credentials return 401 Unauthorized
- Passwords are hashed (never stored plaintext)

**Out of Scope:**

- Password reset functionality (deferred to Increment 3)
- OAuth social login (won't have)
- Multi-factor authentication (won't have)

---

## 10. Component Design

### 10.1 Components in This Increment

**What it is:** Detailed design of specific components being built or modified
in this increment.

**What to include:**

- Component responsibilities
- Internal structure (classes, modules, functions)
- Dependencies and interactions
- State management (if applicable)

**Guidance:**

- Enough detail for engineers to implement without guessing
- Reference architecture from foundational design
- Identify reusable patterns

**Example:**

**Component: Authentication Service (Backend)**

**Responsibilities:**

- User registration (email/password validation, hashing, database insert)
- User login (credential verification, JWT generation)
- Token validation (JWT verification middleware)

**Structure:**

```
src/services/
  AuthService.js
    - register(email, password) → {user, token}
    - login(email, password) → {user, token}
    - validateToken(token) → {userId}

src/middleware/
  authMiddleware.js
    - requireAuth() → Express middleware
```

**Dependencies:**

- bcrypt (password hashing)
- jsonwebtoken (JWT generation/validation)
- User model (Sequelize)

**State:** Stateless (no server-side sessions)

---

**Component: Registration Form (Frontend)**

**Responsibilities:**

- Collect user email and password
- Validate input (email format, password strength)
- Submit to /api/v1/auth/register
- Handle success (redirect to dashboard) and errors (display message)

**Structure:**

```
src/components/auth/
  RegisterForm.jsx
    - State: {email, password, error, loading}
    - Methods: handleSubmit(), validateEmail(), validatePassword()
    - Renders: form with email/password inputs, submit button, error display
```

**Dependencies:**

- React Hook Form (form validation)
- axios (API client)
- react-router (navigation)

**State:** Local component state (form inputs, submission status)

---

### 10.2 Component Interactions

**What it is:** How components communicate and collaborate for this increment's
features.

**What to include:**

- Sequence diagrams or flow descriptions
- API calls and data flow
- Error handling paths

**Guidance:**

- Show the "happy path" and key error scenarios
- Clarify async operations and callbacks
- Document expected behaviors

**Example:**

**User Registration Flow:**

```
1. User fills out RegisterForm and clicks "Register"
2. Frontend validates email format and password strength
3. Frontend POST /api/v1/auth/register {email, password}
4. Backend AuthService validates input
5. Backend hashes password with bcrypt
6. Backend inserts user into database
7. Backend generates JWT token
8. Backend returns 201 Created {user: {id, email}, token}
9. Frontend stores token in localStorage
10. Frontend redirects to /dashboard
```

**Error Scenarios:**

- Email already exists → 409 Conflict → Display "Email already registered"
- Weak password → 400 Bad Request → Display "Password must be 8+ characters"
- Database error → 500 Internal Server Error → Display "Registration failed, try
  again"

---

## 11. Data Model Changes

### 11.1 Schema Changes

**What it is:** Database schema additions or modifications for this increment.

**What to include:**

- New tables or columns
- Indexes for performance
- Foreign keys and constraints
- Migration scripts

**Guidance:**

- Be explicit about data types, nullability, defaults
- Consider migration strategy (additive changes preferred)
- Plan for rollback if needed

**Example:**

**New Table: users**

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(255),
  role VARCHAR(50) DEFAULT 'user',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_users_email ON users(email);
```

**Migration File:** `migrations/20260209_create_users_table.js`

**Rollback:** `DROP TABLE users;`

---

### 11.2 Data Access Patterns

**What it is:** How data will be queried and modified in this increment.

**What to include:**

- Key queries (SELECT, INSERT, UPDATE, DELETE)
- ORM usage patterns
- Caching strategy (if applicable)

**Guidance:**

- Identify frequent queries that need optimization
- Consider N+1 query problems
- Plan for data validation

**Example:**

**Create User (Registration):**

```javascript
const user = await User.create({
  email: email,
  password_hash: hashedPassword,
  name: name,
});
```

**Find User by Email (Login):**

```javascript
const user = await User.findOne({ where: { email: email } });
```

**Validate Token (Authentication):**

```javascript
// No database query - JWT is self-contained
const payload = jwt.verify(token, secret);
const userId = payload.userId;
```

**Caching:** No caching for user authentication (security-sensitive)

---

## 12. API Specifications

### 12.1 Endpoints

**What it is:** Detailed API endpoint specifications for this increment.

**What to include:**

- HTTP method, path, description
- Request parameters (body, query, headers)
- Response format (success and error cases)
- Authentication requirements

**Guidance:**

- Follow API design principles from foundational design
- Be specific about data types and validation rules
- Document all possible responses

**Example:**

---

**POST /api/v1/auth/register**

**Description:** Register a new user account

**Authentication:** None (public endpoint)

**Request Body:**

```json
{
  "email": "user@example.com",
  "password": "SecurePass123!",
  "name": "John Doe"
}
```

**Validation:**

- `email`: Required, valid email format, not already registered
- `password`: Required, min 8 characters, must include letter and number
- `name`: Optional, max 255 characters

**Success Response (201 Created):**

```json
{
  "user": {
    "id": 42,
    "email": "user@example.com",
    "name": "John Doe",
    "role": "user",
    "created_at": "2026-02-09T12:00:00Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Error Responses:**

**400 Bad Request** (validation failure):

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input",
    "details": [
      {
        "field": "password",
        "message": "Password must be at least 8 characters"
      }
    ]
  }
}
```

**409 Conflict** (email already exists):

```json
{
  "error": {
    "code": "EMAIL_EXISTS",
    "message": "Email address already registered"
  }
}
```

**500 Internal Server Error** (database error):

```json
{
  "error": {
    "code": "INTERNAL_ERROR",
    "message": "Registration failed"
  }
}
```

---

**POST /api/v1/auth/login**

**Description:** Authenticate user and receive JWT token

**Authentication:** None (public endpoint)

**Request Body:**

```json
{
  "email": "user@example.com",
  "password": "SecurePass123!"
}
```

**Success Response (200 OK):**

```json
{
  "user": {
    "id": 42,
    "email": "user@example.com",
    "name": "John Doe",
    "role": "user"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Error Responses:**

**401 Unauthorized** (invalid credentials):

```json
{
  "error": {
    "code": "INVALID_CREDENTIALS",
    "message": "Invalid email or password"
  }
}
```

---

### 12.2 Authentication Middleware

**What it is:** How protected endpoints will validate authentication.

**Example:**

**Middleware:** `requireAuth()`

**Usage:**

```javascript
router.get("/api/v1/profile", requireAuth(), ProfileController.getProfile);
```

**Behavior:**

1. Extract token from `Authorization: Bearer <token>` header
2. Verify JWT signature and expiration
3. If valid: attach `req.userId` and call `next()`
4. If invalid: return 401 Unauthorized

**Error Response (401):**

```json
{
  "error": {
    "code": "UNAUTHORIZED",
    "message": "Invalid or expired token"
  }
}
```

---

## 13. Testing Strategy for This Increment

### 13.1 Unit Tests

**What it is:** Tests for individual functions and components.

**What to include:**

- Key functions to unit test
- Test cases (happy path, edge cases, errors)
- Coverage targets

**Guidance:**

- Focus on business logic and complex functions
- Aim for 80%+ coverage on new code
- Use mocks for external dependencies

**Example:**

**AuthService Unit Tests:**

- `register()` with valid input → creates user, returns token
- `register()` with duplicate email → throws EmailExistsError
- `register()` with weak password → throws ValidationError
- `login()` with valid credentials → returns user and token
- `login()` with invalid password → throws InvalidCredentialsError
- `validateToken()` with valid token → returns userId
- `validateToken()` with expired token → throws TokenExpiredError

**Coverage Target:** 90% for AuthService

---

### 13.2 Integration Tests

**What it is:** Tests for API endpoints and component interactions.

**What to include:**

- API endpoint tests (request → response)
- Database integration tests
- End-to-end flows

**Guidance:**

- Test realistic scenarios
- Use test database (not production)
- Clean up test data after each test

**Example:**

**API Integration Tests:**

- POST /api/v1/auth/register with valid data → 201 Created, user in database
- POST /api/v1/auth/register with duplicate email → 409 Conflict
- POST /api/v1/auth/login with valid credentials → 200 OK, valid token
- POST /api/v1/auth/login with wrong password → 401 Unauthorized
- GET /api/v1/profile without token → 401 Unauthorized
- GET /api/v1/profile with valid token → 200 OK, user data

**Coverage Target:** All API endpoints tested

---

### 13.3 Acceptance Testing

**What it is:** Validation that acceptance criteria from requirements are met.

**What to include:**

- Manual test scenarios
- UAT script for stakeholders
- Success criteria

**Guidance:**

- Reference acceptance criteria from requirements-brief
- Create step-by-step test cases
- Involve Product Manager or Business Analyst in UAT

**Example:**

**UAT Test Case: User Registration**

1. Navigate to /register
2. Enter email: test@example.com
3. Enter password: SecurePass123!
4. Click "Register"
5. **Expected:** Redirected to /dashboard, logged in
6. **Verify:** User can see their profile

**UAT Test Case: Login with Invalid Credentials**

1. Navigate to /login
2. Enter email: test@example.com
3. Enter wrong password: WrongPass!
4. Click "Login"
5. **Expected:** Error message "Invalid email or password"
6. **Verify:** User remains on login page

---

### 13.4 Performance Testing

**What it is:** Validation that NFRs are met (response time, throughput).

**What to include:**

- Load test scenarios
- Performance benchmarks
- Tools and approach

**Guidance:**

- Test under realistic load
- Validate against NFRs from requirements
- Identify bottlenecks

**Example:**

**Load Test: Registration Endpoint**

- **Tool:** Apache Bench (ab) or k6
- **Scenario:** 100 concurrent users, 1000 requests
- **Target:** p95 response time <500ms (from NFR-4)
- **Command:**
  `ab -n 1000 -c 100 -p register.json -T application/json http://localhost:3000/api/v1/auth/register`

**Success Criteria:** 95% of requests complete in <500ms, 0% errors

---

## 14. Implementation Notes

**What it is:** Guidance, tips, and considerations for engineers implementing
this increment.

**What to include:**

- Tricky aspects or gotchas
- Code patterns to follow
- Performance optimizations
- Security considerations

**Guidance:**

- Helpful context that's not obvious from specs
- Lessons learned from similar work
- Things to watch out for

**Example:**

### Security Notes

- **Never log passwords** (even in development) - log only email for debugging
- **Use bcrypt with cost factor 10** - balances security and performance
- **JWT expiration:** Set to 24 hours, refresh tokens in future increment
- **SQL injection prevention:** Sequelize parameterizes queries automatically,
  but validate inputs

### Performance Notes

- **Index on users.email** - Critical for login query performance
- **Connection pooling** - Configure max 20 connections in production
- **Password hashing is CPU-intensive** - Offload to background job for bulk
  user imports (future)

### Code Patterns

- **Use async/await** - Consistent error handling with try/catch
- **Repository pattern** - Keep data access in repositories, not controllers
- **Error handling middleware** - Centralized error responses in
  `src/middleware/errorHandler.js`

---

## Checklist

Before proceeding to implementation, validate:

**Foundational Design (if applicable):**

- [ ] System architecture addresses all requirements
- [ ] Technology stack is justified and appropriate
- [ ] Iteration plan created with increment boundaries
- [ ] Security and compliance requirements addressed
- [ ] Observability and monitoring designed
- [ ] Performance and scalability approach defined
- [ ] Alignment Review conducted and approved

**Iterative Design (per increment):**

- [ ] Increment scope is clear (in scope, out of scope)
- [ ] Component designs are detailed and implementable
- [ ] Data model changes specified with migrations
- [ ] API specifications are complete and follow conventions
- [ ] Testing strategy covers unit, integration, acceptance, performance
- [ ] Implementation notes provide helpful guidance

**Handoff to Implementation:**

- [ ] Engineers understand what to build and how
- [ ] No major unknowns or blockers
- [ ] Ready to proceed to Implementation stage

---

## Notes

Added to framework in v0.4.0.
