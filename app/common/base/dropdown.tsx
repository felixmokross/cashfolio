import { Menu, MenuItem, MenuItems, Transition } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import type {
  ComponentPropsWithoutRef,
  ElementType,
  PropsWithChildren,
} from "react";
import { cn } from "./classnames";
import { IconButton } from "./buttons/icon-button";
import type { IconComponentType } from "./icons/types";

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
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <MenuItems className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">{children}</div>
        </MenuItems>
      </Transition>
    </Menu>
  );
}

export type DropdownItemProps<T extends ElementType = "button"> = {
  as?: T;
  icon?: IconComponentType;
} & Omit<ComponentPropsWithoutRef<T>, "as">;

export function DropdownItem<T extends ElementType>({
  as,
  children,
  icon: Icon,
  ...props
}: DropdownItemProps<T>) {
  return (
    <MenuItem>
      {({ active }) => {
        const Component = as || "button";
        return (
          <Component
            className={cn(
              active ? "bg-gray-100 text-gray-900" : "text-gray-700",
              "flex items-center gap-3 w-full px-4 py-2 text-left text-sm",
            )}
            {...props}
          >
            {Icon && (
              <Icon
                className={cn(
                  "w-5 h-5",
                  active ? "text-gray-500" : "text-gray-400",
                )}
              />
            )}
            {children}
          </Component>
        );
      }}
    </MenuItem>
  );
}
