import React, { useEffect, useState } from "react";
import AvailabilityResponsesTable from "./AvailabilityResponsesTable";

interface TimeOption {
  id: number;
  start_time: string;
  end_time: string;
}

interface AvailabilityEntry {
  time_option: TimeOption;
}

interface AvailabilityResponse {
  id: number;
  participant_name: string;
  email: string;
  entries: AvailabilityEntry[];
}

const AllResponsesPage: React.FC = () => {
  const [responses, setResponses] = useState<AvailabilityResponse[]>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}availability-responses/all/`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch responses");
        return res.json();
      })
      .then(setResponses)
      .catch((err) => setError(err.message));
  }, []);

  return (
    <div style={{ padding: "1rem", fontFamily: "Arial, sans-serif" }}>
      <h1>All Availability Responses</h1>
      <p>
        <strong>Note:</strong> Each row shows a participant's name, email, and
        their selected time ranges. Duplicate emails are shown as separate
        entries.
      </p>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {responses.length === 0 ? (
        <p>No responses yet.</p>
      ) : (
        <AvailabilityResponsesTable responses={responses} />
      )}
    </div>
  );
};

export default AllResponsesPage;
