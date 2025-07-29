
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./App.css";
import "./CreateMeetingForm.css";
import "bootstrap/dist/css/bootstrap.css";
import "./CreateMeetingForm.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
