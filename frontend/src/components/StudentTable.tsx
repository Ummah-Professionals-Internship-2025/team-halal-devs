import React from "react";
import { useEffect, useState } from "react";

interface Student {
  id: number;
  name: string;
  industry: string;
  signUpDate: string;
  status: "PENDING" | "PAIRED" | "COMPLETED" | "FOLLOW-UP";
}

// functions for status, calculations - check which one. loops, switch cases, deps
// aduto generate signupdate

const StudentTable: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Student;
    direction: "asc" | "desc";
  } | null>(null);

  // Use useeffect hook to make fetch req real data from backend when available.
  // pass in the url with the backend url defined for getting any data. useeffect used for 3rd party data coming from backend.
  // also use fetchmethod (native js api). makes netweork req autom on page, can populate with react

  useEffect(() => {
    fetch("http://localhost:8000/api/admin/students/")
      .then((response) => response.json())
      .then((data) => {
        const studentsArray = Array.isArray(data)
          ? data
          : data.students || data.results || [];
        setStudents(
          studentsArray.map((s: any) => {
            // Calculate status
            let status: Student["status"] = "PENDING";
            const now = new Date();
            console.log(
              "prof_assigned:",
              s.prof_assigned,
              "meeting_completed_at:",
              s.meeting_completed_at,
              "parsed:",
              s.meeting_completed_at ? new Date(s.meeting_completed_at) : null
            );

            if (s.prof_assigned) {
              if (s.meeting_completed_at) {
                const completedDate = new Date(s.meeting_completed_at);
                const now = new Date();
                const diffDays =
                  (now.getTime() - completedDate.getTime()) /
                  (1000 * 60 * 60 * 24);

                if (diffDays >= 14) {
                  status = "FOLLOW-UP";
                } else {
                  status = "COMPLETED";
                }
              } else {
                status = "PAIRED";
              }
            } else {
              status = "PENDING";
            }
            return {
              // id: s.id,
              name: s.participant_name || s.full_name,
              industry: s.industry,
              signUpDate: s.created_at,
              status,
            };
          })
        );
      })
      .catch((error) => {
        console.error("Error fetching student data:", error);
      });
  }, []);

  // Sorting function
  const sortedStudents = React.useMemo(() => {
    if (!sortConfig) return students;
    const sorted = [...students].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key])
        return sortConfig.direction === "asc" ? -1 : 1;
      if (a[sortConfig.key] > b[sortConfig.key])
        return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
    return sorted;
  }, [students, sortConfig]);

  // Header click handler
  const handleSort = (key: keyof Student) => {
    setSortConfig((prev) => {
      if (prev && prev.key === key) {
        return { key, direction: prev.direction === "asc" ? "desc" : "asc" };
      }
      return { key, direction: "asc" };
    });
  };

  return (
    <div
      style={{
        background: "#FFFFFF",
        borderRadius: "16px",
        padding: "1.5rem",
        marginBottom: "1.5rem",
      }}
    >
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ background: "#F1F3F4" }}>
            {/* <th style={thStyle}>ID</th> */}
            <th style={thStyle}>Name</th>
            <th style={thStyle}>Industry</th>
            <th style={thStyle}>Sign Up Date</th>
            <th style={thStyle}>Status</th>
          </tr>
        </thead>
        <tbody>
          {/* mapping thru what backend is sending to frontend */}
          {students.map((s) => (
            <tr key={s.id}>
              {/* <td style={tdStyle}>{s.id}</td> */}
              <td style={tdStyle}>{s.name}</td>
              <td style={tdStyle}>{s.industry}</td>
              <td style={tdStyle}>
                {new Date(s.signUpDate).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "2-digit",
                })}
              </td>
              {/* <td style={tdStyle}>
                {new Date(s.signUpDate).toLocaleDateString()}
              </td>{" "} */}
              {/* <td style={tdStyle}>{s.signUpDate}</td> */}
              <td style={tdStyle}>{renderStatusBadge(s.status)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const thStyle: React.CSSProperties = {
  textAlign: "left",
  padding: "0.7rem 0.5rem",
  fontWeight: 600,
  color: "#00212C",
  fontSize: "1.05rem",
};

const tdStyle: React.CSSProperties = {
  textAlign: "left",
  padding: "0.7rem 0.5rem",
  fontSize: "1rem",
  color: "#00212C",
  borderBottom: "1px solid #E7E8EE",
};

const renderStatusBadge = (status: Student["status"]) => {
  let bg = "#E7E8EE";
  let color = "#00212C";

  switch (status) {
    case "PENDING":
      bg = "#FDBB37";
      color = "#353535";
      break;
    case "PAIRED":
      bg = "#007CA6";
      color = "#FFFFFF";
      break;
    case "COMPLETED":
      bg = "#02DE83";
      color = "#FFFFFF";
      break;
    case "FOLLOW-UP":
      bg = "#D83D57";
      color = "#FFFFFF";
      break;
  }

  return (
    <span
      style={{
        background: bg,
        color,
        padding: "0.3rem 0.8rem",
        borderRadius: "8px",
        fontWeight: 600,
        fontSize: "0.9rem",
      }}
    >
      {status}
    </span>
  );
};

export default StudentTable;
