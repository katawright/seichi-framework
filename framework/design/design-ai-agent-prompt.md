# Design AI Agent Prompt

**Last Updated:** 2026-02-09

**Purpose:** This prompt helps engineers and architects use AI to draft design documents for the Design stage.

**Target Audience:** Engineers, Solutions Architects, Technical Leads

**Design Type:** [ ] Foundational (Initial Architecture) | [ ] Iterative (Increment Detail)

---

## Instructions for Using This Prompt

1. **Copy the prompt below** to your AI assistant (Claude, ChatGPT, etc.)
2. **Answer the AI's questions** - It will ask about requirements, constraints, and preferences
3. **Review and refine** - AI will generate design options and documentation
4. **Human validates** - Always have experienced engineers review and approve AI-generated designs
5. **Document decision** - Fill out [design-brief-template.md](design-brief-template.md) with final design

**⚠️ Important:** AI provides options and drafts, but **humans make final design decisions** based on team context, skills, and constraints.

---

## Foundational Design Prompt

**Use this for initial architecture design at the start of a project.**

```
You are an experienced solutions architect helping me design the foundational architecture for a software project. I have completed the Requirements stage and need to create:

1. System architecture (components, interactions, deployment)
2. Technology stack selection (languages, frameworks, databases, platforms)
3. Data and API architecture
4. Security and compliance approach
5. Observability and monitoring strategy
6. Performance and scalability design
7. Iteration plan mapping MoSCoW priorities to increments
8. Architecture Decision Records (ADRs) for significant technology choices

I will provide you with:
- Requirements document with functional requirements (FRs) and non-functional requirements (NFRs)
- MoSCoW prioritization (Must/Should/Could/Won't Have)
- Constraints (budget, timeline, team skills, organizational standards)

Please help me by:
- Generating multiple architecture options with trade-off analysis
- Recommending technologies with justification AND cost research
- Creating an iteration plan that sequences delivery based on dependencies, risk, and value
- **Creating separate ADR files** for each significant technology decision
- Identifying potential risks and mitigation strategies
- Suggesting design patterns and best practices

CRITICAL: For each technology choice, you MUST:
1. Research and document costs (one-time, recurring, scaling costs)
2. Compare costs across alternatives
3. Create a separate ADR file (not embedded in design-brief)
4. Use the ADR template format from design-adr-template.md

Output format:
- design-brief.md (references ADRs, doesn't embed them)
- docs/adr/ADR-001-database-selection.md (separate file with full rationale and costs)
- docs/adr/ADR-002-file-upload-mechanism.md (separate file)
- docs/adr/ADR-003-authentication-approach.md (separate file)
- etc.

Let's start. Please ask me questions to understand the project context and requirements.
```

**What the AI will ask:**

1. **Project overview:** What problem are we solving? Who are the users?
2. **Requirements summary:** What are the key functional requirements (Must Haves)?
3. **NFRs:** What are performance, scalability, security requirements?
4. **Constraints:** Budget, timeline, team size, team skills, existing infrastructure
5. **Compliance:** Are there regulatory requirements (GDPR, HIPAA, etc.)?
6. **Scale:** How many users? What's the expected growth?

**What the AI will generate:**

- `design-brief.md` - Architecture overview with ADR references
- `docs/adr/ADR-001-database-selection.md` - Database choice with cost analysis
- `docs/adr/ADR-002-file-upload-mechanism.md` - File handling approach with costs
- `docs/adr/ADR-003-authentication-approach.md` - Auth strategy
- Additional ADRs for each significant technology decision
- Iteration plan with increments, team composition, and effort estimates
- Gate 2 Decision Package with labor and infrastructure costs

**Each ADR will include:**
- Context and problem statement
- 2-3 options considered with cost research
- Decision with rationale
- Cost comparison (one-time, recurring, scaling)
- Consequences and trade-offs

---

## Iterative Design Prompt

**Use this for detailed design of a specific increment.**

```
You are an experienced software engineer helping me create a detailed design for a specific increment in an iterative development project. The foundational architecture is already established.

I need you to help me design:
1. Detailed component specifications for this increment
2. Component interactions (sequence diagrams, data flows)
3. API endpoint specifications (request, response, errors)
4. Data model changes (new tables, columns, indexes, migrations)
5. Testing strategy (unit, integration, acceptance tests)
6. Implementation notes and guidance

I will provide you with:
- Foundational architecture (from foundational design)
- Requirements in scope for this increment (from iteration plan)
- Acceptance criteria for these requirements
- Technology stack and conventions to follow

Please help me by:
- Detailing how components will implement these specific requirements
- Specifying API endpoints with full request/response formats
- Identifying edge cases and error handling scenarios
- Suggesting test cases and testing approaches
- Highlighting potential implementation challenges or gotchas

Let's start. Please ask me questions to understand the increment scope and architecture context.
```

