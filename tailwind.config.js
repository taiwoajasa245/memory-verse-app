/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
     "./src/**/*.{js,ts,jsx,tsx,mdx}", // include all src files
    "./components/**/*.{js,ts,jsx,tsx}", // if you have a components folder
    "./app/**/*.{js,ts,jsx,tsx}", // for Next.js app router
  ],
  theme: {
    extend: {
      colors: {
        primary: "#ADD8E6",
        "background-light": "#F5F5DC",
        "background-dark": "#101c22",
        "text-light": "#36454F",
        "text-dark": "#FFFFFF",
        "card-background": "#FEFEFE",
        "card-background-dark": "#1E2A33",
      },
      fontFamily: {
        display: ["Manrope", "sans-serif"],
        // heading: ["Merriweather", "serif"],
      },
      borderRadius: {
        DEFAULT: "0.5rem",
        lg: "0.75rem",
        xl: "1rem",
        full: "9999px",
      },
    },
  },
  plugins: [],
};
