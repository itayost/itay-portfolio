export const themeConfig = {
  colors: {
    light: {
      background: "#f8fafc",
      foreground: "#1f2937",
      primary: "#2563eb",
      secondary: "#06b6d4",
      accent: "#3b82f6",
      border: "#e5e7eb",
      cardBg: "#ffffff",
      muted: "#9ca3af",
    },
    dark: {
      background: "#0f172a",
      foreground: "#f8fafc",
      primary: "#3b82f6",
      secondary: "#22d3ee",
      accent: "#60a5fa",
      border: "#334155",
      cardBg: "#1e293b",
      muted: "#64748b",
    }
  },
  breakpoints: {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
    "2xl": "1536px",
  },
  spacing: {
    xs: "0.25rem",
    sm: "0.5rem",
    md: "1rem",
    lg: "1.5rem",
    xl: "2rem",
    "2xl": "3rem",
    "3xl": "4rem",
  },
  fontSize: {
    xs: "0.75rem",
    sm: "0.875rem",
    base: "1rem",
    lg: "1.125rem",
    xl: "1.25rem",
    "2xl": "1.5rem",
    "3xl": "1.875rem",
    "4xl": "2.25rem",
    "5xl": "3rem",
  },
  transitions: {
    fast: "150ms ease-in-out",
    base: "300ms ease-in-out",
    slow: "500ms ease-in-out",
  }
} as const;

export type Theme = "light" | "dark";