**What the AI will ask:**

1. **Increment scope:** Which requirements are in this increment?
2. **Architecture context:** What's the existing system architecture? What components exist?
3. **Technology stack:** What technologies are we using?
4. **API conventions:** What are the API design standards (REST, versioning, auth)?
5. **Acceptance criteria:** What are the specific ACs for these requirements?
6. **Constraints:** Are there specific limitations or challenges for this increment?

**What the AI will generate:**

- Component design with responsibilities and interactions
- Sequence diagrams for key workflows
- API specifications with full details
- Data model changes and migration scripts
- Test scenarios (unit, integration, acceptance)
- Implementation notes and security considerations

---

## Example Interaction (Foundational Design)

**You:**
```
You are an experienced solutions architect helping me design the foundational architecture for a software project. [full prompt from above]

Project: Community discussion platform (like Reddit)
Key Must Have Requirements:
- FR-1: User registration and authentication
- FR-2: Create discussion posts
- FR-3: Comment on posts
- FR-4: Search posts by keyword
- FR-5: Upvote/downvote posts and comments

Key NFRs:
- NFR-1: API response time p95 <500ms
- NFR-2: Support 10K concurrent users
- NFR-3: 99.9% uptime
- NFR-4: GDPR compliance (data export, deletion)

Constraints:
- Team: 3 full-stack engineers (Node.js, React experience)
- Timeline: 8 weeks to MVP
- Budget: ~$500/month for infrastructure
- No existing infrastructure (greenfield project)
```

**AI:**
```
Great! Let me help you design the architecture. I'll generate a few options.

## Architecture Options

### Option 1: Serverless (AWS Lambda + DynamoDB + S3)

**Pros:**
- Low operational overhead (managed services)
- Auto-scaling (pay per use)
- Fits budget (~$100-300/month at 10K users)

**Cons:**
- Team less familiar with serverless
- DynamoDB learning curve (NoSQL, query patterns)
- Cold start latency (may affect NFR-1)

**Tech Stack:**
- Frontend: React (S3 + CloudFront)
- Backend: AWS Lambda (Node.js) + API Gateway
- Database: DynamoDB
- Auth: Cognito

---

### Option 2: Traditional Server (Node.js + PostgreSQL)

**Pros:**
- Team has Node.js experience
- PostgreSQL great for relational data (users, posts, comments)
- Predictable performance (no cold starts)

**Cons:**
- Requires server management (EC2 or container orchestration)
- Scaling requires more effort (vs. serverless auto-scale)

**Tech Stack:**
- Frontend: React (served from backend or S3)
- Backend: Node.js + Express (EC2 or ECS)
- Database: PostgreSQL (RDS)
- Auth: JWT tokens (custom or Auth0)
- Cache: Redis (ElastiCache)

---

### Option 3: Platform-as-a-Service (Heroku + PostgreSQL)

**Pros:**
- Fastest to deploy (git push to deploy)
- Managed infrastructure (no DevOps needed)
- Team can focus on code

**Cons:**
- Higher cost (~$300-500/month)
- Less control over infrastructure
- Vendor lock-in

**Tech Stack:**
- Frontend: React (served from Heroku or Netlify)
- Backend: Node.js + Express (Heroku)
- Database: PostgreSQL (Heroku Postgres or RDS)
- Auth: Auth0 or Passport.js

---

## My Recommendation: Option 2 (Traditional Server)

**Rationale:**
- Team has Node.js expertise (fast development)
- PostgreSQL excellent fit for relational data (users → posts → comments)
- Meets budget (~$200-400/month for EC2 + RDS)
- Predictable performance (meets NFR-1 response time)
- Scalable to 10K users with caching

**Technology Stack:**
- **Frontend:** React 18, deployed to S3 + CloudFront
- **Backend:** Node.js 20 + Express, deployed to ECS (2-4 containers)
- **Database:** PostgreSQL 15 (RDS), multi-AZ for 99.9% uptime
- **Cache:** Redis 7 (ElastiCache) for session + query caching
- **Auth:** Auth0 (managed) or JWT with bcrypt (custom)
- **Search:** PostgreSQL full-text search (tsvector + GIN index)
- **CI/CD:** GitHub Actions

**Iteration Plan:**

### Increment 1: Foundation (2 weeks)
- FR-1: User registration and authentication
- NFR setup: PostgreSQL + Redis + ECS deployment
- Goal: Users can register and login

### Increment 2: Core Features (2 weeks)
- FR-2: Create posts
- FR-3: Comment on posts
- Goal: Users can create content and interact

### Increment 3: Engagement (2 weeks)
- FR-5: Upvote/downvote
- Caching layer for performance (NFR-1)
- Goal: Users can vote, performance optimized

### Increment 4: Discovery (2 weeks)
- FR-4: Search posts
- GDPR features (NFR-4): data export, deletion
- Goal: Users can find content, GDPR compliant

**Next Steps:**
1. Review this architecture with your team
2. Create ADRs for key decisions (PostgreSQL, Auth0 vs. custom, etc.)
3. I can help you detail Increment 1 components when ready
```

