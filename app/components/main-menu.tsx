import { Disclosure } from "@headlessui/react";
import type { PropsWithChildren, Ref } from "react";
import { forwardRef } from "react";
import type { NavLinkProps as RemixNavLinkProps } from "@remix-run/react";
import { Link } from "@remix-run/react";
import { NavLink as RemixNavLink } from "@remix-run/react";
import { cn } from "./classnames";
import { currenciesByCode } from "~/currencies";
import { getDisplayNameOfLocale } from "~/utils";
import { useUser } from "./user-context";
import { Cog6ToothIcon } from "@heroicons/react/24/outline";

export function MainMenu() {
  const user = useUser();
  return (
    <>
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
          <div className="ml-3 flex-grow">
            <div className="text-base font-medium text-gray-800">
              {user.email}
            </div>
            <div className="text-sm font-medium text-gray-500">
              {getDisplayNameOfLocale(user.preferredLocale)} &middot;{" "}
              {currenciesByCode[user.refCurrency]}
            </div>
          </div>
          <div className="flex-shrink-0">
            <Disclosure.Button
              as={Link}
              className="text-slate-400 hover:text-slate-500"
              to="settings"
            >
              <span className="sr-only">Settings</span>
              <Cog6ToothIcon className="h-6 w-6" />
            </Disclosure.Button>
          </div>
        </div>
        <div className="mt-3 space-y-1">
          <MainMenuLink to="logout">Log Out</MainMenuLink>
        </div>
      </div>
    </>
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

const NavLink = forwardRef(function NavLink(
  props: NavLinkProps,
  ref: Ref<HTMLAnchorElement>
) {
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
      ref={ref}
    />
  );
});
