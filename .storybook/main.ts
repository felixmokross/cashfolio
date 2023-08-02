import type { StorybookConfig } from "@storybook/react-webpack5";
const path = require("path");

const config: StorybookConfig = {
  webpackFinal: async (config) => ({
    ...config,
    resolve: {
      ...config.resolve,
      alias: {
        ...config.resolve?.alias,
        "~": path.resolve(__dirname, "../app"),
      },
    },
  }),
  stories: ["../docs/**/*.mdx", "../app/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    {
      name: "@storybook/addon-styling",
      options: { postCss: { implementation: require("postcss") } },
    },
    "@storybook/addon-mdx-gfm",
  ],
  framework: {
    name: "@storybook/react-webpack5",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
};
export default config;
