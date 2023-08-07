import type { PropsWithChildren } from "react";
import { I18nProvider } from "react-aria";
import { NavBar } from "~/common/nav-bar";
import { UserProvider } from "~/common/user-context";
import type { ExtendedUserDto } from "~/users/types";

export type AppProps = PropsWithChildren<{
  user: ExtendedUserDto;
}>;

export function App({ user, children }: AppProps) {
  return (
    <I18nProvider locale={user.preferredLocale}>
      <UserProvider user={user}>
        <NavBar user={user} />
        {children}
      </UserProvider>
    </I18nProvider>
  );
}
