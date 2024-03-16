import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  stories: ["../docs/**/*.mdx", "../app/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@chromatic-com/storybook",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  typescript: {
    // Experiencing issues with the default 'react-docgen' since Storybook 8 for some components, therefore switching to 'react-docgen-typescript'
    // See https://storybook.js.org/docs/api/main-config-typescript#reactdocgen
    reactDocgen: "react-docgen-typescript",
  },
};
export default config;
