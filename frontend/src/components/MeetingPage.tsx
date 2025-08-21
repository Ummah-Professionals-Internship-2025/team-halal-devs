import React from "react";
import { useParams } from "react-router-dom";
import MeetingAvailability from "./MeetingAvailability";
import ErrorPage from "./ErrorPage";

const MeetingPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  if (!id) return <ErrorPage />;

  return <MeetingAvailability meetingId={id} />;
};

export default MeetingPage;
