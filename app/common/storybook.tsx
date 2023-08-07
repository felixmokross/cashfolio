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

const user = buildExtendedUserDto();
export const withAppProviders: Decorator = (Story) => {
  return (
    <I18nProvider locale={user.preferredLocale}>
      <UserProvider user={user}>
        <Story />
      </UserProvider>
    </I18nProvider>
  );
};

export const appPageMeta: Meta = {
  decorators: [withAppProviders, withPageMaxWidth],
};
