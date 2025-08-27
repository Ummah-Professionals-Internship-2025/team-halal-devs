import React from "react";
import "./TimeDropdown.css";

interface TimeOption {
  start: string;
  end: string;
}

interface TimeDropdownProps {
  timeOptions: TimeOption[];
  onTimeChange: (updatedOptions: TimeOption[]) => void;
}

const TimeDropdown: React.FC<TimeDropdownProps> = ({
  timeOptions,
  onTimeChange,
}) => {
  const handleStartChange = (index: number, value: string) => {
    const updated = [...timeOptions];
    updated[index].start = value;
    onTimeChange(updated);
  };

  const handleEndChange = (index: number, value: string) => {
    const updated = [...timeOptions];
    updated[index].end = value;
    onTimeChange(updated);
  };

  const handleAddOption = () =>
    onTimeChange([...timeOptions, { start: "", end: "" }]);
  const handleDeleteOption = (index: number) =>
    onTimeChange(timeOptions.filter((_, i) => i !== index));

  return (
    <div className="time-dropdown-wrapper">

      <h3 className="question-title">
        What times would you like to meet? <span className="required">*</span>
      </h3>

      {dates.length === 0 ? (
        <p className="placeholder-message">
          No dates available. Please select or add a date.
        </p>
      ) : (
        <div className="time-dropdown-list">
          {dates.map((date) => (
            <div key={date.id} className="time-dropdown-item">
              <label className="date-label">{date.label}</label>

              <select
                className="time-select"
                value={values[date.id]?.from || ""}
                onChange={(e) => onChange(date.id, "from", e.target.value)}
              >
                <option value="">From</option>
                {times.map((time, idx) => (
                  <option key={idx} value={time}>
                    {time}
                  </option>
                ))}
              </select>

              <span>To</span>

              <select
                className="time-select"
                value={values[date.id]?.to || ""}
                onChange={(e) => onChange(date.id, "to", e.target.value)}
              >
                <option value="">To</option>
                {times.map((time, idx) => (
                  <option key={idx} value={time}>
                    {time}
                  </option>
                ))}
              </select>

              <span>EST</span>
            </div>
          ))}

        </div>
      ))}
      <button onClick={handleAddOption}>Add Time Slot</button>
    </div>
  );
};

export default TimeDropdown;
