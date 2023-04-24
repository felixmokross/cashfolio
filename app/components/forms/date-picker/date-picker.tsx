import type { ReactNode } from "react";
import { useRef } from "react";
import type {
  AriaDatePickerProps,
  AriaDialogProps,
  AriaPopoverProps,
  DateValue,
} from "react-aria";
import { DismissButton, useDialog } from "react-aria";
import { Overlay, useDateField, useDateSegment, usePopover } from "react-aria";
import { useLocale } from "react-aria";
import { useDatePicker } from "react-aria";
import type {
  DateFieldState,
  DatePickerStateOptions,
  DateSegment,
  OverlayTriggerState,
} from "react-stately";
import { useDateFieldState } from "react-stately";
import { useDatePickerState } from "react-stately";
import { createCalendar } from "@internationalized/date";
import { CalendarDaysIcon } from "@heroicons/react/20/solid";
import { cn } from "../../classnames";
import { ClientOnly } from "../../client-only";
import { Label } from "../label";
import { DatePickerButton } from "./common";
import { Calendar } from "./calendar";

type DatePickerProps = DatePickerStateOptions<DateValue>;

export function DatePicker(props: DatePickerProps) {
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

  return (
    <div>
      <Label {...labelProps}>{props.label}</Label>
      <div
        {...groupProps}
        ref={ref}
        className="flex w-full justify-between rounded-md border border-slate-300 px-3 py-2 shadow-sm sm:text-sm"
      >
        <DateField {...fieldProps} />
        <DatePickerButton
          {...buttonProps}
          className="rounded-sm text-slate-500 hover:text-slate-600 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <CalendarDaysIcon className="h-5 w-5" />
        </DatePickerButton>
      </div>
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
        "rounded-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-1",
        {
          "text-slate-500": segment.isPlaceholder || segment.type === "literal",
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
  let { popoverProps, underlayProps, arrowProps, placement } = usePopover(
    {
      ...props,
      offset,
      popoverRef,
    },
    state
  );

  return (
    <Overlay>
      <div {...underlayProps} className="underlay" />
      <div {...popoverProps} ref={popoverRef} className="popover">
        <svg {...arrowProps} className="arrow" data-placement={placement}>
          <path d="M0 0,L6 6,L12 0" />
        </svg>
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
