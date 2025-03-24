/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#D32F2F',
          dark: '#B71C1C',
        },
        secondary: {
          DEFAULT: '#FFC107',
          dark: '#FFA000',
        },
      },
    },
  },
  plugins: [],
};