# Increment Design Guide

> Stage-specific guidance for Increment Design. For cross-cutting framework
> concepts, see [Framework Guide](../framework-guide.md).

---

## Quick Reference

**Purpose:** Create detailed specifications for implementing a specific
increment, including component designs, API specs, data model changes, and test
strategy.

**Primary roles:** Engineers

**Execution pattern:** Iterative (per increment)

**Key inputs:** System architecture from System Design, increment plan,
foundational conventions, requirements with ACs

**Key outputs:**

- Detailed component designs per increment
- API endpoint specifications
- Data model changes with migrations
- **Test strategy for Verification stage** (what to test, how to test, coverage
  targets)
- Implementation notes and guidance

**What good looks like:**

- Components detailed enough to implement without guessing
- API specs complete with request/response formats
- Data model changes include migration and rollback
- Test strategy detailed enough for Verification to execute
- Follows foundational conventions from System Design

**Common pitfalls:**

- Over-designing future increments (YAGNI)
- Designs that don't follow established conventions
- Missing error handling paths
- Test strategy as afterthought
- No data migration or rollback plan

**Checkpoint:** Optional Quality Checkpoint — see
[Framework Guide: Checkpoints](../framework-guide.md#checkpoint-taxonomy)

**AI assistance:** AI agent + strong gates — see
[Framework Guide: AI Assistance](../framework-guide.md#ai-assistance-overview)

---

## What Is Increment Design?

Increment Design creates detailed specifications for implementing a specific
increment. It applies the foundational architecture and conventions established
in System Design to a concrete set of requirements.

**Purpose:**

1. **Detail planning** — specify exactly what to build for this increment
2. **Component design** — define responsibilities, structure, and interactions
3. **API specification** — detail endpoints, request/ response formats,
   validation
4. **Test planning** — create test strategy for Verification stage
5. **Implementation guidance** — provide notes, tips, and considerations for
   engineers

---

## Increment Design Workflow

1. **Review increment scope** — requirements from increment plan, acceptance
   criteria
2. **Design components** — responsibilities, structure, dependencies, state
   management
3. **Design interactions** — sequence diagrams, data flow, error handling
4. **Specify data changes** — schema changes, migrations, rollback
5. **Specify APIs** — endpoints, validation, responses, error cases
6. **Plan testing** — unit, integration, acceptance, performance tests
7. **Document guidance** — security notes, performance tips, code patterns

---

## How System Design and Increment Design Interact

System Design creates the rules; Increment Design applies them:

- System Design: "We use REST APIs with JWT auth"
- Increment Design: "POST /api/v1/posts with Bearer token"

Increment Design creates test strategy; Verification stage executes it:

- Increment Design: "Integration tests for POST /register: valid input -> 201,
  duplicate email -> 409"
- Verification: Executes planned tests, validates ACs

System Design is revisited rarely; Increment Design is adjusted based on
implementation feedback.

---

## Component Design Principles

For each component in the increment, document:

- **Responsibilities** — what the component does
- **Structure** — classes, modules, functions
- **Dependencies** — libraries, other components
- **State** — stateless/stateful, state management

**Key principle:** Provide enough detail for engineers to implement without
guessing. Reference architecture from System Design.

### Component Interactions

Document how components communicate for this increment's features:

- Sequence diagrams or flow descriptions
- API calls and data flow
- Error handling paths (happy path + key errors)

---

## API Design Principles

Follow the API conventions established in System Design. For each endpoint:

- HTTP method, path, description
- Authentication requirements
- Request parameters (body, query, headers)
- Validation rules
- Response format (success and error cases)

> For detailed API specification examples, see
> [Increment Design Reference: API Specification Example](increment-design-reference.md#api-specification-example).

---

## Test Strategy (Increment Design to Verification)

The test strategy is a **key output of Increment Design**. It tells the
Verification stage what to test and how.

### What to Define

- **Unit tests:** Key functions, test cases (happy path, edge cases, errors),
  coverage targets, mock strategy
- **Integration tests:** API endpoint tests (request -> response), database
  integration, end-to-end flows
- **Acceptance tests:** Manual test scenarios from ACs, UAT scripts for
  stakeholders
- **Performance tests:** Load test scenarios validating NFRs, tools and
  approach, success criteria

### Why Test Strategy Belongs in Design

- Ensures testability is designed in, not retrofitted
- Test planning happens when architectural decisions are fresh
- Prevents costly rework from untestable designs
- Aligns Design, Implementation, and Verification

> For testing strategy examples, see
> [Increment Design Reference: Testing Strategy Example](increment-design-reference.md#testing-strategy-example).

---

## AI Assistance in Increment Design

**AI excels at:**

- Generating component design options
- Creating API specifications from requirements
- Suggesting test strategies and test cases
- Identifying edge cases and error scenarios
- Creating boilerplate (API specs, data models)

**AI struggles with:**

- Organizational context (team skills, existing code)
- Subtle business logic nuances
- Knowing which conventions are already established

**Best practices:**

1. Provide System Design context to AI
2. Reference existing conventions and patterns
3. Use AI for exploration, human makes final decisions
4. Iterate with AI based on review feedback

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

---

## Related Documents

- [Increment Design Brief Template](increment-design-brief-template.md)
- [Increment Design Checklist](increment-design-checklist.md)
- [Increment Design Reference](increment-design-reference.md)
- [System Design Guide](../system-design/system-design-guide.md)
- [ADR Template](../adr-template.md)
- [AI-Assisted SDLC Stages](../framework-stages.md)

---

## Notes

**Last Updated:** 2026-02-16

Added to framework in v0.12.0.
