# Requirements Brief

**Last Updated:** 2026-02-21

> **Purpose:** Convert the Initiation Brief into a **clear, testable
> requirements baseline**: functional requirements with acceptance criteria,
> non-functional requirements (NFRs), edge cases, and a prioritized scope
> suitable for System Design and Implementation.
>
> **Handoff:** This document enables the System Design stage (foundational pass)
> to architect the solution and plan for measurement/instrumentation.

**How to use this:** Bullets only. Keep it concise (~2-3 pages). For deeper
guidance, see [Requirements Guide](requirements-guide.md).

**AI Assistance:** This stage is "AI agent with human gate" per
[AI Assistance Scorecard](../framework-ai-assistance.md) — AI can draft
requirements, conduct interviews, and suggest ACs/NFRs; humans validate with
stakeholders and own all decisions. Two ways to work with AI on this brief:

- **Interview mode:** Share the Initiation Brief with AI. It asks structured
  questions based on the template, interviews you (or stakeholders) to surface
  requirements, and produces a draft for your review.
- **Review mode:** Fill out the template yourself, then ask AI to review for
  completeness, testability, ambiguity, and suggest improvements.

---

## 1. Context

- **Write:** What triggered this requirements work / where it sits in the
  roadmap.
- **Tip:** Reference the Initiation Brief (Gate 1 approval) and any key
  decisions.
- _Example:_ "Follow-on to Initiation Gate 1; defining Must Have requirements
  for Q2 initial release based on approved business case."

## 2. Users / personas

- **Write:** Primary users and secondary stakeholders with brief context.
- **Tip:** Carry forward from Initiation Brief; add detail if user roles are
  complex.
- _Example:_ "Primary: Support agent (handles 20-30 tickets/day, needs fast
  context switching). Secondary: Support manager (monitors SLA compliance),
  Compliance team (audits PII handling)."

## 3. Problem to solve (summary)

- **Write:** Restate the problem in problem-first form (no solutions). Carry
  forward from Initiation Brief.
- **Tip:** Keep this behavior-focused - what users can't do and why.
- _Example:_ "Support agents can't reliably find the latest customer context
  within 30 seconds because conversations are split across Tool A and Tool B,
  increasing handle time and driving repeat contacts."

## 4. Goals and success metrics (from Initiation)

> **Measurement throughline:** These metrics from the Initiation Brief inform
> your functional and non-functional requirements. NFRs (Section 10) should
> include instrumentation to measure these metrics.

- **Write:** Carry forward measurable success criteria from Initiation Brief
  (baseline → target).
- **Tip:** Use these to inform NFRs (performance targets, observability
  requirements).
- _Example:_ "p90 time-to-context 75s → <30s; repeat-contact rate 12% → 10%."

## 5. Constraints

> **Carry forward from Initiation:** Review the Initiation Brief for constraints
> already identified (budget, deadlines, team capacity, compliance, technology
> restrictions). Capture them here, then add any new constraints discovered
> during requirements elicitation.

### From Initiation Brief

- **Write:** Copy relevant constraints from Initiation Brief.
- _Example:_
  - Budget: $150K approved for Phase 1
  - Deadline: Q2 launch aligned with support team hiring cycle
  - Team: 2 backend engineers, 1 frontend, shared QA
  - Compliance: Must meet existing data-handling policy (no new PII stores
    without security review)

### Discovered during requirements

- **Write:** New constraints surfaced during stakeholder interviews, technical
  discovery, or requirements elicitation.
