// Kernel generator CLI.
//
//   npm run kernel            regenerate spec/generated/*
//   npm run kernel -- --check verify the committed exports are fresh (CI)
//
// Plain Node (no tsx): the generator is dependency-light ESM so the .schema
// validation suite can import it directly.

import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { checkKernelFreshness, writeKernel } from "./generate.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(__dirname, "..", "..", "..");

if (process.argv.includes("--check")) {
  const issues = checkKernelFreshness(REPO_ROOT);
  if (issues.length > 0) {
    for (const issue of issues) process.stderr.write(`${issue}\n`);
    process.exit(1);
  }
  process.stdout.write("Kernel exports are fresh.\n");
} else {
  try {
    const written = writeKernel(REPO_ROOT);
    for (const relPath of written) process.stdout.write(`wrote ${relPath}\n`);
  } catch (err) {
    process.stderr.write(`${err instanceof Error ? err.message : String(err)}\n`);
    process.exit(1);
  }
}
