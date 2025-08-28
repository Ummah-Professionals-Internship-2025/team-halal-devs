import React, { useState, useEffect } from "react";
import "./SelectAvailability.css";

interface MeetingSlot {
  date: string;
  time: string;
}

const SelectAvailability: React.FC = () => {
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [meetingSlots, setMeetingSlots] = useState<MeetingSlot[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Replace this URL with your backend endpoint
    fetch("https://your-backend.com/api/meeting-slots")
      .then((res) => res.json())
      .then((data) => {
        setMeetingSlots(data); // assuming backend returns an array of { date, time }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching meeting slots:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading available slots...</p>;

  return (
    <div className="availability-container">
      {/* Left Section - Student Info */}
      <div className="student-info-section">
        <h2>
          Hi, Let’s help <span className="highlight">Ameerah Gadatia</span>{" "}
          schedule a meeting!
        </h2>

        <div className="student-info-card">
          <div className="student-name">
            <span className="student-icon">👤</span> Ameerah Gadatia
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
              Khawlah_resume.pdf
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

        <div className="slots-grid">
          {meetingSlots.map((slot, index) => {
            const isSelected = selectedSlot === `${slot.date} ${slot.time}`;
            return (
              <button
                key={index}
                className={`slot-card ${isSelected ? "selected" : ""}`}
                onClick={() => setSelectedSlot(`${slot.date} ${slot.time}`)}
              >
                <strong>{slot.date}</strong>
                <span>{slot.time}</span>
              </button>
            );
          })}
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
