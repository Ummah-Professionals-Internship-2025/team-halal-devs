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
      <FormControl>
        <FormLabel className="label">
          Would you like a copy of this form sent to your email?
        </FormLabel>
        <FormGroup className="indented-group">
          <RadioGroup
            row
            aria-labelledby="email-copy-label"
            name="row-radio-buttons-group"
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
            required
            control={<Checkbox />}
            className="confirmation-label"
            label={
              <>
                By submitting, I confirm that I will be punctual and respectful
                of the scheduled meeting time.
                <span className="label-required">*</span>
              </>
            }
          />
        </FormGroup>
      </FormGroup>
    </div>
  );
};

export default Submit;
