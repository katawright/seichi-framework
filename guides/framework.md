---
id: framework
type: guide
concerns:
  [
    design-principles,
    roles,
    governance,
    greenfield-brownfield,
    compliance,
    continuous-learning,
    working-locations,
  ]
---

# Framework Guide

## Overview

Cross-cutting concepts that apply across all stages — design principles, roles,
governance, greenfield/brownfield adaptation, and pointers to the authoritative
references for stages, checkpoints, measurement, AI assistance, and
right-sizing.

### Why This Guide

Individual stage guides cover their own scope. Dedicated references cover stages
([stages.md](stages.md)), AI assistance ([ai-assistance.md](ai-assistance.md)),
and right-sizing ([right-sizing.md](right-sizing.md)). This guide is the hub for
concepts that span multiple documents: roles, governance, MoSCoW,
greenfield/brownfield adaptation, compliance, and key terms.

### Purpose

- Define the framework's design principles and key benefits
- Explain cross-stage concepts (MoSCoW, roles, governance, compliance)
- Document greenfield vs. brownfield adaptation
- Link to authoritative references for stages, checkpoints, measurement, AI
  assistance, and right-sizing

### Key Principle

AI as assistant, not replacement — AI is a productivity tool that humans
control.

### How to Use This Guide

1. [**What Is This Framework?**](#what-is-this-framework) — design principles
   and benefits
2. [**How to Use This Framework**](#how-to-use-this-framework) — getting started
   (manual process or application)
3. [**Key Concepts**](#key-concepts) — linked overview of all cross-stage topics
4. Drill into individual concept sections as needed

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
- **Project Managers and Delivery Leads** — structured coordination points at
  every gate and increment boundary, with clear accountability for delivery
  tracking and cross-team dependency management
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

See the **[Manual Process Guide](manual-process.md)** for a comprehensive guide
to using the framework with any AI assistant. The guide includes:

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

### Option 2: Framework Application (Planned)

A dedicated application is planned that would automate framework orchestration —
reading framework documents, generating contextual prompts, managing artifact
progression, and tracking completion across stages.

**Current status:** This application does not exist yet. No timeline is
committed. Use **Option 1: AI-Assisted Manual Process** — it is the production
workflow today, not a stopgap.

If the application is developed, it will complement the manual process as an
accelerator. The framework documents remain the source of truth regardless of
tooling.

---

## Key Concepts

This guide covers the major concepts that structure the framework:

**[SDLC Stages](#sdlc-stages)** — Eight stages across three execution patterns
(foundational, iterative, continuous). Full reference: [stages.md](stages.md).

**[Checkpoint Taxonomy](#checkpoint-taxonomy)** — Five checkpoint types ensuring
quality and alignment. Full reference:
[stages.md § Checkpoints](stages.md#checkpoints).

**[Measurement Throughline](#measurement-throughline)** — Measurable success
criteria flowing from Initiation through all stages. Full reference:
[stages.md § Measurement](stages.md#measurement-throughline).

**[Learning Throughline](#learning-throughline)** — Pre-mortems at project start
and retrospectives at increment/project boundaries drive continuous improvement.
Full reference: [stages.md § Learning](stages.md#learning-throughline).

**[Security Throughline](#security-throughline)** — Security activities at every
stage, from data classification through vulnerability management, with AI
automation making baseline security nearly free. Full reference:
[security.md](security.md).

**[MoSCoW Prioritization](#moscow-prioritization)** — Coarse prioritization
(Must/Should/Could/Won't Have) used during Requirements before increment
boundaries are defined.

**[Greenfield vs. Brownfield Projects](#greenfield-vs-brownfield-projects)** —
How the framework adapts for new projects versus extensions to existing systems.

**[Right-Sizing Your Process](#right-sizing-your-process)** — Match process
rigor to project risk and team size. Full reference:
[right-sizing.md](right-sizing.md).

**[AI Assistance Overview](#ai-assistance-overview)** — Stage-by-stage gate
requirements and AI autonomy tiers. Full reference:
[ai-assistance.md](ai-assistance.md).

**[Working Locations](#working-locations)** — Three repository locations that
structure where framework guidance, project artifacts, and source code live.

**[Roles and Responsibilities](#roles-and-responsibilities)** — Cross-stage RACI
matrix for stages and gate decisions.

**[Architecture Governance](#architecture-governance)** — Tiered governance
models from self-review (Minimal) to architecture council (Enterprise).

**[Compliance and Regulatory Considerations](#compliance-and-regulatory-considerations)**
— IP, data privacy, audit trails, and emerging AI regulation considerations.

---

## SDLC Stages

The framework defines eight stages across three execution patterns —
foundational (once per project), iterative (per increment), and continuous
(ongoing). For complete stage definitions including inputs, outputs, entry/exit
criteria, stage flow diagrams, and handoffs, see the
[AI-Assisted SDLC Stages](stages.md) reference.

---

## Checkpoint Taxonomy

The framework defines five checkpoint types — Gates, Quality Checkpoints,
Deployment Approvals, Alignment Reviews, and Compliance Approvals — each with
distinct decision rights, required evidence, and decision records. For the full
taxonomy including decision-rights matrix, see the
[AI-Assisted SDLC Stages § Checkpoints](stages.md#checkpoints) reference.

---

## Measurement Throughline

Measurable success criteria defined during Initiation flow through every
subsequent stage, ensuring goals actively guide development and enable
data-driven validation. For the stage-by-stage breakdown and example KPIs, see
the
[AI-Assisted SDLC Stages § Measurement Throughline](stages.md#measurement-throughline)
reference.

---

## Learning Throughline

Pre-mortems at project start identify likely failure modes before the team
commits resources; retrospectives at increment and project boundaries capture
what actually happened and feed improvements forward. Together they form a
lightweight learning loop that mirrors the measurement throughline. For the
stage-by-stage breakdown, see the
[AI-Assisted SDLC Stages § Learning Throughline](stages.md#learning-throughline)
reference.

---

## Security Throughline

Security activities flow through every stage — from data classification in
Initiation through vulnerability management in Support. AI automation handles
dependency scanning, SAST, secrets detection, and SBOM generation automatically,
making baseline security nearly free at the Minimal tier. For the full
stage-by-stage breakdown, AI automation tiers, right-sizing guidance, and NIST
SSDF traceability, see the [Security Guide](security.md).

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

AI assistance levels are bounded and controlled with explicit human gates at
every stage. Teams also choose an AI autonomy tier (Human-Led, Collaborative, or
AI-Led) that adjusts who drives the process. For stage-by-stage gate
requirements, the autonomy spectrum, and operational guidance, see the
[AI Assistance Scorecard](ai-assistance.md).

---

## Working Locations

The framework operates across three distinct locations. Keeping them separate —
even when they share a single repository — ensures that framework guidance
remains stable, project decisions are traceable, and source code stays clean.

| Location    | Role                | Contents                                                                                     | Write Access                 |
| ----------- | ------------------- | -------------------------------------------------------------------------------------------- | ---------------------------- |
| Framework   | Read-only reference | Guides, stages, templates, checklists                                                        | Never                        |
| Artifacts   | Project governance  | `docs/briefs/`, `docs/adr/`, `docs/session-logs/`, gate decisions, success criteria register | All stages                   |
| Source Code | Project codebase    | Application code, tests, CI/CD config                                                        | Implementation, Verification |

### Stage-Location Mapping

| Stage                       | Operating Location      | Notes                                                     |
| --------------------------- | ----------------------- | --------------------------------------------------------- |
| Initiation–Increment Design | Artifacts               | Read framework; write to `docs/`                          |
| Implementation              | Source Code             | Read artifacts and framework; write code                  |
| Verification                | Source Code + Artifacts | Tests run in source code; verification brief in artifacts |
| Deployment                  | Artifacts               | References source code for build artifacts                |
| Support                     | Artifacts               | References deployed system                                |

> **Monorepo note:** When all three locations share the same repository, the
> distinctions still apply conceptually — treat framework files as read-only and
> route project artifacts to `docs/`.

### Working Locally

To set up a local environment that respects the three-location model:

1. **Clone or reference the framework repo** (read-only) — this provides guides,
   stages, templates, and checklists
2. **Create or clone the artifacts repo** — this is where project governance
   artifacts live (`docs/briefs/`, `docs/adr/`, `docs/session-logs/`)
3. **Create or clone the source code repo** — this is the project codebase

**Protection rule:** Agents must not modify framework files. Framework content
is consumed as read-only reference material at every stage.

**Working directory:** Use the artifacts location as your working directory for
all stages except Implementation and Verification, which operate from the source
code location.

> **Greenfield note:** Create the artifacts repo first during Initiation. The
> source code repo is created when the tech stack is decided during System
> Design. See the [Project Foundation Guide](project-foundation.md) for
> sequencing details.

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
[ADR Template](../templates/adr.md) for guidance.

> **Artifact location note:** Paths like `docs/adr/`, `docs/api/`, and
> `AGENTS.md` refer to project-level artifacts created in your project
> repository when applying this framework. They are not directories shipped
> under `framework/`. See [Working Locations](#working-locations) for how
> framework, artifacts, and source code locations relate.

**Foundational stage** — Executes once per project but can be revisited. Sets
the project foundation.

**Functional Requirement (FR)** — A statement of required system behavior.
Format: "The system shall..." or user story format.

**Gate** — A checkpoint with a real option to stop the project. A genuine
go/no-go investment decision.

**Increment** — A discrete, deliverable chunk of work. A neutral term that maps
to epic, feature, sprint, milestone, or deliverable depending on your
methodology.

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

| Activity / Stage     | PM/BA | Engineers | Architect | QA  | DevOps | Exec | PjM |
| -------------------- | ----- | --------- | --------- | --- | ------ | ---- | --- |
| **Initiation**       | R/A   | C         | C         | -   | -      | I    | C   |
| Gate 1 decision      | R     | -         | -         | -   | -      | A    | C   |
| **Requirements**     | R/A   | C         | C         | C   | -      | I    | C   |
| **System Design**    | C     | C         | R/A       | C   | C      | I    | C   |
| Gate 2 decision      | C     | C         | R         | C   | C      | A    | C   |
| **Increment Design** | C     | R/A       | C         | C   | -      | -    | C   |
| **Implementation**   | -     | R/A       | C         | C   | C      | -    | I   |
| **Verification**     | C     | R         | C         | R/A | -      | -    | I   |
| **Deployment**       | I     | C         | C         | C   | R/A    | I    | C   |
| **Support**          | I     | C         | C         | -   | R/A    | I    | I   |
| Deployment Approval  | I     | C         | C         | C   | R/A    | I    | C   |
| Compliance Approval  | C     | -         | C         | -   | C      | I    | C   |

> **Note:** For security and compliance accountability at checkpoint level, see
> the [accountability table](#compliance-and-regulatory-considerations) below.

> **Note:** This matrix represents the most common role assignments. Adapt to
> your team structure — in smaller teams, one person may hold multiple roles
> (e.g., one person may hold both PM and PjM). In larger organizations,
> additional roles (security, compliance) may be Consulted or Accountable at
> specific stages. PjM maps to Scrum Master, Delivery Lead, TPM, or Engineering
> Manager depending on methodology.

**Project Manager (PjM)** owns delivery coordination across the lifecycle —
schedule management, gate facilitation, cross-increment coordination, dependency
tracking, and progress reporting. PjM is Consulted at stages where active
coordination input is needed (foundational stages, gates, increment design,
deployment) and Informed where it passively tracks progress (implementation,
verification, support). The following cross-cutting activities give PjM clear
R/A accountability:

| Activity                               | PjM | PM/BA | Engineers | Architect | QA  | DevOps | Exec |
| -------------------------------------- | --- | ----- | --------- | --------- | --- | ------ | ---- |
| Delivery schedule & progress reporting | R/A | I     | C         | -         | -   | -      | I    |
| Gate facilitation                      | R   | -     | -         | -         | -   | -      | A    |
| Cross-increment coordination           | R   | A     | C         | C         | -   | -      | I    |
| Dependency & blocker management        | R/A | C     | C         | C         | -   | -      | -    |

### Gate Review Facilitation

PjM facilitates gate reviews to keep decisions timely and well-documented.

**Pre-read expectations.** Distribute gate artifacts to all reviewers at least
two business days before the scheduled review. Artifacts should be final drafts,
not works in progress.

**Suggested agenda:**

1. Context recap — 5 min
2. Criteria walkthrough (checklist + evidence) — 10–15 min
3. Discussion and open questions — 15–30 min
4. Decision and next steps — 5 min

**Time-boxing guidelines:**

| Gate   | Recommended Duration |
| ------ | -------------------- |
| Gate 1 | 30–60 min            |
| Gate 2 | 45–90 min            |

**Decision recording.** Capture the outcome using
[`templates/gate-decision.md`](../templates/gate-decision.md). Record the
decision (Proceed / Proceed with conditions / Revise / Stop), conditions, and
accountable owners for any follow-up actions.

### Cadence Mapping

The framework is methodology-agnostic (see [Stage Definitions](stages.md) for
details). The table below shows how stages and gates typically map to common
delivery cadences. For a week-by-week operating view of one increment cycle, see
the [Delivery Operating Guide](delivery-operating-guide.md).

| Framework Element    | 2-Week Sprint              | 1-Week Sprint            | Kanban / Flow              |
| -------------------- | -------------------------- | ------------------------ | -------------------------- |
| Foundational stages  | Span 1–3 sprints           | Span 2–6 sprints         | Complete before flow start |
| Gate 1               | End of foundational sprint | End of foundational week | Explicit pull trigger      |
| One increment        | ≈ 1 sprint                 | ≈ 1–2 sprints            | WIP-limited batch          |
| Gate 2               | End of last increment      | End of last increment    | Explicit pull trigger      |
| Cross-increment sync | Sprint review / planning   | Weekly sync              | Standup + board review     |

**Notes:**

- Foundational stages often span multiple sprints; do not force them into a
  single iteration.
- One increment maps roughly to one sprint; scope accordingly.
- Track cross-increment dependencies using the
  [Dependency Register](../templates/dependency-register.md).
- Gate 2 in the cadence mapping reflects _confirmation_ that Gate 2 criteria
  remain met at project close. The initial Gate 2 decision occurs after
  Requirements and System Design (see
  [Governance at a Glance](../README.md#governance-at-a-glance)).

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
documenting existing systems.** The scope of brownfield foundation work varies
along a scored readiness spectrum — from T5 (Ready) codebases that need only an
AGENTS.md, through T4-T3 (Approachable/Constrained) that need discovery or
targeted preparation, to T2-T1 (Challenging/Entrenched) requiring dedicated
enablement programs, and T0 (Rebuild) where remediation ROI is poor. See the
[Brownfield Readiness Guide](brownfield-readiness.md) for the rubric and tier
routing, and the [Brownfield Preparation Guide](brownfield-preparation.md) for
enablement workstreams and operational preparation guidance. After foundation
work (where applicable), all project types deliver features using the same
iterative cycle.

### How the Framework Adapts

The framework's 8 stages apply to both project types, but activities and
emphasis differ:

| Stage                                   | Greenfield                                | Brownfield (First AI)                                                                                                                                                     | Brownfield (Has Context)                          |
| --------------------------------------- | ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------- |
| **Initiation**                          | Define vision and objectives from scratch | Understand existing system + define new goals                                                                                                                             | Understand existing system + define new goals     |
| **Requirements**                        | All requirements are new                  | New requirements + existing system constraints                                                                                                                            | New requirements + existing system constraints    |
| **System Design**                       | Full architecture + infrastructure plan   | Assess existing + plan discovery for foundation work                                                                                                                      | Adapt/extend architecture + assess infrastructure |
| **Increment Design**                    | Plan bootstrap increment details          | Plan discovery increment details                                                                                                                                          | Plan first feature increment details              |
| **Increment 0 (bootstrap / discovery)** | **Establish infrastructure** (bootstrap)  | **Discover, document, and prepare** (scope depends on [readiness](brownfield-readiness.md#readiness-rubric)) (not a separate stage — executed using the iterative stages) | N/A — proceed directly to feature delivery        |
| **Increment 1+**                        | Deliver features with established infra   | Deliver features with established infra + documented context                                                                                                              | Deliver features with established infra           |
| **Support**                             | Monitor new system                        | Monitor changes, consider existing user base                                                                                                                              | Monitor changes, consider existing user base      |

### Project Foundation

> For a practical walkthrough of foundation activities — including sequencing,
> infrastructure planning by project type, brownfield requirements constraints,
> and links to stage-specific setup guides — see the
> [Project Foundation Guide](project-foundation.md).

**Greenfield** projects invest foundation work in a **bootstrap increment** —
establishing CI/CD, environments, monitoring, and deployment from scratch.

**Brownfield (first AI-assisted)** projects invest foundation work in a
**discovery increment** — documenting architecture, infrastructure, and
conventions for AI context. When discovery reveals deeper gaps, foundation may
extend into active preparation. See the
[Brownfield Readiness Guide](brownfield-readiness.md) for the readiness
assessment and routing.

**Brownfield (subsequent)** projects require no foundation work — proceed
directly to feature delivery.

### When Both Types Converge

After foundation work (where applicable), **both greenfield and brownfield
projects operate identically** — infrastructure is established, and feature
delivery follows the same iterative cycle.

---

## Right-Sizing Your Process

Right-sizing has two independent dimensions: **project risk tier** (Minimal,
Standard, Enterprise) determines _what_ practices you adopt, while **team size**
determines _how formally_ you apply them. The framework's eight stages remain
the same regardless — what changes is formality, documentation detail, and
coordination. For the full model, tier definitions, team-size guidance, and
choosing criteria, see the [Right-Sizing Guide](right-sizing.md).

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
[Right-Sizing Guide](right-sizing.md) for tier definitions.

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

**Last Updated:** 2026-03-19

Added to framework in v0.9.0.
