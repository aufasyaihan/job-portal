import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          main: "hsl(var(--primary-main))",
          surface: "hsl(var(--primary-surface))",
          border: "hsl(var(--primary-border))",
          hover: "hsl(var(--primary-hover))",
          pressed: "hsl(var(--primary-pressed))",
          focus: "hsl(var(--primary-focus))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
          main: "hsl(var(--secondary-main))",
          surface: "hsl(var(--secondary-surface))",
          border: "hsl(var(--secondary-border))",
          hover: "hsl(var(--secondary-hover))",
          pressed: "hsl(var(--secondary-pressed))",
          focus: "hsl(var(--secondary-focus))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        neutral: {
          10: "hsl(var(--neutral-10))",
          20: "hsl(var(--neutral-20))",
          30: "hsl(var(--neutral-30))",
          40: "hsl(var(--neutral-40))",
          50: "hsl(var(--neutral-50))",
          60: "hsl(var(--neutral-60))",
          70: "hsl(var(--neutral-70))",
          80: "hsl(var(--neutral-80))",
          90: "hsl(var(--neutral-90))",
          100: "hsl(var(--neutral-100))",
        },
        danger: {
          main: "hsl(var(--danger-main))",
          surface: "hsl(var(--danger-surface))",
          border: "hsl(var(--danger-border))",
          hover: "hsl(var(--danger-hover))",
          pressed: "hsl(var(--danger-pressed))",
          focus: "hsl(var(--danger-focus))",
        },
        warning: {
          main: "hsl(var(--warning-main))",
          surface: "hsl(var(--warning-surface))",
          border: "hsl(var(--warning-border))",
          hover: "hsl(var(--warning-hover))",
          pressed: "hsl(var(--warning-pressed))",
          focus: "hsl(var(--warning-focus))",
        },
        success: {
          main: "hsl(var(--success-main))",
          surface: "hsl(var(--success-surface))",
          border: "hsl(var(--success-border))",
          hover: "hsl(var(--success-hover))",
          pressed: "hsl(var(--success-pressed))",
          focus: "hsl(var(--success-focus))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [tailwindcssAnimate],
} satisfies Config;
