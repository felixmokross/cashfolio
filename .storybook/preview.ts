import type { Preview } from "@storybook/react";
import "../app/tailwind.css";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  globalTypes: {
    locale: {
      name: "Locale",
      defaultValue: "en-CH",
      toolbar: {
        icon: "globe",
        items: ["en", "en-CH", "de-DE", "de-CH"],
      },
    },
  },
};

export default preview;
