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
        canvas: "#faf7ef",
        card: "#efe6d8",
        ink: "#141413",
        muted: "#6c6a64",
        coral: "#c8694e",
        coralDark: "#a9583e",
        dark: "#181715",
        darkSoft: "#252320",
        hairline: "#e6dfd8",
      },
      fontFamily: {
        display: ["Georgia", "serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
