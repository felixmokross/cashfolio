import type { ComponentPropsWithRef, ElementType } from "react";
import { cn } from "../../classnames";
import type { IconComponentType } from "../icons/types";
import { Link } from "@remix-run/react";

export type IconButtonProps<T extends ElementType> = {
  as?: T;
  altText: string;
  icon: IconComponentType;
  size?: "default" | "large";
} & Omit<ComponentPropsWithRef<T>, "as">;

export function IconButton<T extends ElementType>({
  as,
  icon,
  altText,
  size = "default",
  ...props
}: IconButtonProps<T>) {
  const Component = as || "button";
  const Icon = icon;
  return (
    <Component
      className="inline-block rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"
      {...props}
    >
      <span className="sr-only">{altText}</span>
      <Icon
        className={cn({
          "h-5 w-5": size === "default",
          "h-6 w-6": size === "large",
        })}
        aria-hidden={true}
      />
    </Component>
  );
}

export type LinkIconButtonProps = IconButtonProps<typeof Link>;

export function LinkIconButton(props: LinkIconButtonProps) {
  return <IconButton as={Link} {...props} />;
}
