const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx,jsx,js}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          '"Inter var"',
          { fontFeatureSettings: '"cv11", "cv03", "cv04"' },
        ],
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
