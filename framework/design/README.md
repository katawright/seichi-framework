# AI-Assisted SDLC: Design Stage Artifacts

**Framework Version:** 0.4.0
**Last Updated:** 2026-02-09

**Stage:** 3 of 7 (Design)
**Primary Audience:** Engineers, Solutions Architects
**Supporting Roles:** Product Manager, QA Engineers, DevOps
**Execution Pattern:** Foundational + Iterative

## Overview

The Design stage translates requirements into implementable technical solutions. It has a unique **dual execution pattern**:

- **Foundational pass (once per project):** Establish system architecture, technology choices, and create the iteration plan that maps MoSCoW priorities to specific increments
- **Iterative passes (per increment):** Create detailed designs for specific features and components

This stage is where engineering expertise shapes how requirements become reality, balancing technical constraints, architectural principles, and business objectives.

## Purpose

**Foundational:** Define the system's architecture, key technical decisions, and overall approach that will guide all implementation work.

**Iterative:** Detail how specific features will be built within the established architecture, providing clear specifications for implementation.

## Artifacts

### 1. Design Brief Template (`design-brief-template.md`)

A template for documenting both foundational architecture and iterative detailed designs.

**Foundational sections:**
- System architecture overview
- Technology stack and framework choices
- Data architecture and persistence strategy
- API architecture and integration approach
- Security and compliance design
- Observability and monitoring design
- Iteration plan (mapping MoSCoW priorities to increments)

**Iterative sections (per increment):**
- Increment scope and requirements
- Component design and interactions
- Data model changes
- API specifications
- Testing strategy for increment

### 2. Design Checklist (`design-checklist.md`)

Quick validation (60-90 seconds) that ensures design readiness before proceeding to implementation.

**Foundational checklist items:**
- Architecture addresses all requirements
- Technology choices are justified
- Iteration plan created with increment boundaries
- Security and performance considerations addressed

**Iterative checklist items:**
- Detailed design supports increment requirements
- Component interactions are clear
- Testing approach is defined

### 3. Design Reference (`design-reference.md`)

Comprehensive guidance on design practices, principles, and techniques.

**Covers:**
- What design means in this framework
- Foundational vs. iterative design activities
- Architecture principles and patterns
- Technology selection criteria
- Creating effective iteration plans
- Design documentation techniques
- Architecture Decision Records (ADRs)
- When to revisit design decisions
- Common design anti-patterns

### 4. Design AI Agent Prompt (`design-ai-agent-prompt.md`)

An AI assistant prompt tailored for engineers and architects to help draft design documents.

**Helps with:**
- Architectural brainstorming
- Technology trade-off analysis (including cost research)
- Creating iteration plans from prioritized requirements
- **Generating separate ADR files** for technology decisions
- Documenting design decisions with cost implications
- Identifying security and performance considerations

**⚠️ Important:** The AI prompt instructs the AI to create **separate ADR files** (not embedded in design-brief).

### 5. Architecture Decision Record Template (`design-adr-template.md`)

A template for documenting individual architectural decisions as separate files.

**What it is:**
- Standalone file template for each significant technology or architecture decision
- Stored in `docs/adr/` directory in project repositories
- Referenced from design-brief, not embedded in it

**Includes sections for:**
- Context and problem statement
- Options considered with cost analysis
- Decision and rationale
- Consequences (positive, negative, cost implications)
- Alternatives and why not chosen
- Implementation notes and references

**When to use:**
- Significant technology choices (database, framework, cloud platform)
- Architecture style decisions (monolith, microservices, serverless)
- Infrastructure choices with cost implications
- Security or compliance approaches
- Any decision that's hard to reverse or impacts multiple components

**File naming:** `ADR-XXX-short-description.md` (e.g., `ADR-001-database-selection.md`)

**⚠️ Critical:** ADRs must include cost research (one-time, recurring, scaling costs) to prevent budget surprises.

### 6. This README

Explains all Design artifacts, the dual execution pattern, and how to use them effectively.

---

## Execution Pattern: Foundational + Iterative

### Foundational Pass (Once per Project)

**When:** After Requirements stage is complete, before first increment implementation

**Goal:** Establish the architectural foundation and create the iteration plan

