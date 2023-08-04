import type { SerializeFrom } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import { I18nProvider } from "react-aria";
import type { ExtendedUser } from "~/auth.server";
import { NavBar } from "~/components/nav-bar";
import { UserProvider } from "~/components/user-context";

export type AppProps = {
  user: SerializeFrom<ExtendedUser>;
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
