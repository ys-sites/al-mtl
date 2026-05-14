import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: '#0c0c0c',
          navy: '#1B2A4A',
          gold: '#C9A84C',
          lightgold: '#E8D5A3',
          white: '#FEFEFE',
          dark: '#1A1A1A',
        }
      },
      fontFamily: {
        serif: ['var(--font-cormorant)', 'serif'],
        sans: ['var(--font-inter)', 'sans-serif'],
        mono: ['var(--font-space-mono)', 'monospace'],
      },
      letterSpacing: {
        'widest-lux': '0.2em',
      }
    }
  },
  plugins: [],
};

export default config;
