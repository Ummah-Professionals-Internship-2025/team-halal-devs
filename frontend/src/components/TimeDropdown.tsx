import React from "react";
import "./TimeDropdown.css";

interface TimeDropdownProps {
  dates: { id: number; label: string }[];
  times: string[];
  onChange: (dateId: number, field: "from" | "to", value: string) => void;
  values: { [key: number]: { from: string; to: string } };
  onPrevious?: () => void;
  onNext?: () => void;
}

const TimeDropdown: React.FC<TimeDropdownProps> = ({
  dates,
  times,
  onChange,
  values,
  onPrevious,
  onNext,
}) => {
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
      )}

      {/* Single navigation buttons, outside the map */}
      <div className="navigation-buttons">
        {onPrevious && (
          <button className="nav-button previous" onClick={onPrevious}>
            Previous
          </button>
        )}
        {onNext && (
          <button className="nav-button next" onClick={onNext}>
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default TimeDropdown;