---

## Example Interaction (Iterative Design)

**You:**
```
You are an experienced software engineer helping me create a detailed design for Increment 1.

Foundational Architecture:
- Backend: Node.js + Express (REST API)
- Database: PostgreSQL (Sequelize ORM)
- Auth: JWT tokens with bcrypt password hashing
- API conventions: /api/v1/resource, JSON responses, Bearer token auth

Increment 1 Scope:
- FR-1: User registration (email + password)
  - AC: User can register with valid email and password
  - AC: Email must be unique
  - AC: Password must be hashed (never stored plaintext)
  - AC: Returns user object and JWT token on success
- FR-2: User login
  - AC: User can login with email and password
  - AC: Returns JWT token on success
  - AC: Returns 401 Unauthorized for invalid credentials

Please help me design the components, APIs, and data model for Increment 1.
```

**AI:**
```
Great! Let me help you detail the design for Increment 1 (User Authentication).

## Component Design

### 1. AuthService (Backend)

**Responsibilities:**
- User registration (validation, password hashing, database insert)
- User login (credential verification, JWT generation)
- Token validation (middleware)

**Structure:**
```javascript
// src/services/AuthService.js
class AuthService {
  async register(email, password) {
    // 1. Validate email format
    // 2. Check if email exists (throw EmailExistsError)
    // 3. Hash password with bcrypt (cost factor 10)
    // 4. Insert user into database
    // 5. Generate JWT token (24h expiration)
    // 6. Return {user, token}
  }

  async login(email, password) {
    // 1. Find user by email
    // 2. Compare password with bcrypt
    // 3. If match: generate JWT token, return {user, token}
    // 4. If no match: throw InvalidCredentialsError
  }

  validateToken(token) {
    // Verify JWT signature and expiration
    // Return userId if valid
  }
}
```

**Dependencies:**
- bcrypt (password hashing)
- jsonwebtoken (JWT generation/validation)
- User model (Sequelize)

---

### 2. AuthController (Backend)

**Responsibilities:**
- Handle HTTP requests for /api/v1/auth/* endpoints
- Validate request input
- Call AuthService
- Return HTTP responses

**Structure:**
```javascript
// src/controllers/AuthController.js
class AuthController {
  async register(req, res, next) {
    try {
      const {email, password, name} = req.body;
      const result = await AuthService.register(email, password, name);
      res.status(201).json(result);
    } catch (error) {
      next(error); // Error handling middleware
    }
  }

  async login(req, res, next) {
    try {
      const {email, password} = req.body;
      const result = await AuthService.login(email, password);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}
```

---

### 3. User Model (Backend)

**Responsibilities:**
- Define users table schema
- Provide data access methods

**Schema:**
```javascript
// src/models/User.js
const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    validate: {isEmail: true}
  },
  password_hash: {
    type: DataTypes.STRING,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: true
  },
  role: {
    type: DataTypes.STRING,
    defaultValue: 'user'
  }
}, {
  timestamps: true,
  underscored: true
});
```

---

### 4. RegisterForm Component (Frontend)

**Responsibilities:**
- Collect user input (email, password, name)
- Validate input client-side
- Submit to POST /api/v1/auth/register
- Handle success (store token, redirect) and errors (display message)

**Structure:**
```jsx
// src/components/auth/RegisterForm.jsx
function RegisterForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('/api/v1/auth/register', {email, password});
      localStorage.setItem('token', response.data.token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response.data.error.message);
    } finally {
      setLoading(false);
    }
  };

  return (/* form JSX */);
}
```

---

## API Specifications

### POST /api/v1/auth/register

**Request:**
```json
{
  "email": "user@example.com",
  "password": "SecurePass123!",
  "name": "John Doe"
}
```

**Validation:**
- email: Required, valid email format, not already registered
- password: Required, min 8 characters
- name: Optional, max 255 characters

**Success Response (201 Created):**
```json
{
  "user": {
    "id": 1,
    "email": "user@example.com",
    "name": "John Doe",
    "role": "user",
    "created_at": "2026-02-09T12:00:00Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Error Responses:**

400 Bad Request (validation):
```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input",
    "details": [{"field": "password", "message": "Must be at least 8 characters"}]
  }
}
```

409 Conflict (email exists):
```json
{
  "error": {
    "code": "EMAIL_EXISTS",
    "message": "Email already registered"
  }
}
```

---

### POST /api/v1/auth/login

**Request:**
```json
{
  "email": "user@example.com",
  "password": "SecurePass123!"
}
```

**Success Response (200 OK):**
```json
{
  "user": {
    "id": 1,
    "email": "user@example.com",
    "name": "John Doe",
    "role": "user"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Error Response (401 Unauthorized):**
```json
{
  "error": {
    "code": "INVALID_CREDENTIALS",
    "message": "Invalid email or password"
  }
}
```

---

## Data Model Changes

### Migration: Create users table

**File:** `migrations/20260209000001_create_users.js`

```javascript
exports.up = async (queryInterface, Sequelize) => {
  await queryInterface.createTable('users', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    email: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false
    },
    password_hash: {
      type: Sequelize.STRING,
      allowNull: false
    },
    name: {
      type: Sequelize.STRING,
      allowNull: true
    },
    role: {
      type: Sequelize.STRING,
      defaultValue: 'user'
    },
    created_at: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    },
    updated_at: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    }
  });

  await queryInterface.addIndex('users', ['email'], {unique: true});
};

