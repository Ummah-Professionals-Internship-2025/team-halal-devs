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
        setMeeting(data);
        setError(null);

        // Initialize availability state
        const initialAvailability = data.time_options.reduce(
          (acc: Record<number, boolean>, option: TimeOption) => {
            acc[option.id] = false;
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (Object.values(availability).every((isAvailable) => !isAvailable)) {
      setError("Please select at least one available time option.");
      return;
    }

    if (!name || !email) {
      setError("Name and Email are required fields.");
      return;
    }

    const selectedTimeOptionIds = Object.entries(availability)
      .filter(([_, isAvailable]) => isAvailable)
      .map(([id]) => parseInt(id));

    const payload = {
      participant_name: name,
      email,
      time_option_ids: selectedTimeOptionIds,
    };

    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_API_URL
        }meetings/${meetingId}/availability-responses/create/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Server error:", errorData);
        throw new Error("Failed to submit availability.");
      }

      alert("Availability submitted successfully!");
      setName("");
      setEmail("");
      setAvailability(
        Object.fromEntries(Object.keys(availability).map((key) => [key, false]))
      );
      setError(null);
    } catch (err) {
      console.error("Error submitting availability:", err);
      setError("Failed to submit availability.");
    }
  };

  if (loading) return <p>Loading meeting details...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;
  if (!meeting) return <p>No meeting found.</p>;

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
