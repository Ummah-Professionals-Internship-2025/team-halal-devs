import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";
import { FaBell, FaUserCircle } from "react-icons/fa";

const AdminLayout: React.FC = () => {
  const location = useLocation();

  // Map routes -> titles
  const getPageTitle = () => {
    if (location.pathname.includes("dashboard")) return "Dashboard";
    if (location.pathname.includes("events")) return "Events";
    if (location.pathname.includes("advisors")) return "Advisors";
    if (location.pathname.includes("followups")) return "Follow-ups";
    return "Admin";
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main content */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {/* Header */}
        <header
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "1rem",
            borderBottom: "1px solid #ddd",
            backgroundColor: "#fff",
          }}
        >
          <h1 style={{ fontSize: "1.5rem", margin: 0 }}>{getPageTitle()}</h1>

          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            {/* Search */}
            <input
              type="text"
              placeholder="Search..."
              style={{
                padding: "0.5rem",
                border: "1px solid #ccc",
                borderRadius: "8px",
              }}
            />

            {/* Icons */}
            <FaBell size={22} style={{ cursor: "pointer" }} />
            <FaUserCircle size={24} style={{ cursor: "pointer" }} />
          </div>
        </header>

        {/* Page content */}
        <main style={{ flex: 1, padding: "1rem" }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
