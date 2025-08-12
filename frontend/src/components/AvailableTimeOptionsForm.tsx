import React, { useState } from "react";
import axios from "axios";

const AvailableTimeOptionsForm: React.FC = () => {
  const [participantName, setParticipantName] = useState("");
  const [email, setEmail] = useState("");
  const [timeOptionIds, setTimeOptionIds] = useState<number[]>([]);
  const meetingId = "09238fff-9837-4f89-bf75-bff8dba24d6e"; // Example meeting ID

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `/api/meetings/${meetingId}/availability-responses/create/`,
        {
          participant_name: participantName,
          email,
          time_option_ids: timeOptionIds, // List of selected time options
        }
      );
      console.log("Response data:", response.data); // Check API response
    } catch (err) {
      console.error("Error submitting form:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Participant Name"
        value={participantName}
        onChange={(e) => setParticipantName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <div>
        {/* Time Options Selection - Example */}
        <label>
          <input
            type="checkbox"
            value="1"
            onChange={(e) =>
              setTimeOptionIds([...timeOptionIds, Number(e.target.value)])
            }
          />
          9:00 AM - 10:00 AM
        </label>
        <label>
          <input
            type="checkbox"
            value="2"
            onChange={(e) =>
              setTimeOptionIds([...timeOptionIds, Number(e.target.value)])
            }
          />
          10:00 AM - 11:00 AM
        </label>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default AvailableTimeOptionsForm;
