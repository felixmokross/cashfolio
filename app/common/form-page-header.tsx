import type { PropsWithChildren } from "react";
import type { IconComponentType } from "./base/icons/types";
import { cn } from "./base/classnames";
import { PageHeading } from "./page-heading";

export type FormPageHeaderProps = PropsWithChildren<{
  icon: IconComponentType;
  variant: "positive" | "neutral";
}>;

export function FormPageHeader({
  children,
  icon,
  variant,
}: FormPageHeaderProps) {
  const Icon = icon;
  return (
    <div className="flex flex-col items-center gap-4">
      <span
        className={cn(
          "flex h-12 w-12 items-center justify-center rounded-full",
          {
            "bg-positive-100": variant === "positive",
            "bg-neutral-100": variant === "neutral",
          },
        )}
      >
        <Icon
          className={cn("h-6 w-6", {
            "text-positive-600": variant === "positive",
            "text-neutral-600": variant === "neutral",
          })}
        />
      </span>
      <PageHeading>{children}</PageHeading>
    </div>
  );
}
