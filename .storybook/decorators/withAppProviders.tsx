import { Decorator } from "@storybook/react";
import { unstable_createRemixStub } from "@remix-run/testing";
import { buildExtendedUserDto } from "../../app/users/builders";
import { UserProvider } from "../../app/components/user-context";
import { I18nProvider } from "react-aria";

const user = buildExtendedUserDto();

export const withAppProviders: Decorator = (Story) => {
  const RemixStub = unstable_createRemixStub([
    {
      path: "/*",
      element: (
        <I18nProvider locale={user.preferredLocale}>
          <UserProvider user={user}>
            <Story />
          </UserProvider>
        </I18nProvider>
      ),
    },
  ]);

  return <RemixStub />;
};
