# Design Stage Reference

**Last Updated:** 2026-02-09

**Stage:** 3 of 7 (Design)
**Primary Role:** Engineers / Solutions Architect
**Execution Pattern:** Foundational + Iterative

---

## Table of Contents

1. [What is Design?](#what-is-design)
2. [Foundational vs. Iterative Design](#foundational-vs-iterative-design)
3. [Architecture Principles](#architecture-principles)
4. [Technology Selection](#technology-selection)
5. [Creating Iteration Plans](#creating-iteration-plans)
6. [Design Documentation](#design-documentation)
7. [Architecture Decision Records (ADRs)](#architecture-decision-records-adrs)
8. [Security and Compliance Design](#security-and-compliance-design)
9. [Performance and Scalability](#performance-and-scalability)
10. [Observability and Monitoring](#observability-and-monitoring)
11. [API Design Best Practices](#api-design-best-practices)
12. [Data Architecture](#data-architecture)
13. [Testing Strategy](#testing-strategy)
14. [When to Revisit Design](#when-to-revisit-design)
15. [Common Design Anti-Patterns](#common-design-anti-patterns)
16. [AI Assistance in Design](#ai-assistance-in-design)

---

## What is Design?

### Definition

**Design** is the process of translating requirements into implementable technical solutions. It bridges the gap between "what we need to build" (Requirements) and "how we'll build it" (Implementation).

### Purpose

The Design stage serves multiple critical purposes:

1. **Technical planning** - Determine how requirements will be implemented
2. **Risk reduction** - Identify and address technical challenges before coding
3. **Architecture alignment** - Ensure all components work together coherently
4. **Implementation guidance** - Provide clear specifications for engineers
5. **Increment sequencing** - Create a realistic delivery roadmap (iteration plan)
6. **Quality foundation** - Build testability, security, and performance into the design

### What Design Produces

**Foundational design outputs:**
- System architecture diagrams
- Technology stack selections with justification
- Data and API architecture
- Security and compliance approach
- Observability and monitoring strategy
- **Iteration plan** - roadmap for incremental delivery

**Iterative design outputs (per increment):**
- Detailed component specifications
- API endpoint designs
- Data model changes and migrations
- Test strategies
- Implementation notes

### Why These Elements Matter

**Architecture diagrams** provide a shared mental model for the team, enabling coherent implementation and onboarding.

**Technology decisions** impact long-term maintainability, team productivity, and system capabilities. Document the "why" to avoid revisiting settled questions.

**Iteration plans** sequence work based on dependencies, risk, and value, enabling incremental delivery and early feedback.

**Detailed designs** reduce ambiguity during implementation, preventing rework and misaligned interpretations.

**Security and performance considerations** are exponentially harder to retrofit than to design upfront.

---

## Foundational vs. Iterative Design

The Design stage has a unique **dual execution pattern** that distinguishes it from other stages.

### Foundational Design (Once per Project)

**When:** After Requirements stage, before first increment

**Purpose:** Establish the architectural foundation and create the iteration plan

**Scope:**
- System-wide decisions (architecture, technology, data model, API conventions)
- Cross-cutting concerns (security, observability, performance approach)
- Iteration planning (mapping MoSCoW priorities to increments)

**Analogy:** Designing the blueprint for a house - room layout, structural support, plumbing/electrical routing, foundation

**Key principle:** Make decisions that are expensive to change later

**Checkpoint:** Alignment Review with stakeholders, followed by Gate 2 (build/no-build decision)

### Iterative Design (Per Increment)

**When:** Before implementing each increment

**Purpose:** Provide detailed specifications for the current increment

**Scope:**
- Increment-specific components and interactions
- API endpoint specifications
- Data model changes for this increment
- Test strategy for this increment

**Analogy:** Detailed plans for finishing one room - where outlets go, paint colors, fixture placement

**Key principle:** Just enough design to implement confidently, avoid over-designing future increments

**Checkpoint:** Optional Quality Checkpoint for complex increments

### How They Interact

**Foundational design creates the rules; iterative design applies them:**
- Foundational: "We use REST APIs with JWT auth"
- Iterative: "POST /api/v1/posts endpoint with Bearer token authentication"

**Foundational design creates the iteration plan; iterative design executes it:**
- Foundational: "Increment 1 includes FR-1, FR-2, FR-3"
- Iterative: "Detailed design for user registration (FR-1) in Increment 1"

**Foundational design is revisited rarely; iterative design is revisited frequently:**
- Foundational: Changed only when architecture proves fundamentally flawed
- Iterative: Adjusted based on implementation feedback or requirement clarifications

---

## Architecture Principles

### SOLID Principles (Object-Oriented Design)

**Single Responsibility Principle (SRP):**
- Each component, class, or module has one reason to change
- Example: Separate `AuthService` (handles authentication) from `UserService` (manages user data)

**Open/Closed Principle (OCP):**
- Open for extension, closed for modification
- Example: Use plugin architecture or strategy pattern to add features without changing core code

**Liskov Substitution Principle (LSP):**
- Subtypes must be substitutable for base types
- Example: All payment processors implement the same interface, swappable without breaking code

**Interface Segregation Principle (ISP):**
- Many specific interfaces better than one general-purpose interface
- Example: `IReadable` and `IWritable` interfaces instead of single `IDataAccess`

**Dependency Inversion Principle (DIP):**
- Depend on abstractions, not concretions
- Example: Controllers depend on `IUserRepository` interface, not concrete `PostgresUserRepository`

### Separation of Concerns

**Layered Architecture:**
- **Presentation Layer:** UI, API controllers (input/output)
- **Business Logic Layer:** Services, domain logic (rules and workflows)
- **Data Access Layer:** Repositories, database interactions (persistence)

**Example:**
```
Controller (Presentation)
  ↓ calls
Service (Business Logic)
  ↓ calls
Repository (Data Access)
  ↓ calls
Database
```

**Why it matters:** Changes to UI don't require changes to business logic; changes to database don't affect API contracts.

### Don't Repeat Yourself (DRY)

**Principle:** Avoid duplicating logic or data

**Good:**
```javascript
// Centralized validation
function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
// Used in registration, login, profile update
```

**Bad:**
```javascript
// Duplicated validation logic in multiple places
// Registration: if (!email.includes('@')) ...
// Login: if (!email.match(/\S+@\S+/)) ...
// Profile: if (!validateEmailFormat(email)) ...
```

**Why it matters:** Single source of truth reduces bugs and maintenance burden.

### YAGNI (You Aren't Gonna Need It)

**Principle:** Don't build features or abstractions you don't need yet

**Good:** Build simple solution for current requirements, refactor later if needed

**Bad:** Build complex, configurable, extensible system for hypothetical future requirements

**Why it matters:** Over-engineering wastes time and adds complexity without proven value.

### KISS (Keep It Simple, Stupid)

**Principle:** Prefer simple solutions over complex ones

**Good:** Use standard patterns and libraries that the team knows

**Bad:** Build custom framework, introduce unfamiliar paradigms, use bleeding-edge tech without justification

**Why it matters:** Simple systems are easier to understand, maintain, and debug.

---

## Technology Selection

### Selection Criteria

When choosing technologies, consider:

**1. Team skills and experience**
- Does the team know this technology?
- How steep is the learning curve?
- Can we hire for this skill if needed?

**2. Organizational standards**
- Are there company-wide technology preferences?
- Is there existing infrastructure we can leverage?
- Are there approved vendor lists or security requirements?

**3. Requirements fit**
- Does this technology solve our specific requirements?
- Are there NFRs that require specific capabilities (e.g., real-time, scalability)?

**4. Ecosystem and community**
- Is the technology actively maintained?
- Are there libraries, tools, and resources available?
- Is the community large enough for support?

**5. Long-term maintainability**
- Will this technology be supported in 5 years?
- Can we upgrade incrementally or are breaking changes common?
- Is there a sustainable upgrade path?

**6. Performance and scalability**
- Does it meet our performance NFRs?
- Can it scale to our projected load?

**7. Security and compliance**
- Does it have known vulnerabilities?
- Is it compliant with our regulatory requirements?

**8. Cost of ownership** ⚠️ **Critical - Research Before Selecting**
- **One-time costs:** Licenses, setup fees, migration costs, training
- **Recurring costs:** Monthly/annual subscriptions, per-user pricing, per-usage fees
- **Infrastructure costs:** Cloud hosting, managed services, data transfer, storage
- **Scaling costs:** How does cost change at 10x or 100x usage?
- **Hidden costs:** Support contracts, professional services, integration costs
- **Build vs. buy:** Compare custom development cost to commercial/managed solutions

**⚠️ Cost Research is Mandatory:**
- **Research pricing BEFORE selecting technology** - don't assume costs are similar across options
- **Document costs in ADRs** - make cost implications visible to decision-makers
- **Include in Gate 2 decision package** - stakeholders need total project cost (labor + infrastructure)
- **Consider scaling:** A cheap solution at low volume may become expensive at scale (or vice versa)

**Example:** An SFTP upload service could use:
- Option A: Managed file transfer service (~$200-300/month regardless of usage)
- Option B: Self-hosted on cloud VMs (~$50-100/month + operational overhead)
- Option C: Object storage with presigned URLs (~$5-20/month at moderate volume)

Without researching costs, you might assume all options are similar and choose based on convenience, only to discover Option A costs 10-20x more than expected after committing to the client.

### Common Technology Trade-offs

**Monolith vs. Microservices**

| Monolith | Microservices |
|----------|---------------|
| ✅ Simpler to develop initially | ❌ Complex distributed system challenges |
| ✅ Easier to deploy | ❌ Requires orchestration (Kubernetes) |
| ✅ Easier to debug | ❌ Distributed tracing needed |
| ❌ Scaling is all-or-nothing | ✅ Scale services independently |
| ❌ Technology lock-in | ✅ Different tech per service |

**Recommendation:** Start with modular monolith, split into microservices only when scaling or team org requires it.

**Relational (SQL) vs. NoSQL**

| Relational (PostgreSQL, MySQL) | NoSQL (MongoDB, DynamoDB) |
|-------------------------------|--------------------------|
| ✅ ACID transactions | ❌ Eventual consistency (usually) |
| ✅ Strong relationships (foreign keys) | ❌ Relationships handled in app code |
| ✅ Mature tooling (ORMs, migrations) | ❌ Less mature ecosystem |
| ❌ Schema changes require migrations | ✅ Flexible schema |
| ❌ Vertical scaling limits | ✅ Horizontal scaling easier |

**Recommendation:** Use relational for structured, transactional data with relationships; use NoSQL for unstructured, high-scale, or document-centric data.

**REST vs. GraphQL**

| REST | GraphQL |
|------|---------|
| ✅ Simple, widely understood | ❌ Steeper learning curve |
| ✅ HTTP caching works naturally | ❌ Caching more complex |
| ❌ Over-fetching (get more data than needed) | ✅ Client requests exactly what it needs |
| ❌ Under-fetching (multiple requests) | ✅ Single request for complex data |
| ✅ Versioning via URL (/v1, /v2) | ❌ Versioning more complex |

**Recommendation:** Use REST for simple CRUD APIs; use GraphQL for complex data with varied client needs.

### Documenting Technology Choices

Use **Architecture Decision Records (ADRs)** to document significant technology decisions. See [ADR section](#architecture-decision-records-adrs) below.

---

## Creating Iteration Plans

### Purpose of the Iteration Plan

The iteration plan is a **key output of foundational design**. It maps MoSCoW priorities from the Requirements stage to specific, deliverable increments.

**Goals:**
1. Break work into manageable chunks (typically 1-3 weeks each)
2. Sequence increments based on dependencies, risk, and value
3. Enable incremental delivery and early feedback
4. Make Could Haves opportunistic, ensure Won't Haves stay out

### Iteration Planning Process

**Step 1: Review Requirements**
- Gather all FRs and NFRs from requirements-brief
- Review MoSCoW prioritization (Must/Should/Could/Won't Have)
- Understand acceptance criteria

**Step 2: Identify Dependencies**
- Which requirements depend on others?
- What foundational capabilities are needed first?
- Example: User authentication (FR-1) must come before creating posts (FR-3)

**Step 3: Assess Risk and Complexity**
- Which requirements are technically uncertain?
- Which require new technologies or unfamiliar patterns?
- Consider de-risking early (build uncertain parts in early increments for learning)

**Step 4: Group into Increments**
- Start with Must Haves (minimum viable system)
- Group related requirements together
- Aim for 1-3 weeks per increment (not too big, not too small)
- Each increment should deliver testable value

**Step 5: Sequence Increments**
- Order based on: dependencies first, then risk/value balance
- Foundational capabilities → Core features → Enhancements
- Consider user feedback cycles (ship early increments to learn)

**Step 6: Map Should Haves**
- Assign Should Have requirements to increments after Must Haves
- Ensure dependencies are respected
- Higher-value Should Haves earlier

**Step 7: Handle Could Haves**
- Mark Could Haves as "opportunistic" - evaluated during implementation
- Identify which increment they'd fit into (if built)
- Define "build if easy, skip if hard" criteria

**Step 8: Document Won't Haves**
- Explicitly list Won't Have requirements
- Explain why they're out of scope
- Prevents scope creep during implementation

**Step 9: Estimate Effort**
- For each increment, estimate team size and duration
- Calculate effort in person-weeks (team size × duration)
- Example: 2 engineers for 2 weeks = 4 person-weeks
- Include part-time roles: architect (25%), QA (50%), DevOps (25%)
- Sum total effort across all increments

**Step 10: Calculate Cost for Gate 2**
- Effort estimates provide the foundation for cost calculation
- Organizations apply their own blended rates (salary + benefits + overhead)
- Create Gate 2 Decision Package with:
  - Total timeline (calendar weeks)
  - Total effort (person-weeks)
  - Team composition
  - Cost calculation guidance (effort × rate)
  - Comparison to Initiation estimates
  - Risks and recommendation (proceed/pivot/stop)

### Iteration Plan Format

**Example:**

```markdown
## Iteration Plan

### Increment 1: Foundation (Must Have)
**Goal:** Establish authentication and core infrastructure
**Requirements:** FR-1 (user registration), FR-2 (login), NFR-1 (database), NFR-2 (JWT auth)
**Duration:** 2 weeks
**Team:** 2 full-stack engineers, 1 solutions architect (25% time)
**Effort:** 4.5 person-weeks (2 × 2 weeks + 0.5 architect)
**Dependencies:** None
**Rationale:** Foundation for all user-facing features; de-risks authentication early

### Increment 2: Core Features (Must Have)
**Goal:** Deliver primary user-facing functionality
**Requirements:** FR-3 (create posts), FR-4 (view posts), FR-5 (search)
**Duration:** 2 weeks
**Team:** 2 full-stack engineers, 1 QA engineer (50% time)
**Effort:** 5 person-weeks (2 × 2 weeks + 1 QA)
**Dependencies:** Increment 1 (requires authentication)
**Rationale:** Minimum viable product - users can create and find content

### Increment 3: Engagement (Should Have)
**Goal:** Enable user interaction and notifications
**Requirements:** FR-6 (comments), FR-7 (likes), FR-8 (email notifications)
**Duration:** 2 weeks
**Team:** 2 full-stack engineers, 1 QA engineer (50% time)
**Effort:** 5 person-weeks (2 × 2 weeks + 1 QA)
**Dependencies:** Increment 2 (requires posts)
**Rationale:** Drives engagement, high user value

### Could Have (Opportunistic)
- FR-9: Dark mode → Evaluate in Increment 2 (build if CSS variables work, skip if complex)
- FR-10: Real-time updates → Evaluate in Increment 3 (build if WebSocket infrastructure exists, skip if too much work)

### Won't Have (Out of Scope)
- FR-11: Mobile app → Defer to Phase 2
- FR-12: Video upload → Use external links instead

---

### Summary
**Total Timeline:** 6 weeks (3 increments)
**Total Effort:** 14.5 person-weeks
**Team Composition:** 2 full-stack engineers (full-time), 1 QA (part-time ~33%), 1 architect (part-time ~8%)

### Gate 2 Cost Calculation

**To calculate project cost:**
1. Total effort: 14.5 person-weeks × 40 hours = 580 hours
2. Apply your organization's blended rate (salary + benefits + overhead)

**Example calculations:**
- At $150/hour: 580 hours × $150 = $87,000
- At $200/hour: 580 hours × $200 = $116,000
- At $250/hour: 580 hours × $250 = $145,000

**Note:** Use your actual blended rates. Typical range: $100-$250/hour depending on location, seniority, and organization.

**Comparison to Initiation:**
- Initiation estimate: 2-4 months, $100K-$200K (rough order of magnitude)
- Design estimate: 1.5 months, 14.5 person-weeks (~$87K-$145K depending on rates)
- Confidence: Medium-High (based on detailed increment plan with known technology)
```

### Best Practices

**1. Right-size increments**
- Too big: Risk, late feedback, hard to estimate
- Too small: Overhead, fragmented delivery
- Sweet spot: 1-3 weeks, 3-7 requirements per increment

**2. Deliver value incrementally**
- Each increment should ship something usable
- Avoid "80% done but nothing works" syndrome

**3. Build foundations first**
- Authentication, database schema, API framework before features
- Avoid rework by establishing patterns early

**4. De-risk early**
- Put technically uncertain work in early increments
- Learn and adjust before committing to later work

**5. Allow for discovery**
- Don't over-plan distant increments
- User feedback from early increments may change later plans

**6. Make Could Haves truly optional**
- Define clear "build vs. skip" criteria
- Don't commit to Could Haves in timelines

---

## Design Documentation

### What to Document

**Architecture diagrams:**
- System context (external actors and systems)
- Container diagram (high-level components)
- Component diagram (internal structure)

**Technology decisions:**
- Stack: languages, frameworks, databases, platforms
- Justification: why each choice (see ADRs)

**Data and API architecture:**
- Entity-relationship diagrams
- API conventions and standards
- Integration patterns

**Iteration plan:**
- Increment definitions with requirements mapping
- Dependencies and sequencing rationale

**Per-increment designs:**
- Component specifications
- API endpoint details
- Data model changes
- Test strategies

### Documentation Tools and Formats

**Diagrams:**
- **C4 Model:** Context → Container → Component → Code (recommended for clarity)
- **UML:** Use class diagrams, sequence diagrams for interactions
- **Tools:** Draw.io, Lucidchart, Mermaid (diagrams as code), PlantUML

**Markdown:**
- Lightweight, version-controlled alongside code
- Easy to read and edit
- This framework uses markdown for design-brief-template.md

**Architecture Decision Records (ADRs):**
- Lightweight markdown format (see [ADR section](#architecture-decision-records-adrs))
- Stored in `docs/adr/` directory

**API Documentation:**
- OpenAPI/Swagger for REST APIs
- GraphQL schema + documentation tools
- Postman collections for manual testing

### Documentation Anti-Patterns

**Anti-pattern: Over-documentation**
- Documenting every function, class, and variable
- Creating diagrams that duplicate information
- **Better:** Document architecture and key decisions; code should be self-explanatory

**Anti-pattern: Out-of-date documentation**
- Design docs that don't reflect actual implementation
- **Better:** Keep docs in version control, update during code reviews, automate where possible (API docs from code)

**Anti-pattern: Documentation instead of code quality**
- Relying on docs to explain convoluted code
- **Better:** Write clean, readable code with clear naming; docs explain "why" not "what"

---

## Architecture Decision Records (ADRs)

### What are ADRs?

**Architecture Decision Records** document significant architectural decisions and the reasoning behind them.

**⚠️ Important:** ADRs are **separate files** stored in `docs/adr/` directory, not embedded in design-brief.

**Purpose:**
- Capture **why** decisions were made (not just what was decided)
- Provide context for future engineers
- Prevent revisiting settled questions
- Enable informed changes when context changes
- **Document cost implications** to prevent budget surprises

**File structure:**
```
project/
  docs/
    adr/
      README.md (index of all ADRs)
      ADR-001-database-selection.md
      ADR-002-file-upload-mechanism.md
      ADR-003-authentication-approach.md
  design-brief.md (references ADRs, doesn't embed them)
```

### When to Create an ADR

Create an ADR for decisions that are:
- **Significant:** Impact multiple components or the whole system
- **Hard to reverse:** Changing later would be costly
- **Contested:** Multiple viable options, trade-offs involved

**Examples:**
- Choosing a database (PostgreSQL vs. MongoDB)
- Selecting an architecture style (monolith vs. microservices)
- Authentication approach (sessions vs. JWT)
- Technology stack (React vs. Vue)

**Don't ADR:**
- Trivial decisions (variable names, code formatting)
- Obvious choices (use version control, write tests)
- Decisions easily changed (color scheme, button labels)

### ADR Format

```markdown
# ADR-NNN: [Title - Short Present Tense Phrase]

**Date:** YYYY-MM-DD
**Status:** [Proposed | Accepted | Deprecated | Superseded by ADR-XXX]
**Deciders:** [Names of people involved in decision]

## Context

What is the issue we're trying to solve? What are the constraints and forces at play?

## Options Considered

1. **Option 1:** [Brief description]
2. **Option 2:** [Brief description]
3. **Option 3:** [Brief description]

## Decision

We will [decision statement].

## Rationale

Why this option?

**Pros:**
- [Advantage 1]
- [Advantage 2]

**Cons:**
- [Disadvantage 1]
- [Disadvantage 2]

**Trade-offs:**
- We accept [con] in exchange for [pro]

## Consequences

**Positive:**
- [Good outcome 1]
- [Good outcome 2]

**Negative:**
- [Bad outcome 1]
- [Bad outcome 2 - and how we'll mitigate it]

**Neutral:**
- [Side effect 1]

**Cost Considerations:**
- **One-time costs:** [Setup, licenses, migration, training]
- **Recurring costs:** [Monthly/annual subscriptions, per-usage fees, infrastructure]
- **Scaling costs:** [How costs change with growth]
- **Comparison to alternatives:** [Cost relative to other options considered]
- **Total estimated annual cost:** [Projected annual spend]

## Alternatives Considered

### Option 2: [Name]
- **Pros:** [...]
- **Cons:** [...]
- **Why not chosen:** [...]

### Option 3: [Name]
- **Pros:** [...]
- **Cons:** [...]
- **Why not chosen:** [...]

## References

- [Link to relevant documentation]
- [External article or resource]
```

### ADR Example

```markdown
# ADR-001: Use PostgreSQL for Primary Database

**Date:** 2026-02-09
**Status:** Accepted
**Deciders:** Jane Doe (Architect), John Smith (Engineering Lead)

## Context

We need to select a database for storing user data, posts, comments, and relationships. The system requires:
- Transactional integrity (user actions should be atomic)
- Relational data (users → posts → comments)
- Full-text search capabilities
- Scalability to 100K users

## Options Considered

1. PostgreSQL (relational)
2. MongoDB (document NoSQL)
3. DynamoDB (managed NoSQL)

## Decision

We will use **PostgreSQL 15** as the primary database.

## Rationale

**Pros:**
- Strong ACID guarantees for transactional integrity
- Native support for relational data (foreign keys, joins)
- Excellent full-text search capabilities (tsvector, GIN indexes)
- JSONB support provides document flexibility where needed
- Team has PostgreSQL expertise
- Mature ecosystem (ORMs, migration tools, monitoring)

**Cons:**
- Vertical scaling limits (less horizontal scalability than NoSQL)
- Requires schema migrations for changes
- More complex to manage than fully-managed solutions

**Trade-offs:**
- We accept vertical scaling limits in exchange for strong consistency and relational integrity
- We accept migration complexity in exchange for schema enforcement

## Consequences

**Positive:**
- Data integrity guaranteed by database constraints
- Powerful query capabilities for complex data relationships
- Team can be productive immediately (no learning curve)

**Negative:**
- May need read replicas or sharding if we exceed 100K users
- Schema changes require coordinated migrations

**Neutral:**
- Using Sequelize ORM (Node.js) for data access
- Managed database service (cloud provider's PostgreSQL) reduces operational burden

**Cost Considerations:**
- **One-time costs:** Minimal (no licenses, open-source database)
- **Recurring costs (managed service):**
  - Database instance: ~$150-300/month (moderate size with multi-AZ for HA)
  - Storage: ~$0.10-0.25/GB/month
  - Backups: Included in managed service
  - Estimated: $200-400/month (~$2,400-4,800/year)
- **Scaling costs:** Vertical scaling (larger instance) or read replicas ($150-300/replica/month)
- **Comparison to alternatives:**
  - MongoDB managed service: Similar cost (~$200-500/month)
  - DynamoDB: Pay-per-request (~$50-200/month at low volume, can scale higher)
- **Total estimated annual cost:** $3,000-6,000/year for infrastructure

## Alternatives Considered

### MongoDB
- **Pros:** Flexible schema, horizontal scaling, simpler for unstructured data
- **Cons:** Eventual consistency, relationships handled in app code, team has less experience
- **Cost:** Similar to PostgreSQL (~$200-500/month managed)
- **Why not:** Data is highly relational, ACID transactions are critical

### DynamoDB
- **Pros:** Fully managed, infinite scaling, pay-per-request pricing
- **Cons:** Steep learning curve (unfamiliar to team), complex query patterns, vendor lock-in
- **Cost:** ~$50-200/month at moderate volume, could be lower or higher depending on access patterns
- **Why not:** Team lacks experience, relational queries would be awkward, unpredictable scaling costs

## References

- [PostgreSQL Full-Text Search](https://www.postgresql.org/docs/current/textsearch.html)
- [Comparison of relational and document databases](https://example.com/db-comparison)
```

---

### ADR Example 2: Cost-Focused Decision

**This example demonstrates how researching costs prevents post-commitment surprises.**

```markdown
# ADR-002: Client File Upload Mechanism

**Date:** 2026-02-09
**Status:** Accepted
**Deciders:** Sarah Chen (Solutions Architect), Mike Rodriguez (Engineering Lead), Jessica Kim (Product Manager)

## Context

Client needs to upload large files (up to 5GB each, ~50 files/month) to our system for processing. Requirements:
- Secure file transfer (client uploads confidential data)
- Compatible with client's existing SFTP workflows
- Reliable delivery with retry capability
- Files must be stored for 90 days then auto-deleted

## Options Considered

1. **Managed SFTP service** (e.g., cloud provider's managed file transfer service)
2. **Self-hosted SFTP server** (VM with OpenSSH)
3. **Presigned upload URLs** (object storage with time-limited upload links)

## Decision

We will use **presigned upload URLs with object storage** (Option 3).

## Rationale

**Pros:**
- Extremely cost-effective (~$5-10/month for storage + minimal data transfer)
- Highly scalable (no server capacity concerns)
- Simple architecture (no server management)
- Secure (time-limited, scoped permissions)
- Client can use curl, wget, or any HTTP client

**Cons:**
- Client must change from SFTP to HTTPS upload (workflow change)
- Requires coordination with client's IT team for approval
- Need to provide clear upload instructions and error handling

**Trade-offs:**
- We accept client workflow change in exchange for 20-40x cost savings
- We accept integration effort to avoid long-term operational costs

## Consequences

**Positive:**
- Low recurring cost enables project profitability
- Serverless approach eliminates operational burden
- Can easily handle traffic spikes or increased volume

**Negative:**
- Requires client change management (not just "use your existing SFTP client")
- Initial setup requires client coordination

**Neutral:**
- Generate presigned URLs via API for each upload session
- Client uploads directly to object storage (files never touch our servers)

**Cost Considerations:**
- **One-time costs:** ~8 hours engineering time to implement presigned URL generation
- **Recurring costs:**
  - Object storage: ~$0.02-0.05/GB/month × 250GB average = ~$5-12/month
  - Data transfer: Included in cloud provider's free tier for uploads
  - Lifecycle policies: Free (auto-delete after 90 days)
  - **Total: ~$5-15/month (~$60-180/year)**
- **Scaling costs:** Linear with storage volume (predictable)
- **Comparison to alternatives:**
  - Option 1 (Managed SFTP): $200-300/month minimum = **$2,400-3,600/year**
  - Option 2 (Self-hosted): ~$50-100/month VM + operational time = **$600-1,200/year + ops burden**
  - Option 3 (Presigned URLs): $5-15/month = **$60-180/year ✓**
- **Total estimated annual cost:** $60-180/year (vs $600-3,600 for alternatives)

## Alternatives Considered

### Managed SFTP Service
- **Pros:** Drop-in replacement for client's existing SFTP workflow, fully managed
- **Cons:** Very expensive ($200-300/month minimum regardless of usage), charges per-hour even when idle
- **Cost:** $2,400-3,600/year ⚠️ **Would exceed project budget**
- **Why not:** Cost is 20-40x higher than alternative solutions; client is willing to adapt workflow for significant cost savings

### Self-Hosted SFTP Server
- **Pros:** Full control, supports SFTP natively, moderate cost
- **Cons:** Requires server management, patching, monitoring; potential downtime during maintenance
- **Cost:** $50-100/month for VM + engineering time for ops = $600-1,200/year + operational burden
- **Why not:** Adds operational complexity and costs vs presigned URLs; client can adapt to HTTPS

## References

- [Object storage presigned URL documentation](https://example.com/presigned-urls)
- [Client file upload requirements](link-to-requirements)
- [Cost comparison spreadsheet](link-to-analysis)
```

**Key lesson from this ADR:** Researching costs BEFORE selecting technology prevented a $2,400-3,600/year surprise. The team discovered the managed SFTP service would have exceeded the project budget and found a better solution by comparing all options including costs.

---

---

## Security and Compliance Design

### Security by Design

Security must be designed into the system from the start, not retrofitted later.

**OWASP Top 10 (2021):**
1. **Broken Access Control** - Enforce authorization checks on all sensitive operations
2. **Cryptographic Failures** - Encrypt sensitive data at rest and in transit (TLS, AES)
3. **Injection** - Use parameterized queries, input validation (SQL injection, XSS)
4. **Insecure Design** - Threat modeling, security controls in architecture
5. **Security Misconfiguration** - Secure defaults, disable unnecessary features
6. **Vulnerable Components** - Keep dependencies updated, scan for vulnerabilities
7. **Identification and Authentication Failures** - Strong password policies, MFA, secure session management
8. **Software and Data Integrity Failures** - Code signing, dependency verification
9. **Security Logging and Monitoring Failures** - Log security events, monitor for anomalies
10. **Server-Side Request Forgery (SSRF)** - Validate and sanitize URLs

### Authentication and Authorization

**Authentication (Who are you?):**
- Use proven libraries and frameworks (Auth0, OAuth, JWT)
- Never store passwords in plaintext (use bcrypt, Argon2)
- Implement secure password reset flows
- Consider MFA for sensitive operations

**Authorization (What can you do?):**
- Role-Based Access Control (RBAC): Admin, User, Guest roles
- Attribute-Based Access Control (ABAC): Fine-grained permissions
- Least-privilege principle: Grant minimum necessary permissions
- Validate authorization server-side (never trust client)

### Data Encryption

**In Transit:**
- Use TLS 1.3 (HTTPS for web, TLS for database connections)
- Enforce HTTPS (redirect HTTP → HTTPS)
- Use HSTS headers to prevent downgrade attacks

**At Rest:**
- Encrypt sensitive data in database (AES-256)
- Use managed encryption services (AWS RDS encryption, KMS)
- Secure key management (never hardcode keys)

### Input Validation and Sanitization

**Server-side validation:**
- Validate all inputs (type, length, format, range)
- Use whitelisting (allow known-good) over blacklisting (block known-bad)
- Sanitize inputs for output context (HTML, SQL, JavaScript)

**Example:**
```javascript
// ❌ Bad: Trusting client input
const userId = req.params.id;
const user = await db.query(`SELECT * FROM users WHERE id = ${userId}`);

// ✅ Good: Parameterized query
const userId = parseInt(req.params.id, 10);
if (isNaN(userId)) return res.status(400).json({error: 'Invalid user ID'});
const user = await db.query('SELECT * FROM users WHERE id = $1', [userId]);
```

### Compliance Requirements

**GDPR (General Data Protection Regulation):**
- Right to access: Users can export their data
- Right to deletion: Users can delete their account and data
- Right to portability: Data in machine-readable format
- Consent tracking: Record user consent for data processing
- Data residency: Store EU user data in EU regions

**HIPAA (Health Insurance Portability and Accountability Act):**
- PHI (Protected Health Information) must be encrypted
- Access controls: Log all access to PHI
- Audit trails: 6-year retention of security logs
- BAAs (Business Associate Agreements) with third parties

**SOC 2 (Service Organization Control):**
- Security: Access controls, encryption, monitoring
- Availability: Uptime SLAs, disaster recovery
- Processing Integrity: Accurate, complete, timely processing
- Confidentiality: Protect confidential information
- Privacy: Personal information handling

**Design for compliance:**
- Identify applicable regulations early
- Map requirements to design decisions
- Document compliance controls
- Plan for audit trails and logging

---

## Performance and Scalability

### Performance Targets

**Define measurable targets (from NFRs):**
- API response time: p95 <500ms, p99 <1s
- Page load time: First Contentful Paint <1.5s
- Database query time: p95 <100ms
- Throughput: 1000 requests/second

**Why percentiles (p95, p99) over averages:**
- Averages hide outliers (a few slow requests skew average down)
- p95 = 95% of requests are faster (only 5% slower)
- p99 = 99% of requests are faster (only 1% slower)

### Performance Optimization Strategies

**1. Caching**
- Cache frequently-read, rarely-changed data
- Use Redis or Memcached for in-memory caching
- Cache at multiple levels: CDN, application, database query cache
- Set appropriate TTLs (time-to-live) to balance freshness and performance

**Example:**
```javascript
// Cache user profile for 5 minutes
const cacheKey = `user:${userId}:profile`;
let profile = await cache.get(cacheKey);
if (!profile) {
  profile = await db.query('SELECT * FROM users WHERE id = $1', [userId]);
  await cache.set(cacheKey, profile, {ttl: 300}); // 5 minutes
}
return profile;
```

**2. Database Optimization**
- **Indexes:** Create indexes on columns used in WHERE, JOIN, ORDER BY
- **Query optimization:** Use EXPLAIN to analyze slow queries
- **Connection pooling:** Reuse database connections (PgBouncer, Sequelize pool)
- **N+1 query prevention:** Use JOINs or eager loading instead of loops

**3. Lazy Loading and Pagination**
- Don't load all data at once
- Paginate large result sets (limit + offset or cursor-based)
- Lazy load images and content below the fold

**4. Asynchronous Processing**
- Offload slow operations to background jobs (email, reports, analytics)
- Use job queues (Bull, Celery, Sidekiq)
- Return immediate response, process async

**5. CDN for Static Assets**
- Serve images, CSS, JavaScript from CDN (CloudFront, Cloudflare)
- Reduce latency by serving from edge locations

### Scalability Strategies

**Horizontal Scaling (Scale Out):**
- Add more servers to handle increased load
- Requires stateless design (no server-side sessions)
- Use load balancers to distribute traffic
- Example: 2 → 10 application servers as traffic grows

**Vertical Scaling (Scale Up):**
- Increase server resources (CPU, RAM, disk)
- Simpler than horizontal, but has limits
- Example: Upgrade from 2-core to 8-core server

**Database Scaling:**
- **Read replicas:** Route read queries to replicas, write to primary
- **Sharding:** Partition data across multiple databases (by user ID, region, etc.)
- **Vertical scaling:** Upgrade database instance (RDS instance size)

**Caching for Scalability:**
- Reduce database load by caching frequent queries
- Scale cache tier independently (Redis cluster)

**Stateless Design:**
- No server-side sessions (use JWT tokens or client-side sessions)
- Any server can handle any request (enables horizontal scaling)

**Example Architecture:**
```
Load Balancer (ALB)
  ↓ distributes
Application Servers (2-10 instances, auto-scaled)
  ↓ reads from
Redis Cache (read-through)
  ↓ on miss, reads from
Database Read Replicas (3 replicas)
  ↓ replicates from
Database Primary (writes)
```

---

## Observability and Monitoring

### Three Pillars of Observability

**1. Logs**
- **Purpose:** Record discrete events (errors, user actions, system events)
- **Format:** Structured JSON logs with timestamp, level, message, context
- **Tools:** CloudWatch, ELK Stack (Elasticsearch, Logstash, Kibana), Splunk

**Example:**
```json
{
  "timestamp": "2026-02-09T12:00:00Z",
  "level": "error",
  "message": "User registration failed",
  "userId": null,
  "email": "user@example.com",
  "error": "Email already exists",
  "requestId": "abc123"
}
```

**2. Metrics**
- **Purpose:** Measure quantitative data over time (counters, gauges, histograms)
- **Examples:** Request rate, error rate, response time, CPU usage, memory usage
- **Tools:** Prometheus, Grafana, CloudWatch, Datadog

**Metrics to track:**
- Application: API request rate, error rate, response time (p95, p99)
- Infrastructure: CPU, memory, disk, network
- Business: User signups, posts created, daily active users

**3. Traces**
- **Purpose:** Track requests across distributed systems (API → service → database)
- **Use case:** Microservices, debugging latency issues
- **Tools:** AWS X-Ray, Jaeger, Zipkin

### Instrumentation Strategy

**What to log:**
- Errors and exceptions (with stack traces)
- Authentication events (login, logout, failed attempts)
- Critical business events (user registration, payment processed)
- Security events (unauthorized access attempts)

**What NOT to log:**
- Passwords, API keys, secrets
- Full credit card numbers, SSNs (PII)
- Excessive debug information in production

**Metrics to collect:**
- **RED metrics (Requests, Errors, Duration):**
  - Request rate (requests per second)
  - Error rate (percentage of failed requests)
  - Duration (response time distribution: p50, p95, p99)
- **USE metrics (Utilization, Saturation, Errors):**
  - CPU/memory/disk utilization (percentage used)
  - Saturation (queue length, backlog)
  - Errors (hardware errors, disk failures)

### Alerting

**When to alert:**
- **Critical:** System down, data loss, security breach → Page on-call engineer
- **Warning:** High error rate, approaching resource limits → Email or Slack
- **Info:** Successful deployment, scheduled maintenance → Notification

**Alert best practices:**
- Actionable: Alert only when human intervention is needed
- Context: Include enough info to diagnose (error rate, affected service, timeframe)
- Avoid alert fatigue: Too many alerts → ignored alerts

**Example alert:**
```
🚨 CRITICAL: API Error Rate >5%

Current error rate: 12% (normal: <1%)
Affected endpoint: POST /api/v1/auth/login
Timeframe: Last 10 minutes
Dashboard: https://grafana.example.com/dashboard/api-errors
Runbook: https://docs.example.com/runbooks/high-error-rate
```

### Measurement Throughline

The Design stage operationalizes measurement from the Initiation stage.

**From Initiation:**
- Objectives with measurable success criteria (e.g., "Reduce support tickets by 30%")

**From Requirements:**
- NFRs specify what to measure (e.g., "NFR-5: Log all user errors with context")

**In Design:**
- Design logging, metrics, dashboards to capture success criteria
- Plan instrumentation in code

**Example:**

| Success Criterion | Metric | Instrumentation | Dashboard |
|------------------|--------|-----------------|-----------|
| Reduce support tickets by 30% | Support ticket count by category | Webhook from Zendesk to analytics DB | Weekly trend chart in Grafana |
| Improve page load time to <2s | Page load time (p95) | Real User Monitoring (RUM) via Datadog | Real-time latency dashboard |
| Increase user engagement by 20% | Daily active users (DAU), session duration | Custom events via Google Analytics | Monthly engagement report |

---

## API Design Best Practices

### REST API Conventions

**HTTP Methods:**
- **GET:** Retrieve resource (idempotent, no side effects)
- **POST:** Create resource (not idempotent)
- **PUT:** Replace resource (idempotent)
- **PATCH:** Partially update resource (not idempotent)
- **DELETE:** Remove resource (idempotent)

**Resource Naming:**
- Use nouns, not verbs: `/users` not `/getUsers`
- Plural resource names: `/users` not `/user`
- Nested resources for relationships: `/users/42/posts`

**Status Codes:**
- **2xx Success:** 200 OK, 201 Created, 204 No Content
- **4xx Client Error:** 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found
- **5xx Server Error:** 500 Internal Server Error, 503 Service Unavailable

**Versioning:**
- URL-based: `/api/v1/users`, `/api/v2/users`
- Header-based: `Accept: application/vnd.example.v1+json`
- Prefer URL-based for simplicity

**Error Format:**
```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input",
    "details": [
      {"field": "email", "message": "Invalid email format"}
    ]
  }
}
```

### API Security

**Authentication:**
- Use Bearer tokens (JWT) in Authorization header
- Example: `Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

**Rate Limiting:**
- Prevent abuse by limiting requests per user/IP
- Return `429 Too Many Requests` with `Retry-After` header
- Example: 100 requests/minute per user

**Input Validation:**
- Validate all inputs server-side
- Sanitize inputs for output context
- Use schema validation libraries (Joi, Yup)

**CORS (Cross-Origin Resource Sharing):**
- Configure allowed origins (don't use `*` in production)
- Specify allowed methods and headers

---

## Data Architecture

### Entity-Relationship Design

**Entities:** Represent business concepts (User, Post, Comment)

**Attributes:** Properties of entities (User: id, email, name)

**Relationships:** Associations between entities (User has many Posts)

**Relationship Types:**
- **One-to-Many:** User → Posts (one user has many posts)
- **Many-to-Many:** Post ↔ Tags (posts have many tags, tags apply to many posts)
- **One-to-One:** User → Profile (one user has one profile)

**Normalization:**
- Reduce redundancy by splitting data into related tables
- **1NF:** Atomic values (no repeating groups)
- **2NF:** No partial dependencies (non-key attributes depend on entire primary key)
- **3NF:** No transitive dependencies (non-key attributes depend only on primary key)

**Denormalization:**
- Intentional redundancy for performance (avoid JOINs)
- Example: Store `post_author_name` in posts table to avoid JOIN with users table
- Trade-off: Faster reads, risk of data inconsistency

### Data Migration Strategy

**Schema Migrations:**
- Version-controlled scripts to evolve database schema
- Use migration tools (Sequelize, Knex, Flyway, Liquibase)
- Always write rollback migrations

**Migration Best Practices:**
- **Additive changes:** Add columns with defaults (avoid breaking existing code)
- **Backward compatibility:** Old code works during deployment (before migration runs)
- **Test migrations:** Run on staging before production
- **Automate:** Migrations run automatically during deployment

**Example Migration:**
```javascript
// UP migration: Add 'bio' column to users table
exports.up = async (queryInterface, Sequelize) => {
  await queryInterface.addColumn('users', 'bio', {
    type: Sequelize.TEXT,
    allowNull: true,
    defaultValue: null
  });
};

// DOWN migration: Remove 'bio' column
exports.down = async (queryInterface, Sequelize) => {
  await queryInterface.removeColumn('users', 'bio');
};
```

---

## Testing Strategy

### Test Pyramid

**Unit Tests (Base - Most Tests):**
- Test individual functions and components in isolation
- Fast, deterministic, easy to debug
- Use mocks for dependencies
- Target: 80%+ code coverage

**Integration Tests (Middle - Moderate Tests):**
- Test interactions between components (API → service → database)
- Slower, requires test database
- Validate real integrations work

**End-to-End Tests (Top - Fewest Tests):**
- Test full user workflows (UI → API → database)
- Slowest, most brittle
- Use sparingly for critical paths

**Manual/UAT (Apex - Minimal Tests):**
- User acceptance testing with stakeholders
- Exploratory testing

### Test Coverage

**What to test:**
- Business logic (critical algorithms, workflows)
- Edge cases and error handling
- Security-sensitive code (authentication, authorization)
- Public APIs and contracts

**What NOT to test:**
- Trivial getters/setters
- Framework code (trust React, Express, etc.)
- Third-party libraries (trust npm packages)

**Coverage targets:**
- **Unit tests:** 80-90% of business logic
- **Integration tests:** All API endpoints
- **E2E tests:** Critical user workflows (login, purchase, etc.)

---

## When to Revisit Design

Design is not frozen - revisit when new information emerges.

### Revisit Foundational Design When:

**1. Architecture is infeasible**
- Implementation reveals the design doesn't work
- Example: Chosen framework doesn't support required features

**2. NFRs can't be met**
- Performance, scalability, or security requirements unachievable
- Example: Database can't handle expected query load

**3. Technology choice is wrong**
- Framework or platform doesn't support needed capabilities
- Example: Serverless architecture has cold start latency issues

**4. Major requirements change**
- Business needs shift significantly
- Example: Regulatory requirement mandates data residency change

**5. Production issues reveal architectural problems**
- Deployed increments expose design flaws
- Example: Monolith becomes unmaintainable, need to split into services

**6. New constraints emerge**
- Regulatory, security, or business constraints appear
- Example: GDPR compliance requires data deletion capabilities

### Revisit Iterative Design When:

**1. Implementation is blocked**
- Detailed design has errors or gaps
- Example: API spec missing required fields

**2. Code review reveals issues**
- Design doesn't account for edge cases
- Example: Error handling paths not designed

**3. Testing fails**
- Design doesn't support testability
- Example: Components too tightly coupled to mock

**4. Requirements clarified**
- Acceptance criteria become clearer during implementation
- Example: User story was ambiguous, now clear what's needed

### Revision Process

**1. Identify trigger**
- What new information emerged?
- Example: "Performance testing shows API response time is 2s (target: 500ms)"

**2. Assess impact**
- Which increments or components are affected?
- Example: "All increments using database queries affected"

**3. Update design artifacts**
- Revise architecture or detailed design
- Example: "Add Redis caching layer to design-brief"

**4. Create ADR**
- Document why the change is needed
- Example: "ADR-005: Add caching to meet performance NFRs"

**5. Communicate changes**
- Notify affected stakeholders and teams
- Example: "Slack message to engineering team: Design updated, review new caching approach"

**6. Update downstream work**
- Adjust iteration plan or in-progress implementation
- Example: "Add caching implementation to Increment 2"

---

## Common Design Anti-Patterns

### 1. Big Ball of Mud

**What it is:** System with no clear architecture, all components tightly coupled

**Symptoms:**
- Hard to understand where logic lives
- Changing one thing breaks unrelated things
- No clear component boundaries

**Solution:** Refactor into layered architecture, separate concerns

---

### 2. God Object / God Class

**What it is:** Single class or component that does too much

**Symptoms:**
- Thousands of lines of code in one file
- Class has many unrelated responsibilities
- Hard to test, hard to reuse

**Solution:** Apply Single Responsibility Principle, split into smaller components

---

### 3. Premature Optimization

**What it is:** Optimizing before knowing if there's a problem

**Symptoms:**
- Complex, clever code that's hard to understand
- Micro-optimizations with no measurable benefit

**Solution:** Build simple solution first, profile, then optimize bottlenecks

---

### 4. Analysis Paralysis

**What it is:** Over-designing, never starting implementation

**Symptoms:**
- Endless architecture meetings, no code written
- Designing for hypothetical future requirements
- Perfect design that's never built

**Solution:** Design enough to start, iterate based on feedback

---

### 5. Tight Coupling

**What it is:** Components depend directly on each other's internals

**Symptoms:**
- Changing one component requires changing others
- Hard to test in isolation
- Can't swap implementations

**Solution:** Depend on interfaces/abstractions, use dependency injection

---

### 6. Leaky Abstraction

**What it is:** Abstraction exposes underlying implementation details

**Symptoms:**
- Clients need to know how abstraction works internally
- Defeats the purpose of abstraction

**Solution:** Design clean interfaces that hide implementation

---

### 7. Golden Hammer

**What it is:** Using the same technology/pattern for everything

**Symptoms:**
- "We always use X, so we'll use it here too"
- Ignoring better alternatives

**Solution:** Evaluate options objectively, choose right tool for the job

---

## AI Assistance in Design

### AI Strengths in Design

**AI excels at:**
- **Generating architecture options** - "Show me 3 ways to design a notification system"
- **Analyzing trade-offs** - "Compare REST vs GraphQL for this use case"
- **Suggesting design patterns** - "What pattern should I use for payment processing?"
- **Creating boilerplate** - API specs, data models, ADR templates
- **Identifying edge cases** - "What could go wrong with this design?"

### AI Limitations in Design

**AI struggles with:**
- **Organizational context** - Doesn't know your team's skills, existing infrastructure
- **Business priorities** - Can't prioritize features without business context
- **Long-term maintainability** - May suggest trendy tech that's hard to maintain
- **Security nuances** - May miss subtle security vulnerabilities

### Best Practices for AI-Assisted Design

**1. Use AI for exploration**
- Generate multiple design options
- Ask AI to analyze trade-offs
- Example: "Show me 3 database options for this use case with pros/cons"

**2. Human makes final decisions**
- AI provides options, human chooses based on context
- Document decision in ADR with rationale

**3. Validate AI suggestions**
- Review AI-generated designs with experienced engineers
- Check for security, performance, maintainability issues

**4. Iterate with AI**
- Use AI to refine designs based on feedback
- Example: "The team is concerned about complexity - simplify this design"

**5. Document AI-assisted decisions**
- Note in ADR: "Options generated with AI assistance, decision made by team"

### AI Assistance Examples

**Prompt:** "I need to design a user authentication system for a web app. Requirements: Email/password login, JWT tokens, password reset. What are my options?"

**AI Response:**
```
Option 1: Build custom auth with bcrypt + JWT
  Pros: Full control, no vendor lock-in
  Cons: Time-consuming, security risks if done wrong

Option 2: Use Auth0 (managed service)
  Pros: Fast implementation, best practices built-in, MFA support
  Cons: Cost, vendor dependency

Option 3: Use Passport.js (library)
  Pros: Well-tested library, flexible strategies
  Cons: Still need to implement JWT generation, password reset

Recommendation: Option 2 (Auth0) for fastest time-to-market with best security.
If budget is tight or you need full control, Option 1 with careful security review.
```

**Human decision:** Choose Option 2, document in ADR-002.

---

**Related Documents:**
- [Design Brief Template](design-brief-template.md) - Template for documenting design
- [Design Checklist](design-checklist.md) - Validate design readiness
- [Design AI Agent Prompt](design-ai-agent-prompt.md) - AI assistance for design work
- [STAGES.md](../../STAGES.md) - Design stage definition
- [AI Autonomy Scorecard](../../AI_AUTONOMY_SCORECARD.md) - AI autonomy guidance

---

## Notes

Added to framework in v0.4.0.
