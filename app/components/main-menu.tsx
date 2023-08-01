import { Disclosure } from "@headlessui/react";
import type { PropsWithChildren, Ref } from "react";
import { forwardRef } from "react";
import type { NavLinkProps as RemixNavLinkProps } from "@remix-run/react";
import { Link, NavLink as RemixNavLink } from "@remix-run/react";
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
        <MainMenuLink to="balance-change-categories">
          Balance Change Categories
        </MainMenuLink>
      </div>
      <div className="border-t border-gray-200 pb-3 pt-4">
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
              className="text-gray-400 hover:text-gray-500"
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
            ? "border-brand-500 bg-brand-50 text-brand-700"
            : "border-transparent text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800",
          "block border-l-4 py-2 pl-3 pr-4 text-base font-medium"
        )
      }
      ref={ref}
    />
  );
});
