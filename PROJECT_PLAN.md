# AI-Assisted SDLC - Project Plan

## Overview

This plan outlines the development of the AI-Assisted SDLC framework in phases, with appropriate Claude model selection for each phase based on task complexity and requirements.

The framework serves multiple audiences:
- **Engineers:** Learn to leverage AI throughout their work while maintaining professional standards
- **Non-technical stakeholders:** Properly initiate and scope projects with AI assistance
- **Organizations:** Improve cross-functional collaboration and project quality

Key strategic value: Democratizing project initiation by enabling business stakeholders (Product Managers, Marketing, Executives) to start projects independently while providing engineers with better-structured inputs.

---

## Phase 1: Framework Development

**Timeline:** Initial phase (4-6 weeks estimated)  
**Primary Tool:** Claude Code with **Sonnet 4.5**  
**Focus:** Documentation creation, template standardization, content development

### Objectives

1. Review and evaluate existing artifacts from ChatGPT reference materials
2. Establish consistent structure and standards across all SDLC stages
3. Create complete artifact sets for all SDLC stages
4. **Define clear role ownership for each stage (PM, BA, Engineer, QA, DevOps, etc.)**
5. **Define execution pattern for each stage (foundational/iterative/continuous)**
6. **Document revisit triggers and feedback loops for each stage**
7. **Tailor AI prompts and documentation to appropriate audience (business vs. technical)**
8. Ensure templates are practical, lightweight, and accessible to both technical and non-technical users
9. Document framework usage, workflows, and cross-functional handoffs

### Deliverables

- [x] **STAGES.md** - Authoritative definition of 7 SDLC stages with inputs/outputs/criteria
- [x] **AI_AUTONOMY_SCORECARD.md** - Operational guidance on AI autonomy levels per stage
- [x] Standardized artifact template structure
- [ ] Complete documentation for each SDLC stage:
  - [x] Initiation stage artifacts (with measurable success criteria guidance)
  - [x] Requirements stage artifacts (with MoSCoW prioritization)
  - [x] Design stage artifacts (covering both foundational and iterative passes, ADR template, cost guidance)
  - [x] Implementation stage artifacts (with multi-PR support, branching strategies, ADR guidance)
  - [ ] Verification stage artifacts (covering all validation types)
  - [ ] Deployment stage artifacts
  - [ ] Support stage artifacts (operations + maintenance)
- [ ] Project README with framework overview
- [ ] Usage guide and examples
- [ ] Workflow documentation showing stage transitions and feedback loops

### Why Sonnet 4.5?

- Excellent at structured documentation and writing
- Fast iteration cycles for refinement
- Cost-effective for high-volume document creation
- Sufficient reasoning capability for template design
- Well-suited for markdown and technical writing

### Success Criteria

- All SDLC stages have complete, consistent artifact sets
- Templates are clear and easy to follow
- Language is professional but approachable
- **Each stage clearly indicates primary role and cross-functional involvement**
- **Execution pattern (foundational/iterative/continuous) is explicit for each stage**
- **Revisit triggers and feedback loops are well-documented**
- **AI prompts use appropriate terminology for target role (business vs. technical language)**
- No stage-specific artifacts contradict framework principles
- Engineers can understand and use the framework without extensive training
- **Non-technical stakeholders can complete early-stage (Initiation, Requirements) artifacts independently**
- **Measurable success criteria are emphasized without mandating specific frameworks (OKRs, SMART, KPIs, etc.)**
- **Handoff points between roles are clearly defined**
- **Framework supports both iterative delivery and adaptive revision of foundational stages**
- **Design stage's dual nature (foundational + iterative) is clear and practical**

---

## Phase 2: Framework Validation and Refinement

**Timeline:** Following Phase 1 (2-3 weeks estimated)  
**Primary Tool:** Claude Code with **Sonnet 4.5**  
**Escalate to:** **Opus 4.5** for complex framework design decisions  
**Focus:** Quality assurance, usability testing, optimization

### Objectives

1. Review framework for completeness and consistency
2. Test workflows with realistic scenarios
3. **Validate execution model with both foundational and iterative stages**
4. **Test feedback loops - simulate revisiting stages when new information emerges**
5. Identify gaps or redundancies
6. Refine based on feedback
7. Create example walkthroughs
8. Validate that framework meets design principles

### Deliverables

- [ ] Framework validation report
- [ ] Example project walkthrough using the framework
- [ ] Refined templates based on testing
- [ ] FAQ or troubleshooting guide
- [ ] Feedback incorporation document
- [ ] Final framework v1.0

### When to Use Opus 4.5

Use Opus for:
- Resolving complex architectural decisions about framework structure
- Deep analysis of workflow effectiveness
- Sophisticated reasoning about edge cases
- Critical design trade-offs that impact usability

