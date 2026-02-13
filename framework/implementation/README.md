# AI-Assisted SDLC: Implementation Stage Artifacts

**Framework Version:** 0.7.0
**Last Updated:** 2026-02-12

**Stage:** 4 of 7 (Implementation)
**Primary Audience:** Engineers
**Supporting Roles:** Architects, DevOps, QA Engineers
**Execution Pattern:** Iterative (per increment)

## Overview

The Implementation stage is where designs become working code. Engineers
write, test, and review code following professional standards and best
practices. This stage executes iteratively—once per increment—delivering
working software that meets the detailed design specifications.

This is the stage where engineering craftsmanship matters most: clean
code, comprehensive tests, thoughtful reviews, and maintainable solutions.

## Purpose

Transform detailed designs into production-ready code that:
- Implements requirements correctly and completely
- Meets code quality and maintainability standards
- Includes comprehensive unit test coverage
- Is reviewed and approved by peers
- Includes necessary instrumentation for observability
- Is well-documented for future maintainers

## Artifacts

### 1. Implementation Brief Template (`implementation-brief-template.md`)

A template for documenting implementation work for each increment.

**Sections:**
- Increment overview and requirements mapping
- Implementation approach and key decisions
- Code structure and organization
- Unit testing strategy
- Instrumentation and logging
- Code review notes
- Known limitations or technical debt
- Handoff notes to Verification stage

### 2. Implementation Checklist (`implementation-checklist.md`)

Quick validation (60-90 seconds) that ensures code is ready for the
Verification stage.

**Checklist items:**
- All requirements implemented for increment
- Unit tests written and passing
- Code review completed and approved
- Code quality standards met (linting, formatting)
- Documentation updated
- No known critical defects
- Instrumentation implemented
- Ready for integration testing

### 3. Implementation Reference (`implementation-reference.md`)

Comprehensive guidance on implementation practices, standards, and
techniques.

**Covers:**
- What implementation means in this framework
- Code quality principles (SOLID, DRY, KISS, YAGNI)
- Unit testing best practices and coverage expectations
- Code review guidelines and process
- Documentation standards
- Instrumentation and observability implementation
- Common implementation anti-patterns
- Refactoring techniques
- When to revisit implementation decisions
- Handling technical debt

### 4. Implementation AI Agent Prompt (`implementation-ai-agent-prompt.md`)

An AI assistant prompt tailored for engineers to help with code
generation and implementation tasks.

**Helps with:**
- Generating boilerplate code from designs
- Writing unit tests
- Implementing common patterns
- Documenting code
- Identifying edge cases
- Suggesting refactoring improvements
- Implementing instrumentation

**⚠️ Important:** AI-generated code MUST be reviewed by engineers. AI can
accelerate coding but cannot replace human judgment on correctness,
security, and maintainability.

### 5. Implementation Decision Records (`adr/ADR-XXX-*.md`) - Optional

Architecture Decision Records (ADRs) document significant implementation
decisions with trade-offs and rationale.

**When to create:**
- Use the "reasonable engineer test" - if someone might ask "why this
  instead of alternatives?", create an ADR
- Multiple viable approaches were considered
- Decision has non-obvious consequences

**Template:**
- Use framework's ADR template: `../../adr-template.md`
- Store in `implementation/adr/` directory
- Reference from implementation brief

**Examples:**
- Choice of algorithm or data structure with trade-offs
- Caching strategy decisions
- Pattern selection (Builder, Factory, Strategy, etc.)
- Retry/resilience strategy
- Performance optimization approaches

**Note:** Minor, obvious, or standard practice decisions can be documented
inline in the implementation brief instead.

### 6. This README

Explains all Implementation artifacts, the iterative execution pattern,
and how to use them effectively.

---

## Execution Pattern: Iterative (Per Increment)

### When

After the detailed design for an increment is complete and approved.

### Goal

Deliver working, tested code that implements the current increment's
requirements.

### Key Activities

1. **Set up development environment** - Ensure tools, dependencies, and
   access are ready
