import React, { useState, useEffect } from "react";
import InfoPage from "../../components/InfoForm";
import Calendar from "../../components/Calendar";
import TimeSelection from "../../components/TimeSelection";
import WrapUp from "../../components/WrapUp";
import Submit from "../../components/Submit";
import "../../components/InfoForm.css";
import { useParams } from "react-router-dom";

const steps = ["Info", "Availability", "Wrap-up", "Submit"];

const MainStudentInfoPage: React.FC = () => {
  const { meetingId } = useParams<{ meetingId: string }>();

  const [currentStep, setCurrentStep] = useState(0);
  const [isInfoStepValid, setIsInfoStepValid] = useState(false);
  const [selectedDates, setSelectedDates] = useState<string[]>([]);
  // Change timeValues to support arrays of times per date
  const [timeValues, setTimeValues] = useState<{ [date: string]: string[] }>(
    {}
  );
  const [totalTimeSlots, setTotalTimeSlots] = useState(0);
  const [timeSelectionError, setTimeSelectionError] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const [formData, setFormData] = useState({
    meeting: meetingId || "",
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
  });

  useEffect(() => {
    if (meetingId) {
      setFormData((prev) => ({ ...prev, meeting: meetingId }));
    }
  }, [meetingId]);

  const handleSubmit = async () => {
    try {
      const submitData = new FormData();

      if (formData.meeting) {
        submitData.append("meeting", formData.meeting);
      }

      submitData.append("participant_name", formData.participant_name);
      submitData.append("email", formData.email);
      if (formData.phone_number)
        submitData.append("phone_number", formData.phone_number);
      if (formData.industry) submitData.append("industry", formData.industry);
      if (formData.academic_year)
        submitData.append("academic_year", formData.academic_year);
      if (formData.seeking_service)
        submitData.append("seeking_service", formData.seeking_service);
      if (formData.resume_upload)
        submitData.append("resume_upload", formData.resume_upload);
      if (formData.hear_about)
        submitData.append("hear_about", formData.hear_about);
      if (formData.optional_info)
        submitData.append("optional_info", formData.optional_info);
      submitData.append(
        "send_to_email",
        formData.send_to_email ? "true" : "false"
      );

      const res = await fetch(`${import.meta.env.VITE_API_URL}student/`, {
        method: "POST",
        body: submitData,
      });

      if (res.ok) {
        const data = await res.json();
        alert(`Student submitted successfully! ${data.message || ""}`);

        // Reset form
        setCurrentStep(0);
        setFormData({
          meeting: meetingId || "",
          participant_name: "",
          email: "",
          phone_number: "",
          industry: "",
          academic_year: "",
          seeking_service: "",
          resume_upload: null,
          hear_about: "",
          optional_info: "",
          send_to_email: false,
        });
        setSelectedDates([]);
        setTimeValues({});
        setTotalTimeSlots(0);
        setIsInfoStepValid(false);
      } else {
        const errorData = await res.json();
        console.error("Error submitting student:", errorData);
        alert("Error submitting student info. Please check your entries.");
      }
    } catch (err) {
      console.error("Network error:", err);
      alert("Could not connect to backend. Please try again.");
    }
  };

  const nextStep = () => {
    setTimeSelectionError("");

    if (currentStep === 0 && !isInfoStepValid) {
      setErrorMessage("Please fill out all required fields before proceeding.");
      // alert("Please fill out all required fields before proceeding.");
      return;
    }

    if (currentStep === 1) {
      if (selectedDates.length === 0) {
        setErrorMessage("Please select at least one date.");
        // alert("Please select at least one date.");
        return;
      }

      // Check if each selected date has at least one time slot
      const missingTimes = selectedDates.some(
        (date) => !timeValues[date] || timeValues[date].length === 0
      );
      if (missingTimes) {
        // alert("Please select at least one time for each selected date.");
        setErrorMessage(
          "Please select at least one time for each selected date"
        );
        return;
      }

      if (totalTimeSlots < 1) {
        // alert("Please select at least one time slot.");
        setErrorMessage("Please select at least one time slot.");
        return;
      }

      if (totalTimeSlots > 6) {
        // alert("Please select no more than 6 time slots total.");
        setErrorMessage("Please select no more than 6 time slots total.");
        return;
      }
    }

    setCurrentStep((s) => Math.min(s + 1, steps.length - 1));
  };

  const handleDateChange = (dates: string[]) => {
    // Clear time selection errors when dates change
    setTimeSelectionError("");
    setErrorMessage("");

    setSelectedDates(dates);
    const newTimeValues = { ...timeValues };

    // Remove time values for unselected dates
    Object.keys(newTimeValues).forEach((date) => {
      if (!dates.includes(date)) {
        delete newTimeValues[date];
      }
    });

    setTimeValues(newTimeValues);

    // Update total count after removing dates
    const newTotal = Object.values(newTimeValues).flat().filter(Boolean).length;
    setTotalTimeSlots(newTotal);
  };

  const handleTimeChange = (date: string, times: string[]) => {
    // Clear errors when user makes time selections
    setTimeSelectionError("");
    setErrorMessage("");
    // Calculate current total selected slots (excluding the date being modified)
    const otherDatesSlots = Object.entries(timeValues)
      .filter(([d]) => d !== date)
      .reduce((count, [, times]) => count + times.length, 0);

    // Check if adding these times would exceed the limit
    if (otherDatesSlots + times.length > 6) {
      alert("You can only select up to 6 time slots total across all dates.");
      return;
    }

    setTimeValues((prev) => {
      const newValues = { ...prev, [date]: times };

      // Update total count
      const newTotal = Object.values(newValues).flat().filter(Boolean).length;
      setTotalTimeSlots(newTotal);

      return newValues;
    });
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <InfoPage
            onValidationChange={setIsInfoStepValid}
            formData={formData}
            setFormData={setFormData}
          />
        );
      case 1:
        return (
          <div className="schedule-step">
            <Calendar
              selectedDates={selectedDates}
              onDateChange={handleDateChange}
            />
            <TimeSelection
              selectedDates={selectedDates}
              timeValues={timeValues}
              onTimeChange={handleTimeChange}
              totalTimeSlots={totalTimeSlots}
              error={timeSelectionError}
            />
          </div>
        );
      case 2:
        return <WrapUp formData={formData} setFormData={setFormData} />;
      case 3:
        return <Submit formData={formData} setFormData={setFormData} />;
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
                onClick={() => {
                  if (
                    idx <= currentStep ||
                    (currentStep === 0 && isInfoStepValid)
                  ) {
                    setCurrentStep(idx);
                  } else if (currentStep === 0 && !isInfoStepValid) {
                    alert(
                      "Please fill out all required fields before proceeding."
                    );
                  }
                }}
                role="button"
                aria-label={`Go to ${label}`}
                style={{
                  cursor:
                    idx <= currentStep || (currentStep === 0 && isInfoStepValid)
                      ? "pointer"
                      : "not-allowed",
                  opacity:
                    idx <= currentStep || (currentStep === 0 && isInfoStepValid)
                      ? 1
                      : 0.6,
                }}
              >
                {label}
              </div>
            ))}
          </div>

          <div className="step-component">{renderStep()}</div>

          {errorMessage && (
            <div className="global-error-message">{errorMessage}</div>
          )}

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
              <button
                className={`step-button pill left ${
                  currentStep === 0 && !isInfoStepValid ? "disabled" : ""
                }`}
                onClick={nextStep}
                disabled={currentStep === 0 && !isInfoStepValid}
              >
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
