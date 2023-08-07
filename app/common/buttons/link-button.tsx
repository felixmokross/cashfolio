import { Link } from "@remix-run/react";
import type { ButtonProps } from "./button";
import { Button } from "./button";
import { forwardRef } from "react";
import type { Ref, ComponentPropsWithRef } from "react";

export type LinkButtonProps = {
  /** The link target. See the Remix `Link` component for details. */
  to: ComponentPropsWithRef<typeof Link>["to"];
} & Omit<ButtonProps<typeof Link>, "as" | "to">;

/**
 * Renders a Remix `Link` component styled as a button. Any additional props are
 * forwarded to the `Link` component. Use the `to` prop to specify the link
 * target.
 */
export const LinkButton = forwardRef(function LinkButton(
  props: LinkButtonProps,
  ref: Ref<HTMLButtonElement>
) {
  return <Button {...props} as={Link} ref={ref} />;
});