exports.down = async (queryInterface) => {
  await queryInterface.dropTable('users');
};
```

---

## Testing Strategy

### Unit Tests

**AuthService.register():**
- ✅ Valid input → creates user, returns token
- ✅ Duplicate email → throws EmailExistsError
- ✅ Weak password → throws ValidationError
- ✅ Password is hashed (not plaintext)

**AuthService.login():**
- ✅ Valid credentials → returns user and token
- ✅ Invalid password → throws InvalidCredentialsError
- ✅ Non-existent email → throws InvalidCredentialsError

**Coverage target:** 90% for AuthService

### Integration Tests

**POST /api/v1/auth/register:**
- ✅ Valid data → 201 Created, user in DB, token valid
- ✅ Duplicate email → 409 Conflict
- ✅ Missing email → 400 Bad Request
- ✅ Weak password → 400 Bad Request

**POST /api/v1/auth/login:**
- ✅ Valid credentials → 200 OK, token valid
- ✅ Wrong password → 401 Unauthorized
- ✅ Non-existent email → 401 Unauthorized

### Acceptance Tests (UAT)

**Test Case 1: User Registration**
1. Navigate to /register
2. Enter email: test@example.com
3. Enter password: SecurePass123!
4. Click "Register"
5. **Expected:** Redirected to /dashboard, logged in

**Test Case 2: Login with Invalid Credentials**
1. Navigate to /login
2. Enter email: test@example.com
3. Enter wrong password: WrongPass!
4. Click "Login"
5. **Expected:** Error message "Invalid email or password"

---

## Implementation Notes

### Security
- **Never log passwords** (even in dev) - log email only for debugging
- **Use bcrypt cost factor 10** - balances security and performance
- **JWT expiration: 24 hours** - refresh tokens in future increment
- **SQL injection:** Sequelize parameterizes queries automatically

### Performance
- **Index on users.email** - Critical for login query
- **Connection pooling** - Configure max 20 connections
- **Password hashing is CPU-intensive** - Acceptable for registration/login (not bulk operations)

### Code Patterns
- **Use async/await** - Consistent error handling with try/catch
- **Repository pattern** - Keep data access in services, not controllers
- **Centralized error handling** - Express error middleware for consistent responses

Would you like me to detail any specific component further?
```

---

## Tips for Effective AI-Assisted Design

### 1. Provide Context
Give AI as much relevant information as possible:
- Requirements summary (Must Haves at minimum)
- Constraints (budget, timeline, team skills)
- Existing architecture (for iterative design)
- NFRs (performance, security, scalability)

### 2. Ask for Options
Don't settle for the first suggestion:
- "Show me 3 architecture options with trade-offs"
- "What are alternatives to using JWT for authentication?"

### 3. Iterate and Refine
Use AI to improve designs based on feedback:
- "The team is concerned about complexity - simplify this"
- "We need better error handling - suggest improvements"

### 4. Validate with Humans
Always have experienced engineers review AI-generated designs:
- Security review for authentication and data handling
- Performance review for scalability approach
- Code review for implementation patterns

### 5. Document Decisions
Use ADRs to document why you chose AI-suggested options:
- "AI suggested 3 options, we chose Option 2 because [rationale]"

---

## Related Documents

- [Design Brief Template](design-brief-template.md) - Fill this out with AI-generated designs
- [Design Reference](design-reference.md) - Comprehensive design guidance
- [Design Checklist](design-checklist.md) - Validate design completeness
- [AI Autonomy Scorecard](../../AI_AUTONOMY_SCORECARD.md) - AI autonomy guidance for Design stage

---

## Notes

Added to framework in v0.4.0.
