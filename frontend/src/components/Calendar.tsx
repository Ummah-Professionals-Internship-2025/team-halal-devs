import "./Calendar.css";
import * as React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";

export default function Calendar() {
  return (
    <div className="calendar-container">
      <h3 className="meeting-page-title">
        What days are you available to meet? <span className="required">*</span>
      </h3>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar
          dayOfWeekFormatter={(day) => day.format("ddd").toUpperCase()}
          className="custom-calendar"
          views={["day"]}
          sx={{
            width: "100%",
            maxWidth: "650px",
            margin: "0 auto",
            height: "auto", // Let CSS control the height
            minHeight: "350px", // Ensure enough space for all rows
            // Remove inline styles that conflict with CSS
          }}
        />
      </LocalizationProvider>
    </div>
  );
}
