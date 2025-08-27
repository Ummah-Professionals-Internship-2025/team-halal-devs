import "./infoform.css";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { useState, useEffect } from "react";
import React from "react";

interface InfoFormProps {
  onValidationChange?: (isValid: boolean) => void;
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

const InfoForm = ({
  onValidationChange,
  formData,
  setFormData,
}: InfoFormProps) => {
  // Use local state as fallback if formData/setFormData not provided
  const [localName, setLocalName] = useState("");
  const [localEmail, setLocalEmail] = useState("");
  const [localPhone, setLocalPhone] = useState("");
  const [localIndustry, setLocalIndustry] = useState("");
  const [localSeeking, setLocalSeeking] = useState("");
  const [localAcademicYear, setLocalAcademicYear] = useState("");
  const [localResume, setLocalResume] = useState<File | null>(null);

  // Use formData if available, otherwise use local state
  const name = formData?.participant_name ?? localName;
  const email = formData?.email ?? localEmail;
  const phone = formData?.phone_number ?? localPhone;
  const industry = formData?.industry ?? localIndustry;
  const seeking = formData?.seeking_service ?? localSeeking;
  const academicYear = formData?.academic_year ?? localAcademicYear;
  const resume = formData?.resume_upload ?? localResume;

  // Helper function to update form data
  const updateFormField = (field: string, value: any) => {
    if (setFormData) {
      setFormData((prev) => ({ ...prev, [field]: value }));
    } else {
      // Fallback to local state
      switch (field) {
        case "participant_name":
          setLocalName(value);
          break;
        case "email":
          setLocalEmail(value);
          break;
        case "phone_number":
          setLocalPhone(value);
          break;
        case "industry":
          setLocalIndustry(value);
          break;
        case "seeking_service":
          setLocalSeeking(value);
          break;
        case "academic_year":
          setLocalAcademicYear(value);
          break;
        case "resume_upload":
          setLocalResume(value);
          break;
      }
    }
  };

  // Validation functions
  const isNameValid = name.trim().length > 0;
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isPhoneValid = typeof phone === "string" && phone.length >= 10;
  const isIndustryValid = industry !== "";
  const isSeekingValid = seeking !== "";
  const isAcademicYearValid = academicYear !== "";

  const isFormValid =
    isNameValid &&
    isEmailValid &&
    isPhoneValid &&
    isIndustryValid &&
    isSeekingValid &&
    isAcademicYearValid;

  // Call validation callback whenever form validity changes
  useEffect(() => {
    if (onValidationChange) {
      onValidationChange(isFormValid);
    }
  }, [isFormValid, onValidationChange]);

  return (
    <div className="info-form">
      {/* Two Column Layout */}
      <div className="form-container">
        {/* Left Column */}
        <div className="form-container-child">
          <label className="label">
            Name <span className="required">*</span>
            <input
              type="text"
              value={name}
              onChange={(e) =>
                updateFormField("participant_name", e.target.value)
              }
              placeholder="Enter your name"
              required
              className="form-container-input"
            />
          </label>

          <label className="label">
            Email <span className="required">*</span>
            <input
              type="email"
              value={email}
              onChange={(e) => updateFormField("email", e.target.value)}
              placeholder="Please enter your Email"
              required
              className="form-container-input"
            />
          </label>

          <label className="label">
            Industry <span className="required">*</span>
            <select
              className="form-container-input"
              value={industry}
              onChange={(e) => updateFormField("industry", e.target.value)}
              required
            >
              <option value="">Please select your industry</option>
              <option value="business">Business</option>
              <option value="education">Education</option>
              <option value="engineering">Engineering</option>
              <option value="finance">Finance</option>
              <option value="healthcare">Healthcare</option>
              <option value="infotech">Information Technology</option>
              <option value="law">Law</option>
              <option value="social">Social Services</option>
              <option value="other">Other</option>
            </select>
          </label>
        </div>

        {/* Right Column */}
        <div className="form-container-child">
          <label className="label">
            Phone <span className="required">*</span>
            <PhoneInput
              placeholder="(xxx) xxx - xxxx"
              value={phone}
              onChange={(value) => updateFormField("phone_number", value || "")}
              defaultCountry="US"
              className="form-container-input"
            />
          </label>

          <label className="label">
            Seeking <span className="required">*</span>
            <select
              className="form-container-input"
              value={seeking}
              onChange={(e) =>
                updateFormField("seeking_service", e.target.value)
              }
              required
            >
              <option value="">Please select what you're looking for</option>
              <option value="resume">Resume Review</option>
              <option value="interview">Interview Prep</option>
              <option value="advice">General Career Advice</option>
            </select>
          </label>

          <label className="label">
            Academic Year <span className="required">*</span>
            <select
              className="form-container-input"
              value={academicYear}
              onChange={(e) => updateFormField("academic_year", e.target.value)}
              required
            >
              <option value="">Please select your current Academic year</option>
              <option value="freshman">Freshman</option>
              <option value="sophomore">Sophomore</option>
              <option value="junior">Junior</option>
              <option value="senior">Senior</option>
              <option value="masters">Masters</option>
              <option value="graduate">Graduated</option>
            </select>
          </label>
        </div>
      </div>

      {/* Resume Upload */}
      <div className="form-container resume">
        <label className="label">Resume</label>
        <div
          className="resume-upload"
          onClick={() => document.getElementById("resumeInput")?.click()}
        >
          <p>📎 Browse or drag and drop here</p>
          {resume && <p className="file-selected">Selected: {resume.name}</p>}
          <input
            id="resumeInput"
            type="file"
            style={{ display: "none" }}
            accept=".pdf,.doc,.docx"
            onChange={(e) =>
              updateFormField("resume_upload", e.target.files?.[0] || null)
            }
          />
        </div>
      </div>
    </div>
  );
};

export default InfoForm;
