import React, { useEffect, useState } from "react";

type TimeOption = {
  id: number;
  start_time: string;
  end_time: string;
};

type Meeting = {
  name: string;
  description: string;
  time_options: TimeOption[];
};

interface MeetingAvailabilityProps {
  meetingId: string;
}

const MeetingAvailability: React.FC<MeetingAvailabilityProps> = ({
  meetingId,
}) => {
  const [meeting, setMeeting] = useState<Meeting | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [availability, setAvailability] = useState<Record<number, boolean>>({});
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!meetingId) return;

    setLoading(true);
    fetch(`${import.meta.env.VITE_API_URL}meetings/${meetingId}/`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Meeting not found");
        }
        return res.json();
      })
      .then((data) => {
        console.log("Fetched meeting data:", data); // Log to check the structure
        setMeeting(data);
        setError(null);
        // Initialize availability state for each time option
        const initialAvailability = data.time_options.reduce(
          (acc: Record<number, boolean>, option: TimeOption) => {
            acc[option.id] = false; // Default to unavailable
            return acc;
          },
          {}
        );
        setAvailability(initialAvailability);
      })
      .catch((err) => {
        setError(err.message);
        setMeeting(null);
      })
      .finally(() => setLoading(false));
  }, [meetingId]);

  const handleAvailabilityChange = (timeOptionId: number) => {
    setAvailability((prev) => ({
      ...prev,
      [timeOptionId]: !prev[timeOptionId],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Check if at least one time option is selected as available
    if (Object.values(availability).every((isAvailable) => !isAvailable)) {
      setError("Please select at least one available time option.");
      return;
    }

    // Basic validation for name and email
    if (!name || !email) {
      setError("Name and Email are required fields.");
      return;
    }

    // Mock submission
    setError(null);
    alert("Form submitted successfully!");
    // Optionally, reset the form after submission
    setName("");
    setEmail("");
    setAvailability(
      Object.fromEntries(Object.keys(availability).map((key) => [key, false]))
    );
  };

  if (loading) return <p>Loading meeting details...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;
  if (!meeting) return <p>No meeting found.</p>; // Provide feedback if no meeting is found

  return (
    <div>
      <h3>{meeting.name}</h3>
      <p>{meeting.description}</p>

      <h4>Available Time Options:</h4>
      <form onSubmit={handleSubmit}>
        {meeting.time_options.map((option) => (
          <div key={option.id}>
            <label>
              <input
                type="checkbox"
                checked={availability[option.id]}
                onChange={() => handleAvailabilityChange(option.id)}
              />
              {new Date(option.start_time).toLocaleString()} -{" "}
              {new Date(option.end_time).toLocaleString()}
            </label>
            <br />
          </div>
        ))}

        <div>
          <label>
            Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
        </div>

        <div>
          <label>
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
        </div>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <button type="submit">Submit Availability</button>
      </form>
    </div>
  );
};

export default MeetingAvailability;
