---
description:
  Update VERSION, generate CHANGELOG entry, update INDEX.md, and build the
  release zip
allowed-tools:
  Bash(git log:*), Bash(git tag:*), Bash(git describe:*), Bash(git diff:*),
  Bash(npm run release:*), Read, Edit, Write, Glob, Grep
---

# /release-prep — Prepare a Framework Release

You are preparing a release of the Seichi Framework. This command updates
VERSION, generates a CHANGELOG entry, updates INDEX.md, and builds the release
zip via `npm run release`. After this command completes, the user will commit,
merge to main, and run `/release`.

The version argument is required. Usage: `/release-prep 0.43.0`

---

## Step 1: Update VERSION

Write the provided version number to the `VERSION` file (no trailing newline
beyond what already exists). Display:

```
VERSION: <old> → <new>
```

If VERSION already contains the provided version, display that it's already
current and continue.

---

## Step 2: Generate CHANGELOG Entry

### 2a: Find the previous release tag

```
git describe --tags --abbrev=0
```

If no tags exist, use the root commit as the base.

### 2b: Collect commits since the last tag

```
git log <previous-tag>..HEAD --oneline
```

### 2c: Group commits by Conventional Commit type

Parse each commit message and group into these CHANGELOG sections:

- **Features** — `feat` commits (new capabilities, new files/guides)
- **Improvements** — `refactor`, `docs`, `style` commits (enhancements to
  existing content)
- **Bug Fixes** — `fix` commits

Omit `chore`, `test`, `ci` commits from the CHANGELOG — these are internal. If a
section would be empty, omit it entirely.

### 2d: Write the entry

Format each entry as a bullet point with the scope in bold:

```markdown
## X.Y.Z (YYYY-MM-DD)

### Features

- **scope:** description
- **scope:** description

### Improvements

- **scope:** description

### Bug Fixes

- **scope:** description
```

### 2e: Prepend to CHANGELOG.md

Insert the new entry after the `# Changelog` heading and before the first
existing `## ` version heading. Preserve all existing entries unchanged.

If `CHANGELOG.md` does not exist, create it with a `# Changelog` heading
followed by the new entry.

---

## Step 3: Update INDEX.md

### 3a: Scan the repository

Use Glob to find all `.md` files in these locations:

- Root: `*.md` (top-level only)
- `guides/**/*.md`
- `spec/**/*.md`
- `stages/**/*.md`
- `templates/**/*.md`

Also scan the **kernel interface files** — the only non-`.md` entries INDEX
tracks:

- `spec/{vocabulary,rules,schemas,generated}/*` — every entry, not only the
  `.yaml`/`.json` ones. The `index-counts` guard counts the whole tree, so a
  future kernel source with a different extension would be counted there and
  invisible here, producing a fatal COUNT this command could not self-heal.

**Filter by the `FRAMEWORK_INCLUDES` allowlist in `scripts/release/index.ts`** —
it is the authoritative definition of the release surface. (`.gitattributes`
`export-ignore` marks govern GitHub's source-archive tarballs, not the released
zip; the two lists agree today, but the allowlist is the one that decides.)

Also exclude `INDEX.md` itself — it is the file being updated, not an entry.

### 3b: Read current INDEX.md

Read `INDEX.md` and parse its table sections:

- **Root Files** — top-level `.md` files
- **Guides** — files under `guides/`
- **Spec** — `.md` files at the **top level** of `spec/` only
- **Kernel** — files under `spec/vocabulary/`, `spec/rules/`, `spec/schemas/`,
  and `spec/generated/` (including the one `.md`, `spec/generated/reference.md`
  — it belongs here, never in Spec)
- **Stage Artifacts** — files under `stages/`, grouped by stage subsection
- **Templates** — files under `templates/`

Build an inventory of existing entries keyed by file path.

### 3c: Diff against filesystem

Compare the scanned file list against the current INDEX.md inventory:

**New files (on disk but not in INDEX.md):**

For each new file:

1. Read the file's front matter and first ~30 lines.
2. Generate a table row with:
   - **Path** — relative path in backtick-quoted format
   - **Description** — one-line summary based on file content
   - **Keywords** — 3–6 comma-separated terms
   - **Refs/Stage** — related stages or guides based on content and location
   - **Tier** — `core` for READMEs and primary guides, `ref` for everything else
3. Insert the row in alphabetical order by file path within its table section.

**Removed files (in INDEX.md but not on disk):**

Remove the row from the table. If a stage subsection becomes empty, remove the
subsection.

**Renamed or moved files:**

If a file path in INDEX.md no longer exists but a file with very similar content
exists at a new path, update the path rather than removing and re-adding.

**Existing files:**

Leave unchanged. Do not regenerate descriptions for files that still exist at
the same path.

### 3d: Update section counts

Each section heading includes a count in parentheses, e.g., `## Guides (15)`.
Update these counts to match the actual number of entries after changes.

Also update the counts in the "How to Use This Index" anchor links if they
appear in the body text.

### 3e: Update header

Update the `**Last Updated:**` date in the INDEX.md header to today's date
(YYYY-MM-DD format).

Update the `**Framework Version:**` field to match the version from Step 1.

### 3f: Write INDEX.md

- If only a few rows changed, use Edit for targeted changes.
- If the diff is large (many additions/removals), use Write to rewrite the file,
  preserving the existing structure, section ordering, column format, and Notes
  section.

---

## Step 4: Build the Release Zip

Run `npm run release` to produce `manifest.json` (gitignored, repo root) and
`dist/framework-vX.Y.Z.zip`. The script reads VERSION and INDEX.md that you just
updated, validates the projected manifest against the Zod schema, and emits a
deterministic STORE-mode zip.

If the script fails with a schema or projection error, the source-tree content
is inconsistent with what the projector expects (e.g., frontmatter is malformed
in a stage README). Surface the error and **stop** — do not proceed with the
release until it is fixed.

If the script reports a version mismatch (manifest version vs VERSION file),
that means Step 1 didn't take effect. Re-check VERSION before re-running.

Capture the reported zip path and artifact counts (stages, artifacts) for the
Step 5 summary.

---

## Step 5: Report

Display a summary:

```
Release prep complete for vX.Y.Z.

  VERSION:   updated
  CHANGELOG: <N> entries added (Features: N, Improvements: N, Fixes: N)
  INDEX.md:  <N> added, <N> removed, <total> entries
  Zip:       dist/framework-vX.Y.Z.zip (<N> stages, <N> artifacts)

Next steps:
  1. Review changes and commit (the zip and manifest.json are gitignored)
  2. Create PR and merge to main
  3. Run /release
```
