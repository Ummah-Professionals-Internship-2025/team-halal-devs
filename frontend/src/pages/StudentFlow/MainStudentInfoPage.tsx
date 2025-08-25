import React, { useState, useEffect } from "react";
import InfoPage from "../../components/InfoForm";
import Calendar from "../../components/Calendar";
import TimeDropdown from "../../components/TimeDropdown";
import WrapUp from "../../components/WrapUp";
import Submit from "../../components/Submit";
import "../../components/InfoForm.css";
import { useParams } from "react-router-dom";

const steps = ["Info", "Availability", "Wrap-up", "Submit"];

const { meetingId } = useParams<{ meetingId: string }>();

const MainStudentInfoPage: React.FC = () => {
  const [formData, setFormData] = useState({
    meeting: "", // UUID of meeting (must be set)
    participant_name: "",
    email: "",
    phone_number: "",
    industry: "",
    academic_year: "",
    seeking_service: "",
    resume_upload: null, // if you add file upload later
    hear_about: "",
    optional_info: "",
    send_to_email: false,
  });

  useEffect(() => {
    if (meetingId) {
      setFormData((prev) => ({ ...prev, meeting: meetingId }));
    }
  }, [meetingId]);

  const [currentStep, setCurrentStep] = useState(0);

  const handleSubmit = async () => {
    try {
      const res = await fetch("http://localhost:8000/student/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        const data = await res.json();
        alert(`Student submitted! ID: ${data.student_id}`);
        setCurrentStep(0);
      } else {
        const errorData = await res.json();
        console.error("Error submitting student:", errorData);
        alert("Error submitting student info");
      }
    } catch (err) {
      console.error("Network error:", err);
      alert("Could not connect to backend");
    }
  };

  // const handleSubmit = () => {
  //   // call API to submit data here
  //   alert("Form submitted!");
  //   // reset form
  //   setCurrentStep(0);
  // try {
  //   const res = await fetch(`${import.meta.env.VITE_API_URL}????/mainstudent`, {
  //     method: "POST", //sending data - taking form values, setting inside database
  //     headers: { "Content-Type": "application/json" },
  //     credentials: "include",
  //     body: JSON.stringify({
  //       id:
  //       meeting:
  //       participant_name:
  //       email:
  //       phone_number:
  //       industry:
  //       academic_year:
  //       seeking_service:
  //       resume_upload:
  //       hear_about:
  //       optional_info:
  //       send_to_email:
  //       prof_assigned:
  //       created_at:
  //       })),
  //     }),
  //   });
  // };

  //   timeOptions.map((option) => ({
  // `${meetingDate}T${option.start}:00Z`,

  //sending to API

  // Add a helper to go to the next tab
  const nextStep = () => {
    setCurrentStep((s) => Math.min(s + 1, steps.length - 1));
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <InfoPage />;
      case 1:
        return (
          <div className="schedule-step">
            <Calendar />
            <TimeDropdown
              dates={[]} // Replace with actual dates
              times={[]} // Replace with actual times
              values={{}} // Replace with actual values
              onChange={() => {}} // Replace with actual handler
            />
          </div>
        );
      case 2:
        return <WrapUp />;
      case 3:
        return <Submit />;
      default:
        return null;
    }
  };

  // ...existing code...
  return (
    <div className="mainstudent-outer">
      <div className="mainstudent-card">
        <div className="student-page-container">
          <h1 className="student-page-title">Career Services Applicants</h1>

          <div className="progress-pillbox">
            {steps.map((label, idx) => (
              <div
                key={label}
                className={`progress-step ${
                  currentStep === idx ? "active" : ""
                }`}
                onClick={() => setCurrentStep(idx)}
                role="button"
                aria-label={`Go to ${label}`}
              >
                {label}
              </div>
            ))}
          </div>

          <div className="step-component">{renderStep()}</div>

          <div className="step-buttons-row">
            {currentStep > 0 && (
              <button
                className="step-button pill right"
                onClick={() => setCurrentStep((s) => s - 1)}
              >
                ← Previous
              </button>
            )}
            {currentStep < steps.length - 1 && (
              <button className="step-button pill left" onClick={nextStep}>
                Next →
              </button>
            )}
            {currentStep === steps.length - 1 && (
              <button className="step-button pill right" onClick={handleSubmit}>
                Submit
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainStudentInfoPage;
