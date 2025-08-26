import "./infoform.css";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { useState } from "react";
import React from "react";

interface InfoFormProps {
  onValidationChange?: (isValid: boolean) => void;
}

const InfoForm = ({ onValidationChange }: InfoFormProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [industry, setIndustry] = useState("");
  const [seeking, setSeeking] = useState("");
  const [academicYear, setAcademicYear] = useState("");
  const [resume, setResume] = useState<File | null>(null);

  // Validation functions
  const isNameValid = name.trim().length > 0;
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isPhoneValid = typeof phone === "string" && phone.length >= 10; // Basic phone validation
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
  React.useEffect(() => {
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
            Name {!isNameValid && <span className="required">*</span>}
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              required
              className={`form-container-input ${
                !isNameValid && name !== "" ? "form-error" : ""
              }`}
            />
          </label>

          <label className="label">
            Email {!isEmailValid && <span className="required">*</span>}
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Please enter your Email"
              required
              className={`form-container-input ${
                !isEmailValid && email !== "" ? "form-error" : ""
              }`}
            />
            {!isEmailValid && email !== "" && (
              <span className="error-text">
                Please enter a valid email address
              </span>
            )}
          </label>

          <label className="label">
            Industry {!isIndustryValid && <span className="required">*</span>}
            <select
              className="form-container-input"
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
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
            Phone {!isPhoneValid && <span className="required">*</span>}
            <PhoneInput
              placeholder="(xxx) xxx - xxxx"
              value={phone}
              onChange={(value) => setPhone(value || "")}
              defaultCountry="US"
              className={`form-container-input ${
                !isPhoneValid && phone !== "" ? "form-error" : ""
              }`}
            />
            {!isPhoneValid && phone !== "" && (
              <span className="error-text">
                Please enter a valid phone number
              </span>
            )}
          </label>

          <label className="label">
            Seeking {!isSeekingValid && <span className="required">*</span>}
            <select
              className="form-container-input"
              value={seeking}
              onChange={(e) => setSeeking(e.target.value)}
              required
            >
              <option value="">Please select what you're looking for</option>
              <option value="resume">Resume Review</option>
              <option value="interview">Interview Prep</option>
              <option value="advice">General Career Advice</option>
            </select>
          </label>

          <label className="label">
            Academic Year{" "}
            {!isAcademicYearValid && <span className="required">*</span>}
            <select
              className="form-container-input"
              value={academicYear}
              onChange={(e) => setAcademicYear(e.target.value)}
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
          <input
            id="resumeInput"
            type="file"
            style={{ display: "none" }}
            onChange={(e) => setResume(e.target.files?.[0] || null)}
          />
        </div>
      </div>
    </div>
  );
};

export default InfoForm;
