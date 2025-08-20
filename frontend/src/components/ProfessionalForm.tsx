import React, { useState } from "react";

interface Props {
  meetingId: string;
}

export default function ProfessionalForm({ meetingId }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [industry, setIndustry] = useState("");
  const [role, setRole] = useState("");
  const [optionalInfo, setOptionalInfo] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setSubmitted(false);

    const formData = new FormData();
    formData.append("participant_name", name);
    formData.append("email", email);
    formData.append("phone_number", phoneNumber);
    formData.append("industry", industry);
    formData.append("role", role);
    formData.append("optional_information", optionalInfo);

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}meetings/${meetingId}/professionals/`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!res.ok) {
        const errData = await res.json();
        console.error("Submission failed:", errData);
        setErrorMessage("Submission failed. Please check your input.");
        return;
      }

      setSubmitted(true);
      setName("");
      setEmail("");
      setPhoneNumber("");
      setIndustry("");
      setRole("");
      setOptionalInfo("");
      console.log("Professional submission successful!");
    } catch (error) {
      console.error("Error submitting professional form:", error);
      setErrorMessage("An error occurred. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
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
        placeholder="Industry"
        value={industry}
        onChange={(e) => setIndustry(e.target.value)}
      />
      <input
        type="text"
        placeholder="Job Title / Role"
        value={role}
        onChange={(e) => setRole(e.target.value)}
      />
      <textarea
        placeholder="More About You"
        value={optionalInfo}
        onChange={(e) => setOptionalInfo(e.target.value)}
      />
      <button type="submit">Submit</button>

      {submitted && <p style={{ color: "green" }}>Submission successful!</p>}
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
    </form>
  );
}
