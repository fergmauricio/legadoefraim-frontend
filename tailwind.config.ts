import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["Playfair Display", "serif"],
        sans: ["Inter", "sans-serif"],
      },
      colors: {
        brand: {
          DEFAULT: "#334155",
          light: "#64748b",
          dark: "#1e293b",
          accent: "#eab308",
        },
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
      },
      boxShadow: {
        soft: "0 4px 20px rgba(0,0,0,0.05)",
        hover: "0 6px 30px rgba(0,0,0,0.08)",
      },
    },
  },
  plugins: [],
};
export default config;
