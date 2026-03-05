---
id: adoption
type: guide
concerns: [organizational-rollout, readiness-assessment, change-management]
---

# Organizational Adoption Guide

## Overview

Practical guidance for planning and executing an organizational rollout of the
AI-Assisted SDLC framework — from pilot selection through full standardization.

### Why Organizational Adoption Matters

The framework is designed for per-project use, but organizational adoption
requires additional planning: which team goes first, how to measure success, how
to handle resistance, and when to expand. Without a deliberate rollout strategy,
teams adopt inconsistently — some over-invest in process, others skip governance
entirely — and leadership loses the visibility that makes the framework
valuable.

### Purpose

- Provide a structured rollout path from pilot through standardization
- Define readiness criteria, success metrics, and expansion gates
- Address change management and resistance patterns specific to AI adoption

### Key Principle

You don't need to adopt all 8 stages at once. Start with the stages that offer
the highest return and lowest risk, then expand as confidence grows.

### How to Use This Guide

1. Complete the [**Readiness Assessment**](#readiness-assessment) to determine
   whether to adopt now, try a limited pilot, or defer
2. Review [**Measuring Adoption Success**](#measuring-adoption-success) to
   establish baselines before starting
3. Follow the [**Phased Rollout**](#phased-rollout) sequence: Pilot → Expand →
   Standardize

- For governance model and business value framing, see the
  [README](../README.md#business-value)

---

## Readiness Assessment

Before selecting a pilot, assess whether your organization is ready to adopt
now, try a limited pilot first, or defer briefly to close specific gaps.

### Adopt Now

Your organization is ready for a full pilot if:

- Teams already use or are evaluating AI coding assistants
- You want structure instead of ad-hoc AI adoption
- You need governance guardrails for AI-assisted development
- You want non-technical stakeholders to initiate projects

### Try First (Limited Pilot)

Start with a single team and one increment if:

- You have an AI usage policy but limited practical experience
- Only one or two teams have used AI tools — others are curious but untested
- Leadership supports experimentation but hasn't committed to broader adoption

A limited pilot builds the evidence base for a wider rollout decision.

### Defer Briefly

Pause adoption to close these gaps first. The first two are typically resolvable
in days, not months. The third takes longer but is equally important.

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
[AI-Specific Policies](framework.md#ai-specific-policies) checklist in the
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

**Broad organizational resistance to AI tools**

Individual skepticism — an engineer who doubts AI code quality or worries about
added process — is normal and addressable. The
[Managing Change During Expansion](#managing-change-during-expansion) section
covers common resistance patterns. But when resistance is widespread across the
engineering organization, it signals something different: a trust gap between
leadership and teams that no framework can bridge on its own.

Signs of organizational resistance:

- Engineers broadly view AI adoption as a threat to their roles or autonomy
- AI initiatives are seen as top-down mandates rather than team-supported
  improvements
- Previous technology or process rollouts failed due to lack of buy-in
- Teams comply with the letter of new processes but not the spirit (filling in
  templates without engaging with the content)

**Why it matters:** Adopting the framework into a resistant organization
produces malicious compliance rather than genuine engagement. Teams go through
the motions — completing briefs, attending gates — without honestly evaluating
AI output or providing the feedback that makes the framework effective. The
pilot appears to succeed on paper but fails to build the trust and experience
needed for expansion.

**What to do first:**

1. **Listen before prescribing.** Run listening sessions or anonymous surveys to
   understand the specific concerns. Resistance usually has legitimate roots —
   job security fears, bad experiences with previous tooling mandates, or
   concerns about code quality and professional standards.
2. **Create voluntary exposure.** Give interested engineers access to AI tools
   without requiring adoption. Let early results speak for themselves. Teams
   that choose to experiment are far better pilot candidates than teams that are
   assigned to one.
3. **Address the real concern.** If the root is job security, leadership needs
   to communicate clearly about AI's role (augmentation, not replacement) — and
   back that up with actions, not just messaging. If the root is quality
   concerns, point to the framework's verification gates and Human-Led mode as
   evidence that those concerns are taken seriously.
4. **Find willing teams first.** A successful pilot with a willing team builds
   organizational evidence that skeptics can evaluate on their own terms.
   Forcing a pilot on a resistant team risks confirming their fears.

**Further reading:** Resistance to AI adoption shares patterns with broader
technology change management. Kotter's 8-step change model and the ADKAR
framework (Awareness, Desire, Knowledge, Ability, Reinforcement) both offer
structured approaches to building organizational readiness. The key principle
across all models: sustainable adoption requires genuine buy-in, not mandated
compliance.

### Codebase Readiness (Brownfield)

Organizational readiness covers people, policy, and process. For brownfield
projects, **codebase readiness** also matters — the state of the existing
codebase affects how quickly teams can start AI-assisted feature work.

Use the [Brownfield Readiness Guide](brownfield-readiness.md#readiness-rubric)
to score the codebase across six axes and determine the readiness tier.

- **T5 Ready / T4 Approachable** — Proceed with standard discovery increment
- **T3 Constrained** — Factor targeted preparation into timeline
- **T2 Challenging / T1 Entrenched** — Consider treating the enablement program
  as the adoption pilot (see
  [Brownfield Preparation as a Pilot](#brownfield-preparation-as-a-pilot))
- **T0 Rebuild** — Flag for strategic evaluation before committing to
  AI-assisted modification

---

## Measuring Adoption Success

Track these metrics to evaluate whether framework adoption is delivering value.
See also the
[Framework Guide: Measurement Throughline](framework.md#measurement-throughline)
for project-level measurement guidance.

### Baseline First

Capture metrics for 2 increments (or 4 weeks) before framework adoption to
establish a meaningful comparison. Without a baseline, you cannot measure
improvement.

**What to capture:**

- Current deployment frequency and lead time
- Recent defect escape rate (production bugs per increment)
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

- **Deployment frequency:** Count production deployments per week or increment.
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
|                      | completed per increment       |              |

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

- Time spent on briefs, checklists, and gate decisions as a percentage of
  increment time
- Should decrease as teams get comfortable (target: <5% of increment time after
  3 increments)
- If overhead remains >10% after 3 increments, review whether the team is
  over-documenting or using the wrong risk tier

---

## Phased Rollout

Adopt the framework in three phases, with explicit success criteria gating each
expansion.

### Phase 1: Pilot (1 Team, 1–2 Increments)

**Duration:** 4–8 weeks

#### Selecting Your Pilot Team

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
- Cross-functional representation — includes engineers, QA, a project
  coordinator or delivery lead, and ideally a PM or BA

**Avoid for pilot:**

- Teams in crisis mode or under heavy delivery pressure
- Teams with no automated testing or CI/CD pipeline
- Teams strongly opposed to AI adoption (address resistance first)

#### Selecting Your Pilot Project

**Good pilot project characteristics:**

- **Greenfield or well-documented brownfield preferred** — avoids the complexity
  of undocumented legacy constraints during initial adoption. Most organizations
  will pilot on brownfield because that's where their work is — this is viable
  when informed by a
  [readiness assessment](brownfield-readiness.md#readiness-rubric)
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

#### Brownfield Preparation as a Pilot

When a brownfield codebase needs significant preparation, the preparation
project itself can serve as the adoption pilot. The team builds framework
fluency on familiar code while producing immediately valuable outputs (tests,
documentation, dependency maps). See the
[Brownfield Preparation Guide](brownfield-preparation.md#preparation-as-adoption-pilot)
for the full approach, rationale, and sequencing guidance.

#### Pre-Pilot Readiness Checklist

Before starting the pilot, confirm minimum readiness. These items operationalize
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

#### Executing the Pilot

1. Pilot team reads the [README](../README.md) and
   [Framework Guide](framework.md)
2. Apply the framework to one project, starting at Initiation
3. Work through stages iteratively, beginning in Human-Led mode
4. Capture feedback after each stage and at retrospective

#### Success Criteria for Phase 2

- [ ] Team completed at least one full increment cycle (Increment Design →
      Deployment)
- [ ] Cycle time was comparable to or better than pre-framework baseline
- [ ] Defect escape rate did not increase
- [ ] Team satisfaction survey scores are neutral or positive
- [ ] At least one concrete improvement identified (speed, quality, clarity, or
      documentation)

### Phase 2: Expand (2–3 Teams)

**Duration:** 6–12 weeks

#### Expansion Activities

1. Pilot team shares lessons learned with expanding teams
2. Pilot team members act as mentors or embedded coaches
3. Expanding teams start with the same approach: one Standard-tier project,
   Human-Led mode
4. Adjust framework practices based on pilot feedback before expanding

#### Managing Change During Expansion

Expansion is when resistance from non-pilot teams typically surfaces. The
framework is designed to be non-threatening — AI is positioned as an assistant,
not a replacement — but teams encountering it for the first time may still have
concerns.

##### Addressing Resistance

Common resistance patterns and how to address them:

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

##### Demonstrating Early Wins

Focus on visible, measurable improvements from the pilot to build confidence in
expanding teams:

- **Speed:** Compare cycle time for the pilot increment against team historical
  average
- **Quality:** Track defects found during verification vs. production escapes
- **Documentation:** Show how briefs and checklists create an audit trail that
  didn't exist before
- **Onboarding:** Note how new team members can read briefs and understand
  decisions without tribal knowledge

##### Framing AI as an Assistant

Use language consistently across the organization:

- Say "AI-assisted" not "AI-driven" or "AI-automated" (exception: "AI-automated"
  is acceptable for CI pipeline tasks that run without human interaction, such
  as security scanning and dependency checks)
- Say "AI drafts, humans decide" not "AI generates output"
- Say "AI as a productivity tool" not "AI as a replacement"
- Refer to "human validation" not "quality control of AI"

#### Progressing Through Autonomy Tiers

As teams gain experience during rollout, they naturally progress from Human-Led
to Collaborative to AI-Led. The
[AI Autonomy Spectrum](ai-assistance.md#ai-autonomy-spectrum) defines each tier.
Expect this progression:

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

#### Success Criteria for Phase 3

- [ ] All expanding teams completed at least one increment cycle
- [ ] Cross-team patterns documented (what worked, what didn't)
- [ ] Framework practices are consistent across teams (shared understanding of
      tiers, stages, checkpoints)
- [ ] No significant negative impact on delivery velocity or quality

### Phase 3: Standardize (Default for All New Projects)

**Duration:** Ongoing

#### Standardization Activities

1. Establish the framework as the default approach for new projects
2. Create organizational templates and tooling (pre-filled briefs, shared
   checklists)
3. Build internal training materials based on pilot and expansion experience
4. Assign framework champions per team for ongoing support

#### Stage Adoption Sequence

Teams don't have to adopt all 8 stages at once. Start where the return is
highest and the risk is lowest.

> **Note:** This sequence describes which stages to introduce to your
> organization first — not the order a project executes them. Individual
> projects still start at Initiation and follow the stage sequence described in
> the [Stage Overview](../README.md#stage-overview).

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

**Partial adoption is valid.** A team using the framework for Implementation and
Verification only is still getting value. The framework is designed so each
stage works independently — you don't need Initiation briefs to benefit from
structured AI-assisted implementation.

**Measurement throughline note:** End-to-end traceability — from business
objectives through to production metrics — requires the complete stage sequence.
Partial adoption delivers structured workflows and verification gates without
the full measurement chain. Add Initiation and Requirements stages when
governance reporting and objective traceability become priorities.

#### Organizational Tier Policies

Instead of leaving risk tier selection to individual teams each time,
organizations can define default tier mappings based on project characteristics.

##### Example Tier Policy

| Project Category                  | Default Tier | Override Authority  |
| --------------------------------- | ------------ | ------------------- |
| Internal tools, experiments       | Minimal      | Team lead           |
| Customer-facing features          | Standard     | Engineering manager |
| Financial systems, payments       | Enterprise   | VP Engineering      |
| Healthcare / regulated industry   | Enterprise   | VP Engineering +    |
|                                   |              | Compliance          |
| Infrastructure / platform changes | Standard     | Engineering manager |
| Security-sensitive systems        | Enterprise   | Security lead       |

##### Defining Your Policy

1. List your project categories (by domain, customer impact, or regulatory
   exposure)
2. Assign a default tier to each category using the
   [Right-Sizing Guide](right-sizing.md) criteria
3. Define who can override the default (up or down)
4. Document the policy and communicate to all teams
5. Review annually or when regulatory requirements change

#### Ongoing Governance

- Quarterly review of framework effectiveness using
  [adoption metrics](#measuring-adoption-success)
- Annual refresh of organizational tier policies
- Continuous improvement based on retrospective feedback

---

## Notes

**Last Updated:** 2026-03-05

Added to framework in v0.17.0.
