import type { DetailedHTMLProps } from "react";
import { useId } from "react";
import { cn } from "../../classnames";
import { Label } from "./label";
import { ErrorMessage } from "./error-message";

export const Input = function Input({
  label,
  error,
  groupClassName,
  type,
  className,
  adornment,
  size = "default",
  ...props
}: InputProps) {
  const id = `input-${useId()}`;
  const errorId = `input-error-${useId()}`;
  return (
    <div className={groupClassName}>
      {label && <Label htmlFor={id}>{label}</Label>}
      <div className={cn("relative", label && "mt-1")}>
        {adornment && (
          <div className="pointer-events-none absolute inset-y-0 left-0 flex w-16 items-center pl-3 text-gray-500 sm:w-12 sm:text-sm">
            {adornment}
          </div>
        )}
        <input
          type={type || "text"}
          id={id}
          className={cn(
            "block w-full focus:border-brand-500 focus:ring-brand-500 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:opacity-50 sm:text-sm",
            {
              "rounded-md border-gray-300 shadow-sm": size === "default",
              "border-transparent": size === "compact",
            },
            adornment && "pl-14 sm:pl-12",
            className,
          )}
          aria-invalid={error ? "true" : undefined}
          aria-describedby={error ? errorId : undefined}
          {...props}
        />
      </div>
      <ErrorMessage error={error} errorId={errorId} />
    </div>
  );
};

export type InputProps = {
  name?: string;
  error?: string;
  groupClassName?: string;
  adornment?: string;
} & (
  | {
      size: "compact";
      label?: undefined;
    }
  | {
      size?: "default";
      label?: string;
    }
) &
  Omit<
    DetailedHTMLProps<
      React.InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    >,
    "size"
  >;
