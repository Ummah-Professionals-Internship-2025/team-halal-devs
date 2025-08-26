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
  const [isInfoStepValid, setIsInfoStepValid] = useState(false);

  const handleSubmit = () => {
    alert("Form submitted!");
    setCurrentStep(0);
  };

  const nextStep = () => {
    // Prevent progression from Info step if validation fails
    if (currentStep === 0 && !isInfoStepValid) {
      alert("Please fill out all required fields before proceeding.");
      return;
    }
    setCurrentStep((s) => Math.min(s + 1, steps.length - 1));
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <InfoPage onValidationChange={setIsInfoStepValid} />;
      case 1:
        return (
          <div className="schedule-step">
            <Calendar />
            <TimeDropdown
              dates={[]}
              times={[]}
              values={{}}
              onChange={() => {}}
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
                  // Only allow clicking to next steps if current step is valid
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
