import { describe, expect, it } from "vitest";

import { deriveDisplayName } from "../derive-display-name";

describe("deriveDisplayName", () => {
  it("title-cases a single-word slug", () => {
    expect(deriveDisplayName("requirements")).toBe("Requirements");
  });

  it("title-cases a kebab-case slug", () => {
    expect(deriveDisplayName("requirements-brief")).toBe("Requirements Brief");
  });

  it("handles multi-segment slugs", () => {
    expect(deriveDisplayName("success-criteria-register")).toBe(
      "Success Criteria Register",
    );
  });

  it("handles a single character slug", () => {
    expect(deriveDisplayName("a")).toBe("A");
  });

  it("returns empty string for empty input", () => {
    expect(deriveDisplayName("")).toBe("");
  });
});
