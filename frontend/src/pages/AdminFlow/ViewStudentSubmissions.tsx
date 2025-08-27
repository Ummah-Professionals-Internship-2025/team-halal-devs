import React from "react";
import StudentTable from "../../components/StudentTable";

const ViewStudentSubmissions: React.FC = () => {
  return (
    <div className="p-6">
      <StudentTable />
    </div>
  );
};

export default ViewStudentSubmissions;

// import React from "react";
// import StudentTable from "../../components/StudentTable";
// import AdminLayout from "../../components/AdminLayout";

// const ViewStudentSubmissions: React.FC = () => {
//   return (
//     <AdminLayout>
//       <h1>Student Submissions</h1>
//       <StudentTable />
//     </AdminLayout>
//   );
// };

// export default ViewStudentSubmissions;

// ViewStudentSubmissions.tsx
