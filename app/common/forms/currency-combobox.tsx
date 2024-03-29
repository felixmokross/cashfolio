import { currencyItems } from "../currencies";
import type { ComboboxProps } from "../base/forms/combobox";
import { Combobox } from "../base/forms/combobox";

export function CurrencyCombobox({
  groupClassName,
  label,
  name,
  error,
  defaultValue,
  ...props
}: CurrencyComboboxProps) {
  return (
    <Combobox
      label={label}
      name={name}
      error={error}
      defaultValue={defaultValue}
      groupClassName={groupClassName}
      options={currencyItems.map((c) => ({
        primaryText: c.name,
        secondaryText: c.code,
        value: c.code,
      }))}
      {...props}
    />
  );
}

export type CurrencyComboboxProps = Omit<ComboboxProps, "options">;
