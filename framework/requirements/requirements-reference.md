# Requirements Reference (definitions, explanations, examples)

**Last Updated:** 2026-02-09

> **Goal:** Keep Requirements practical while teaching good practices. The Requirements Brief template includes micro-guidance; this reference provides the "why," definitions, and examples.

---

## Framework Context

### Where Requirements fits in the SDLC

Requirements is **Stage 2 of 7** in this framework. It is a **foundational stage** executed once per project (but revisitable when circumstances change or new requirements emerge).

**Stage sequence:**
1. **Initiation** (foundational) — Establish business case, objectives, scope
2. **Requirements** (foundational) — Define functional and non-functional requirements → *you are here*
3. **Design** (foundational + iterative) — Create high-level design (foundational), then detailed design (per increment)
4. **Implementation** (iterative) — Build the solution (per increment)
5. **Verification** (iterative) — Test and validate (per increment)
6. **Deployment** (iterative) — Release to production (per increment)
7. **Support** (continuous) — Maintain and monitor in production

**Requirements stage purpose:** Convert business objectives from Initiation into testable requirements that enable coherent design decisions, accurate test planning, and reduced rework from ambiguity.

**Inputs:** Initiation Brief (with objectives, success metrics, constraints)
**Outputs:** Requirements Document (FRs, ACs, NFRs, prioritization)
**Handoff:** Design stage receives Requirements Document to architect the solution

For complete stage definitions, see [STAGES.md](../../STAGES.md).

### Primary Audience

**Primary roles:** Business Analysts, Product Managers
**Supporting roles:** Engineers, Architects, QA Engineers

The language in Requirements artifacts is intentionally **business-focused with technical precision** — accessible to non-technical stakeholders while rigorous enough for engineering teams to design and test against.

---

## Terms

### Functional Requirement (FR)

**Definition:** A statement of required system behavior describing what the system must do.

**Format:** "The system shall..." or "As a <user>, I can <action> so that <value>."

**Key characteristics:**
- Testable (can be validated in Verification stage)
- Behavior-focused (what, not how)
- Unambiguous (single interpretation)
- Traceable (unique identifier like FR-1, FR-2)

**Good examples:**
- "The system shall allow support agents to search by customer phone number and display conversation history within 2 seconds."
- "As a support agent, I can filter conversation history by date range so that I can focus on recent interactions."
- "The system shall display the source tool (Tool A or Tool B) for each message with a visible indicator."

**Bad examples (and why):**
- "Add a search page." → Too vague, not testable, solution-first
- "Make search fast." → Not measurable, subjective
- "Use React for the UI." → Implementation detail, not a requirement

### Acceptance Criteria (AC)

**Definition:** Objective, observable criteria that define "done" for a requirement.

**Format:** Often uses "Given/When/Then" structure or specifies measurable conditions.

**Key characteristics:**
- Objective (no subjective judgments)
- Observable (can be detected/measured)
- Testable (can validate pass/fail)
- Complete (covers normal and edge cases)

**Good examples:**
- "Given an agent enters a valid 10-digit phone number, when they submit the search, then the system returns results within 2 seconds and displays the most recent message timestamp."
- "Given a customer has messages in both Tool A and Tool B, when the agent views conversation history, then messages appear in chronological order regardless of source tool."
- "Given Tool B API is unavailable, when an agent searches, then the system displays Tool A data only with a 'Tool B temporarily unavailable' banner."

**Bad examples (and why):**
- "Search works well." → Subjective, not observable
- "Users are happy with performance." → Not measurable, vague
- "The system is fast." → No specific threshold

### Non-Functional Requirement (NFR)

**Definition:** A quality attribute or constraint that shapes design, testing, and user experience but doesn't describe specific functionality.

**Categories:**
- **Performance:** Latency, throughput, response time
- **Reliability:** Availability, error budgets, fault tolerance
- **Security:** Authentication, authorization, data protection, audit
- **Scalability:** Load capacity, growth projections, concurrency
- **Usability:** Accessibility, learnability, error recovery
- **Observability:** Logging, metrics, traces, SLOs
- **Compliance:** Regulatory requirements, data retention, privacy

**Key principle:** Include only NFRs that materially affect architecture decisions, testing plans, or risk.

**Good examples:**
- "Search results: p95 < 2s, p99 < 5s under 500 req/min load."
- "99.9% uptime during business hours (8am-8pm ET)."
- "Agent must be authenticated; PII redacted in logs; access audit trail retained for 90 days."
- "Log search latency (p50/p90/p99) and track repeat-contact rate metric."

