# AI-Assisted SDLC - Project Context

## Project Overview

**Name:** AI-Assisted SDLC  
**Tagline:** A practical framework for integrating AI assistance into software
development

## Purpose and Vision

This project develops a lightweight, practical framework that guides both
technical and non-technical stakeholders through using AI assistance across all
stages of the Software Development Life Cycle (SDLC). The framework aims to:

- Demonstrate AI's fitness for use at each SDLC stage
- Provide standardized documentation templates for each stage, tailored to role
- Make AI adoption less threatening to engineers who may view it as a
  replacement rather than a tool
- Democratize project initiation by enabling non-technical stakeholders (Product
  Managers, Marketing, Executives) to start projects with proper structure
- Improve cross-functional communication and handoffs between roles
- Maintain professional engineering standards while leveraging AI capabilities
- Keep the process lightweight and easy to follow

## Target Audience

**Primary audience:** Engineers at the project creator's company who may be:

- Skeptical about AI tools
- Concerned about AI as a threat to their roles
- Unfamiliar with AI's strengths and weaknesses
- Not actively engaged in learning AI capabilities

**Secondary audience:** Non-technical stakeholders (Product Managers, Business
Analysts, Marketing, Executives) who need to initiate and plan software projects
but lack technical expertise

**Tertiary audience:** Other organizations seeking structured AI integration
across their entire product development lifecycle

## Design Principles

1. **AI as Assistant, Not Replacement** - Frame AI as a productivity tool that
   humans control. The
   [AI Assistance Scorecard](framework/framework-ai-assistance.md)
   operationalizes this principle by defining specific autonomy levels and human
   gates for each stage based on verifiability and risk.
2. **Practical Over Theoretical** - Focus on actionable, real-world
   applicability
3. **Lightweight Process** - Avoid bureaucratic overhead; keep it simple
4. **Professional Standards** - Humans evaluate and validate all AI output
5. **Non-Threatening Language** - Use "assisted" terminology rather than
   "augmented" or "autonomous"
6. **Cross-Functional Accessibility** - Framework usable by both technical and
   non-technical stakeholders
7. **Role-Appropriate Guidance** - Each stage tailored to the primary role
   responsible for it

## Prior Work

The project creator has already:

- Established a list of standard SDLC stages
- Generated a document assessing AI fitness for each stage
- Started developing standardized artifacts for Initiation and Analysis stages
  with ChatGPT
- Created initial templates including:
  - `{stage-name}-brief.md` - one-page brief
  - `{stage-name}-checklist.md` - verification checklist
  - `{stage-name}-guide.md` - in-depth explanation of stage, acronyms, terms
  - `{stage-name}-ai-agent-prompt.md` - prompt for AI to elicit information for
    the brief
  - `README.md` - description of artifacts and workflow

## Current State

The project is transitioning from exploratory work (with ChatGPT) to structured
development:

- Moving to version-controlled project structure
- Switching primary AI tool to Claude Code
- Separating reference materials from working project
- Need to review and refine existing artifacts
- Need to extend framework to remaining SDLC stages

## SDLC Stages

The framework uses **8 stages** that balance simplicity with comprehensive
coverage. For complete stage definitions including inputs, outputs, entry/exit
criteria, and handoffs, see
**[AI-Assisted SDLC Stages](framework/framework-stages.md)**.

**Quick Summary:**

1. **Initiation** - Establish business case with measurable success criteria
2. **Requirements** - Define testable requirements with acceptance criteria
3. **System Design** - Establish system architecture and technical approach
4. **Increment Design** - Create detailed designs per increment
5. **Implementation** - Build working code
6. **Verification** - Validate through testing and acceptance (including UAT)
7. **Deployment** - Release to production
8. **Support** - Monitor, maintain, and enhance

**Execution Patterns:**

- **Foundational** (once per project): Initiation, Requirements, System Design
- **Iterative** (per increment): Increment Design, Implementation, Verification,
  Deployment
- **Continuous** (ongoing): Support

**Role Ownership Principle:** Each stage has a clearly identified primary role
and supporting roles to:

- Set expectations for who drives each stage
- Clarify cross-functional involvement
- Enable non-technical stakeholders to participate appropriately
- Improve handoffs between stages

