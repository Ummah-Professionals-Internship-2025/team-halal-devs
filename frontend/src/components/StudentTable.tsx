import React from "react";
import { useEffect, useState } from "react";

interface Student {
  id: number;
  name: string;
  industry: string;
  // signUpDate: string;
  // status: "PENDING" | "PAIRED" | "COMPLETED" | "FOLLOW-UP";
}

// functions for status, calculations - check which one. loops, switch cases, deps
// aduto generate signupdate

const StudentTable: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  // Use useeffect hook to make fetch req real data from backend when available.
  // pass in the url with the backend url defined for getting any data. useeffect used for 3rd party data coming from backend.
  // also use fetchmethod (native js api). makes netweork req autom on page, can populate with react
  useEffect(() => {
    fetch("http://localhost:8000/api/admin/students/") // Replace with your backend URL
      .then((response) => response.json())
      .then((data) => {
        console.log("API response:", data);
        // Assuming the backend returns an array of students
        const studentsArray = Array.isArray(data)
          ? data
          : data.students || data.results || [];
        setStudents(
          data.map((s: any) => ({
            id: s.id,
            meeting: s.meeting,
            name: s.participant_name || s.full_name,
            email: s.email,
            phone_number: s.phone_number,
            industry: s.industry,
            // signUpDate: s.signUpDate || s.sign_up_date,
            // status: s.status,
            academic_year: s.academic_year,
            seeking_service: s.seeking_service,
            resume_upload: s.resume_upload,
            hear_about: s.hear_about,
            optional_info: s.optional_info,
            send_to_email: s.send_to_email,
            prof_assigned: s.prof_assigned,
            created_at: s.created_at,
          }))
        );

        console.log(students);
      })
      .catch((error) => {
        console.error("Error fetching student data:", error);
      });
  }, []);

  return (
    <div
      style={{
        background: "#F7F8FA",
        borderRadius: "16px",
        padding: "1.5rem",
        marginBottom: "1.5rem",
      }}
    >
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ background: "#E7E8EE" }}>
            <th style={thStyle}>ID</th>
            <th style={thStyle}>Name</th>
            <th style={thStyle}>Industry</th>
            {/* <th style={thStyle}>Sign Up Date</th> */}
            {/* <th style={thStyle}>Status</th> */}
          </tr>
        </thead>
        <tbody>
          {/* mapping thru what backend is sending to frontend */}
          {students.map((s) => (
            <tr key={s.id}>
              <td style={tdStyle}>{s.id}</td>
              <td style={tdStyle}>{s.name}</td>
              <td style={tdStyle}>{s.industry}</td>
              {/* <td style={tdStyle}>{s.signUpDate}</td> */}
              {/* <td style={tdStyle}>{renderStatusBadge(s.status)}</td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const thStyle: React.CSSProperties = {
  textAlign: "left",
  padding: "0.7rem 0.5rem",
  fontWeight: 600,
  color: "#00212C",
  fontSize: "1.05rem",
};

const tdStyle: React.CSSProperties = {
  textAlign: "left",
  padding: "0.7rem 0.5rem",
  fontSize: "1rem",
  color: "#00212C",
  borderBottom: "1px solid #E7E8EE",
};

// const renderStatusBadge = (status: Student["status"]) => {
//   let bg = "#E7E8EE";
//   let color = "#00212C";

//   switch (status) {
//     case "PENDING":
//       bg = "#FFF4E5";
//       color = "#E67E22";
//       break;
//     case "PAIRED":
//       bg = "#E6F0FA";
//       color = "#207ca6";
//       break;
//     case "COMPLETED":
//       bg = "#E9F7EF";
//       color = "#27AE60";
//       break;
//     case "FOLLOW-UP":
//       bg = "#FDECEF";
//       color = "#E74C3C";
//       break;
//   }

// return (
//   <span
//     style={{
//       background: bg,
//       color,
//       padding: "0.3rem 0.8rem",
//       borderRadius: "8px",
//       fontWeight: 600,
//       fontSize: "0.9rem",
//     }}
//   >
//     {status}
//   //   </span>
//   );
// };

export default StudentTable;
