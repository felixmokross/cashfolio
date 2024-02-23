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
    !isVitest() && remix({ ignoredRouteFiles: ["**/.*"] }),
    tsconfigPaths(),
  ],
  test: {
    exclude: [...configDefaults.exclude, "playwright"],
  },
});

function isVitest() {
  return !!process.env.VITEST;
}
