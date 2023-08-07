import type { Decorator, Preview } from "@storybook/react";
import "../app/tailwind.css";
import { getLocalesWithDisplayName } from "../app/common/locales.server";
import { currenciesByCode } from "../app/common/currencies";
import { unstable_createRemixStub } from "@remix-run/testing";
import React from "react";

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

const withRemix: Decorator = (Story) => {
  const RemixStub = unstable_createRemixStub([
    {
      path: "/*",
      element: <Story />,
    },
  ]);

  return <RemixStub />;
};

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
      },
    },
    refCurrency: {
      name: "Ref. Currency",
      defaultValue: "CHF",
      toolbar: {
        items: ["CHF", "EUR", "USD"].map((currency) => ({
          title: currenciesByCode[currency],
          value: currency,
          right: currency,
        })),
        dynamicTitle: true,
      },
    },
  },
  decorators: [withRemix],
};

export default preview;