**Key Activities:**
1. **Understand requirements holistically** - Review all FRs, NFRs, and MoSCoW priorities
2. **Design system architecture** - Components, boundaries, integration points
3. **Select technology stack** - Languages, frameworks, databases, platforms
4. **Design data architecture** - Data models, persistence, migrations
5. **Design API architecture** - Contracts, versioning, authentication
6. **Address NFRs** - Security, performance, scalability, observability
7. **Create iteration plan** - Map MoSCoW priorities to specific increments with dependencies

**Outputs:**
- Architecture diagrams (system context, containers, components)
- Technology stack document with justification
- Data architecture overview
- API design principles and standards
- Security and compliance approach
- Observability and monitoring strategy
- **Iteration plan** with increment boundaries and requirement mappings

**Checkpoint:** Alignment Review
- Stakeholders: Engineers, Architects, Product Manager, DevOps
- Review architecture and iteration plan
- Validate technical feasibility and approach
- Outcome: Approved / Adjustments Needed

**Gate 2 (Investment Decision):**
After foundational Design is complete, stakeholders make the build/no-build decision based on:
- Requirements clarity (from Requirements stage)
- Architecture feasibility (from Design foundational pass)
- Iteration plan showing delivery roadmap
- Decision: Proceed to Implementation / Pivot / Stop

### Iterative Passes (Per Increment)

**When:** Before implementing each increment

**Goal:** Provide detailed specifications for the current increment's implementation

**Key Activities:**
1. **Review increment scope** - Which requirements are in this increment (from iteration plan)
2. **Detail component design** - How components interact for these features
3. **Design data changes** - Schema changes, migrations, data flows
4. **Specify APIs** - Endpoint designs, request/response formats
5. **Plan testing approach** - Unit, integration, and acceptance test strategies
6. **Identify risks** - Technical challenges or unknowns in this increment

**Outputs:**
- Detailed component designs for increment
- Database schema changes and migration scripts
- API specifications (OpenAPI/Swagger or equivalent)
- Sequence diagrams for key interactions
- Test strategy for increment
- Implementation notes and guidance

**Checkpoint:** Quality Checkpoint (optional for complex increments)
- Stakeholders: Engineers, Tech Lead
- Review detailed design before coding begins
- Validate approach is sound and implementable
- Outcome: Ready / Not Ready (adjustments needed)

---

## Workflow

### Starting Foundational Design

```
Prerequisites:
✅ Requirements stage complete
✅ Requirements document with MoSCoW priorities
✅ NFRs clearly defined
✅ Success criteria identified

Steps:
1. Review requirements-brief.md and all FRs/NFRs
2. Use design-ai-agent-prompt.md to brainstorm architecture
3. Fill out foundational sections of design-brief-template.md
4. Create iteration plan mapping MoSCoW priorities to increments
5. Run through design-checklist.md (foundational items)
6. Conduct Alignment Review with stakeholders
7. Refine based on feedback
8. Proceed to Gate 2 decision (with Requirements + Design ready)
```

### Starting Iterative Design (Per Increment)

```
Prerequisites:
✅ Foundational architecture established
✅ Increment identified in iteration plan
✅ Requirements for increment are clear

Steps:
1. Review iteration plan for current increment scope
2. Use design-ai-agent-prompt.md to detail component designs
3. Fill out iterative sections of design-brief-template.md
4. Specify APIs, data models, component interactions
5. Run through design-checklist.md (iterative items)
6. Optional: Quality Checkpoint for complex increments
7. Proceed to Implementation stage
```

---

## Relationship to Other Stages

### Inputs from Requirements Stage

