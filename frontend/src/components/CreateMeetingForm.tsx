import { useState } from "react";

const CreateMeetingForm = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}meetings/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, description }),
        credentials: "include",
      });
      if (res.ok) {
        setStatus("Meeting created!");
        setName("");
        setDescription("");
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
      <br />
      <button type="submit">Create</button>
      {status && <div>{status}</div>}
    </form>
  );
};

export default CreateMeetingForm;