See [AI-Assisted SDLC Stages](framework/framework-stages.md) for detailed
descriptions, artifacts, and cross-stage relationships.

## Measurable Goals and Success Criteria

A foundational principle of effective project execution is establishing
**measurable success criteria** during Initiation. The framework is agnostic to
specific goal-setting methodologies while emphasizing the critical importance of
measurement.

### Goal-Setting Approaches

The framework supports any goal-setting approach that produces measurable
outcomes. Organizations should use whichever framework best fits their culture
and practices:

**Common Frameworks:**

- **OKRs (Objectives and Key Results):** Qualitative objectives paired with
  measurable key results (2-5 per objective)
- **SMART Goals:** Specific, Measurable, Achievable, Relevant, Time-bound
  objectives
- **KPIs (Key Performance Indicators):** Critical metrics tracked over time to
  measure performance
- **Balanced Scorecard:** Multi-perspective measurement across financial,
  customer, process, and learning dimensions
- **Simple Success Metrics:** Measurable outcomes without formal framework
  structure
- **Qualitative Criteria:** For research/exploration projects where
  quantification isn't feasible

**What matters:** Regardless of framework, success criteria must be clearly
defined, measurable (or evaluable), and trackable throughout the project
lifecycle.

### Three Types of Success Metrics

Projects should define measurable goals across three dimensions:

**1. Business Metrics**

- Revenue impact, cost savings, or efficiency gains
- User engagement, adoption, or satisfaction (NPS, CSAT)
- Market share, competitive position, or brand perception
- Customer retention, churn reduction, or lifetime value

**2. Technical Metrics**

- System performance (latency, throughput, response time)
- Reliability and availability (uptime, error rates, MTTR)
- Scalability (concurrent users, transaction volume)
- Code quality (test coverage, technical debt reduction)
- Security posture (vulnerabilities resolved, compliance achieved)

**3. Project Metrics**

- Time to market or delivery milestones
- Budget adherence or cost efficiency
- Scope delivery (features completed vs. planned)
- Team velocity or productivity improvements

### Measurement Requirements

**Mandatory Components (Initiation Stage):**

- Define clear objectives with at least one measurable success criterion per
  project
- Specify how success will be measured and validated
- Identify measurement mechanisms (analytics, surveys, system metrics, business
  KPIs)
- Set baseline (current state) and target (desired state)
- Determine when and how success will be evaluated

**Allowance for Non-Quantifiable Projects:** Projects focused on pure research,
exploration, or learning may use qualitative success criteria:

- "Successfully prototype three alternative approaches"
- "Gain sufficient understanding to make informed build/buy decision"
- "Validate technical feasibility of approach X"

Even qualitative projects should define clear, evaluable criteria for success.

### Success Criteria Throughline

Measurable success criteria established in Initiation flow through all
subsequent stages, actively guiding development and enabling data-driven
validation. Each stage integrates measurement differently:

- **Initiation** - Define objectives with measurable success criteria
- **Requirements** - Ensure instrumentation needs are captured as NFRs
- **System Design** - Design measurement infrastructure
- **Increment Design** - Plan metrics collection for increment
- **Implementation** - Implement metrics collection
- **Verification** - Test measurement systems
- **Deployment** - Capture baseline measurements
- **Support** - Monitor and validate success criteria

See [AI-Assisted SDLC Stages](framework/framework-stages.md) for the complete
measurement throughline table showing how each stage integrates measurement.

## SDLC Stage Execution Model

The framework recognizes that software development is not a strict linear
waterfall process. Stages have different execution patterns and can be revisited
as the project evolves.

**Note:** For stage-specific execution details, inputs/outputs, and entry/exit
criteria, see [AI-Assisted SDLC Stages](framework/framework-stages.md). This
section describes the framework's overall execution philosophy and how stages
interact.

### Terminology: Increments

The framework uses the term **"increment"** to describe discrete, deliverable
chunks of work. Depending on your team's methodology, you might call this an
epic, feature, sprint deliverable, or release increment.

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

The framework uses "increment" to remain methodology-agnostic while supporting
all approaches.

### Stage Execution Patterns

**Foundational Stages** (Execute once per project, can be revisited when
needed):

- **Initiation** - Establishes project vision, business case, objectives, and
  measurable success criteria
