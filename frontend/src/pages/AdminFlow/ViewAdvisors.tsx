import React from "react";
import AdminLayout from "../../components/AdminLayout";
import AdvisorTable from "../../components/AdvisorTable"; // ✅ import with correct file name

const ViewAdvisors: React.FC = () => {
  return (
    <AdminLayout>
      <h1 className="student-page-title">Advisors Availability</h1>
      <AdvisorTable /> {/* ✅ render the table */}
    </AdminLayout>
  );
};

export default ViewAdvisors;
