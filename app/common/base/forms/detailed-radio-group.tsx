import { useId, useState } from "react";
import {
  RadioGroup as HeadlessRadioGroup,
  Radio as HeadlessRadio,
  Field,
  Label,
} from "@headlessui/react";
import { labelClassName } from "./label";
import { CheckCircleIcon } from "@heroicons/react/20/solid";
import { ErrorMessage } from "./error-message";
import { cn } from "../classnames";

export function DetailedRadioGroup<TValue extends string | undefined>({
  defaultValue,
  onChange,
  groupClassName,
  label,
  options,
  error,
  name,
  disabled = false,
}: DetailedRadioGroupProps<TValue>) {
  const [value, setValue] = useState(defaultValue);
  const errorId = `detailed-radio-group-error-${useId()}`;
  return (
    <Field className={groupClassName}>
      <Label className={labelClassName}>{label}</Label>
      <HeadlessRadioGroup
        value={value}
        onChange={(value) => {
          setValue(value);
          if (onChange) {
            onChange(value as TValue);
          }
        }}
        name={name}
        disabled={disabled}
        as="div"
        className="mt-4 grid grid-cols-2 gap-x-4 gap-y-6"
      >
        {options.map((option) => (
          <HeadlessRadio
            key={option.value}
            value={option.value}
            className={({ checked, focus }) =>
              cn(
                checked ? "border-transparent" : "border-gray-300",
                focus ? "border-brand-500 ring-2 ring-brand-500" : "",
                "relative flex rounded-lg border bg-white p-4 shadow-sm focus:outline-none",
                disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer",
              )
            }
          >
            {({ checked, focus }) => (
              <>
                <span className="flex flex-1">
                  <span className="flex flex-col">
                    <HeadlessRadioGroup.Label
                      as="span"
                      className="block text-sm font-medium text-gray-900"
                    >
                      {option.label}
                    </HeadlessRadioGroup.Label>
                    <HeadlessRadioGroup.Description
                      as="span"
                      className="mt-1 flex items-center text-sm text-gray-500"
                    >
                      {option.description}
                    </HeadlessRadioGroup.Description>
                  </span>
                </span>
                <CheckCircleIcon
                  className={cn(
                    !checked ? "invisible" : "",
                    "h-5 w-5 text-brand-600",
                  )}
                  aria-hidden="true"
                />
                <span
                  className={cn(
                    focus ? "border" : "border-2",
                    checked ? "border-brand-500" : "border-transparent",
                    "pointer-events-none absolute -inset-px rounded-lg",
                  )}
                  aria-hidden="true"
                />
              </>
            )}
          </HeadlessRadio>
        ))}
      </HeadlessRadioGroup>
      <ErrorMessage error={error} errorId={errorId} />
    </Field>
  );
}

export type DetailedRadioGroupProps<TValue extends string | undefined> = {
  groupClassName?: string;
  label: string;
  name: string;
  error?: string;
  defaultValue?: string;
  onChange?: (value: TValue) => void;
  options: { label: string; description: string; value: TValue }[];
  disabled?: boolean;
};
