/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  darkMode: 'class',
  mode: "jit",
  theme: {
    extend: {
      colors: {
        primary: "#F7FBFB",
        secondary: "#8c52ff",
        "dark-primary": "#F7F7F7",
        "dark-secondary": "#bb86fc",
        transparent: "transparent",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      backgroundColor: {
        "dark-primary": "#121212",
      }
    },
    screens: {
      xs: "480px",
      ss: "620px",
      sm: "769px",
      md: "1060px",
      lg: "1200px",
      xl: "1700px",
    },
  },
  plugins: [],
};