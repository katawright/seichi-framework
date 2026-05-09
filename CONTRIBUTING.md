# Contributing

## Releasing

```
/release-prep <version>     # updates VERSION, generates CHANGELOG, updates INDEX.md
# review, commit, PR, merge to main
/release                    # tags main, pushes tag, creates GitHub release
```

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
- **Sourced from retrospectives** — the Framework Feedback section of
  `templates/retrospective.md` is the intended place to capture observations
  during project work; reference those notes when filing issues

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
`npm ci`, which requires the lockfile to exactly match `package.json` — it
will fail on any mismatch rather than auto-resolving like `npm install` does.

**Cross-platform lockfile caveat:** `npm install` on Windows strips
optional Linux-only packages (e.g. `@emnapi/core`, native bindings) from
the lockfile. This causes `npm ci` to fail on Linux CI. After any manual
`npm install` on Windows that changes dependencies, regenerate the
lockfile in a Linux container: `bash scripts/lock-refresh.sh`. Dependabot
PRs don't need this — they generate lockfiles on Linux already.

---

## Notes

**Last Updated:** 2026-05-08

Added to framework in v0.24.0.
