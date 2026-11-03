import "@testing-library/jest-dom/vitest";

import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";

afterEach(() => {
  cleanup();
  window.localStorage.clear();
  document.documentElement.classList.remove("dark");
  document.documentElement.lang = "es";
  document.body.style.overflow = "";
});

Object.defineProperty(window.navigator, "language", {
  configurable: true,
  value: "es-AR",
});

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

vi.stubGlobal(
  "IntersectionObserver",
  class {
    private callback: IntersectionObserverCallback;

    constructor(callback: IntersectionObserverCallback) {
      this.callback = callback;
    }

    observe(target: Element) {
      this.callback(
        [
          {
            isIntersecting: true,
            target,
            intersectionRatio: 1,
          } as IntersectionObserverEntry,
        ],
        this as unknown as IntersectionObserver,
      );
    }

    unobserve() {}

    disconnect() {}

    takeRecords() {
      return [];
    }
  },
);

if (typeof HTMLDialogElement !== "undefined") {
  HTMLDialogElement.prototype.showModal = function showModal() {
    this.setAttribute("open", "");
  };
  HTMLDialogElement.prototype.close = function close() {
    this.removeAttribute("open");
    this.dispatchEvent(new Event("close"));
  };
}

Object.defineProperty(navigator, "clipboard", {
  configurable: true,
  value: {
    writeText: vi.fn().mockResolvedValue(undefined),
  },
});

window.scrollTo = vi.fn();
