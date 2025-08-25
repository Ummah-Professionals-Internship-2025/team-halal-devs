import "./WrapUp.css";
//import * as React from "react";
import { useState } from "react";

export default function WrapUp() {
  const [hearAbout, sethearAbout] = useState("");
  const [otherInfo, setotherInfo] = useState("");

  return (
    <div>
      <div className="info-form"> </div>
      <div>
        <h3 className="meeting-page-title">Additional Information</h3>
        <br></br>
        <label className="label">
          How did you hear about this service?{" "}
          <span className="required">*</span>
          <select
            className="form-container-input"
            value={hearAbout}
            onChange={(e) => sethearAbout(e.target.value)}
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
        />
      </label>
    </div>
  );
}
