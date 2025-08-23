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
import MainStudentInfoPage from "./pages/StudentFlow/MainStudentInfoPage";

//REMOVE THESE IMPORTS LATER - THESE COMPONENTS SHOULD GO UNDER 1 STUDENT INFO PAGE
import Calendar from "./components/Calendar";
import TimeDropdown from "./components/TimeDropdown";
import WrapUp from "./components/WrapUp";
import Submit from "./components/Submit";
//END REMOVE

import type { AvailabilityResponse } from "./types";
import SelectAvailability from "./pages/ProfessionalFlow/SelectAvailability";
import ViewAdvisors from "./pages/AdminFlow/ViewAdvisors";
import ViewEvents from "./pages/AdminFlow/ViewEvents";
import ViewFollowUps from "./pages/AdminFlow/ViewFollowUps";
import ViewStudentSubmissions from "./pages/AdminFlow/ViewStudentSubmissions";

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CreateMeetingForm />} />
        {/* <Route path="/admin" element={<AdminMeetingPage />} /> */}
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

        {/* REMOVE THESE ROUTES LATER - THESE COMPONENTS SHOULD GO UNDER 1 STUDENT INFO PAGE */}
        {/* <Route path="/calendar" element={<Calendar />} />
        <Route path="/info" element={<InfoForm />} />
        <Route
          path="/timedropdown"
          element={
            <TimeDropdown
              dates={[]}
              times={[]}
              onChange={function (dateId: number, value: string): void {
                throw new Error("Function not implemented.");
              }}
              values={{}}
            />
          }
        />
        <Route path="/wrapup" element={<WrapUp />} />
        <Route path="/submit" element={<Submit />} /> */}
        {/* END REMOVE */}

        <Route path="/mainstudent" element={<MainStudentInfoPage />} />
        <Route path="/professional" element={<SelectAvailability />} />
        {/* Admin and sub-routes */}
        <Route path="/adminhome" element={<ViewAdvisors />} />
        <Route path="/admin/advisors" element={<ViewAdvisors />} />
        <Route path="/admin/events" element={<ViewEvents />} />
        <Route path="/admin/follow-ups" element={<ViewFollowUps />} />
        <Route
          path="/admin/student-submissions"
          element={<ViewStudentSubmissions />}
        />

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