- **Tip:** These often emerge from brownfield analysis, integration research, or
  SME interviews. For brownfield projects, gather existing system constraints —
  see
  [Requirements Guide: Brownfield Projects](requirements-guide.md#brownfield-projects).
- _Example:_
  - Tool B API has no bulk export (must paginate all queries)
  - Support team cannot tolerate >5 minutes downtime during business hours
    (existing SLA)
  - Legal requires 90-day audit trail for PII access

> **Note:** Constraints inform MoSCoW prioritization (Section 6) and shape NFRs
> (Section 10). Detailed cost analysis happens during System Design, with Gate 2
> as the decision point.

## 6. Scope baseline

> **Prioritization approach:** This framework uses the **MoSCoW** method (Must
> Have / Should Have / Could Have / Won't Have) for requirements prioritization.
> At the Requirements stage (foundational), you're doing coarse prioritization
> before increment boundaries are known. The System Design stage will create an
> **increment plan** that maps these priorities to specific increments.

### Must Have (first usable release)

- **Write:** Requirements critical for the first usable release. Without these,
  the solution cannot deliver core value.
- **Tip:** Be specific about features/capabilities, not implementation details.
  If everything seems like Must Have, challenge it - what's the minimum
  threshold for viability?
- _Example:_
  - Unified conversation view showing Tool A + Tool B messages in chronological
    order
  - Search by customer phone number or email
  - Display last 30 days of conversation history

### Should Have (future releases - committed)

- **Write:** Important requirements that WILL be delivered (committed), but
  deferred to future releases after initial launch.
- **Tip:** These add significant value but aren't required for initial
  viability. System Design stage will determine which increment they map to. Key
  point: Should Haves are **committed** to be built.
- _Example:_
  - Advanced search filters (by date range, by agent, by status)
  - Export conversation history to CSV
  - Real-time message sync (<30 second delay)

### Could Have (if time/resources permit - not committed)

- **Write:** Desirable requirements that add value IF they can be implemented
  efficiently. These are **not committed** - they may or may not be delivered.
- **Tip:** Could Haves are opportunistic: "build if it's easy, skip if it's
  hard." Use this for polish, nice-to-haves, or requirements whose effort is
  uncertain.
- _Example:_
  - Conversation tagging/categorization by agent
  - Dark mode support for conversation view
  - Keyboard shortcuts for common actions
  - Browser notification when new message arrives

### Won't Have (out of scope / non-goals)

- **Write:** What's explicitly excluded from this project to prevent scope
  creep.
- **Tip:** Include capabilities that stakeholders might assume are included but
  are intentionally not planned.
- _Example:_
  - No UI redesign of existing tools (use existing UI framework)
  - No historical data backfill beyond 30 days (forward-looking only)
  - No internationalization support (English only for v1)
  - No mobile app (web-only for v1)

## 7. Functional requirements (FRs)

> **Write testable requirements:** Use "The system shall..." or "As a <user>, I
> can <action> so that <value>." Each requirement must be testable (you'll
> verify in the Verification stage).

- **Tip:** Number requirements (FR-1, FR-2, etc.) for traceability.
- **Tip:** Focus on behavior (what), not implementation (how).

### Example format:

- **FR-1:** The system shall allow support agents to search by customer phone
  number and display conversation history within 2 seconds.
- **FR-2:** The system shall display messages from Tool A and Tool B in a
  unified chronological view, sorted by timestamp.
- **FR-3:** The system shall show the source tool (Tool A or Tool B) for each
  message with a visible indicator.
- **FR-4:** As a support agent, I can filter conversation history by date range
  so that I can focus on recent interactions.
- **FR-5:** The system shall display customer profile information (name, account
  status, tier) alongside conversation history.

**Your FRs:**

- FR-1:
- FR-2:
- FR-3:
- FR-4:
- FR-5:

## 8. Acceptance criteria (AC)

> **Define "done" objectively:** Acceptance criteria must be objective,
> observable, and testable. Prefer concrete signals over subjective judgments.

- **Tip:** Each FR should have at least one AC; complex FRs may have multiple.
- **Tip:** Use "Given/When/Then" format or specify measurable conditions.

### Example format:

- **AC for FR-1:**
  - Given an agent enters a valid 10-digit phone number
  - When they submit the search
  - Then the system returns results within 2 seconds and displays the most
    recent message timestamp

- **AC for FR-2:**
  - Given a customer has messages in both Tool A and Tool B
  - When the agent views conversation history
  - Then messages appear in chronological order (newest first) regardless of
    source tool
  - And timestamps are displayed in the agent's local timezone

**Your ACs:**

- **AC for FR-1:**
- **AC for FR-2:**
- **AC for FR-3:**

## 9. Traceability summary

| FR ID | Initiation Objective | MoSCoW | ACs    | Success Metric |
| ----- | -------------------- | ------ | ------ | -------------- |
| FR-1  | [objective ref]      | Must   | AC-1.1 | [metric ref]   |
| FR-2  | [objective ref]      | Should | AC-2.1 | [metric ref]   |

## 10. Non-functional requirements (NFRs) — minimal set

> **Include only NFRs that matter for decisions, testing, or architecture.**
> NFRs shape design choices and testing plans.
>
> **Measurement throughline:** Ensure observability NFRs capture instrumentation
> needed to measure success metrics (Section 4 — Goals and success metrics).

### Performance

- **Write:** Latency, throughput, response time targets.
- _Example:_ "Search results: p95 < 2s, p99 < 5s; conversation view load: p95 <
  1s."

### Reliability

- **Write:** Availability, error budgets, fault tolerance.
- _Example:_ "99.9% uptime during business hours (8am-8pm ET); graceful
  degradation if one tool is unavailable (show cached data with staleness
  indicator)."

### Security / Privacy

- **Write:** Authentication, authorization, PII handling, audit requirements.
- _Example:_ "Agent must be authenticated; PII (phone, email) redacted in logs;
  access audit trail retained for 90 days."

### Scalability (if relevant)

- **Write:** Expected load, growth projections, concurrency.
- _Example:_ "Support 200 concurrent agents; handle 500 searches/minute peak
  load."

### Observability (critical for measurement)

- **Write:** Logging, metrics, traces, SLOs needed to measure success criteria.
- _Example:_
  - Log search latency (p50/p90/p99) and conversation load time
  - Track repeat-contact rate metric (customer ID + 24hr window)
  - Instrument time-to-context metric (search initiation → first message
    displayed)
  - Alert if p95 latency exceeds 3s or error rate >1%

### Compliance (if any)

- **Write:** Regulatory requirements, data retention, privacy regulations.
- _Example:_ "GDPR compliant; support right-to-delete for customer conversation
  data."

**Your NFRs:**

- **Performance:**
- **Reliability:**
- **Security/Privacy:**
- **Observability:**
- **Compliance (if any):**

## 11. Data and integrations (constraints)

- **Write:** Data sources, ownership, retention, migration needs.
- **Write:** External/internal integrations with constraints (rate limits, SLAs,
  authentication).
- **Tip:** Document constraints that affect design or schedule.

_Example:_

- **Tool A API:** 100 req/min rate limit; OAuth 2.0 authentication; conversation
  data owned by Customer Success team
- **Tool B API:** 60 req/min rate limit; no bulk export; API key authentication;
  30-day retention policy
- **Customer database:** Read-only access; maintained by Customer Data team; <
  50ms query latency SLA
- **Data migration:** No historical backfill required (only new data from
  go-live)

**Your data and integrations:**

-

## 12. Edge cases and error handling

- **Write:** Top edge cases with expected behavior.
- **Tip:** Focus on cases that affect UX or require specific handling.

_Example:_

- Customer has multiple phone numbers → Display all associated conversations
  with phone number labels
- Customer has no conversation history → Show "No conversations found" with
  timestamp of last search
- Tool B API unavailable → Display Tool A data only with "Tool B temporarily
  unavailable" banner; retry every 30s
- Search returns >1000 messages → Paginate with 50 messages per page; display
  total count
- Concurrent agents viewing same customer → Each agent sees independent view (no
  locking required)

**Your edge cases:**

-
-

## 13. Open questions / blockers

- **Write:** Questions that must be answered before System Design starts or
  during System Design foundational pass.
- **Tip:** Assign an owner if possible; flag blockers vs. nice-to-know.

_Example:_

- **Q1:** Does Tool B API support webhooks for real-time sync, or must we poll?
  (Blocker for System Design) — Owner: SolutionArchitect
- **Q2:** What's the data retention policy for unified conversation view? —
  Owner: Compliance team
- **Q3:** Can we cache Tool A/B data, or must every search be live? — Owner:
  Security review

**Your open questions:**

- **Q1:**
- **Q2:**

## 14. Requirements readiness (ready for System Design)

> **Quality checkpoint:** Confirm requirements are ready for System Design stage
> (foundational pass). Use [Requirements Checklist](requirements-checklist.md)
> for detailed validation.

**Ready when:**

- All high-priority FRs have acceptance criteria (objective/observable)
- FRs and ACs reviewed and approved by business and technical stakeholders
- Key NFRs captured (performance, reliability, security, observability)
- Measurement/instrumentation needs identified (observability NFRs)
- Requirements are testable and unambiguous
- Open questions documented with owners (blockers resolved or mitigated)

**Decision:** Ready for System Design / Revise requirements / Stop

**Next step if ready:** Proceed to System Design stage (foundational pass).
Provide this Requirements Document to System Design team.

**Review sign-off:**

| Reviewer | Role        | Date       | Status                      |
| -------- | ----------- | ---------- | --------------------------- |
| [name]   | Engineering | YYYY-MM-DD | Approved / Revisions needed |
| [name]   | Product     | YYYY-MM-DD | Approved / Revisions needed |
| [name]   | Security    | YYYY-MM-DD | Approved / Revisions needed |

## 15. (Optional) Gate 2 planning

> **Note on Gate 2 timing:** Gate 2 (the major build/no-build decision) occurs
> at the **end of Requirements + System Design foundational pass**, not at the
> end of Requirements alone. This section helps plan what outputs to produce
> during System Design.
>
> **Gate 2 differs from Gate 1:** Gate 1 asks "Should we invest in requirements
> work?" (business case). Gate 2 asks "Should we commit to building?"
> (requirements + design + estimates). Record the actual decision using the
> [Gate Decision Template](../gate-decision-template.md).

**Gate 2 expected outputs** (produced during System Design foundational pass):

- ✅ Requirements + acceptance criteria reviewed and approved (completed in
  Requirements stage)
- ⏳ High-level design documented with key trade-offs identified (System Design
  stage)
- ⏳ Top risks addressed with spikes/prototypes/reviews and mitigations (System
  Design stage)
- ⏳ Iteration plan with dependencies for iterative delivery (System Design
  stage)
- ⏳ Updated staffing/timeline estimates with improved confidence (System Design
  stage)
- ⏳ Recommendation: proceed / pivot / stop (System Design stage)

**For System Design team:** Focus foundational design pass on:

- Architecture trade-offs affecting cost/schedule/risk
- Instrumentation approach for success metrics (observability)
- Technical risks requiring spikes or prototypes
- Dependency ordering for incremental delivery

---

## Notes

**Template Last Updated:** 2026-02-21

Added to framework in v0.3.0.

---

## Change log

| Date       | Change description            | Sections affected | Impact | Approved by |
| ---------- | ----------------------------- | ----------------- | ------ | ----------- |
| YYYY-MM-DD | Initial requirements document | All               | N/A    | [name]      |
