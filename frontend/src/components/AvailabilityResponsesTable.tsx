import React, { useState } from "react";
import axios from "axios";

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

interface Props {
  responses: AvailabilityResponse[];
  meetingId?: string;
}
// interface TimeOption {
//   id: number;
//   start_time: string;
//   end_time: string;
// }

// interface AvailabilityEntry {
//   time_option: TimeOption;
// }

// interface AvailabilityResponse {
//   id: number;
//   participant_name: string;
//   email: string;
//   entries: AvailabilityEntry[];
// }

interface StudentProfessionalPair {
  id: number;
  student: AvailabilityResponse;
  professional: AvailabilityResponse;
  time_option: TimeOption;
  created_at: string;
}

interface Props {
  responses: AvailabilityResponse[];
  pairs: StudentProfessionalPair[];
  meetingId: string | null;
  onPairUpdate: (updatedPairs: StudentProfessionalPair[]) => void;
}

type SortField = "date" | "name" | "time";

const AvailabilityResponsesTable: React.FC<Props> = ({
  responses,
  pairs,
  meetingId,
  onPairUpdate,
}) => {
  const [sortField, setSortField] = useState<SortField>("date");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [isCreatingPair, setIsCreatingPair] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<number | null>(null);
  const [selectedProfessional, setSelectedProfessional] = useState<
    number | null
  >(null);
  const [selectedTimeOption, setSelectedTimeOption] = useState<number | null>(
    null
  );

  // Helper functions
  const students = responses.filter((r) => r.role === "student");
  const professionals = responses.filter((r) => r.role === "professional");

  const getPairForResponse = (responseId: number) => {
    return pairs.find(
      (pair) =>
        pair.student.id === responseId || pair.professional.id === responseId
    );
  };

  const createPair = async () => {
    if (
      !selectedStudent ||
      !selectedProfessional ||
      !selectedTimeOption ||
      !meetingId
    ) {
      alert("Please select a student, professional, and time option.");
      return;
    }

    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}meetings/${meetingId}/pairs/create/`,
        {
          student_id: selectedStudent,
          professional_id: selectedProfessional,
          time_option_id: selectedTimeOption,
        }
      );

      // Refresh pairs data
      const pairsRes = await axios.get(
        `${import.meta.env.VITE_API_URL}meetings/${meetingId}/pairs/`
      );
      onPairUpdate(pairsRes.data);

      // Reset form
      setSelectedStudent(null);
      setSelectedProfessional(null);
      setSelectedTimeOption(null);
      setIsCreatingPair(false);
    } catch (error) {
      alert(
        "Failed to create pair. Please check that both participants are available for the selected time."
      );
      console.error(error);
    }
  };

  const deletePair = async (pairId: number) => {
    if (!meetingId) return;

    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}meetings/${meetingId}/pairs/${pairId}/`
      );

      // Refresh pairs data
      const pairsRes = await axios.get(
        `${import.meta.env.VITE_API_URL}meetings/${meetingId}/pairs/`
      );
      onPairUpdate(pairsRes.data);
    } catch (error) {
      alert("Failed to delete pair.");
      console.error(error);
    }
  };

  // Get all unique time options from responses
  const allTimeOptions = responses
    .flatMap((r) => r.entries.map((e) => e.time_option))
    .filter(
      (option, index, arr) => arr.findIndex((o) => o.id === option.id) === index
    );

  const sortOptions: { label: string; value: SortField }[] = [
    { label: "Date", value: "date" },
    { label: "Name", value: "name" },
    { label: "Earliest Selected Time", value: "time" },
  ];

  const sortedResponses = [...responses].sort((a, b) => {
    let comparison = 0;

    if (sortField === "name") {
      comparison = a.participant_name.localeCompare(b.participant_name);
    } else if (sortField === "time") {
      const aEarliest = Math.min(
        ...a.entries.map((e) => new Date(e.time_option.start_time).getTime())
      );
      const bEarliest = Math.min(
        ...b.entries.map((e) => new Date(e.time_option.start_time).getTime())
      );
      comparison = aEarliest - bEarliest;
    } else if (sortField === "date") {
      const aDate = a.entries.length
        ? new Date(a.entries[0].time_option.start_time).getTime()
        : 0;
      const bDate = b.entries.length
        ? new Date(b.entries[0].time_option.start_time).getTime()
        : 0;
      comparison = aDate - bDate;
    }

    return sortDirection === "asc" ? comparison : -comparison;
  });

  return (
    <div>
      {/* Sort controls */}
      <div
        style={{ display: "flex", alignItems: "center", marginBottom: "1rem" }}
      >
        <label style={{ marginRight: "0.5rem" }}>Sort By:</label>
        <select
          value={sortField}
          onChange={(e) => setSortField(e.target.value as SortField)}
          style={selectStyle}
        >
          {sortOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <select
          value={sortDirection}
          onChange={(e) => setSortDirection(e.target.value as "asc" | "desc")}
          style={{ ...selectStyle, marginLeft: "0.5rem" }}
        >
          <option value="asc">Ascending ↑</option>
          <option value="desc">Descending ↓</option>
        </select>
      </div>

      {/* Table */}
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={thStyle}>Name</th>
            <th style={thStyle}>Email</th>
            <th style={thStyle}>Role</th>
            <th style={thStyle}>Date</th>
            <th style={thStyle}>Selected Time Ranges</th>
            <th style={thStyle}>Paired With</th>
            <th style={thStyle}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedResponses.map((resp) => {
            const firstEntryDate = resp.entries.length
              ? new Date(
                  resp.entries[0].time_option.start_time
                ).toLocaleDateString()
              : "N/A";

            const pairedWith = getPairForResponse(resp.id);

            return (
              <tr key={resp.id}>
                <td style={tdStyle}>{resp.participant_name}</td>
                <td style={tdStyle}>{resp.email}</td>
                <td style={tdStyle}>
                  <span
                    style={{
                      padding: "2px 6px",
                      borderRadius: "4px",
                      backgroundColor:
                        resp.role === "student" ? "#e3f2fd" : "#f3e5f5",
                      color: resp.role === "student" ? "#1565c0" : "#7b1fa2",
                      fontSize: "12px",
                    }}
                  >
                    {resp.role}
                  </span>
                </td>
                <td style={tdStyle}>{firstEntryDate}</td>
                <td style={tdStyle}>
                  {resp.entries.map((entry, i) => {
                    const start = new Date(entry.time_option.start_time);
                    const end = new Date(entry.time_option.end_time);
                    const timeRange = `${start.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })} – ${end.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}`;
                    return <div key={i}>{timeRange}</div>;
                  })}
                </td>
                <td style={tdStyle}>
                  {pairedWith ? (
                    <div>
                      <div style={{ fontSize: "14px", fontWeight: "bold" }}>
                        {resp.role === "student"
                          ? pairedWith.professional.participant_name
                          : pairedWith.student.participant_name}
                      </div>
                      <div style={{ fontSize: "12px", color: "#666" }}>
                        {new Date(
                          pairedWith.time_option.start_time
                        ).toLocaleString()}
                      </div>
                    </div>
                  ) : (
                    <span style={{ color: "#999", fontStyle: "italic" }}>
                      Not paired
                    </span>
                  )}
                </td>
                <td style={tdStyle}>
                  {pairedWith && (
                    <button
                      onClick={() => deletePair(pairedWith.id)}
                      style={{
                        padding: "4px 8px",
                        backgroundColor: "#f44336",
                        color: "white",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                        fontSize: "12px",
                      }}
                    >
                      Remove Pair
                    </button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Pair Creation Section */}
      <div
        style={{
          marginTop: "2rem",
          padding: "1rem",
          backgroundColor: "#f5f5f5",
          borderRadius: "8px",
        }}
      >
        <h3>Create New Pair</h3>
        {!isCreatingPair ? (
          <button
            onClick={() => setIsCreatingPair(true)}
            style={{
              padding: "8px 16px",
              backgroundColor: "#4caf50",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            + Create New Pair
          </button>
        ) : (
          <div
            style={{
              display: "flex",
              gap: "1rem",
              alignItems: "end",
              flexWrap: "wrap",
            }}
          >
            <div>
              <label
                style={{
                  display: "block",
                  marginBottom: "4px",
                  fontSize: "14px",
                }}
              >
                Student:
              </label>
              <select
                value={selectedStudent || ""}
                onChange={(e) =>
                  setSelectedStudent(
                    e.target.value ? parseInt(e.target.value) : null
                  )
                }
                style={selectStyle}
              >
                <option value="">Select Student</option>
                {students.map((student) => (
                  <option key={student.id} value={student.id}>
                    {student.participant_name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                style={{
                  display: "block",
                  marginBottom: "4px",
                  fontSize: "14px",
                }}
              >
                Professional:
              </label>
              <select
                value={selectedProfessional || ""}
                onChange={(e) =>
                  setSelectedProfessional(
                    e.target.value ? parseInt(e.target.value) : null
                  )
                }
                style={selectStyle}
              >
                <option value="">Select Professional</option>
                {professionals.map((professional) => (
                  <option key={professional.id} value={professional.id}>
                    {professional.participant_name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                style={{
                  display: "block",
                  marginBottom: "4px",
                  fontSize: "14px",
                }}
              >
                Time Option:
              </label>
              <select
                value={selectedTimeOption || ""}
                onChange={(e) =>
                  setSelectedTimeOption(
                    e.target.value ? parseInt(e.target.value) : null
                  )
                }
                style={selectStyle}
              >
                <option value="">Select Time</option>
                {allTimeOptions.map((option) => (
                  <option key={option.id} value={option.id}>
                    {new Date(option.start_time).toLocaleString()} -{" "}
                    {new Date(option.end_time).toLocaleString()}
                  </option>
                ))}
              </select>
            </div>

            <div style={{ display: "flex", gap: "8px" }}>
              <button
                onClick={createPair}
                style={{
                  padding: "8px 16px",
                  backgroundColor: "#4caf50",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Create Pair
              </button>
              <button
                onClick={() => {
                  setIsCreatingPair(false);
                  setSelectedStudent(null);
                  setSelectedProfessional(null);
                  setSelectedTimeOption(null);
                }}
                style={{
                  padding: "8px 16px",
                  backgroundColor: "#757575",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

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

const selectStyle: React.CSSProperties = {
  padding: "6px 8px",
  borderRadius: "4px",
  border: "1px solid #ccc",
  fontSize: "14px",
};

export default AvailabilityResponsesTable;
