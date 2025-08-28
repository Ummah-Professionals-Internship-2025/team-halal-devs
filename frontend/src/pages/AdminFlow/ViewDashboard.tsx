import React from "react";
import StudentTable from "../../components/StudentTable";
import AdminLayout from "../../components/AdminLayout";

const ViewDashboard: React.FC = () => {
  return (
    <AdminLayout>
      <h1>Student Submissions</h1>
      <StudentTable />
    </AdminLayout>
  );
};

export default ViewDashboard;
