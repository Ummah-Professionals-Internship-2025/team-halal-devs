import "./WrapUp.css";
import * as React from "react";
import { useState } from "react";

const [hearAbout, sethearAbout] = useState("");

export default function WrapUp() {
  return (
    <div>
      <div className="info-form">
        <h3 className="meeting-page-title">
          Career Services Applicants, page 3
        </h3>
        <label className="label">
          How did you hear about this service?{" "}
          <span className="required">*</span>
          <select
            className="form-container-input"
            value={hearAbout}
            onChange={(e) => sethearAbout(e.target.value)}
            required
          >
            <option value="">Please select your industry</option>
            <option value="LinkedIn">Accounting</option>
            <option value="Other">Accounting</option>
          </select>
        </label>
      </div>
    </div>
  );
}
