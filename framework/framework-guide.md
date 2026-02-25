# Framework Guide

> Framework-wide concepts that apply across all stages. Stage-specific guidance
> is in each stage's guide.

> **Looking for a brief overview?** See the [Quick Start Guide](README.md).

---

## What Is This Framework?

The AI-Assisted SDLC framework is a lightweight, practical guide for integrating
AI assistance into software development. It helps both technical and
non-technical stakeholders work through every stage of a project — from initial
idea to production support.

By providing clear guidance and AI assistance from the very first stage, the
framework enables anyone with an idea to create a professional project
proposal—without needing deep process knowledge or technical expertise. This
democratizes project initiation, ensuring good ideas can come from anywhere in
the organization.

**Design principles:**

1. **AI as assistant, not replacement** — AI is a productivity tool that humans
   control
2. **Practical over theoretical** — actionable guidance, not academic
   completeness
3. **Lightweight process** — avoid bureaucratic overhead
4. **Professional standards** — humans evaluate and validate all AI output
5. **Cross-functional accessibility** — usable by both technical and
   non-technical stakeholders
6. **Role-appropriate guidance** — each stage tailored to its primary role

### Key Benefits

- **Lower AI adoption risk** — clear guardrails at every stage prevent costly AI
  missteps in architecture and production
- **Faster project starts** — non-technical stakeholders can initiate projects
  with AI guidance, no process expertise required
- **Consistent governance** — auditable checkpoints satisfy compliance,
  security, and executive oversight needs
- **Scalable across teams** — right-sizing from solo developer to enterprise;
  methodology-agnostic (agile, waterfall, hybrid)
- **Progressive AI adoption** — start Human-Led to build trust, evolve to
  Collaborative and AI-Led as confidence grows

### Who Benefits

- **Engineers** — structured guidance for using AI safely and effectively, with
  clear boundaries at each stage
- **Product Managers and Business Analysts** — initiate and plan projects with
  AI assistance, even without technical expertise
- **Engineering Leaders and Executives** — governance visibility across the
  development lifecycle with auditable checkpoints and measurable success
  criteria
- **Organizations** — a repeatable, scalable approach to AI-assisted development
  that works across teams and methodologies

---

## How to Use This Framework

The AI-Assisted SDLC framework can be used in two ways, depending on whether
dedicated tooling exists for your team.

### Option 1: AI-Assisted Manual Process (Available Now)

Work through the framework by asking your AI assistant to guide you through each
stage. The framework documents provide the structure and concepts; your AI
assistant helps you apply them to your specific project context.

**Getting started:**

See the **[Manual Process Guide](framework-manual-process.md)** for a
comprehensive guide to using the framework with any AI assistant. The guide
includes:

- Template prompt with project context placeholders
- Guidance for different AI tools (Claude Code, ChatGPT, Copilot, etc.)
- Example prompts for each stage
- Tips for effective AI collaboration across multiple sessions

**Using this approach:**

1. Start with the Initiation stage
2. Use the Manual Process Guide to engage your AI assistant
3. Work iteratively across multiple sessions as needed (stages aren't
   one-conversation tasks)
4. Complete the brief template for each stage (outputs)
5. Validate with the checklist before proceeding to the next stage
6. Adapt prompts based on your AI tool's capabilities and project needs

**Key principle:** The framework provides the process structure and guidance.
Your AI assistant helps you think through the activities and produce the
artifacts. You remain in control of all decisions and outputs.

### Option 2: Framework Application (In Development)

A dedicated application is being developed (using this framework itself -
dogfooding) that will:

- Read framework documents automatically
- Generate contextual prompts based on your project
- Manage workflow and artifact progression
- Track completion across stages
- Adapt to your chosen AI tool and team structure

**Current state (February 23, 2026):** This application is not yet generally
available for production use. Use **Option 1: AI-Assisted Manual Process** now.
Treat the application as a future accelerator, not a prerequisite to adopt this
framework.

This application will provide a more structured experience while maintaining the
framework's flexibility. It is planned for future release.

---

## Key Concepts

This guide covers the major concepts that structure the framework:

