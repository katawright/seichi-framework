---
description:
  Tag main, push the tag, and create the GitHub release with the framework zip
  attached
allowed-tools:
  Bash(git status:*), Bash(git tag:*), Bash(git log:*), Bash(git push:*),
  Bash(git fetch:*), Bash(git pull:*), Bash(npm run release:*), Bash(gh release
  create:*), Bash(ls:*), Bash(test:*), Read
---

# /release — Cut a Framework Release

You are cutting a release of the Seichi Framework from main. The VERSION file on
main already contains the correct version — your job is to tag, push, and create
the GitHub release with `dist/framework-vX.Y.Z.zip` attached.

---

## Step 1: Pre-flight Checks

Run these checks **in order**. If any check fails, report the problem and
**stop**.

1. **On main** — verify the current branch is `main`. If not, stop.

2. **Clean working tree** — run `git status`. There must be no uncommitted
   changes (staged or unstaged). If the tree is dirty, list the offending files
   and stop.

3. **Pull latest** — run `git pull origin main` to ensure the local branch is up
   to date with the remote.

---

## Step 2: Read Version

Read the `VERSION` file to determine the release version. Display:

```
Releasing: vX.Y.Z
```

---

## Step 3: Validate Tag

Check that the tag `vX.Y.Z` does not already exist:

```
git tag -l vX.Y.Z
```

If the tag already exists, display an error and **stop**.

---

## Step 4: Tag

Create a lightweight tag on the current HEAD (which is now up-to-date main):

```
git tag vX.Y.Z
```

---

## Step 5: Push the Tag

```
git push origin vX.Y.Z
```

---

## Step 6: Build the Release Zip

Check whether `dist/framework-vX.Y.Z.zip` already exists locally (it would if
`/release-prep` was run on the same machine and `dist/` wasn't cleaned).

- **If present:** trust it. The zip is deterministic and the source-tree state
  on `main` matches what the prep step ran against, so re-running the build
  would produce a byte-identical artifact.
- **If absent:** run `npm run release` to produce it. If the script fails, the
  source tree on main is inconsistent — surface the error and **stop**.

Either way, verify the zip exists at `dist/framework-vX.Y.Z.zip` before
proceeding to Step 7.

---

## Step 7: Create GitHub Release

Create a GitHub release from the pushed tag using the `CHANGELOG.md` entry for
this version as the release body, with the framework zip attached:

1. Read `CHANGELOG.md` and extract the section for version `X.Y.Z` (the text
   between the `## X.Y.Z` heading and the next `## ` heading or end of file).
2. Create the release with the zip attached:

   ```
   gh release create vX.Y.Z --title "vX.Y.Z" --notes "<extracted notes>" \
     dist/framework-vX.Y.Z.zip
   ```

   Use a heredoc to pass the notes to `--notes` to preserve formatting.

If `CHANGELOG.md` does not exist or has no entry for this version, create the
release with `--generate-notes` instead to use GitHub's auto-generated notes
(still attaching the zip).

---

## Step 8: Report

Display a summary:

```
Release complete.

  Tag:            vX.Y.Z
  Tagged commit:  <short-hash>
  Asset:          dist/framework-vX.Y.Z.zip
  GitHub release: <release-url>
```
