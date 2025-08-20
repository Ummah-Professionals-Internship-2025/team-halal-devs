import React, { useState } from "react";

interface Props {
  meetingId: string;
}

export default function StudentForm({ meetingId }: Props) {
  const [participantName, setParticipantName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [academicYear, setAcademicYear] = useState("");
  const [industry, setIndustry] = useState("");
  const [seekingService, setSeekingService] = useState("");
  const [resume, setResume] = useState<File | null>(null);
  const [hearAboutService, setHearAboutService] = useState("");
  const [optionalInformation, setOptionalInformation] = useState("");
  const [sendToEmail, setSendToEmail] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    const formData = new FormData();
    formData.append("participant_name", participantName);
    formData.append("email", email);
    formData.append("phone_number", phoneNumber);
    formData.append("academic_year", academicYear);
    formData.append("industry", industry);
    formData.append("seeking_service", seekingService);
    if (resume) formData.append("resume_upload", resume);
    formData.append("hear_about_service", hearAboutService);
    formData.append("optional_information", optionalInformation);
    formData.append("send_to_email", sendToEmail ? "true" : "false");

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}meetings/${meetingId}/students/`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!res.ok) {
        const errData = await res.json();
        setErrorMessage("Submission failed. Please try again.");
        console.error("Submission failed:", errData);
        return;
      }

      setSubmitted(true);

      // Optionally reset form fields
      setParticipantName("");
      setEmail("");
      setPhoneNumber("");
      setAcademicYear("");
      setIndustry("");
      setSeekingService("");
      setResume(null);
      setHearAboutService("");
      setOptionalInformation("");
      setSendToEmail(false);

      const data = await res.json();
      console.log("Submission successful:", data);
    } catch (error) {
      setErrorMessage("Error submitting form. Please try again.");
      console.error("Error submitting form:", error);
    }
  };

  if (submitted) return <h2>Thank you! Your submission has been received.</h2>;

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

      <input
        type="text"
        placeholder="Name"
        value={participantName}
        onChange={(e) => setParticipantName(e.target.value)}
        required
      />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <input
        type="text"
        placeholder="Phone Number"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />

      <input
        type="text"
        placeholder="Academic Year"
        value={academicYear}
        onChange={(e) => setAcademicYear(e.target.value)}
      />

      <input
        type="text"
        placeholder="Industry"
        value={industry}
        onChange={(e) => setIndustry(e.target.value)}
      />

      <input
        type="text"
        placeholder="Seeking Service"
        value={seekingService}
        onChange={(e) => setSeekingService(e.target.value)}
      />

      <input
        type="file"
        onChange={(e) => setResume(e.target.files?.[0] || null)}
      />

      <input
        type="text"
        placeholder="How did you hear about our service?"
        value={hearAboutService}
        onChange={(e) => setHearAboutService(e.target.value)}
      />

      <textarea
        placeholder="Optional Information"
        value={optionalInformation}
        onChange={(e) => setOptionalInformation(e.target.value)}
      />

      <label>
        <input
          type="checkbox"
          checked={sendToEmail}
          onChange={(e) => setSendToEmail(e.target.checked)}
        />
        Send my info to email
      </label>

      <button type="submit">Submit</button>
    </form>
  );
}