- **Requirements** - Defines what the system should do with acceptance criteria
- **System Design** - Establishes overall system architecture and technical
  approach

These stages set the project foundation but are **not frozen**. They can and
should be revisited when significant new information emerges.

**Iterative Stages** (Execute repeatedly per increment):

- **Increment Design** - Detailed design for specific increment
- **Implementation** - Build the increment
- **Verification** - Validate the increment through testing and acceptance
- **Deployment** - Release the increment to production

These stages repeat for each deliverable increment, enabling continuous value
delivery.

**Continuous Stages** (Ongoing after first production deployment):

- **Support** - Monitor systems and success metrics, respond to incidents, fix
  bugs, and deliver enhancements

### Revisit Triggers

Stages may need to be revisited when:

**For Foundational Stages (Initiation, Requirements, System Design):**

- Implementation reveals unanticipated technical constraints or impossibilities
- User feedback from deployed increments shows requirements miss the mark
- Measurement shows objectives are off-target or success criteria need
  adjustment
- Business context or priorities shift significantly
- Regulatory, compliance, or security requirements change
- Technical discoveries reveal fundamentally better approaches
- Market conditions change during development
- Stakeholder understanding evolves through iterative delivery

**For Iterative Stages (Increment Design, Implementation, Verification,
Deployment):**

- Verification reveals design flaws requiring revision
- Code review identifies better implementation approaches
- Performance testing shows architectural changes needed
- Security vulnerabilities discovered during verification
- UAT feedback indicates requirements misalignment

### Feedback Loops and Revision Approach

When revisiting a stage:

1. **Document the trigger** - What new information emerged? Why revisit now?
2. **Assess impact scope** - Which stages/features are affected?
3. **Version the artifacts** - Keep history of what changed and why
4. **Execute revision** - Full re-execution or incremental update depending on
   scope
5. **Communicate changes** - Notify all affected stakeholders and teams
6. **Update downstream artifacts** - Ensure consistency across stages

### Practical Example: 2-Month Project

**Month 1, Week 1:**

- Complete Initiation (foundational) - Define objectives with measurable success
  criteria
- Complete Requirements (foundational) - Document FRs/NFRs with acceptance
  criteria
- Complete System Design (foundational) - Establish system architecture
- Plan increments based on architecture

**Month 1, Weeks 2-4:**

- Increment 1 (User Authentication): Design → Implementation → Verification →
  Deployment
- Increment 2 (Database Schema): Design → Implementation → Verification →
  Deployment

**Month 2, Week 1:**

- User feedback on Increment 1 reveals requirements gap
- **Revisit Requirements** - Update requirements document and acceptance
  criteria
- **Assess impact** - Affects Increment 3 design
- Continue Increment 3 with updated understanding

**Month 2, Weeks 2-4:**

- Increment 3 (User Profile): Design → Implementation → Verification →
  Deployment (incorporating learning)
- Increment 4 (Search Feature): Design → Implementation → Verification →
  Deployment
- **Support begins** - Monitoring metrics, supporting Increments 1-2 in
  production

### Framework Flexibility

This execution model ensures the framework is:

- **Practical** - Reflects how real teams work
- **Adaptive** - Accommodates learning and change
- **Efficient** - Enables continuous delivery of value
- **Realistic** - Not rigid waterfall, not unstructured chaos
- **Scalable** - Works for small increments and large projects
- **Methodology-agnostic** - Teams use their own terminology (epic, feature,
  sprint, etc.)

See [AI-Assisted SDLC Stages](framework/framework-stages.md) for complete stage
definitions including execution patterns, inputs/outputs, entry/exit criteria,
and handoff details.

## Artifact Structure Template

For each SDLC stage, create:

### Stage Brief (`{stage}-brief.md`)

- One-page document
- Captures essential information for the stage
- Structured, fillable template
- **Role metadata:** Primary role, supporting roles, cross-functional
  involvement
- **Execution metadata:** Foundational / Iterative / Continuous, typical revisit
  triggers
- **Measurement integration:** For Initiation, includes objectives with
  measurable success criteria; other stages reference how they support
  measurement

### Stage Checklist (`{stage}-checklist.md`)