Continue with Sonnet for:
- Document refinement and editing
- Example creation
- FAQ development
- Incremental improvements

### Success Criteria

- Framework has been tested with at least one complete SDLC cycle
- Identified issues have been resolved
- Documentation is clear and complete
- Framework achieves design principle goals
- Ready for broader use

---

## Phase 3: Application Design

**Timeline:** After framework validation (2-3 weeks estimated)  
**Primary Tool:** Claude Code with **Opus 4.5**  
**Support Tool:** **Sonnet 4.5** for documentation and simpler tasks  
**Focus:** Application architecture and design following AI-Assisted SDLC process

### Objectives

1. **Follow the AI-Assisted SDLC framework** (dogfooding)
2. Complete Initiation stage for the application (with measurable success criteria)
3. Complete Requirements stage for the application
4. Complete Design stage for the application (foundational pass)
5. Make architectural decisions about application type, tech stack, features
6. **Design application to read framework artifacts (including STAGES.md) as single source of truth**
7. **Ensure framework-application synchronization strategy is implemented**
8. **Design optional feedback/measurement mechanisms for framework effectiveness**
9. Design user experience for different roles (engineers, PMs, etc.)

### Deliverables

Following the framework we created:

**Initiation Stage:**
- [ ] Application initiation-brief-template.md (with measurable success criteria)
- [ ] Completed initiation-checklist.md
- [ ] Project charter with objectives and success metrics

**Requirements Stage:**
- [ ] Application requirements-brief.md
- [ ] Requirements document with acceptance criteria
- [ ] Use cases and user stories
- [ ] Completed requirements-checklist.md

**Design Stage (Foundational Pass):**
- [ ] Application design-brief.md
- [ ] System architecture
- [ ] Technology stack selection
- [ ] Component design
- [ ] User interface design
- [ ] Measurement/instrumentation architecture
- [ ] Completed design-checklist.md

### Why Opus 4.5?

- Complex architectural decision-making
- Trade-off analysis for technology choices
- Sophisticated reasoning about user experience
- System design requires deeper analysis
- First real test of framework under demanding conditions

### Application Considerations

Potential application types to consider:
- CLI tool for terminal-based workflow
- Web application for browser-based access (more accessible to non-technical users)
- Desktop application for integrated development
- IDE plugin for in-editor workflow
- Combination approach

Must support:
- Document generation from templates
- Guided workflow through SDLC stages
- **Role-appropriate guidance and language**
- AI integration for brief completion
- Progress tracking
- Version control integration
- **Cross-functional handoffs and notifications**
- **Different user experiences based on role (PM vs. Engineer interface)**
- **Optional feedback/satisfaction collection at stage completion**
- **Basic usage analytics (stage completion, AI adoption) for teams that want them**
- **Data export for external analysis**

### Success Criteria

- Application design comprehensively addresses framework needs
- Design decisions are well-reasoned and documented
- Technology choices are appropriate for target users (engineers)
- Design follows the framework's own process
- Design is feasible to implement

---

## Phase 4: Application Implementation

**Timeline:** After design phase (4-8 weeks estimated)
**Primary Tool:** Claude Code with **Sonnet 4.5**
**Escalate to:** **Opus 4.5** for complex implementation challenges
**Focus:** Building the application following Design (iterative) → Implementation → Verification → Deployment

### Objectives

1. Complete Design stage (iterative passes) for each increment using the framework
2. Implement application following the framework
3. Verify application following the framework (all validation types)
4. Deploy application following the framework
5. Document application following the framework
6. Establish Support stage practices

### Deliverables

**Design Stage (Iterative Passes):**
- [ ] Detailed component specifications per increment
- [ ] API designs
- [ ] Data models
- [ ] Interface specifications

**Implementation Stage:**
- [ ] Source code
- [ ] Unit tests
- [ ] Integration tests
- [ ] **Framework-loading mechanism (reads STAGES.md and stage artifacts)**
- [ ] **Version alignment validation**
- [ ] **Instrumentation for measuring framework effectiveness**
- [ ] Code documentation

**Verification Stage:**
- [ ] Test plans (unit, integration, UAT, performance, security)
- [ ] Test results across all validation types
- [ ] Bug reports and resolutions
- [ ] UAT sign-off from stakeholders
- [ ] Performance validation
- [ ] Security testing results

**Deployment Stage:**
- [ ] Deployment scripts/configs
- [ ] User documentation
- [ ] Installation guide
- [ ] Deployment validation
- [ ] Baseline measurements captured

**Support Stage:**
- [ ] Support plan and runbooks
- [ ] Issue tracking setup
- [ ] Update procedures
- [ ] Monitoring and alerting configuration
- [ ] Success criteria tracking mechanisms

