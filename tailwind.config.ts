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
        'slide-up': 'slide-up 1s ease-out', // Slightly slower to enhance the smoothness
        'slide-from-right': 'slideFromRight 0.5s ease-out', // New animation
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
            transform: 'translateX(100%)', // Start from outside the right edge
            opacity: '0', // Fully transparent
          },
          '100%': {
            transform: 'translateX(0)', // Move to original position
            opacity: '1', // Fully visible
          },
        },
      },
    },
  },
  plugins: [],
};

export default config;
