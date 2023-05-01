import type { Preview } from "@storybook/react";
import "../app/tailwind.css";
import React from "react";
import { unstable_createRemixStub } from "@remix-run/testing";
import { getLocalesWithDisplayName } from "../app/locales.server";
import { UserProvider } from "../app/components/user-context";
import { currenciesByCode } from "../app/currencies";

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
  decorators: [
    (Story) => {
      const RemixStub = unstable_createRemixStub([
        { path: "/*", element: <Story /> },
      ]);
      return <RemixStub />;
    },
    (Story, context) => (
      <UserProvider
        user={{
          email: "user@example.com",
          pictureUrl:
            "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
          refCurrency: context.globals.refCurrency,
          preferredLocale: context.globals.locale,
        }}
      >
        <Story />
      </UserProvider>
    ),
  ],
};

export default preview;
