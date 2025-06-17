import React, { useState } from "react";
import {
  Navbar,
  Container,
  Nav,
  Button,
  ToggleButton,
  ToggleButtonGroup,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import SQuestionsPage from "./SQuestionsPage";
import { useParams } from "react-router-dom";
import SResults from "./SResult";
import "./../../../Css/Admin.css";
import AddSQuestion from "./AddSQuestion";

function SExamPage() {
  const examID = useParams();
  const { exam_id } = examID;
  const [state, setState] = useState(<SQuestionsPage exam_id={exam_id} />);

  return (
    <>
      <div
        style={{
          backgroundColor: "lightcyan",
          minHeight: "92vh",
          width: "100%",
        }}
      >
        <Navbar bg="dark" variant="dark" className="mb-5" expand="lg">
          <Container>
            <LinkContainer to={"/admin/dashboard"}>
              <Navbar.Brand>{"<-Back"}</Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto">
                <ToggleButtonGroup type="radio" name="options" defaultValue={1}>
                  <ToggleButton
                    id="tbg-radio-1"
                    variant="dark"
                    value={1}
                    onClick={() =>
                      setState(<SQuestionsPage exam_id={exam_id} />)
                    }
                  >
                    Questions
                  </ToggleButton>
                  <ToggleButton
                    id="tbg-radio-2"
                    variant="dark"
                    value={2}
                    onClick={() => setState(<AddSQuestion exam_id={exam_id} />)}
                  >
                    Add New Question
                  </ToggleButton>
                  <ToggleButton
                    id="tbg-radio-3"
                    variant="dark"
                    value={3}
                    onClick={() => setState(<SResults exam_id={exam_id} />)}
                  >
                    Student Marks
                  </ToggleButton>
                </ToggleButtonGroup>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <div className="exd">{state}</div>
      </div>
    </>
  );
}

export default SExamPage;
