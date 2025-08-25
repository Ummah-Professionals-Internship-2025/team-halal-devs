import React from "react";
import AdminSidebar from "../components/AdminSidebar";

interface Props {
  children: React.ReactNode;
}

const AdminLayout: React.FC<Props> = ({ children }) => {
  return (
    <div style={{ display: "flex" }}>
      <AdminSidebar />
      <div style={{ flex: 1, padding: "1rem" }}>{children}</div>
    </div>
  );
};

export default AdminLayout;
