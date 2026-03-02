# Framework Evaluation Rubric

A standalone rubric for evaluating the AI-Assisted SDLC framework. A contributor
can execute a complete three-pass review from this file alone.

## Scope

### Files to Review

| Location      | What to Review                                                                                                                                                                   |
| ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Root (`*.md`) | README.md, QUICKSTART.md, AGENTS.md, CLAUDE.md, STYLE_GUIDE.md, CONTRIBUTING.md                                                                                                  |
| `guides/`     | All 10 guide files                                                                                                                                                               |
| `stages/`     | All stage directories — README.md, checklist.md, reference.md, plus deployment/setup.md, deployment/pipeline-checklist.md, support/operations.md, support/readiness-checklist.md |
| `templates/`  | All 15 template files                                                                                                                                                            |

### Files to Exclude

- `.ignore/` — personal scratch work and draft notes
- `.obsidian/` — Obsidian vault configuration
- `.evaluation/` — evaluation tooling (this directory)
- `VERSION` — single-line version file, no prose to review

### Version

Read the framework version from `VERSION` (currently `0.26.0`). Include the
version in all deliverables.

---

## Output Persistence

Auto-generate `RUN_DIR` as a timestamp string: `YYYY-MM-DDTHHMMSSZ` (example:
`2026-03-01T153045Z`).

Create directories and write files:

```
.ignore/reviews/<RUN_DIR>/
.ignore/reviews/<RUN_DIR>/personas/
```

Do not write anywhere else except under `.ignore/reviews/<RUN_DIR>/`.

---

## Pass 1: Mechanical Correctness

Automated or semi-automated checks across all in-scope files. Run these checks
before content review to separate structural defects from substance issues.

### 1.1 Link Validation

- Verify all relative file links resolve to existing files
- Verify all fragment anchors (`#section-name`) resolve to existing headings in
  the target file
- Flag any links pointing to files outside the repo or to excluded directories
- Flag any bare URLs that should be relative links

### 1.2 Front Matter Audit

**Stage READMEs** — verify each has the Stage README Schema from
`STYLE_GUIDE.md`:

- Fields: `id`, `stage_number`, `execution_pattern`, `inputs`, `outputs`,
  `gates`, `feeds_into`, `checklist`, `reference`
- Cross-reference `inputs`, `outputs`, `gates`, and `feeds_into` against the
  stage routing table in `guides/agentic-workflow.md` front matter

**Guide files** — verify each has the Guide File Schema:

- Fields: `id`, `type` (guide | style-guide | reference), `concerns`
- Files that should have front matter: all files in `guides/`

**Root README** — verify `agent_entry_point: guides/agentic-workflow.md`

**Files that should NOT have front matter:** templates, checklists, stage
references

### 1.3 Notes Section Audit

**Non-template files:** Every file must end with:

```markdown
## Notes

**Last Updated:** YYYY-MM-DD

Added to framework in vX.Y.Z.
```

- `**Last Updated:**` must be bold
- "Added to framework" line must be plain text (not italic, not bold)
- `## Notes` must be the last H2 in the file

**Template files:** Must end with an HTML comment:

```html
<!-- Template Last Updated: YYYY-MM-DD | Added in vX.Y.Z -->
```

### 1.4 Prettier Compliance

Run on all markdown files:

```bash
npx prettier --prose-wrap always --print-width 80 --check <files>
```

Flag any files that fail the check.

### 1.5 Section Separator Audit

- `---` (horizontal rule) must appear between every H2 section
- `---` must NOT appear between H3 subsections within an H2
- Exception: front matter delimiters (`---`) at top of file

### 1.6 Checklist Conventions Audit

Verify all 8 stage checklists follow `STYLE_GUIDE.md` checklist conventions:

- H1 title
- Purpose + Usage line
- `[H]` marker convention blockquote
- Numbered items with checkboxes: `N. [ ] **Bold assertion** (qualifier)`
- `[H]` inside bold for human-judgment items
- Final Decision section or gate statement
- Related Documents section
- Notes section

### Deliverables

- `.ignore/reviews/<RUN_DIR>/mechanical-pass.md` — narrative findings organized
  by check type
- `.ignore/reviews/<RUN_DIR>/mechanical-pass.csv` — machine-readable findings
  with columns: `severity,category,check,file,section,issue,recommended_fix`

---

## Pass 2: Technical Correctness

Content accuracy and cross-document consistency. Requires reading and comparing
multiple files.

### 2.1 Terminology Consistency

Check these terms for consistent usage across all files:

| Term                                                     | Canonical Definition Source               |
| -------------------------------------------------------- | ----------------------------------------- |
| Gate vs. Checkpoint                                      | `guides/framework.md`                     |
| Increment (neutral term)                                 | `AGENTS.md`, `guides/stages.md`           |
| ADR location                                             | `guides/framework.md` or stage references |
| Risk tiers (Minimal, Standard, Enterprise)               | `guides/right-sizing.md`                  |
| Operating modes (Human-Led, Collaborative, AI-Led)       | `guides/ai-assistance.md`                 |
| Execution patterns (foundational, iterative, continuous) | `guides/stages.md`                        |

