# AI-Assisted SDLC - Project Context

## Project Overview

**Name:** AI-Assisted SDLC  
**Tagline:** A practical framework for integrating AI assistance into software development

## Purpose and Vision

This project develops a lightweight, practical framework that guides both technical and non-technical stakeholders through using AI assistance across all stages of the Software Development Life Cycle (SDLC). The framework aims to:

- Demonstrate AI's fitness for use at each SDLC stage
- Provide standardized documentation templates for each stage, tailored to role
- Make AI adoption less threatening to engineers who may view it as a replacement rather than a tool
- Democratize project initiation by enabling non-technical stakeholders (Product Managers, Marketing, Executives) to start projects with proper structure
- Improve cross-functional communication and handoffs between roles
- Maintain professional engineering standards while leveraging AI capabilities
- Keep the process lightweight and easy to follow

## Target Audience

**Primary audience:** Engineers at the project creator's company who may be:
- Skeptical about AI tools
- Concerned about AI as a threat to their roles
- Unfamiliar with AI's strengths and weaknesses
- Not actively engaged in learning AI capabilities

**Secondary audience:** Non-technical stakeholders (Product Managers, Business Analysts, Marketing, Executives) who need to initiate and plan software projects but lack technical expertise

**Tertiary audience:** Other organizations seeking structured AI integration across their entire product development lifecycle

## Design Principles

1. **AI as Assistant, Not Replacement** - Frame AI as a productivity tool that humans control
2. **Practical Over Theoretical** - Focus on actionable, real-world applicability
3. **Lightweight Process** - Avoid bureaucratic overhead; keep it simple
4. **Professional Standards** - Humans evaluate and validate all AI output
5. **Non-Threatening Language** - Use "assisted" terminology rather than "augmented" or "autonomous"
6. **Cross-Functional Accessibility** - Framework usable by both technical and non-technical stakeholders
7. **Role-Appropriate Guidance** - Each stage tailored to the primary role responsible for it

## Prior Work

The project creator has already:
- Established a list of standard SDLC stages
- Generated a document assessing AI fitness for each stage
- Started developing standardized artifacts for Initiation and Analysis stages with ChatGPT
- Created initial templates including:
  - `{stage-name}-brief.md` - one-page brief
  - `{stage-name}-checklist.md` - verification checklist
  - `{stage-name}-reference.md` - in-depth explanation of stage, acronyms, terms
  - `{stage-name}-ai-agent-prompt.md` - prompt for AI to elicit information for the brief
  - `README.md` - description of artifacts and workflow

## Current State

The project is transitioning from exploratory work (with ChatGPT) to structured development:
- Moving to version-controlled project structure
- Switching primary AI tool to Claude Code
- Separating reference materials from working project
- Need to review and refine existing artifacts
- Need to extend framework to remaining SDLC stages

## SDLC Stages (Expected)

While the complete list should be verified from prior work, typical stages include:
1. **Initiation** (Primary: Product Manager/Business Analyst; Supporting: Executives, Solutions Architect)
2. **Analysis/Requirements** (Primary: Business Analyst/Product Manager; Supporting: Engineers, Architects)
3. **High-Level Design** (Primary: Solutions Architect/Senior Engineers; Supporting: Product Manager)
4. **Low-Level Design** (Primary: Engineers; Supporting: Architects)
5. **Implementation** (Primary: Engineers)
6. **Testing** (Primary: QA Engineers/Engineers; Supporting: Product Manager)
7. **Deployment** (Primary: DevOps/Engineers; Supporting: Operations)
8. **Maintenance** (Primary: Engineers; Supporting: DevOps, Support)

**Note:** Role ownership should be clearly indicated in each stage's artifacts to:
- Set expectations for who drives each stage
- Clarify cross-functional involvement
- Enable non-technical stakeholders to participate appropriately
- Improve handoffs between stages

## SDLC Stage Execution Model

The framework recognizes that software development is not a strict linear waterfall process. Stages have different execution patterns and can be revisited as the project evolves.

