import { Link } from "@remix-run/react";
import type { ButtonProps } from "./button";
import { Button } from "./button";
import type { ComponentPropsWithRef } from "react";

export type LinkButtonProps = {
  /** The link target. See the Remix `Link` component for details. */
  to: ComponentPropsWithRef<typeof Link>["to"];
} & Omit<ButtonProps<typeof Link>, "as" | "to">;

/**
 * Renders a Remix `Link` component styled as a button. Any additional props are
 * forwarded to the `Link` component. Use the `to` prop to specify the link
 * target.
 */
export const LinkButton = function LinkButton(props: LinkButtonProps) {
  return <Button {...props} as={Link} />;
};
