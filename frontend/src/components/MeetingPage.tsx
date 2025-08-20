import React from "react";
import StudentForm from "../components/StudentForm";
import ProfessionalForm from "../components/ProfessionalForm";

export default function MeetingPage() {
  const meetingId = "PUT-YOUR-MEETING-ID-HERE"; // replace with a real meeting id from DB

  return (
    <div>
      <h2>Student Form</h2>
      <StudentForm meetingId={meetingId} />

      <h2>Professional Form</h2>
      <ProfessionalForm meetingId={meetingId} />
    </div>
  );
}