### Terminology: Increments

The framework uses the term **"increment"** to describe discrete, deliverable chunks of work. Depending on your team's methodology, you might call this an epic, feature, sprint deliverable, or release increment.

**Common terminology mapping:**
- **Agile/Scrum teams:** Epic, Feature, or Sprint deliverable
- **SAFe teams:** Feature or Capability  
- **Kanban teams:** Work Item or Deliverable
- **Traditional PM:** Milestone deliverable or Work Package
- **Lean/XP teams:** Story collection or Release increment

Increments can deliver:
- **User-facing features** (e.g., user authentication, search functionality)
- **Foundational capabilities** (e.g., database schema, API framework setup)
- **Infrastructure improvements** (e.g., CI/CD pipeline, monitoring system)
- **Technical debt reduction** (e.g., refactoring, performance optimization)

The framework uses "increment" to remain methodology-agnostic while supporting all approaches.

### Stage Execution Patterns

**Foundational Stages** (Execute once per project, can be revisited when needed):
- **Initiation** - Establishes project vision, business case, and goals
- **Analysis/Requirements** - Defines what the system should do
- **High-Level Design** - Establishes overall system architecture and approach

These stages set the project foundation but are **not frozen**. They can and should be revisited when significant new information emerges.

**Iterative Stages** (Execute repeatedly per increment):
- **Low-Level Design** - Detailed design for specific increment
- **Implementation** - Build the increment
- **Testing** - Verify the increment works
- **Deployment** - Release the increment to production

These stages repeat for each deliverable increment, enabling continuous value delivery.

**Continuous Stages** (Ongoing after first production deployment):
- **Maintenance** - Monitor, support, fix, and enhance the system

### Revisit Triggers

Stages may need to be revisited when:

**For Foundational Stages (Initiation, Analysis, HLD):**
- Implementation reveals unanticipated technical constraints or impossibilities
- User feedback from deployed increments shows requirements miss the mark
- Business context or priorities shift significantly
- Regulatory, compliance, or security requirements change
- Technical discoveries reveal fundamentally better approaches
- Market conditions change during development
- Stakeholder understanding evolves through iterative delivery

**For Iterative Stages (LLD, Implementation, Testing, Deployment):**
- Testing reveals design flaws requiring LLD revision
- Code review identifies better implementation approaches
- Performance issues require architectural changes
- Security vulnerabilities discovered during testing

### Feedback Loops and Revision Approach

When revisiting a stage:

1. **Document the trigger** - What new information emerged? Why revisit now?
2. **Assess impact scope** - Which stages/features are affected?
3. **Version the artifacts** - Keep history of what changed and why
4. **Execute revision** - Full re-execution or incremental update depending on scope
5. **Communicate changes** - Notify all affected stakeholders and teams
6. **Update downstream artifacts** - Ensure consistency across stages

### Practical Example: 2-Month Project

**Month 1, Week 1:**
- Complete Initiation (foundational)
- Complete Analysis/Requirements (foundational)
- Complete High-Level Design (foundational)
- Plan increments based on HLD

**Month 1, Weeks 2-4:**
- Increment 1 (User Authentication): LLD → Implementation → Testing → Deployment
- Increment 2 (Database Schema): LLD → Implementation → Testing → Deployment

**Month 2, Week 1:**
- User feedback on Increment 1 reveals requirements gap
- **Revisit Analysis** - Update requirements document
- **Assess impact** - Affects Increment 3 design
- Continue Increment 3 with updated understanding

**Month 2, Weeks 2-4:**
- Increment 3 (User Profile): LLD → Implementation → Testing → Deployment (incorporating learning)
- Increment 4 (Search Feature): LLD → Implementation → Testing → Deployment
- **Maintenance begins** - Supporting Increments 1-2 in production

### Framework Flexibility

This execution model ensures the framework is:
- **Practical** - Reflects how real teams work
- **Adaptive** - Accommodates learning and change
- **Efficient** - Enables continuous delivery of value
- **Realistic** - Not rigid waterfall, not unstructured chaos
- **Scalable** - Works for small increments and large projects
- **Methodology-agnostic** - Teams use their own terminology (epic, feature, sprint, etc.)

