// Guard RELNOTE — every vocabulary retirement reaches the release notes.
//
// `retired-vocab.json` is the durable record that a term left a closed set,
// and each entry carries the version that retired it. The CHANGELOG is how a
// downstream consumer learns the same fact. Nothing connected the two, and the
// gap is not hypothetical: `cancelled` and `the gate into` (both v0.59) shipped
// with no CHANGELOG line, while `moot` (v0.60) and the invented "Needs Review"
// ADR status did — which half a retirement landed in depended on whether
// someone happened to put it in a commit *subject* rather than a body, since
// `/release-prep` builds the entry from `git log --oneline`.
//
// The check is release-gated by construction: it fires only once a CHANGELOG
// section exists for the version in VERSION. During ordinary development that
// section does not exist yet, so the guard is silent; at release-prep, when the
// section is written, every retirement marked for that version must appear in
// it. CHANGELOG.md is exempt from the VOCAB check for exactly this reason
// (retired vocabulary in change history is conformant), so the same regexes
// that forbid a term everywhere else are reused here to require it.

import { readFileSync } from "node:fs";
import { join } from "node:path";

const RETIRED = ".schema/checks/retired-vocab.json";
const CHANGELOG = "CHANGELOG.md";
const VERSION_FILE = "VERSION";

/** `0.64.0` → the markers a retirement entry may use: `v0.64.0`, `v0.64`. */
export function versionMarkers(version) {
  const v = version.trim();
  const m = v.match(/^(\d+)\.(\d+)/);
  return m ? [`v${v}`, `v${m[1]}.${m[2]}`] : [`v${v}`];
}

/** The CHANGELOG body for `## <version> (…)`, or null when it has no section
 *  yet — the ordinary pre-release state. */
export function changelogSection(changelog, version) {
  const lines = changelog.split(/\r?\n/);
  const head = new RegExp(`^##\\s+${version.trim().replace(/\./g, "\\.")}\\b`);
  const start = lines.findIndex((l) => head.test(l));
  if (start === -1) return null;
  let end = start + 1;
  while (end < lines.length && !/^##\s/.test(lines[end])) end++;
  return lines.slice(start, end).join("\n");
}

/** Entries whose `replacement` names one of `markers`. */
export function retirementsFor(entries, markers) {
  return entries.filter((e) =>
    markers.some((mk) => (e.replacement || "").includes(mk)),
  );
}

/** All RELNOTE issues. Pure — unit-testable. */
export function retirementNoteIssues(entries, changelog, version) {
  const section = changelogSection(changelog, version);
  if (section === null) return []; // no section yet: not a release build
  const due = retirementsFor(entries, versionMarkers(version));
  const issues = [];
  for (const entry of due) {
    let re;
    try {
      re = new RegExp(entry.regex, (entry.flags || "").replace(/g/g, ""));
    } catch {
      issues.push(
        `RELNOTE  ${RETIRED}  entry \`${entry.regex}\` is not a valid regex`,
      );
      continue;
    }
    if (!re.test(section)) {
      issues.push(
        `RELNOTE  ${CHANGELOG}  v${version.trim()} retires \`${entry.regex}\` ` +
          `but its section never mentions it — add a bullet naming the retired ` +
          `term, its replacement (${entry.replacement.split("(")[0].trim()}), ` +
          `and where the retired meaning now lives`,
      );
    }
  }
  return issues;
}

export function runRetirementNotes(repoRoot) {
  let entries, changelog, version;
  try {
    entries = JSON.parse(readFileSync(join(repoRoot, RETIRED), "utf8"));
    version = readFileSync(join(repoRoot, VERSION_FILE), "utf8");
  } catch (err) {
    return [
      `RELNOTE  ${RETIRED}/${VERSION_FILE}  not readable: ${err.message}`,
    ];
  }
  try {
    changelog = readFileSync(join(repoRoot, CHANGELOG), "utf8");
  } catch {
    return []; // no CHANGELOG yet — nothing to gate
  }
  return retirementNoteIssues(entries, changelog, version);
}
