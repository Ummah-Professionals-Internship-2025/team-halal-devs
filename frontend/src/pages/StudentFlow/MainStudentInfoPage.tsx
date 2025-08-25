import React, { useState } from "react";
import InfoPage from "../../components/InfoForm";
import Calendar from "../../components/Calendar";
import TimeDropdown from "../../components/TimeDropdown";
import WrapUp from "../../components/WrapUp";
import Submit from "../../components/Submit";
import "../../components/InfoForm.css";

const steps = ["Info", "Availability", "Wrap-up", "Submit"];

const MainStudentInfoPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const handleSubmit = () => {
    // call API to submit data here
    alert("Form submitted!");
    // reset form
    setCurrentStep(0);
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
