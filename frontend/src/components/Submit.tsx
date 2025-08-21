import "./Submit.css";
import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import FormGroup from "@mui/material/FormGroup";
import Checkbox from "@mui/material/Checkbox";

const Submit: React.FC = () => {
  return (
    <div className="submit-step">
      <h3 className="meeting-page-title">
        Career Services Applicants, page 4 (remove this title from Submit.tsx)
      </h3>

      <br />

      <FormControl>
        <FormLabel id="email-copy-label">
          Would you like a copy of this form sent to your email?
        </FormLabel>
        <RadioGroup
          row
          aria-labelledby="email-copy-label"
          name="row-radio-buttons-group"
        >
          <FormControlLabel value="yes" control={<Radio />} label="Yes" />
          <FormControlLabel value="no" control={<Radio />} label="No" />
        </RadioGroup>
      </FormControl>

      <br />

      <FormGroup>
        <FormControlLabel
          required
          control={<Checkbox />}
          label="By submitting I confirm that I will be punctual and respectful of the scheduled meeting time."
        />
      </FormGroup>
    </div>
  );
};

export default Submit;
