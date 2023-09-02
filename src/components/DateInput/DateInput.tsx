import React, { ReactNode, useMemo } from "react";
import { ArrowDownIcon } from "../svg/icons";
import { useCalendar } from "./useCalendar";
import { generateMonthDays, monthDaysGaps } from "./utils";
import { mod } from "@/utils";
import { assert } from "console";

type DateInputProps = {
  placeholder?: string;
  min?: Date;
  max?: Date;
  value: Date | undefined;
  onChange: (newValue: Date) => void;
};

const daysOfWeek = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"] as const;
const engDaysOfWeek = [
  "sun",
  "mon",
  "tue",
  "wed",
  "thu",
  "fri",
  "sat",
] as const;

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const;

const dateToString = (date: Date) =>
  date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

export const DateInput = ({
  placeholder,
  min,
  max,
  value,
  onChange,
}: DateInputProps) => {
  const valueAsString = useMemo(
    () => (value ? dateToString(value) : value),
    [value]
  );
  const {
    startAndEndOfMonth,
    isCalendarOpen,
    setIsCalendarOpen,
    monthPage,
    setMonthPage,
    yearPage,
    setYearPage,
  } = useCalendar();

  const toggleIsCalendarOpen = () => setIsCalendarOpen((prev) => !prev);

  const calendarCells = useMemo(() => {
    const [startDate, endDate] = startAndEndOfMonth;
    const dayOfWeekStart = startDate.getDay();

    const cells: ReactNode[] = [];

    for (let i = 0; i < mod(dayOfWeekStart - 1, 7); i++) {
      cells.push(
        <div key={`startGap-${i}`} className="calendar__day-container"></div>
      );
    }
    for (let i = startDate.getDate(); i <= endDate.getDate(); i++) {
      const handleSelect = () => {
        const copyCurrentMonthDate = new Date(startDate);
        copyCurrentMonthDate.setDate(i);
        onChange(copyCurrentMonthDate);
      };

      const isSelected =
        value?.getDate() === i &&
        value?.getFullYear() === yearPage &&
        value?.getMonth() === monthPage;

      cells.push(
        <div
          key={`day-${i}`}
          className={`calendar__day-container calendar__days-of-month ${
            isSelected ? "calendar__days-of-month--selected" : ""
          }`}
          onClick={handleSelect}
        >
          <span className="calendar__day">{i}</span>
        </div>
      );
    }

    return cells;
  }, [startAndEndOfMonth, value]);

  const incrementMonth = () => {
    if (monthPage === 11) {
      setMonthPage(0);
      setYearPage((prevYearPage) => prevYearPage + 1);
    } else setMonthPage((prevMonthPage) => prevMonthPage + 1);
  };

  const decrementMonth = () => {
    if (monthPage === 0) {
      setMonthPage(11);
      setYearPage((prevYearPage) => prevYearPage - 1);
    } else setMonthPage((prevMonthPage) => prevMonthPage - 1);
  };

  return (
    <div className="date-input">
      <div className="date-input__data" onClick={toggleIsCalendarOpen}>
        {valueAsString && (
          <span className="date-input__value">{valueAsString}</span>
        )}
        {!valueAsString && placeholder && (
          <span className="date-input__placeholder">{placeholder}</span>
        )}
        <ArrowDownIcon
          className={`date-input__arrow-down ${
            isCalendarOpen ? "date-input__arrow-down--rotate" : ""
          }`}
        />
      </div>
      <div
        className={`calendar date-input__calendar ${
          isCalendarOpen ? "date-input__calendar--open" : ""
        }`}
      >
        <div className="calendar__selected-date">
          <div
            className={`calendar__selected-year ${
              !value ? "calendar__selected-year--not-selected" : ""
            }`}
          >
            {value ? value.getFullYear() : yearPage}
          </div>
          {value && (
            <div className="calendar__selected-day-month">
              {daysOfWeek[mod(value.getDay() - 1, 7)].slice(0, 3)},{" "}
              {months[value.getMonth()].slice(0, 3)}
            </div>
          )}
        </div>
        <div className="calendar__controllers">
          <ArrowDownIcon
            className="calendar__arrow calendar__arrow--left"
            onClick={decrementMonth}
          />
          <div className="calendar__date-page">
            {months[monthPage]} {yearPage}
          </div>
          <ArrowDownIcon
            className="calendar__arrow calendar__arrow--right"
            onClick={incrementMonth}
          />
        </div>
        <div className="calendar__days">
          {daysOfWeek.map((dayOfWeek) => (
            <div
              key={dayOfWeek}
              className="calendar__day-container calendar__days-of-week"
            >
              {dayOfWeek.slice(0, 2)}
            </div>
          ))}
          {calendarCells}
        </div>
      </div>
    </div>
  );
};
