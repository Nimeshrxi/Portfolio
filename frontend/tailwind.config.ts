import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "spider-black": "#050507",
        navy: {
          DEFAULT: "#0a1224",
          deep: "#060b18",
          mid: "#121c33",
        },
        "spider-red": {
          DEFAULT: "#e11d2e",
          bright: "#ff2d3f",
          muted: "#a31220",
        },
        "deep-red": "#6b0f1a",
        "electric-blue": {
          DEFAULT: "#3b82f6",
          bright: "#60a5fa",
          soft: "#1e3a5f",
        },
        mist: "#c8cdd6",
        fog: "#8b93a7",
      },
      fontFamily: {
        display: ["var(--font-display)", "Oswald", "sans-serif"],
        body: ["var(--font-body)", "Outfit", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      boxShadow: {
        glass: "0 8px 32px rgba(0, 0, 0, 0.45)",
        hud: "0 0 24px rgba(225, 29, 46, 0.25), inset 0 0 24px rgba(59, 130, 246, 0.08)",
        "hud-blue": "0 0 24px rgba(59, 130, 246, 0.3)",
        glow: "0 0 40px rgba(225, 29, 46, 0.35)",
      },
      backgroundImage: {
        "city-gradient":
          "linear-gradient(180deg, #050507 0%, #0a1224 40%, #121c33 70%, #050507 100%)",
        "glass-gradient":
          "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)",
        "red-radial":
          "radial-gradient(circle at center, rgba(225,29,46,0.35) 0%, transparent 65%)",
      },
      animation: {
        "pulse-sense": "pulse-sense 2.4s ease-in-out infinite",
        "fog-drift": "fog-drift 28s ease-in-out infinite",
        "city-twinkle": "city-twinkle 3.5s ease-in-out infinite",
      },
      keyframes: {
        "pulse-sense": {
          "0%, 100%": { opacity: "0.45", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.04)" },
        },
        "fog-drift": {
          "0%, 100%": { transform: "translateX(0)" },
          "50%": { transform: "translateX(4%)" },
        },
        "city-twinkle": {
          "0%, 100%": { opacity: "0.35" },
          "50%": { opacity: "0.9" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