2. **Write code** - Implement features following design specifications
3. **Create unit tests** - Test individual components and functions
4. **Implement instrumentation** - Add logging, metrics, and telemetry
5. **Perform code review** - Peer review for quality and correctness
6. **Refactor as needed** - Improve code quality and maintainability
7. **Document code** - Add comments, API docs, and implementation notes
8. **Verify locally** - Ensure unit tests pass and code works as
   expected

### Outputs

- **Working code** committed to version control
- **Unit tests** with passing results and adequate coverage
- **Code review approval** from peers
- **Implementation brief** documenting approach and decisions
- **Updated documentation** (API docs, README updates, code comments)
- **Instrumentation** for observability and measurement

### Checkpoint: Quality Checkpoint (Mandatory)

- **When:** Before marking increment as complete and handing to
  Verification
- **Who:** Peer engineers, tech lead, or senior developer
- **Purpose:** Ensure code meets quality standards and is ready for
  integration testing
- **Criteria:**
  - Code review approved
  - Unit tests pass with adequate coverage
  - Linting and formatting pass
  - No critical issues identified
  - Documentation complete
- **Outcome:** Ready / Not Ready (with issues to resolve)
- **AI Validation:** Human review ensures AI-generated code is correct,
  secure, and maintainable

---

## Workflow

### AI-Assisted Implementation Workflow

The implementation workflow leverages AI assistance at each step while
maintaining human oversight through quality gates. For increments with
multiple PRs, steps 3-11 repeat for each PR.

**Legend:**
- 🤖 AI can assist
- 👤 Human review/approval required
- ✋ Quality gate (mandatory human approval)

```
Prerequisites:
✅ Detailed design complete for increment
✅ Requirements and acceptance criteria clear
✅ Development environment set up
✅ Architecture and API specs available
✅ Team conventions documented (AGENTS.md or similar)

┌─ ONCE PER INCREMENT ───────────────────────────────────────────
│
│ 1. 🤖 Review design-brief for current increment
│    👤 Confirm understanding with AI, clarify questions
│
│ 2. 🤖 Verify development environment ready
│    👤 Execute any setup commands, verify tools available
│
└─────────────────────────────────────────────────────────────────
   ↓
┌─ FOR EACH PR (single or multiple per increment) ───────────────
│
│ 3. 🤖 Set up feature branch per branching strategy
│    AI: Suggest branch name, PR breakdown if needed
│    👤 Approve strategy (single/multiple PRs for increment)
│
│ 4. 🤖 Write code for this PR's scope
│    AI: Generate code using implementation-ai-agent-prompt.md
│    👤 Review generated code for correctness and security
│    ✋ GATE
│
│ 5. 🤖 Write unit tests (happy path, edge cases, errors)
│    AI: Generate comprehensive test suite with high coverage
│    👤 Verify tests are meaningful, not padding ✋ GATE
│
│ 6. 🤖 Implement instrumentation (logging, metrics, telemetry)
│    AI: Add observability code aligned with success criteria
│    👤 Verify measurement completeness ✋ GATE
│
│ 7. 🤖 Document code (comments, API docs, README updates)
│    AI: Generate docstrings, comments, documentation
│    👤 Review for accuracy and clarity ✋ GATE
│
│ 8. 🤖 Run tests locally and ensure they pass
│    AI: Execute tests, interpret results, suggest fixes
│    👤 Verify all tests pass, validate quality
│
│ 9. 🤖 Update implementation-brief-template.md
│    AI: Update Progress Log, PR tracking table
│    👤 Review progress documentation
│
│ 10. 🤖 Submit this PR for peer review
│     AI: Create PR with description, testing notes, changes
│     👤 Approve PR submission ✋ GATE
│
│ 11. 🤖 Address code review feedback
│     AI: Make requested changes, respond to questions
│     👤 Guide priorities, approve changes
│
│ 12. 👤 Get code review approval and merge this PR ✋ GATE
│     Human peer reviewer validates and approves merge
│     ↓
│  ◄──┘ More PRs needed for increment? Return to step 3
│
└─────────────────────────────────────────────────────────────────
   ↓
   All PRs for increment merged to target branch
   ↓
┌─ ONCE PER INCREMENT (after all PRs merged) ────────────────────
│
│ 13. 🤖 Run through implementation-checklist.md
│     AI: Check all items, flag any issues
│     👤 Verify readiness and sign-off ✋ GATE
│
│ 14. 🤖 Finalize implementation brief
│     AI: Complete final sections, verify all PRs documented
│     👤 Review and finalize brief
│
│ 15. 🤖 Prepare handoff to Verification stage
│     AI: Document test scenarios, environment setup, issues
│     👤 Approve handoff (merge increment branch if used)
│     ✋ FINAL GATE
│
└─────────────────────────────────────────────────────────────────
   ↓
16. Proceed to Verification stage
```

