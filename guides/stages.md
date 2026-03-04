---
id: stages
type: guide
concerns: [stage-definitions, inputs-outputs, gates, execution-patterns]
---

# AI-Assisted SDLC Stages

## Overview

**8 stages** that balance comprehensive coverage with practical simplicity for
AI-assisted software delivery.

### Why Defined Stages

Software projects have natural phases, but without explicit stage definitions
teams skip critical activities, handoffs between roles break down, and goals set
early never connect to what gets measured in production. AI amplifies this
problem — it can generate artifacts quickly, but without clear inputs, outputs,
and exit criteria for each stage, teams lose track of what's been validated and
what's just been drafted.

### Purpose

- Define what happens at each stage — inputs, activities, outputs, and exit
  criteria
- Provide methodology-agnostic stages that work for agile, waterfall, and hybrid
  approaches
- Ensure cross-functional handoffs between business and technical stakeholders
- Establish a measurement throughline from business objectives to production
  metrics

For operational guidance on AI assistance levels at each stage, see the
**[AI Assistance Scorecard](ai-assistance.md)**.

### Key Principle

Each stage is led by the role best suited to the work, with AI assistance
bounded by verifiability and risk. Success criteria established in Initiation
flow through every subsequent stage.

### How to Use This Guide

1. Review the [**Quick Reference**](#quick-reference) table to see all 8 stages
   at a glance
2. Understand [**How Stages Execute**](#how-stages-execute) (Foundational,
   Iterative, Continuous)
3. Drill into individual [**stage definitions**](#stage-1-initiation) for
   inputs, activities, outputs, and exit criteria
4. See [**Checkpoints**](#checkpoints) for the gate and review types that govern
   progression

---

## Quick Reference

<!-- Keep this table in sync with guides/framework.md and README.md -->

| #   | Stage            | Primary Role          | Pattern      | Purpose                                                                                                    |
| --- | ---------------- | --------------------- | ------------ | ---------------------------------------------------------------------------------------------------------- |
| 1   | Initiation       | PM / BA               | Foundational | Establish business case with measurable success criteria                                                   |
| 2   | Requirements     | BA / PM               | Foundational | Define testable requirements with FR acceptance criteria and NFR verification criteria                     |
| 3   | System Design    | Engineers / Architect | Foundational | Establish or assess system architecture and technical approach                                             |
| 4   | Increment Design | Engineers             | Iterative    | Plan implementation approach AND test strategy for increment                                               |
| 5   | Implementation   | Engineers             | Iterative    | Execute implementation plan from Increment Design                                                          |
| 6   | Verification     | QA / Engineers        | Iterative    | Execute test strategy from Increment Design, validate FR acceptance criteria and NFR verification criteria |
| 7   | Deployment       | DevOps / Engineers    | Iterative    | Release to production                                                                                      |
| 8   | Support          | Engineers / DevOps    | Continuous   | Monitor, maintain, and enhance                                                                             |

---

## How Stages Execute

The 8 stages follow three execution patterns:

- **Foundational** (Initiation, Requirements, System Design) — Execute once per
  project to establish the project foundation. Revisit when:
  - User feedback shows requirements miss the mark
  - Implementation reveals unanticipated constraints
  - Business priorities or context shift significantly
  - Measurement shows objectives are off-target or success criteria need
    adjustment

- **Iterative** (Increment Design, Implementation, Verification, Deployment) —
  Repeat for each increment of deliverable work. An "increment" maps to whatever
  unit your methodology uses: epic, feature, sprint deliverable, or release.

- **Continuous** (Support) — Ongoing after first production deployment. Feeds
  learnings back into future iterations and may trigger revisits to earlier
  stages.

### Stage Flow

#### Linear Flow (Waterfall-style)

```
Initiation → Requirements → System Design → Increment Design
→ Implementation → Verification → Deployment → Support
```

#### Iterative Flow (Agile-style)

```
Initiation (once)
    ↓
Requirements (once)
    ↓
System Design (once)
    ↓
┌────────────────────────────┐
│ Per Increment:             │
│   Increment Design         │
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

---

## Measurement Throughline

Measurable success criteria established in Initiation flow through all stages:

| Stage                | How Measurement Is Used                                                                                                       |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| **Initiation**       | Define objectives with measurable success criteria; establish measurement approach and targets                                |
| **Requirements**     | Ensure NFRs include verification criteria and instrumentation/telemetry; FR acceptance criteria ladder up to success criteria |
| **System Design**    | Design analytics infrastructure, dashboards, monitoring systems, and data collection                                          |
| **Increment Design** | Plan test strategy, specify what to measure per increment                                                                     |
| **Implementation**   | Implement logging, metrics collection, instrumentation, and measurement systems                                               |
| **Verification**     | Test that measurement systems work; validate FR acceptance criteria and NFR verification criteria tied to success criteria    |
| **Deployment**       | Deploy with monitoring configured; capture baseline measurements in production                                                |
| **Support**          | Monitor success criteria in production; validate whether objectives achieved; report progress                                 |

This ensures goals aren't just documented and forgotten—they actively guide
development and enable data-driven validation of success.

---

## Learning Throughline

Continuous learning — anticipating failure modes early and reflecting on what
actually happened — keeps teams from repeating mistakes across increments:

| Stage                | Learning role                                                    |
| -------------------- | ---------------------------------------------------------------- |
| **Initiation**       | Pre-mortem: identify top failure modes before committing         |
| **Requirements**     | Flag ambiguous or assumption-heavy requirements as learning risk |
| **System Design**    | Pre-mortem lens on architecture: what's hardest to reverse?      |
| **Increment Design** | Review pre-mortem assumptions; carry forward prior retro actions |
| **Implementation**   | Note surprises and deviations as they happen                     |
| **Verification**     | Capture what tests reveal about design assumptions               |
| **Deployment**       | Run increment retrospective (optional) or project retrospective  |
| **Support**          | Ongoing retros surface systemic patterns; feed back to planning  |

Pre-mortems happen once at the project level (Initiation); retrospectives happen
at increment boundaries (optional) and at project wrap-up (recommended). See the
[Retrospective Template](../templates/retrospective.md).

---

## Security Throughline

Security activities flow through every stage, from data classification in
Initiation through vulnerability management in Support. AI automation makes
baseline security nearly free at the Minimal tier:

| Stage                | Security role                                               |
| -------------------- | ----------------------------------------------------------- |
| **Initiation**       | Classify data sensitivity and compliance scope              |
| **Requirements**     | Define security NFRs from sensitivity classification        |
| **System Design**    | Design security architecture; threat model at tier level    |
| **Increment Design** | Assess security implications; flag auth/data/API changes    |
| **Implementation**   | Secure coding + AI-automated scanning (SAST, deps, secrets) |
| **Verification**     | Validate security controls (dep scan through pen testing)   |
| **Deployment**       | Verify release integrity; SBOM; pre-deployment checks       |
| **Support**          | Monitor CVEs; patch per SLA; incident response              |

Security decisions compound across stages — data sensitivity classified in
Initiation drives NFRs in Requirements, which drive architecture in System
Design, which drive scanning in Implementation. For the full stage-by-stage
breakdown, AI automation tiers, and SSDF traceability, see the
[Security Guide](security.md).

---

## Stage 1: Initiation

- **Primary Role:** Product Manager / Business Analyst
- **Supporting Roles:** Executives, Solutions Architect, Engineers, Project
  Manager
- **Execution Pattern:** Foundational (once per project, revisitable)

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

### Outputs

- **Initiation Brief** - One-page summary of project (see
  [Initiation Brief Template](../templates/initiation-brief.md))
- **Success Criteria Register** - Measurable goals with baselines and targets
  (see [Success Criteria Register](../templates/success-criteria-register.md))
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
  - **Based on:** Completed Initiation Brief (which proposes decision criteria)
  - **Criteria:** Business case clear, stakeholders aligned, risks acceptable,
    sponsor committed
  - **Record decision:** Use the
    [Gate Decision Template](../templates/gate-decision.md)
  - **AI validation:** Human review ensures AI-assisted brief analysis is sound
    and recommendations are appropriate

### Handoff to Next Stage

Requirements stage receives: Initiation Brief with objectives, measurable
success criteria, constraints, and stakeholder list.

---

## Stage 2: Requirements

- **Primary Role:** Business Analyst / Product Manager
- **Supporting Roles:** Engineers, Architects, QA Engineers, Project Manager
- **Execution Pattern:** Foundational (once per project, revisitable)

### Purpose

Convert business objectives into testable requirements with FR acceptance
criteria and NFR verification criteria that enable coherent design decisions,
accurate test planning, and reduced rework from ambiguity.

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
- Define FR acceptance criteria (AC) for each functional requirement
- Identify non-functional requirements (NFRs): performance, security,
  scalability, usability
- Prioritize requirements for incremental delivery (MVP vs. future)
- Ensure NFRs include verification criteria and instrumentation for measuring
  success criteria
- Validate requirements with stakeholders

### Outputs

- **Requirements Document** - Functional and non-functional requirements (see
  [Requirements Brief Template](../templates/requirements-brief.md))
- User stories or use cases with FR acceptance criteria
- Prioritized feature backlog
- Requirements traceability to objectives and success criteria

### Exit Criteria

- All high-priority FRs have acceptance criteria
- Requirements reviewed and approved by business and technical stakeholders
- NFRs include verification criteria and measurement/instrumentation needs
- Requirements are testable and unambiguous

### Handoff to Next Stage

System Design stage receives: Requirements document with FR acceptance criteria,
prioritized backlog, NFRs with verification criteria, and success criteria to be
instrumented.

---

## Stage 3: System Design

- **Primary Role:** Engineers / Solutions Architect
- **Supporting Roles:** Product Manager, QA Engineers, DevOps, Project Manager
- **Execution Pattern:** Foundational (once per project, revisitable)

### Purpose

Establish overall system architecture, technology choices, infrastructure plan,
and increment roadmap. Translate requirements into a technical foundation that
guides all subsequent implementation work.

### Inputs

**Required:**

- Requirements document with FR acceptance criteria
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

- Define system architecture and major components
- Select technology stack and frameworks
- Design data models and persistence strategy
- Plan observability/monitoring for success criteria
- Create API contracts and conventions
- Assess security and compliance requirements
- Plan for scalability and performance
- Plan infrastructure (CI/CD, deployment, environments)
- Create increment plan mapping MoSCoW to increments

### Outputs

- **Architecture Diagrams** — System components and interactions
- **Technology Stack** — Decisions documented in ADRs
- **Data/API Architecture** — Entity models, API conventions, integration
  patterns
- **Infrastructure Plan** — CI/CD, environments, deployment, monitoring
- **Increment Plan** — Requirements mapped to increments with estimates
- **Gate 2 Decision Package** — Cost estimates, risks, recommendation

### Exit Criteria

- Architecture reviewed and approved
- Technology choices documented in ADRs with cost analysis
- Increment plan created with MoSCoW mapping
- Security, performance, and observability addressed
- Infrastructure plan complete
- Gate 2 decision made (proceed/pivot/stop)

### Checkpoints

- **Alignment Review:** Architecture and technology decisions reviewed with
  stakeholders
- **Gate 2 (Investment Decision):** After Requirements and System Design are
  both complete
  - **Decision:** Commit to building this, pivot to change approach, or stop
  - **Based on:** Architecture, increment plan, cost estimates, risk assessment
  - **Criteria:** Technical approach sound, costs acceptable, risks manageable
  - **AI validation:** Human review ensures AI-assisted design is
    architecturally sound

### Handoff to Next Stage

Increment Design stage receives: System architecture, technology decisions, API
conventions, data architecture, infrastructure plan, and increment plan.

---

## Stage 4: Increment Design

- **Primary Role:** Engineers
- **Supporting Roles:** QA Engineers, Product Manager, Project Manager
- **Execution Pattern:** Iterative (per increment)

### Purpose

Create detailed specifications for implementing a specific increment, including
component designs, API specs, data model changes, and test strategy for
Verification.

### Inputs

**Required:**

- System architecture and conventions from System Design
- Increment plan identifying current increment scope
- Requirements with FR acceptance criteria for this increment

**Optional:**

- Previous increment learnings and retrospective action items
- Updated constraints from implementation feedback

### Entry Criteria

- System Design approved (Gate 2 passed)
- Current increment identified from increment plan
- Dependencies for this increment available (or mocked)

### Key Activities

- Detail component designs for increment features
- Define component interactions and data flow
- Create database schema changes with migrations
- Specify API endpoints with request/response formats
- Plan testing approach for Verification stage
- Document implementation guidance

### Outputs

- **Component Designs** — Detailed specifications per component
- **API Specifications** — Endpoint details with validation and error handling
- **Data Model Changes** — Schema changes with migration and rollback plans
- **Test Strategy** — Unit, integration, acceptance, and performance test plans
- **Implementation Notes** — Security, performance, and code pattern guidance

### Exit Criteria

- Component designs detailed enough to implement
- API specs complete and follow established conventions
- Data model changes include migration and rollback
- Test strategy ready for Verification stage
- No major unknowns or blockers

### Handoff to Next Stage

Implementation stage receives: Detailed component designs, API specs, data
models, test strategy, and implementation notes.

---

## Stage 5: Implementation

- **Primary Role:** Engineers
- **Supporting Roles:** Architects, DevOps, QA Engineers
- **Execution Pattern:** Iterative (per increment)

### Purpose

Build working code that implements the detailed design for the current
increment, following engineering best practices and professional standards.

### Inputs

**Required:**

- Detailed design from Increment Design stage
- Architecture diagrams and API specifications
- Requirements with FR acceptance criteria
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

### Outputs

- **Working Code** - Committed to version control
- Unit tests with passing results
- Code review approvals
- Updated documentation

### Exit Criteria

- Code complete for increment scope
- Unit tests pass
- Code review approved
- Code meets quality standards (linting, coverage thresholds)

### Handoff to Next Stage

Verification stage receives: Working code on branch/environment, unit test
results, and implementation notes.

---

## Stage 6: Verification

- **Primary Role:** QA Engineers / Engineers
- **Supporting Roles:** Product Manager, Business Analyst, DevOps
- **Execution Pattern:** Iterative (per increment)

### Purpose

Validate that the increment works correctly through comprehensive testing and
acceptance. Encompasses verification (built correctly) and validation (built the
right thing).

### Inputs

**Required:**

- Working code from Implementation
- Requirements with FR acceptance criteria
- Test strategy from Increment Design stage

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
- Perform functional testing against FR acceptance criteria
- Conduct User Acceptance Testing (UAT) with business stakeholders
- Run performance and load testing
- Execute security testing (vulnerability scans, penetration testing)
- Validate accessibility requirements
- Test instrumentation/monitoring systems
- Verify success criteria are measurable

### Outputs

- **Test Results** - All test types with pass/fail status (see
  [Verification Brief Template](../templates/verification-brief.md))
- Defect reports and resolution status
- UAT sign-off from business stakeholders
- Performance test results
- Security scan results

### Exit Criteria

- All FR acceptance criteria and NFR verification criteria met
- No critical or high-priority defects
- UAT approved by business stakeholders
- Performance meets NFRs
- Security vulnerabilities addressed
- Monitoring/instrumentation verified

### Handoff to Next Stage

Deployment stage receives: Verified code, test reports, UAT approval, and
deployment checklist.

---

## Stage 7: Deployment

- **Primary Role:** DevOps / Engineers
- **Supporting Roles:** Operations, Product Manager, Engineers, Project Manager
- **Execution Pattern:** Iterative (per increment)

### Purpose

Release verified increments to production following controlled procedures, with
monitoring and rollback capabilities.

### Inputs

**Required:**

- Verified code with test approvals
- UAT sign-off
- Deployment checklist
- Rollback plan (tested and documented)

**Optional:**

- Canary or blue-green deployment strategy
- Release notes

### Entry Criteria

- All verification tests pass
- UAT approved
- Production environment ready
- Deployment plan reviewed

> **First-time setup:** If no production environment exists, see the
> [Deployment Setup Guide](../stages/deployment/setup.md) for infrastructure
> setup during foundation work. Projects with no deployment target (local-only
> tools, spikes) may
> [skip this stage](../stages/deployment/setup.md#when-you-dont-need-this-guide).

### Key Activities

- Execute deployment procedures
- Configure monitoring and alerting
- Verify health checks and smoke tests
- Monitor initial production behavior
- Capture baseline measurements for success criteria
- Update documentation and runbooks
- Communicate release to stakeholders

### Outputs

- **Deployed System** - Increment live in production
- Deployment log and verification
- Updated runbooks and operational procedures
- Release notes and change documentation
- Baseline measurements captured

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

## Stage 8: Support

- **Primary Role:** Engineers / DevOps
- **Supporting Roles:** Operations, Customer Support, Product Manager
- **Execution Pattern:** Continuous (ongoing after first deployment)

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
- [Success Criteria Register](../templates/success-criteria-register.md) with
  baselines and targets
- Incident response procedures

**Optional:**

- SLA/SLO definitions (required for Standard and Enterprise tiers)
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
- System Design stage: Performance issues require architectural changes
- Increment Design stage: Scoped enhancements within current boundaries
- Implementation stage: Low-risk patches with documented checkpoint decision
- Initiation stage: Objectives/business case need revision

---

## Checkpoints

Throughout the SDLC, various checkpoints ensure quality, alignment, and sound
decision-making. The framework distinguishes five types of checkpoints, each
with different purposes and outcomes:

### Gates (Investment Decisions)

- **Purpose:** Decide whether to continue investing resources in the project
- **Outcome:** Proceed / Pivot / Stop
- **Real stop option:** Yes — these are genuine go/no-go decisions
- **When used:** Early in the project when stopping is still realistic

**Examples:**

- **Gate 1:** End of Initiation — Approve brief and fund Requirements work?
- **Gate 2:** After Requirements and System Design are both complete — Commit to
  building this?

**AI validation:** Ensure AI-assisted analysis and recommendations are sound;
human owns the investment decision.

**After Gate 2:** The project is funded and team committed. Later checkpoints
focus on "when/how to proceed" rather than "if."

Record gate decisions using the
[Gate Decision Template](../templates/gate-decision.md).

### Quality Checkpoints

- **Purpose:** Ensure quality and readiness standards are met before proceeding
- **Outcome:** Ready / Not Ready (with remediation needed)
- **Real stop option:** No — fix issues and retry, don't stop the project
- **When used:** Throughout development to maintain quality bars

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

### Deployment Approvals

- **Purpose:** Authorize deployment to a specific environment
- **Outcome:** Deploy / Hold / Rollback
- **Real stop option:** No — about timing and rollback, not project cancellation
- **When used:** When releasing to staging, production, or progressive rollout
  milestones

**Examples:**

- Staging deployment approval
- Production deployment go/no-go
- Rollout gates (10% → 50% → 100%)
- Emergency rollback decisions

**AI validation:** Ensure AI-assisted deployment automation is safe and
monitored. Verify deployment plans and rollback procedures.

Approval authority varies by environment — see the Deployment Guide for
role-specific guidance. Record deployment approvals using the
[Checkpoint Decision Template](../templates/checkpoint-decision.md).

### Alignment Reviews

- **Purpose:** Synchronize stakeholders, gather feedback, ensure consensus
- **Outcome:** Aligned / Adjustments Needed
- **Real stop option:** No — about refinement and convergence
- **When used:** When stakeholder input or team alignment is needed

**Examples:**

- Design review with stakeholders
- Sprint review/demo
- Architecture review
- Requirements walkthrough

**AI validation:** Review AI-generated designs, architectures, and requirements
with the team. Ensure AI recommendations align with stakeholder needs and
constraints.

### Compliance Approvals

- **Purpose:** Obtain required sign-offs from legal, security, or regulatory
  teams
- **Outcome:** Approved / Remediation Required
- **Real stop option:** Technically yes, but rarely — usually remediate and
  resubmit
- **When used:** When regulatory, legal, or security requirements must be met

**Examples:**

- Legal review (privacy, licensing, terms)
- Security review (vulnerability assessment, threat modeling)
- Accessibility compliance verification
- Data privacy impact assessment

**AI validation:** Ensure AI outputs meet compliance requirements:

- AI-generated code doesn't introduce security vulnerabilities
- AI-assisted data handling respects privacy regulations
- AI recommendations consider legal and regulatory constraints

### Checkpoint Mapping by Stage

Each stage specifies which checkpoint types apply. For example:

- **Initiation:** Gate 1 (investment decision)
- **Requirements:** Alignment Reviews (stakeholder walkthroughs)
- **System Design:** Alignment Reviews (architecture decisions), Gate 2
  (build/no-build decision)
- **Increment Design:** Quality Checkpoints (design review)
- **Implementation:** Quality Checkpoints (code review, tests), Deployment
  Approvals (to staging)
- **Verification:** Quality Checkpoints (test execution), Deployment Approvals
  (production readiness)
- **Deployment:** Deployment Approvals (production deployment, rollout gates)

**Human validation of AI output is required at all checkpoint types.** The AI
Assistance Scorecard provides stage-specific guidance on where AI can work more
independently vs. where human oversight is critical.

> **Enterprise extensions:** Organizations with additional governance needs can
> insert security reviews, compliance validation, or Change Advisory Board
> approvals as checkpoints within stages rather than adding new stages.

---

## Notes

**Last Updated:** 2026-03-03

Added to framework in v0.9.0.
