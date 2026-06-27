import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: "#070812",
        card: "#111827",
        ink: "#f8fbff",
        muted: "#9aa8c7",
        coral: "#ff5d8f",
        coralDark: "#db2777",
        dark: "#05070f",
        darkSoft: "#0b1020",
        darkElevated: "#111827",
        hairline: "rgba(255,255,255,0.12)",
        success: "#22e6a8",
      },
      fontFamily: {
        display: ["Inter", "system-ui", "sans-serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 18px 70px rgba(0,0,0,0.28)",
        premium: "0 28px 100px rgba(0,0,0,0.42)",
      },
    },
  },
  plugins: [],
};
export default config;
