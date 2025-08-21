import React from "react";

interface TimeDropdownProps {
  dates: { id: number; label: string }[];
  times: string[];
  onChange: (dateId: number, value: string) => void;
  values: { [key: number]: string };
}

const TimeDropdown: React.FC<TimeDropdownProps> = ({
  dates,
  times,
  onChange,
  values,
}) => {
  return (
    <div className="time-dropdown-wrapper">
      <h3 className="question-title">
        What times would you like to meet between?{" "}
        <span className="required">*</span>
      </h3>

      <div className="time-dropdown-list">
        {dates.map((date) => (
          <div key={date.id} className="time-dropdown-item">
            <label className="date-label">{date.label}</label>
            <select
              className="time-select"
              value={values[date.id] || ""}
              onChange={(e) => onChange(date.id, e.target.value)}
            >
              <option value="">Select time here</option>
              {times.map((time, idx) => (
                <option key={idx} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>

      <div className="navigation-buttons">
        <button className="nav-button previous">← Previous</button>
        <button className="nav-button next">Next →</button>
      </div>
    </div>
  );
};

export default TimeDropdown;
