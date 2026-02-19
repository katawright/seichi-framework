# Increment Design Reference

Optional deep-dive companion to the
[Increment Design Guide](increment-design-guide.md),
[Increment Design Brief Template](increment-design-brief-template.md), and
[Increment Design Checklist](increment-design-checklist.md). Consult when you
need specifics or a starting point for AI-assisted exploration.

> The examples below illustrate two different project types. Adapt the level of
> detail and applicable sections to your own technology stack.

---

## Component Design Examples

### Example A: Backend Service (API + Database)

**Component: Authentication Service**

**Responsibilities:**

- User registration (validation, hashing, insert)
- User login (verification, JWT generation)
- Token validation (JWT verification middleware)

**Structure:**

```
src/services/
  AuthService.js
    - register(email, password) -> {user, token}
    - login(email, password) -> {user, token}
    - validateToken(token) -> {userId}

src/middleware/
  authMiddleware.js
    - requireAuth() -> Express middleware
```

**Dependencies:** bcrypt, jsonwebtoken, User model

### Example B: Frontend Component (React Client)

**Component: Team Dashboard**

**Responsibilities:**

- Fetch and display team member list from external API
- Filter and sort team members by role, status
- Handle loading, empty, and error states

**Structure:**

```
src/features/team/
  TeamDashboard.tsx
    - <TeamDashboard teamId={string} />
  TeamMemberList.tsx
    - <TeamMemberList members={Member[]} onSelect={fn} />
  TeamFilters.tsx
    - <TeamFilters value={FilterState} onChange={fn} />
  useTeamMembers.ts
    - useTeamMembers(teamId) -> {data, isLoading, error}
```

**Dependencies:** React, external team API client, UI component library

**State:** Local filter/sort state via useState; server data via React Query
(useTeamMembers hook)

---

## Interface Specification Examples

_Choose the format that matches your project's interface types._

### Example A: REST API Endpoint

**POST /api/v1/auth/register**

Description: Register a new user account

Authentication: None (public endpoint)

Request Body:

```json
{
  "email": "user@example.com",
  "password": "SecurePass123!",
  "name": "John Doe"
}
```

Validation:

- `email`: Required, valid format, unique
- `password`: Required, min 8 chars, letter + number
- `name`: Optional, max 255 chars

Success Response (201 Created):

```json
{
  "user": {
    "id": 42,
    "email": "user@example.com",
    "name": "John Doe",
    "role": "user",
    "created_at": "2026-02-09T12:00:00Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

Error Responses:

- 400 Bad Request:
  `{error: {code: "VALIDATION_ERROR", message: "Invalid input", details: [...]}}`
- 409 Conflict:
  `{error: {code: "EMAIL_EXISTS", message: "Email already registered"}}`
- 500 Internal Server Error:
  `{error: {code: "INTERNAL_ERROR", message: "Registration failed"}}`

### Example B: React Component Contract

**`<TeamMemberList>`**

Description: Renders a filterable list of team members

Props:

- `members: Member[]` — Required. Array of team member objects to display.
- `onSelect: (memberId: string) => void` — Required. Called when a row is
  clicked.
- `isLoading: boolean` — Optional (default: false). Shows skeleton UI when true.

Rendered Output:

- Table with columns: Name, Role, Status
- Empty state message when `members` is empty
- Skeleton rows when `isLoading` is true

Error Cases:

- Empty `members` array -> renders "No team members found" message
- `onSelect` called with invalid ID -> caller responsibility (no internal
  validation)

### Other Interface Types

These formats can be adapted similarly:

- **Event schema:** Event name, payload structure, publisher, expected consumers
- **CLI command:** Command syntax, arguments, flags, stdout/stderr output format
- **Library function:** Signature, parameters, return type, thrown exceptions

---

## Testing Strategy Examples

### Example A: Backend Service Tests

**Unit Tests (AuthService):**

- `register()` valid input -> creates user, returns token
- `register()` duplicate email -> throws EmailExistsError
- `register()` weak password -> throws ValidationError
- `login()` valid credentials -> returns user and token
- `login()` invalid password -> throws error
- `validateToken()` valid token -> returns userId
- `validateToken()` expired token -> throws error

**Integration Tests (API):**

- POST /register valid data -> 201, user in database
- POST /register duplicate email -> 409
- POST /login valid credentials -> 200, valid token
- POST /login wrong password -> 401
- GET /profile without token -> 401
- GET /profile with valid token -> 200, user data

**Acceptance Tests (UAT):**

1. Navigate to /register, enter valid data, click Register -> redirected to
   /dashboard
2. Navigate to /login, enter wrong password, click Login -> error message
   displayed

### Example B: Frontend Component Tests

**Unit Tests (TeamMemberList):**

- Renders all members in table format
- Calls `onSelect` with correct ID when row clicked
- Shows empty state when `members` is empty array
- Shows skeleton UI when `isLoading` is true

**Integration Tests (TeamDashboard):**

- Fetches and displays team members on mount
- Filters update displayed members without refetching
- Shows error state when API call fails
- Shows loading skeleton during API call

**Acceptance Tests (UAT):**

1. Open Team Dashboard -> team members load and display in table
2. Select "Engineering" role filter -> only engineers shown
3. Click a team member row -> navigates to member detail view

> **AI exploration:** _"Generate a detailed design for [describe your >
> increment scope, requirements, and system architecture]."_

---

## Checklist Troubleshooting

**Common issues and solutions:**

- **Component designs too vague** -> Add structure details (classes, functions,
  responsibilities)
- **Interface specs incomplete** -> Detail all interfaces with inputs, outputs,
  and error cases
- **Testing strategy missing** -> Define unit, integration, acceptance test
  approaches
- **Data/state changes unclear** -> Document state management approach; include
  schema definitions and migration strategy if applicable
- **Design doesn't follow conventions** -> Review System Design for established
  patterns
- **Major unknowns remain** -> Prototype or spike risky areas before proceeding

> **AI exploration:** _"Help me troubleshoot [describe the checklist > item
> that's failing and your current design state]."_

---

**Last Updated:** 2026-02-18

_Added to framework in v0.12.0_
