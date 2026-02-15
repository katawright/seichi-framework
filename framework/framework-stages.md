# AI-Assisted SDLC Stages

**Last Updated:** 2026-02-15

## Overview

The AI-Assisted SDLC framework uses **7 stages** that balance comprehensive
coverage with practical simplicity. The stages are designed to be:

- **Methodology-agnostic** - Works for agile, waterfall, and hybrid approaches
- **Role-appropriate** - Each stage led by the role best suited to the work
- **Cross-functional** - Clear handoffs between business and technical
  stakeholders
- **AI-friendly** - Each stage has specific guidance for leveraging AI
  assistance
- **Measurable** - Success criteria flow from Initiation through Support

The framework recognizes that stages execute in different patterns: some are
foundational (execute once), some are iterative (repeat per increment), and some
are continuous (ongoing).

For operational guidance on AI autonomy levels at each stage, see the
**[AI Autonomy Scorecard](framework-ai-autonomy.md)**, which evaluates each
stage across fit, verifiability, risk, and recommended autonomy levels.

---

## Decision Points and Checkpoints

Throughout the SDLC, various checkpoints ensure quality, alignment, and sound
decision-making. The framework distinguishes five types of checkpoints, each
with different purposes and outcomes:

### 1. Gates (Investment Decisions)

**Purpose:** Decide whether to continue investing resources in the project
**Outcome:** Proceed / Pivot / Stop **Real stop option:** Yes - these are
genuine go/no-go decisions **When used:** Early in the project when stopping is
still realistic

**Examples:**

- **Gate 1:** End of Initiation - Approve brief and fund Requirements work?
- **Gate 2:** End of Requirements + Design (foundational) - Commit to building
  this?

**AI validation:** Ensure AI-assisted analysis and recommendations are sound;
human owns the investment decision.

**After Gate 2:** The project is funded and team committed. Later checkpoints
focus on "when/how to proceed" rather than "if."

### 2. Quality Checkpoints

**Purpose:** Ensure quality and readiness standards are met before proceeding
**Outcome:** Ready / Not Ready (with remediation needed) **Real stop option:**
No - fix issues and retry, don't stop the project **When used:** Throughout
development to maintain quality bars

**Examples:**

- Code review approval
- Test coverage thresholds met
- Security scan passed
- Performance benchmarks achieved
- Documentation completeness check

**AI validation:** Human review of AI-generated code, tests, and documentation
is critical. Verify:

- AI-generated code is correct, secure, and maintainable
- AI-generated tests provide meaningful coverage
- AI-generated docs are accurate and complete

### 3. Deployment Approvals

**Purpose:** Authorize deployment to a specific environment **Outcome:** Deploy
/ Hold / Rollback **Real stop option:** No - about timing and rollback, not
project cancellation **When used:** When releasing to staging, production, or
progressive rollout milestones

**Examples:**

- Staging deployment approval
- Production deployment go/no-go
- Rollout gates (10% → 50% → 100%)
- Emergency rollback decisions

**AI validation:** Ensure AI-assisted deployment automation is safe and
monitored. Verify deployment plans and rollback procedures.

### 4. Alignment Reviews

**Purpose:** Synchronize stakeholders, gather feedback, ensure consensus
**Outcome:** Aligned / Adjustments Needed **Real stop option:** No - about
refinement and convergence **When used:** When stakeholder input or team
alignment is needed

**Examples:**

- Design review with stakeholders
- Sprint review/demo
- Architecture review
- Requirements walkthrough

**AI validation:** Review AI-generated designs, architectures, and requirements
with the team. Ensure AI recommendations align with stakeholder needs and
constraints.

### 5. Compliance Approvals

**Purpose:** Obtain required sign-offs from legal, security, or regulatory teams
**Outcome:** Approved / Remediation Required **Real stop option:** Technically
yes, but rarely - usually remediate and resubmit **When used:** When regulatory,
legal, or security requirements must be met

**Examples:**

- Legal review (privacy, licensing, terms)
- Security review (vulnerability assessment, threat modeling)
- Accessibility compliance verification
- Data privacy impact assessment

**AI validation:** Ensure AI outputs meet compliance requirements:

- AI-generated code doesn't introduce security vulnerabilities
- AI-assisted data handling respects privacy regulations
- AI recommendations consider legal and regulatory constraints

### Using Checkpoints in This Framework

Each stage specifies which checkpoint types apply. For example:

- **Initiation:** Gate 1 (investment decision)
- **Requirements:** Alignment Reviews (stakeholder walkthroughs), Gate 2
  (build/no-build decision)
