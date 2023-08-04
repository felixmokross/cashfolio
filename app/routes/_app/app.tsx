import { Outlet } from "@remix-run/react";
import { I18nProvider } from "react-aria";
import { NavBar } from "~/components/nav-bar";
import { UserProvider } from "~/components/user-context";
import type { ExtendedUserDto } from "~/users/types";

export type AppProps = {
  user: ExtendedUserDto;
};

export function App({ user }: AppProps) {
  return (
    <I18nProvider locale={user.preferredLocale}>
      <UserProvider user={user}>
        <NavBar />
        <Outlet />
      </UserProvider>
    </I18nProvider>
  );
}
