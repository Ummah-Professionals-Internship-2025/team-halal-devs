import React, { useState, useEffect } from "react";
import "./SelectAvailability.css";
import { useParams } from "react-router-dom";

interface MeetingSlot {
  date: string;
  time: string;
}
interface TimeOption {
  id: number;
  start_time: string;
  end_time: string;
}
interface Meeting {
  id: string;
  name: string;
  time_options: TimeOption[];
}

const SelectAvailability: React.FC = () => {
  const { meetingId: meetingIdFromPath } = useParams<{ meetingId?: string }>();
  const meetingIdFromQuery = new URLSearchParams(window.location.search).get(
    "meetingId"
  );
  const meetingId = meetingIdFromPath || meetingIdFromQuery || "";

  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [meetingSlots, setMeetingSlots] = useState<MeetingSlot[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (!meetingId) {
      setError(
        "No meetingId provided in the URL. Add it to the route or as ?meetingId=..."
      );
      setLoading(false);
      return;
    }

    setLoading(true);
    // Use meeting details endpoint; it includes time_options
    fetch(`${import.meta.env.VITE_API_URL}meetings/${meetingId}/`)
      .then(async (res) => {
        if (!res.ok) {
          const msg = await res.text();
          throw new Error(msg || "Failed to load meeting");
        }
        return res.json() as Promise<Meeting>;
      })
      .then((meeting) => {
        // Map backend time_options to displayable cards
        const slots: MeetingSlot[] = (meeting.time_options || []).map((opt) => {
          const start = new Date(opt.start_time);
          const end = new Date(opt.end_time);
          const date = start.toLocaleDateString([], {
            year: "numeric",
            month: "short",
            day: "2-digit",
          });
          const time = `${start.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })} – ${end.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}`;
          return { date, time };
        });
        setMeetingSlots(slots);
      })
      .catch((err) => {
        console.error("Error fetching meeting:", err);
        setError("Unable to load meeting time options.");
      })
      .finally(() => setLoading(false));
  }, [meetingId]);

  if (loading) return <p>Loading available slots...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="availability-container">
      {/* Left Section - Student Info */}
      <div className="student-info-section">
        <h2>
          Hi, Let’s help <span className="highlight">Lily Student</span>{" "}
          schedule a meeting!
        </h2>

        <div className="student-info-card">
          <div className="student-name">
            <span className="student-icon">👤</span> Lily Student
          </div>
          <div className="student-field">
            <label>Industry:</label>{" "}
            <span className="link">Information Technology</span>
          </div>
          <div className="student-field">
            <label>Academic Year:</label> Freshman
          </div>
          <div className="student-field">
            <label>Needs:</label> <span className="link">Career Advice</span>
          </div>
          <div className="student-field">
            <label>Resume:</label>{" "}
            <a href="#" className="resume-link">
              Lily_s_resume.pdf
            </a>
          </div>
        </div>

        <div className="note-section">
          <label>Note (Optional)</label>
          <textarea placeholder="Please write here.." />
        </div>
      </div>

      {/* Right Section - Propose Meeting */}
      <div className="meeting-time-section">
        <h2>Propose Meeting Time</h2>
        <p>Please select what time works for you</p>
        {/* New: show up to 6 cards of the meeting’s time options (as selected slots context) */}
        <div style={{ marginBottom: "1rem" }}>
          <h3 style={{ marginBottom: "0.5rem" }}>
            Student Selected Time Options
          </h3>
          <div className="slots-grid">
            {meetingSlots.slice(0, 6).map((slot, index) => {
              const isSelected = selectedSlot === `${slot.date} ${slot.time}`;
              return (
                <button
                  key={`sel-${index}`}
                  className={`slot-card ${isSelected ? "selected" : ""}`}
                  onClick={() => setSelectedSlot(`${slot.date} ${slot.time}`)}
                >
                  <strong>{slot.date}</strong>
                  <span>{slot.time}</span>
                </button>
              );
            })}
            {meetingSlots.length === 0 && (
              <div style={{ color: "#666", fontSize: "14px" }}>
                No time options available for this meeting.
              </div>
            )}
          </div>
        </div>

        <div className="actions">
          <button className="cant-make-it">Can’t make it</button>
          <button className="propose-meeting">Propose Meeting</button>
        </div>
      </div>
    </div>
  );
};

export default SelectAvailability;
