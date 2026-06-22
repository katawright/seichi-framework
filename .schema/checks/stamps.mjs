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
];

export function parseStamp(content) {
  let m = content.match(/\*\*Last Updated:\*\*\s*(\d{4}-\d{2}-\d{2})/);
  if (m) return m[1];
  m = content.match(/<!--\s*Template Last Updated:\s*(\d{4}-\d{2}-\d{2})/);
  if (m) return m[1];
  return null;
}

// Format strictness (STYLE_GUIDE Notes Section Format): the maintenance
// `**Last Updated:**` stamp MUST be a bare `YYYY-MM-DD` — change history belongs
// on the `Added to framework in vX.Y.Z.` line below, not trailing the stamp. And
// the change-history line MUST read "Added to framework", not "the framework".
// The first rule fires only on a REAL date (\d{4}-\d{2}-\d{2}) with trailing text,
// which intentionally exempts template fill-in lines (`**Last Updated:** YYYY-MM-DD
// **Increment:** …`) — there the date is a placeholder and the maintenance stamp is
// the `<!-- Template Last Updated: … -->` footer instead.
export function stampFormatIssues(content) {
  const issues = [];
  const m = content.match(/^\*\*Last Updated:\*\* (\d{4}-\d{2}-\d{2})(.*)$/m);
  if (m && m[2].trim() !== "") {
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

export function runStamps(repoRoot, files) {
  const issues = [];
  for (const file of files) {
    if (!STAMP_GLOBS.some((g) => minimatch(file, g))) continue;
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
    const commitDate = lastCommitDate(repoRoot, file);
    if (commitDate && stamp < commitDate) {
      issues.push(`STAMP  ${file}  stamp ${stamp} < last commit ${commitDate} (stale)`);
    }
  }
  return issues;
}
