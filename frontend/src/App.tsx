import { useState, useEffect } from "react";
import CreateMeetingForm from "./components/CreateMeetingForm";
import MeetingAvailability from "./components/MeetingAvailability";
import AdminMeetingPage from "./components/AdminMeetingPage";
import ErrorPage from "./components/ErrorPage";
import AllResponsesPage from "./components/AllResponsesPage";

function App() {
  const [view, setView] = useState<
    "create" | "meeting" | "admin" | "all-responses" | "error"
  >("create");
  const [meetingId, setMeetingId] = useState<string | null>(null);

  useEffect(() => {
    const pathParts = window.location.pathname.split("/").filter(Boolean);

    if (pathParts.length === 2 && pathParts[0] === "meeting") {
      setView("meeting");
      setMeetingId(pathParts[1]);
    } else if (
      pathParts.length === 2 &&
      pathParts[0] === "admin" &&
      pathParts[1] === "all-responses"
    ) {
      setView("all-responses");
      setMeetingId(null);
    } else if (
      pathParts.length === 2 &&
      pathParts[0] === "admin" &&
      pathParts[1] !== "all-responses"
    ) {
      setView("admin");
      setMeetingId(pathParts[1]);
    } else if (window.location.pathname === "/") {
      setView("create");
      setMeetingId(null);
    } else {
      setView("error");
      setMeetingId(null);
    }
  }, []);

  return (
    <div>
      <div>
        {view === "create" && <CreateMeetingForm />}
        {view === "meeting" && meetingId && (
          <MeetingAvailability meetingId={meetingId} />
        )}
        {view === "admin" && meetingId && <AdminMeetingPage />}
        {view === "all-responses" && <AllResponsesPage />}
        {view === "error" && <ErrorPage />}
      </div>
    </div>
  );
}

export default App;
