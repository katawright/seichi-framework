---
id: increment-design
stage_number: 4
execution_pattern: iterative
inputs:
  - architecture-diagrams
  - increment-plan
  - requirements-with-acceptance-criteria
  - retrospective-action-items
outputs:
  - artifact: component-designs
    template: templates/increment-design-brief.md
  - artifact: api-specifications
  - artifact: data-model-changes
  - artifact: test-strategy
  - artifact: implementation-notes
gates:
  - type: specialized-review
    name: "Design Review"
feeds_into: [implementation]
checklist: stages/increment-design/checklist.md
reference: stages/increment-design/reference.md
---

# AI-Assisted SDLC: Increment Design Stage

## Overview

Practical guidance for creating detailed component designs, interface
specifications, and test strategies that give engineers everything they need to
implement an increment without guessing.

### Why Increment Design

Increment Design bridges "how we'll build it" (System Design) and "build it now"
(Implementation). Without it, engineers start coding from vague requirements
with no component contracts, no interaction flows, and no test plan — leading to
misaligned implementations, untested edge cases, and costly rework. Increment
Design exists to answer: _"What exactly are we building in this increment, and
how will we verify it works?"_

### Purpose

- Create detailed component designs for the current increment
- Specify interfaces, data/state changes, and integration points
- Define test strategy for Verification stage
- Document implementation guidance for engineers

### Key Principle

Provide enough detail for engineers to implement without guessing. Reference
architecture from System Design.

### Starting Point

A completed System Design with architecture, technology decisions, and increment
plan. The current increment should be identified from the increment plan, and
foundational conventions established (coding patterns, error handling,
technology-specific conventions).

