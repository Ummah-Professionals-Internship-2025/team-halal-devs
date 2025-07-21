import { useState } from "react";

<<<<<<< HEAD
type TimeOption = {
  start: string;
  end: string;
};

const CreateMeetingForm = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [meetingDate, setMeetingDate] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [shareableLink, setShareableLink] = useState<string | null>(null);

  const [timeOptions, setTimeOptions] = useState<TimeOption[]>([
    { start: "", end: "" },
  ]);

  const handleAddTimeOption = () => {
    setTimeOptions([...timeOptions, { start: "", end: "" }]);
  };

  const handleDeleteTimeOption = (index: number) => {
    setTimeOptions((prev) => prev.filter((_, i) => i !== index));
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
=======
const CreateMeetingForm = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<string | null>(null);
>>>>>>> 788f58f (Creating a form in front-end that takes input for meeting requests and connects to backend api)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);
<<<<<<< HEAD
    // Validate time options
    for (const option of timeOptions) {
      if (option.end <= option.start) {
        setStatus("End time must be after start time for all time options.");
        return;
      }
    }
=======
>>>>>>> 788f58f (Creating a form in front-end that takes input for meeting requests and connects to backend api)
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}meetings/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
<<<<<<< HEAD
        credentials: "include",
        body: JSON.stringify({
          name,
          description,
          meetingDate,
          time_options: timeOptions.map((option) => ({
            start_time: `${meetingDate}T${option.start}:00Z`,
            end_time: `${meetingDate}T${option.end}:00Z`,
          })),
        }),
      });
      if (res.ok) {
        const data = await res.json();
        setStatus("Meeting created!");
        setShareableLink(data.shareable_link); // ✅ Store the link
        setName("");
        setDescription("");
        setMeetingDate("");
        setTimeOptions([{ start: "", end: "" }]);
=======
        body: JSON.stringify({ name, description }),
        credentials: "include",
      });
      if (res.ok) {
        setStatus("Meeting created!");
        setName("");
        setDescription("");
>>>>>>> 788f58f (Creating a form in front-end that takes input for meeting requests and connects to backend api)
      } else {
        setStatus("Error creating meeting.");
      }
    } catch {
      setStatus("Network error.");
    }
  };

  return (
<<<<<<< HEAD
    <form onSubmit={handleSubmit}>
      <h3>Create Meeting</h3>
<<<<<<< HEAD
=======
    <div>
      <form onSubmit={handleSubmit}>
        <h3>Create Meeting</h3>
>>>>>>> 234a899 (added remove button, fixed css)

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
                onChange={(e) =>
                  handleTimeChange(index, "start", e.target.value)
                }
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
            {timeOptions.length > 1 && (
              <button
                type="button"
                className="btn btn-outline-danger btn-sm"
                onClick={() => handleDeleteTimeOption(index)}
                style={{
                  marginLeft: "0.2rem",
                  width: "20px",
                  height: "20px",
                  borderRadius: "50%",
                  padding: 0,
                  lineHeight: "1px",
                }}
              >
                x
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          className="btn btn-outline-info"
          onClick={handleAddTimeOption}
        >
          + Add Time Option
        </button>

        {shareableLink && (
          <div>
            <p>Shareable Link:</p>
            <a href={shareableLink} target="_blank" rel="noopener noreferrer">
              {shareableLink}
            </a>
          </div>
        )}

<<<<<<< HEAD
=======
      <input
        type="text"
        placeholder="Meeting Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <br />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
>>>>>>> 788f58f (Creating a form in front-end that takes input for meeting requests and connects to backend api)
      <br />
      <button type="submit">Create</button>
      {status && <div>{status}</div>}
    </form>
=======
        <br />
        <button type="submit" className="btn btn-success">
          Create Meeting
        </button>
        {status && <div>{status}</div>}
      </form>
    </div>
>>>>>>> 234a899 (added remove button, fixed css)
  );
};

export default CreateMeetingForm;
