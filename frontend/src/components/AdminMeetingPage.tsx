import React, { useEffect, useState } from "react";
import axios from "axios";
import AvailabilityResponsesTable from "./AvailabilityResponsesTable";

interface TimeOption {
  id: number;
  start_time: string;
  end_time: string;
}

interface TimeOptionSummary {
  id: number;
  start_time: string;
  end_time: string;
  available_count: number;
}

interface AvailabilityResponse {
  id: number;
  participant_name: string;
  email: string;
  role: string;
  entries: {
    time_option: TimeOption;
  }[];
}

interface StudentProfessionalPair {
  id: number;
  student: AvailabilityResponse;
  professional: AvailabilityResponse;
  time_option: TimeOption;
  created_at: string;
}

interface MeetingData {
  id: string;
  name: string;
}

const AdminMeetingPage: React.FC = () => {
  const pathParts = window.location.pathname.split("/").filter(Boolean);
  const meetingId =
    pathParts.length === 2 && pathParts[0] === "admin" ? pathParts[1] : null;

  const [meetingData, setMeetingData] = useState<MeetingData | null>(null);
  const [timeOptions, setTimeOptions] = useState<TimeOptionSummary[]>([]);
  const [responses, setResponses] = useState<AvailabilityResponse[]>([]);
  const [pairs, setPairs] = useState<StudentProfessionalPair[]>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (!meetingId) {
      setError(
        "This is the error from AdminMeetingPage.tsx. Invalid meeting ID."
      );
      return;
    }

    const fetchMeetingData = async () => {
      try {
        const [meetingRes, timeOptionsRes, responsesRes, pairsRes] =
          await Promise.all([
            axios.get<MeetingData>(
              `${import.meta.env.VITE_API_URL}meetings/${meetingId}/`
            ),
            axios.get<TimeOptionSummary[]>(
              `${
                import.meta.env.VITE_API_URL
              }meetings/${meetingId}/availability-summary/`
            ),
            axios.get<AvailabilityResponse[]>(
              `${
                import.meta.env.VITE_API_URL
              }meetings/${meetingId}/availability-responses/`
            ),
            axios.get<StudentProfessionalPair[]>(
              `${import.meta.env.VITE_API_URL}meetings/${meetingId}/pairs/`
            ),
          ]);

        setMeetingData(meetingRes.data);
        setTimeOptions(timeOptionsRes.data);
        setResponses(responsesRes.data);
        setPairs(pairsRes.data);
      } catch (err) {
        setError(
          "This is an error from AdminMeetingPage.tsx. Invalid meeting ID or failed to fetch data."
        );
      }
    };

    fetchMeetingData();
  }, [meetingId]);

  if (error) return <div>Error: {error}</div>;
  if (!meetingData) return <div>Loading...</div>;

  return (
    <div style={{ padding: "1rem", fontFamily: "Arial, sans-serif" }}>
      <h1>{meetingData.name}</h1>

      <h2>Time Options Summary</h2>
      {timeOptions.length === 0 ? (
        <p>No time options available.</p>
      ) : (
        <table
          style={{
            borderCollapse: "collapse",
            width: "100%",
            marginBottom: "2rem",
          }}
        >
          <thead>
            <tr>
              <th style={tableHeaderStyle}>Start Time</th>
              <th style={tableHeaderStyle}>End Time</th>
              <th style={tableHeaderStyle}>Available Count</th>
            </tr>
          </thead>
          <tbody>
            {[...timeOptions]
              .sort(
                (a, b) =>
                  new Date(a.start_time).getTime() -
                  new Date(b.start_time).getTime()
              )
              .map((option) => (
                <tr key={option.id}>
                  <td style={tableCellStyle}>
                    {new Date(option.start_time).toLocaleString()}
                  </td>
                  <td style={tableCellStyle}>
                    {new Date(option.end_time).toLocaleString()}
                  </td>
                  <td style={tableCellStyle}>{option.available_count}</td>
                </tr>
              ))}
          </tbody>
        </table>
      )}

      <h2>Availability Responses</h2>
      {responses.length === 0 ? (
        <p>No responses yet.</p>
      ) : (
        <AvailabilityResponsesTable responses={responses} meetingId={""} />
      )}
    </div>
  );
};

const tableHeaderStyle: React.CSSProperties = {
  borderBottom: "2px solid #ccc",
  textAlign: "left",
  padding: "8px",
  backgroundColor: "#f5f5f5",
};

const tableCellStyle: React.CSSProperties = {
  borderBottom: "1px solid #ddd",
  padding: "8px",
};

export default AdminMeetingPage;
