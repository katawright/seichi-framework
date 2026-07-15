// Schema-equivalence comparison — the Phase 2 exit-gate harness.
//
// Compares the schema-facing projection (spec/generated/schema-projection.json)
// value-by-value against a consumer's pgEnum declarations, and reports, per
// enum: EQUAL, DELTA (with the exact value differences), or NOT-IN-SLICE
// (consumer enums no kernel vocabulary projects to yet).
//
//   node scripts/release/kernel/compare-schema.mjs <path-to-enums.ts>
//
// The consumer's enums file is passed explicitly; this repo hard-codes no
// consumer location. Exit code 0 = every projected enum EQUAL; 1 = at least
// one DELTA (deltas must then be explicitly reviewed — the exit gate's
// second leg); 2 = usage/parse error.

import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(__dirname, "..", "..", "..");

const enumsPath = process.argv[2];
if (!enumsPath) {
  process.stderr.write(
    "Usage: node scripts/release/kernel/compare-schema.mjs <path-to-enums.ts>\n",
  );
  process.exit(2);
}

/** Parse pgEnum("name", ["a", "b", ...]) declarations from a drizzle source file. */
export function parsePgEnums(text) {
  const enums = {};
  const re = /pgEnum\(\s*"([^"]+)"\s*,\s*\[([\s\S]*?)\]\s*\)/g;
  let m;
  while ((m = re.exec(text)) !== null) {
    const values = [...m[2].matchAll(/"([^"]+)"/g)].map((v) => v[1]);
    enums[m[1]] = values;
  }
  return enums;
}

function setDiff(a, b) {
  return a.filter((x) => !b.includes(x));
}

let consumerText;
try {
  consumerText = readFileSync(resolve(enumsPath), "utf8");
} catch (err) {
  process.stderr.write(`Cannot read consumer enums file: ${err.message}\n`);
  process.exit(2);
}
const consumerEnums = parsePgEnums(consumerText);

const projection = JSON.parse(
  readFileSync(resolve(REPO_ROOT, "spec/generated/schema-projection.json"), "utf8"),
);

const lines = [];
let deltas = 0;

lines.push(`# Schema equivalence comparison`);
lines.push(``);
lines.push(
  `Projection: framework ${projection.meta.framework_version}, kernel ` +
    `interface ${projection.meta.kernel_interface_version}, ` +
    `${projection.meta.source_hash}`,
);
lines.push(``);
lines.push(`| Enum | Verdict | Detail |`);
lines.push(`| --- | --- | --- |`);

for (const [enumName, entry] of Object.entries(projection.enums)) {
  const consumer = consumerEnums[enumName];
  if (!consumer) {
    deltas++;
    lines.push(`| \`${enumName}\` | DELTA | enum not found in consumer file |`);
    continue;
  }
  const missing = setDiff(entry.values, consumer); // projected but absent
  const extra = setDiff(consumer, entry.values); // consumer-only
  if (missing.length === 0 && extra.length === 0) {
    lines.push(`| \`${enumName}\` | EQUAL | ${entry.values.length} values |`);
  } else {
    deltas++;
    const detail = [
      missing.length ? `framework-only: ${missing.join(", ")}` : null,
      extra.length ? `consumer-only: ${extra.join(", ")}` : null,
    ]
      .filter(Boolean)
      .join("; ");
    lines.push(`| \`${enumName}\` | DELTA | ${detail} |`);
  }
}

const projected = new Set(Object.keys(projection.enums));
const notInSlice = Object.keys(consumerEnums).filter((e) => !projected.has(e));
lines.push(``);
lines.push(
  `Consumer enums outside the projected slice (${notInSlice.length}): ` +
    notInSlice.map((e) => `\`${e}\``).join(", "),
);
lines.push(``);
lines.push(
  deltas === 0
    ? `Verdict: every projected enum compares EQUAL.`
    : `Verdict: ${deltas} enum(s) carry a DELTA — each must be explicitly reviewed.`,
);
lines.push(``);

process.stdout.write(lines.join("\n"));
process.exit(deltas === 0 ? 0 : 1);
