import { useId, useState } from "react";
import { RadioGroup as HeadlessRadioGroup } from "@headlessui/react";
import { labelClassName } from "./label";
import { ErrorMessage } from "./error-message";
import { cn } from "../classnames";

export function RadioGroup<TValue extends string | undefined>({
  groupClassName,
  className,
  size = "default",
  label,
  name,
  error,
  onChange,
  defaultValue,
  options,
  disabled = false,
}: RadioGroupProps<TValue>) {
  const [value, setValue] = useState(defaultValue);
  const [isFocused, setIsFocused] = useState(false);
  const errorId = `radio-group-error-${useId()}`;
  return (
    <HeadlessRadioGroup
      value={value}
      onChange={(value) => {
        setValue(value);
        onChange && onChange(value as TValue);
      }}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      className={groupClassName}
      name={name}
      aria-invalid={error ? "true" : undefined}
      aria-describedby={error ? errorId : undefined}
      disabled={disabled}
    >
      {label && (
        <HeadlessRadioGroup.Label className={labelClassName}>
          {label}
        </HeadlessRadioGroup.Label>
      )}
      <div
        className={cn(
          "grid auto-cols-fr grid-flow-col",
          {
            "border-sky-500 ring-1 ring-sky-500":
              isFocused && size === "compact",
            "border-transparent": !isFocused && size === "compact",
            "gap-x-3": size === "default",
            "overflow-hidden border": size === "compact",
          },
          label && "mt-1",
          className
        )}
      >
        {options.map((option) => (
          <HeadlessRadioGroup.Option
            key={option.value}
            value={option.value}
            className={({ active, checked }) =>
              cn(
                "flex items-center justify-center px-3 py-2 text-sm font-medium focus:outline-none sm:flex-1",
                {
                  "rounded-md border": size === "default",
                },
                active && {
                  "ring-2 ring-sky-500 ring-offset-2": size === "default",
                },
                checked
                  ? cn(
                      "border-transparent text-white",
                      {
                        "bg-sky-600": !option.variant,
                        "bg-emerald-600": option.variant === "positive",
                        "bg-rose-600": option.variant === "negative",
                      },
                      !disabled && {
                        "hover:bg-sky-700": !option.variant,
                        "hover:bg-emerald-700": option.variant === "positive",
                        "hover:bg-rose-700": option.variant === "negative",
                      }
                    )
                  : cn(
                      "border-slate-200 bg-white text-slate-900",
                      !disabled && "hover:bg-slate-50"
                    ),
                disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"
              )
            }
          >
            <HeadlessRadioGroup.Label as="span">
              {option.label}
            </HeadlessRadioGroup.Label>
          </HeadlessRadioGroup.Option>
        ))}
      </div>
      <ErrorMessage error={error} errorId={errorId} />
    </HeadlessRadioGroup>
  );
}

export type RadioGroupProps<TValue extends string | undefined> = {
  groupClassName?: string;
  className?: string;
  name?: string;
  error?: string;
  defaultValue?: TValue;
  onChange?: (value: TValue) => void;
  options: {
    label: string;
    value: TValue;
    variant?: "positive" | "negative";
  }[];
  disabled?: boolean;
} & (
  | { size?: "default"; label?: string }
  | { size: "compact"; label?: undefined }
);
