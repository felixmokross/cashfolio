import type { ReactNode } from "react";
import { useId, useRef } from "react";
import type {
  AriaButtonProps,
  AriaDatePickerProps,
  AriaDialogProps,
  AriaPopoverProps,
  DateValue,
} from "react-aria";
import {
  useButton,
  DismissButton,
  useDialog,
  Overlay,
  useDateField,
  useDateSegment,
  usePopover,
  useLocale,
  useDatePicker,
} from "react-aria";
import type {
  DateFieldState,
  DateSegment,
  OverlayTriggerState,
} from "react-stately";
import { useDateFieldState, useDatePickerState } from "react-stately";
import { createCalendar, parseDate } from "@internationalized/date";
import { CalendarDaysIcon } from "@heroicons/react/20/solid";
import { cn } from "../../classnames";
import { ClientOnly } from "../../client-only";
import { Label } from "../label";
import { Calendar } from "./calendar";
import { ErrorMessage } from "../error-message";

type DateInputProps = {
  name?: string;
  defaultValue?: string;
  groupClassName?: string;
  className?: string;
  error?: string;
  disabled?: boolean;
} & (
  | {
      size?: "default";
      label?: string;
    }
  | {
      size: "compact";
      label?: undefined;
    }
);

export function DateInput({
  label,
  size = "default",
  name,
  defaultValue,
  groupClassName,
  className,
  error,
  disabled = false,
}: DateInputProps) {
  const props = {
    label: label || "Date",
    defaultValue: defaultValue ? parseDate(defaultValue) : undefined,
    isDisabled: disabled,
  };

  let state = useDatePickerState(props);
  let ref = useRef(null);
  let {
    groupProps,
    labelProps,
    fieldProps,
    buttonProps,
    dialogProps,
    calendarProps,
  } = useDatePicker(props, state, ref);

  const errorId = `datepicker-error-${useId()}`;

  return (
    <div className={groupClassName}>
      {label && <Label {...labelProps}>{label}</Label>}
      <div
        {...groupProps}
        ref={ref}
        className={cn(
          label && "mt-1",
          "flex w-full justify-between border px-3 py-2 sm:text-sm",
          {
            "rounded-md border-gray-300 shadow-sm": size === "default",
            "border-transparent": size === "compact",
          },
          disabled && "cursor-not-allowed bg-gray-50 opacity-50",
          className
        )}
      >
        <input
          type="hidden"
          name={name}
          value={state.value?.toString() || ""}
        />
        <DateField {...fieldProps} />
        <DatePickerButton {...buttonProps} isDisabled={disabled}>
          <CalendarDaysIcon className="h-5 w-5 text-gray-400" />
        </DatePickerButton>
      </div>
      <ErrorMessage error={error} errorId={errorId} />
      {state.isOpen && (
        <Popover state={state} triggerRef={ref} placement="bottom start">
          <Dialog {...dialogProps}>
            <Calendar {...calendarProps} />
          </Dialog>
        </Popover>
      )}
    </div>
  );
}

type DateFieldProps = AriaDatePickerProps<DateValue>;

function DateField(props: DateFieldProps) {
  let { locale } = useLocale();
  let state = useDateFieldState({
    ...props,
    locale,
    createCalendar,
  });

  let ref = useRef(null);
  let { labelProps, fieldProps } = useDateField(props, state, ref);

  return (
    <div>
      <span {...labelProps}>{props.label}</span>
      <div {...fieldProps} ref={ref} className="flex gap-1">
        {state.segments.map((segment, i) => (
          <DateFieldSegment key={i} segment={segment} state={state} />
        ))}
        {state.validationState === "invalid" && (
          <span aria-hidden="true">🚫</span>
        )}
      </div>
    </div>
  );
}

type DateFieldSegmentProps = {
  segment: DateSegment;
  state: DateFieldState;
};

function DateFieldSegment({ segment, state }: DateFieldSegmentProps) {
  let ref = useRef(null);
  let { segmentProps } = useDateSegment(segment, state, ref);

  return (
    <div
      {...segmentProps}
      ref={ref}
      className={cn(
        "rounded-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-1",
        {
          "text-gray-500": segment.isPlaceholder || segment.type === "literal",
        }
      )}
    >
      <ClientOnly fallback="">{segment.text}</ClientOnly>
    </div>
  );
}

interface PopoverProps extends Omit<AriaPopoverProps, "popoverRef"> {
  children: ReactNode;
  state: OverlayTriggerState;
}

function Popover({ children, state, offset = 8, ...props }: PopoverProps) {
  let popoverRef = useRef(null);
  let { popoverProps, underlayProps } = usePopover(
    {
      ...props,
      offset,
      popoverRef,
    },
    state
  );

  return (
    <Overlay>
      <div {...underlayProps} />
      <div {...popoverProps} ref={popoverRef}>
        <DismissButton onDismiss={state.close} />
        {children}
        <DismissButton onDismiss={state.close} />
      </div>
    </Overlay>
  );
}

interface DialogProps extends AriaDialogProps {
  title?: React.ReactNode;
  children: React.ReactNode;
}

function Dialog({ title, children, ...props }: DialogProps) {
  let ref = useRef(null);
  let { dialogProps, titleProps } = useDialog(props, ref);

  return (
    <div
      {...dialogProps}
      ref={ref}
      className="rounded-md border bg-white p-3 shadow-md"
    >
      {title && <h3 {...titleProps}>{title}</h3>}
      {children}
    </div>
  );
}

type DatePickerButtonProps = AriaButtonProps<"button"> & {
  className?: string;
};

function DatePickerButton({ className, ...props }: DatePickerButtonProps) {
  let ref = useRef(null);
  let { buttonProps } = useButton(props, ref);
  let { children } = props;

  return (
    <button
      {...buttonProps}
      ref={ref}
      className="rounded-sm text-gray-500 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {children}
    </button>
  );
}