Each stage's artifacts will include:
- **Execution Frequency** - Foundational / Iterative / Continuous
- **Typical Triggers for Revisit** - When to loop back
- **Revision Guidance** - How to handle updates
- **Downstream Impact** - What else needs updating when this changes

## Artifact Structure Template

For each SDLC stage, create:

### Stage Brief (`{stage}-brief.md`)
- One-page document
- Captures essential information for the stage
- Structured, fillable template
- **Role metadata:** Primary role, supporting roles, cross-functional involvement
- **Execution metadata:** Foundational / Iterative / Continuous, typical revisit triggers

### Stage Checklist (`{stage}-checklist.md`)
- Verification that brief is complete
- Ensures nothing critical is missed
- Quality gate before proceeding
- Role-specific validation items
- Includes "ready to proceed" vs. "needs revision" criteria

### Stage Reference (`{stage}-reference.md`)
- Detailed explanation of the stage
- Definitions of terms and acronyms (accessible to non-technical readers when appropriate)
- Best practices and guidance
- Role responsibilities and expectations
- **When and how to revisit this stage** - triggers and revision process
- **Downstream impact** - what changes when this stage is updated
- More comprehensive than the brief

### AI Agent Prompt (`{stage}-ai-agent-prompt.md`)
- Prompt for AI to elicit information needed
- References brief, checklist, and reference documents
- Guides conversation to fill out the brief
- **Language and questions tailored to primary role** (business vs. technical terminology)
- Should be usable by stakeholders with AI tools, regardless of technical background

### Stage README (`README.md`)
- Describes all artifacts
- Explains workflow
- Shows how artifacts relate
- Clarifies handoffs to next stage

## Project Phases

### Phase 1: Framework Development (Current)
**Goal:** Create complete, standardized documentation for all SDLC stages  
**Tool:** Claude Code with Sonnet 4.5  
**Deliverables:**
- Refined and standardized artifact templates
- Complete documentation for all SDLC stages
- Consistency across all stages
- Usage guidelines and examples

### Phase 2: Framework Validation
**Goal:** Review and refine framework for completeness and usability  
**Tool:** Claude Code with Sonnet 4.5, potentially Opus 4.5 for complex decisions  
**Deliverables:**
- Validated framework
- Example workflows
- User testing feedback incorporated

### Phase 3: Application Development
**Goal:** Build tool that facilitates use of the AI-Assisted SDLC framework  
**Tool:** Claude Code with Sonnet 4.5 for implementation, Opus 4.5 for architecture  
**Approach:** Follow the AI-Assisted SDLC process itself (dogfooding)  
**Deliverables:**
- Application design
- Working tool (CLI, web app, or other appropriate format)
- Documentation for the tool

## Success Criteria

The framework succeeds if:
1. Engineers can follow it without extensive training
2. Non-technical stakeholders can use early stages (Initiation, Analysis) to properly scope projects
3. AI assistance adds measurable value at each stage
4. Professional standards are maintained or improved
5. Engineers view AI as helpful rather than threatening
6. Cross-functional handoffs are clearer and more efficient
7. The framework is lightweight enough to avoid becoming bureaucratic overhead
8. The framework can be followed manually before tooling exists
9. Business stakeholders feel empowered to initiate projects independently
10. Reduced back-and-forth between business and engineering teams

## Framework Effectiveness and Measurement

The AI-Assisted SDLC framework's value should be measurable, but measurement approaches must match organizational capabilities.

### Measurement Philosophy

Organizations vary widely in their measurement maturity:
- Some have sophisticated engineering metrics (DORA metrics, code quality dashboards)
- Others have only basic project tracking (start/end dates, team size)
- Many have no systematic productivity measurement at all

The framework should **support measurement without requiring it**, and should work for organizations at any measurement maturity level.

### Types of Measurement

