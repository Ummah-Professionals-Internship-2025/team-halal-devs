import React, { useState } from "react";
import AdminLayout from "../../components/AdminLayout";

const followUps = [
  {
    name: "Dur e Khawlah",
    industry: "Information Technology",
    lastMeeting: "July 13, 2025",
    nextFollowUp: "Due in 2 days",
    nextFollowUpDate: "",
    scheduled: false,
  },
  {
    name: "Souzen Khan",
    industry: "Business",
    lastMeeting: "July 13, 2025",
    nextFollowUp: "Due in 2 days",
    nextFollowUpDate: "",
    scheduled: false,
  },
  {
    name: "Muhammad Ali",
    industry: "Health Care",
    lastMeeting: "July 07, 2025",
    nextFollowUp: "",
    nextFollowUpDate: "08/07/2025",
    scheduled: false,
  },
  {
    name: "Ameerah Gadatia",
    industry: "Information Technology",
    lastMeeting: "July 01, 2025",
    nextFollowUp: "",
    nextFollowUpDate: "08/01/2025",
    scheduled: false,
  },
  {
    name: "Afra Mashel",
    industry: "Business",
    lastMeeting: "June 22, 2025",
    nextFollowUp: "",
    nextFollowUpDate: "07/22/2025",
    scheduled: false,
  },
  {
    name: "Nafisa Yeasmin",
    industry: "Education",
    lastMeeting: "June 13, 2025",
    nextFollowUp: "",
    nextFollowUpDate: "07/13/2025",
    scheduled: false,
  },
  {
    name: "Arwa Arsalan",
    industry: "Finance",
    lastMeeting: "June 03, 2025",
    nextFollowUp: "",
    nextFollowUpDate: "07/03/2025",
    scheduled: true,
  },
  {
    name: "Hassan Jamal",
    industry: "Information Technology",
    lastMeeting: "May 31, 2025",
    nextFollowUp: "",
    nextFollowUpDate: "06/30/2025",
    scheduled: true,
  },
];

export const ViewFollowUps: React.FC = () => {
  const [selected, setSelected] = useState(0);
  const [message, setMessage] = useState("");

  return (
    <AdminLayout>
      <div
        style={{
          padding: "2rem 2rem 0 2rem",
          fontFamily: "Poppins, Arial, sans-serif",
        }}
      >
        <h1
          style={{
            color: "#00212C",
            fontWeight: 700,
            fontSize: "2rem",
            marginBottom: "0.2rem",
          }}
        >
          Follow-ups
        </h1>
        <div style={{ color: "#7A8CA3", marginBottom: "1.5rem" }}>
          Check in with students after their initial meeting.
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "1rem",
          }}
        >
          <input
            type="text"
            placeholder="Search here"
            style={{
              flex: 1,
              padding: "0.7rem 1rem",
              borderRadius: "2rem",
              border: "1px solid #E7E8EE",
              fontSize: "1rem",
              outline: "none",
              marginRight: "1rem",
            }}
          />
          <span
            style={{
              fontSize: "1.5rem",
              color: "#7A8CA3",
              marginRight: "1rem",
            }}
          >
            🔔
          </span>
          <span style={{ fontSize: "1.5rem", color: "#7A8CA3" }}>👤</span>
        </div>
        <div
          style={{
            background: "#F7F8FA",
            borderRadius: "16px",
            padding: "1.5rem",
            marginBottom: "1.5rem",
          }}
        >
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#E7E8EE", borderRadius: "8px" }}>
                <th style={thStyle}>Name</th>
                <th style={thStyle}>Industry</th>
                <th style={thStyle}>Last Meeting</th>
                <th style={thStyle}>Next Follow-up</th>
                <th style={thStyle}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {followUps.map((f, i) => (
                <tr
                  key={f.name}
                  style={{
                    background: selected === i ? "#F0F4F8" : "transparent",
                  }}
                >
                  <td style={tdStyle}>{f.name}</td>
                  <td style={tdStyle}>{f.industry}</td>
                  <td style={tdStyle}>{f.lastMeeting}</td>
                  <td style={tdStyle}>
                    {f.nextFollowUp ? (
                      <span style={{ color: "#E74C3C", fontWeight: 500 }}>
                        {f.nextFollowUp}
                      </span>
                    ) : (
                      <span style={{ color: "#207ca6", fontWeight: 500 }}>
                        {f.nextFollowUpDate}
                      </span>
                    )}
                  </td>
                  <td style={tdStyle}>
                    <button
                      style={{
                        background: f.scheduled ? "#E7E8EE" : "#207ca6",
                        color: f.scheduled ? "#207ca6" : "#fff",
                        border: "none",
                        borderRadius: "8px",
                        padding: "0.5rem 1.2rem",
                        fontWeight: 600,
                        cursor: "pointer",
                      }}
                      disabled={f.scheduled}
                      onClick={() => setSelected(i)}
                    >
                      {f.scheduled ? "Scheduled" : "Schedule"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Student details and message box */}
        <div
          style={{
            background: "#fff",
            borderRadius: "16px",
            padding: "1.5rem",
            boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
            marginBottom: "2rem",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "0.7rem",
            }}
          >
            <span
              style={{
                fontSize: "1.7rem",
                marginRight: "0.7rem",
                color: "#7A8CA3",
              }}
            >
              👤
            </span>
            <span
              style={{
                fontWeight: 600,
                fontSize: "1.1rem",
                marginRight: "1rem",
              }}
            >
              {followUps[selected].name}
            </span>
            {followUps[selected].nextFollowUp && (
              <span
                style={{
                  background: "#FDECEF",
                  color: "#E74C3C",
                  borderRadius: "8px",
                  padding: "0.2rem 0.8rem",
                  fontWeight: 500,
                  fontSize: "0.95rem",
                  marginRight: "1rem",
                }}
              >
                {followUps[selected].nextFollowUp}
              </span>
            )}
          </div>
          <div
            style={{
              color: "#7A8CA3",
              fontSize: "0.95rem",
              marginBottom: "0.5rem",
            }}
          >
            {followUps[selected].name.toLowerCase().replace(/ /g, "")}@gmail.com
          </div>
          <div style={{ marginBottom: "0.7rem" }}>
            <span style={{ fontWeight: 600 }}>Industry:</span>{" "}
            <span style={{ color: "#207ca6" }}>
              {followUps[selected].industry}
            </span>
            <span style={{ marginLeft: "1.5rem", fontWeight: 600 }}>
              Seeking:
            </span>{" "}
            <span style={{ color: "#207ca6" }}>Career Advice</span>
          </div>
          <div style={{ marginBottom: "1rem" }}>
            <span style={{ fontWeight: 600 }}>Last meeting:</span>{" "}
            <span style={{ color: "#207ca6" }}>
              {followUps[selected].lastMeeting}
            </span>
          </div>
          <textarea
            placeholder="Message to student with optional meeting link here.."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            style={{
              width: "100%",
              minHeight: "60px",
              borderRadius: "8px",
              border: "1px solid #E7E8EE",
              padding: "0.7rem",
              fontSize: "1rem",
              marginBottom: "1rem",
              resize: "vertical",
            }}
          />
          <div style={{ textAlign: "right" }}>
            <button
              style={{
                background: "#00212C",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                padding: "0.7rem 2.2rem",
                fontWeight: 600,
                fontSize: "1rem",
                cursor: "pointer",
              }}
              onClick={() => setMessage("")}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
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
