import React, { useState } from "react";
import InfoPage from "../../components/InfoForm";
import Calendar from "../../components/Calendar";
import TimeDropdown from "../../components/TimeDropdown";
import WrapUp from "../../components/WrapUp";
import Submit from "../../components/Submit";

const steps = ["Info", "Schedule", "WrapUp", "Submit"];

const MainStudentInfoPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => {
    if (currentStep === steps.length - 1) {
      handleSubmit();
    } else {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const handleSubmit = () => {
    // call API to submit data here
    alert("Form submitted!");
    // reset form
    setCurrentStep(0);
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

  return (
    <div className="student-page-container">
      <h1 className="student-page-title">Career Services Applicants</h1>

      <div className="step-component">{renderStep()}</div>

      <div className="step-buttons">
        {currentStep > 0 && <button onClick={prevStep}>Previous</button>}

        <button onClick={nextStep}>
          {currentStep === steps.length - 1 ? "Submit" : "Next"}
        </button>
      </div>
    </div>
  );
};

export default MainStudentInfoPage;
