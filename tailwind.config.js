/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./screens/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#90c466",
        secondary: "#0b0320",
        dark: "#1f2937",
        light: "#F9FAFB",
      },
    },
  },
  plugins: [],
};