### Model Selection Strategy

**Use Sonnet 4.5 for:**
- Standard code generation
- Test writing
- Documentation
- Refactoring
- Bug fixes
- Incremental features

**Use Opus 4.5 for:**
- Complex algorithm implementation
- Performance optimization challenges
- Difficult architectural problems
- Integration challenges
- Security considerations

### Success Criteria

- Application successfully implements framework
- Application is usable by target engineers
- Application demonstrates framework's value
- Code quality meets professional standards
- Application is deployable and maintainable

---

## Phase 5: Iteration and Improvement

**Timeline:** Ongoing after initial release  
**Primary Tool:** Context-dependent (Sonnet or Opus)  
**Focus:** User feedback, improvements, evolution, maintaining framework-application synchronization

### Objectives

1. Gather user feedback on framework and application
2. Identify improvement opportunities
3. Extend framework as needed
4. Enhance application features
5. **Maintain strict synchronization between framework and application**
6. Build community/adoption

### Deliverables

- [ ] User feedback analysis
- [ ] Framework updates (versioned)
- [ ] Application updates
- [ ] Case studies and examples
- [ ] Training materials

### Success Criteria

- Active usage by engineering team
- Measurable productivity improvements
- Positive engineer sentiment toward AI assistance
- Growing adoption and advocacy
- Framework evolution based on real-world use

---

## Model Selection Guidelines

### Use Sonnet 4.5 When:
- Writing or editing documentation
- Creating templates and examples
- Standard code generation
- Iterative refinement
- High-volume work
- Well-defined tasks

### Use Opus 4.5 When:
- Complex architectural decisions
- Deep reasoning required
- Trade-off analysis
- Novel problem-solving
- Critical design choices
- Stuck on difficult problems with Sonnet

### Decision Process:
1. **Start with Sonnet** - it handles 80%+ of tasks well
2. **Monitor progress** - if hitting walls or quality issues, consider Opus
3. **Escalate intentionally** - use Opus for specific challenging sub-tasks
4. **Return to Sonnet** - once complex decisions are made, continue with Sonnet

---

## Risk Mitigation

### Risk: Framework too complex or bureaucratic
**Mitigation:** Constant focus on lightweight, practical design. Regular testing with realistic scenarios.

### Risk: Low engineer adoption due to AI skepticism
**Mitigation:** Non-threatening language, clear value demonstration, voluntary adoption initially.

### Risk: Non-technical stakeholders struggle with framework complexity
**Mitigation:** Role-appropriate language and guidance. Test with actual PMs/BAs early. Provide examples and templates.

### Risk: Framework doesn't add measurable value
**Mitigation:** Validate with real projects early. Measure time savings and quality improvements.

### Risk: Poor handoffs between roles/stages
**Mitigation:** Clearly define deliverables and acceptance criteria for each stage. Test full workflows across role boundaries.

### Risk: Application too complex or hard to use
**Mitigation:** Follow own framework. Focus on UX for different roles. Start with MVP, iterate.

### Risk: Framework and application diverge over time
**Mitigation:** Single source of truth architecture. Framework files ARE the application's data. Automated validation. Always update together in same commit/release.

### Risk: Framework becomes outdated as AI tools evolve
**Mitigation:** Design framework to be tool-agnostic. Plan for versioning and updates.

---

## Framework-Application Synchronization Strategy

A critical success factor for this project is keeping the framework documentation and the application tool perfectly synchronized as both evolve over time.

### Design Principle: Single Source of Truth

The framework artifacts (markdown files) are the **single source of truth**. The application **consumes** these artifacts rather than duplicating their content.

**What this means:**
- Stage definitions live in `{stage}-brief.md`, `{stage}-reference.md`, etc.
- Application reads these files at runtime (or build time)
- Checklists, prompts, and guidance are stored in markdown, not hardcoded in application
- When framework docs change, application behavior changes automatically

### Implementation Approach

**Option A: Runtime Reading (Preferred for Phase 1-2)**
```
application/
├── src/
│   ├── framework-loader.js    # Reads markdown files including STAGES.md
│   └── ...
├── framework/                  # Symlink or copy of framework docs
│   ├── STAGES.md              # Core stage definitions
│   ├── initiation/
│   ├── requirements/
│   ├── design/
│   ├── implementation/
│   ├── verification/
│   ├── deployment/
│   ├── support/
│   └── ...
```

**Option B: Build-Time Compilation (Consider for Phase 3+)**
- Parse markdown at build time
- Generate application artifacts from framework
- Ensures version alignment
- Enables validation (broken links, missing sections)

### Version Alignment

