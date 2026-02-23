# Quick Start Guide

> A brief overview of the AI-Assisted SDLC framework — what it is, who it's for,
> and how to get started.

---

## What Is This Framework?

The AI-Assisted SDLC framework is a lightweight, practical guide for integrating
AI assistance into software development. It helps both technical and
non-technical stakeholders work through every stage of a project — from initial
idea to production support. AI acts as an assistant, not a replacement: humans
always control the process and validate all AI output.

## Why This Framework?

Most teams adopting AI for software development face the same problem: AI tools
are powerful but unstructured. Without clear guidance on where AI adds value and
where humans must stay in control, teams either over-rely on AI (introducing
risk) or under-use it (leaving productivity on the table).

The AI-Assisted SDLC framework solves this by providing a stage-by-stage
playbook that tells your team exactly how to use AI at each phase of development
— from business case through production support. The result: faster delivery,
consistent quality, and a clear governance model that satisfies both engineers
and leadership.

## Who Is It For?

- **Engineers** — especially those new to AI-assisted workflows or AI tools
- **Product Managers and Business Analysts** — who need to initiate and plan
  projects without deep technical expertise
- **Any organization** seeking a structured, practical approach to AI-assisted
  software development

**Find your starting point:**

- **Engineering leaders** evaluating adoption → [Adoption Path](#adoption-path)
- **Practitioners** (engineers, PMs, BAs) starting a project →
  [Get Started](#get-started)
- **Executives** making an investment decision →
  [Governance at a Glance](#governance-at-a-glance)

## Is This Framework Right for You?

**Good fit if:**

- Your teams already use or are evaluating AI coding assistants
- You want a structured approach rather than ad-hoc AI adoption
- You need governance guardrails for AI-assisted development
- You want non-technical stakeholders to initiate projects without requiring
  deep technical expertise

**Consider deferring if:**

- Your organization has no AI usage policy (establish one first)
- Teams have zero experience with AI tools (start with training)

**Recommended pilot:** Apply the framework to one Standard-tier project
(moderate risk, existing CI/CD) through two increments. Evaluate cycle time,
defect rate, and team satisfaction before broader rollout.

## Get Started

**For practitioners (engineers, PMs, BAs):**

1. Copy the bootstrap prompt from the
   [Manual Process Guide](framework-manual-process.md#bootstrap-prompt-template)
   and fill in your project details
2. Start with the [Initiation stage](initiation/) — use the guide, brief
   template, and checklist
3. When you need deeper context, consult the
   [Framework Guide](framework-guide.md)

**For executives and decision-makers:**

1. Read [Business Case for Adoption](#business-case-for-adoption) for the
   business case
2. Review [Governance at a Glance](#governance-at-a-glance) to understand
   decision points
3. See [Is This Framework Right for You?](#is-this-framework-right-for-you) to
   evaluate fit
4. Share this Quick Start with your team leads

## Business Case for Adoption

| Dimension          | Without Framework            | With Framework                  |
| ------------------ | ---------------------------- | ------------------------------- |
| Project initiation | Requires technical expertise | Any stakeholder with an idea    |
| Requirements       | Manual drafting, ambiguity   | AI-drafted, ambiguity detected  |
| Implementation     | Developer writes all code    | AI generates, developer reviews |
| Testing            | Manual test creation         | AI generates, CI validates      |

**Where to start:** Implementation and Verification stages offer the highest
verifiability and fastest payback. Begin there if your team already has CI/CD
pipelines.

## Adoption Path

**Onboarding effort:** A single team can start in 1–2 days by reading this Quick
Start and beginning with the Initiation stage. No tooling installation or
infrastructure changes are required.

**Phased rollout (recommended):**

1. **Weeks 1–2:** Pilot team reads Quick Start and
   [Framework Guide](framework-guide.md), applies the framework to one project
   starting at Initiation
2. **Weeks 3–6:** Team works through stages iteratively, adjusting AI autonomy
   tiers based on confidence
3. **Weeks 7–8:** Retrospective; decide whether to expand to additional teams
   based on pilot metrics

**Change management:** The framework is designed to be non-threatening to
engineers — AI is positioned as an assistant, not a replacement. Start with
Human-Led autonomy to build trust, then evolve to Collaborative as confidence
grows. See the [AI Autonomy Spectrum](framework-ai-assistance.md) for the
progression model.

## The 8 Stages at a Glance

<!-- Keep this table in sync with framework-guide.md and framework-stages.md -->

| #   | Stage            | Primary Role          | Pattern      | Purpose                                                                   |
| --- | ---------------- | --------------------- | ------------ | ------------------------------------------------------------------------- |
| 1   | Initiation       | PM / BA               | Foundational | Establish business case with measurable success criteria                  |
| 2   | Requirements     | BA / PM               | Foundational | Define testable requirements with acceptance criteria                     |
| 3   | System Design    | Engineers / Architect | Foundational | Establish or assess system architecture and technical approach            |
| 4   | Increment Design | Engineers             | Iterative    | Plan implementation approach AND test strategy for increment              |
| 5   | Implementation   | Engineers             | Iterative    | Execute implementation plan from Increment Design                         |
| 6   | Verification     | QA / Engineers        | Iterative    | Execute test strategy from Increment Design, validate acceptance criteria |
| 7   | Deployment       | DevOps / Engineers    | Iterative    | Release to production                                                     |
| 8   | Support          | Engineers / DevOps    | Continuous   | Monitor, maintain, and enhance                                            |

**Foundational** stages run once per project (revisitable if scope changes).
**Iterative** stages repeat for each increment (epic, sprint, milestone).
**Continuous** stages are ongoing after first deployment. Greenfield and
first-brownfield projects add a conditional Increment 0 before feature delivery
— see the [Framework Guide](framework-guide.md#greenfield-vs-brownfield) for
details.

## How AI Fits In

AI assistance increases as verifiability increases. Early stages (like
Initiation) use AI for drafting and brainstorming with close human oversight.
Later stages (like Implementation and Verification) allow higher AI autonomy
because outputs are directly testable. Within each stage, teams choose an
autonomy tier — Human-Led, Collaborative, or AI-Led — that adjusts who drives
the process while humans always validate results. See the
[AI Assistance Scorecard](framework-ai-assistance.md) for full definitions and
guidance.

## Right-Size to Your Project

Not every project needs the same level of formality. The framework offers three
risk tiers — **Minimal** (low risk), **Standard** (moderate), and **Enterprise**
(high risk) — that determine what practices you adopt. Team size then determines
how formally you apply them: a solo developer still follows the stages but with
lighter documentation and self-checkpoints. See the
[Right-Sizing Guide](right-sizing-guide.md) for the full model.

## Governance at a Glance

The framework has two investment gates where a project can be stopped:

| Gate   | When                                | Decision                       |
| ------ | ----------------------------------- | ------------------------------ |
| Gate 1 | End of Initiation                   | Fund requirements work? (Y/N)  |
| Gate 2 | End of Requirements + System Design | Commit to building this? (Y/N) |

After Gate 2, the project is funded. Subsequent checkpoints govern quality,
deployment timing, and compliance — not whether to continue.

**Compliance and security reviews** can be inserted as gates within stages
(e.g., after Design or before Deployment) without adding new stages. See
[Checkpoint Taxonomy](framework-guide.md#checkpoint-taxonomy) in the Framework
Guide.

---

## Notes

**Framework Version:** 0.19.0

**Last Updated:** 2026-02-22

Added to framework in v0.17.0.


