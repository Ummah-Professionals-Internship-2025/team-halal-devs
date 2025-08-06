// AdminMeetingPage.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";

interface TimeOption {
  id: number;
  start_time: string;
  end_time: string;
  available_count: number;
}

interface AvailabilityResponse {
  id: number;
  participant_name: string;
  email: string;
  entries: {
    time_option: TimeOption;
  }[];
}

interface MeetingData {
  id: string;
  name: string;
  description: string;
  time_options: Array<{
    id: string;
    start_time: string;
    end_time: string;
  }>;
}

const AdminMeetingPage: React.FC = () => {
  // Parse meetingId from URL: /admin/:meetingId
  const pathParts = window.location.pathname.split("/").filter(Boolean);
  const meetingId =
    pathParts.length === 2 && pathParts[0] === "admin" ? pathParts[1] : null;
  const [meetingData, setMeetingData] = useState<MeetingData | null>(null);
  const [timeOptions, setTimeOptions] = useState<TimeOption[]>([]);
  const [responses, setResponses] = useState<AvailabilityResponse[]>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (!meetingId) {
      setError("Invalid meeting ID.");
      return;
    }

    const fetchMeetingData = async () => {
      try {
        const [meetingRes, timeOptionsRes, responsesRes] = await Promise.all([
          axios.get<MeetingData>(
            `${import.meta.env.VITE_API_URL}meetings/${meetingId}/`
          ),
          axios.get<TimeOption[]>(
            `${
              import.meta.env.VITE_API_URL
            }meetings/${meetingId}/availability-summary/`
          ),
          axios.get<AvailabilityResponse[]>(
            `${
              import.meta.env.VITE_API_URL
            }meetings/${meetingId}/availability-responses/`
          ),
        ]);

        setMeetingData(meetingRes.data);
        setTimeOptions(timeOptionsRes.data);
        setResponses(responsesRes.data);

        

        // console.log("AdminMeetingPage rendered for meetingId:", meetingId);
        // console.log("Meeting data fetched", meetingRes.data);
        // console.log("Time options fetched", timeOptionsRes.data);
        // console.log("Responses fetched", responsesRes.data);
      } catch (err) {
        // console.error("Error fetching meeting data:", err);
        setError("Invalid meeting ID or failed to fetch data.");
      }
    };

    fetchMeetingData();
  }, [meetingId]);

  // Render loading, error, or data
  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!meetingData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{meetingData.name}</h1>
      <p>{meetingData.description}</p>
      <h2>Time Options Summary</h2>
      <ul>
        {timeOptions.map((option) => (
          <li key={option.id}>
            {option.start_time} - {option.end_time}: {option.available_count}{" "}
            available
          </li>
        ))}
      </ul>

      <h2>Availability Responses</h2>
      {responses.length === 0 ? (
        <p>No responses yet.</p>
      ) : (
        <ul>
          {responses.map((response) => (
            <li key={response.participant_name}>
              <strong>{response.participant_name}</strong> ({response.email})
              <ul>
                {response.entries.map((entry, idx) => (
                  <li key={idx}>
                    Time Option: {entry.time_option.start_time} -{" "}
                    {entry.time_option.end_time}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AdminMeetingPage;