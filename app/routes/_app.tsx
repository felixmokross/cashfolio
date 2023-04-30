import type { DataFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import { I18nProvider } from "react-aria";
import { requireUser } from "~/auth.server";
import { LocaleProvider } from "~/components/locale-context";
import { NavBar } from "~/components/nav-bar";

export async function loader({ request }: DataFunctionArgs) {
  const user = await requireUser(request);
  return json(user);
}

export default function App() {
  const user = useLoaderData<typeof loader>();
  return (
    <I18nProvider locale={user.preferredLocale}>
      <LocaleProvider locale={user.preferredLocale}>
        <NavBar user={user} />
        <Outlet />
      </LocaleProvider>
    </I18nProvider>
  );
}
