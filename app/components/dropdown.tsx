import { Menu, Transition } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import type {
  ComponentPropsWithoutRef,
  ElementType,
  PropsWithChildren,
} from "react";
import { Fragment } from "react";
import { cn } from "./classnames";
import { IconButton } from "./icon-button";

export type DropdownProps = PropsWithChildren;

export function Dropdown({ children }: DropdownProps) {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <IconButton
          as={Menu.Button}
          icon={EllipsisVerticalIcon}
          altText="Open options"
        />
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">{children}</div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

export type DropdownItemProps<T extends ElementType = "button"> = {
  as?: T;
} & Omit<ComponentPropsWithoutRef<T>, "as">;

export function DropdownItem<T extends ElementType>({
  as,
  ...props
}: DropdownItemProps<T>) {
  return (
    <Menu.Item>
      {({ active }) => {
        const Component = as || "button";
        return (
          <Component
            className={cn(
              active ? "bg-gray-100 text-gray-900" : "text-gray-700",
              "block w-full px-4 py-2 text-left text-sm"
            )}
            {...props}
          />
        );
      }}
    </Menu.Item>
  );
}
