# Increment Design Reference

Optional deep-dive companion to the
[Increment Design Guide](increment-design-guide.md),
[Increment Design Brief Template](increment-design-brief-template.md), and
[Increment Design Checklist](increment-design-checklist.md). Consult when you
need specifics or a starting point for AI-assisted exploration.

---

## Component Design Example

**Component: Authentication Service (Backend)**

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

---

## API Specification Example

**POST /api/v1/auth/register**

Description: Register a new user account Authentication: None (public endpoint)

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

**POST /api/v1/auth/login**

Description: Authenticate user and receive JWT token Authentication: None
(public endpoint)

Request Body:

```json
{
  "email": "user@example.com",
  "password": "SecurePass123!"
}
```

Success Response (200 OK):

```json
{
  "user": {
    "id": 42,
    "email": "user@example.com",
    "name": "John Doe",
    "role": "user"
  },
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

Error: 401 Unauthorized:
`{error: {code: "INVALID_CREDENTIALS", message: "Invalid email or password"}}`

---

## Testing Strategy Example

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

> **AI exploration:** _"Generate a detailed design for [describe your increment
> scope, requirements, and > system architecture]."_

---

## Checklist Troubleshooting

**Common issues and solutions:**

- **Component designs too vague** -> Add structure details (classes, functions,
  responsibilities)
- **API specs incomplete** -> Detail all endpoints with request/response formats
  and error cases
- **Testing strategy missing** -> Define unit, integration, acceptance test
  approaches
- **Data model changes unclear** -> Include SQL DDL, migration files, and
  rollback strategy
- **Design doesn't follow conventions** -> Review System Design for established
  patterns
- **Major unknowns remain** -> Prototype or spike risky areas before proceeding

> **AI exploration:** _"Help me troubleshoot [describe > the checklist item
> that's failing and your current > design state]."_

---

**Last Updated:** 2026-02-16

_Added to framework in v0.12.0_
