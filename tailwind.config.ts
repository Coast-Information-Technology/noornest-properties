import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#BFA14A",
          50: "#F7F4ED",
          100: "#EFE8D6",
          200: "#DFD1AD",
          300: "#CFBA84",
          400: "#BFA14A",
          500: "#BFA14A",
          600: "#A68B3E",
          700: "#8C7532",
          800: "#735F26",
          900: "#59491A",
          950: "#40330E",
          foreground: "#0A0A0A",
        },
        secondary: {
          DEFAULT: "#0A0A0A",
          50: "#E6E6E6",
          100: "#CCCCCC",
          200: "#999999",
          300: "#666666",
          400: "#333333",
          500: "#0A0A0A",
          600: "#080808",
          700: "#060606",
          800: "#040404",
          900: "#020202",
          950: "#000000",
          foreground: "#EADBC8",
        },
        accent: {
          DEFAULT: "#EADBC8",
          50: "#FDFCF9",
          100: "#FBF8F2",
          200: "#F7F1E5",
          300: "#F3EAD8",
          400: "#EFE3CB",
          500: "#EADBC8",
          600: "#E5D3B5",
          700: "#E0CBA2",
          800: "#DBC38F",
          900: "#D6BB7C",
          950: "#D1B369",
          foreground: "#0A0A0A",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
