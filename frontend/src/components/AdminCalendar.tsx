import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction"; // optional for clicks

interface Meeting {
  id: string;
  name: string;
  start_time: string;
  end_time: string;
}

const AdminCalendar: React.FC = () => {
  const [events, setEvents] = useState<Meeting[]>([]);

  useEffect(() => {
    // Fetch meetings from your backend API
    fetch("http://localhost:8000/api/meetings/")
      .then((res) => res.json())
      .then((data) => {
        // Map to FullCalendar event format
        const formatted = data.map((meeting: any) => ({
          id: meeting.id,
          title: meeting.name,
          start: meeting.start_time,
          end: meeting.end_time,
        }));
        setEvents(formatted);
      });
  }, []);

  return (
    <FullCalendar
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      events={events}
      editable={false} // Prevent dragging/resizing
      selectable={false} // Prevent selecting new time slots
      eventClick={(info) => alert(`Meeting: ${info.event.title}`)} // Optional: click to view details
    />
  );
};

export default AdminCalendar;