**Key Principles:**
- **AI assists throughout** - Accelerates all steps from setup to handoff
- **Humans maintain ownership** - Review gates ensure quality and security
- **Steps 3-12 loop for each PR** - Repeat when increment needs multiple
  PRs
- **Single PR increments** - Execute steps 3-12 once
- **All PRs must merge** - Before final checklist and Verification
  handoff

---

## Relationship to Other Stages

### Inputs from Design Stage

**From foundational design:**
- System architecture and component boundaries
- Technology stack and development standards
- Data architecture and API principles
- Coding standards and conventions

**From iterative design:**
- Detailed component designs for current increment
- API specifications and data models
- Test strategy for increment
- Implementation guidance and notes

### Inputs from Requirements Stage

- Requirements with acceptance criteria
- Success criteria requiring instrumentation
- Non-functional requirements (performance, security)

### Outputs to Verification Stage

- Working code on feature branch or test environment
- Unit test results and coverage reports
- Code review approval records
- Implementation brief with notes
- Known issues or limitations
- Instrumentation implemented

### Feedback Loops

**Implementation → Design:**
- Design is unimplementable → Revisit iterative design
- Edge cases not covered in design → Update design
- Performance concerns during implementation → Revisit architecture

**Implementation → Requirements:**
- Requirements are ambiguous or contradictory → Clarify in Requirements
- Acceptance criteria not testable → Refine in Requirements

**Verification → Implementation:**
- Integration tests fail → Fix code
- Performance tests fail → Optimize or revisit design
- Security vulnerabilities found → Fix and re-review

---

## AI Assistance Guidance

### AI Autonomy Level: Medium-High (with Mandatory Review)

From the [AI Autonomy Scorecard](../../AI_AUTONOMY_SCORECARD.md):

- **Fit:** Very High - AI excels at code generation, boilerplate,
  patterns, and unit tests
- **Verifiability:** High - Code can be tested, reviewed, and executed
  to verify correctness
- **Risk:** Medium - Bugs can reach production but are caught in
  Verification if thorough
- **Recommended Autonomy:** AI generates code, human reviews and
  approves before merge

### Where AI Helps

**Code Generation:**
- Generate boilerplate code from design specifications
- Implement standard patterns (CRUD, authentication, validation)
- Create data models and database schemas
- Generate API endpoint implementations
- Convert pseudocode or design specs to working code

**Unit Testing:**
- Generate unit test scaffolding
- Create test cases from acceptance criteria
- Implement edge case tests
- Generate mock objects and test fixtures

**Documentation:**
- Generate code comments and docstrings
- Create API documentation from code
- Write README sections for new components

**Refactoring:**
- Suggest code improvements
- Identify duplicate code to extract
- Recommend design pattern applications

### Where Human Expertise is Critical

- **Code review and approval** - Engineers must validate AI-generated
  code
- **Security review** - Check for vulnerabilities AI may have
  introduced
- **Business logic correctness** - Verify code implements requirements
  correctly
- **Error handling** - Ensure edge cases and failures are handled
  properly
- **Performance optimization** - Validate code meets performance
  requirements
- **Architectural consistency** - Ensure code follows established
  patterns
- **Test quality** - Verify tests are meaningful, not just coverage
  padding
- **Final merge decision** - Human owns the decision to merge code

### Best Practices

1. **AI generates, human validates** - Never merge AI code without
   review
2. **Test AI-generated code thoroughly** - Verify it works as expected
3. **Review for security** - Check for SQL injection, XSS, auth bypass,
   etc.
4. **Check for maintainability** - Ensure code is readable and
   well-structured
5. **Validate test quality** - AI tests should be meaningful, not
   superficial
6. **Iterative refinement** - Use AI to refactor based on review
   feedback
