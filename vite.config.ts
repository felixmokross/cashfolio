import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import { configDefaults } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [
    !isVitest() &&
      !isStorybook() &&
      remix({
        future: {
          v3_fetcherPersist: true,
          v3_relativeSplatPath: true,
          v3_throwAbortReason: true,
          v3_lazyRouteDiscovery: true,
          v3_singleFetch: true,
          v3_routeConfig: true,
        },
      }),
    tsconfigPaths(),
  ],
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
