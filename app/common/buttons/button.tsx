import { forwardRef } from "react";
import type {
  Ref,
  ComponentPropsWithRef,
  ElementType,
  PropsWithChildren,
} from "react";
import { cn } from "../classnames";
import type { IconComponentType } from "../icons/types";

function buttonClassName(size: ButtonSize, variant: ButtonVariant) {
  return {
    button: cn(
      "inline-flex items-center gap-1.5 justify-center border px-4 py-2 text-sm font-medium focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto",
      {
        " bg-brand-600 text-white hover:bg-brand-700 disabled:bg-brand-600":
          variant === "primary",
        "border-transparent":
          (variant === "primary" || variant === "negative") &&
          size === "default",
        " bg-negative-600 text-white hover:bg-negative-700 disabled:bg-negative-600":
          variant === "negative",
        "bg-white text-gray-700 hover:bg-gray-50 disabled:bg-white":
          variant === "secondary",
        "border-gray-300": variant === "secondary" && size === "default",
        "rounded-md focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 shadow-sm":
          size === "default",
        "border-white focus:border-brand-500 focus:ring-1 focus:ring-brand-500":
          size === "compact",
      }
    ),
    icon: cn("-ml-1.5 h-4 w-4", {
      "text-white": variant === "primary" || variant === "negative",
      "text-gray-600": variant === "secondary",
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
export const Button = forwardRef(function Button<T extends ElementType>(
  {
    as,
    variant = "secondary",
    size = "default",
    children,
    className,
    icon,
    ...props
  }: ButtonProps<T>,
  ref: Ref<HTMLButtonElement>
) {
  const Component = as || "button";
  const Icon = icon;

  const classNames = buttonClassName(size, variant);
  return (
    <Component
      className={cn(classNames.button, className)}
      {...(Component === "button" ? { type: "button" } : {})}
      {...props}
      ref={ref}
    >
      {Icon && <Icon className={classNames.icon} />}
      {children}
    </Component>
  );
});

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
    /** The size of the button. */
    size?: "default" | "compact";
  } & Omit<ComponentPropsWithRef<T>, "as">
>;

type ButtonVariant = "primary" | "secondary" | "negative";
type ButtonSize = "default" | "compact";
