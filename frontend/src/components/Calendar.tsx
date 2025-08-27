import "./Calendar.css";
import * as React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";

import { PickersDay } from "@mui/x-date-pickers/PickersDay";
import type { PickersDayProps } from "@mui/x-date-pickers/PickersDay";
import dayjs, { Dayjs } from "dayjs";

interface CalendarProps {
  selectedDates?: string[];
  onDateChange?: (dates: string[]) => void;
}

// Custom day component for multi-select functionality
function CustomDay(
  props: PickersDayProps & {
    selectedDates?: string[];
    onDateClick?: (date: Dayjs) => void;
  }
) {
  const { day, selectedDates = [], onDateClick, ...other } = props;
  const dateString = day.format("YYYY-MM-DD");
  const isSelected = selectedDates.includes(dateString);
  const isDisabled = day.isBefore(dayjs(), "day"); // Disable past dates

  return (
    <PickersDay
      {...other}
      day={day}
      disabled={isDisabled}
      onClick={() => !isDisabled && onDateClick?.(day)}
      sx={{
        backgroundColor: isSelected ? "#4DA3C1 !important" : "transparent",
        color: isDisabled
          ? "#ccc !important"
          : isSelected
          ? "#ffffff !important"
          : "#000000 !important",
        border: isSelected ? "2px solid #4DA3C1 !important" : "none",
        borderRadius: "50% !important",
        width: "42px !important",
        height: "42px !important",
        minWidth: "42px !important",
        margin: "2px !important",
        fontFamily: "Poppins, sans-serif !important",
        fontSize: "1rem !important",
        cursor: isDisabled ? "not-allowed !important" : "pointer",
        opacity: isDisabled ? "0.3 !important" : "1",
        transition: "all 0.2s ease",
        "&:hover": {
          backgroundColor: isDisabled
            ? "transparent !important"
            : isSelected
            ? "#4DA3C1 !important"
            : "rgba(77, 163, 193, 0.1) !important",
        },
        "&:focus": {
          backgroundColor: isDisabled
            ? "transparent !important"
            : isSelected
            ? "#4DA3C1 !important"
            : "rgba(77, 163, 193, 0.1) !important",
        },
      }}
    />
  );
}

export default function Calendar({
  selectedDates = [],
  onDateChange,
}: CalendarProps) {
  const [internalSelectedDates, setInternalSelectedDates] =
    React.useState<string[]>(selectedDates);

  // Update internal state when props change
  React.useEffect(() => {
    setInternalSelectedDates(selectedDates);
  }, [selectedDates]);

  const handleDateClick = (date: Dayjs) => {
    // Don't allow selection of past dates
    if (date.isBefore(dayjs(), "day")) {
      return;
    }

    const dateString = date.format("YYYY-MM-DD");

    let newSelectedDates;
    if (internalSelectedDates.includes(dateString)) {
      // Remove date if already selected
      newSelectedDates = internalSelectedDates.filter((d) => d !== dateString);
    } else {
      // Add date if not selected
      newSelectedDates = [...internalSelectedDates, dateString];
    }

    setInternalSelectedDates(newSelectedDates);
    onDateChange?.(newSelectedDates);
  };

  // Check if any dates are selected to conditionally show asterisk
  const hasDatesSelected = internalSelectedDates.length > 0;


  return (
    <div className="calendar-container">
      <h3 className="meeting-page-title">
        What days are you available to meet?{" "}
        {!hasDatesSelected && <span className="required">*</span>}
      </h3>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar
          value={selectedDay}
          onChange={(date) =>
            onDateChange(date ? date.format("YYYY-MM-DD") : "")
          }
          dayOfWeekFormatter={(day) => day.format("ddd").toUpperCase()}
          className="custom-calendar"
          views={["day"]}
          value={null}
          onChange={() => {}}
          sx={{
            width: "100%",

            maxWidth: "650px",
            margin: "0 auto",
            height: "auto",
            minHeight: "350px",
          }}
          slots={{
            day: CustomDay,
          }}
          slotProps={{
            day: {
              selectedDates: internalSelectedDates,
              onDateClick: handleDateClick,
            } as any,

          }}
        />
      </LocalizationProvider>
    </div>
  );
}
