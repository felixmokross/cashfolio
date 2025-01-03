import { Link as ReactRouterLink } from "react-router";
import type { ComponentProps } from "react";
import { cn } from "./classnames";

export type LinkProps = ComponentProps<typeof ReactRouterLink>;

export function Link({ className, ...props }: LinkProps) {
  return (
    <ReactRouterLink
      {...props}
      className={cn(
        "text-brand-600 hover:text-brand-700 hover:underline",
        className,
      )}
    />
  );
}
