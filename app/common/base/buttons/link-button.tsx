import { Link } from "react-router";
import type { ButtonProps } from "./button";
import { Button } from "./button";
import type { ComponentPropsWithoutRef } from "react";

export type LinkButtonProps = {
  /** The link target. See the React Router `Link` component for details. */
  to: ComponentPropsWithoutRef<typeof Link>["to"];
} & Omit<ButtonProps<typeof Link>, "as" | "to">;

/**
 * Renders a React Router `Link` component styled as a button. Any additional props are
 * forwarded to the `Link` component. Use the `to` prop to specify the link
 * target.
 */
export const LinkButton = function LinkButton(props: LinkButtonProps) {
  return <Button {...props} as={Link} />;
};
