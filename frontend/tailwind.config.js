/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // ✅ เปิด dark mode
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2563eb',
      },
    },
  },
  plugins: [],
};
