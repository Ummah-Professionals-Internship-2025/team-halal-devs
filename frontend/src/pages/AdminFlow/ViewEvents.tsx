import React from "react";
import AdminCalendar from "../../components/AdminCalendar";
const ViewEvents: React.FC = () => {
  return (
    <div className="p-6">
      <AdminCalendar />
    </div>
  );
};

export default ViewEvents;

// import React from "react";
// import AdminCalendar from "../../components/AdminCalendar";
// import AdminLayout from "../../components/AdminLayout";

// const ViewEvents: React.FC = () => {
//   return (
//     <AdminLayout>
//       <h1 className="student-page-title">Events List</h1>
//       <div className="schedule-step">
//         <AdminCalendar />
//       </div>
//     </AdminLayout>
//   );
// };

// export default ViewEvents;
