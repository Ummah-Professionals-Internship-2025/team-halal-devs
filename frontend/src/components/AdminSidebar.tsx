import React from "react";
import { Link } from "react-router-dom";
import {
  FaUserTie,
  FaCalendarAlt,
  FaClipboardCheck,
  FaUsers,
} from "react-icons/fa"; // example icons
import { FaInstagram, FaGlobe, FaLinkedin } from "react-icons/fa";
import logo from "../assets/UP-logo.svg";

const AdminSidebar: React.FC = () => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: 250,
        padding: "1rem",
        backgroundColor: "#00212C",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        fontFamily: "Poppins, sans-serif",
        zIndex: 1000, // Ensure it stays above other content
      }}
    >
      {/* Top Section - Logo */}
      <div style={{ textAlign: "center" }}>
        <img src={logo} alt="Company Logo" width={180} height={60} />
      </div>

      {/* Center Section - Navigation */}
      <div
        style={{
          flex: 0.6,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ul
          style={{
            listStyle: "none",
            padding: 0,
            display: "flex",
            flexDirection: "column",
            gap: "3.5rem", // Increased spacing between links
            width: "100%",
          }}
        >
          <li>
            <Link
              to="/admin/dashboard"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                textDecoration: "none",
                color: "#E7E8EE",
                fontWeight: 500,
                paddingLeft: "2rem",
              }}
            >
              <FaUsers /> Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/admin/events"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                textDecoration: "none",
                color: "#E7E8EE",
                fontWeight: 500,
                paddingLeft: "2rem",
              }}
            >
              <FaCalendarAlt /> Events
            </Link>
          </li>

          <li>
            <Link
              to="/admin/advisors"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                textDecoration: "none",
                color: "#E7E8EE",
                fontWeight: 500,
                paddingLeft: "2rem",
              }}
            >
              <FaUserTie /> Advisors
            </Link>
          </li>
          <li>
            <Link
              to="/admin/follow-ups"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                textDecoration: "none",
                color: "#E7E8EE",
                fontWeight: 500,
                paddingLeft: "2rem",
              }}
            >
              <FaClipboardCheck /> Follow-ups
            </Link>
          </li>
        </ul>
      </div>

      {/* Bottom icons */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "2rem",
          marginTop: "auto",
          paddingBottom: "2rem",
        }}
      >
        <a
          href="https://www.instagram.com/ummahprofessionals"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaInstagram size={15} color="#FFFFFF" />
        </a>
        <a
          href="https://www.ummahprofessionals.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaGlobe size={15} color="#FFFFFF" />
        </a>
        <a
          href="https://www.linkedin.com/company/ummahprofessionals/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaLinkedin size={15} color="#FFFFFF" />
        </a>
      </div>
    </div>
  );
};

export default AdminSidebar;
