import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/20/solid";
import type { DataFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import type { NavLinkProps as RemixNavLinkProps } from "@remix-run/react";
import {
  Link,
  NavLink as RemixNavLink,
  Outlet,
  useLoaderData,
} from "@remix-run/react";
import type { PropsWithChildren } from "react";
import { I18nProvider } from "react-aria";
import { requireUser } from "~/auth.server";
import { cn } from "~/components/classnames";
import { LogoSmall } from "~/components/icons/logo-small";
import { LocaleProvider } from "~/components/locale-context";

export async function loader({ request }: DataFunctionArgs) {
  const user = await requireUser(request);
  return json(user);
}

export default function App() {
  const user = useLoaderData<typeof loader>();
  return (
    <I18nProvider locale={user.preferredLocale}>
      <LocaleProvider locale={user.preferredLocale}>
        <Disclosure as="nav">
          {({ open }) => (
            <>
              <div className="flex h-16 items-center justify-between border-b border-slate-200 px-4">
                <div>
                  <Link to="/">
                    <LogoSmall className="h-8 w-8" />
                  </Link>
                </div>
                <div>
                  <Disclosure.Button className="rounded-md bg-white p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="h-5 w-5" />
                    ) : (
                      <Bars3Icon className="h-5 w-5" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
              </div>
              <Disclosure.Panel>
                <div className="space-y-1 pb-3 pt-2">
                  <MainMenuLink to=".">Home</MainMenuLink>
                  <MainMenuLink to="accounts">Accounts</MainMenuLink>
                  <MainMenuLink to="asset-classes">Asset Classes</MainMenuLink>
                </div>
                <div className="border-t border-slate-200 pb-3 pt-4">
                  <div className="flex items-center px-4">
                    <div className="flex-shrink-0">
                      <img
                        className="h-10 w-10 rounded-full"
                        src={user.pictureUrl}
                        alt="Profile"
                      />
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium text-gray-800">
                        {user.email}
                      </div>
                      <div className="text-sm font-medium text-gray-500">
                        {user.preferredLocale} &middot; {user.refCurrency}
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 space-y-1">
                    <MainMenuLink to="logout">Log Out</MainMenuLink>
                  </div>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
        <Outlet />
      </LocaleProvider>
    </I18nProvider>
  );
}

type MainMenuLinkProps = PropsWithChildren<{ to: NavLinkProps["to"] }>;

function MainMenuLink({ to, children }: MainMenuLinkProps) {
  return (
    <Disclosure.Button as={NavLink} to={to}>
      {children}
    </Disclosure.Button>
  );
}

type NavLinkProps = Omit<RemixNavLinkProps, "className">;

function NavLink(props: NavLinkProps) {
  return (
    <RemixNavLink
      {...props}
      className={({ isActive }: { isActive: boolean }) =>
        cn(
          isActive
            ? "border-sky-500 bg-sky-50 text-sky-700"
            : "border-transparent text-slate-600 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-800",
          "block border-l-4 py-2 pl-3 pr-4 text-base font-medium"
        )
      }
    />
  );
}
