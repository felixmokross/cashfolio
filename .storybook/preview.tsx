import type { Preview } from "@storybook/react";
import "../app/tailwind.css";
import React from "react";
import { unstable_createRemixStub } from "@remix-run/testing";

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
  decorators: [
    (Story) => (
      <div className="antialiased">
        <Story />
      </div>
    ),
    (Story) => {
      const RemixStub = unstable_createRemixStub([
        { path: "/*", element: <Story /> },
      ]);
      return <RemixStub />;
    },
  ],
};

export default preview;
