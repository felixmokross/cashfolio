import type { Preview } from "@storybook/react";
import "../app/tailwind.css";
import React from "react";
import { unstable_createRemixStub } from "@remix-run/testing";
import { LocaleProvider } from "../app/components/locale-context";
import { getLocalesWithDisplayName } from "../app/locales.server";

const availableLocales = [
  "en-US",
  "en-CH",
  "fr-FR",
  "it-IT",
  "de-DE",
  "de-CH",
  "de-AT",
  "es-ES",
  "es-CO",
];

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
        items: getLocalesWithDisplayName()
          .filter(([l]) => availableLocales.includes(l))
          .map(([locale, displayName]) => ({
            title: displayName,
            value: locale,
            right: locale,
          })),
        dynamicTitle: true,
        control: { type: "radio" },
      },
    },
  },
  decorators: [
    (Story) => {
      const RemixStub = unstable_createRemixStub([
        { path: "/*", element: <Story /> },
      ]);
      return <RemixStub />;
    },
    (Story, context) => (
      <LocaleProvider locale={context.globals.locale}>
        <Story />
      </LocaleProvider>
    ),
  ],
};

export default preview;
