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
    // Freshness: compare to the file's last commit date. Skip when there is no
    // committed history (untracked / shallow clone) — can't determine staleness.
    const commitDate = lastCommitDate(repoRoot, file);
    if (commitDate && stamp < commitDate) {
      issues.push(`STAMP  ${file}  stamp ${stamp} < last commit ${commitDate} (stale)`);
    }
  }
  return issues;
}
