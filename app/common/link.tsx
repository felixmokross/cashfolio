import { Link as RemixLink } from "@remix-run/react";
import type { ComponentProps } from "react";
import { cn } from "./classnames";

export type LinkProps = ComponentProps<typeof RemixLink>;

export function Link({ className, ...props }: LinkProps) {
  return (
    <RemixLink
      {...props}
      className={cn(
        "text-brand-600 hover:text-brand-700 hover:underline",
        className,
      )}
    />
  );
}
