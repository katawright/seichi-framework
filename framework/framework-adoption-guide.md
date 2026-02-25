# Organizational Adoption Guide

> Practical guidance for planning and executing an organizational rollout of the
> AI-Assisted SDLC framework — from pilot selection through full
> standardization.

**Audience:** CTOs, engineering leaders, and executives evaluating or planning
organizational adoption of AI-assisted development practices.

---

## Why Organizational Adoption Matters

The framework is designed for per-project use, but organizational adoption
requires additional planning: which team goes first, how to measure success, how
to handle resistance, and when to expand. This guide covers those decisions.

**Key insight:** You don't need to adopt all 8 stages at once. Start with the
stages that offer the highest return and lowest risk, then expand as confidence
grows.

---

## Readiness Assessment

Before selecting a pilot, assess whether your organization is ready to adopt
now, try a limited pilot first, or defer briefly to close specific gaps.

### Adopt Now

Your organization is ready for a full pilot if:

- Teams already use or are evaluating AI coding assistants
- An AI usage policy exists (even a lightweight one)
- You want structure instead of ad-hoc AI adoption
- You need governance guardrails for AI-assisted development

### Try First (Limited Pilot)

Start with a single team and one increment if:

- You have an AI usage policy but limited practical experience
- Only one or two teams have used AI tools — others are curious but untested
- Leadership supports experimentation but hasn't committed to broader adoption

A limited pilot builds the evidence base for a wider rollout decision.

### Defer Briefly

Pause adoption to close these gaps first. Each is actionable and typically
resolvable in days, not months.

**No AI usage policy yet**

An AI usage policy defines the organizational boundaries for using AI tools in
development. It covers four areas:

1. **Approved tools** — which AI assistants are sanctioned for use
2. **Data boundaries** — what project data can be shared with AI tools and what
   must be excluded (credentials, PII, proprietary algorithms)
3. **Code review standards** — how AI-generated code is reviewed (typically the
   same standards as human-written code, with additional attention to licensing
   and security)
4. **Disclosure rules** — whether and how AI-assisted development is disclosed
   to customers, regulators, or auditors

**Why it matters:** Without a policy, teams face data leakage risk (sensitive
code or data sent to unapproved tools), IP exposure (unclear ownership of
AI-generated output), inconsistent tooling (teams choosing different tools with
different data handling), and regulatory exposure (no audit trail of AI usage
decisions).

