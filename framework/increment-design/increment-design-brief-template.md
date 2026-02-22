# Increment Design Brief

**Last Updated:** YYYY-MM-DD

---

**Project Name:** [Project Name] **Increment Number/Name:** [e.g., Increment 1:
Foundation] **Date:** [YYYY-MM-DD] **Author(s):** [Engineering Lead]
**Reviewers:** [Engineering Team, QA Engineers]

---

## Metadata

- **Related Requirements:** [Link to requirements-brief.md]
- **Related System Design:** [Link to system-design-brief.md]
- **Execution Pattern:** Iterative (see
  [AI-Assisted SDLC Stages](../framework-stages.md))
- **Primary Role:** Engineers
- **Supporting Roles:** QA Engineers, Product Manager
- **Checkpoint:** Quality Checkpoint (optional for Minimal; recommended for
  Standard; required for Enterprise)
- **Constraining ADRs:** [ADR-001, ADR-003 — list decisions that shape this
  increment's design]

---

## 1. Increment Scope

**Requirements in Scope:**

- [List requirement IDs from increment plan]

**Acceptance Criteria:**

- [Key ACs from requirements-brief for this increment]

**Out of Scope for This Increment:**

- [What's NOT included to prevent scope creep]

---

## 2. Component Design

### 2.1 Components in This Increment

For each component, document:

- **Responsibilities** — what the component does
- **Structure** — classes, modules, functions
- **Dependencies** — libraries, other components
- **State** — stateless/stateful, state management

_Provide enough detail for engineers to implement without guessing. Reference
architecture from System Design._

**Component: [Name]**

**Responsibilities:** [What it does]

**Structure:**

```
[Directory/file structure with key functions]
```

**Dependencies:** [Libraries, other components] **State:** [Stateless /
stateful, approach]

_Add more components as needed._

---

### 2.2 Component Interactions

Document how components communicate for this increment's features:

- Sequence diagrams or flow descriptions
- Calls, events, or data flow between components
- Error handling paths (happy path + key errors)

**[Feature Name] Flow:**

```
[Numbered steps showing component interactions]
```

**Error Scenarios:**

- [Error condition] -> [Response] -> [User experience]

---

## 3. Data and State Changes

_Include sections below that apply to your project. Not all projects require
data storage or schema changes._

### 3.1 State Management Changes

Describe how this increment affects application state:

- New state introduced (local state, shared state, persisted data)
- State flow between components
- State initialization and cleanup

### 3.2 Schema/Storage Changes (if applicable)

_Include this section if your project uses a database or persistent storage._

**New/Modified Structures:**

```
[Schema definitions, DDL, document structures, or storage formats]
```

**Migration Strategy:** [Migration path/name or approach] **Rollback:**
[Rollback strategy]

---

### 3.3 Data Access Patterns (if applicable)

- Key queries or data retrieval patterns
- Caching strategy (if applicable)
- Performance considerations (e.g., N+1 prevention, pagination)

---

## 4. Interface Specifications

_Include sections below that apply to your project. Choose the interface types
relevant to your technology stack._

### 4.1 Interfaces

For each interface this increment introduces or modifies, document:

- Interface type and identifier (e.g., API endpoint, event, prop contract, CLI
  command)
- Input/output formats
- Validation rules
- Success and error cases

_Follow conventions established in System Design._

**[Interface identifier]**

- **Description:** [What it does]
- **Input:** [Parameters, props, request body, arguments]
- **Output:** [Return value, response, emitted event]
- **Error cases:** [Validation failures, error states]

_Add more interfaces as needed._

**Examples of interface types by project:**

- **REST API:** `POST /api/v1/users` — method, path, request/response bodies,
  status codes
- **UI component:** `<UserCard user={User} onDelete={fn}>` — props, callbacks,
  rendered output
- **Event-driven:** `user.created` event — payload schema, consumers
- **CLI tool:** `migrate --dry-run` — arguments, flags, stdout output
- **Library/SDK:** `createClient(config): Client` — function signatures, return
  types

> For detailed interface specification examples, see
> [Increment Design Reference](increment-design-reference.md#interface-specification-examples).

---

## 5. Testing Strategy for This Increment

### 5.1 Unit Tests

- Key functions to test
- Test cases (happy path, edge cases, errors)
- Coverage targets
- Mock strategy for external dependencies

### 5.2 Integration Tests

- Interface tests (e.g., API request/response, component rendering, event
  handling)
- Data integration tests (if applicable)
- End-to-end flows

### 5.3 Acceptance Testing

- Manual test scenarios referencing ACs from requirements-brief
- UAT script for stakeholders

### 5.4 Performance Testing (if applicable)

- Load test scenarios validating NFRs
- Tools and approach
- Success criteria

> For detailed testing strategy examples, see
> [Increment Design Reference: Testing Strategy Example](increment-design-reference.md#testing-strategy-example).

---

## 6. Implementation Notes

Guidance, tips, and considerations for engineers:

### Security Notes

- [Security considerations specific to this increment]

### Performance Notes

- [Performance considerations, indexes, optimizations]

### Code Patterns

- [Patterns to follow, conventions, gotchas]

---

## Checklist

Before proceeding to Implementation, validate:

- [ ] Increment scope clear (in/out of scope)
- [ ] Component designs detailed and implementable
- [ ] Data/state changes specified (with migrations if applicable)
- [ ] Interface specifications complete and follow conventions
- [ ] Testing strategy covers unit, integration, acceptance, performance
- [ ] Implementation notes provide guidance

**Handoff to Implementation:**

- [ ] Engineers understand what to build and how
- [ ] No major unknowns or blockers
- [ ] Ready to proceed to Implementation stage

---

## Notes

**Template Last Updated:** 2026-02-21

Added to framework in v0.12.0.
