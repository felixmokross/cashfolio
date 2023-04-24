import type { CalendarDate } from "@internationalized/date";
import { createCalendar, getWeeksInMonth } from "@internationalized/date";
import { useRef } from "react";
import type { CalendarProps, DateValue } from "react-aria";
import {
  useCalendar,
  useCalendarCell,
  useCalendarGrid,
  useLocale,
} from "react-aria";
import type { CalendarState } from "react-stately";
import { useCalendarState } from "react-stately";
import { DatePickerButton } from "./common";
import { cn } from "../../classnames";

export function Calendar(props: CalendarProps<DateValue>) {
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
        <DatePickerButton {...prevButtonProps} className="px-4">
          &lt;
        </DatePickerButton>
        <h2 className="text-sm font-medium text-slate-700">{title}</h2>
        <DatePickerButton {...nextButtonProps} className="px-4">
          &gt;
        </DatePickerButton>
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
        {[...new Array(Math.max(weeksInMonth, 6)).keys()].map((weekIndex) => (
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
        className={cn(
          `px-2 text-center ${isSelected ? "bg-sky-100" : ""} ${
            isDisabled ? "disabled" : ""
          } ${isUnavailable ? "unavailable" : ""}`,
          isOutsideVisibleRange && "cursor-default"
        )}
      >
        {isOutsideVisibleRange ? <>&nbsp;</> : formattedDate}
      </div>
    </td>
  );
}