- Verification that brief is complete
- Ensures nothing critical is missed
- Quality gate before proceeding
- Role-specific validation items
- Includes "ready to proceed" vs. "needs revision" criteria

### Stage Guide (`{stage}-guide.md`)

- Detailed explanation of the stage
- Definitions of terms and acronyms (accessible to non-technical readers when
  appropriate)
- Best practices and guidance
- Role responsibilities and expectations
- **When and how to revisit this stage** - triggers and revision process
- **Downstream impact** - what changes when this stage is updated
- More comprehensive than the brief
- **Example questions and explorations** - Shows the types of thinking to apply
  when working with AI assistance, without prescribing specific prompts

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
**Tool:** Claude Code with Sonnet 4.5, potentially Opus 4.5 for complex
decisions  
**Deliverables:**

- Validated framework
- Example workflows
- User testing feedback incorporated

### Phase 3: Application Development

**Goal:** Build tool that facilitates use of the AI-Assisted SDLC framework  
**Tool:** Claude Code with Sonnet 4.5 for implementation, Opus 4.5 for
architecture  
**Approach:** Follow the AI-Assisted SDLC process itself (dogfooding)  
**Deliverables:**

- Application design
- Working tool (CLI, web app, or other appropriate format)
- Documentation for the tool

## Success Criteria

The framework succeeds if:

1. Engineers can follow it without extensive training
2. Non-technical stakeholders can use early stages (Initiation, Requirements) to
   properly scope projects
3. AI assistance adds measurable value at each stage
4. Professional standards are maintained or improved
5. Engineers view AI as helpful rather than threatening
6. Cross-functional handoffs are clearer and more efficient
7. The 8-stage model is lightweight enough to avoid bureaucratic overhead
8. The framework can be followed manually before tooling exists
9. Business stakeholders feel empowered to initiate projects independently with
   clear success criteria
10. Reduced back-and-forth between business and engineering teams
11. Projects consistently define measurable success criteria during Initiation
12. Teams can track progress toward goals throughout the SDLC
13. The framework provides clean separation between foundational System Design
    and iterative Increment Design

## Framework Effectiveness and Measurement

The AI-Assisted SDLC framework's value should be measurable, but measurement
approaches must match organizational capabilities.

### Measurement Philosophy

Organizations vary widely in their measurement maturity:

- Some have sophisticated engineering metrics (DORA metrics, code quality
  dashboards)
- Others have only basic project tracking (start/end dates, team size)
- Many have no systematic productivity measurement at all

The framework should **support measurement without requiring it**, and should
work for organizations at any measurement maturity level.

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

Organizations should select metrics appropriate to their context and
capabilities.

### Implications for Application Design

When the application tool is built (Phase 3), it should:

- **Facilitate optional feedback collection** without making it burdensome
- **Track basic usage patterns** (which stages used, AI assistance adoption)
- **Enable simple satisfaction surveys** at stage completion
- **Export data** for teams that want to analyze effectiveness
- **Not require measurement** - teams can use framework without tracking metrics

The application becomes both a productivity tool AND a measurement instrument
for organizations that want insights into framework effectiveness.

### Continuous Improvement

Measurement enables framework refinement:

- Identify stages that consistently cause confusion or delays
- Understand which AI prompts are most/least helpful
- Detect patterns in cross-functional handoff issues
- Validate that framework achieves design goals

Framework updates should be driven by evidence from actual usage, not just
theoretical improvements.

## Notes for Claude Code

- Existing work from ChatGPT is reference material only - review and improve,
  don't just copy
- Maintain consistency across all 8 stage artifacts
- Keep language professional but approachable
- **Adjust language/terminology based on primary role for each stage** (business
  language for PM/BA stages, technical for engineering stages)
- Avoid jargon that might alienate skeptical engineers OR non-technical
  stakeholders
- Focus on practical utility over theoretical completeness
- The framework should work with any AI tool, not just Claude
- Templates should guide without constraining
- Consider real-world engineering and business constraints and workflows
- **Each stage should clearly indicate role ownership and cross-functional
  touchpoints**
- **Stage guides should include example questions and explorations** that teams
  can use when working with AI assistants, tailored to the expertise level of
  the primary role
