import { Outlet } from "@remix-run/react";
import { I18nProvider } from "react-aria";
import { NavBar } from "~/common/nav-bar";
import { UserProvider } from "~/common/user-context";
import type { ExtendedUserDto } from "~/users/types";

export type AppProps = {
  user: ExtendedUserDto;
};

export function App({ user }: AppProps) {
  return (
    <I18nProvider locale={user.preferredLocale}>
      <UserProvider user={user}>
        <NavBar user={user} />
        <Outlet />
      </UserProvider>
    </I18nProvider>
  );
}