- Requirements document with all FRs and NFRs
- MoSCoW prioritization (Must/Should/Could/Won't Have)
- Acceptance criteria for each requirement
- Success criteria requiring instrumentation
- Constraints and assumptions

### Outputs to Implementation Stage

**From foundational pass:**
- System architecture and component boundaries
- Technology stack and development standards
- Data architecture and API principles
- Iteration plan defining increment scope

**From iterative pass:**
- Detailed component designs for current increment
- API specifications and data models
- Test strategy for increment
- Implementation guidance and notes

### Feedback Loops

**Design → Requirements:**
- Architecture reveals requirements are infeasible → Revisit Requirements
- NFRs are too vague to design for → Clarify in Requirements
- Dependencies between features identified → Adjust prioritization in Requirements

**Verification → Design:**
- Testing reveals design flaws → Revise iterative design
- Performance doesn't meet NFRs → Revisit architecture

**Support → Design:**
- Production issues reveal architectural problems → Revisit foundational design
- Monitoring shows design doesn't support observability needs → Add instrumentation

---

## Creating the Iteration Plan

The iteration plan is a key output of the foundational Design pass. It maps MoSCoW priorities from Requirements to specific, deliverable increments.

### Purpose

- **Break down work** - Divide the full scope into manageable chunks
- **Sequence delivery** - Order increments based on dependencies, risk, and value
- **Manage scope** - Make Could Haves opportunistic, ensure Won't Haves stay out
- **Enable iterative delivery** - Ship working software incrementally

### Approach

**Start with Must Haves:**
1. Identify technical dependencies among Must Have requirements
2. Group into logical increments (usually 2-4 weeks of work each)
3. Order based on: foundational capabilities first, then building upward
4. Example: Increment 1 = auth + data schema, Increment 2 = core features, Increment 3 = advanced features

**Add Should Haves:**
1. Map Should Have requirements to increments based on:
   - Dependencies (must come after related Must Haves)
   - Risk (de-risk early or defer if uncertain)
   - Value (higher-value features earlier)
2. Could Haves are evaluated during implementation (built if easy, skipped if hard)

**Document Won't Haves:**
- Explicitly list Won't Have requirements to prevent scope creep
- Explain why they're out of scope

### Iteration Plan Format

```markdown
## Iteration Plan

### Increment 1: [Name] (Must Have - Foundation)
- **Requirements:** FR-1, FR-2, FR-3, NFR-1, NFR-2
- **Goal:** Establish foundational capabilities
- **Duration:** 2 weeks
- **Dependencies:** None

### Increment 2: [Name] (Must Have - Core Features)
- **Requirements:** FR-4, FR-5, FR-6, NFR-3
- **Goal:** Deliver core user-facing features
- **Duration:** 2 weeks
- **Dependencies:** Increment 1 complete

### Increment 3: [Name] (Should Have - Enhancement)
- **Requirements:** FR-7, FR-8, FR-9
- **Goal:** Add important enhancements
- **Duration:** 2 weeks
- **Dependencies:** Increment 2 complete

### Could Have Requirements (Opportunistic)
- FR-10: Build if time permits during Increment 2
- FR-11: Evaluate during Increment 3

### Won't Have (Out of Scope)
- FR-12, FR-13, FR-14 - Deferred to future project
```

---

## AI Assistance Guidance

### AI Autonomy Level: Medium (with Human Oversight)

From the [AI Autonomy Scorecard](../../AI_AUTONOMY_SCORECARD.md):

- **Fit:** High - AI excels at architectural patterns, trade-off analysis, and generating design options
- **Verifiability:** Medium - Designs can be reviewed but require architectural expertise to validate
- **Risk:** Medium - Poor design decisions can be costly but are caught before production
- **Recommended Autonomy:** AI drafts with mandatory human review and approval

### Where AI Helps

**Foundational Design:**
- Generate architecture options based on requirements
- Analyze technology trade-offs
- Suggest design patterns for common scenarios
- Identify potential security and performance concerns
- Create iteration plans from MoSCoW priorities

**Iterative Design:**
- Generate component designs for specific features
- Create API specifications and data models
- Suggest test strategies
- Identify edge cases and error scenarios

### Where Human Expertise is Critical

- **Final architecture decisions** - AI provides options, human chooses based on context
- **Technology selection** - Consider team skills, organizational standards, long-term maintenance
- **Security and compliance** - Verify AI suggestions meet regulatory requirements
- **Performance and scalability** - Validate designs will meet NFRs under real conditions
- **Design review and approval** - Experienced engineers must validate AI-generated designs

### Best Practices

1. **Use AI for exploration** - Generate multiple architectural options, compare trade-offs
2. **Human makes decisions** - Engineers own the final design choices
3. **Document decisions** - Use Architecture Decision Records (ADRs) to explain key choices
4. **Iterative refinement** - Use AI to iterate on designs based on review feedback
5. **Validate against requirements** - Ensure designs address all FRs and NFRs
6. **Security review** - Have security experts review AI-generated security designs

---

## Checkpoints and Gates

### Foundational Design Checkpoints

**Alignment Review (Mandatory):**
- **When:** After foundational architecture is drafted
- **Who:** Engineers, Architects, Product Manager, DevOps, QA Lead
- **Purpose:** Ensure architecture is sound and iteration plan is feasible
- **Outcome:** Approved / Adjustments Needed
- **AI Validation:** Human review ensures AI-generated architecture is appropriate for context

**Gate 2 - Build/No-Build Decision (Mandatory):**
- **When:** After Requirements + Design foundational pass complete
- **Who:** Executives, Product Leadership, Engineering Leadership
- **Purpose:** Commit team and resources to building the project
- **Based On:** Requirements clarity, architecture feasibility, iteration plan
- **Decision:** Proceed / Pivot / Stop
- **AI Validation:** Human leadership owns investment decision based on AI-assisted analysis

### Iterative Design Checkpoints

**Quality Checkpoint (Optional):**
- **When:** Before implementing complex or risky increments
- **Who:** Engineers, Tech Lead, Senior Developers
- **Purpose:** Validate detailed design is implementable and sound
- **Outcome:** Ready / Not Ready (adjustments needed)
- **AI Validation:** Code review ensures AI-generated designs are correct and maintainable

---

## When to Revisit Design

### Revisit Foundational Design When:

1. **Architecture is infeasible** - Implementation reveals the design doesn't work
2. **NFRs can't be met** - Performance, scalability, or security requirements unachievable
3. **Technology choice is wrong** - Framework/platform doesn't support needed capabilities
4. **Major requirements change** - Business needs shift significantly
5. **Production issues** - Deployed increments reveal architectural problems
6. **New constraints emerge** - Regulatory, security, or business constraints appear

### Revisit Iterative Design When:

1. **Implementation is blocked** - Detailed design has errors or gaps
2. **Code review reveals issues** - Design doesn't account for edge cases
3. **Testing fails** - Design doesn't support testability
4. **Requirements clarified** - Acceptance criteria become clearer during implementation

### Revision Process

1. **Identify trigger** - What new information emerged?
2. **Assess impact** - Which increments or components are affected?
3. **Update design artifacts** - Revise architecture or detailed design
4. **Communicate changes** - Notify affected stakeholders and teams
5. **Update downstream work** - Adjust iteration plan or in-progress implementation

---

## Measurement Throughline

The Design stage operationalizes measurement by designing the instrumentation that will capture success criteria.

**From Initiation:**
- Objectives with measurable success criteria defined

**From Requirements:**
- NFRs specify what needs to be measured (performance, availability, business metrics)
- Acceptance criteria ladder up to success criteria

**In Design:**
- Design analytics infrastructure (data collection, storage, dashboards)
- Design monitoring and alerting systems
- Design logging and telemetry instrumentation
- Plan for A/B testing or feature flags if needed
- Create metrics collection specifications

**To Implementation:**
- Implement logging, metrics collection, and instrumentation
- Build dashboards and monitoring systems

**Example:**
- **Initiation:** Reduce customer support tickets by 30% within 6 months
- **Requirements:** NFR-5: System must log all user errors with context
- **Design:** Design error tracking system with categorization, trending dashboard, alert thresholds
- **Implementation:** Implement error logging, build dashboard
- **Support:** Monitor error rates and validate 30% reduction

---

## Enterprise Extensions

### Splitting Design into Two Stages

Large organizations may split Design into:

**3a. Architecture:**
- System-level design and technology decisions
- Reviewed by architecture board or technical leadership
- Produces: Architecture diagrams, ADRs, technology stack decisions
- Gate: Architecture board approval

**3b. Detailed Design:**
- Component-level design for specific increments
- Reviewed by tech leads and senior engineers
- Produces: Detailed component designs, API specs, data models
- Gate: Tech lead approval

Most small-to-medium teams should keep Design as a single stage with foundational and iterative passes.

---

## Quick Reference

**Foundational Design (Once):**
- Architecture diagrams
- Technology stack selection
- Data and API architecture
- Iteration plan creation
- Alignment Review + Gate 2

**Iterative Design (Per Increment):**
- Detailed component design
- API specifications
- Data model changes
- Test strategy
- Optional Quality Checkpoint

**Key Output:**
- Iteration plan mapping MoSCoW to increments

**Primary Role:**
- Engineers / Solutions Architect

**AI Autonomy:**
- Medium - AI drafts, human reviews and approves

---

## Additional Resources

- **[STAGES.md](../../STAGES.md)** - Authoritative stage definitions
- **[AI Autonomy Scorecard](../../AI_AUTONOMY_SCORECARD.md)** - AI autonomy guidance per stage
- **[PROJECT_CONTEXT.md](../../PROJECT_CONTEXT.md)** - Framework design principles and philosophy
- **Previous Stage:** [Requirements](../requirements/README.md)
- **Next Stage:** Implementation _(coming soon)_
