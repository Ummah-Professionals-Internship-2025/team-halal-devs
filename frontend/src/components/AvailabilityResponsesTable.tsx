import React from "react";

import type { AvailabilityResponse } from "../types";

interface Props {
  responses: AvailabilityResponse[];
  meetingId: string;
}
interface TimeOption {
  id: number;
  start_time: string;
  end_time: string;
}

interface AvailabilityEntry {
  time_option: TimeOption;
}

// interface AvailabilityResponse {
//   id: number;
//   participant_name: string;
//   email: string;
//   entries: AvailabilityEntry[];
// }

interface Props {
  responses: AvailabilityResponse[];
}

const AvailabilityResponsesTable: React.FC<Props> = ({ responses }) => (
  <table style={{ width: "100%", borderCollapse: "collapse" }}>
    <thead>
      <tr>
        <th style={thStyle}>Name</th>
        <th style={thStyle}>Email</th>
        <th style={thStyle}>Selected Time Ranges</th>
      </tr>
    </thead>
    <tbody>
      {responses.map((resp, idx) => (
        <tr key={idx}>
          <td style={tdStyle}>{resp.participant_name}</td>
          <td style={tdStyle}>{resp.email}</td>
          <td style={tdStyle}>
            <ul style={{ margin: 0, paddingLeft: "1em" }}>
              {resp.entries.map((entry, i) => (
                <li key={i}>
                  {new Date(entry.time_option.start_time).toLocaleString()} -{" "}
                  {new Date(entry.time_option.end_time).toLocaleString()}
                </li>
              ))}
            </ul>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

const thStyle: React.CSSProperties = {
  borderBottom: "2px solid #ccc",
  textAlign: "left",
  padding: "8px",
  backgroundColor: "#f5f5f5",
};

const tdStyle: React.CSSProperties = {
  borderBottom: "1px solid #ddd",
  padding: "8px",
};

export default AvailabilityResponsesTable;