**[SDLC Stages](#sdlc-stages)** — The framework defines stages that work for any
methodology (agile, waterfall, hybrid). Stages follow different execution
patterns: foundational (once per project), iterative (per deliverable
increment), and continuous (ongoing).

**[Checkpoint Taxonomy](#checkpoint-taxonomy)** — Five types of checkpoints
ensure quality and alignment: Gates (investment decisions), Quality Checkpoints
(standards verification), Deployment Approvals (release authorization),
Alignment Reviews (stakeholder sync), and Compliance Approvals (regulatory
sign-offs).

**[Measurement Throughline](#measurement-throughline)** — Measurable success
criteria established in the Initiation stage flow through all subsequent stages,
ensuring goals actively guide development and enable data-driven validation.

**[MoSCoW Prioritization](#moscow-prioritization)** — A coarse prioritization
method (Must/Should/Could/Won't Have) used during Requirements to organize
features before increment boundaries are defined.

**[Greenfield vs. Brownfield Projects](#greenfield-vs-brownfield-projects)** —
How the framework adapts for new projects built from scratch versus extensions
to existing systems, including infrastructure setup and constraint management.

**[Right-Sizing Your Process](#right-sizing-your-process)** — Match process
rigor to project risk (Minimal, Standard, Enterprise) and team size. Each stage
guide includes a right-sizing table with expansion triggers. See the
[Right-Sizing Guide](right-sizing-guide.md) for the full model.

**[AI Assistance Overview](#ai-assistance-overview)** — Guidance for how
independently AI can operate at each stage before requiring human approval,
balanced against verifiability and risk.

**[Roles and Responsibilities](#roles-and-responsibilities)** — A cross-stage
RACI matrix showing who is Responsible, Accountable, Consulted, and Informed for
each stage and gate decision.

**[Architecture Governance](#architecture-governance)** — Tiered governance
models for architecture decisions, from self-review (Minimal) to formal
architecture council (Enterprise).

**[Compliance and Regulatory Considerations](#compliance-and-regulatory-considerations)**
— Key compliance considerations for AI-assisted development, including IP, data
privacy, audit trails, and emerging AI regulation.

---

## SDLC Stages

The framework defines stages with different execution patterns: **foundational**
(execute once per project), **iterative** (repeat per deliverable increment),
and **continuous** (ongoing). An "increment" is a discrete, deliverable chunk of
work — map it to your methodology's terminology (epic, feature, sprint,
milestone, etc.).

This section provides a high-level overview. For complete stage definitions
including inputs, outputs, entry/exit criteria, and handoffs, see the
[AI-Assisted SDLC Stages](framework-stages.md) document.

### Execution Patterns

**Foundational stages** execute once per project but can be revisited when
significant new information emerges:

- **Initiation** — project vision and business case
- **Requirements** — what to build
- **System Design** — system architecture

**Iterative stages** repeat for each deliverable increment:

- **Increment Design** — detailed design for the current increment
- **Implementation** — build the increment
- **Verification** — test and validate the increment
- **Deployment** — release the increment

**Continuous stages** run ongoing after first deployment:

- **Support** — monitor, maintain, enhance

### Stage Overview

<!-- Keep this table in sync with README.md and framework-stages.md -->

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

> **Guide structure:** Each stage guide follows a consistent structure: Quick
> Reference, What Is [Stage], AI Assistance, Right-Sizing, Workflow, Guidance
> (stage-specific subsections), When to Revisit, Related Documents, and Notes.

**Key principle: Design plans, Implementation and Verification execute**

The Increment Design stage plans BOTH how to build the increment AND how to test
it. Implementation and Verification execute those plans:

- **Increment Design → Implementation:** Architecture and component designs
  guide developers in writing code
- **Increment Design → Verification:** Test strategy guides QA in validating the
  code

This ensures testability is designed in from the start, not retrofitted after
implementation. Test planning happens when architectural decisions are made,
preventing costly rework.

### Terminology: Increments

The framework uses **"increment"** as a neutral term for a discrete, deliverable
chunk of work. Map it to your methodology:

- **Agile/Scrum:** Epic, Feature, or Sprint deliverable
- **SAFe:** Feature or Capability
- **Kanban:** Work Item or Deliverable
- **Traditional PM:** Milestone or Work Package
- **Lean/XP:** Story collection or Release increment

### Stage Flow

**Linear (waterfall-style):**

```
Initiation → Requirements → System Design →
Increment Design → Implementation → Verification →
Deployment → Support
```

**Iterative (agile-style):**

```
Initiation (once)
  → Requirements (once)
    → System Design - foundational (once)
      → [Per increment: Increment Design →
         Implementation → Verification → Deployment]
        → Support (continuous)
```

**Feedback loops:**

- Support → Increment Design (scoped enhancements within current boundaries)
- Support → Requirements (user feedback)
- Support → System Design (performance issues)
- Support → Implementation (low-risk patches with documented checkpoint
  decision)
- Verification → Implementation (test failures)
- Verification → Increment Design (design flaws)
- Support → Initiation (only when objectives/business case need revision)

---

## Checkpoint Taxonomy

Throughout the SDLC, checkpoints ensure quality, alignment, and sound
decision-making. The framework defines five types:

### 1. Gates (Investment Decisions)

**Purpose:** Decide whether to continue investing **Outcome:** Proceed / Pivot /
Stop **Real stop option:** Yes

- **Gate 1** (end of Initiation): Approve brief and fund Requirements work?
- **Gate 2** (end of Requirements + System Design): Commit to building this?

After Gate 2, the project is funded and team committed. Later checkpoints focus
on "when/how" rather than "if."

Record gate decisions using the
[Gate Decision Template](gate-decision-template.md).

### 2. Quality Checkpoints

**Purpose:** Ensure standards met before proceeding **Outcome:** Ready / Not
Ready (remediate and retry) **Real stop option:** No

Examples: code review, test coverage thresholds, security scan pass,
documentation completeness.

### 3. Deployment Approvals

**Purpose:** Authorize deployment to an environment **Outcome:** Deploy / Hold /
Rollback **Real stop option:** No (timing, not cancellation)

Examples: staging approval, production go/no-go, rollout gates (10% → 50% →
100%).

Record deployment approvals using the
[Checkpoint Decision Template](checkpoint-decision-template.md).

### 4. Alignment Reviews

**Purpose:** Synchronize stakeholders, gather feedback **Outcome:** Aligned /
Adjustments Needed **Real stop option:** No

Examples: design review, sprint review/demo, architecture review, requirements
walkthrough.

### 5. Compliance Approvals

**Purpose:** Required sign-offs from legal, security, or regulatory teams
**Outcome:** Approved / Remediation Required **Real stop option:** Rarely
(usually remediate)

Examples: legal review, security review, accessibility compliance, data privacy
assessment.

**Human validation of AI output is required at all checkpoint types.** See the
[AI Assistance Scorecard](framework-ai-assistance.md) for stage-specific
guidance.

### Checkpoint Decision Rights

The table below summarizes who approves each checkpoint type, what evidence is
required, and where the decision is recorded.

| Checkpoint Type     | Approver             | Required Evidence                      | Decision Record              |
| ------------------- | -------------------- | -------------------------------------- | ---------------------------- |
| Gate (1 & 2)        | Executive (A)        | Stage brief, risk assessment           | Gate Decision Template       |
| Quality Checkpoint  | Tech lead / QA (A)   | Code review, test results, CI          | PR history, CI logs          |
| Deployment Approval | DevOps / Eng (A)     | Deployment checklist, UAT              | Checkpoint Decision Template |
| Alignment Review    | PM/BA or Arch (A)    | Design artifacts, stakeholder sign-off | ADR or meeting notes         |
| Compliance Approval | Legal / Security (A) | Audit artifacts, scan results          | Compliance record / ADR      |

---

## Measurement Throughline

Measurable success criteria established in Initiation flow through all stages,
ensuring goals actively guide development.

| Stage                | How Measurement Is Used                                                                                                       |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| **Initiation**       | Define objectives with measurable success criteria; set targets                                                               |
| **Requirements**     | Ensure NFRs include verification criteria and instrumentation/telemetry; FR acceptance criteria ladder up to success criteria |
| **System Design**    | Design or assess analytics infrastructure, dashboards, monitoring, data collection                                            |
| **Increment Design** | Plan measurement instrumentation for the increment                                                                            |
| **Implementation**   | Implement logging, metrics collection, instrumentation                                                                        |
| **Verification**     | Test that measurement systems work; validate FR acceptance criteria and NFR verification criteria tied to success criteria    |
| **Deployment**       | Deploy with monitoring configured; capture baseline measurements                                                              |
| **Support**          | Monitor success criteria in production; validate objectives achieved; report progress                                         |

**Example business KPIs flowing through the framework:**

| KPI                   | Initiation Target          | Support Measurement            |
| --------------------- | -------------------------- | ------------------------------ |
| Time-to-market        | "First release in 8 weeks" | Actual release date vs. target |
| Customer satisfaction | "NPS > 40 within 90 days"  | NPS tracked via in-app survey  |
| Defect escape rate    | "< 5 prod bugs/month"      | Production incident count      |
| Cost per feature      | "< $15K average"           | Actual hours × blended rate    |

**The framework is agnostic to goal-setting methodology.** Use OKRs, SMART
goals, KPIs, Balanced Scorecard, or simple success metrics — whatever fits your
organization.

**Minimum requirement:** At least one measurable success criterion per project,
with baseline (current state) and target (desired state).

---

## MoSCoW Prioritization

The framework uses MoSCoW for coarse prioritization at the Requirements stage,
before increment boundaries are known.

**Must Have** — Critical for the first usable release. Without these, the
solution cannot deliver core value. The minimum threshold for viability.

**Should Have** — Important requirements that **will** be delivered (committed)
in future releases. They add significant value but aren't required for initial
viability.

**Could Have** — Desirable if time/resources permit. **Not committed** —
opportunistic. "Build if easy, skip if hard."

**Won't Have** — Explicitly excluded from this project scope. Captured as
non-goals to prevent scope creep.

**Key distinction:**

- Should Have = "We WILL build this, just later" (committed)
- Could Have = "We'd like to, but no commitment" (aspirational)

**How priorities map to increments:** During System Design, the increment plan
maps MoSCoW priorities to specific increments:

- Must Have → early increments (Increment 1-2)
- Should Have → later increments, based on dependencies and value
- Could Have → evaluated during implementation
- Won't Have → not included in any increment

---

## AI Assistance Overview

AI assistance levels are bounded and controlled with explicit human gates.
"Assistance" means how independently AI can operate before requiring human
approval — not uncontrolled operation.

**Core principle:** Increase AI assistance as verifiability increases; tighten
human gates as risk increases.

| #   | Stage            | Assistance Level               | Best Uses                                                |
| --- | ---------------- | ------------------------------ | -------------------------------------------------------- |
| 1   | Initiation       | AI assist only                 | Draft briefs, risks, options, sizing                     |
| 2   | Requirements     | AI agent + human gate          | Goals → stories + ACs, ambiguity detection, NFR prompts  |
| 3   | System Design    | AI agent + strong gates        | Propose or assess architectures, ADR drafts, slice plans |
| 4   | Increment Design | AI agent + strong gates        | Detailed design, test strategy, component specs          |
| 5   | Implementation   | High assistance, bounded scope | Generate/refactor code, keep PR-sized slices             |
| 6   | Verification     | High assistance + CI gates     | Generate tests, test matrices, expand coverage           |
| 7   | Deployment       | AI assist only + runbook gates | Draft release steps, rollback plans; humans execute      |
| 8   | Support          | AI agent + human gate          | Triage, incident comms, runbooks, dependency updates     |

Within each assistance level, teams also choose an **AI autonomy tier** —
Human-Led, Collaborative, or AI-Led — that adjusts who drives the process. The
assistance level sets the ceiling; the autonomy tier adjusts whether humans set
the agenda (Collaborative) or AI drives it proactively (AI-Led). See the
[AI Assistance Scorecard: AI Autonomy Spectrum](framework-ai-assistance.md#ai-autonomy-spectrum)
for tier definitions and guidance.

For full assistance level definitions (6 levels) and operational guidance, see
the [AI Assistance Scorecard](framework-ai-assistance.md).

---

## Key Terms

> **Canonical glossary:** This section is the single authoritative source for
> term definitions used across the framework. Stage-level documents link here
> rather than redefining terms.

**Acceptance Criteria (AC)** — Objective, observable conditions that define
"done" for a requirement. Format: Given/When/Then or measurable conditions.

**Architecture Decision Record (ADR)** — A short document capturing a
significant design decision and the reasoning behind it. Primary storage:
`docs/adr/`. Alternative: per-stage directories (`system-design/adr/`,
`implementation/adr/`) for scoped numbering. See the
[ADR Template](adr-template.md) for guidance.

> **Artifact location note:** Paths like `docs/adr/`, `docs/api/`, and
> `AGENTS.md` refer to project-level artifacts created in your project
> repository when applying this framework. They are not directories shipped
> under `framework/`.

**Foundational stage** — Executes once per project but can be revisited. Sets
the project foundation.

**Functional Requirement (FR)** — A statement of required system behavior.
Format: "The system shall..." or user story format.

**Gate** — A checkpoint with a real option to stop the project. A genuine
go/no-go investment decision.

**Increment** — A discrete, deliverable chunk of work. See
[Terminology: Increments](#terminology-increments).

**Iterative stage** — Repeats for each increment in the Increment Design →
Implementation → Verification → Deployment cycle.

**Continuous stage** — Runs ongoing after first production deployment (Support).

**Non-Functional Requirement (NFR)** — A quality attribute or constraint
(performance, security, scalability, usability, observability, compliance) that
shapes design and testing.

**Discovery** — Early-stage investigative work to reduce uncertainty. Maps to
the Initiation and Requirements stages.

**Greenfield project** — A new software project built from scratch with no
existing system, codebase, or infrastructure.

**Brownfield project** — A project that extends, modifies, or enhances an
existing system with established codebase, infrastructure, and constraints.

---

## Roles and Responsibilities

This matrix shows who is Responsible, Accountable, Consulted, and Informed for
key activities at each stage. It consolidates the Primary and Supporting Role
designations from each stage guide into a single cross-stage view.

**Legend:** **R** = Responsible (does the work), **A** = Accountable
(approves/owns the outcome), **C** = Consulted (provides input), **I** =
Informed (kept in the loop)

| Activity / Stage     | PM/BA | Engineers | Architect | QA  | DevOps | Exec |
| -------------------- | ----- | --------- | --------- | --- | ------ | ---- |
| **Initiation**       | R/A   | C         | C         | -   | -      | I    |
| Gate 1 decision      | R     | -         | -         | -   | -      | A    |
| **Requirements**     | R/A   | C         | C         | C   | -      | I    |
| **System Design**    | C     | C         | R/A       | C   | C      | I    |
| Gate 2 decision      | C     | C         | R         | C   | C      | A    |
| **Increment Design** | C     | R/A       | C         | C   | -      | -    |
| **Implementation**   | -     | R/A       | C         | C   | C      | -    |
| **Verification**     | C     | R         | C         | R/A | -      | -    |
| **Deployment**       | I     | C         | C         | C   | R/A    | I    |
| **Support**          | I     | C         | C         | -   | R/A    | I    |

> **Note:** This matrix represents the most common role assignments. Adapt to
> your team structure — in smaller teams, one person may hold multiple roles. In
> larger organizations, additional roles (security, compliance) may be Consulted
> or Accountable at specific stages.

Security and compliance accountability should be explicit at the checkpoint
level, especially for regulated or enterprise environments:

| Stage / Checkpoint                      | Accountable Role                     | Typical Trigger                                                |
| --------------------------------------- | ------------------------------------ | -------------------------------------------------------------- |
| Initiation (risk and policy framing)    | Project lead + security/compliance   | Sensitive data, regulated domains, external AI tools           |
| Gate 1 / Gate 2 input (risk posture)    | Security/compliance (advisory A\*)   | New legal/privacy/security risk exposure                       |
| Verification (control evidence)         | QA/engineering + security/compliance | Security, privacy, or audit controls required for release      |
| Compliance Approval checkpoint          | Security/compliance/legal (A)        | Contractual, regulatory, or internal policy sign-off required  |
| Deployment Approval (release readiness) | DevOps/engineering + security (C/A)  | Production change with material risk, data impact, or exposure |

\*Investment gate ownership remains with executive decision-makers; security and
compliance provide required risk and policy input before approval.

---

## Greenfield vs. Brownfield Projects

The framework adapts to both greenfield (new) and brownfield (existing) projects
by normalizing the experience: **both project types converge at the same point
where working infrastructure exists and feature delivery can proceed
consistently**.

### Definitions

**Greenfield project** — Building a new system from scratch. Everything must be
created: codebase, infrastructure, CI/CD pipelines, deployment systems,
monitoring, and observability. Examples: new product launch, startup MVP,
internal tool for new capability.

**Brownfield project** — Extending or enhancing an existing system. The codebase
exists, infrastructure is in place, and there are established patterns,
constraints, and technical debt. Examples: adding features to production
application, modernizing legacy system, migrating to new architecture. Note that
a brownfield "codebase" may span multiple repositories and include business
logic in database-layer artifacts (stored procedures, triggers, views).

**Brownfield projects have two scenarios:**

- **First AI-assisted project:** System exists but architecture, infrastructure,
  and conventions are not documented for AI use. Requires discovery and
  documentation (similar to greenfield bootstrap).
- **Subsequent AI-assisted projects:** AI context exists from prior work. Can
  proceed directly to feature delivery.

### Key Principle

**Greenfield projects invest foundation work in establishing infrastructure;
brownfield first AI-assisted projects invest foundation work in discovering and
documenting existing systems.** The scope of brownfield foundation work varies —
well-organized codebases need only a discovery pass, while codebases with
significant gaps may require extended preparation or a dedicated preparation
project. See the
[Project Foundation Guide: Assessing Brownfield Readiness](project-foundation-guide.md#assessing-brownfield-readiness)
for the readiness assessment. After foundation work (where applicable), all
project types deliver features using the same iterative cycle.

### How the Framework Adapts

The framework's 8 stages apply to both project types, but activities and
emphasis differ:

| Stage                | Greenfield                                | Brownfield (First AI)                                                                                                          | Brownfield (Has Context)                          |
| -------------------- | ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------- |
| **Initiation**       | Define vision and objectives from scratch | Understand existing system + define new goals                                                                                  | Understand existing system + define new goals     |
| **Requirements**     | All requirements are new                  | New requirements + existing system constraints                                                                                 | New requirements + existing system constraints    |
| **System Design**    | Full architecture + infrastructure plan   | Assess existing + plan discovery for foundation work                                                                           | Adapt/extend architecture + assess infrastructure |
| **Increment Design** | Plan bootstrap increment details          | Plan discovery increment details                                                                                               | Plan first feature increment details              |
| **Foundation**       | **Establish infrastructure** (bootstrap)  | **Discover, document, and prepare** (scope depends on [readiness](project-foundation-guide.md#assessing-brownfield-readiness)) | N/A — proceed directly to feature delivery        |
| **Increment 1+**     | Deliver features with established infra   | Deliver features with established infra + documented context                                                                   | Deliver features with established infra           |
| **Support**          | Monitor new system                        | Monitor changes, consider existing user base                                                                                   | Monitor changes, consider existing user base      |

### Project Foundation: The Critical Difference

> For a practical walkthrough of foundation activities — including sequencing
> and links to stage-specific setup guides — see the
> [Project Foundation Guide](project-foundation-guide.md).

**Greenfield foundation** is the **bootstrap increment** — establishing the
foundational infrastructure before feature development begins:

- Set up version control, branching strategy, code organization
- Establish CI/CD pipelines (build, test, deploy automation) — see
  [Deployment Setup Guide](deployment/deployment-setup-guide.md)
- Configure development, staging, and production environments
- Implement monitoring, logging, and observability infrastructure
- Set up security scanning, secret management, and access controls
- Create deployment runbooks and rollback procedures
- Establish support operations (incident response, on-call) — see
  [Support Operations Guide](support/support-operations-guide.md)
- Implement measurement/telemetry systems (from success criteria)
- Deploy a "hello world" application to validate the full pipeline

**Outcome:** Working infrastructure that can support feature delivery. Increment
1+ delivers features.

**Brownfield Foundation (First AI-Assisted Project)** is the **discovery
increment** — documenting existing architecture, infrastructure, and conventions
for AI context:

- Use AI tools to discover system architecture, tech stack, and patterns
- Document architecture overview, components, and data flows
- Capture infrastructure setup (CI/CD, deployment, monitoring)
- Record coding conventions and established practices
- Create retroactive ADRs for significant existing decisions
- Document constraints (SLAs, policies, API contracts)
- Store in AGENTS.md and docs/ structure for future AI use

When discovery reveals deeper gaps — poor test coverage, inconsistent patterns,
tangled dependencies, or untested database logic — foundation work may extend
beyond documentation into active preparation, or become a multi-increment
preparation project. See the
[Project Foundation Guide](project-foundation-guide.md#assessing-brownfield-readiness)
for the readiness assessment and preparation paths.

**Outcome:** Documented context and structural readiness (test coverage in
critical paths, pattern clarity, dependency mapping) that enable effective AI
assistance on future projects. Increment 1+ delivers features.

**Brownfield (Subsequent Projects)** requires no foundation work and proceeds
directly to **feature delivery** because infrastructure exists and AI context is
documented:

- Infrastructure is already operational
- CI/CD pipelines exist (may need minor adaptation)
- Monitoring and deployment systems are in place
- AI context documented from prior projects
- Focus is on delivering the first new feature/capability

**Outcome:** First feature increment (Increment 1) delivered using existing
infrastructure, with updated documentation.

### System Design Stage: Infrastructure Planning

During **System Design**, infrastructure planning is a **required output** for
both project types:

**Greenfield infrastructure planning includes:**

- Architecture Decision Records (ADRs) for infrastructure choices
- CI/CD pipeline design (tools, stages, quality gates)
- Environment strategy (dev, staging, production)
- Deployment strategy (blue-green, canary, rolling, etc.)
- Monitoring and observability architecture
- Security and compliance infrastructure
- Iteration plan identifying **Increment 0 = establish infrastructure**

**Brownfield infrastructure planning (first AI-assisted project) includes:**

- Assessment of existing infrastructure capabilities (team's tribal knowledge)
- ADRs for infrastructure adaptations or extensions
- Integration plan with existing CI/CD pipelines
- Deployment strategy within existing constraints
- Monitoring extensions or dashboard updates
- Security and compliance adjustments
- Readiness assessment using the
  [Project Foundation Guide dimensions](project-foundation-guide.md#assessing-brownfield-readiness)
  to determine foundation scope
- Preparation plan if readiness assessment identifies gaps beyond documentation
  (test coverage, pattern stabilization, dependency mapping, database logic)
- Increment plan identifying **Increment 0 = document existing context for AI**
  - What to document: architecture, conventions, constraints, infrastructure
  - Documentation structure approach (use existing or propose new)
  - Discovery approach (AI tools + team expert verification)
  - **Note:** If Increment 0 reveals significant gaps in team's understanding,
    may trigger return to System Design stage to reassess plans

**Brownfield infrastructure planning (subsequent projects) includes:**

- Assessment of existing infrastructure capabilities (use documented context)
- ADRs for infrastructure adaptations or extensions
- Integration plan with existing CI/CD pipelines
- Deployment strategy within existing constraints
- Monitoring extensions or dashboard updates
- Security and compliance adjustments
- Increment plan identifying **Increment 1 = first feature** (no foundation work
  needed)

**Key output:** All project types exit System Design with a clear plan that
enables subsequent feature delivery — greenfield and brownfield-first establish
foundations (infrastructure or documentation), brownfield-subsequent proceeds to
features.

### Requirements Stage: Capturing Constraints

During **Requirements**, brownfield projects must **capture existing system
constraints** that new work must satisfy:

**Brownfield-specific requirements include:**

- **Performance constraints:** Existing SLAs (e.g., "API responses < 1 second")
- **Security policies:** Authentication, authorization, data encryption
  standards
- **API contracts:** Existing interfaces that must remain compatible
- **Data schemas:** Database structures, data formats, integration formats
- **Compliance requirements:** Regulatory constraints already in place
- **Architectural constraints:** Patterns, frameworks, languages in use
- **Operational constraints:** Deployment windows, rollback requirements

These constraints become **Non-Functional Requirements (NFRs)** that shape
design and testing. See the
[Requirements Guide](requirements/requirements-guide.md) for detailed guidance
on capturing brownfield constraints.

### When Both Types Converge

After foundation work (where applicable), **both greenfield and brownfield
projects operate identically**:

- Infrastructure is established and operational
- Feature delivery follows the same iterative cycle: Increment Design →
  Implementation → Verification → Deployment
- Deployment processes are consistent
- Monitoring and observability are in place
- Support operates the same way

**This normalization is the key insight:** By investing in infrastructure setup
upfront (greenfield) or leveraging existing infrastructure (brownfield), the
framework provides a consistent experience for feature delivery regardless of
project type.

### Detailed Guidance

Stage-specific greenfield and brownfield guidance is documented in each stage's
guide:

- **[System Design Guide](system-design/system-design-guide.md)** —
  Infrastructure planning outputs and bootstrap increment guidance
- **[Requirements Guide](requirements/requirements-guide.md)** — Capturing
  existing system constraints for brownfield projects
- **[Implementation Guide](implementation/implementation-guide.md)** — Bootstrap
  increment execution for greenfield projects

---

## Right-Sizing Your Process

Right-sizing has two independent dimensions:

- **Project risk tier** determines _what_ practices you adopt — Minimal (low
  risk), Standard (moderate), or Enterprise (high). Each stage guide includes a
  tier table showing exactly what each level involves.
- **Team size** determines _how formally_ you apply those practices — a solo
  developer on a Standard-tier project still does code review, but it might be a
  self-review checklist rather than a pull request with two approvers.

For the full two-dimension model, tier definitions, and choosing criteria, see
the [Right-Sizing Guide](right-sizing-guide.md).

The framework's eight stages remain the same regardless of risk tier or team
size. What changes is the level of formality, documentation detail, and
coordination mechanisms.

**Solo developer:**

- You fulfill all roles—that's expected
- Lighter documentation is appropriate (brief notes vs. formal docs, mental
  ADRs)
- Gates become self-checkpoints or quick stakeholder check-ins
- **Don't skip measurement**—success criteria are still your north star

**Small teams (2-5):**

- Role overlap is natural and expected
- Keep process lightweight; favor communication over documentation

**Large teams (6+):**

- Parallel increments require explicit coordination:
  - Establish shared architecture authority to resolve cross-team conflicts
  - Manage cross-team dependencies in increment planning
  - Plan integration testing and deployment orchestration
- More formal gates and handoffs maintain alignment

**Key principle:** Stages define _what_ work to do. Team size determines _how
formal_ and _how coordinated_.

---

## Architecture Governance

Right-size architecture governance to your team and project tier:

| Tier       | Review Forum               | ADR Approval          | Design Review              |
| ---------- | -------------------------- | --------------------- | -------------------------- |
| Minimal    | Self-review or pair review | Author + one reviewer | Informal, async comment    |
| Standard   | Team PR review or design   | Tech lead sign-off    | Weekly design meeting      |
|            | sync                       |                       |                            |
| Enterprise | Architecture council       | Council vote or       | Formal design review board |
|            |                            | delegate              |                            |

### Architecture Council (Enterprise Tier)

For Enterprise-tier projects, establish a formal architecture council:

- **Membership:** Tech leads, principal engineers, security representative, and
  (optionally) a compliance representative
- **Meeting cadence:** Bi-weekly or monthly, depending on project velocity and
  volume of architecture decisions
- **Decision authority:** ADR approval, technology stack changes, cross-team API
  contracts, and significant infrastructure decisions
- **Escalation path:** Deadlocked decisions escalate to VP Engineering or CTO
  with a written summary of positions and trade-offs

### When Architecture Review Is Triggered

Not every change needs formal review. Use this guide:

| Change Type                  | Minimal     | Standard    | Enterprise     |
| ---------------------------- | ----------- | ----------- | -------------- |
| New external dependency      | Self-review | Tech lead   | Council review |
| API contract change          | Self-review | Team review | Council review |
| Database schema change       | Self-review | Tech lead   | Team review    |
| New service or component     | Self-review | Design sync | Council review |
| Technology stack change      | N/A         | Tech lead   | Council vote   |
| Security architecture change | Self-review | Security +  | Council +      |
|                              |             | tech lead   | security       |

---

## Compliance and Regulatory Considerations

AI-assisted development introduces specific compliance considerations that
organizations should evaluate before adoption.

### Key Considerations

- **IP and licensing:** AI-generated code may have licensing implications. Human
  review at every stage mitigates this risk. Establish a policy on AI-generated
  code ownership and attribution.
- **Data privacy:** AI assistants process project context. Verify that your AI
  tool's data handling meets your compliance requirements before use — check
  data residency, training data opt-out policies, and data retention terms.
- **Audit trail:** The framework's gate decisions, checklists, and briefs create
  a natural audit trail of human decision-making at every stage. This is
  valuable for regulatory audits and compliance reviews.
- **Liability:** Human validation at all checkpoints maintains human
  accountability for all outputs. AI generates; humans approve.

### Enterprise-Tier Controls

Organizations in regulated industries (healthcare, finance, government) should
use the Enterprise risk tier, which adds formal gates for security review,
compliance validation, and Change Advisory Board approval. See
[Right-Sizing Guide](right-sizing-guide.md) for tier definitions.

### AI-Specific Policies

An AI usage policy defines the organizational boundaries for using AI tools in
development. It typically covers approved tools, data boundaries (what can and
cannot be shared with AI), code review standards for AI-generated output, and
disclosure rules. Without a policy, teams risk data leakage, IP exposure,
inconsistent tooling choices, and regulatory gaps. A one-page policy covering
these four areas is sufficient to start — the checklist below can serve as a
template.

Before adopting the framework, ensure your organization has addressed:

- [ ] **AI usage policy** — which AI tools are approved, what data can be shared
      with them, and what restrictions apply
- [ ] **Code review standards** — how to review AI-generated code (same
      standards as human code, with additional attention to licensing and
      security)
- [ ] **Data classification** — which project data can be used as AI context and
      which must be excluded
- [ ] **Disclosure requirements** — whether AI-assisted development must be
      disclosed to customers, regulators, or auditors

### Emerging AI Regulation

Monitor applicable AI regulations (e.g., EU AI Act) for any disclosure or
documentation requirements for AI-generated software artifacts. The framework's
audit trail and human-in-the-loop design position teams well for emerging
regulatory requirements.

---

## Notes

**Last Updated:** 2026-02-24

Added to framework in v0.9.0.
