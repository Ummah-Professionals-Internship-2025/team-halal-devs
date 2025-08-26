import React from "react";
import "./TimeSelection.css";

interface TimeSelectionProps {
  selectedDates: string[];
  timeValues: { [date: string]: string };
  onTimeChange: (date: string, value: string) => void;
}

const timeOptions = [
  "9:00 AM",
  "9:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "12:00 PM",
  "12:30 PM",
  "1:00 PM",
  "1:30 PM",
  "2:00 PM",
  "2:30 PM",
  "3:00 PM",
  "3:30 PM",
  "4:00 PM",
  "4:30 PM",
  "5:00 PM",
];

const TimeSelection: React.FC<TimeSelectionProps> = ({
  selectedDates,
  timeValues,
  onTimeChange,
}) => {
  if (selectedDates.length === 0) {
    return null;
  }

  const formatDateDisplay = (dateString: string) => {
    // Split the date string and create date in local timezone
    const [year, month, day] = dateString.split("-").map(Number);
    const date = new Date(year, month - 1, day); // month is 0-indexed

    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
    });
  };

  // Check if all dates have time selected
  const hasAllTimesSelected = selectedDates.every((date) => timeValues[date]);

  return (
    <div className="time-selection-container">
      <h3 className="time-selection-title">
        What times would you like to meet?{" "}
        {!hasAllTimesSelected && <span className="required">*</span>}
      </h3>

      <div className="time-selection-list">
        {selectedDates.map((date) => (
          <div key={date} className="time-selection-item">
            <label className="date-label">{formatDateDisplay(date)}</label>

            <div className="time-inputs">
              <select
                className="time-select"
                value={timeValues[date] || ""}
                onChange={(e) => onTimeChange(date, e.target.value)}
              >
                <option value="">Select time</option>
                {timeOptions.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>

              <span className="timezone-label">EST</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TimeSelection;
