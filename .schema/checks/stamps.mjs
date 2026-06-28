// Rule E — Last Updated stamp format + freshness (inventory category E).
// Every stamped doc file must carry a parseable `**Last Updated:** YYYY-MM-DD`
// (or template footer `<!-- Template Last Updated: YYYY-MM-DD … -->`), and the
// stamp must be >= the file's last git-commit date (not stale).

import { readFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { join } from "node:path";
import { minimatch } from "minimatch";

const STAMP_GLOBS = [
  "guides/*.md",
  "stages/**/*.md",
  "spec/*.md",
  "templates/*.md",
  // Root navigation/content files (README, INDEX, STYLE_GUIDE, CONTRIBUTING,
  // CLAUDE, AGENTS, QUICKSTART). `*.md` matches root-level files only — minimatch
  // `*` does not cross `/`, so nested files stay covered by the globs above.
  "*.md",
];

// Root `.md` files that legitimately carry no maintenance stamp.
const STAMP_EXCLUDE = ["CHANGELOG.md"];

export function parseStamp(content) {
  let m = content.match(/\*\*Last Updated:\*\*\s*(\d{4}-\d{2}-\d{2})/);
  if (m) return m[1];
  m = content.match(/<!--\s*Template Last Updated:\s*(\d{4}-\d{2}-\d{2})/);
  if (m) return m[1];
  return null;
}

// Format strictness (STYLE_GUIDE Notes Section Format): the maintenance
// `**Last Updated:**` stamp MUST be a bare `YYYY-MM-DD` with no trailing text. The
// Notes section is date + a single `Added to framework in vX.Y.Z.` origin line —
// no per-version change history (git history / CHANGELOG is the record). And the
// origin line MUST read "Added to framework", not "the framework".
// The first rule fires only on a REAL date (\d{4}-\d{2}-\d{2}) with trailing text,
// which intentionally exempts template fill-in lines (`**Last Updated:** YYYY-MM-DD
// **Increment:** …`) — there the date is a placeholder and the maintenance stamp is
// the `<!-- Template Last Updated: … -->` footer instead. A pipe-delimited
// structured continuation is also exempt (the INDEX header pairs the stamp with
// `| **Framework Version:** X.Y.Z`) — the rule targets free-text / em-dash change
// history trailing the stamp, not a second structured field.
export function stampFormatIssues(content) {
  const issues = [];
  const m = content.match(/^\*\*Last Updated:\*\* (\d{4}-\d{2}-\d{2})(.*)$/m);
  const trailing = m ? m[2].trim() : "";
  if (m && trailing !== "" && !trailing.startsWith("|")) {
    issues.push(
      "'**Last Updated:**' line must be a bare date YYYY-MM-DD — move change history to the 'Added to framework …' line",
    );
  }
  if (/^Added to the framework\b/m.test(content)) {
    issues.push("'Added to the framework' should read 'Added to framework'");
  }
  return issues;
}

function lastCommitDate(repoRoot, file) {
  try {
    const out = execFileSync("git", ["log", "-1", "--format=%cs", "--", file], {
      cwd: repoRoot,
      encoding: "utf8",
    }).trim();
    return out || null;
  } catch {
    return null;
  }
}

// In a shallow clone (e.g. a default CI checkout of a PR merge ref), `git log`
// reports the single fetched commit's date for every file, so freshness can't be
// determined and would false-flag every stamp. Skip freshness when shallow.
function isShallowRepo(repoRoot) {
  try {
    return (
      execFileSync("git", ["rev-parse", "--is-shallow-repository"], {
        cwd: repoRoot,
        encoding: "utf8",
      }).trim() === "true"
    );
  } catch {
    return false;
  }
}

export function runStamps(repoRoot, files) {
  const issues = [];
  const shallow = isShallowRepo(repoRoot);
  for (const file of files) {
    if (!STAMP_GLOBS.some((g) => minimatch(file, g))) continue;
    if (STAMP_EXCLUDE.some((g) => minimatch(file, g))) continue;
    let c;
    try {
      c = readFileSync(join(repoRoot, file), "utf8");
    } catch {
      continue;
    }
    const stamp = parseStamp(c);
    if (!stamp) {
      issues.push(`STAMP  ${file}  missing/malformed Last Updated`);
      continue;
    }
    for (const issue of stampFormatIssues(c)) {
      issues.push(`STAMP  ${file}  ${issue}`);
    }
    // Freshness: compare to the file's last commit date. Skip when there is no
    // committed history (untracked / shallow clone) — can't determine staleness.
    if (!shallow) {
      const commitDate = lastCommitDate(repoRoot, file);
      if (commitDate && stamp < commitDate) {
        issues.push(`STAMP  ${file}  stamp ${stamp} < last commit ${commitDate} (stale)`);
      }
    }
  }
  return issues;
}
