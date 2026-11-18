import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
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
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          glow: "rgba(6, 182, 212, 0.35)",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
          cyan: "#00f2fe",
          sky: "#38bdf8",
          indigo: "#6366f1",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        midnight: {
          50: "#f0f6fe",
          100: "#e0edfd",
          200: "#badbfa",
          800: "#0e1a32",
          900: "#091122",
          950: "#040711",
        },
        cream: {
          DEFAULT: "#F5F0E6",
          50: "#FAF7F2",
          100: "#F5F0E6",
          200: "#EADFCF",
          300: "#DDD0BD",
        },
        sage: {
          DEFAULT: "#89958B",
          50: "#F3F5F4",
          100: "#E4E8E5",
          200: "#C9D1CB",
          300: "#AAB5AC",
          400: "#89958B",
          500: "#6D7B70",
          600: "#556257",
        },
        burgundy: {
          DEFAULT: "#702B40",
          50: "#FAF0F2",
          100: "#F3DEE3",
          200: "#E4B8C3",
          300: "#D08FA0",
          400: "#8B3751",
          500: "#702B40",
          600: "#582031",
          700: "#451926",
        },
        charcoal: {
          DEFAULT: "#252B29",
          50: "#F5F6F6",
          100: "#E2E5E4",
          200: "#B9C0BE",
          300: "#8B9693",
          400: "#5B6864",
          500: "#404B47",
          600: "#2F3734",
          700: "#252B29",
          800: "#1A1F1D",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "marquee-reverse": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.6", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.05)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        marquee: "marquee 35s linear infinite",
        "marquee-reverse": "marquee-reverse 35s linear infinite",
        float: "float 6s ease-in-out infinite",
        "pulse-glow": "pulseGlow 4s ease-in-out infinite",
        shimmer: "shimmer 2.5s infinite linear",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "glass-gradient": "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%)",
        "glow-conic": "conic-gradient(from 180deg at 50% 50%, #00f2fe 0deg, #6366f1 180deg, #00f2fe 360deg)",
      },
    },
  },
  plugins: [
    plugin(function ({ addVariant }) {
      addVariant("light", ":is(html.light &)");
    }),
  ],
};

export default config;
