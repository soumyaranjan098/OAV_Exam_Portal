import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import "../../../Css/Admin.css";

function AddSQuestion({ exam_id }) {
  const initialSQuestion = {
    sQTitle: "",
    code: "",
  };

  const initialLQuestion = {
    lQTitle: "",
  };

  const [sQuestion, setSQuestion] = useState(initialSQuestion);
  const [lQuestion, setLQuestion] = useState(initialLQuestion);

  const [showsQues, setShowSQues] = useState(false);
  const [showLQues, setShowLQues] = useState(false);

  const toggleSDropdown = () => {
    setShowSQues((prevShow) => !prevShow);
  };

  const toggleLDropdown = () => {
    setShowLQues((prevShow) => !prevShow);
  };

  const handlesSQuestionChange = (value) => {
    setSQuestion({ ...sQuestion, sQTitle: value });
  };

  const handlesCodeChange = (value) => {
    setSQuestion({ ...sQuestion, code: value });
  };

  const handlelQuestionChange = (value) => {
    setLQuestion({ ...lQuestion, lQTitle: value });
  };

  const SformSubmit = async (e) => {
    e.preventDefault();
    try {
      const resp = await fetch("/api/question/insertSubSQuestion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ exam_id, sQuestion }),
      });

      if (resp.status === 200) {
        window.alert("successfully created..");
        setSQuestion(initialSQuestion);
      } else {
        window.alert("error occured..");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const LformSubmit = async (e) => {
    e.preventDefault();
    try {
      const resp = await fetch("/api/question/insertSubLQuestion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ exam_id, lQuestion }),
      });

      if (resp.status === 200) {
        window.alert("successfully created..");
        setLQuestion(initialLQuestion);
      } else {
        window.alert("error occured..");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="sQues">
        <div className="dropdown-container" onClick={toggleSDropdown}>
          Click here to Add Short Questions.
          <div className={`arrow-symbol ${showsQues ? "down" : "up"}`}></div>
        </div>
        {showsQues && (
          <div className="sQuestion">
            <div className="mb-2">
              <Form className="registerform">
                <Form.Group className="mb-3" controlId="formBasicSQName">
                  <Form.Label>
                    <h5>Question</h5>{" "}
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Question Title"
                    value={sQuestion.sQTitle}
                    onChange={(e) => handlesSQuestionChange(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCode">
                  <Form.Label>
                    <h5>
                      Enter Code (If there is no code for this question leave it
                      empty)
                    </h5>{" "}
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Enter Code"
                    value={sQuestion.code}
                    onChange={(e) => handlesCodeChange(e.target.value)}
                  />
                </Form.Group>
              </Form>
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Button variant="success" className="m-2" onClick={SformSubmit}>
                Submit
              </Button>
              {/* <Button variant='success' className='m-2' >Submit</Button> */}
              <Button
                variant="secondary"
                className="m-2"
                onClick={() => setShowSQues((prevShow) => !prevShow)}
              >
                Close
              </Button>
            </div>
          </div>
        )}
      </div>

      <div className="lQues">
        <div className="dropdown-container" onClick={toggleLDropdown}>
          Click here to Add Long Questions.
          <div className={`arrow-symbol ${showLQues ? "down" : "up"}`}></div>
        </div>
        {showLQues && (
          <div className="lQuestion">
            <div>
              <Form className="registerform">
                <Form.Group className="mb-3" controlId="formBasicLQName">
                  <Form.Label>
                    <h5>Question</h5>{" "}
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Question Title"
                    value={lQuestion.lQTitle}
                    onChange={(e) => handlelQuestionChange(e.target.value)}
                  />
                </Form.Group>
              </Form>
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Button variant="success" className="m-2" onClick={LformSubmit}>
                Submit
              </Button>
              {/* <Button variant='success' className='m-2' onClick={{}}>Submit</Button> */}
              <Button
                variant="secondary"
                className="m-2"
                onClick={() => setShowLQues((prevShow) => !prevShow)}
              >
                Close
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default AddSQuestion;