- **Implementation:** Quality Checkpoints (code review, tests), Deployment
  Approvals (to staging)
- **Verification:** Quality Checkpoints (test execution), Deployment Approvals
  (production readiness)
- **Deployment:** Deployment Approvals (production deployment, rollout gates)

**Human validation of AI output is required at all checkpoint types.** The AI
Autonomy Scorecard provides stage-specific guidance on where AI can work more
independently vs. where human oversight is critical.

---

## Quick Reference

| #   | Stage          | Primary Role        | Pattern                  | Purpose                                                  |
| --- | -------------- | ------------------- | ------------------------ | -------------------------------------------------------- |
| 1   | Initiation     | PM/BA               | Foundational             | Establish business case with measurable success criteria |
| 2   | Requirements   | BA/PM               | Foundational             | Define testable requirements with acceptance criteria    |
| 3   | Design         | Engineers/Architect | Foundational + Iterative | Create system architecture and detailed designs          |
| 4   | Implementation | Engineers           | Iterative                | Build working code                                       |
| 5   | Verification   | QA/Engineers        | Iterative                | Validate through testing and acceptance                  |
| 6   | Deployment     | DevOps/Engineers    | Iterative                | Release to production                                    |
| 7   | Support        | Engineers/DevOps    | Continuous               | Monitor, maintain, and enhance                           |

---

## Stage 1: Initiation

**Primary Role:** Product Manager / Business Analyst **Supporting Roles:**
Executives, Solutions Architect, Engineers **Execution Pattern:** Foundational
(once per project, revisitable)

### Purpose

Establish the business case, define objectives with measurable success criteria,
set scope boundaries, and produce a plan to reach the first major decision gate
(proceed/pivot/stop).

### Inputs

**Required:**

- Business opportunity or problem statement
- Initial stakeholder list
- Rough budget constraints

**Optional:**

- Market research or competitive analysis
- Existing system documentation (for enhancements)
- Regulatory or compliance requirements

### Entry Criteria

- Business opportunity identified and sponsor assigned
- Initial funding/resources allocated for discovery
- Key stakeholders available for interviews

### Key Activities

- Define business case and value proposition
- Establish objectives with measurable success criteria
- Identify scope boundaries, constraints, and assumptions
- Assess major risks and unknowns
- Create range-based plan for discovery phase (Requirements + Design)
- Define success metrics (business, technical, project)

---

### Outputs

- **Initiation Brief** - One-page summary of project (see
  `initiation-brief-template.md`)
- Objectives with measurable success criteria documented
- Assumptions and risks list
- High-level timeline and resource estimate (range-based)

### Exit Criteria

- Stakeholders approve business case and objectives
- Success metrics are defined and measurable
- Scope boundaries are clear
- Go/no-go decision made

### Checkpoints

- **Gate 1 (Investment Decision):** End of Initiation stage
  - **Decision:** Approve brief and proceed to Requirements, pivot to refine the
    idea, or stop the project
  - **Based on:** Completed Initiation Brief
  - **Criteria:** Business case clear, stakeholders aligned, risks acceptable,
    sponsor committed
  - **AI validation:** Human review ensures AI-assisted brief analysis is sound
    and recommendations are appropriate

### Handoff to Next Stage

Requirements stage receives: Initiation Brief with objectives, measurable
success criteria, constraints, and stakeholder list.

---

## Stage 2: Requirements

**Primary Role:** Business Analyst / Product Manager **Supporting Roles:**
Engineers, Architects, QA Engineers **Execution Pattern:** Foundational (once
per project, revisitable)

### Purpose

Convert business objectives into testable requirements with acceptance criteria
that enable coherent design decisions, accurate test planning, and reduced
rework from ambiguity.

### Inputs

**Required:**

- Initiation Brief (with objectives and measurable success criteria)
- Stakeholder list and availability

**Optional:**

- Existing system documentation
- User research or personas
- Regulatory/compliance requirements
- Competitive analysis

### Entry Criteria

- Initiation Brief approved
- Stakeholders available for requirements elicitation
- Key success metrics defined

### Key Activities

- Elicit and document functional requirements (FRs)
- Define acceptance criteria (AC) for each requirement
- Identify non-functional requirements (NFRs): performance, security,
  scalability, usability
- Prioritize requirements for incremental delivery (MVP vs. future)
- Ensure NFRs include instrumentation for measuring success criteria
- Validate requirements with stakeholders

---

