# Initiation Reference (definitions, explanations, examples)

**Last Updated:** 2026-02-08

> **Goal:** Keep Initiation low-friction while still teaching good practices. The Initiation Brief includes only micro-guidance; this reference provides the "why" and examples.

---

## Framework Context

### Where Initiation fits in the SDLC

Initiation is **Stage 1 of 7** in this framework. It is a **foundational stage** executed once per project (but revisitable when circumstances change).

**Stage sequence:**
1. **Initiation** (foundational) — Establish business case, objectives, scope → *you are here*
2. **Requirements** (foundational) — Define functional and non-functional requirements
3. **Design** (foundational + iterative) — Create high-level design (foundational), then detailed design (per increment)
4. **Implementation** (iterative) — Build the solution (per increment)
5. **Verification** (iterative) — Test and validate (per increment)
6. **Deployment** (iterative) — Release to production (per increment)
7. **Support** (continuous) — Maintain and monitor in production

For complete stage definitions, see [STAGES.md](../../STAGES.md).

### Primary Audience

**Primary roles:** Product Managers, Business Analysts (non-technical stakeholders)
**Supporting roles:** Executives, Solutions Architect, Engineers

The language in Initiation artifacts is intentionally **business-focused** rather than technical. This enables non-technical stakeholders to independently initiate and scope projects with AI assistance.

---

## Terms

### Checkpoints (Decision Points)

Throughout the SDLC, various checkpoints ensure quality, alignment, and sound decision-making. The framework defines five types:

1. **Gates** (Investment Decisions) - Real proceed/pivot/stop decisions
2. **Quality Checkpoints** - Ensure standards met (ready/not ready)
3. **Deployment Approvals** - Authorize releases (deploy/hold/rollback)
4. **Alignment Reviews** - Sync stakeholders (aligned/adjust)
5. **Compliance Approvals** - Required sign-offs (approved/remediate)

