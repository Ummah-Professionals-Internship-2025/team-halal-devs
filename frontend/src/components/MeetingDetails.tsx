import React, { useEffect, useState } from "react";

type TimeOption = {
  id: number;
  start_time: string;
  end_time: string;
};

type Meeting = {
  name: string;
  time_options: TimeOption[];
};

interface MeetingDetailsProps {
  meetingId: string;
}

const MeetingDetails: React.FC<MeetingDetailsProps> = ({ meetingId }) => {
  const [meeting, setMeeting] = useState<Meeting | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!meetingId) return;

    setLoading(true);
    fetch(`${import.meta.env.VITE_API_URL}meetings/${meetingId}/`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(
            "This is the error message from MeetingDetails.tsx. Meeting not found"
          );
        }
        return res.json();
      })
      .then((data) => {
        setMeeting(data);
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
        setMeeting(null);
      })
      .finally(() => setLoading(false));
  }, [meetingId]);

  if (loading) return <p>Loading meeting details...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;
  if (!meeting) return null;

  return (
    <div>
      <p>
        <strong>Meeting Details</strong>
      </p>
      <p>
        <strong>Title:</strong> {meeting.name}
      </p>

      <p>
        <strong>Selected Time Options:</strong>
      </p>
      <ul>
        {meeting.time_options.map((option) => (
          <li key={option.id}>
            {new Date(option.start_time).toLocaleString()} -{" "}
            {new Date(option.end_time).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MeetingDetails;
