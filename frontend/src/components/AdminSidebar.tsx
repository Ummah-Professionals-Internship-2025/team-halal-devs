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
        width: 250,
        padding: "1rem",
        backgroundColor: "#00212C",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between", // makes bottom icons stick at the bottom
        fontFamily: "Poppins, sans-serif",
      }}
    >
      {/* Top Section */}
      <div>
        <div style={{ textAlign: "center" }}>
          <img src={logo} alt="Company Logo" width={120} height={40} />
        </div>
        <ul
          style={{
            listStyle: "none",
            padding: 0,
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem", // spacing between links
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
          justifyContent: "space-around",
          marginTop: "auto",
        }}
      >
        <a
          href="https://www.instagram.com/ummahprofessionals"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaInstagram size={22} color="#FFFFFF" />
        </a>
        <a
          href="https://www.ummahprofessionals.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaGlobe size={22} color="#FFFFFF" />
        </a>
        <a
          href="https://www.linkedin.com/company/ummahprofessionals/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaLinkedin size={22} color="#FFFFFF" />
        </a>
      </div>
    </div>
  );
};

export default AdminSidebar;
