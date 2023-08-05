import type { PropsWithChildren } from "react";

export type PageHeadingProps = PropsWithChildren;

export function PageHeading({ children }: PageHeadingProps) {
  return <h2 className="text-lg font-medium text-gray-800">{children}</h2>;
}
