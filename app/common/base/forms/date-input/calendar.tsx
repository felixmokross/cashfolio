import type { CalendarDate } from "@internationalized/date";
import {
  isToday,
  createCalendar,
  getWeeksInMonth,
} from "@internationalized/date";
import { useRef } from "react";
import type { AriaButtonProps, CalendarProps, DateValue } from "react-aria";
import {
  useButton,
  useCalendar,
  useCalendarCell,
  useCalendarGrid,
  useLocale,
} from "react-aria";
import type { CalendarState } from "react-stately";
import { useCalendarState } from "react-stately";
import { cn } from "../../classnames";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

export function Calendar(props: CalendarProps<DateValue>) {
  const { locale } = useLocale();
  const state = useCalendarState({
    ...props,
    locale,
    createCalendar,
  });

  const { calendarProps, prevButtonProps, nextButtonProps, title } =
    useCalendar(props, state);

  return (
    <div {...calendarProps}>
      <div className="flex items-center justify-between">
        <CalendarButton {...prevButtonProps}>
          <span className="sr-only">Previous month</span>
          <ChevronLeftIcon className="h-5 w-5" />
        </CalendarButton>
        <h2 className="text-sm font-semibold text-gray-800">{title}</h2>
        <CalendarButton {...nextButtonProps}>
          <ChevronRightIcon className="h-5 w-5" />
        </CalendarButton>
      </div>
      <CalendarGrid state={state} />
    </div>
  );
}

type CalendarGridProps = { state: CalendarState };

function CalendarGrid({ state }: CalendarGridProps) {
  const { locale } = useLocale();
  const { gridProps, headerProps, weekDays } = useCalendarGrid({}, state);

  // Get the number of weeks in the month so we can render the proper number of rows.
  const weeksInMonth = getWeeksInMonth(state.visibleRange.start, locale);

  return (
    <div {...gridProps} className="mt-6  w-full grid-cols-7">
      <div {...headerProps} className="grid grid-cols-7">
        {weekDays.map((day, index) => (
          <div
            key={index}
            className="text-center text-xs font-normal text-gray-500"
          >
            {day}
          </div>
        ))}
      </div>
      <div className="mt-2 grid grid-cols-7 gap-px rounded-lg border bg-gray-200">
        {[...new Array(Math.max(weeksInMonth, 6)).keys()].map((weekIndex) => (
          <div key={weekIndex} className="contents ring-1 ring-gray-200">
            {state
              .getDatesInWeek(weekIndex)
              .map((date, i) =>
                date ? (
                  <CalendarCell
                    key={i}
                    state={state}
                    date={date}
                    className={cn(
                      weekIndex === 0 && i === 0 && "rounded-tl-lg",
                      weekIndex === 0 && i === 6 && "rounded-tr-lg",
                      weekIndex === 5 && i === 0 && "rounded-bl-lg",
                      weekIndex === 5 && i === 6 && "rounded-br-lg",
                    )}
                  />
                ) : (
                  <td key={i} />
                ),
              )}
          </div>
        ))}
      </div>
    </div>
  );
}

type CalendarCellProps = {
  state: CalendarState;
  date: CalendarDate;
  className?: string;
};

function CalendarCell({ state, date, className }: CalendarCellProps) {
  const ref = useRef(null);
  const {
    cellProps,
    buttonProps,
    isSelected,
    isOutsideVisibleRange,
    isDisabled,
    isUnavailable,
    formattedDate,
  } = useCalendarCell({ date }, state, ref);

  return (
    <div
      {...cellProps}
      {...buttonProps}
      ref={ref}
      className={cn(
        className,
        "h-10 w-10 px-2.5 py-2.5 text-center text-sm focus:z-20 focus:rounded-md focus:outline-none focus:ring-2 focus:ring-brand-500",
        isOutsideVisibleRange || isUnavailable || isDisabled
          ? "cursor-default bg-gray-50 text-gray-400"
          : cn(
              "bg-white hover:bg-gray-100",
              isToday(date, state.timeZone)
                ? "font-semibold text-brand-600"
                : "text-gray-900",
            ),
      )}
    >
      <div
        className={cn(
          isSelected
            ? "-m-1 rounded-full bg-gray-900 p-1 font-semibold text-white"
            : cn("contents"),
        )}
      >
        {formattedDate}
      </div>
    </div>
  );
}

type CalendarButtonProps = AriaButtonProps<"button"> & {
  className?: string;
};

function CalendarButton({ className, ...props }: CalendarButtonProps) {
  const ref = useRef(null);
  const { buttonProps } = useButton(props, ref);
  const { children } = props;

  return (
    <button
      {...buttonProps}
      ref={ref}
      className={cn(
        "-m1.5 cursor-pointer rounded-md p-1.5 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-500",
        className,
      )}
    >
      {children}
    </button>
  );
}
