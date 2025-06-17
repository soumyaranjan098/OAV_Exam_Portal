import React, { useState } from "react";
import { Row, Col, Button, ButtonGroup } from "react-bootstrap";
import AllStudents from "../Components/Admin/AllStudents";
import CreateExam from "../Components/Admin/CreateExam";
import "./../Css/Admin.css";
import Register from "../Components/Admin/Register";
import AllExams from "../Components/Admin/AllExam";
import AllESubjective from "../Components/Admin/AllESubjective";

function AdminScreen() {
  const [currentComponet, setCurrentComponent] = useState(<AllStudents />);
  return (
    <>
      <div className="admin">
        <Row className="row">
          <h1 className="h">Admin Panel</h1>
          <Col md={2}>
            <ButtonGroup vertical style={{ minHeight: "400px" }}>
              <Button onClick={() => setCurrentComponent(<Register />)}>
                Create Students
              </Button>
              <Button onClick={() => setCurrentComponent(<AllStudents />)}>
                All Stuedents
              </Button>
              <Button onClick={() => setCurrentComponent(<CreateExam />)}>
                Create Exam
              </Button>
              <Button onClick={() => setCurrentComponent(<AllExams />)}>
                All Exams (Objective)
              </Button>
              <Button onClick={() => setCurrentComponent(<AllESubjective />)}>
                All Exams (Subjective)
              </Button>
            </ButtonGroup>
          </Col>
          <Col md={9}>{currentComponet}</Col>
        </Row>
      </div>
    </>
  );
}

export default AdminScreen;