**Framework and application share version numbers:**
- Framework v1.0 = Application v1.0
- Framework v1.2 = Application v1.2 (updated to support framework changes)

**Release process:**
1. Update framework documentation
2. Test changes manually
3. Update application to support framework changes
4. Tag both with same version: `v1.2.0`
5. Release together

**Git strategy:**
```
ai-assisted-sdlc/
├── STAGES.md            # Core stage definitions
├── framework/           # Framework documentation
│   ├── initiation/
│   ├── requirements/
│   ├── design/
│   ├── implementation/
│   ├── verification/
│   ├── deployment/
│   ├── support/
│   └── ...
├── application/         # Application code
│   ├── src/
│   └── ...
├── VERSION             # Shared version file
└── CHANGELOG.md        # Combined changelog
```

### Co-Evolution During Development

**Phase 1-2 (Framework Development):**
- Focus on framework quality
- Application doesn't exist yet
- Document design decisions that will affect application

**Phase 3 (Application Design):**
- Design application to read framework artifacts
- Identify any framework changes needed to support tooling
- Update framework and document reasoning

**Phase 4 (Application Implementation):**
- Build application that depends on framework files
- **Critical:** Framework changes require application updates in same commit
- CI/CD validates framework-application compatibility

**Phase 5 (Iteration and Improvement):**
- User feedback may trigger framework changes
- Framework changes automatically trigger application updates
- Both released together with aligned version numbers

### Synchronization Validation

**Automated checks:**
- CI validates all framework artifacts are well-formed
- CI validates application can load all framework stages
- Tests ensure application handles framework structure correctly
- Version numbers match between framework and application

**Manual validation:**
- Test application against framework after any framework change
- Ensure UI/UX reflects framework updates
- Validate AI prompts work in application context

### Benefits of This Approach

✅ **No duplication** - Framework content exists in one place
✅ **Automatic propagation** - Framework improvements flow to application
✅ **Easier maintenance** - Update markdown, application reflects changes
✅ **Consistency guaranteed** - Application can't diverge from framework
✅ **Framework-first** - Can improve framework independently, application follows
✅ **Testability** - Framework changes tested through application usage

### Example: Adding a New Stage Field

**Old framework (initiation-brief-template.md):**
```markdown
## Project Goals
[Description here]
```

**New framework (initiation-brief-template.md):**
```markdown
## Project Goals
[Description here]

## Measurable Success Criteria
[How we'll measure success - using OKRs, SMART goals, KPIs, or other approach]
```

**Application impact:**
- If reading at runtime: Automatically displays new field
- If compiling at build: Rebuild reflects new field
- No code changes needed (if template-driven)
- If new field requires special handling, update application in same commit

### Decision Points for Claude Code

When building the application (Phase 3-4), key decisions:
1. **How should application read framework files?** (Runtime vs. build-time) - Must include STAGES.md
2. **What validation should application perform on framework structure?**
3. **How should application handle framework version mismatches?**
4. **Should application cache framework content or read fresh each time?**
5. **How should application handle framework updates during active use?**
6. **How should application support framework-agnostic goal setting?** (OKRs, SMART, KPIs, etc.)
7. **How should application track and display measurement throughline?**

These decisions should be made during the Design stage using the framework itself.

---

## Metrics for Success

### Framework Metrics:
- Time to complete each SDLC stage (with vs without AI assistance)
- Quality of deliverables (defect rates, completeness)
- Engineer satisfaction scores
- **Non-technical stakeholder satisfaction scores**
- Adoption rate across teams and roles
- **Reduction in requirements clarification cycles**
- **Quality of handoffs between stages/roles**
- **Number of projects initiated by non-engineering stakeholders**

### Application Metrics:
- Daily/weekly active users
- Feature usage patterns
- Time saved using the application
- User retention
- Support ticket volume

---

## Next Immediate Steps

1. ✅ Create project directory structure
2. ✅ Initialize version control
3. ✅ Set up reference materials directory
4. ✅ Launch Claude Code in project directory
5. ✅ Review existing ChatGPT artifacts
6. ✅ Define 7-stage SDLC model (Initiation, Requirements, Design, Implementation, Verification, Deployment, Support)
7. ✅ Create STAGES.md with comprehensive stage definitions
8. ✅ Establish framework-agnostic measurable success criteria approach
9. ⬜ Create complete artifact sets for each of the 7 stages
10. ⬜ Establish artifact template standards
11. ⬜ Validate framework with realistic scenarios

---

## Notes

- This plan is a living document and will evolve based on learnings
- Phase timelines are estimates and may adjust
- Model selection is a guideline, not a strict rule
- The project itself demonstrates the framework's value
- Regular reflection on what's working/not working is essential
