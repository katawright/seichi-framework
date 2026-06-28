# Contributing

## Releasing

A framework release ships two artifacts:

- The **source tree** at a tagged commit on `main` (read by humans and tools
  browsing the repo).
- A **packaged zip** (`dist/framework-vX.Y.Z.zip`) containing only the framework
  surface — <!-- ships-list -->`guides/`, `spec/`, `stages/`, `templates/`,
  `INDEX.md`, `QUICKSTART.md`, `README.md`, `VERSION`, plus a generated
  `manifest.json`. The zip is the canonical artifact downstream consumers (e.g.,
  Theia) fetch and project; it is attached to the GitHub release and uploaded to
  S3.

The release flow is two slash commands plus an explicit packaging step:

```
/release-prep <version>     # update VERSION, CHANGELOG, INDEX.md
                            # then run `npm run release` to produce the zip
                            # review, commit (lockfile if any), PR, merge to main
/release                    # tag main, push tag, create GitHub release
                            # attach dist/framework-vX.Y.Z.zip
```

### What `npm run release` does

`scripts/release/index.ts` projects the source tree into a Zod-validated
`manifest.json`, stages the framework surface into a clean directory (excluding
maintainer-only paths like `.schema/`, `scripts/`, `.obsidian/`,
`node_modules/`), and emits a deterministic STORE-mode zip into `dist/`. The zip
is byte-identical across runs from the same source tree, so the artifact
attached to the GitHub release is reproducible.

The manifest is _not_ committed (`.gitignore`d as a build artifact). It is
written into the repo root for inspection alongside the zip.

### Prerequisites

- `npm install` (first-time setup, and after dependency changes — see
  [Dependencies](#dependencies) below).
- `podman` or `docker` only if regenerating the lockfile after a dependency
  change.

### Manual release recipe

If you ever need to run the steps without the slash commands:

```bash
# 1. Bump VERSION and INDEX.md "Last Updated" header to match the release
# 2. Update CHANGELOG.md with entries since the last tag
# 3. Build and verify the release artifacts
npm run release        # writes manifest.json + dist/framework-vX.Y.Z.zip
# 4. Commit, PR, merge to main
# 5. Tag and publish
git tag vX.Y.Z
git push origin vX.Y.Z
gh release create vX.Y.Z --title "vX.Y.Z" \
  --notes-file <(extract-changelog-section vX.Y.Z) \
  dist/framework-vX.Y.Z.zip
```

The slash commands automate steps 1–2 and 5.

---

## How to Suggest Improvements

Open a GitHub issue describing what you'd like to change and why. Include enough
context for maintainers to evaluate the suggestion without needing a follow-up
conversation.

---

## How to Submit Changes

1. Fork the repository
2. Create a feature branch from `main`
3. Make your changes
4. Open a pull request against `main`

---

## What Makes a Good Suggestion

The best suggestions are:

- **Specific** — point to a concrete template, checklist item, or guide section
- **Grounded in project experience** — describe what you encountered while using
  the framework, not hypothetical improvements
- **Sourced from retrospectives** — the Process Feedback section of
  `templates/retrospective.md` collects framework friction triaged from the
  project's friction log; reference those notes when filing issues

---

## Conventions

Follow these when making changes:

- **Document formatting:** follow [STYLE_GUIDE.md](STYLE_GUIDE.md)
- **Project working instructions:** follow [CLAUDE.md](CLAUDE.md) (AI agents
  should read this before making changes)
- **Commit messages:** use
  [Conventional Commits](https://www.conventionalcommits.org/)
  (`type(scope): description`)

---

## Evaluation Tooling

Review rubrics and simulation plans live in `.evaluation/`. See
[Evaluation Rubric](.evaluation/rubric.md) for instructions on running a
framework evaluation.

---

## Dependencies

Always commit `package-lock.json` alongside `package.json` changes. CI uses
`npm ci`, which requires the lockfile to exactly match `package.json` — it will
fail on any mismatch rather than auto-resolving like `npm install` does.

**Cross-platform lockfile caveat:** `npm install` on Windows strips optional
Linux-only packages (e.g. `@emnapi/core`, native bindings) from the lockfile.
This causes `npm ci` to fail on Linux CI. After any manual `npm install` on
Windows that changes dependencies, regenerate the lockfile in a Linux container:
`bash scripts/lock-refresh.sh`. Dependabot PRs don't need this — they generate
lockfiles on Linux already.

---

## Notes

**Last Updated:** 2026-06-28

Added to framework in v0.24.0.
