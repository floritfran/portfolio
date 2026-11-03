import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { AppProviders } from "@/components/providers/AppProviders";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

describe("ThemeToggle", () => {
  it("switches to dark mode and persists the choice", async () => {
    render(
      <AppProviders>
        <ThemeToggle />
      </AppProviders>,
    );

    const button = screen.getByRole("button", { name: "Cambiar tema" });

    await waitFor(() => {
      expect(document.documentElement.classList.contains("dark")).toBe(false);
    });

    fireEvent.click(button);

    await waitFor(() => {
      expect(document.documentElement.classList.contains("dark")).toBe(true);
    });
    expect(localStorage.getItem("portfolio-theme")).toBe("dark");
  });
});
