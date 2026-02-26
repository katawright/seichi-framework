# Increment Design Guide

> Stage-specific guidance for Increment Design. For cross-cutting framework
> concepts, see [Framework Guide](../framework-guide.md).

---

## Quick Reference

**Purpose:** Create detailed specifications for implementing a specific
increment, including component designs, interface specifications, data/state
changes, and test strategy.

**Primary roles:** Engineers

**Execution pattern:** Iterative (per increment)

**Key inputs:** System architecture from System Design, increment plan,
foundational conventions, requirements with ACs

**Key outputs:**

- Detailed component designs per increment
- Interface specifications (API endpoints, component contracts, event schemas —
  as applicable to your stack)
- Data/state changes (with migrations if applicable)
- **Test strategy for Verification stage** (what to test, how to test, coverage
  targets)
- Implementation notes and guidance

**What good looks like:**

- Components detailed enough to implement without guessing
- Interface specifications complete with inputs, outputs, and error cases
- Data/state changes clearly documented (with migration and rollback if
  applicable)
- Test strategy detailed enough for Verification to execute
- Follows foundational conventions from System Design

**Common pitfalls:**

- Over-designing future increments (YAGNI)
- Designs that don't follow established conventions
- Missing error handling paths
- Test strategy as afterthought
- No migration or rollback plan for data/state changes

**Checkpoint:** Quality Checkpoint (optional for Minimal; recommended for
Standard; required for Enterprise) — see
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
3. **Interface specification** — detail contracts between components, services,
   or systems (e.g., API endpoints, component props, event schemas)
4. **Test planning** — create test strategy for Verification stage
5. **Implementation guidance** — provide notes, tips, and considerations for
   engineers

---

## AI Assistance

> **Required gates:** Specialized review — Increment Design produces
> component-level decisions that shape implementation; gates may be lighter as
> patterns from System Design become established.

### AI Autonomy Spectrum

Match AI's role to your team's autonomy comfort level. Gate requirements always
apply regardless of tier. See the
[AI Assistance Scorecard: AI Autonomy Spectrum](../framework-ai-assistance.md#ai-autonomy-spectrum)
for full tier definitions.

**At a glance:**

| Human-Led                               | Collaborative                                     | AI-Led                                                                  |
| --------------------------------------- | ------------------------------------------------- | ----------------------------------------------------------------------- |
| Human designs; AI generates boilerplate | AI drafts component and test specs; human reviews | AI drafts and flags cross-cutting concerns proactively; human validates |

**By activity:**

| Activity                 | Human-Led                                  | Collaborative                                 | AI-Led                                                                                    |
| ------------------------ | ------------------------------------------ | --------------------------------------------- | ----------------------------------------------------------------------------------------- |
| **Component design**     | Engineer designs; AI generates boilerplate | AI drafts component specs; engineer reviews   | AI drafts specs and flags cross-cutting concerns proactively; engineer validates          |
| **Interface specs**      | Engineer specifies; AI suggests patterns   | AI drafts from requirements; engineer refines | AI drafts and identifies contract inconsistencies proactively; engineer validates         |
| **Data/state changes**   | Engineer plans; AI suggests approach       | AI drafts migration plan; engineer reviews    | AI analyzes data dependencies and proposes migration with rollback; engineer validates    |
| **Test strategy**        | Engineer plans; AI suggests cases          | AI drafts from ACs; engineer reviews          | AI cross-references requirements and design to identify coverage gaps; engineer validates |
| **Edge case analysis**   | Engineer identifies; AI suggests scenarios | AI enumerates edge cases; engineer validates  | AI analyzes component interactions for edge cases proactively; engineer validates         |
| **Implementation notes** | Engineer writes; AI suggests patterns      | AI drafts from design; engineer refines       | AI identifies implementation risks and patterns proactively; engineer validates           |

---

## Right-Sizing Increment Design

Not every increment needs formal component specs or detailed interface
contracts. Match your Increment Design effort to your project's risk tier.

| Practice               | Minimal                            | Standard                                      | Enterprise                                        |
| ---------------------- | ---------------------------------- | --------------------------------------------- | ------------------------------------------------- |
| **Component design**   | Mental model, brief notes          | Component specs with responsibilities defined | Detailed design docs with review and sign-off     |
| **Interface specs**    | Informal agreements or conventions | Documented API contracts and component props  | Formal interface specs with versioning strategy   |
| **Data/state changes** | Note what changes                  | Migration plan, rollback approach             | Formal data migration plan with validation steps  |
| **Test strategy**      | List what to test                  | Test plan with coverage targets               | Comprehensive test strategy with risk-based focus |
| **Risk assessment**    | Quick mental check                 | Known risks documented with mitigations       | Formal risk register with probability and impact  |
| **Dependency mapping** | Awareness of key dependencies      | Dependencies documented, owners identified    | Cross-team dependency tracking with SLAs          |

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
> [Right-Sizing Guide](../right-sizing-guide.md).

---

## Increment Design Workflow

1. **Review increment scope** — requirements from increment plan, acceptance
   criteria
2. **Design components** — responsibilities, structure, dependencies, state
   management
3. **Design interactions** — sequence diagrams, data flow, error handling
4. **Specify data/state changes** — new state, storage changes, migrations (if
   applicable)
5. **Specify interfaces** — contracts between components or systems (APIs,
   props, events, commands — as applicable)
6. **Plan testing** — unit, integration, acceptance, performance tests
7. **Document guidance** — security notes, performance tips, code patterns

---

## Increment Design Guidance

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

### Component Design Principles

For each component in the increment, document:

- **Responsibilities** — what the component does
- **Structure** — classes, modules, functions
- **Dependencies** — libraries, other components
- **State** — stateless/stateful, state management

**Key principle:** Provide enough detail for engineers to implement without
guessing. Reference architecture from System Design.

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
> [Increment Design Reference: Interface Specification Examples](increment-design-reference.md#interface-specification-examples).

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

#### Why Test Strategy Belongs in Design

- Ensures testability is designed in, not retrofitted
- Test planning happens when architectural decisions are fresh
- Prevents costly rework from untestable designs
- Aligns Design, Implementation, and Verification

> For testing strategy examples, see
> [Increment Design Reference: Testing Strategy Example](increment-design-reference.md#testing-strategy-example).

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

**Last Updated:** 2026-02-21

Added to framework in v0.12.0.
