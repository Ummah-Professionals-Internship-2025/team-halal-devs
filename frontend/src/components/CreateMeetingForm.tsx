import { useState } from "react";

const CreateMeetingForm = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [meetingDate, setMeetingDate] = useState("");
  const [meetingTitle, setMeetingTitle] = useState("");
  const [status, setStatus] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}meetings/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, description, meetingDate, meetingTitle }),
        credentials: "include",
      });
      if (res.ok) {
        setStatus("Meeting created!");
        setName("");
        setDescription("");
        setMeetingDate("");
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

      <br />

      <button type="submit">Create</button>
      {status && <div>{status}</div>}
    </form>
  );
};

export default CreateMeetingForm;
