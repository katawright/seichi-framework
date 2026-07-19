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
/** Declared consumer-side values the framework has already moved off of, and
 *  the consumer still carries — the open two-phase migrations. */
const pendingMigrations = [];

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
  // A projection entry may declare a subset relationship (VC-9): the
  // consumer's enum is the ratified set plus exactly the declared
  // consumer-side substrate. Declared values are allowed (and expected);
  // anything else stays a DELTA.
  const substrate = entry.consumer_substrate ?? [];
  const pending = Object.keys(entry.consumer_pending ?? {});
  const declared = [...substrate, ...pending];
  const undeclaredExtra = extra.filter((v) => !declared.includes(v));
  // A declared value the consumer no longer carries is the second phase
  // landing: for a pending migration that is the good news, but the
  // declaration must be removed in the same cycle or the projection keeps
  // asserting a value nobody has. Either way it is a DELTA until reconciled.
  const declaredAbsent = declared.filter((v) => !extra.includes(v));
  for (const v of pending) {
    if (extra.includes(v)) {
      pendingMigrations.push({
        enumName,
        value: v,
        note: entry.consumer_pending[v],
      });
    }
  }
  if (missing.length === 0 && extra.length === 0 && declared.length === 0) {
    lines.push(`| \`${enumName}\` | EQUAL | ${entry.values.length} values |`);
  } else if (
    declared.length > 0 &&
    missing.length === 0 &&
    undeclaredExtra.length === 0 &&
    declaredAbsent.length === 0
  ) {
    const detail = [
      substrate.length ? `substrate: ${substrate.join(", ")}` : null,
      pending.length ? `**pending migration: ${pending.join(", ")}**` : null,
    ]
      .filter(Boolean)
      .join("; ");
    lines.push(
      `| \`${enumName}\` | EQUAL (declared subset) | ${entry.values.length} ` +
        `framework values ⊂ ${consumer.length}; ${detail} |`,
    );
  } else {
    deltas++;
    const detail = [
      missing.length ? `framework-only: ${missing.join(", ")}` : null,
      undeclaredExtra.length
        ? `consumer-only (undeclared): ${undeclaredExtra.join(", ")}`
        : null,
      declaredAbsent.length
        ? `declared consumer-only value absent from consumer: ${declaredAbsent.join(", ")}`
        : null,
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
// Open two-phase migrations, listed as the to-do list they are. These do NOT
// affect the exit code: a pending migration is a green, sanctioned state — the
// declaration is what keeps the comparison EQUAL while the consumer catches
// up. Listing them separately is the point; a value queued to disappear and a
// value that belongs to the consumer forever read identically otherwise.
if (pendingMigrations.length) {
  lines.push(``);
  lines.push(
    `## Pending consumer migrations (${pendingMigrations.length}) — not deltas`,
  );
  lines.push(``);
  for (const p of pendingMigrations) {
    lines.push(`- \`${p.enumName}.${p.value}\` — ${p.note}`);
  }
}

lines.push(``);
lines.push(
  deltas === 0
    ? `Verdict: every projected enum compares EQUAL.` +
        (pendingMigrations.length
          ? ` ${pendingMigrations.length} consumer migration(s) still open (above).`
          : ``)
    : `Verdict: ${deltas} enum(s) carry a DELTA — each must be explicitly reviewed.`,
);
lines.push(``);

process.stdout.write(lines.join("\n"));
process.exit(deltas === 0 ? 0 : 1);
