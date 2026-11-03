import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { AppProviders } from "@/components/providers/AppProviders";
import { Hero } from "@/components/sections/Hero";

vi.mock("next/image", () => ({
  default: ({
    src,
    alt,
  }: {
    src: string;
    alt: string;
    fill?: boolean;
    priority?: boolean;
    sizes?: string;
  }) => <img src={src} alt={alt} />,
}));

describe("Hero", () => {
  it("shows the name, email CTA, and both CV links", () => {
    render(
      <AppProviders>
        <Hero />
      </AppProviders>,
    );

    expect(
      screen.getByRole("heading", { level: 1, name: "Francisco Florit" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Hablemos/ })).toHaveAttribute(
      "href",
      "mailto:franciscoflorit99@gmail.com",
    );
    expect(screen.getByRole("link", { name: /CV ES/ })).toHaveAttribute(
      "href",
      "/cv/Francisco-Florit-CV-ES.pdf",
    );
    expect(screen.getByRole("link", { name: /CV EN/ })).toHaveAttribute(
      "href",
      "/cv/Francisco-Florit-CV-EN.pdf",
    );
    expect(screen.getByText("5+ años")).toBeInTheDocument();
  });
});
