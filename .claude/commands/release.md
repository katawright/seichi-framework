---
description: Bump VERSION, update INDEX.md, commit, tag main, and push the tag
argument-hint: <new-version e.g. 0.42.0> (optional — defaults to minor bump)
allowed-tools: Bash(git status:*), Bash(git tag:*), Bash(git add:*), Bash(git commit:*), Bash(git diff:*), Bash(git log:*), Bash(git push:*), Bash(git fetch:*), Read, Edit, Write, Glob, Grep
---

# /release — Framework Version Release

You are performing a versioned release of the AI-Assisted SDLC Framework.

The new version is: `$ARGUMENTS` (may be empty — see Step 1).

---

## Step 1: Validate Arguments

Determine the new version:

- **If `$ARGUMENTS` is empty:** read the current `VERSION` file, bump MINOR
  by 1, and reset PATCH to 0. For example, `0.41.0` → `0.42.0`. Use this
  computed version for all subsequent steps.
- **If `$ARGUMENTS` is provided:** parse it as a semantic version
  (`MAJOR.MINOR.PATCH`).
  - Each component must be a non-negative integer.
  - Reject pre-release suffixes (e.g., `1.0.0-beta`), build metadata
    (e.g., `1.0.0+build`), or any format that is not exactly three
    dot-separated integers.
  - If `$ARGUMENTS` is invalid (but not empty), display the following and
    **stop**:

```
Usage: /release [MAJOR.MINOR.PATCH]
Example: /release 0.42.0
Omit the version to auto-bump minor: 0.41.0 → 0.42.0
```

---

## Step 2: Pre-flight Checks

Run these checks **in order**. If any check fails, report the problem and
**stop** — do not continue to later steps.

1. **Clean working tree** — run `git status`. There must be no uncommitted
   changes (staged or unstaged) and no untracked files that would be included
   in a commit. If the tree is dirty, list the offending files and stop.

2. **Read current version** — read the `VERSION` file. Display:

   ```
   Current: <old> → New: <new>
   ```

3. **Version ordering** — the new version must be strictly greater than the
   current version (compare major, then minor, then patch numerically). If
   not, report the problem and stop.

4. **Fetch latest main** — run `git fetch origin main` so that
   `origin/main` is up to date.

---

## Step 3: Update INDEX.md Contents

Before updating version numbers, ensure INDEX.md reflects the current
framework files. Follow the same logic as the `/index` command:

1. **Scan the repo** — Glob for all `.md` files under `guides/`, `stages/`,
   `templates/`, and root (`*.md`). Exclude `.ignore/`, `.obsidian/`,
   `.evaluation/`, `.claude/`, `node_modules/`, dotfile directories, and
   `INDEX.md` itself.
2. **Read current INDEX.md** — parse the existing table sections to get the
   current inventory (path → row data).
3. **Diff against filesystem:**
   - **New files** — read front matter and first ~30 lines to generate
     Description, Keywords, Refs/Stage, and Tier. Add to the appropriate
     table section.
   - **Removed files** — entries whose paths no longer exist on disk. Remove
     from the table.
   - **Renamed/moved files** — detect by similar content; update the path.
   - **Existing files** — leave unchanged.
4. **Update section counts** in headings to match actual entry counts.
5. **Update front matter** — set `generated:` to today's date. Do not touch
   `version:` yet (that happens in Step 4).
6. If nothing changed (aside from the generated date), that is fine — proceed.

---

## Step 4: Update Version Files

Update exactly two files:

1. **`VERSION`** — overwrite the entire file with the new version string
   (no trailing newline beyond what Write produces).

2. **`INDEX.md`** — edit the `version:` field in the YAML front matter to
   the new version. Do not change any other content.

---

## Step 5: Commit

1. Stage only `VERSION` and `INDEX.md`:

   ```
   git add VERSION INDEX.md
   ```

2. Create the commit with this exact message format:

   ```
   chore(framework): bump version to X.Y.Z

   Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>
   ```

   Use a heredoc to pass the message to `git commit -m`.

---

## Step 6: Tag Latest Main

Create a lightweight tag pointing at `origin/main` HEAD:

```
git tag vX.Y.Z origin/main
```

This tags main's current HEAD, **not** the version-bump commit on the
current branch.

---

## Step 7: Push the Tag

Push only the tag — do **not** push the current branch:

```
git push origin vX.Y.Z
```

---

## Step 8: Report

Display a summary:

```
Release complete.

  Version bump commit: <short-hash> on branch <branch-name>
  Tag:                 vX.Y.Z
  Tagged commit:       <short-hash> (origin/main)
  Tag pushed:          yes

Next steps:
  - Push your branch and open a PR to merge the version bump to main.
```

---

## What This Command Does NOT Do

- Push the current branch (you handle that via PR workflow)
- Merge to main or create a PR
- Update `Last Updated` dates in framework files
- Run prettier
