import type { Config } from 'tailwindcss';
import defaultTheme from "tailwindcss/defaultTheme";
import colors from "tailwindcss/colors";
import forms from "@tailwindcss/forms";

export default {
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
  plugins: [forms],
} satisfies Config;
