import { DisclosureButton } from "@headlessui/react";
import type { PropsWithChildren } from "react";
import type { NavLinkProps as ReactRouterNavLinkProps } from "react-router";
import { NavLink as ReactRouterNavLink } from "react-router";
import { cn } from "./base/classnames";
import { currenciesByCode } from "~/common/currencies";
import { getDisplayNameOfLocale } from "~/common/utils";
import { Cog6ToothIcon } from "@heroicons/react/24/outline";
import { LinkIconButton } from "./base/buttons/icon-button";
import type { ExtendedUserDto } from "~/users/types";
import { version } from "~/version";

export type MainMenuProps = {
  user: ExtendedUserDto;
};

export function MainMenu({ user }: MainMenuProps) {
  return (
    <>
      <div className="space-y-1 pb-3 pt-2">
        <MainMenuNavLink to=".">Home</MainMenuNavLink>
        <MainMenuNavLink to="accounts">Accounts</MainMenuNavLink>
        <MainMenuNavLink to="asset-classes">Asset Classes</MainMenuNavLink>
        <MainMenuNavLink to="income-categories">
          Income Categories
        </MainMenuNavLink>
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
              {currenciesByCode[user.refCurrency]} &middot; {version}
            </div>
          </div>
          <div className="flex-shrink-0">
            <DisclosureButton
              as={LinkIconButton}
              to="settings"
              icon={Cog6ToothIcon}
              altText="Settings"
              size="large"
            />
          </div>
        </div>
        <div className="mt-3 space-y-1">
          <MainMenuNavLink to="logout">Log Out</MainMenuNavLink>
        </div>
      </div>
    </>
  );
}

type MainMenuNavLinkProps = PropsWithChildren<{ to: NavLinkProps["to"] }>;

function MainMenuNavLink({ to, children }: MainMenuNavLinkProps) {
  return (
    <DisclosureButton as={NavLink} to={to}>
      {children}
    </DisclosureButton>
  );
}

type NavLinkProps = Omit<ReactRouterNavLinkProps, "className">;

function NavLink(props: NavLinkProps) {
  return (
    <ReactRouterNavLink
      {...props}
      className={({ isActive }: { isActive: boolean }) =>
        cn(
          isActive
            ? "border-brand-500 bg-brand-50 text-brand-700"
            : "border-transparent text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800",
          "block border-l-4 py-2 pl-3 pr-4 text-base font-medium",
        )
      }
    />
  );
}
