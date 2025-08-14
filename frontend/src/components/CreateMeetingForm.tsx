import { useState } from "react";
import React from "react";
import MeetingDetails from "./MeetingDetails";
import "./MeetingAvailability.css";

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
  const meetingIdFromLink = shareableLink?.split("/").pop() || "";

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);

    for (const option of timeOptions) {
      if (option.end <= option.start) {
        setStatus("End time must be after start time for all time options.");
        return;
      }
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}meetings/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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
        setShareableLink(data.shareable_link);
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
    <div className="meeting-page">
      {status === "Meeting created!" ? (
        <div>
          <h3>Thank you!</h3>
          <p>Your meeting has been created.</p>
          {shareableLink && (
            <div>
              <p>Shareable Link:</p>
              <a href={shareableLink} target="_blank" rel="noopener noreferrer">
                {shareableLink}
              </a>
            </div>
          )}
          {meetingIdFromLink && (
            <MeetingDetails meetingId={meetingIdFromLink} />
          )}
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <h3 className="meeting-page-title">Career Services Applicants</h3>

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
                  onChange={(e) =>
                    handleTimeChange(index, "end", e.target.value)
                  }
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

          <br />
          <button type="submit">Create</button>
          {status && <div>{status}</div>}
        </form>
      )}
    </div>
  );
};

export default CreateMeetingForm;
