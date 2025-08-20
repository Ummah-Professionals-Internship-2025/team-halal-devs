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
        if (!res.ok)
          throw new Error(
            "This is the error from AllResponsesPage.tsx. Failed to fetch responses"
          );
        return res.json();
      })
      .then((data: AvailabilityResponse[]) => {
        // Sort responses
        const sorted = [...data].sort(
          (a: AvailabilityResponse, b: AvailabilityResponse) => {
            // 1. Get earliest start time for each participant's response
            const aEarliest = a.entries.length
              ? new Date(
                  Math.min(
                    ...a.entries.map((entry: AvailabilityEntry) =>
                      new Date(entry.time_option.start_time).getTime()
                    )
                  )
                )
              : new Date(0);

            const bEarliest = b.entries.length
              ? new Date(
                  Math.min(
                    ...b.entries.map((entry: AvailabilityEntry) =>
                      new Date(entry.time_option.start_time).getTime()
                    )
                  )
                )
              : new Date(0);

            // Compare by earliest meeting date/time
            if (aEarliest.getTime() !== bEarliest.getTime()) {
              return aEarliest.getTime() - bEarliest.getTime();
            }

            // 2. Compare by earliest time option start time
            const aFirstTime = a.entries.length
              ? new Date(a.entries[0].time_option.start_time).getTime()
              : 0;
            const bFirstTime = b.entries.length
              ? new Date(b.entries[0].time_option.start_time).getTime()
              : 0;

            if (aFirstTime !== bFirstTime) {
              return aFirstTime - bFirstTime;
            }

            // 3. Compare by participant name
            return a.participant_name.localeCompare(b.participant_name);
          }
        );

        setResponses(sorted);
      })
      .catch((err: Error) => setError(err.message));
  }, []);

  return (
    <div style={{ padding: "1rem", fontFamily: "Arial, sans-serif" }}>
      <h1>All Availability Responses</h1>
      <p>
        <strong>Note:</strong> Responses are sorted by meeting date, time range,
        and participant name. Duplicate emails are shown as separate entries.
      </p>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {responses.length === 0 ? (
        <p>No responses yet.</p>
      ) : (
        <AvailabilityResponsesTable
          responses={responses}
          meetingId={meetingId}
        />
      )}
    </div>
  );
};

export default AllResponsesPage;