7. **Document AI usage** - Note in code review when AI was used
   significantly

---

## Checkpoints and Gates

### Quality Checkpoint (Mandatory)

**When:** Before completing implementation and handing to Verification

**Who:**
- Peer engineers (code review)
- Tech lead or senior developer (approval)

**Purpose:** Ensure code is correct, secure, maintainable, and ready for
integration testing

**Criteria:**
- ✅ Code review approved by peer(s)
- ✅ Unit tests pass with adequate coverage (typically 70-90%)
- ✅ Linting and formatting standards met
- ✅ No critical or high-priority issues identified
- ✅ Security considerations addressed
- ✅ Documentation complete and accurate
- ✅ Instrumentation implemented
- ✅ Code follows architectural patterns

**Outcome:** Ready / Not Ready (with specific issues to resolve)

**AI Validation:** Human review ensures:
- AI-generated code is correct and implements requirements
- No security vulnerabilities introduced
- Code is maintainable and follows standards
- Tests provide meaningful coverage
- Documentation is accurate

### Deployment Approval to Staging (Optional)

**When:** After Quality Checkpoint, before Verification stage

**Who:** Tech lead, DevOps

**Purpose:** Authorize deployment to staging/test environment for
integration testing

**Criteria:**
- ✅ Quality Checkpoint passed
- ✅ Staging environment ready
- ✅ Deployment plan reviewed

**Outcome:** Deploy / Hold

---

## When to Revisit Implementation

### Common Scenarios

1. **Verification tests fail** - Integration or UAT tests reveal bugs →
   Fix code
2. **Performance issues** - Code doesn't meet NFRs → Optimize or
   revisit design
3. **Security vulnerabilities found** - Security scan or review finds
   issues → Fix and re-review
4. **Code review feedback** - Significant issues require rework →
   Refactor and resubmit
5. **Requirements clarified** - Acceptance criteria become clearer →
   Adjust implementation
6. **Design changed** - Design updated during implementation → Adjust
   code accordingly
7. **Technical debt identified** - Code works but needs refactoring →
   Plan refactor or document debt

### Revision Process

1. **Identify issue** - What needs to change and why?
2. **Assess impact** - How much rework is required?
3. **Update code** - Make necessary changes
4. **Update tests** - Ensure tests cover new scenarios
5. **Re-review** - Submit for code review if significant changes
6. **Verify** - Ensure unit tests pass
7. **Update documentation** - Keep implementation brief current

---

## Code Quality Standards

### General Principles

**SOLID Principles:**
- **S**ingle Responsibility - Classes/functions do one thing well
- **O**pen/Closed - Open for extension, closed for modification
- **L**iskov Substitution - Subtypes are substitutable for base types
- **I**nterface Segregation - Many specific interfaces better than one
  general
- **D**ependency Inversion - Depend on abstractions, not concretions

