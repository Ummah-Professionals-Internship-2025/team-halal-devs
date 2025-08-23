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
            "& .MuiPickersCalendarHeader-label": {
              fontWeight: 600,
              fontSize: "1.3rem",
              marginBottom: "0.5rem",
            },
            "& .MuiPickersCalendarHeader-root": {
              justifyContent: "center",
            },
            "& .MuiPickersDay-root": {
              fontWeight: 500,
              fontSize: "1.1rem",
              color: "#007ca6",
              borderRadius: "50%",
              width: "40px",
              height: "40px",
              margin: "2px",
            },
            "& .Mui-selected": {
              backgroundColor: "#207ca6 !important",
              color: "#fff !important",
            },
            "& .MuiPickersDay-dayOutsideMonth": {
              opacity: 0.3,
            },
            "& .MuiPickersCalendarHeader-switchViewButton": {
              color: "#007ca6",
            },
            "& .MuiPickersCalendarHeader-iconButton": {
              color: "#007ca6",
            },
            "& .MuiPickersCalendarHeader-daysHeader": {
              backgroundColor: "#207ca6",
              color: "#fff",
              borderRadius: "6px 6px 0 0",
              fontWeight: 600,
              fontSize: "1rem",
            },
          }}
        />
      </LocalizationProvider>
    </div>
  );
}
