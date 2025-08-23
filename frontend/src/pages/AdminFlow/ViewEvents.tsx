import React from "react";
import AdminCalendar from "../../components/AdminCalendar";

const ViewEvents: React.FC = () => {
  return (
    <div className="professional-page-container">
      <h1 className="student-page-title">Events List</h1>
      <div className="schedule-step">
        <AdminCalendar />
      </div>
    </div>
  );
};

export default ViewEvents;
