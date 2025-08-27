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
      {timeOptions.map((option, idx) => (
        <div key={idx} className="time-dropdown-item">
          <input
            type="time"
            value={option.start}
            onChange={(e) => handleStartChange(idx, e.target.value)}
          />
          <input
            type="time"
            value={option.end}
            onChange={(e) => handleEndChange(idx, e.target.value)}
          />
          <button onClick={() => handleDeleteOption(idx)}>Delete</button>
        </div>
      ))}
      <button onClick={handleAddOption}>Add Time Slot</button>
    </div>
  );
};

export default TimeDropdown;
