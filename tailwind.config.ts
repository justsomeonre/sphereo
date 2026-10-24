import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        sphereo: {
          ivory: "#F7F4ED",
          charcoal: "#252720",
          linen: "#EAE3D7",
          terracotta: "#B66A4B",
          "terracotta-dark": "#985337",
          brass: "#B69A63",
          "brass-light": "#D8C59A",
          sage: "#8A9A86",
          clay: "#C47D61",
          indigo: "#2B3E51",
          sand: "#DFD7C7",
          wood: "#5C4838",
          border: "#DCD5C8",
        },
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Playfair Display", "Georgia", "serif"],
        sans: ["var(--font-sans)", "Inter", "-apple-system", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      boxShadow: {
        card: "0 4px 20px -2px rgba(37, 39, 32, 0.05)",
        hover: "0 12px 30px -4px rgba(37, 39, 32, 0.08)",
        modal: "0 20px 40px -10px rgba(37, 39, 32, 0.16)",
      },
    },
  },
  plugins: [],
};
export default config;
