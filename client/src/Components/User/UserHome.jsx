import React, { useState } from "react";
import {
  Navbar,
  Container,
  Nav,
  ToggleButton,
  ToggleButtonGroup,
} from "react-bootstrap";
import "./../../Css/ExaminationPage.css";
import ObjectivePage from "./ObjectivePage";
import SubjectiveTest from "./SubjectiveTest";

function UserHome() {
  const [state, setState] = useState(<ObjectivePage />);

  return (
    <>
      <div>
        <Navbar bg="dark" variant="dark" expand="lg">
          <Container>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto">
                <ToggleButtonGroup type="radio" name="options" defaultValue={1}>
                  <ToggleButton
                    variant="dark"
                    id="tbg-radio-1"
                    value={1}
                    onClick={() => setState(<ObjectivePage />)}
                  >
                    MCQ Test
                  </ToggleButton>
                  <ToggleButton
                    variant="dark"
                    id="tbg-radio-2"
                    value={2}
                    onClick={() => setState(<SubjectiveTest />)}
                  >
                    Subjective Test
                  </ToggleButton>
                </ToggleButtonGroup>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <div>{state}</div>
      </div>
    </>
  );
}

export default UserHome;
