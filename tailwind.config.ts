import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        canvas: "#FDFBF7",
        charcoal: "#2C3032",
        sage: "#E8ECE6",
        terracotta: "#A45C40"
      },
      fontFamily: {
        sans: ["Aptos", "Segoe UI", "Inter", "Helvetica Neue", "Arial", "ui-sans-serif", "system-ui", "sans-serif"]
      }
    }
  },
  plugins: []
};

export default config;
