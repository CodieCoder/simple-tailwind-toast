/** @type {import('tailwindcss').Config} */
export default {
  content: ['./lib/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      keyframes: {
        hideToast: {
          '100%': { marginTop: '-1rem', opacity: '0' },
        },
      },
      animation: {
        hideToast: 'hideToast 0.4s ease-in-out',
      },
    },
  },
  plugins: [],
};