See [STAGES.md - Decision Points and Checkpoints](../../STAGES.md#decision-points-and-checkpoints) for complete definitions and AI validation guidance.

### Gates (Investment Decisions)

**Gates** are checkpoints with a real option to stop the project. They are **genuine go/no-go decisions** about resource investment.

**In this framework:**
- **Gate 1:** End of Initiation - Approve brief and fund Requirements work? (Investment decision)
- **Gate 2:** End of Requirements + Design (foundational) - Commit to building this? (Build/no-build decision)

**After Gate 2:** The project is funded and team committed. Later checkpoints (staging approval, production deployment, rollout gates) focus on "when/how" rather than "if."

**Gate 3-5 (not true gates, but deployment approvals):**
- **Gate 3:** MVP in staging (deployment approval)
- **Gate 4:** MVP in production (deployment approval)
- **Gate 5:** GA/rollout complete (deployment approval)

Gates align with **exit criteria** in [STAGES.md](../../STAGES.md) but use business-friendly language.

### Requirements (Stage 2)
The stage where you define **what** to build through:
- Functional requirements + acceptance criteria
- Non-functional requirements (performance, security, scalability, etc.)
- Risk retirement (spikes/prototypes/reviews)
- Dependency mapping

**Gate 1** = End of Requirements stage + Design foundational pass.

In other methodologies, this may be called "Discovery," "Analysis," or "Requirements Gathering." This framework uses "Requirements" for clarity.

### Design (Stage 3)
The stage where you define **how** to build it through:
- **Foundational pass** (once per project): High-level architecture, key trade-offs, technology choices
- **Iterative passes** (per increment): Detailed design for specific features/increments

In other methodologies, foundational design may be called "HLD" (High-Level Design) and iterative design "LLD" (Low-Level Design).

### DRI = Directly Responsible Individual
One person accountable for **forward progress and clarity** (not necessarily execution). Benefits:
- Single escalation path
- Reduced coordination overhead
- Clear ownership of decisions and follow-ups

---

## Why these Initiation elements matter

### Problem statement (why + what good looks like)
**Why:** Prevents "solution-first" bias and aligns stakeholders on what's actually wrong.

**Good format:**
> "<User/persona> cannot <do thing> because <constraint/root cause>, resulting in <impact>. Success looks like <metric/outcome>."

**Good example:**
> "Support agents can't reliably find the latest customer context within 30 seconds because conversations are split across tools, increasing handle time and repeat contacts. Success = p90 time-to-context < 30s and repeat-contact rate down 10%."

**Bad example (solution-first):**
> "Build an AI chatbot for support."

### Business case + why now
**Why:** Prioritization requires value and urgency. "Why now" also clarifies cost-of-delay and whether a smaller interim step is warranted.

### Goals + success metrics

**Why:** Metrics are the guardrails that keep delivery honest. If you can't measure success, you can't tell if the effort worked.

**Measurement throughline:** This framework emphasizes **measurable success criteria** that flow through all SDLC stages:
- **Initiation (Stage 1):** Define success metrics
- **Requirements (Stage 2):** Success metrics inform functional and non-functional requirements (e.g., performance targets)
- **Design (Stage 3):** Design instrumentation and measurement approach
- **Implementation (Stage 4):** Implement metrics instrumentation in code
- **Verification (Stage 5):** Validate success criteria in testing
- **Deployment (Stage 6):** Monitor metrics during rollout
- **Support (Stage 7):** Track success criteria in production

**Framework-agnostic approaches:** This framework does not prescribe OKRs, SMART goals, KPIs, or any specific measurement methodology. Use what works for your organization.

**Tip:** Prefer a small set of metrics:
- One outcome metric (customer/business impact)
- One operational metric (latency/errors)
- One adoption metric (usage/coverage), if relevant

### Non-goals (why list them)
**Why:** Non-goals are a boundary contract that prevents scope creep, reduces rework, and improves speed.

**Examples:**
- "No UI redesign in v1."
- "No historical data backfill."
- "No internationalization support."
- "No change to auth model."

### Assumptions
**Why:** Assumptions are hidden scope. Making them explicit exposes uncertainty and improves estimate honesty.

**What to include:** Assumptions that, if false, shift cost/schedule materially:
- External system capabilities/limits
- Data availability/quality
- Security/compliance constraints
- Team availability or required skills

### Risks / unknowns
**Why:** Your estimate range is mostly a function of unknowns. Managing unknowns early prevents catastrophic surprises later.

**Good risk entries include:**
- Impact + likelihood
- A concrete mitigation (spike/prototype/review)
- A fallback path

### Options considered
**Why:** Forces you to compare alternatives and clarify trade-offs (time, complexity, risk, maintainability).

**Minimum bar:** At least one alternative and why it wasn't chosen.

### Range-based estimation (Initiation-level)
**Why ranges:** Early work is uncertain; point estimates create false certainty.

**What to include:**
- A range (e.g., 2–4 weeks) and a confidence label
- The top assumptions driving the range
- The risks that could push the upper bound

**Important:** These are **hypotheses**, not commitments. After the Requirements stage, you'll update estimates with higher confidence.

### Gate 1 (Initiation approval)

**Why:** Gate 1 is the first decision gate—it determines whether your idea has sufficient merit to invest in detailed requirements and design work.

**When:** At the end of Initiation, when the brief is complete.

**Decision based on:** The completed Initiation Brief.

**Typical decision criteria:**
- **Proceed if:** Business case is clear, stakeholders aligned, risks acceptable, sponsor committed
- **Pivot if:** Problem needs refinement, scope adjustment needed, alternative approach warranted
- **Stop if:** No clear business value, costs exceed benefits, better alternatives exist

**If proceeding:** Per [STAGES.md](../../STAGES.md#stage-1-initiation), the Requirements stage receives the Initiation Brief with objectives, measurable success criteria, constraints, and stakeholder list.

### Gate 2 (Requirements complete)

**Why:** Gate 2 is the major "build/no-build" decision—it converts hypotheses into validated plans.

**When:** At the end of Requirements stage + Design foundational pass (Stages 2-3).

**Gate 2 typical outputs:**
- Requirements + acceptance criteria drafted and reviewed
- NFRs captured (functional, performance, security, and others as needed)
- High-level design direction documented (key trade-offs)
- Top risks addressed (with mitigations/fallbacks)
- Slice plan + dependency ordering (for iterative delivery)
- Updated staffing/timeline ranges with higher confidence
- Recommendation: proceed/pivot/stop

**Important:** During Initiation, you can plan ahead for what Gate 2 should include (see brief template section "Planning for future gates"). This helps the Requirements stage know what to produce.

---

## Common pitfalls (and fixes)

- **Pitfall:** Solution-first problem statement
  **Fix:** Re-write in "user can't X because Y → impact Z" form.

- **Pitfall:** No non-goals → scope creep
  **Fix:** Add 3–5 explicit exclusions.

- **Pitfall:** "Requirements stage" becomes "design everything"
  **Fix:** Time-box Requirements work and define Gate 2 outputs; defer detailed design (iterative Design passes) except for high-risk areas.

- **Pitfall:** Early point estimates treated as commitments
  **Fix:** Always label as hypotheses; use ranges + confidence + assumptions.

- **Pitfall:** No measurable success criteria
  **Fix:** Add at least one outcome metric with baseline and target (or target range).

- **Pitfall:** No clear Gate 1 decision criteria
  **Fix:** Define explicit proceed/pivot/stop criteria in the brief (when should stakeholders approve?).

- **Pitfall:** Gate 2 outputs confused with Initiation outputs
  **Fix:** Clarify that Initiation produces the *brief* (Gate 1 output), while Requirements + Design stages produce Gate 2 outputs (requirements, design, slice plan, etc.).

---

## When to expand beyond "minimal"

Expand Initiation only when needed:
- Regulated/compliance-heavy domain
- Large data migrations
- Material security/privacy impact
- Multi-team dependency chain
- Hard external deadlines

Otherwise, keep the Brief concise and move quickly to the Requirements stage.

---

## AI Assistance Guidance

**Autonomy level:** "AI assist only" per [AI_AUTONOMY_SCORECARD.md](../../AI_AUTONOMY_SCORECARD.md)

**Why:** Initiation involves non-technical business decisions that require human judgment, stakeholder alignment, and organizational context that AI cannot provide.

**AI's role:**
- Draft initial brief based on project notes
- Suggest alternatives and trade-offs
- Analyze completeness (run checklist)
- Provide templates and examples

**Human's role:**
- Own all decisions
- Validate correctness
- Approve outputs
- Align stakeholders

**Using the AI agent prompt:** See `initiation-ai-agent-prompt.md` for a modular prompt that references these artifacts by name (avoids duplication and drift).

