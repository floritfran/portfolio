import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { AppProviders } from "@/components/providers/AppProviders";
import { LanguageToggle } from "@/components/ui/LanguageToggle";

describe("LanguageToggle", () => {
  it("switches to English, updates the document language, and persists", async () => {
    render(
      <AppProviders>
        <LanguageToggle />
      </AppProviders>,
    );

    fireEvent.click(screen.getByRole("button", { name: "English" }));

    await waitFor(() => {
      expect(document.documentElement.lang).toBe("en");
    });
    expect(screen.getByRole("button", { name: "English" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    expect(localStorage.getItem("portfolio-locale")).toBe("en");
  });
});
