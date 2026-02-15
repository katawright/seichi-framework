# Requirements Guide

**Last Updated:** 2026-02-14

> Stage-specific guidance for Requirements. For cross-cutting framework
> concepts, see [framework-guide.md](../framework-guide.md).

---

## Quick Reference

**Purpose:** Convert business objectives from Initiation into testable
requirements that enable coherent design, accurate test planning, and reduced
rework from ambiguity.

**Primary roles:** Business Analysts, Product Managers

**Execution pattern:** Foundational (once per project, revisitable)

**Key inputs:** Initiation Brief (objectives, success metrics, constraints)

**Key outputs:** Requirements Document (FRs, ACs, NFRs, prioritization)

**Handoff:** Design stage receives Requirements Document

**What good looks like:**

- FRs are behavior-focused and testable
- ACs are objective and observable (Given/When/Then)
- NFRs include observability for success metrics
- MoSCoW priorities assigned (see
  [Framework Guide: MoSCoW](../framework-guide.md#moscow-prioritization))
- Edge cases and data constraints documented

**Common pitfalls:**

- Requirements describe UI/implementation, not behavior
- Acceptance criteria are subjective ("works well")
- "Everything is Must Have" — no real prioritization
- NFRs added late, causing architecture rework
- No observability NFRs for success metrics
- Data/integration constraints ignored
- Requirements not reviewed by engineering
- Edge cases discovered during testing

**Checkpoint:** Alignment Reviews throughout; feeds Gate 2 — see
[Framework Guide: Checkpoints](../framework-guide.md#checkpoint-taxonomy)

**AI autonomy:** AI assist only — see
[Framework Guide: AI Autonomy](../framework-guide.md#ai-autonomy-overview)

---

## Primary Audience

**Primary roles:** Business Analysts, Product Managers **Supporting roles:**
Engineers, Architects, QA Engineers

The language in Requirements artifacts is intentionally **business-focused with
technical precision** — accessible to non-technical stakeholders while rigorous
enough for engineering teams to design and test against.

---

## Terms

### Functional Requirement (FR)

**Definition:** A statement of required system behavior describing what the
system must do.

**Format:** "The system shall..." or "As a <user>, I can <action> so that
<value>."

**Key characteristics:**

- Testable (can be validated in Verification stage)
- Behavior-focused (what, not how)
- Unambiguous (single interpretation)
- Traceable (unique identifier like FR-1, FR-2)

**Good examples:**

- "The system shall allow support agents to search by customer phone number and
  display conversation history within 2 seconds."
- "As a support agent, I can filter conversation history by date range so that I
  can focus on recent interactions."

**Bad examples (and why):**

- "Add a search page." — Too vague, not testable
- "Make search fast." — Not measurable, subjective
- "Use React for the UI." — Implementation detail

### Acceptance Criteria (AC)

**Definition:** Objective, observable criteria that define "done" for a
requirement.

**Format:** Often uses "Given/When/Then" structure or specifies measurable
conditions.

**Key characteristics:**

- Objective (no subjective judgments)
- Observable (can be detected/measured)
- Testable (can validate pass/fail)
- Complete (covers normal and edge cases)

**Good examples:**

- "Given an agent enters a valid 10-digit phone number, when they submit the
  search, then the system returns results within 2 seconds and displays the most
  recent message timestamp."
- "Given Tool B API is unavailable, when an agent searches, then the system
  displays Tool A data only with a 'Tool B temporarily unavailable' banner."

**Bad examples (and why):**

- "Search works well." — Subjective, not observable
- "Users are happy with performance." — Not measurable
- "The system is fast." — No specific threshold

### Non-Functional Requirement (NFR)

**Definition:** A quality attribute or constraint that shapes design, testing,
and user experience but doesn't describe specific functionality.

**Categories:**

- **Performance:** Latency, throughput, response time
- **Reliability:** Availability, error budgets, fault tolerance
- **Security:** Authentication, authorization, data protection, audit
- **Scalability:** Load capacity, growth projections, concurrency
- **Usability:** Accessibility, learnability, error recovery
- **Observability:** Logging, metrics, traces, SLOs
- **Compliance:** Regulatory requirements, data retention, privacy

**Key principle:** Include only NFRs that materially affect architecture
decisions, testing plans, or risk.

**Good examples:**

- "Search results: p95 < 2s, p99 < 5s under 500 req/min load."
- "99.9% uptime during business hours (8am-8pm ET)."
- "Agent must be authenticated; PII redacted in logs; access audit trail
  retained for 90 days."

**Bad examples (and why):**

- "The system should be fast." — Not measurable
- "Code should be maintainable." — Implementation concern
- "Use microservices architecture." — Design decision

### MoSCoW Prioritization

This framework uses MoSCoW for coarse prioritization at the Requirements stage.
For full definitions and how priorities map to increments, see
[Framework Guide: MoSCoW Prioritization](../framework-guide.md#moscow-prioritization).

**In practice at Requirements stage:**

- **Must Have** = minimum set for first usable release
- **Should Have** = committed for future releases
- **Could Have** = opportunistic, not committed
- **Won't Have** = explicit exclusions (non-goals)

**Tip:** When in doubt, start with Should Have or Could Have; you can always
promote requirements later.

---

## Why These Requirements Elements Matter

### Context (Section 1)

**Why:** Provides quick orientation — what triggered this work, where it sits in
the roadmap, and how it connects to Initiation.

### Users / personas (Section 2)

**Why:** Keeps requirements user-centered and helps identify different
needs/workflows.

**Tip:** Carry forward from Initiation Brief; add detail about user workflows
and pain points.

### Problem to solve (Section 3)

**Why:** Prevents solution-first bias and provides context for why these
requirements exist. Carried forward from Initiation for traceability.

### Goals and success metrics (Section 4)

**Why:** Success metrics from Initiation establish the measurement throughline
(see
[Framework Guide: Measurement Throughline](../framework-guide.md#measurement-throughline)).

**Your role in Requirements:** Translate success metrics into NFRs:

- Performance target (e.g., "p90 < 30s") → latency NFR
- Outcome metric (e.g., "repeat contacts down 10%") → observability NFR
- Adoption metric (e.g., "80% daily usage") → FR for usage tracking

### Scope baseline (Section 5)

**Why:** Explicit MoSCoW prioritization and out-of-scope boundaries prevent
scope creep, focus design efforts, and enable faster trade-off decisions.

### Functional requirements (Section 6)

**Why:** FRs define **what** the system must do. Testable FRs enable objective
validation in Verification stage.

**Format:** Numbered (FR-1, FR-2) for traceability. **Tip:** Each FR should pass
the "testability test" — can QA write a test case for this?

### Acceptance criteria (Section 7)

**Why:** ACs define "done" for each requirement and prevent subjective debates
during testing.

**Format:** Given/When/Then or measurable conditions. **Common mistake:**
Subjective ACs like "fast" or "works well." Add measurable thresholds instead.

### Non-functional requirements (Section 8)

**Why:** NFRs shape architecture decisions, testing strategy, and user
experience. Capturing them early prevents late surprises.

**Observability is critical:** Translate success metrics into instrumentation
requirements. Example:

- Success metric: "p90 time-to-context < 30s"
- Observability NFR: "Log search latency (p50/p90/p99); alert if p95 exceeds 3s"

### Data and integrations (Section 9)

**Why:** Many schedule slips come from unexamined data/integration constraints
(rate limits, SLAs, data ownership, retention policies).

### Edge cases and error handling (Section 10)

**Why:** Edge cases often drive significant design complexity. Documenting
expected behavior early prevents rework.

### Open questions (Section 11)

**Why:** Unresolved questions block Design work. Flag blockers vs. nice-to-know;
resolve blockers before declaring requirements ready.

### Requirements readiness (Section 12)

**Why:** Quality checkpoint confirming requirements are ready to guide Design
work.

**Ready when:**

- FRs have objective ACs
- NFRs captured (including observability)
- Stakeholders aligned (reviews complete)
- Open questions resolved or mitigated

### Gate 2 planning (Section 13)

**Why:** Helps plan ahead for what Design should produce to enable the
build/no-build decision. See
[Framework Guide: Checkpoints](../framework-guide.md#checkpoint-taxonomy) for
Gate 2 details.

---

## Common Pitfalls (and Fixes)

- **Requirements describe UI, not behavior** "Add a search box in the top-right
  corner." → Rewrite as behavior: "The system shall allow agents to search by
  customer phone number."

- **Acceptance criteria are subjective** "Search is fast and works well." → Add
  observable signals: "Results in <2s (p95); displays most recent timestamp."

- **"Everything is Must Have"** All 30 requirements marked Must Have. → Force
  prioritization; Must Have is the minimum usable set.

- **NFRs added late** Performance requirements discovered in staging. → Capture
  performance, security, scalability NFRs early.

- **No observability NFRs** Success metrics defined but no instrumentation
  requirements. → Add observability NFRs for each success metric.

- **Data/integration constraints ignored** Design discovers API rate limit
  requiring caching. → Document rate limits, SLAs, data ownership early.

- **Requirements not reviewed by engineering** Technical infeasibility
  discovered late. → Conduct alignment reviews with engineering.

- **Edge cases discovered during testing** "Customer has multiple phone numbers"
  — no expected behavior documented. → Document top edge cases early.

---

## When to Expand Beyond Minimal

Expand Requirements only when needed:

- **Regulated / compliance-heavy:** Add control requirements, compliance
  sign-off, regulatory constraints
- **Complex data migrations:** Add data mapping, transformation rules, migration
  success criteria
- **Multi-team interface work:** Add interface contracts, API schemas,
  cross-team SLAs
- **High availability / performance:** Add detailed SLOs, load assumptions,
  fault tolerance specs
- **Security-sensitive:** Add threat model, auth/authz requirements,
  audit/monitoring requirements

Otherwise, keep Requirements concise and move to Design stage.

---

## When to Revisit Requirements

Requirements is a foundational stage but revisitable when circumstances change:

**Triggers:**

- Design reveals better approach (pivot decision)
- Business priorities shift or new constraints emerge
- Technical infeasibility discovered
- Stakeholder feedback indicates misalignment
- Compliance or regulatory changes
- Major architectural or platform change

**Process:**

1. Update Requirements Document with changes
2. Conduct alignment review with stakeholders
3. Re-run requirements-checklist.md to verify readiness
4. Update Design artifacts to reflect changes
5. Assess impact on schedule/scope/risk

---

## AI Assistance Guidance

**Autonomy level:** AI assist only — see
[AI Autonomy Scorecard](../../AI_AUTONOMY_SCORECARD.md)

**Why:** Requirements involve business judgment, stakeholder alignment, and
domain knowledge that AI cannot independently verify.

**AI's role:**

- Draft requirements from Initiation Brief
- Suggest acceptance criteria and NFRs
- Identify potential edge cases
- Analyze completeness (run checklist)

**Human's role:**

- Own all decisions
- Validate with stakeholders (alignment reviews)
- Approve outputs
- Ensure accuracy and testability
- Resolve ambiguities and conflicts

**Critical validation points:**

1. Do FRs accurately reflect stakeholder needs?
2. Are ACs objective and testable?
3. Did AI identify the right NFRs and constraints?
4. Are priorities aligned with business goals?
5. Are edge cases comprehensive?

**Using the AI agent prompt:** See `requirements-ai-agent-prompt.md` for a
modular prompt that references these artifacts by name.

---

## Notes

Added to framework in v0.3.0.
