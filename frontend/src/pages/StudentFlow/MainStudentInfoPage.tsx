import React, { useState, useEffect } from "react";
import InfoPage from "../../components/InfoForm";
import Calendar from "../../components/Calendar";
import TimeDropdown from "../../components/TimeDropdown";
import WrapUp from "../../components/WrapUp";
import Submit from "../../components/Submit";
import "../../components/InfoForm.css";
import { useParams } from "react-router-dom";

const steps = ["Info", "Availability", "Wrap-up", "Submit"];

const MainStudentInfoPage: React.FC = () => {
  const { meetingId } = useParams<{ meetingId: string }>();

  const [formData, setFormData] = useState({
    meeting: "", // will be auto-set
    participant_name: "",
    email: "",
    phone_number: "",
    industry: "",
    academic_year: "",
    seeking_service: "",
    resume_upload: null as File | null,
    hear_about: "",
    optional_info: "",
    send_to_email: false,
    meetingDate: "", // selected in Calendar
    timeOptions: [] as { start: string; end: string }[], // array of chosen times
  });

  useEffect(() => {
    if (meetingId) {
      setFormData((prev) => ({ ...prev, meeting: meetingId }));
    }
  }, [meetingId]);

  const [currentStep, setCurrentStep] = useState(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // insert fetch call here
    //2nd fetch

    // if (!formData.meetingDate || formData.timeOptions.length === 0) {
    //   alert("Please select a date and at least one time slot.");
    //   return;
    // }

    const payload = {
      participant_name: formData.participant_name,
      email: formData.email,
      phone_number: formData.phone_number,
      industry: formData.industry,
      academic_year: formData.academic_year,
      seeking_service: formData.seeking_service,
      resume_upload: formData.resume_upload, // TODO: handle file upload separately (needs FormData if file upload works)
      hear_about: formData.hear_about,
      optional_info: formData.optional_info,
      send_to_email: formData.send_to_email,
      meetingDate: formData.meetingDate,
      time_options: formData.timeOptions.map((opt) => ({
        start_time: opt.start ? `${formData.meetingDate}T${opt.start}` : null,
        end_time: opt.end ? `${formData.meetingDate}T${opt.end}` : null,
        // time_options: formData.timeOptions.map((opt) => ({
        //   start_time: `${formData.meetingDate}T${opt.start}`,
        //   end_time: `${formData.meetingDate}T${opt.end}`,
      })),
    };

    //
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}api/student-with-meeting/`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(payload),
        }
      );

      if (res.ok) {
        const data = await res.json();
        console.log("Created student + meeting:", data);
        alert(`Form submitted! Your meeting ID: ${data.meeting_id}`);
      } else {
        const error = await res.json();
        console.error("Error submitting form:", error);
        alert("Error submitting form.");
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

  // called when user selects a date from Calendar
  const handleDateChange = (date: string) => {
    setFormData((prev) => ({ ...prev, meetingDate: date }));
  };

  // called when user adds/edits a time option from TimeDropdown
  const handleTimeOptionsChange = (
    options: { start: string; end: string }[]
  ) => {
    setFormData((prev) => ({ ...prev, timeOptions: options }));
  };
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
            <Calendar
              selectedDate={formData.meetingDate}
              onDateChange={(date) =>
                setFormData((prev) => ({ ...prev, meetingDate: date }))
              }
            />
            {/* TimeDropdown will go here once implemented */}
            <p className="placeholder-message">
              Time slot selection coming soon.
            </p>
          </div>
        );
      // BEST case 1:
      //   return (
      //     <div className="schedule-step">
      //       <Calendar
      //         selectedDate={formData.meetingDate}
      //         onDateChange={(date) =>
      //           setFormData((prev) => ({ ...prev, meetingDate: date }))
      //         }
      //       />
      //       <TimeDropdown
      //         timeOptions={formData.timeOptions}
      //         onTimeChange={(updatedOptions) =>
      //           setFormData((prev) => ({
      //             ...prev,
      //             timeOptions: updatedOptions,
      //           }))
      //         }
      //       />
      //     </div>
      //   );
      // case 1:
      //   return (
      //     <div className="schedule-step">
      //       <Calendar />
      //       <TimeDropdown
      //         dates={[]} // Replace with actual dates
      //         times={[]} // Replace with actual times
      //         values={{}} // Replace with actual values
      //         onChange={() => {}} // Replace with actual handler
      //       />
      //     </div>
      //   );
      case 2:
        return <WrapUp />;
      case 3:
        return <Submit />;
      default:
        return null;
    }
  };

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
