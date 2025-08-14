import React, { useState } from "react";

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

interface Props {
  responses: AvailabilityResponse[];
}

type SortField = "date" | "name" | "time";

const AvailabilityResponsesTable: React.FC<Props> = ({ responses }) => {
  const [sortField, setSortField] = useState<SortField>("date");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

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
            <th style={thStyle}>Date</th>
            <th style={thStyle}>Selected Time Ranges</th>
          </tr>
        </thead>
        <tbody>
          {sortedResponses.map((resp) => {
            const firstEntryDate = resp.entries.length
              ? new Date(
                  resp.entries[0].time_option.start_time
                ).toLocaleDateString()
              : "N/A";

            return (
              <tr key={resp.id}>
                <td style={tdStyle}>{resp.participant_name}</td>
                <td style={tdStyle}>{resp.email}</td>
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
              </tr>
            );
          })}
        </tbody>
      </table>
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
