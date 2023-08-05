import type { PropsWithChildren } from "react";
import type { IconComponentType } from "./icons/types";
import { cn } from "./classnames";

export type PageHeadingProps = PropsWithChildren<{
  icon: IconComponentType;
  variant: "positive" | "neutral";
}>;

export function PageHeading({ children, icon, variant }: PageHeadingProps) {
  const Icon = icon;
  return (
    <div className="col-span-6 flex flex-col items-center gap-4">
      <span
        className={cn(
          "flex h-12 w-12 items-center justify-center rounded-full",
          {
            "bg-positive-100": variant === "positive",
            "bg-neutral-100": variant === "neutral",
          }
        )}
      >
        <Icon
          className={cn("h-6 w-6 ", {
            "text-positive-600": variant === "positive",
            "text-neutral-600": variant === "neutral",
          })}
        />
      </span>
      <h2 className="text-lg font-medium text-gray-800">{children}</h2>
    </div>
  );
}
