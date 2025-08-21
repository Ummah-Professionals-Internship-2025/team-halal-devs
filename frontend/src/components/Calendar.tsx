import "./Calendar.css";
import * as React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";

// const steps = ["Select Date", "Enter Info", "Confirm"];
// Track the current step (state)
// const [currentStep, setCurrentStep] = React.useState(steps[0]);

export default function BasicDateCalendar() {
  //   const steps = ["Select Date", "Enter Info", "Confirm"];
  //   const [currentStep, setCurrentStep] = React.useState(steps[0]);
  return (
    <div>
      <div className="info-form">
        <h3 className="meeting-page-title">Career Services Applicants</h3>
        {/* <div className="progress-bar">
          {steps.map((step) => (
            <div
              key={step}
              className={`progress-step ${
                currentStep === step ? "active" : ""
              }`}
            >
              {step}
            </div> */}
      </div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar />
      </LocalizationProvider>
    </div>
  );
}
