# Framework Documentation Style Guide

## Overview

Structural and formatting conventions for framework documentation files — not
framework content itself, but rules governing how framework content is written.

### Why This Guide

As the framework grows, documents drift in structure, tone, and formatting. A
shared style guide enables batch conformance reviews, speeds onboarding for
contributors, and keeps every file predictable for readers.

### Purpose

- Codify the document structure that emerged during the Phase 2 restructuring of
  the five top-level framework files
- Provide a single reference for contributors and reviewers
- Enable automated or manual conformance checks across all framework files

### Key Principle

Consistency reduces cognitive load. Readers who learn the structure of one
framework file should be able to navigate any other framework file without
reorientation.

### How to Use This Guide

1. Read the [**Document Structure**](#document-structure) section before
   creating or restructuring a file
2. Use the [**Notes Section Format**](#notes-section-format) and
   [**Section Separators**](#section-separators) rules when editing any file
3. Run the formatting command in [**Formatting**](#formatting) on every file you
   modify
4. Refer to [**Tone and Language**](#tone-and-language) and
   [**Narrative Flow**](#narrative-flow) when writing new prose

---

## Document Structure

The canonical section order for every framework file:

1. **H1 title** — one per file, matching the document's purpose
2. **H2 Overview** — 1–2 sentence intro blurb written as a noun-phrase fragment,
   not a "This guide…" sentence (e.g., "Practical guidance for…" or "Operational
   guidance for…"). Then H3 metadata:
   - **Why [Topic]** — motivates the reader; describes the problem or gap this
     document addresses. `[Topic]` is the document's subject matter, not the
     document itself (e.g., "Why Foundation Work", not "Why This Guide"). If two
     files have overlapping Why sections, consider merging them.
   - **Purpose** — bullet list of what the document delivers
   - **Key Principle** — the single most important idea to remember
   - **How to Use This [Guide/Scorecard]** — numbered navigation steps. Bold
     section names must be anchor links to the referenced heading (e.g.,
     `[**Quick Reference**](#quick-reference)`).
3. **Orienting reference table** (position 2, immediately after Overview) — a
   summary table giving readers the landscape before detail. Use when the file's
   content supports it (e.g., Quick Reference, Cross-Stage Overview). Not every
   file will have one.
4. **Body sections** — the file's substantive content as H2 sections
5. **H2 Notes** — always the last H2

---

## Notes Section Format

Every file ends with:

```markdown
## Notes

**Last Updated:** YYYY-MM-DD

Added to framework in vX.Y.Z.
```

Rules:

- `**Framework Version:** X.Y.Z` appears only in README files, on the line
  immediately before `**Last Updated:**`
- "Added to framework" line is plain text (not italic, not bold)
- Update the **Last Updated** date whenever the file is modified

---

## Section Separators

Use `---` (horizontal rule) between every H2 section. Do not use separators
between H3 subsections within an H2.

---

## Formatting

- Run `npx prettier --prose-wrap always --print-width 80 --write <file>` on
  every modified file
- Use bold (`**text**`) for emphasis and key terms
- Use italic (`_text_`) sparingly for defined terms or stage names in running
  text
- Use tables for structured comparisons; prefer tables over long bullet lists
  when data has 2+ dimensions
- Use blockquotes (`>`) only for callouts and asides, not for opening
  descriptions

---

## Cross-Linking

- Use the file's title as link text, not the raw filename (e.g.,
  `[Framework Guide](framework-guide.md)`, not `framework-guide.md`)
- Link to other framework files by relative path
- Use fragment anchors (`#section-name`) only when linking to a specific section
  within another file
- When renaming or reordering headings, grep for the old anchor across the repo
  before committing

---

## File Categories

Files fall into categories that may have type-specific conventions:

| Category                        | Example pattern  | Notes section extras        |
| ------------------------------- | ---------------- | --------------------------- |
| **README files**                | `README.md`      | Include `Framework Version` |
| **Guide files**                 | `*-guide.md`     | Standard structure          |
| **Template files**              | `*-template.md`  | HTML comment metadata       |
| **Scorecard / reference files** | `*-scorecard.md` | Standard structure          |

**Template file conventions:**

- Location: `framework/templates/` — pure fill-in-the-blank files, no guidance
  prose
- Omit the `## Notes` section; instead end with an HTML comment:
  `<!-- Template Last Updated: YYYY-MM-DD | Added in vX.Y.Z -->`
- Use `YYYY-MM-DD` as a placeholder for dates that users fill in (e.g.,
  `**Last Updated:** YYYY-MM-DD`)
- Keep guidance content (naming conventions, tips, examples) in the relevant
  stage guide, not in the template itself
- Cross-references to other templates use HTML comments rather than visible
  blockquotes

---

## Tone and Language

- Write for practitioners — direct, concrete, actionable
- Use "you/your" to address the reader, not "one should" or "teams should"
  (except when specifically discussing team dynamics)
- Prefer active voice ("Teams choose a tier") over passive ("A tier is chosen")
- Name the problem before the solution — motivate before prescribing
- Avoid jargon without context; define terms on first use or link to their
  definition
- Keep sentences short when conveying rules or steps; use longer sentences only
  when connecting ideas

---

## Narrative Flow

Within-section writing patterns:

- **Context before detail** — open each section with 1–2 sentences orienting the
  reader before diving into specifics
- **Concrete before abstract** — anchor concepts with examples, then generalize
- **Consistent option patterns** — when presenting choices (tiers, modes,
  approaches), follow a repeatable structure: definition → when to choose →
  examples
- **Tables orient, prose explains** — use tables for structured comparisons; use
  prose to explain the reasoning behind the structure
- **Progressive disclosure** — order sections so each builds on the previous
  one; avoid forward references to sections the reader hasn't reached yet

---

## Checklist Conventions

Structure for stage checklist files:

1. **H1 title**
2. **Purpose + Usage** — one-line purpose and one-line usage instruction
3. **[H] marker convention** — blockquote explaining human-judgment markers
4. **Numbered items with checkboxes** — one assertion per item,
   observable/verifiable language. If the checklist has blocking items, split
   into **Core** (H3) and **Supporting** (H3) subsections; otherwise a flat list
   is fine
5. **Final Decision** — checkbox pair (Ready / Not Ready) with circulation
   guidance
6. **Core Items** — table mapping each blocking item to its rationale (omit if
   no Core/Supporting split)
7. **Related Documents** — links to template, guide, reference, and stages
8. **Notes** — standard format

Item format:

```
N. [ ] **Bold assertion** (parenthetical qualifier)
N. [ ] **[H] Bold assertion** (parenthetical qualifier)
```

- The number and checkbox come first: `1. [ ] **...**`
- The assertion is bold and states a single observable quality
- Parenthetical qualifiers after the bold provide clarification or thresholds
- `[H]` goes inside the bold, before the assertion text, for items requiring
  human judgment

Item design rules:

- One assertion per item — each item tests a single, observable quality
- Order items from most critical to least critical — all items apply at every
  tier, with depth varying by project complexity
- When using a Core/Supporting split, core items are exactly the items mapped in
  the Core Items rationale table
- Use the 60-90 second completion goal as the constraint on item count rather
  than a fixed number
- AI assistance callout at end of Core Items section

---

## Stage Directory Conventions

Canonical file set per stage directory:

| File                   | Purpose                                                                                                |
| ---------------------- | ------------------------------------------------------------------------------------------------------ |
| `README.md`            | The stage guide — overview, quick reference, AI assistance, right-sizing, workflow, rationale, outputs |
| `[stage]-checklist.md` | Quick validation gate with critical items                                                              |
| `[stage]-reference.md` | Examples and format guidance (optional — only if enough concrete examples justify it)                  |

Templates live in `/framework/templates/`:

| File                    | Purpose                               |
| ----------------------- | ------------------------------------- |
| `[stage]-*-template.md` | Pure fill-in-the-blank stage artifact |

---

## Heading Conventions

- **H1:** Document title (one per file)
- **H2:** Major sections
- **H3:** Subsections within an H2
- **H4+:** Use sparingly; prefer restructuring into separate H2/H3 sections
- "How to Use" H3 label should match the document type (e.g., "How to Use This
  Guide", "How to Use This Scorecard")

---

## Notes

**Last Updated:** 2026-02-27

Added to framework in v0.19.0.