**Bad examples (and why):**
- "The system should be fast." → Not measurable
- "Code should be maintainable." → Implementation concern, not requirement
- "Use microservices architecture." → Design decision, not requirement

### MoSCoW Prioritization (Must Have / Should Have / Could Have / Won't Have)

**Definition:** A four-tier prioritization scheme based on the MoSCoW method that reduces debate and enables incremental delivery.

**MoSCoW methodology:**

The MoSCoW method is an industry-standard prioritization technique:
- **M**ust have - Critical requirements without which the solution is not viable
- **S**hould have - Important requirements that add significant value and are committed for delivery
- **C**ould have - Desirable requirements if time and resources allow (not committed)
- **W**on't have (this time) - Requirements explicitly excluded from this project scope

This framework uses the **full MoSCoW method** at the Requirements stage for coarse prioritization before increment boundaries are known.

**Must Have:** Requirements critical for the first usable release. Without these, the solution cannot deliver core value or validate key hypotheses. These represent the minimum threshold for viability.

**Should Have:** Important requirements that WILL be delivered (committed), but deferred to future releases. These add significant value but are not required for initial viability. The key distinction: Should Haves are **committed** to be built.

**Could Have:** Desirable requirements that add value IF time/resources permit during implementation. These are **not committed** - they may or may not be delivered depending on actual effort, complexity, and schedule. Could Haves are opportunistic: "build if it's easy, skip if it's hard."

**Won't Have:** Requirements explicitly excluded from this project scope. These are captured as "Out of scope / non-goals" to prevent scope creep and align stakeholder expectations.

**Key distinction - Should Have vs. Could Have:**
- **Should Have** = "We WILL build this, just in a later release" (committed)
- **Could Have** = "We'd like to build this if it's efficient, but no commitment" (aspirational)

**Why this approach:**
- Requirements stage is foundational (done once, before Design)
- At this stage, you don't know how many increments there will be
- You're doing **coarse prioritization** - categorizing requirements by commitment level
- Design stage (foundational pass) creates the **iteration plan** that maps priorities to specific increments

**Why prioritize:**
- Enables incremental delivery
- Focuses design efforts on highest-value work
- Clarifies trade-offs and dependencies
- Distinguishes committed vs. aspirational requirements
- Reduces scope debates ("everything is Must Have" = nothing is Must Have)

**How this maps to increments:**

During Requirements (foundational), you prioritize at a coarse level:
- **Must Have** = Required for first usable release (whatever that ends up being)
- **Should Have** = Will be delivered in future release(s) - committed
- **Could Have** = Might be delivered if efficient - not committed
- **Won't Have** = Out of scope for this project

During Design (foundational pass), the **iteration plan** maps these to specific increments:
- Must Have requirements → Increment 1 (or possibly Increment 1 + 2 if dependencies require it)
- Should Have requirements → Increment 2, 3, 4+ based on dependencies, risk, and value
- Could Have requirements → Evaluated during implementation; built if efficient, otherwise skipped
- Won't Have requirements → Not included in any increment

