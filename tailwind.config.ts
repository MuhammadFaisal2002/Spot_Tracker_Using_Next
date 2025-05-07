import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        'slide-up': 'slide-up 1.5s ease-out forwards', // Original
        'slide-from-right': 'slideFromRight 0.5s ease-out', // Original

        // ✅ New animations
        'slide-up-slow': 'slideUpSlow 1.5s ease-out forwards',
        'fade-in': 'fadeIn 2s ease-in forwards',

        'bounce-strong': 'bounce-strong 1s infinite',
      },
      keyframes: {
        'slide-up': {
          '0%': {
            transform: 'translateY(100%)',
            opacity: '0',
          },
          '100%': {
            transform: 'translateY(0)',
            opacity: '1',
          },
        },
        'slideFromRight': {
          '0%': {
            transform: 'translateX(100%)',
            opacity: '0',
          },
          '100%': {
            transform: 'translateX(0)',
            opacity: '1',
          },
        },

        // ✅ New keyframes
        slideUpSlow: {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'bounce-strong': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' }, // increase height
        },
      },
      animationDelay: {
        0: '0ms',
        150: '150ms',
        300: '300ms',
      },
    },
  },
  plugins: [],
};

export default config;
