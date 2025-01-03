import type { Decorator, Preview } from "@storybook/react";
import "../app/tailwind.css";
import { getLocalesWithDisplayName } from "../app/common/locales.server";
import { currenciesByCode } from "../app/common/currencies";
import { createRoutesStub } from "react-router";
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
  const RemixStub = createRoutesStub([
    {
      path: "/*",
      Component: Story,
    },
  ]);

  return <RemixStub />;
};

const preview: Preview = {
  parameters: {
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
