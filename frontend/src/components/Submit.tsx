import "./Submit.css";
import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import FormGroup from "@mui/material/FormGroup";
import Checkbox from "@mui/material/Checkbox";

interface SubmitProps {
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

const Submit: React.FC<SubmitProps> = ({ formData, setFormData }) => {
  const [confirmed, setConfirmed] = React.useState(false);

  const handleEmailCopyChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value === "yes";
    if (setFormData) {
      setFormData((prev) => ({ ...prev, send_to_email: value }));
    }
  };

  return (
    <div className="submit-step">
      <FormControl>
        <FormLabel className="label">
          Would you like a copy of this form sent to your email?
        </FormLabel>
        <FormGroup className="indented-group">
          <RadioGroup
            row
            aria-labelledby="email-copy-label"
            name="row-radio-buttons-group"
            value={formData?.send_to_email ? "yes" : "no"}
            onChange={handleEmailCopyChange}
          >
            <FormControlLabel value="yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="no" control={<Radio />} label="No" />
          </RadioGroup>
        </FormGroup>
      </FormControl>

      <br />
      <br />
      <br />

      <FormGroup>
        <FormLabel className="label">
          Confirm and submit your application
        </FormLabel>
        <FormGroup className="indented-group">
          <FormControlLabel
            // required  <-- remove this
            control={
              <Checkbox
                checked={confirmed}
                onChange={(e) => setConfirmed(e.target.checked)}
              />
            }
            className="confirmation-label"
            label={
              <>
                By submitting, I confirm that I will be punctual and respectful
                of the scheduled meeting time.
                {!confirmed && <span className="label-required">*</span>}
              </>
            }
          />
        </FormGroup>
      </FormGroup>
    </div>
  );
};

export default Submit;
