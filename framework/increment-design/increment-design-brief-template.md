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
- **Checkpoint:** Quality Checkpoint (optional)

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
- API calls and data flow
- Error handling paths (happy path + key errors)

**[Feature Name] Flow:**

```
[Numbered steps showing component interactions]
```

**Error Scenarios:**

- [Error condition] -> [Response] -> [User experience]

---

## 3. Data Model Changes

### 3.1 Schema Changes

**New/Modified Tables:**

```sql
[SQL DDL for new tables, columns, indexes]
```

**Migration File:** [Migration path/name] **Rollback:** [Rollback SQL or
strategy]

---

### 3.2 Data Access Patterns

- Key queries and ORM usage patterns
- Caching strategy (if applicable)
- N+1 prevention approach

---

## 4. API Specifications

### 4.1 Endpoints

For each endpoint, document:

- HTTP method, path, description
- Authentication requirements
- Request parameters (body, query, headers)
- Validation rules
- Response format (success and error cases)

_Follow API design principles from System Design._

**[METHOD] [PATH]**

- **Description:** [What it does]
- **Authentication:** [None / Required]
- **Request:** [Parameters and validation]
- **Success Response:** [Status code and body]
- **Error Responses:** [Status codes and bodies]

_Add more endpoints as needed._

> For detailed API specification examples with full request/response JSON
> bodies, see
> [Increment Design Reference: API Specification Example](increment-design-reference.md#api-specification-example).

---

## 5. Testing Strategy for This Increment

### 5.1 Unit Tests

- Key functions to test
- Test cases (happy path, edge cases, errors)
- Coverage targets
- Mock strategy for external dependencies

### 5.2 Integration Tests

- API endpoint tests (request -> response)
- Database integration tests
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
- [ ] Data model changes specified with migrations
- [ ] API specifications complete and follow conventions
- [ ] Testing strategy covers unit, integration, acceptance, performance
- [ ] Implementation notes provide guidance

**Handoff to Implementation:**

- [ ] Engineers understand what to build and how
- [ ] No major unknowns or blockers
- [ ] Ready to proceed to Implementation stage

---

## Notes

**Template Last Updated:** 2026-02-16

Added to framework in v0.12.0.
