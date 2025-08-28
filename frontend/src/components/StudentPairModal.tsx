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

interface Professional {
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
  profs: Professional[];
  onAssign: (studentId: number, profId: number) => void;
}

const StudentPairModal: React.FC<StudentPairModalProps> = ({
  show,
  onClose,
  student,
  profs,
  onAssign,
}) => {
  const [selectedProfessional, setSelectedProfessional] = useState<
    number | null
  >(null);

  const handleConfirm = () => {
    if (selectedProfessional) {
      onAssign(student.id, selectedProfessional);
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

          {/* Professionals List */}
          <div className="Professionals-list">
            <h5 className="section-title">Available Professionals</h5>
            {profs.map((prof) => (
              <Card
                key={prof.id}
                className={`prof-card ${
                  selectedProfessional === prof.id ? "selected" : ""
                }`}
                onClick={() => setSelectedProfessional(prof.id)}
              >
                <Card.Body>
                  <Card.Title>{prof.name}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    {prof.designation}
                  </Card.Subtitle>
                  <p className="mb-1">
                    <strong>Industry:</strong> {prof.industry}
                  </p>
                  <p className="mb-0">
                    <strong>Email:</strong> {prof.email}
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
          disabled={!selectedProfessional}
          onClick={handleConfirm}
        >
          Confirm Pairing
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default StudentPairModal;