### Outputs

- **Requirements Document** - Functional and non-functional requirements (see
  `requirements-brief.md`)
- User stories or use cases with acceptance criteria
- Prioritized feature backlog
- Requirements traceability to objectives and success criteria

### Exit Criteria

- All high-priority requirements have acceptance criteria
- Requirements reviewed and approved by business and technical stakeholders
- NFRs include measurement/instrumentation needs
- Requirements are testable and unambiguous

### Handoff to Next Stage

Design stage receives: Requirements document with acceptance criteria,
prioritized backlog, NFRs, and success criteria to be instrumented.

---

## Stage 3: Design

**Primary Role:** Engineers / Solutions Architect **Supporting Roles:** Product
Manager, QA Engineers, DevOps **Execution Pattern:** Foundational + Iterative
(initial architecture, then per-increment designs)

### Purpose

Establish overall system architecture and technical approach (foundational),
then create detailed designs for specific increments (iterative). Translate
requirements into implementable technical solutions.

### Inputs

**Required:**

- Requirements document with acceptance criteria
- Non-functional requirements (performance, security, etc.)
- Success criteria requiring instrumentation

**Optional:**

- Existing system architecture (for enhancements)
- Technology constraints or standards
- Third-party API documentation

### Entry Criteria

- Requirements approved and prioritized
- NFRs are clear
- Technical team assigned

### Key Activities

**Foundational (first pass):**

- Define system architecture and major components
- Select technology stack and frameworks
- Design data models and persistence strategy
- Plan observability/monitoring for success criteria
- Create API contracts and interfaces
- Assess security and compliance requirements
- Plan for scalability and performance

**Iterative (per increment):**

- Detail design for specific features/stories
- Define component interactions for increment
- Create database schema changes
- Plan testing approach for increment

---

### Outputs

- **Architecture Diagrams** - System components and interactions (see
  `design-architecture.md`)
- **Detailed Design Documents** - Per increment (see `design-brief.md`)
- Data models and API specifications
- Architecture Decision Records (ADRs) for key choices
- Test strategy and approach

### Exit Criteria

- Architecture reviewed and approved (foundational)
- Design supports all requirements for increment (iterative)
- Security and performance considerations addressed
- Design is implementable within constraints

### Handoff to Next Stage

Implementation stage receives: Architecture diagrams, detailed design for
increment, API specs, data models, and test strategy.

**Note for Enterprise Organizations:** Large teams may split this stage into:

- **3a. Architecture** - System-level design, architecture board review
- **3b. Detailed Design** - Component-level design, tech lead review

---

## Stage 4: Implementation

**Primary Role:** Engineers **Supporting Roles:** Architects, DevOps, QA
Engineers **Execution Pattern:** Iterative (per increment)

### Purpose

Build working code that implements the detailed design for the current
increment, following engineering best practices and professional standards.

### Inputs

**Required:**

- Detailed design for increment
- Architecture diagrams and API specifications
- Requirements with acceptance criteria
- Success criteria requiring measurement

**Optional:**

- Existing codebase (for enhancements)
- Code style guides and standards
- Reusable components or libraries

### Entry Criteria

- Design approved for increment
- Development environment ready
- Dependencies and APIs available (or mocked)

### Key Activities

- Write code following design specifications
- Implement instrumentation for success criteria
- Create unit tests
- Perform peer code reviews
- Refactor for code quality
- Document code and APIs

---

### Outputs

- **Working Code** - Committed to version control
- Unit tests with passing results
- Code review approvals
- Updated documentation

---

### Exit Criteria

- Code complete for increment scope
- Unit tests pass
- Code review approved
- Code meets quality standards (linting, coverage thresholds)

### Handoff to Next Stage

Verification stage receives: Working code on branch/environment, unit test
results, and implementation notes.

---

## Stage 5: Verification

**Primary Role:** QA Engineers / Engineers **Supporting Roles:** Product
Manager, Business Analyst, DevOps **Execution Pattern:** Iterative (per
increment)

### Purpose

Validate that the increment works correctly through comprehensive testing and
acceptance. Encompasses verification (built correctly) and validation (built the
right thing).

### Inputs

**Required:**

- Working code from Implementation
- Requirements with acceptance criteria
- Test strategy from Design stage

**Optional:**

- Test data or fixtures
- Performance benchmarks
- Security testing requirements

### Entry Criteria

- Code complete and unit tests pass
- Test environment ready
- Test data available

### Key Activities

