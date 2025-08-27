import React from "react";
import "./TimeSelection.css";

interface TimeSelectionProps {
  selectedDates: string[];
  timeValues: { [date: string]: string[] }; // Changed to array
  onTimeChange: (date: string, times: string[]) => void; // Changed signature
  totalTimeSlots?: number; // Optional prop for total count
  error?: string;
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
  totalTimeSlots = 0,
  error = "",
}) => {
  if (selectedDates.length === 0) {
    return null;
  }

  const remainingSlots = 6 - totalTimeSlots;

  const formatDateDisplay = (dateString: string) => {
    const [year, month, day] = dateString.split("-").map(Number);
    const date = new Date(year, month - 1, day);

    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
    });
  };

  // Check if each date has at least one time selected
  const hasAllTimesSelected = selectedDates.every(
    (date) => timeValues[date] && timeValues[date].length > 0
  );

  const handleTimeToggle = (date: string, time: string) => {
    const currentTimes = timeValues[date] || [];
    let newTimes: string[];

    if (currentTimes.includes(time)) {
      // Remove time if already selected
      newTimes = currentTimes.filter((t) => t !== time);
    } else {
      // Add time if not selected and under limit
      if (totalTimeSlots >= 6) {
        // alert("You can only select up to 6 time slots total across all dates.");
        return;
      }
      newTimes = [...currentTimes, time].sort((a, b) => {
        // Sort times chronologically
        const aIndex = timeOptions.indexOf(a);
        const bIndex = timeOptions.indexOf(b);
        return aIndex - bIndex;
      });
    }

    onTimeChange(date, newTimes);
  };

  const addTimeSlot = (date: string) => {
    if (totalTimeSlots >= 6) {
      // alert("You can only select up to 6 time slots total.");
      return;
    }

    const currentTimes = timeValues[date] || [];
    // Find first available time slot
    const availableTime = timeOptions.find(
      (time) => !currentTimes.includes(time)
    );

    if (availableTime) {
      const newTimes = [...currentTimes, availableTime].sort((a, b) => {
        const aIndex = timeOptions.indexOf(a);
        const bIndex = timeOptions.indexOf(b);
        return aIndex - bIndex;
      });
      onTimeChange(date, newTimes);
    }
  };

  return (
    <div className="time-selection-container">
      <h3 className="time-selection-title">
        What times would you like to meet?{" "}
        {!hasAllTimesSelected && <span className="required">*</span>}
      </h3>

      {error && <div className="time-selection-error">{error}</div>}

      {/* Slot counter */}
      <div
        style={{
          marginBottom: "1rem",
          fontSize: "14px",
          color: remainingSlots <= 2 ? "#e74c3c" : "#666",
          fontWeight: remainingSlots <= 2 ? "bold" : "normal",
        }}
      >
        {totalTimeSlots}/6 time slots selected
        {remainingSlots > 0
          ? ` (${remainingSlots} remaining)`
          : " (Maximum reached)"}
      </div>

      <div className="time-selection-list">
        {selectedDates.map((date) => {
          const dateTimes = timeValues[date] || [];
          return (
            <div key={date} className="time-selection-item">
              <label className="date-label">{formatDateDisplay(date)}</label>

              <div className="time-slots-container">
                {dateTimes.map((time, index) => (
                  <div key={index} className="time-slot">
                    <select
                      className="time-select"
                      value={time}
                      onChange={(e) => {
                        const newTimes = [...dateTimes];
                        if (e.target.value === "") {
                          // Remove this time slot
                          newTimes.splice(index, 1);
                        } else {
                          // Update this time slot
                          newTimes[index] = e.target.value;
                        }
                        onTimeChange(
                          date,
                          newTimes.sort((a, b) => {
                            const aIndex = timeOptions.indexOf(a);
                            const bIndex = timeOptions.indexOf(b);
                            return aIndex - bIndex;
                          })
                        );
                      }}
                    >
                      <option value="">Remove time</option>
                      {timeOptions.map((timeOption) => (
                        <option
                          key={timeOption}
                          value={timeOption}
                          disabled={
                            dateTimes.includes(timeOption) &&
                            timeOption !== time
                          }
                        >
                          {timeOption}
                        </option>
                      ))}
                    </select>

                    <button
                      type="button"
                      className="remove-time-btn"
                      onClick={() => {
                        const newTimes = dateTimes.filter(
                          (_, i) => i !== index
                        );
                        onTimeChange(date, newTimes);
                      }}
                      title="Remove this time slot"
                    >
                      ×
                    </button>

                    <span className="timezone-label">EST</span>
                  </div>
                ))}

                {/* Add time button */}
                {dateTimes.length < timeOptions.length &&
                  remainingSlots > 0 && (
                    <button
                      type="button"
                      className="add-time-btn"
                      onClick={() => addTimeSlot(date)}
                      disabled={totalTimeSlots >= 6}
                    >
                      + Add Time
                    </button>
                  )}
              </div>

              {dateTimes.length === 0 && (
                <div className="no-times-message">
                  <button
                    type="button"
                    className="add-time-btn primary"
                    onClick={() => addTimeSlot(date)}
                    disabled={totalTimeSlots >= 6}
                  >
                    + Select a time
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {totalTimeSlots >= 6 && (
        <div className="max-slots-warning">
          <strong>Maximum time slots reached.</strong> You can change existing
          selections or remove times to make different choices.
        </div>
      )}
    </div>
  );
};

export default TimeSelection;
