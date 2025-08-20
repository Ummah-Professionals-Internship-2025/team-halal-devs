import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useParams,
} from "react-router-dom";
import CreateMeetingForm from "./components/CreateMeetingForm";
import AdminMeetingPage from "./components/AdminMeetingPage";
import AllResponsesPage from "./components/AllResponsesPage";
import MeetingAvailability from "./components/MeetingAvailability";
import AvailableTimeOptionsForm from "./components/AvailableTimeOptionsForm";
import InfoForm from "./components/InfoForm";
import ErrorPage from "./components/ErrorPage";
import AvailabilityResponsesTable from "./components/AvailabilityResponsesTable";
import MeetingDetails from "./components/MeetingDetails";
import MeetingPage from "./components/MeetingPage";
import ApiTester from "./components/TestComponent";

import type { AvailabilityResponse } from "./types";

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CreateMeetingForm />} />
        <Route path="/admin" element={<AdminMeetingPage />} />
        <Route path="/responses" element={<AllResponsesPage />} />
        <Route path="/meeting/:id" element={<MeetingAvailabilityWrapper />} />
        <Route
          path="/meeting/:id/responses"
          element={<AvailabilityResponsesTableWrapper />}
        />
        <Route
          path="/availability-form"
          element={<AvailableTimeOptionsForm />}
        />
        <Route path="/info" element={<InfoForm />} />
        <Route
          path="/meeting/:id/details"
          element={<MeetingDetailsWrapper />}
        />
        <Route path="/test-api" element={<ApiTester />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
};

const MeetingAvailabilityWrapper: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  if (!id) return <ErrorPage />;
  return <MeetingAvailability meetingId={id} />;
};

const MeetingDetailsWrapper: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  if (!id) return <ErrorPage />;
  return <MeetingDetails meetingId={id} />;
};

const AvailabilityResponsesTableWrapper: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [responses, setResponses] = React.useState<AvailabilityResponse[]>([]);

  React.useEffect(() => {
    if (!id) return;
    fetch(
      `${import.meta.env.VITE_API_URL}meetings/${id}/availability-responses/`
    )
      .then((res) => res.json())
      .then((data: AvailabilityResponse[]) => setResponses(data));
  }, [id]);

  if (!id) return <ErrorPage />;
  return <AvailabilityResponsesTable meetingId={id} responses={responses} />;
};

export default AppRouter;
