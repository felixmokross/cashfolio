const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");

/** @type {import("tailwindcss").Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx,jsx,js}"],
  theme: {
    colors: {
      brand: colors.sky,
      positive: colors.emerald,
      negative: colors.rose,
      neutral: colors.amber,
      gray: colors.slate,
      white: colors.white,
      black: colors.black,
      transparent: colors.transparent,
      current: colors.current,
    },
    extend: {
      fontFamily: {
        sans: [
          ['"Inter var"', ...defaultTheme.fontFamily.sans],
          { fontFeatureSettings: '"cv11", "cv03", "cv04"' },
        ],
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
