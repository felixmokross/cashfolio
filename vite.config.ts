import { vitePlugin as remix } from "@remix-run/dev";
import { installGlobals } from "@remix-run/node";
import { defineConfig } from "vite";
import { configDefaults } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";

installGlobals();

export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [
    !isVitest() && !isStorybook() && remix({ ignoredRouteFiles: ["**/.*"] }),
    tsconfigPaths(),
  ],
  test: {
    exclude: [...configDefaults.exclude, "playwright"],
  },

  // workaround for Prisma bug manifesting in Vite prod build
  // see https://github.com/prisma/prisma/issues/12504
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
