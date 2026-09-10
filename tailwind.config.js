/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        display: ["var(--font-poppins)", "sans-serif"],
      },
      colors: {
        navy: {
          950: "#081a2e",
          900: "#0b2545",
          800: "#123763",
          700: "#1a4a82",
        },
        gold: {
          600: "#a9791a",
          500: "#c9971c",
          400: "#ddb14a",
        },
        paper: "#f7f7f4",
        ink: {
          DEFAULT: "#16233a",
          soft: "#4b5768",
        },
        line: "#e3e1d9",
      },
    },
  },
  plugins: [],
};
