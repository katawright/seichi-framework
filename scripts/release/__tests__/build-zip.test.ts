import {
  mkdirSync,
  mkdtempSync,
  readFileSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

import { beforeAll, describe, expect, it } from "vitest";

import { buildZip } from "../build-zip";

function makeSourceTree(): string {
  const root = mkdtempSync(join(tmpdir(), "build-zip-src-"));
  writeFileSync(join(root, "alpha.txt"), "alpha\n");
  writeFileSync(join(root, "beta.txt"), "beta\n");
  mkdirSync(join(root, "nested"));
  writeFileSync(join(root, "nested", "child.txt"), "child\n");
  return root;
}

describe("buildZip", () => {
  const source = makeSourceTree();
  const out1 = mkdtempSync(join(tmpdir(), "build-zip-out1-"));
  const out2 = mkdtempSync(join(tmpdir(), "build-zip-out2-"));
  const path1 = join(out1, "first.zip");
  const path2 = join(out2, "second.zip");

  beforeAll(async () => {
    await buildZip(source, path1);
    await buildZip(source, path2);
  });

  it("produces byte-identical zips across runs from the same source", () => {
    const a = readFileSync(path1);
    const b = readFileSync(path2);
    expect(a.equals(b)).toBe(true);
  });
});
