import { useState } from "react";

type TimeOption = {
  start: string;
  end: string;
};

const CreateMeetingForm = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [meetingDate, setMeetingDate] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [timeOptions, setTimeOptions] = useState<TimeOption[]>([
    { start: "", end: "" },
  ]);

  const handleAddTimeOption = () => {
    setTimeOptions([...timeOptions, { start: "", end: "" }]);
  };

  const handleTimeChange = (
    index: number,
    field: "start" | "end",
    value: string
  ) => {
    const updatedOptions = [...timeOptions];
    updatedOptions[index][field] = value;
    setTimeOptions(updatedOptions);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}meetings/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          description,
          meetingDate,
          timeOptions,
        }),
        credentials: "include",
      });
      if (res.ok) {
        setStatus("Meeting created!");
        setName("");
        setDescription("");
        setMeetingDate("");
        setTimeOptions([{ start: "", end: "" }]);
      } else {
        setStatus("Error creating meeting.");
      }
    } catch {
      setStatus("Network error.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Create Meeting</h3>

      <label>
        Title:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </label>

      <br />

      <label>
        Date:
        <input
          type="date"
          value={meetingDate}
          onChange={(e) => setMeetingDate(e.target.value)}
          required
        />
      </label>

      <br />

      <label>
        Description:
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </label>

      <br />
      <h4>Time Options:</h4>
      {timeOptions.map((option, index) => (
        <div key={index}>
          <label>
            Start Time:
            <input
              type="time"
              value={option.start}
              onChange={(e) => handleTimeChange(index, "start", e.target.value)}
              required
            />
          </label>
          <label>
            End Time:
            <input
              type="time"
              value={option.end}
              onChange={(e) => handleTimeChange(index, "end", e.target.value)}
              required
            />
          </label>
        </div>
      ))}
      <button type="button" onClick={handleAddTimeOption}>
        + Add Time Option
      </button>

      <br />
      <button type="submit">Create</button>
      {status && <div>{status}</div>}
    </form>
  );
};

export default CreateMeetingForm;
