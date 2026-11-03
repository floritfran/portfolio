import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { AppProviders } from "@/components/providers/AppProviders";
import { Contact } from "@/components/sections/Contact";

describe("Contact", () => {
  it("copies the email address", async () => {
    render(
      <AppProviders>
        <Contact />
      </AppProviders>,
    );

    fireEvent.click(screen.getByRole("button", { name: "Copiar email" }));

    await waitFor(() => {
      expect(vi.mocked(navigator.clipboard.writeText)).toHaveBeenCalledWith(
        "franciscoflorit99@gmail.com",
      );
    });
    expect(
      await screen.findByRole("button", { name: "Copiado" }),
    ).toBeInTheDocument();
  });

  it("offers both CV downloads", () => {
    render(
      <AppProviders>
        <Contact />
      </AppProviders>,
    );

    expect(
      screen.getByRole("link", { name: /Descargar CV en español/ }),
    ).toHaveAttribute("href", "/cv/Francisco-Florit-CV-ES.pdf");
    expect(
      screen.getByRole("link", { name: /Download CV in English/ }),
    ).toHaveAttribute("href", "/cv/Francisco-Florit-CV-EN.pdf");
  });
});