> This stage operates from the **artifacts location**. See
> [Working Locations](../../guides/framework.md#working-locations).

### How to Use This Guide

1. Read [**How AI Helps**](#how-ai-helps) to determine your AI autonomy tier
2. Read [**Right-Sizing Increment Design**](#right-sizing-increment-design) to
   calibrate effort to your project's risk tier
3. Review increment plan for current increment scope
4. Use the [Manual Process Guide](../../guides/manual-process.md) to engage AI
   assistant in detailing component designs — refer to
   [**Why These Increment Design Elements Matter**](#why-these-increment-design-elements-matter)
   for rationale as you complete each section
5. Fill out the
   [Increment Design Brief Template](../../templates/increment-design-brief.md)
6. Specify
   [interfaces, data/state changes, component interactions](#why-these-increment-design-elements-matter)
7. Define [test strategy](#test-strategy) for Verification stage
8. Complete the [Increment Design Checklist](checklist.md) using AI according to
   your chosen autonomy tier
9. Obtain design approval — peer review or tech lead sign-off (optional for
   Minimal; recommended for Standard; required for Enterprise — see
   [Right-Sizing Guide](../../guides/right-sizing.md))
10. Proceed to Implementation stage

For cross-cutting framework concepts, see
[Framework Guide](../../guides/framework.md).

---

## How AI Helps

AI can assist with Increment Design at whatever autonomy tier your team is
comfortable with — from generating boilerplate to drafting complete component
specs with cross-cutting concerns flagged.

### AI Autonomy Spectrum

Match AI's role to your team's autonomy comfort level. Gate requirements always
apply regardless of tier. See the
[AI Assistance Scorecard: AI Autonomy Spectrum](../../guides/ai-assistance.md#ai-autonomy-spectrum)
for full tier definitions.

| Human-Led                               | Collaborative                                     | AI-Led                                                                  |
| --------------------------------------- | ------------------------------------------------- | ----------------------------------------------------------------------- |
| Human designs; AI generates boilerplate | AI drafts component and test specs; human reviews | AI drafts and flags cross-cutting concerns proactively; human validates |

At the AI-Led tier, oversight intensity can be tuned from Active to Minimal —
see
[AI Assistance Scorecard: Oversight Intensity](../../guides/ai-assistance.md#oversight-intensity).
For detailed AI-Led patterns, see
[Stage Reference](reference.md#ai-led-patterns).

### AI Assistance Patterns

- **Component design generation:** Describe your increment scope and system
  architecture — AI drafts component designs with responsibilities, structure,
  and interactions
- **Interface specification:** AI generates interface contracts (API endpoints,
  component props, event schemas) from requirements and conventions
- **Test strategy creation:** AI suggests test cases across unit, integration,
  and acceptance levels, including edge cases you may miss
- **Design review:** AI walks through the checklist and flags gaps in
  completeness, consistency, or convention adherence

For assistance level details, see the
[AI Assistance Scorecard](../../guides/ai-assistance.md).

> **Required gates:** Specialized review — Increment Design produces
> component-level decisions that shape implementation; gates may be lighter as
> patterns from System Design become established.

---

## Right-Sizing Increment Design

Not every increment needs formal component specs or detailed interface
contracts. Match your Increment Design effort to your project's risk tier.

| Practice               | Minimal                            | Standard                                       | Enterprise                                        |
| ---------------------- | ---------------------------------- | ---------------------------------------------- | ------------------------------------------------- |
| **Component design**   | Mental model, brief notes          | Component specs with responsibilities defined  | Detailed design docs with review and sign-off     |
| **Interface specs**    | Informal agreements or conventions | Documented API contracts and component props   | Formal interface specs with versioning strategy   |
| **Data/state changes** | Note what changes                  | Migration plan, rollback approach              | Formal data migration plan with validation steps  |
| **Test strategy**      | List what to test                  | Test plan with coverage targets                | Comprehensive test strategy with risk-based focus |
| **Risk assessment**    | Quick mental check                 | Known risks documented with mitigations        | Formal risk register with probability and impact  |
| **Dependency mapping** | Awareness of key dependencies      | Dependencies documented, owners identified     | Cross-team dependency tracking with SLAs          |
| **Security**           | Quick security mental check        | Document security-relevant changes and threats | Formal security assessment with test cases        |

Expand Increment Design only when needed:

- **Complex component interactions:** Add sequence diagrams, detailed error
  handling paths
- **Public API or shared interfaces:** Add formal interface specs, versioning
  strategy
- **Data migrations or schema changes:** Add migration plan with rollback and
  validation steps
- **Cross-team dependencies:** Add dependency mapping with owners, SLAs,
  integration timeline
- **High-risk increment:** Add risk register, detailed test strategy with
  coverage targets

Otherwise, keep design focused and move to Implementation.

> These triggers help you decide when to move from Minimal to Standard or
> Enterprise. For full tier definitions and choosing criteria, see the
> [Right-Sizing Guide](../../guides/right-sizing.md).

> **Discovery increments:** Discovery and foundation increments map
> documentation deliverables onto the code-oriented template sections. For
> example, "Component Design" becomes "Deliverable Design" describing
> documentation or spike outputs, and scope uses deliverable IDs (D-1, D-2)
> rather than FR-IDs. Right-size accordingly — most discovery increments fit the
> Minimal tier.

---

## Why These Increment Design Elements Matter

Each section of the Increment Design Brief exists because skipping it causes
predictable failures. This section explains why each element is included.

### How System Design and Increment Design Interact

System Design creates the rules; Increment Design applies them:

- System Design: "We use REST APIs with JWT auth" / Increment Design: "POST
  /api/v1/posts with Bearer token"
- System Design: "React components use compound pattern with context" /
  Increment Design: "`<DataTable>` exposes `columns` prop and `onSort` callback"

Increment Design creates test strategy; Verification stage executes it:

- Increment Design: "Integration tests for the registration flow: valid input ->
  success, duplicate entry -> error"
- Verification: Executes planned tests, validates ACs

System Design is revisited rarely; Increment Design is adjusted based on
implementation feedback.

### Prior Learnings

For Increment 2+, review before planning:

- **Retrospective action items** — open actions from the previous increment's
  retrospective that affect this increment's design or process
- **Pre-mortem assumptions** — check whether any Initiation pre-mortem failure
  modes are becoming relevant based on what the team has learned so far
- **Surprises from Implementation** — deviations noted during the last increment
  that should inform this one's design
- **Technical debt** — review known debt items from previous increments and
  decide which to address in this increment's scope (fix now, schedule later, or
  accept). Include selected debt items in the increment's scope baseline and
  test strategy.

This is the point in the cycle where the
[learning throughline](../../guides/framework.md#learning-throughline) feeds
back into planning.

### I0 Foundation Concerns

Right-size to your current project tier, but consider your target tier when the
cost of adding now is low and the cost of retrofitting later is high.

| Concern                | Examples                                              | Minimal     | Standard    | Enterprise |
| ---------------------- | ----------------------------------------------------- | ----------- | ----------- | ---------- |
| Code quality tooling   | Linting, formatting, pre-commit hooks                 | Optional    | Recommended | Required   |
| Testing infrastructure | Framework setup, fixture/seed strategy, coverage      | Recommended | Required    | Required   |
| Security tooling       | SAST, dependency scanning, secrets detection          | Optional    | Recommended | Required   |
| Local dev environment  | Devcontainers, Docker Compose, env var management     | Optional    | Recommended | Required   |
| Documentation tooling  | API docs generation, architecture diagrams, changelog | Optional    | Recommended | Required   |
| Developer onboarding   | PR templates, code review standards, setup runbooks   | Optional    | Recommended | Required   |

All items are visible regardless of tier — skipped items are conscious
deferrals, not failures. Document deferred concerns with a brief justification
so the decision is traceable.

For infrastructure concerns (CI/CD, environments, monitoring, deployment), see
[Project Foundation Guide](../../guides/project-foundation.md).

### Component Design Principles

For each component in the increment, document:

- **Responsibilities** — what the component does
- **Structure** — classes, modules, functions
- **Dependencies** — libraries, other components
- **State** — stateless/stateful, state management

#### Component Interactions

Document how components communicate for this increment's features:

- Sequence diagrams or flow descriptions
- Calls, events, or data flow between components
- Error handling paths (happy path + key errors)

### Interface Design Principles

Follow the conventions established in System Design. For each interface your
increment introduces or modifies, document:

- Interface type and identifier
- Input/output formats
- Validation rules
- Success and error cases

The specific details depend on your project's technology stack. Common interface
types include:

- **API endpoints** — HTTP method, path, request/response formats, status codes
- **UI component contracts** — props, callbacks, rendered output
- **Event schemas** — event name, payload structure, consumers
- **CLI commands** — arguments, flags, output format
- **Library functions** — signatures, return types, exceptions

> For detailed interface specification examples, see
> [Increment Design Reference: Interface Specification Examples](reference.md#interface-specification-examples).

### Test Strategy

The test strategy is a **key output of Increment Design**. It tells the
Verification stage what to test and how.

#### What to Define

- **Unit tests:** Key functions, test cases (happy path, edge cases, errors),
  coverage targets, mock strategy
- **Integration tests:** Interface tests (e.g., API request/response, component
  rendering, event handling), data integration, end-to-end flows
- **Acceptance tests:** Manual test scenarios from ACs, UAT scripts for
  stakeholders
- **Performance tests:** Load test scenarios validating NFRs, tools and
  approach, success criteria
- **Security tests:** Threat-model-driven test cases, input validation, auth
  boundary checks (see checklist item 7)

#### Why Test Strategy Belongs in Design

- Ensures testability is designed in, not retrofitted
- Test planning happens when architectural decisions are fresh
- Prevents costly rework from untestable designs
- Aligns Design, Implementation, and Verification

> For testing strategy examples, see
> [Increment Design Reference: Testing Strategy Example](reference.md#testing-strategy-examples).

---

## Stage Outputs

Detailed component designs, interface specifications (if applicable), data/state
changes (if applicable), test strategy for Verification stage, implementation
notes.

> Increment Design continues the **measurement throughline** by translating
> success criteria into testable specifications — defining the test strategy
> that Verification will execute against. See
> [Framework Guide: Measurement Throughline](../../guides/framework.md#measurement-throughline).

> Increment Design continues the **learning throughline** by reviewing
> pre-mortem assumptions from Initiation and carrying forward action items from
> prior retrospectives. See
> [Framework Guide: Learning Throughline](../../guides/framework.md#learning-throughline).

> Increment Design continues the **security throughline** by assessing security
> implications of the current increment and flagging auth, data, or API changes
> that require security review. See [Security Guide](../../guides/security.md).

**Handoff:** Implementation stage receives detailed design specs, interface
contracts, and test strategy.

---

## When to Revisit Increment Design

### Triggers

- Implementation is blocked by design gaps
- Code review reveals unhandled edge cases
- Testing fails due to design issues
- Requirements are clarified during implementation

### Revision Process

1. Identify trigger (what new information?)
2. Assess impact (which components affected?)
3. Update design artifacts
4. Create ADR if decision is significant
5. Communicate to affected team members
6. Update test strategy if needed

> **Mid-stage discovery?** If an API can't support the interaction pattern
> designed, or a design assumption proves invalid, see the
> [Mid-Stage Discovery](../../guides/framework.md#mid-stage-discovery) decision
> tree to classify the severity and determine the right response.

---

## Notes

**Last Updated:** 2026-03-19

Added to framework in v0.12.0.