**Other Key Principles:**
- **DRY** (Don't Repeat Yourself) - Eliminate duplication
- **KISS** (Keep It Simple, Stupid) - Simplicity over cleverness
- **YAGNI** (You Aren't Gonna Need It) - Don't build for hypothetical
  futures

### Code Review Focus Areas

1. **Correctness** - Does it implement requirements correctly?
2. **Security** - Are there vulnerabilities (injection, auth bypass,
   XSS)?
3. **Performance** - Are there obvious inefficiencies?
4. **Maintainability** - Is it readable and well-structured?
5. **Testability** - Can it be easily tested?
6. **Error handling** - Are edge cases and failures handled?
7. **Documentation** - Is complex logic explained?
8. **Standards compliance** - Does it follow team conventions?

---

## Measurement Throughline

The Implementation stage builds the instrumentation designed in the
Design stage.

**From Initiation:**
- Objectives with measurable success criteria defined

**From Requirements:**
- NFRs specify what needs to be measured
- Acceptance criteria ladder up to success criteria

**From Design:**
- Analytics infrastructure designed
- Monitoring and alerting system designed
- Instrumentation specifications created

**In Implementation:**
- Implement logging, metrics collection, and telemetry
- Build instrumentation for success criteria
- Implement dashboards and monitoring systems
- Add feature flags or A/B testing framework (if designed)

**To Verification:**
- Test that measurement systems work correctly
- Validate instrumentation captures required data

**Example:**
- **Initiation:** Reduce customer support tickets by 30% within 6
  months
- **Requirements:** NFR-5: System must log all user errors with context
- **Design:** Design error tracking system with categorization, trending
  dashboard
- **Implementation:** Implement error logging, build dashboard, add
  alerting
- **Verification:** Test error logging captures all scenarios
- **Support:** Monitor error rates and validate 30% reduction

---

## Technical Debt Management

### What is Technical Debt?

Technical debt is the implied cost of rework caused by choosing a quick
or limited solution now instead of a better approach that would take
longer.

**Types of Technical Debt:**
- **Deliberate** - Conscious choice to go fast now, pay later
- **Accidental** - Didn't know better at the time
- **Environmental** - Dependencies, frameworks, or platforms evolve
- **Bit rot** - Code degrades over time without maintenance

### When to Incur Debt

**Good reasons:**
- Time-to-market pressure (MVP, experiment, deadline)
- Uncertainty (unclear requirements, prototype needed)
- Learning (first time using technology)
- Risk mitigation (test idea before full build)

**Bad reasons:**
- Laziness or cutting corners
- Ignoring standards or best practices
- Not testing adequately
- Skipping code review

### Managing Technical Debt

1. **Document it** - Add TODO/FIXME comments, track in backlog
2. **Assess impact** - High-impact debt gets prioritized
3. **Plan paydown** - Schedule refactoring in future increments
4. **Prevent accumulation** - Don't let debt compound indefinitely
5. **Communicate** - Stakeholders understand trade-offs

---

## Common Implementation Anti-Patterns

### Anti-Pattern 1: God Object

**Problem:** One class/module does everything
**Solution:** Break into smaller, focused components

### Anti-Pattern 2: Copy-Paste Programming

**Problem:** Duplicating code instead of abstracting
**Solution:** Extract shared logic into reusable functions/modules

### Anti-Pattern 3: Magic Numbers/Strings

**Problem:** Hard-coded values without explanation
**Solution:** Use named constants or configuration

### Anti-Pattern 4: Premature Optimization

**Problem:** Optimizing before knowing where bottlenecks are
**Solution:** Write clear code first, optimize based on profiling

### Anti-Pattern 5: No Error Handling

**Problem:** Not handling failures or edge cases
**Solution:** Implement proper error handling and logging

### Anti-Pattern 6: Test Padding

**Problem:** Writing meaningless tests just for coverage
**Solution:** Write tests that verify behavior, not just lines

### Anti-Pattern 7: Skipping Code Review

**Problem:** Merging code without peer review
**Solution:** Always require review, even for "small" changes

---

## Enterprise Extensions

### Advanced Code Review Practices

Large organizations may add:
- **Architecture review** - For changes affecting system design
- **Security review** - Mandatory for security-critical code
- **Performance review** - For high-throughput or latency-sensitive
  code
- **Accessibility review** - For UI/UX changes

### Automated Quality Gates

- **Static analysis** - Automated code quality checks (SonarQube,
  CodeClimate)
- **Security scanning** - Automated vulnerability detection (Snyk,
  Checkmarx)
- **Coverage enforcement** - Fail build if coverage drops below
  threshold
- **Dependency checks** - Scan for vulnerable dependencies

---

## Quick Reference

**Execution Pattern:**
- Iterative (per increment)

**Key Activities:**
- Write code following design
- Create unit tests
- Perform code review
- Implement instrumentation
- Document code

**Key Output:**
- Working code with tests and approvals

**Primary Role:**
- Engineers

**AI Autonomy:**
- Medium-High - AI generates, human reviews and approves

**Mandatory Checkpoint:**
- Quality Checkpoint (code review + tests + standards)

---

## Additional Resources

- **[STAGES.md](../../STAGES.md)** - Authoritative stage definitions
- **[AI Autonomy Scorecard](../../AI_AUTONOMY_SCORECARD.md)** - AI
  autonomy guidance per stage
- **[PROJECT_CONTEXT.md](../../PROJECT_CONTEXT.md)** - Framework design
  principles and philosophy
- **Previous Stage:** [Design](../design/README.md)
- **Next Stage:** Verification _(coming soon)_
