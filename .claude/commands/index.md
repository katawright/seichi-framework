---
description: Update INDEX.md to reflect current framework files
allowed-tools: Read, Edit, Write, Glob, Grep
---

# /index — Update Framework File Index

You are updating `INDEX.md` to reflect the current state of framework files on
disk.

---

## Step 1: Scan the Repository

Use Glob to find all `.md` files in these locations:

- Root: `*.md` (top-level only)
- `guides/**/*.md`
- `stages/**/*.md`
- `templates/**/*.md`

**Exclude** files under these directories (per CLAUDE.md and convention):

- `.ignore/`
- `.obsidian/`
- `.evaluation/`
- `.claude/`
- `node_modules/`
- Any other dotfile directory

Also exclude `INDEX.md` itself — it is the file being updated, not an entry.

**Exclude** these contributor/tooling files (not framework-usage content):

- `AGENTS.md`, `CLAUDE.md`, `CONTRIBUTING.md`, `STYLE_GUIDE.md`
- `.schema/` directory
- `.github/` directory

---

## Step 2: Read Current INDEX.md

Read `INDEX.md` and parse its table sections:

- **Root Files** — top-level `.md` files
- **Guides** — files under `guides/`
- **Stage Artifacts** — files under `stages/`, grouped by stage subsection
- **Templates** — files under `templates/`

Build an inventory of existing entries keyed by file path.

---

## Step 3: Diff Against Filesystem

Compare the scanned file list against the current INDEX.md inventory:

### New files (on disk but not in INDEX.md)

For each new file:

1. Read the file's front matter and first ~30 lines.
2. Generate a table row with:
   - **Path** — relative path in backtick-quoted format
   - **Description** — one-line summary based on file content
   - **Keywords** — 3–6 comma-separated terms
   - **Refs/Stage** — related stages or guides based on content and location
   - **Tier** — `core` for READMEs and primary guides, `ref` for everything else
3. Insert the row in alphabetical order by file path within its table section.

### Removed files (in INDEX.md but not on disk)

Remove the row from the table. If a stage subsection becomes empty, remove the
subsection.

### Renamed or moved files

If a file path in INDEX.md no longer exists but a file with very similar content
exists at a new path, update the path rather than removing and re-adding.

### Existing files

Leave unchanged. Do not regenerate descriptions for files that still exist at
the same path.

---

## Step 4: Update Section Counts

Each section heading includes a count in parentheses, e.g., `## Guides (15)`.
Update these counts to match the actual number of entries after changes.

Also update the counts in the "How to Use This Index" anchor links if they
appear in the body text.

---

## Step 5: Update Front Matter

Edit the `generated:` field in the INDEX.md YAML front matter to today's date
(YYYY-MM-DD format).

Do **not** change the `version:` field — that is managed by `/release`.

---

## Step 6: Write INDEX.md

- If only a few rows changed, use Edit for targeted changes.
- If the diff is large (many additions/removals), use Write to rewrite the file,
  preserving the existing structure, section ordering, column format, and Notes
  section.

---

## Step 7: Report

Display a summary:

```
INDEX.md updated.

  Added:   <N> file(s)
  Removed: <N> file(s)
  Total:   <N> entries
```

If nothing changed, display:

```
INDEX.md is already up to date (<N> entries).
```
