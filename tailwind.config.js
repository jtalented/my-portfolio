/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        electric: "#44FFD1",
        sky: "#3E8BFF",
        magenta: "#AC5EFF",
        violet: "#9376E0",
      },
      fontFamily: {
        orbitron: ['"Orbitron"', 'sans-serif'],
      }      
    },
  },
  plugins: [],
};