**Example:**
- **Requirements stage output:** FR-1 through FR-10 (Must Have); FR-11 through FR-18 (Should Have); FR-19 through FR-22 (Could Have); FR-23 through FR-25 (Won't Have / Out of scope)
- **Design stage iteration plan:** Increment 1 = FR-1 to FR-7 (Must Haves with dependencies), Increment 2 = FR-8 to FR-13, Increment 3 = FR-14 to FR-18, evaluate FR-19 to FR-22 during implementation
- **Implementation:** Could Have FR-19 built in Increment 2 (was easy); FR-20 to FR-22 deferred indefinitely (too complex)

**Tip:** When in doubt, start with Should Have or Could Have; you can always promote requirements if business needs change.

### Gate 2 (Build/No-Build Decision)

**Definition:** The major investment decision occurring at the end of Requirements + Design foundational pass. This is where you commit resources to build the solution.

**When:** After Requirements stage completes AND Design stage foundational pass completes.

**Why the two-stage approach:** Requirements define what to build; Design foundational pass validates how to build it and exposes critical architecture trade-offs, technical risks, and effort implications. Both inform the build/no-build decision.

**Gate 2 typical outputs:**
- ✅ Requirements + acceptance criteria reviewed and approved
- ✅ NFRs captured (performance, security, observability, compliance)
- ✅ High-level design documented with key trade-offs identified
- ✅ Top risks addressed (spikes/prototypes/reviews with mitigations/fallbacks)
- ✅ Iteration plan with dependencies for iterative delivery
- ✅ Updated staffing/timeline estimates with improved confidence
- ✅ Recommendation: proceed / pivot / stop

**Decision criteria:**
- **Proceed if:** Requirements clear, design feasible, risks acceptable, ROI positive, team committed
- **Pivot if:** Design reveals better approach, scope adjustment needed, technical constraints require rethinking
- **Stop if:** Design shows excessive complexity/cost, risks outweigh benefits, better alternatives exist

See [STAGES.md - Decision Points and Checkpoints](../../STAGES.md#decision-points-and-checkpoints) for complete gate definitions.

### DRI = Directly Responsible Individual

**Definition:** One person accountable for **forward progress and clarity** (not necessarily execution).

**Benefits:**
- Single escalation path
- Reduced coordination overhead
- Clear ownership of decisions and follow-ups

**For Requirements stage:** Typically a Business Analyst or Product Manager who owns requirements accuracy and stakeholder alignment.

### Alignment Reviews

**Definition:** A checkpoint type focused on stakeholder walkthroughs to ensure shared understanding.

**Type:** Alignment Review (not a gate or quality checkpoint)
**When:** Throughout Requirements stage as sections complete
**Outcome:** Aligned (proceed) or Adjust (refine requirements)

**Purpose:**
- Validate requirements accuracy with stakeholders
- Surface misunderstandings early
- Ensure technical feasibility with engineering
- Confirm security/compliance needs

**Typical participants:** Business stakeholders, engineering/architecture, QA, security/compliance (if relevant)

See [STAGES.md - Decision Points and Checkpoints](../../STAGES.md#decision-points-and-checkpoints) for complete checkpoint taxonomy.

---

## Why these Requirements elements matter

### Context (Section 1)
**Why:** Provides quick orientation for anyone reviewing the document — what triggered this work, where it sits in the roadmap, and how it connects to Initiation.

**Good format:**
> "Follow-on to Initiation Gate 1; defining Must Have requirements for Q2 initial release based on approved business case."

### Users / personas (Section 2)
**Why:** Keeps requirements user-centered and helps identify different needs/workflows. Personas clarify whose problems you're solving.

**Tip:** Carry forward from Initiation Brief; add detail about user workflows, pain points, or technical sophistication if relevant to requirements.

### Problem to solve (Section 3)
**Why:** Prevents solution-first bias and provides context for why these requirements exist. Carried forward from Initiation to maintain traceability.

**Good format:**
> "Support agents can't reliably find the latest customer context within 30 seconds because conversations are split across tools, increasing handle time and driving repeat contacts."

### Goals and success metrics (Section 4)
**Why:** These metrics from Initiation establish the **measurement throughline** that flows through all SDLC stages. In Requirements, they inform NFRs (especially observability).

**How to use:**
- Performance target (e.g., "p90 time-to-context < 30s") → NFR for latency
- Adoption metric (e.g., "80% of agents use tool daily") → FR for usage tracking
- Outcome metric (e.g., "repeat contacts down 10%") → NFR for observability/instrumentation

### Scope baseline (Section 5)
**Why:** Explicit MoSCoW prioritization and out-of-scope boundaries prevent scope creep, focus design efforts, and enable faster trade-off decisions.

**Must Have:** The minimum set of requirements for the first usable release (critical for viability).
**Should Have:** Important requirements committed for future releases (will be built, just later).
**Could Have:** Desirable requirements if efficient (not committed, opportunistic).
**Won't Have (Out of scope / non-goals):** Explicit exclusions that stakeholders might assume are included.

**Example non-goals (Won't Have):**
- "No UI redesign in v1."
- "No historical data backfill beyond 30 days."
- "No internationalization support in v1."

### Functional requirements (FRs) (Section 6)
**Why:** FRs define **what** the system must do — the core functionality that delivers value. Testable FRs enable objective validation in Verification stage.

**Format:** Numbered (FR-1, FR-2) for traceability.
**Language:** Behavior-focused ("shall" or "As a user, I can..."), not implementation-focused.

**Tip:** Each FR should pass the "testability test" — can QA write a test case for this?

### Acceptance criteria (ACs) (Section 7)
**Why:** ACs define "done" for each requirement and prevent subjective debates during testing. Objective ACs enable faster sign-off and reduce rework.

**Format:** Given/When/Then or measurable conditions.
**Language:** Observable outcomes (response time, error states, permissions, visible indicators).

**Common mistake:** Subjective ACs like "fast," "user-friendly," "works well." **Fix:** Add measurable thresholds.

### Non-functional requirements (NFRs) (Section 8)
**Why:** NFRs shape architecture decisions, testing strategy, and user experience. Capturing NFRs early prevents late surprises (e.g., performance issues discovered in staging).

**Minimal set:** Include only NFRs that materially affect design, testing, or risk:
- Performance targets that inform architecture (caching, async processing, etc.)
- Security/privacy requirements that require specific designs (encryption, audit logging, etc.)
- Observability requirements that enable measurement of success criteria

**Observability is critical:** This is where you translate success metrics into instrumentation requirements. Example:
- Success metric: "p90 time-to-context < 30s"
- Observability NFR: "Log search latency (p50/p90/p99); alert if p95 exceeds 3s"

### Data and integrations (Section 9)
**Why:** Many schedule slips come from unexamined data/integration constraints:
- Rate limits (affects architecture)
- SLAs (affects reliability design)
- Data ownership (affects access/permissions)
- Retention policies (affects storage design)

**What to capture:**
- External/internal APIs with rate limits and authentication
- Data sources with ownership and retention policies
- Integration constraints that affect design or schedule

### Edge cases and error handling (Section 10)
**Why:** Edge cases often drive significant design complexity. Documenting expected behavior early prevents rework and aligns stakeholders on trade-offs.

**Focus on:**
- Common failure scenarios (API unavailable, timeout, etc.)
- Data edge cases (multiple matches, no matches, malformed input)
- UX implications (how to handle errors gracefully)

### Open questions (Section 11)
**Why:** Unresolved questions block Design work or create uncertainty. Documenting questions with owners and timelines ensures progress.

**Tip:** Flag blockers vs. nice-to-know. Resolve blockers before declaring requirements ready for Design.

### Requirements readiness (Section 12)
**Why:** Quality checkpoint confirming requirements are complete, reviewed, and ready to guide Design work.

**Ready when:**
- FRs have objective ACs
- NFRs captured (including observability)
- Stakeholders aligned (reviews complete)
- Open questions resolved or mitigated

**Decision:** Ready for Design / Revise requirements / Stop

### Gate 2 planning (Section 13)
**Why:** Helps plan ahead for what outputs Design should produce to enable the build/no-build decision. Ensures Design team focuses on critical trade-offs and risks.

**What to communicate to Design:**
- Focus on architecture trade-offs affecting cost/schedule/risk
- Design instrumentation approach for success metrics
- Address technical risks via spikes or prototypes
- Create iteration plan for incremental delivery

---

## Measurement Throughline

The **measurement throughline** is a key differentiator of this framework. It ensures success metrics flow through all SDLC stages.

**Stage-by-stage flow:**
1. **Initiation (Stage 1):** Define measurable success criteria (e.g., "p90 time-to-context < 30s; repeat contacts down 10%")
2. **Requirements (Stage 2 - you are here):** Translate success metrics into NFRs
   - Performance target → NFR for latency: "Search results p95 < 2s"
   - Outcome metric → NFR for observability: "Track repeat-contact rate metric (customer ID + 24hr window)"
   - Success metric → NFR for instrumentation: "Log time-to-context metric (search initiation → first message displayed)"
3. **Design (Stage 3):** Design instrumentation and measurement approach
   - Where to capture metrics (client-side, server-side, both)
   - What telemetry infrastructure to use (logging, metrics, traces)
   - How to calculate metrics (aggregation, sampling)
4. **Implementation (Stage 4):** Implement metrics instrumentation in code
5. **Verification (Stage 5):** Validate success criteria in testing
6. **Deployment (Stage 6):** Monitor metrics during rollout
7. **Support (Stage 7):** Track success criteria in production

**Your role in Requirements:** Ensure observability NFRs capture what needs to be measured. This informs Design on instrumentation architecture.

---

## Common Pitfalls (and Fixes)

### Pitfall: Requirements describe UI/implementation, not behavior
**Example:** "Add a search box in the top-right corner."
**Fix:** Re-write as behavior: "The system shall allow agents to search by customer phone number."
**Why:** Requirements define what, not how. UI decisions belong in Design.

### Pitfall: Acceptance criteria are subjective
**Example:** "Search is fast and works well."
**Fix:** Add observable signals: "Search returns results in <2s (p95); displays most recent message timestamp."
**Why:** Subjective ACs create debate during testing and sign-off.

### Pitfall: "Everything is Must Have"
**Example:** All 30 requirements marked as Must Have.
**Fix:** Force prioritization — Must Have is the minimum usable set for first release. Mark valuable-but-deferrable requirements as Should Have.
**Why:** If everything is Must Have, nothing is. Prioritization enables incremental delivery and focuses effort on what's critical for initial viability.

### Pitfall: NFRs added late
**Example:** Performance requirements discovered during staging, requiring architecture changes.
**Fix:** Capture performance, security, scalability NFRs early; validate with stakeholders.
**Why:** Late NFRs cause rework and schedule slips.

### Pitfall: No observability NFRs
**Example:** Success metrics defined in Initiation but no instrumentation requirements captured.
**Fix:** Add observability NFRs specifying what to log/measure to track success metrics.
**Why:** Without instrumentation, you can't validate if the solution worked.

### Pitfall: Data/integration constraints ignored
**Example:** Design discovers API rate limit of 60 req/min, requiring caching architecture.
**Fix:** Document rate limits, SLAs, data ownership, retention policies in Requirements.
**Why:** Constraints affect architecture; surface them early.

### Pitfall: Requirements not reviewed by engineering
**Example:** Requirements assume technical feasibility without engineering validation.
**Fix:** Conduct alignment reviews with engineering before declaring requirements ready.
**Why:** Technical infeasibility discovered late causes rework.

### Pitfall: Edge cases discovered during testing
**Example:** QA finds "customer has multiple phone numbers" case; no expected behavior documented.
**Fix:** Document top edge cases in Requirements with expected behavior.
**Why:** Edge cases often drive significant design complexity; align stakeholders early.

---

## When to Expand Beyond Minimal

Expand Requirements only when needed:

**Regulated / compliance-heavy domain:**
- Add explicit control requirements (audit, data retention, right-to-delete)
- Include compliance sign-off requirements
- Document regulatory constraints

**Complex data migrations:**
- Add data mapping and validation requirements
- Document transformation rules and edge cases
- Specify migration success criteria

**Multi-team interface work:**
- Add interface contracts or API schemas
- Document integration points and handoff protocols
- Specify SLAs for cross-team dependencies

**High availability / performance requirements:**
- Add detailed SLOs and load assumptions
- Specify fault tolerance and degradation behavior
- Document performance under various load scenarios

**Security-sensitive systems:**
- Add threat model or security requirements
- Specify authentication, authorization, encryption requirements
- Document audit and monitoring requirements

Otherwise, keep Requirements concise and move to Design stage.

---

## When to Revisit Requirements

Requirements is a **foundational stage** but revisitable when circumstances change:

**Triggers to revisit:**
- **Design reveals better approach:** Foundational design may suggest alternative requirements (pivot decision)
- **Scope change:** Business priorities shift or new constraints emerge
- **Technical infeasibility:** Design or implementation reveals requirements aren't achievable as stated
- **Stakeholder feedback:** Alignment reviews or prototype feedback indicates misalignment
- **Compliance changes:** New regulatory requirements or security concerns
- **Major architectural change:** Technology shift or platform migration
- **Market changes:** Competitive pressure or customer feedback requires pivot

**Process:**
1. Update Requirements Document with changes
2. Conduct alignment review with stakeholders
3. Re-run requirements-checklist.md to verify readiness
4. Update Design artifacts to reflect requirement changes
5. Assess impact on schedule/scope/risk

**Tip:** Use version control and change logs to track requirement evolution.

---

## AI Assistance Guidance

**Autonomy level:** "AI assist only" per [AI_AUTONOMY_SCORECARD.md](../../AI_AUTONOMY_SCORECARD.md)

**Why:** Requirements involve business judgment, stakeholder alignment, and domain knowledge that AI cannot independently verify. Human validation is critical.

**AI's role:**
- Draft initial requirements based on Initiation Brief and stakeholder input
- Suggest acceptance criteria and NFRs
- Identify potential edge cases
- Analyze completeness (run checklist)
- Provide templates and examples

**Human's role:**
- Own all decisions
- Validate correctness with stakeholders (conduct alignment reviews)
- Approve outputs
- Ensure requirements accuracy and testability
- Resolve ambiguities and conflicts

**Critical validation points when using AI:**
1. **Do FRs accurately reflect stakeholder needs?** AI may misinterpret or miss context.
2. **Are ACs objective and testable?** AI may suggest subjective criteria.
3. **Did AI identify the right NFRs and constraints?** AI may miss performance, security, or compliance requirements.
4. **Are priorities aligned with business goals?** AI doesn't know organizational priorities.
5. **Are edge cases comprehensive?** AI may miss domain-specific edge cases.

**Best practice:** Use AI to accelerate drafting, but validate with stakeholders through alignment reviews.

**Using the AI agent prompt:** See `requirements-ai-agent-prompt.md` for a modular prompt that references these artifacts by name (avoids duplication and drift).

---

## Notes

Added to framework in v0.3.0. Adapted from reference materials v0.1 (2026-02-06) with comprehensive framework integration, expanded definitions, measurement throughline explanation, Gate 2 timing clarification, Alignment Reviews checkpoint type, enhanced pitfalls section, and AI assistance guidance matching Initiation artifact quality.
