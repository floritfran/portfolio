import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { AppProviders } from "@/components/providers/AppProviders";
import { Projects } from "@/components/sections/Projects";

vi.mock("next/image", () => ({
  default: ({
    src,
    alt,
  }: {
    src: string;
    alt: string;
    fill?: boolean;
    sizes?: string;
  }) => <img src={src} alt={alt} />,
}));

describe("Projects", () => {
  it("renders every project with the right links", () => {
    render(
      <AppProviders>
        <Projects />
      </AppProviders>,
    );

    for (const name of ["Flixy", "JuntadApp", "MyFootStats", "TP2 Algoritmos III"]) {
      expect(
        screen.getByRole("heading", { name }),
      ).toBeInTheDocument();
    }

    expect(
      screen.queryByRole("link", { name: "Ver demo: Flixy" }),
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /Descargar APK: JuntadApp/ }),
    ).toHaveAttribute(
      "href",
      "https://drive.google.com/drive/folders/1DPqvbT7XfL8JSFiTTsCJ9n_8GMVHz1lJ",
    );
    expect(
      screen.queryByRole("link", { name: "Ver demo: MyFootStats" }),
    ).not.toBeInTheDocument();
  });
});
