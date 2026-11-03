import type { Config } from "tailwindcss";

export default {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--color-background)",
        surface: "var(--color-surface)",
        "surface-raised": "var(--color-surface-raised)",
        foreground: "var(--color-foreground)",
        muted: "var(--color-muted)",
        border: "var(--color-border)",
        accent: "var(--color-accent)",
        "accent-strong": "var(--color-accent-strong)",
        "accent-contrast": "var(--color-accent-contrast)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-sans)", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      maxWidth: {
        content: "72rem",
      },
      borderRadius: {
        "4xl": "2rem",
      },
      boxShadow: {
        card: "0 1px 2px rgb(0 0 0 / 0.04), 0 12px 32px -16px rgb(0 0 0 / 0.18)",
        "card-hover":
          "0 1px 2px rgb(0 0 0 / 0.04), 0 24px 48px -24px rgb(0 0 0 / 0.28)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(14px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s cubic-bezier(0.22, 1, 0.36, 1) both",
        "fade-in": "fade-in 0.4s ease-out both",
      },
    },
  },
  plugins: [],
} satisfies Config;
