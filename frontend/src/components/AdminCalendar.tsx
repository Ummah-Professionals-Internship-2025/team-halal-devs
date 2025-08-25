import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import "./AdminCalendar.css";

interface Meeting {
  id: string;
  title: string;
  start: string;
  end?: string;
  backgroundColor?: string;
  textColor?: string;
}

interface ExpandedEvent {
  meeting: Meeting;
  x: number;
  y: number;
}

const AdminCalendar: React.FC = () => {
  const [events, setEvents] = useState<Meeting[]>([]);
  const [expandedEvent, setExpandedEvent] = useState<ExpandedEvent | null>(
    null
  );

  useEffect(() => {
    // Hardcoded example events for now
    const hardcodedEvents: Meeting[] = [
      {
        id: "1",
        title: "Career Counseling Session",
        start: "2025-08-25T10:00:00",
        end: "2025-08-25T11:00:00",
        backgroundColor: "#00212C",
        textColor: "white",
      },
      {
        id: "2",
        title: "Professional Networking Event",
        start: "2025-08-27T14:00:00",
        end: "2025-08-27T16:00:00",
        backgroundColor: "#00212C",
        textColor: "white",
      },
    ];

    setEvents(hardcodedEvents);
  }, []);

  const handleEventClick = (info: any) => {
    const rect = info.el.getBoundingClientRect();
    const meeting = events.find((e) => e.id === info.event.id);

    if (meeting) {
      setExpandedEvent({
        meeting,
        x: rect.left,
        y: rect.top,
      });
    }
  };

  return (
    <div style={{ position: "relative" }}>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        editable={false}
        selectable={false}
        eventClick={handleEventClick}
        height="auto"
        headerToolbar={{
          left: "prev,next",
          center: "title",
          right: "",
        }}
        eventDisplay="block"
      />

      {/* Expanded Event Component */}
      {expandedEvent && (
        <div
          style={{
            position: "fixed",
            left: expandedEvent.x,
            top: expandedEvent.y,
            width: "200px",
            height: "150px",
            backgroundColor: "#00212C",
            color: "white",
            padding: "16px",
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
            zIndex: 1000,
            fontFamily: "Poppins, sans-serif",
          }}
        >
          <button
            onClick={() => setExpandedEvent(null)}
            style={{
              position: "absolute",
              top: "8px",
              right: "8px",
              background: "none",
              border: "none",
              color: "white",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            ×
          </button>
          <h3 style={{ margin: "0 0 12px 0", fontSize: "14px" }}>
            {expandedEvent.meeting.title}
          </h3>
          <p style={{ margin: "0 0 8px 0", fontSize: "12px" }}>
            <strong>Start:</strong>{" "}
            {new Date(expandedEvent.meeting.start).toLocaleString()}
          </p>
          {expandedEvent.meeting.end && (
            <p style={{ margin: "0", fontSize: "12px" }}>
              <strong>End:</strong>{" "}
              {new Date(expandedEvent.meeting.end).toLocaleString()}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminCalendar;
