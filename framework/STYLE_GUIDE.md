# Framework Documentation Style Guide

## Overview

This guide defines structural and formatting conventions for framework
documentation files. It is not framework content — it governs how framework
content is written.

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

1. Read the **Document Structure** section before creating or restructuring a
   file
2. Use the **Notes Section Format** and **Section Separators** rules when
   editing any file
3. Run the formatting command in **Formatting** on every file you modify
4. Refer to **Tone and Language** and **Narrative Flow** when writing new prose

---

## Document Structure

The canonical section order for every framework file:

1. **H1 title** — one per file, matching the document's purpose
2. **H2 Overview** — 1–2 sentence intro blurb, then H3 metadata:
   - **Why [Topic]** — motivates the reader; describes the problem or gap this
     document addresses. If two files have overlapping Why sections, consider
     merging them.
   - **Purpose** — bullet list of what the document delivers
   - **Key Principle** — the single most important idea to remember
   - **How to Use This [Guide/Scorecard]** — numbered navigation steps
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

- Link to other framework files by relative path (e.g.,
  `[Framework Guide](framework-guide.md)`)
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
| **Template files**              | `*-template.md`  | May omit Overview metadata  |
| **Scorecard / reference files** | `*-scorecard.md` | Standard structure          |

Only README-specific differences are currently defined. If new category-specific
rules emerge, document them here.

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

## Heading Conventions

- **H1:** Document title (one per file)
- **H2:** Major sections
- **H3:** Subsections within an H2
- **H4+:** Use sparingly; prefer restructuring into separate H2/H3 sections
- "How to Use" H3 label should match the document type (e.g., "How to Use This
  Guide", "How to Use This Scorecard")

---

## Notes

**Last Updated:** 2026-02-26

Added to framework in v0.19.0.