- Execute integration testing
- Perform functional testing against acceptance criteria
- Conduct User Acceptance Testing (UAT) with business stakeholders
- Run performance and load testing
- Execute security testing (vulnerability scans, penetration testing)
- Validate accessibility requirements
- Test instrumentation/monitoring systems
- Verify success criteria are measurable

---

### Outputs

- **Test Results** - All test types with pass/fail status (see
  `verification-report.md`)
- Defect reports and resolution status
- UAT sign-off from business stakeholders
- Performance test results
- Security scan results

---

### Exit Criteria

- All acceptance criteria met
- No critical or high-priority defects
- UAT approved by business stakeholders
- Performance meets NFRs
- Security vulnerabilities addressed
- Monitoring/instrumentation verified

### Handoff to Next Stage

Deployment stage receives: Verified code, test reports, UAT approval, and
deployment checklist.

---

## Stage 6: Deployment

**Primary Role:** DevOps / Engineers **Supporting Roles:** Operations, Product
Manager, Engineers **Execution Pattern:** Iterative (per increment)

### Purpose

Release verified increments to production following controlled procedures, with
monitoring and rollback capabilities.

### Inputs

**Required:**

- Verified code with test approvals
- UAT sign-off
- Deployment checklist

**Optional:**

- Rollback plan
- Canary or blue-green deployment strategy
- Release notes

### Entry Criteria

- All verification tests pass
- UAT approved
- Production environment ready
- Deployment plan reviewed

### Key Activities

- Execute deployment procedures
- Configure monitoring and alerting
- Verify health checks and smoke tests
- Monitor initial production behavior
- Capture baseline measurements for success criteria
- Update documentation and runbooks
- Communicate release to stakeholders

---

### Outputs

- **Deployed System** - Increment live in production
- Deployment log and verification
- Updated runbooks and operational procedures
- Release notes and change documentation
- Baseline measurements captured

---

### Exit Criteria

- Increment successfully deployed
- Health checks pass
- Monitoring active and baseline measurements captured
- Rollback procedures tested (if applicable)
- Stakeholders notified

### Handoff to Next Stage

Support stage receives: Deployed system, runbooks, monitoring dashboards, and
baseline measurements for success criteria.

---

## Stage 7: Support

**Primary Role:** Engineers / DevOps **Supporting Roles:** Operations, Customer
Support, Product Manager **Execution Pattern:** Continuous (ongoing after first
deployment)

### Purpose

Monitor production systems, track success criteria, respond to incidents, fix
bugs, and implement minor enhancements. Ensure system reliability and gather
feedback for future improvements.

### Inputs

**Required:**

- Deployed system in production
- Monitoring dashboards and alerts
- Runbooks and operational procedures
- Defined success criteria and baseline measurements

**Optional:**

- SLA/SLO definitions
- Incident response procedures
- User feedback channels

### Entry Criteria

- At least one increment deployed to production
- Monitoring and alerting configured
- Support procedures documented

### Key Activities

- Monitor production systems and success criteria
- Track progress toward measurable goals and report status
- Respond to incidents and outages
- Triage and fix bugs
- Implement minor enhancements and improvements
- Manage dependency updates and security patches
- Analyze logs and metrics for optimization
- Gather user feedback
- Plan for future iterations based on learnings

---

### Outputs

- **System Availability** - Uptime and reliability metrics
- **Success Criteria Reports** - Progress toward measurable goals
- Incident reports and resolutions
- Bug fixes and patches
- Enhancement backlog for future increments
- Performance optimization recommendations

### Exit Criteria

N/A (continuous stage)

### Handoff to Next Stage

Support stage may trigger revisits to earlier stages:

- Requirements stage: User feedback reveals gaps or new needs
- Design stage: Performance issues require architectural changes
- Implementation stage: Bug fixes and enhancements

---

## Execution Patterns

### Foundational Stages

**Execute once per project, revisit when needed**

- **Initiation** - Set project vision
- **Requirements** - Define what to build
- **Design (foundational pass)** - Establish architecture

These stages create the project foundation but are not frozen. Revisit when:

- User feedback shows requirements miss the mark
- Implementation reveals unanticipated constraints
- Business priorities or context shift significantly
- Measurement shows objectives are off-target or success criteria need
  adjustment

### Iterative Stages

**Execute repeatedly per increment/feature/sprint**

- **Design (iterative pass)** - Detail design for increment
- **Implementation** - Build increment
- **Verification** - Test and validate increment
- **Deployment** - Release increment

