import "./infoform.css";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { useState } from "react";

const InfoForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [industry, setIndustry] = useState("");
  const [seeking, setSeeking] = useState("");
  const [academicYear, setAcademicYear] = useState("");
  const [resume, setResume] = useState<File | null>(null);

  const [currentStep, setCurrentStep] = useState("Info");
  const steps = ["Info", "Availability", "Wrap-up", "Submit"];

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
              onChange={(e) => setName(e.target.value)}
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
              onChange={(e) => setEmail(e.target.value)}
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
            Phone <span className="required">*</span>
            <PhoneInput
              placeholder="(xxx) xxx - xxxx"
              value={phone}
              onChange={(value) => setPhone(value || "")}
              defaultCountry="US"
              className="form-container-input"
            />
          </label>

          <label className="label">
            Seeking <span className="required">*</span>
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
            Academic Year <span className="required">*</span>
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
          <div className="resume-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 3l6 6h-4v6h-4V9H6l6-6zm-6 14h12v2H6v-2z"/>
            </svg>
          </div>
          <p>
            <span className="resume-link">Browse</span> or drag and drop here
          </p>
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