- Consider how stages hand off between different roles/departments
- **Emphasize measurable success criteria in Initiation stage artifacts** - be
  framework-agnostic (support OKRs, SMART goals, KPIs, etc.)
- **Show measurement throughline across all stages** - how each stage
  contributes to or enables measurement of success
- **Clarify handoff between System Design and Increment Design** - how
  architecture decisions inform increment-level design
- **Verification stage should encompass all validation types** (unit,
  integration, UAT, performance, security)

**Version Control Standards:**

- Use **Semantic Versioning** (semver) for all releases: MAJOR.MINOR.PATCH
  - MAJOR: Breaking changes to framework structure or application API
  - MINOR: New stages, new artifacts, backward-compatible features
  - PATCH: Documentation fixes, typo corrections, clarifications
- Framework and application share version numbers (e.g., Framework v1.2.0 =
  Application v1.2.0)
- Use **Conventional Commits** for all commit messages:
  - Format: `type(scope): description`
  - Types: `feat`, `fix`, `docs`, `refactor`, `test`, `chore`, `style`
  - Scopes: stage names (initiation, requirements, system-design,
    increment-design, implementation, verification, deployment, support),
    framework, application, ci
  - Examples:
    - `feat(initiation): add measurable success criteria section to brief template`
    - `fix(requirements): correct acceptance criteria validation logic`
    - `docs(framework): update execution model examples`
    - `refactor(application): extract stage loader into separate module`
    - `feat(system-design): add architecture decision record template`
  - Breaking changes: Add `BREAKING CHANGE:` in commit body or use `!` after
    type/scope
  - Example: `feat(framework)!: restructure stage artifact naming convention`
- Tag releases with version number: `git tag v1.0.0`
- Generate changelog from conventional commits

**File-Level Versioning Conventions:**

- **README.md files (stage overviews):**
  - Include `**Framework Version:** X.X.X` at the top (reflects **CURRENT
    framework version**, not when stage was added)
  - Include `**Last Updated:** YYYY-MM-DD` at the top (when file was last
    modified)
  - **Update Framework Version in ALL README files** when incrementing framework
    version (e.g., v0.4.0 → v0.5.0)
  - Update Last Updated when content changes
  - **Example:** When releasing v0.5.0, update all existing README files
    (Initiation, Requirements, System Design, Increment Design) to show
    Framework Version: 0.5.0
- **Individual artifact files (templates, checklists, references, prompts):**
  - Include `**Last Updated:** YYYY-MM-DD` at the top (when file was last
    modified)
  - Include version note at bottom: "Added to framework in vX.X.X" (never
    changes after creation - preserves history)
  - Do NOT include Framework Version at top (reduces maintenance burden)
  - Update Last Updated only when content actually changes
- **Rationale:**
  - README files act as stage entry points and should communicate "this is the
    current framework version" for consistency
  - All stage READMEs showing the same version number creates cohesive framework
    experience
  - Individual artifacts preserve historical context with "Added to framework in
    vX.X.X" notes
  - Only ~8 README files to update per release (manageable), vs 50+ individual
    artifacts
  - Git history and tags provide full version tracking

## Questions to Address

When reviewing reference materials and building the framework:

1. Are the 8 SDLC stages comprehensive and appropriately scoped?
2. Is the artifact structure consistent and complete across all stages?
3. Are there missing artifacts that would add value?
4. Do the AI agent prompts effectively elicit required information?
5. Is the workflow clear and practical?
6. Are there stage-specific considerations that need unique handling?
7. How do stages hand off to each other?
8. **Is role ownership clearly indicated for each stage?**
9. **Are AI prompts accessible to non-technical stakeholders where
   appropriate?**
10. **Do cross-functional handoffs have clear deliverable formats?**
11. **Can a non-technical stakeholder successfully complete Initiation and
    Requirements independently?**
12. **Is the execution model (foundational/iterative/continuous) clear for each
    stage?**
13. **Are revisit triggers and feedback loops well-documented?**
14. **Does the framework accommodate both waterfall-style and agile/iterative
    approaches?**
15. **Are measurable success criteria clearly integrated throughout the
    framework?**
16. **Does the Initiation stage adequately guide definition of measurable goals
    regardless of framework choice?**
17. **Is the handoff between System Design and Increment Design clear and
    effective?**
