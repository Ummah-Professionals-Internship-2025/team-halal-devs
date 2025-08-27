import "./WrapUp.css";
//import * as React from "react";
import { useState } from "react";

interface WrapUpProps {
  formData?: {
    meeting: string;
    participant_name: string;
    email: string;
    phone_number: string;
    industry: string;
    academic_year: string;
    seeking_service: string;
    resume_upload: File | null;
    hear_about: string;
    optional_info: string;
    send_to_email: boolean;
  };
  setFormData?: React.Dispatch<
    React.SetStateAction<{
      meeting: string;
      participant_name: string;
      email: string;
      phone_number: string;
      industry: string;
      academic_year: string;
      seeking_service: string;
      resume_upload: File | null;
      hear_about: string;
      optional_info: string;
      send_to_email: boolean;
    }>
  >;
}

const WrapUp: React.FC<WrapUpProps> = ({ formData, setFormData }) => {
  // Use local state as fallback if formData/setFormData not provided
  const [localHearAbout, setLocalHearAbout] = useState("");
  const [localOtherInfo, setLocalOtherInfo] = useState("");

  // Use formData if available, otherwise use local state
  const hearAbout = formData?.hear_about ?? localHearAbout;
  const otherInfo = formData?.optional_info ?? localOtherInfo;

  // Helper function to update form data
  const updateFormField = (field: string, value: string) => {
    if (setFormData) {
      setFormData((prev) => ({ ...prev, [field]: value }));
    } else {
      // Fallback to local state
      if (field === "hear_about") {
        setLocalHearAbout(value);
      } else if (field === "optional_info") {
        setLocalOtherInfo(value);
      }
    }
  };

  return (
    <div>
      <div className="info-form"> </div>
      <div>
        <h3 className="meeting-page-title">Additional Information</h3>
        <br></br>
        <label className="label">
          How did you hear about this service?{" "}
          {!hearAbout && <span className="required">*</span>}
          <select
            className="form-container-input"
            value={hearAbout}
            onChange={(e) => updateFormField("hear_about", e.target.value)}
            required
          >
            <option value="">Please select your answer</option>
            <option value="LinkedIn">LinkedIn</option>
            <option value="Friend">Friend</option>
            <option value="I just knew">I just knew 😎</option>
          </select>
        </label>

        <br></br>
      </div>
      <label className="label">
        Anything else you would like to share with us?
        <textarea
          className="form-container-input wrapup-textarea"
          placeholder="Please write here.."
          rows={8}
          value={otherInfo}
          onChange={(e) => updateFormField("optional_info", e.target.value)}
        />
      </label>
    </div>
  );
};

export default WrapUp;
