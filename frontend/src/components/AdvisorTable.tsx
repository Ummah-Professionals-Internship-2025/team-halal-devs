import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import type { GridColDef } from "@mui/x-data-grid";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";

interface Advisor {
  id: number;
  name: string;
  designation: string;
  industry: string;
  email: string;
}

const columns: GridColDef<Advisor>[] = [
  { field: "name", headerName: "Name", flex: 1 },
  { field: "designation", headerName: "Designation", flex: 1 },
  { field: "industry", headerName: "Industry", flex: 1 },
  { field: "email", headerName: "Email", width: 180 },
];

const dummyRows: Advisor[] = [
  {
    id: 1,
    name: "Nafisa Yeasmin",
    industry: "Information Technology",
    email: "nafisa@example.com",
    designation: "Software Engineer",
  },
  {
    id: 2,
    name: "Souzen Khan",
    industry: "Business",
    email: "souzen@example.com",
    designation: "Business Analyst",
  },
  {
    id: 3,
    name: "Arwa Arsalan",
    industry: "Healthcare",
    email: "arwa@example.com",
    designation: "Healthcare Consultant",
  },
  {
    id: 4,
    name: "Dur e Khawlah",
    industry: "Finance",
    email: "dur@example.com",
    designation: "Financial Analyst",
  },
];

const StudentTable: React.FC = () => {
  return (
    <div style={{ height: 500, width: "100%" }}>
      <DataGrid
        rows={dummyRows}
        columns={columns}
        pageSizeOptions={[5, 10, 25]}
        initialState={{
          pagination: { paginationModel: { pageSize: 5 } },
        }}
        disableRowSelectionOnClick
      />
    </div>
  );
};

export default StudentTable;
