import { describe, expect, it } from "vitest";

import { formatPeriod } from "@/lib/date";

describe("formatPeriod", () => {
  it("formats a closed period in Spanish", () => {
    const value = formatPeriod("2021-09", "2025-05", "es", "Actualidad");

    expect(value).toContain("2021");
    expect(value).toContain("2025");
    expect(value).toContain("—");
  });

  it("uses the provided present label", () => {
    expect(formatPeriod("2025-05", null, "en", "Present")).toContain("Present");
    expect(formatPeriod("2025-05", null, "es", "Actualidad")).toContain(
      "Actualidad",
    );
  });
});
