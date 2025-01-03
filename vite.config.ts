import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";
import { configDefaults } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [!isVitest() && !isStorybook() && reactRouter(), tsconfigPaths()],
  test: {
    exclude: [...configDefaults.exclude, "playwright"],
  },

  // workaround for Prisma bug manifesting in Vite prod build
  // see https://github.com/prisma/prisma/issues/12504#issuecomment-1285883083
  resolve: {
    alias: {
      ".prisma/client/index-browser":
        "./node_modules/.prisma/client/index-browser.js",
    },
  },
});

function isVitest() {
  return !!process.env.VITEST;
}

function isStorybook() {
  return process.argv[1]?.includes("storybook");
}