**Objective metrics** quantify improvements:
- Time metrics (project duration, time per stage, clarification cycles)
- Quality metrics (defects, rework incidents, completeness)
- Adoption metrics (framework usage rate, AI assistance usage)

**Subjective metrics** capture stakeholder experience:
- Satisfaction with stage deliverables
- Confidence in proceeding to next stage
- Perceived value of AI assistance
- Cross-functional collaboration quality

Organizations should select metrics appropriate to their context and capabilities.

### Implications for Application Design

When the application tool is built (Phase 3), it should:
- **Facilitate optional feedback collection** without making it burdensome
- **Track basic usage patterns** (which stages used, AI assistance adoption)
- **Enable simple satisfaction surveys** at stage completion
- **Export data** for teams that want to analyze effectiveness
- **Not require measurement** - teams can use framework without tracking metrics

The application becomes both a productivity tool AND a measurement instrument for organizations that want insights into framework effectiveness.

### Continuous Improvement

Measurement enables framework refinement:
- Identify stages that consistently cause confusion or delays
- Understand which AI prompts are most/least helpful
- Detect patterns in cross-functional handoff issues
- Validate that framework achieves design goals

Framework updates should be driven by evidence from actual usage, not just theoretical improvements.

## Notes for Claude Code

- Existing work from ChatGPT is reference material only - review and improve, don't just copy
- Maintain consistency across all stage artifacts
- Keep language professional but approachable
- **Adjust language/terminology based on primary role for each stage** (business language for PM stages, technical for engineering stages)
- Avoid jargon that might alienate skeptical engineers OR non-technical stakeholders
- Focus on practical utility over theoretical completeness
- The framework should work with any AI tool, not just Claude
- Templates should guide without constraining
- Consider real-world engineering and business constraints and workflows
- **Each stage should clearly indicate role ownership and cross-functional touchpoints**
- **AI prompts must be tailored to the expertise level of the primary role**
- Consider how stages hand off between different roles/departments

**Version Control Standards:**
- Use **Semantic Versioning** (semver) for all releases: MAJOR.MINOR.PATCH
  - MAJOR: Breaking changes to framework structure or application API
  - MINOR: New stages, new artifacts, backward-compatible features
  - PATCH: Documentation fixes, typo corrections, clarifications
- Framework and application share version numbers (e.g., Framework v1.2.0 = Application v1.2.0)
- Use **Conventional Commits** for all commit messages:
  - Format: `type(scope): description`
  - Types: `feat`, `fix`, `docs`, `refactor`, `test`, `chore`, `style`
  - Scopes: stage names (initiation, analysis, hld, lld, implementation, testing, deployment, maintenance), framework, application, ci
  - Examples:
    - `feat(initiation): add risk assessment section to brief template`
    - `fix(analysis): correct checklist validation logic`
    - `docs(framework): update execution model examples`
    - `refactor(application): extract stage loader into separate module`
  - Breaking changes: Add `BREAKING CHANGE:` in commit body or use `!` after type/scope
  - Example: `feat(framework)!: restructure stage artifact naming convention`
- Tag releases with version number: `git tag v1.0.0`
- Generate changelog from conventional commits

## Questions to Address

When reviewing reference materials and building the framework:
1. Are the SDLC stages comprehensive and appropriately scoped?
2. Is the artifact structure consistent and complete?
3. Are there missing artifacts that would add value?
4. Do the AI agent prompts effectively elicit required information?
5. Is the workflow clear and practical?
6. Are there stage-specific considerations that need unique handling?
7. How do stages hand off to each other?
8. **Is role ownership clearly indicated for each stage?**
9. **Are AI prompts accessible to non-technical stakeholders where appropriate?**
10. **Do cross-functional handoffs have clear deliverable formats?**
11. **Can a non-technical stakeholder successfully complete early stages independently?**
12. **Is the execution model (foundational/iterative/continuous) clear for each stage?**
13. **Are revisit triggers and feedback loops well-documented?**
14. **Does the framework accommodate both waterfall-style and agile/iterative approaches?**
