// StudentPairModal.tsx
import React, { useState } from "react";
import { Modal, Button, Card } from "react-bootstrap";
import "./StudentPairModal.css";

interface Student {
  id: number;
  name: string;
  industry: string;
  signUpDate: string;
  status: string;
  email: string;
  phone: string;
  academicYear: string;
  seeking: string;
  resumeUrl: string;
  availability: string[];
}

interface Advisor {
  id: number;
  name: string;
  designation: string;
  industry: string;
  email: string;
}

interface StudentPairModalProps {
  show: boolean;
  onClose: () => void;
  student: Student;
  advisors: Advisor[];
  onAssign: (studentId: number, advisorId: number) => void;
}

const StudentPairModal: React.FC<StudentPairModalProps> = ({
  show,
  onClose,
  student,
  advisors,
  onAssign,
}) => {
  const [selectedAdvisor, setSelectedAdvisor] = useState<number | null>(null);

  const handleConfirm = () => {
    if (selectedAdvisor) {
      onAssign(student.id, selectedAdvisor);
    }
  };

  return (
    <Modal show={show} onHide={onClose} centered size="lg">
      <Modal.Header closeButton className="custom-modal-header">
        <Modal.Title>Assign Professional</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="modal-content-grid">
          {/* Student Info */}
          <div className="student-card">
            <h5 className="section-title">Student Info</h5>
            <p>
              <strong>Name:</strong> {student.name}
            </p>
            <p>
              <strong>Email:</strong> {student.email}
            </p>
            <p>
              <strong>Phone:</strong> {student.phone}
            </p>
            <p>
              <strong>Academic Year:</strong> {student.academicYear}
            </p>
            <p>
              <strong>Seeking:</strong> {student.seeking}
            </p>
            <p>
              <strong>Availability:</strong> {student.availability.join(", ")}
            </p>
            <a
              href={student.resumeUrl}
              target="_blank"
              rel="noreferrer"
              className="resume-link"
            >
              📄 View Resume
            </a>
          </div>

          {/* Advisor List */}
          <div className="advisor-list">
            <h5 className="section-title">Available Advisors</h5>
            {advisors.map((advisor) => (
              <Card
                key={advisor.id}
                className={`advisor-card ${
                  selectedAdvisor === advisor.id ? "selected" : ""
                }`}
                onClick={() => setSelectedAdvisor(advisor.id)}
              >
                <Card.Body>
                  <Card.Title>{advisor.name}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    {advisor.designation}
                  </Card.Subtitle>
                  <p className="mb-1">
                    <strong>Industry:</strong> {advisor.industry}
                  </p>
                  <p className="mb-0">
                    <strong>Email:</strong> {advisor.email}
                  </p>
                </Card.Body>
              </Card>
            ))}
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer className="custom-modal-footer">
        <Button variant="outline-secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button
          variant="success"
          disabled={!selectedAdvisor}
          onClick={handleConfirm}
        >
          Confirm Pairing
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default StudentPairModal;
