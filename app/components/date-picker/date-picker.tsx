import type { ReactNode } from "react";
import { useRef } from "react";
import type {
  AriaButtonProps,
  AriaDatePickerProps,
  AriaDialogProps,
  AriaPopoverProps,
  CalendarProps,
  DateValue,
} from "react-aria";
import { useButton } from "react-aria";
import { useCalendar, useCalendarCell, useCalendarGrid } from "react-aria";
import { DismissButton, useDialog } from "react-aria";
import { Overlay, useDateField, useDateSegment, usePopover } from "react-aria";
import { useLocale } from "react-aria";
import { useDatePicker } from "react-aria";
import type {
  CalendarState,
  DateFieldState,
  DatePickerStateOptions,
  DateSegment,
  OverlayTriggerState,
} from "react-stately";
import { useCalendarState } from "react-stately";
import { useDateFieldState } from "react-stately";
import { useDatePickerState } from "react-stately";
import type { CalendarDate } from "@internationalized/date";
import { createCalendar, getWeeksInMonth } from "@internationalized/date";
import { Label } from "../forms";
import { CalendarDaysIcon } from "@heroicons/react/20/solid";
import { cn } from "../classnames";
import { ClientOnly } from "../client-only";

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
        <Button
          {...buttonProps}
          className="rounded-sm text-slate-500 hover:text-slate-600 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <CalendarDaysIcon className="h-5 w-5" />
        </Button>
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

function Calendar(props: CalendarProps<DateValue>) {
  let { locale } = useLocale();
  let state = useCalendarState({
    ...props,
    locale,
    createCalendar,
  });

  let { calendarProps, prevButtonProps, nextButtonProps, title } = useCalendar(
    props,
    state
  );

  return (
    <div {...calendarProps}>
      <div className="flex items-baseline justify-between">
        <Button {...prevButtonProps} className="px-4">
          &lt;
        </Button>
        <h2 className="text-sm font-medium text-slate-700">{title}</h2>
        <Button {...nextButtonProps} className="px-4">
          &gt;
        </Button>
      </div>
      <CalendarGrid state={state} />
    </div>
  );
}

type CalendarGridProps = { state: CalendarState };

function CalendarGrid({ state, ...props }: CalendarGridProps) {
  let { locale } = useLocale();
  let { gridProps, headerProps, weekDays } = useCalendarGrid(props, state);

  // Get the number of weeks in the month so we can render the proper number of rows.
  let weeksInMonth = getWeeksInMonth(state.visibleRange.start, locale);

  return (
    <table {...gridProps} className="mt-3 w-full">
      <thead {...headerProps}>
        <tr>
          {weekDays.map((day, index) => (
            <th key={index} className="text-center">
              {day}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {[...new Array(weeksInMonth).keys()].map((weekIndex) => (
          <tr key={weekIndex}>
            {state
              .getDatesInWeek(weekIndex)
              .map((date, i) =>
                date ? (
                  <CalendarCell key={i} state={state} date={date} />
                ) : (
                  <td key={i} />
                )
              )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

type CalendarCellProps = { state: CalendarState; date: CalendarDate };

function CalendarCell({ state, date }: CalendarCellProps) {
  let ref = useRef(null);
  let {
    cellProps,
    buttonProps,
    isSelected,
    isOutsideVisibleRange,
    isDisabled,
    isUnavailable,
    formattedDate,
  } = useCalendarCell({ date }, state, ref);

  return (
    <td {...cellProps}>
      <div
        {...buttonProps}
        ref={ref}
        hidden={isOutsideVisibleRange}
        className={`px-2 text-center ${isSelected ? "bg-sky-100" : ""} ${
          isDisabled ? "disabled" : ""
        } ${isUnavailable ? "unavailable" : ""}`}
      >
        {formattedDate}
      </div>
    </td>
  );
}

type ButtonProps = AriaButtonProps<"button"> & {
  className?: string;
};

function Button({ className, ...props }: ButtonProps) {
  let ref = useRef(null);
  let { buttonProps } = useButton(props, ref);
  let { children } = props;

  return (
    <button {...buttonProps} ref={ref} className={className}>
      {children}
    </button>
  );
}

<Button onPress={() => alert("Button pressed!")}>Test</Button>;
