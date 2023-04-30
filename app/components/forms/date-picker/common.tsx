import { useRef } from "react";
import type { AriaButtonProps } from "react-aria";
import { useButton } from "react-aria";
import { cn } from "../../../components/classnames";

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
    <button
      {...buttonProps}
      ref={ref}
      className={cn(
        "-m1.5 cursor-pointer p-1.5 text-slate-400 hover:text-slate-500",
        className
      )}
    >
      {children}
    </button>
  );
}