This doesn't need to be a 50-page document — a one-page policy covering the four
areas above is enough to unblock adoption. Use the
[AI-Specific Policies](framework-guide.md#ai-specific-policies) checklist in the
Framework Guide as a starting template.

**Zero AI tool experience**

Teams need foundational AI literacy before the framework adds value. Focus on
durable skill categories that remain stable regardless of which tools your
organization ultimately selects:

- **Prompt engineering fundamentals** — how to write effective prompts, provide
  context, and iterate on AI output
- **Understanding model capabilities and limitations** — what AI tools are good
  at (drafting, pattern recognition, code generation) versus where they struggle
  (novel architecture, nuanced requirements, business judgment)
- **Code review practices for AI-generated output** — recognizing common AI code
  patterns, checking for hallucinated APIs, verifying security and correctness
- **Data sensitivity awareness** — understanding what information is safe to
  share with AI tools and what must be kept out of prompts

Tool-specific training (e.g., learning a particular IDE extension) becomes
useful once tools are selected, but these conceptual foundations come first.

### What Each Role Needs

Once foundational AI literacy is in place, each role benefits from
framework-specific skills:

| Role              | Core Skills                       | Framework-Specific Skills             |
| ----------------- | --------------------------------- | ------------------------------------- |
| Engineers         | AI tool proficiency, prompt craft | Stage workflows, verification gates   |
| QA / Test         | Test strategy, automation         | AI-generated test review, coverage    |
| PM / BA           | Requirements writing, stakeholder | Initiation brief, AI-assisted         |
|                   | management                        | requirements drafting                 |
| DevOps            | CI/CD, infrastructure             | Deployment checklist, support handoff |
| Engineering leads | Architecture review, mentoring    | Tier selection, gate decisions        |

### Codebase Readiness (Brownfield)

Organizational readiness covers people, policy, and process. For brownfield
projects, **codebase readiness** also matters — the state of the existing
codebase affects how quickly teams can start AI-assisted feature work.

Use the
[Project Foundation Guide: Assessing Brownfield Readiness](project-foundation-guide.md#assessing-brownfield-readiness)
to evaluate test coverage, documentation, architectural consistency, dependency
health, and database logic.

- **Ready** — Proceed with standard Increment 0 discovery
- **Needs Preparation** — Factor extended Increment 0 into timeline
- **Needs Significant Preparation** — Consider treating the preparation project
  as the adoption pilot (see
  [Brownfield Preparation as a Pilot](#brownfield-preparation-as-a-pilot))

---

## Pilot Selection

### Choosing a Pilot Team

The right pilot team determines whether the organization sees early wins or
early frustration. Look for:

**Good pilot team characteristics:**

- Moderate experience — not the most senior (may resist change) or most junior
  (may lack context to evaluate AI output)
- Supportive of experimentation — willing to try new approaches and provide
  honest feedback
- Existing CI/CD maturity — can verify AI-generated code immediately through
  automated pipelines
- Reasonable workload — has capacity to learn the framework without delivery
  pressure creating shortcuts
- Cross-functional representation — includes engineers, QA, and ideally a PM or
  BA

**Avoid for pilot:**

- Teams in crisis mode or under heavy delivery pressure
- Teams with no automated testing or CI/CD pipeline
- Teams strongly opposed to AI adoption (address resistance first)

### Choosing a Pilot Project

**Good pilot project characteristics:**

- **Greenfield or well-documented brownfield preferred** — avoids the complexity
  of undocumented legacy constraints during initial adoption. Most organizations
  will pilot on brownfield because that's where their work is — this is viable
  when informed by a
  [readiness assessment](project-foundation-guide.md#assessing-brownfield-readiness)
- **Moderate complexity** — complex enough to exercise multiple stages, simple
  enough to complete in 2–3 increments
- **Non-critical path** — failure or delay won't impact revenue or contractual
  obligations
- **Standard risk tier** — exercises the framework's core practices without
  Enterprise overhead
- **Clear success criteria** — stakeholders can objectively evaluate whether the
  framework helped

**Avoid for pilot:**

- Mission-critical systems with zero tolerance for experimentation
- Trivial projects that won't exercise the framework meaningfully
- Projects with heavy regulatory or compliance requirements (save Enterprise
  tier for post-pilot)

### Brownfield Preparation as a Pilot

When a brownfield codebase needs significant preparation, the preparation
project itself can serve as the adoption pilot.

**Key insight:** Preparation work — adding tests, documenting architecture,
mapping dependencies — exercises the framework's stages on familiar code. The
team builds framework fluency on territory they already know.

**Approach:**

1. Run 1–2 preparation increments through the framework's full cycle (Increment
   Design → Implementation → Verification → Deployment)
2. Evaluate results using
   [Phase 1 success criteria](#phase-1-pilot-1-team-12-increments)
3. Decide whether to complete the full preparation project or adjust the
   approach

**Why this works:**

- Preparation outputs (tests, documentation, dependency maps) have immediate
  value regardless of whether the organization continues with the framework
- The team gains hands-on framework experience before tackling new feature work
- Lower risk than piloting on new feature development — preparation changes are
  additive, not behavior-changing

---

## Phased Rollout

Adopt the framework in three phases, with explicit success criteria gating each
expansion.

### Pre-Pilot Readiness Checklist

Before starting Phase 1, confirm minimum readiness. These items operationalize
the [Readiness Assessment](#readiness-assessment) — if any are unchecked,
revisit the assessment for guidance:

- [ ] AI usage policy is documented (approved tools, prohibited data, human
      review expectations)
- [ ] CI/test baseline exists for the pilot project (automated build and core
      tests running on every change)
- [ ] Rollback readiness is defined (owner, trigger, and basic rollback steps
      for pilot deployments)
- [ ] Checkpoint ownership is explicit (who approves gate, quality, deployment,
      and compliance checkpoints)

### Phase 1: Pilot (1 Team, 1–2 Increments)

**Duration:** 4–8 weeks

**Activities:**

1. Pilot team reads the [Quick Start Guide](README.md) and
   [Framework Guide](framework-guide.md)
2. Apply the framework to one project, starting at Initiation
3. Work through stages iteratively, beginning with Human-Led autonomy
4. Capture feedback after each stage and at retrospective

**Success criteria for Phase 2:**

- [ ] Team completed at least one full increment cycle (Increment Design →
      Deployment)
- [ ] Cycle time was comparable to or better than pre-framework baseline
- [ ] Defect escape rate did not increase
- [ ] Team satisfaction survey scores are neutral or positive
- [ ] At least one concrete improvement identified (speed, quality, clarity, or
      documentation)

### Phase 2: Expand (2–3 Teams)

**Duration:** 6–12 weeks

**Activities:**

1. Pilot team shares lessons learned with expanding teams
2. Pilot team members act as mentors or embedded coaches
3. Expanding teams start with the same approach: one Standard-tier project,
   Human-Led autonomy
4. Adjust framework practices based on pilot feedback before expanding

**Success criteria for Phase 3:**

- [ ] All expanding teams completed at least one increment cycle
- [ ] Cross-team patterns documented (what worked, what didn't)
- [ ] Framework practices are consistent across teams (shared understanding of
      tiers, stages, checkpoints)
- [ ] No significant negative impact on delivery velocity or quality

### Phase 3: Standardize (Default for All New Projects)

**Duration:** Ongoing

**Activities:**

1. Establish the framework as the default approach for new projects
2. Create organizational templates and tooling (pre-filled briefs, shared
   checklists)
3. Define organizational tier policies (see below)
4. Build internal training materials based on pilot and expansion experience
5. Assign framework champions per team for ongoing support

**Ongoing governance:**

- Quarterly review of framework effectiveness using
  [adoption metrics](#measuring-adoption-success)
- Annual refresh of organizational tier policies
- Continuous improvement based on retrospective feedback

### Progressing Through Autonomy Tiers

As teams gain experience during rollout, they naturally progress from Human-Led
to Collaborative to AI-Led. The
[AI Autonomy Spectrum](framework-ai-assistance.md#ai-autonomy-spectrum) defines
each tier. Expect this progression:

1. **Human-Led (Weeks 1–4):** Humans set the agenda, direct AI explicitly, and
   review all output closely. AI is a drafting tool.
2. **Collaborative (Weeks 4–12):** Humans and AI share initiative. AI
   proactively suggests approaches; humans evaluate and decide. Trust builds
   through repeated verification.
3. **AI-Led (12+ weeks, high-verifiability stages only):** AI drives execution
   within bounded scope (e.g., generating tests, writing implementation code).
   Humans validate through automated gates and spot checks.

**Important:** Not every stage should reach AI-Led. Low-verifiability stages
like Initiation and System Design should remain Human-Led or Collaborative
regardless of team maturity.

---

## Change Management

### Addressing Resistance

The framework is designed to be non-threatening to engineers — AI is positioned
as an assistant, not a replacement. Common resistance patterns and how to
address them:

| Resistance Pattern                | Response                                |
| --------------------------------- | --------------------------------------- |
| "AI will replace my job"          | Framework explicitly keeps humans in    |
|                                   | control. AI drafts; humans decide.      |
| "AI-generated code is unreliable" | That's exactly why the framework adds   |
|                                   | verification gates. Start Human-Led.    |
| "This is just more process"       | Framework replaces ad-hoc AI usage with |
|                                   | structured usage. Right-size to Minimal |
|                                   | if overhead concerns are valid.         |
| "I don't need a framework to      | Framework adds governance and           |
| use AI"                           | consistency — especially valuable when  |
|                                   | scaling across teams.                   |
| "AI tools change too fast"        | Framework is tool-agnostic. It governs  |
|                                   | the process, not the tool.              |

### Demonstrating Early Wins

Focus on visible, measurable improvements in the first increment:

- **Speed:** Compare cycle time for the pilot increment against team historical
  average
- **Quality:** Track defects found during verification vs. production escapes
- **Documentation:** Show how briefs and checklists create an audit trail that
  didn't exist before
- **Onboarding:** Note how new team members can read briefs and understand
  decisions without tribal knowledge

### Framing AI as an Assistant

Use language consistently across the organization:

- Say "AI-assisted" not "AI-driven" or "AI-automated"
- Say "AI drafts, humans decide" not "AI generates output"
- Say "AI as a productivity tool" not "AI as a replacement"
- Refer to "human validation" not "quality control of AI"

---

## Incremental Adoption

Teams don't have to adopt all 8 stages at once. Start where the return is
highest and the risk is lowest.

### Recommended Adoption Sequence

**Start here (highest ROI, highest verifiability):**

1. **Implementation** — AI code generation with automated test verification.
   Immediate productivity gains.
2. **Verification** — AI test generation with CI validation. Improves coverage
   with low risk.

**Add next (moderate ROI, moderate verifiability):**

3. **Increment Design** — AI-assisted design planning. Improves consistency and
   documentation.
4. **Deployment** — AI-drafted deployment checklists and runbooks. Reduces
   operational errors.

**Add when ready (lower verifiability, higher judgment):**

5. **Requirements** — AI-assisted requirements drafting and ambiguity detection.
   Requires experienced review.
6. **Initiation** — AI-assisted business case development. Broadens who can
   initiate projects.

**Add last (strategic value, requires organizational maturity):**

7. **System Design** — AI-assisted architecture exploration. High impact of
   errors requires strong gates.
8. **Support** — AI-assisted incident response and triage. Requires established
   monitoring infrastructure.

### Partial Adoption Is Valid

A team using the framework for Implementation and Verification only is still
getting value. The framework is designed so each stage works independently — you
don't need Initiation briefs to benefit from structured AI-assisted
implementation.

**Measurement throughline note:** End-to-end traceability — from business
objectives through to production metrics — requires the complete stage sequence.
Partial adoption delivers structured workflows and verification gates without
the full measurement chain. Add Initiation and Requirements stages when
governance reporting and objective traceability become priorities.

---

## Organizational Tier Policies

Instead of leaving risk tier selection to individual teams each time,
organizations can define default tier mappings based on project characteristics.

### Example Tier Policy

| Project Category                  | Default Tier | Override Authority  |
| --------------------------------- | ------------ | ------------------- |
| Internal tools, experiments       | Minimal      | Team lead           |
| Customer-facing features          | Standard     | Engineering manager |
| Financial systems, payments       | Enterprise   | VP Engineering      |
| Healthcare / regulated industry   | Enterprise   | VP Engineering +    |
|                                   |              | Compliance          |
| Infrastructure / platform changes | Standard     | Engineering manager |
| Security-sensitive systems        | Enterprise   | Security lead       |

### Defining Your Policy

1. List your project categories (by domain, customer impact, or regulatory
   exposure)
2. Assign a default tier to each category using the
   [Right-Sizing Guide](right-sizing-guide.md) criteria
3. Define who can override the default (up or down)
4. Document the policy and communicate to all teams
5. Review annually or when regulatory requirements change

---

## Measuring Adoption Success

Track these metrics to evaluate whether framework adoption is delivering value.
See also the
[Framework Guide: Measurement Throughline](framework-guide.md#measurement-throughline)
for project-level measurement guidance.

### Baseline First

Capture metrics for 2 sprints (or 4 weeks) before framework adoption to
establish a meaningful comparison. Without a baseline, you cannot measure
improvement.

**What to capture:**

- Current deployment frequency and lead time
- Recent defect escape rate (production bugs per sprint)
- Current test coverage percentage
- PR review turnaround time
- Team satisfaction (run the 5-question survey before adoption)

### DORA Metrics

The four DORA (DevOps Research and Assessment) metrics are industry-standard
measures of engineering effectiveness. Track these to measure the impact of
AI-assisted development on your engineering operations:

| DORA Metric           | What It Measures               | Target Direction |
| --------------------- | ------------------------------ | ---------------- |
| Deployment frequency  | How often you deploy to        | Increase         |
|                       | production                     |                  |
| Lead time for changes | Time from commit to production | Decrease         |
| Change failure rate   | Percentage of deployments      | Decrease         |
|                       | causing a failure              |                  |
| Mean time to recovery | Time to restore service after  | Decrease         |
| (MTTR)                | a failure                      |                  |

**How to measure:**

- **Deployment frequency:** Count production deployments per week or sprint.
  Source: CI/CD pipeline logs.
- **Lead time:** Measure time from first commit on a branch to production
  deployment. Source: Git + CI/CD timestamps.
- **Change failure rate:** Count deployments that required rollback, hotfix, or
  caused an incident, divided by total deployments. Source: incident tracker +
  deployment logs.
- **MTTR:** Measure time from incident detection to resolution. Source: incident
  tracker.

### Quality Metrics

| Metric             | How to Measure                  | Target             |
| ------------------ | ------------------------------- | ------------------ |
| Defect escape rate | Production bugs per increment   | Decrease over time |
| Rework percentage  | PRs that require significant    | Decrease over time |
|                    | revision after review           |                    |
| Test coverage      | Automated test coverage %       | Increase over time |
| AI code acceptance | % of AI-generated code accepted | Increase as trust  |
| rate               | without major changes           | builds             |

### Productivity Metrics

| Metric               | How to Measure                | Target       |
| -------------------- | ----------------------------- | ------------ |
| Cycle time per       | Time from increment start to  | Stabilize or |
| increment            | deployment                    | decrease     |
| PR review turnaround | Time from PR opened to merged | Decrease     |
| Throughput           | Story points or increments    | Increase     |
|                      | completed per sprint          |              |

### Developer Experience

Run a brief survey (5 questions, 1–5 scale) at each retrospective:

1. "I feel productive using the AI-assisted workflow" (productivity)
2. "I trust the quality of AI-generated output" (trust)
3. "The framework adds value without excessive overhead" (overhead)
4. "I understand when to use AI and when to work manually" (clarity)
5. "I would recommend this approach to other teams" (advocacy)

Track scores over time. Expect scores to improve after the first 2–3 increments
as the team builds familiarity.

**Additional experience metrics:**

- AI tool adoption rate (% of team actively using AI tools daily)
- Confidence in AI output (tracked via survey question 2)

### Framework Overhead

- Time spent on briefs, checklists, and gate decisions as a percentage of sprint
  time
- Should decrease as teams get comfortable (target: <5% of sprint time after 3
  increments)
- If overhead remains >10% after 3 increments, review whether the team is
  over-documenting or using the wrong risk tier

---

## Notes

**Last Updated:** 2026-02-24

_Added to framework in v0.17.0_
