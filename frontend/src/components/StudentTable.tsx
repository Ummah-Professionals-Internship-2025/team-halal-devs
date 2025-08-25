import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import type { GridColDef } from "@mui/x-data-grid";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";

interface Student {
  id: number;
  name: string;
  industry: string;
  signUpDate: string;
  status: "PENDING" | "PAIRED" | "COMPLETED" | "FOLLOW-UP";
}

const columns: GridColDef<Student>[] = [
  { field: "id", headerName: "ID", width: 90 },
  { field: "name", headerName: "Name", flex: 1 },
  { field: "industry", headerName: "Industry", flex: 1 },
  { field: "signUpDate", headerName: "Sign Up Date", width: 180 },
  {
    field: "status",
    headerName: "Status",
    width: 150,
    renderCell: (params) => {
      const status = params.value;
      let variant: "primary" | "secondary" | "success" | "danger" | "warning" =
        "secondary";

      switch (status) {
        case "PENDING":
          variant = "warning";
          break;
        case "PAIRED":
          variant = "primary";
          break;
        case "COMPLETED":
          variant = "success";
          break;
        case "FOLLOW-UP":
          variant = "danger";
          break;
      }

      return <Button variant={variant}>{status}</Button>;
    },
  },
];

// ✅ dummy data for now
const dummyRows: Student[] = [
  {
    id: 1,
    name: "Nafisa Yeasmin",
    industry: "Information Technology",
    signUpDate: "2025-08-20",
    status: "PENDING",
  },
  {
    id: 2,
    name: "Souzen Khan",
    industry: "Business",
    signUpDate: "2025-08-21",
    status: "PAIRED",
  },
  {
    id: 3,
    name: "Arwa Arsalan",
    industry: "Healthcare",
    signUpDate: "2025-08-22",
    status: "COMPLETED",
  },
  {
    id: 4,
    name: "Dur e Khawlah",
    industry: "Finance",
    signUpDate: "2025-08-23",
    status: "FOLLOW-UP",
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
