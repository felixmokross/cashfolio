import { useRef } from "react";
import type { AriaButtonProps } from "react-aria";
import { useButton } from "react-aria";

export type DatePickerButtonProps = AriaButtonProps<"button"> & {
  className?: string;
};

export function DatePickerButton({
  className,
  ...props
}: DatePickerButtonProps) {
  let ref = useRef(null);
  let { buttonProps } = useButton(props, ref);
  let { children } = props;

  return (
    <button {...buttonProps} ref={ref} className={className}>
      {children}
    </button>
  );
}