Flag any file using variant terminology (e.g., "risk level" instead of "risk
tier," "phase" instead of "stage").

### 2.2 Cross-Document Consistency

For each of the 8 stages, verify that these documents agree:

- **Stage README** — inputs, outputs, gates, execution pattern, autonomy tier
- **Stage checklist** — items match the README's described outputs and quality
  criteria
- **Stage reference** — examples and guidance align with README activities
- **Stage template** — sections match the outputs described in the README
- **`guides/agentic-workflow.md`** — front matter routing data matches stage
  README front matter
- **`guides/stages.md`** — stage description matches README overview

### 2.3 Artifact Dependency Verification

Using the dependency table in `guides/agentic-workflow.md` front matter:

- Trace each stage's `outputs` forward to the next stage's `inputs`
- Verify every `outputs` artifact that names a template has a corresponding file
  in `templates/`
- Verify `feeds_into` relationships are bidirectional (if stage A feeds into
  stage B, stage B's inputs should include at least one of stage A's outputs)
- Flag any orphaned artifacts (produced but never consumed)

### 2.4 Measurement Throughline

Verify each stage README connects to the measurement throughline described in
`guides/stages.md` and `AGENTS.md`:

- Initiation: defines measurable success criteria
- Requirements: captures instrumentation needs as NFRs
- System Design: designs measurement infrastructure
- Increment Design: plans metrics collection
- Implementation: implements metrics collection
- Verification: tests measurement systems
- Deployment: captures baseline measurements
- Support: monitors and validates success criteria

### 2.5 Security Throughline

Verify `guides/security.md` covers all 8 stages and stage READMEs reference
security appropriately:

- Each stage should have security activities defined in the security guide
- Stage READMEs should reference security where relevant (especially System
  Design, Implementation, Verification, Deployment)

### 2.6 Right-Sizing Consistency

Verify tier names (Minimal, Standard, Enterprise) are consistent across:

- `guides/right-sizing.md` (canonical)
- All stage READMEs (right-sizing sections)
- `guides/adoption.md` (tier policy section)
- `guides/framework.md` (any tier references)

### 2.7 Version References

Verify all "Added to framework in vX.Y.Z" and "Added in vX.Y.Z" lines reference
real versions that are <= the current version in `VERSION`.

### Deliverables

- `.ignore/reviews/<RUN_DIR>/technical-pass.md` — narrative findings organized
  by check type
- `.ignore/reviews/<RUN_DIR>/technical-pass.csv` — machine-readable findings
  with columns: `severity,category,check,file,section,issue,recommended_fix`

---

## Pass 3: Narrative Quality + Persona Evaluations

Organizational quality, reading paths, and audience-specific assessment.

### 3A. Reader Path Analysis

Walk three reading paths and assess flow, progressive disclosure, and dead ends:

**Business leader path:**

README.md → Start Here table → Business Value section → Governance controls →
`guides/adoption.md` (readiness assessment, phased rollout)

Evaluate: Can a business leader understand the value proposition and governance
model without encountering unexplained technical jargon?

**IC engineer path:**

QUICKSTART.md → Path A or B → `stages/initiation/README.md` → iterative stages →
`guides/worked-example.md`

Evaluate: Can an engineer get productive quickly? Does the quick start deliver
on its "under 5 minutes" promise? Are the stage guides actionable?

**AI agent path:**

README.md (parse `agent_entry_point`) → `guides/agentic-workflow.md` (parse
front matter routing table) → stage README (parse front matter) → checklist →
reference

Evaluate: Can an AI agent dropped into this repo cold orient itself, route to
the correct stage, and produce checklist-passing artifacts using front matter
and structured metadata?

### 3B. Persona Evaluations

Each persona evaluation produces a file in
`.ignore/reviews/<RUN_DIR>/personas/<persona>.md` with this schema:

```markdown
# <Persona Name> Evaluation

## Mental Model

What I think this framework is and how it works (2-3 paragraphs).

## What's Clear / Compelling

[Bulleted list of strengths]

## What's Confusing / Ambiguous

[Ranked list, most confusing first]

## Top 5 Unanswered Questions

[Ranked, with file/section pointers where the answer should be]

## Top 3 Adoption Blockers

[What would prevent me from using this framework]

## Decision

**Would I use this framework?** Yes / No / Maybe

**Conditions:** [What would need to change for a Yes, or what maintains a Yes]

## Top 5 Recommendations

[Each with file/section pointer and concrete suggestion]
```

#### Personas

**business-leader** — A VP or C-level executive evaluating whether to fund an
AI-assisted SDLC pilot. Sub-lenses: CEO (growth, competitive advantage) and CFO
(ROI, cost control, risk). Focus areas: ROI justification, governance and
oversight model, investment gates, organizational readiness, risk management.

**technical-leader** — An engineering manager or software architect responsible
for adopting the framework within their team or organization. Sub-lenses:
eng-manager (team scaling, hiring, process overhead) and architect (technology
decisions, system quality, technical debt). Focus areas: architecture decision
support, team scaling patterns, oversight mechanisms, technical debt management.

**ic-engineer** — A mid-level software engineer who will use the framework
day-to-day. May be skeptical about AI tools or concerned about AI as a threat to
their role. Focus areas: day-to-day usability, template completeness, AI-as-
assistant framing (not replacement), checklist practicality, worked example
clarity.

**ai-agent** — An AI coding agent (e.g., Claude Code, Cursor, GitHub Copilot
Workspace) dropped into this repository cold with no prior context. Focus areas:
front matter parseability, stage routing accuracy, checklist-passing artifact
production, fallback protocol clarity, session log conventions, autonomy tier
interpretation.

### 3C. Audience Language Audit

Verify language alignment per `AGENTS.md` design principles:

- Business-first language in Initiation, Requirements (early stages aimed at
  non-technical stakeholders)
- Technical language in Implementation, Verification, Deployment, Support
- No "DRI" jargon anywhere (per `AGENTS.md` cross-cutting refinement patterns)
- "AI-assisted" not "AI-driven" or "AI-automated" (per `guides/adoption.md`
  framing guidance)
- "project lead" not "DRI"

### Deliverables

- `.ignore/reviews/<RUN_DIR>/narrative-pass.md` — reader path analysis and
  language audit findings
- `.ignore/reviews/<RUN_DIR>/personas/business-leader.md`
- `.ignore/reviews/<RUN_DIR>/personas/technical-leader.md`
- `.ignore/reviews/<RUN_DIR>/personas/ic-engineer.md`
- `.ignore/reviews/<RUN_DIR>/personas/ai-agent.md`

---

## Severity and Category Matrix

### Severity Levels

| Severity    | Definition                                                                              |
| ----------- | --------------------------------------------------------------------------------------- |
| **Blocker** | Prevents a reader or agent from using the framework correctly. Must fix before testing. |
| **Major**   | Causes significant confusion or inconsistency. Should fix before testing.               |
| **Minor**   | Noticeable issue that doesn't block usage. Fix when convenient.                         |
| **Polish**  | Cosmetic or stylistic improvement. Low priority.                                        |

### Categories

| Category          | Definition                                                                                  |
| ----------------- | ------------------------------------------------------------------------------------------- |
| **Clarity**       | Can the target audience understand this content?                                            |
| **Completeness**  | Is anything missing that a reader would need?                                               |
| **Consistency**   | Do documents agree with each other?                                                         |
| **Credibility**   | Does the framework feel trustworthy and well-constructed?                                   |
| **Adoption**      | Does anything create unnecessary friction for adopting the framework?                       |
| **Executability** | Can a reader or agent mechanically execute the instructions to produce the expected output? |

### Backlog CSV Format

All findings across all three passes are consolidated into a single backlog:

```
severity,category,pass,check,file,section,issue,recommended_fix
```

- `severity`: Blocker | Major | Minor | Polish
- `category`: Clarity | Completeness | Consistency | Credibility | Adoption |
  Executability
- `pass`: mechanical | technical | narrative
- `check`: the specific check ID (e.g., `1.1-links`, `2.3-dependencies`,
  `3B-persona`)
- `file`: relative path
- `section`: heading or line reference
- `issue`: concise description
- `recommended_fix`: actionable fix description

---

## Consolidation (Final Deliverables)

After completing all three passes:

1. **Deduplicate** — merge findings that describe the same underlying issue
   across passes or personas
2. **Prioritize** — sort by Blocker > Major > Minor > Polish, then by audience
   impact breadth
3. **Write summary** — produce `.ignore/reviews/<RUN_DIR>/summary.md`:

```markdown
# Framework Evaluation Summary

**Review run:** <RUN_DIR> **Framework version:** <value from VERSION>

## Executive Summary

[5-bullet summary covering learnability, coherence, credibility, adoption
readiness, and executability]

## Would I Pilot This Framework?

[Yes / No / Maybe + 3-5 conditions]

## Key Findings by Severity

### Blockers

[List with file/section pointers]

### Major Issues

[List with file/section pointers]

## Fix Sequence

[Grouped by related issues for efficient execution, ordered by priority]
```

4. **Produce final backlog** — `.ignore/reviews/<RUN_DIR>/backlog.csv`
   (deduplicated, prioritized)
5. **Produce fix sequence** — `.ignore/reviews/<RUN_DIR>/fix-sequence.md`
   (grouped by related issues, actionable without additional context)
