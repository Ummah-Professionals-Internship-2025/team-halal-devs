import React from "react";
import AdminSidebar from "../components/AdminSidebar";

interface Props {
  children: React.ReactNode;
}

const AdminLayout: React.FC<Props> = ({ children }) => {
  return (
    <div style={{ display: "flex" }}>
      <AdminSidebar />
      <div
        style={{
          flex: 1,
          marginLeft: 250, // Match the sidebar width
          padding: "1rem",
          minHeight: "100vh",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;