These stages repeat for each deliverable chunk of work. An "increment" might be
called an epic, feature, sprint deliverable, or release increment depending on
your methodology.

### Continuous Stages

**Ongoing after first production deployment**

- **Support** - Monitor, maintain, enhance

This stage runs continuously, supporting all deployed increments and feeding
learnings back into future iterations.

---

## Measurement Throughline

Measurable success criteria established in Initiation flow through all stages:

| Stage              | How Measurement Is Used                                                                          |
| ------------------ | ------------------------------------------------------------------------------------------------ |
| **Initiation**     | Define objectives with measurable success criteria; establish measurement approach and targets   |
| **Requirements**   | Ensure NFRs include instrumentation/telemetry; acceptance criteria ladder up to success criteria |
| **Design**         | Design analytics infrastructure, dashboards, monitoring systems, and data collection             |
| **Implementation** | Implement logging, metrics collection, instrumentation, and measurement systems                  |
| **Verification**   | Test that measurement systems work; validate acceptance criteria tied to success criteria        |
| **Deployment**     | Deploy with monitoring configured; capture baseline measurements in production                   |
| **Support**        | Monitor success criteria in production; validate whether objectives achieved; report progress    |

This ensures goals aren't just documented and forgotten—they actively guide
development and enable data-driven validation of success.

---

## Stage Relationships and Flow

### Linear Flow (Waterfall-style)

```
Initiation → Requirements → Design → Implementation
→ Verification → Deployment → Support
```

### Iterative Flow (Agile-style)

```
Initiation (once)
    ↓
Requirements (once)
    ↓
Design - foundational (once)
    ↓
┌────────────────────────────┐
│ Per Increment:             │
│   Design (detail)          │
│      ↓                     │
│   Implementation           │
│      ↓                     │
│   Verification             │
│      ↓                     │
│   Deployment               │
└────────────────────────────┘
    ↓
Support (continuous)
```

### Feedback Loops

- **Support → Requirements:** User feedback reveals new requirements
- **Support → Design:** Performance issues need architectural changes
- **Verification → Implementation:** Test failures require code fixes
- **Verification → Design:** Design flaws discovered during testing
- **Support → Initiation:** Success metrics indicate objectives need revision

---

## Artifact Placeholders

Each stage produces specific artifacts. Detailed templates and examples will be
created for:

- `initiation-brief-template.md` - One-page project summary with measurable
  success criteria
- `initiation-checklist.md` - Readiness checklist
- `initiation-guide.md` - Detailed guidance with example explorations
- `requirements-brief.md` - Requirements with acceptance criteria
- `requirements-checklist.md` - Requirements completeness check
- `requirements-guide.md` - Requirements best practices with example questions
- `design-architecture.md` - System architecture documentation
- `design-brief.md` - Detailed design per increment
- `design-checklist.md` - Design review checklist
- `design-guide.md` - Design patterns and best practices with example
  explorations
- `implementation-brief.md` - Implementation notes and decisions
- `implementation-checklist.md` - Code completion checklist
- `implementation-guide.md` - Coding standards and practices
- `verification-report.md` - Test results and approvals
- `verification-checklist.md` - Testing completeness check
- `verification-guide.md` - Testing strategies and approaches
- `deployment-brief.md` - Deployment plan and results
- `deployment-checklist.md` - Deployment readiness check
- `deployment-guide.md` - Deployment best practices
- `support-brief.md` - Ongoing support plan
- `support-checklist.md` - Support readiness check
- `support-guide.md` - Operations and maintenance guidance

Each stage will include a `README.md` explaining the artifacts and workflow.

---

## Enterprise Extensions

### Splitting the Design Stage

Large organizations or complex projects may split Stage 3 (Design) into two
stages:

**3a. Architecture**

- System-level design and technology decisions
- Reviewed by architecture board or technical leadership
- Produces: Architecture diagrams, ADRs, technology stack decisions
- Gate: Architecture board approval

**3b. Detailed Design**

- Component-level design for specific increments
- Reviewed by tech leads and senior engineers
- Produces: Detailed component designs, API specs, data models
- Gate: Tech lead approval

Most small-to-medium teams should keep Design as a single stage with
foundational and iterative passes.

### Adding Governance Stages

Enterprise organizations may add governance checkpoints:

- Security review stage (after Design or Implementation)
- Compliance validation (after Verification)
- Change Advisory Board approval (before Deployment)

These can be inserted as gates within stages rather than separate stages to
maintain the 7-stage simplicity.

---

## Notes

Added to framework in v0.9.0.
