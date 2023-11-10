import type { Decorator, Meta } from "@storybook/react";
import { I18nProvider } from "react-aria";
import { buildExtendedUserDto } from "~/users/builders";
import { UserProvider } from "./user-context";
import { Container } from "./container";

export const withContainer: Decorator = (Story) => {
  return (
    <div className="bg-gray-50">
      <Container>
        <Story />
      </Container>
    </div>
  );
};

export const withPageMaxWidth: Decorator = (Story) => (
  <div className="mx-auto max-w-screen-sm">
    <Story />
  </div>
);

export const withFormGrid: Decorator = (Story) => (
  <div className="grid grid-cols-6 gap-x-4 gap-y-8">
    <Story />
  </div>
);

const user = buildExtendedUserDto();
export const withAppProviders: Decorator = (Story, context) => {
  const userWithLocale = { ...user, preferredLocale: context.globals.locale };
  return (
    <I18nProvider locale={userWithLocale.preferredLocale}>
      <UserProvider user={userWithLocale}>
        <Story />
      </UserProvider>
    </I18nProvider>
  );
};

export const appPageMeta: Meta = {
  decorators: [withAppProviders, withPageMaxWidth],
};
