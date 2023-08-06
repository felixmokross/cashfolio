import { Disclosure } from "@headlessui/react";
import type { PropsWithChildren, Ref } from "react";
import { forwardRef } from "react";
import type { NavLinkProps as RemixNavLinkProps } from "@remix-run/react";
import { NavLink as RemixNavLink } from "@remix-run/react";
import { cn } from "./classnames";
import { currenciesByCode } from "~/common/currencies";
import { getDisplayNameOfLocale } from "~/common/utils";
import { Cog6ToothIcon } from "@heroicons/react/24/outline";
import { LinkIconButton } from "./icon-button";
import type { ExtendedUserDto } from "~/users/types";

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
        <MainMenuNavLink to="balance-change-categories">
          Balance Change Categories
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
              {currenciesByCode[user.refCurrency]}
            </div>
          </div>
          <div className="flex-shrink-0">
            <Disclosure.Button
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
