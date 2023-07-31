import type {
  ComponentPropsWithoutRef,
  ElementType,
  PropsWithChildren,
} from "react";
import { cn } from "./classnames";
import type { IconComponentType } from "./icons/types";

function buttonClassName(variant: ButtonVariant = "secondary") {
  return {
    button: cn(
      "inline-flex items-center gap-1.5 justify-center rounded-md border px-4 py-2 text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto",
      {
        "border-transparent bg-sky-600 text-white hover:bg-sky-700 disabled:bg-sky-600":
          variant === "primary",
        "border-slate-300 bg-white text-slate-700 hover:bg-slate-50 disabled:bg-white":
          variant === "secondary",
      }
    ),
    icon: cn("-ml-1.5 h-4 w-4", {
      "text-white": variant === "primary",
      "text-slate-600": variant === "secondary",
    }),
  };
}

/**
 * Renders as a native `button` element by default. To render the button as a
 * different element, use the `as` prop. Additional props are passed to the
 * rendered element.
 *
 * For a link button use the `LinkButton` component instead.
 */
export function Button<T extends ElementType>({
  as,
  variant = "secondary",
  children,
  className,
  icon,
  ...props
}: ButtonProps<T>) {
  const Component = as || "button";
  const Icon = icon;

  const classNames = buttonClassName(variant);
  return (
    <Component
      className={cn(classNames.button, className)}
      {...(Component === "button" ? { type: "button" } : {})}
      {...props}
    >
      {Icon && <Icon className={classNames.icon} />}
      {children}
    </Component>
  );
}

export type ButtonProps<T extends ElementType> = PropsWithChildren<
  {
    /**
     * React Element Type as which the button should be rendered. Additional
     * props are passed to the rendered element.
     */
    as?: T;
    /** The variant of the button. */
    variant?: ButtonVariant;
    /**
     * Component Type of the icon to be rendered in front of the button content.
     * If not specified, the button is rendered without an icon.
     */
    icon?: IconComponentType;
  } & Omit<ComponentPropsWithoutRef<T>, "as">
>;

type ButtonVariant = "primary" | "secondary";
