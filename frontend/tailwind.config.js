/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['EB Garamond', ...defaultTheme.fontFamily.sans]
      },
      fontSize: {
        '3xl': '2.5rem',
      },
    },
  },
  plugins: [],
}

