import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  // Preflight off so Tailwind's base reset does NOT disturb the existing
  // hand-written CSS / design. Utilities are still fully available.
  corePlugins: { preflight: false },
  theme: {
    extend: {
      colors: {
        bg: "#060A12",
        "bg-2": "#0A0F1C",
        surface: "rgba(255,255,255,0.04)",
        "surface-2": "rgba(255,255,255,0.07)",
        line: "rgba(255,255,255,0.09)",
        ink: "#E8ECF1",
        dim: "#9AA4B2",
        mute: "#5C6675",
        brand: {
          blue: "#3B82F6",
          cyan: "#22D3EE",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono-jb)", "monospace"],
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(34,211,238,0.4), 0 10px 40px -8px rgba(34,211,238,0.35)",
      },
    },
  },
  plugins: [],
};

export default config;
