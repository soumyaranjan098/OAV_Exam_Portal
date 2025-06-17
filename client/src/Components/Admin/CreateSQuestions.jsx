import React, { useState, useEffect } from "react";
import "./../../Css/Admin.css";
import { Form, Button } from "react-bootstrap";

function Create_S_Questions({ examName, setShow, setExamName }) {
  const [sMark, setSMark] = useState();
  const [lMark, setLMark] = useState();
  const [exam_id, setExamId] = useState();

  const [sQuestion, setSQuestion] = useState([
    {
      sQTitle: "",
      code: "",
    },
  ]);
  const [lQuestion, setLQuestion] = useState([
    {
      lQTitle: "",
    },
  ]);

  const [showsQues, setShowSQues] = useState(false);
  const [showLQues, setShowLQues] = useState(false);

  const toggleSDropdown = () => {
    setShowSQues((prevShow) => !prevShow);
  };

  const toggleLDropdown = () => {
    setShowLQues((prevShow) => !prevShow);
  };

  // Add Short Questions
  const handleAddsQuestions = () => {
    const newSQuestion = {
      sQTitle: "",
      code: "",
    };

    setSQuestion([...sQuestion, newSQuestion]);
  };
  // Add Long Questions
  const handleAddlQuestions = () => {
    const newLQuestion = {
      lQTitle: "",
    };
    setLQuestion([...lQuestion, newLQuestion]);
  };

  const handlesQuestionChange = (index, field, value) => {
    const updatedQuestion = [...sQuestion];
    updatedQuestion[index][field] = value;
    setSQuestion(updatedQuestion);
  };

  const handlelQuestionChange = (index, field, value) => {
    const updatedQuestion = [...lQuestion];
    updatedQuestion[index][field] = value;
    setLQuestion(updatedQuestion);
  };
  // Delete Short Questions
  const handleDeletesQuestion = (index) => {
    const updatedQuestion = [...sQuestion];
    updatedQuestion.splice(index, 1);
    setSQuestion(updatedQuestion);
  };

  // Delete Long Questions
  const handleDeletelQuestion = (index) => {
    const updatedQuestion = [...lQuestion];
    updatedQuestion.splice(index, 1);
    setLQuestion(updatedQuestion);
  };

  const examData = async () => {
    const exam_name = examName;
    try {
      const res = await fetch("/api/exam/getSubExamByName", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          exam_name,
        }),
      });
      const data = await res.json();
      console.log(data);
      setExamId(data._id);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    examData();
  }, []);

  const formSubmit = async (e) => {
    e.preventDefault();
    try {
      const resp = await fetch("/api/question/addNewSQuestion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ exam_id, sQuestion, lQuestion, lMark, sMark }),
      });

      if (resp.status === 201) {
        window.alert("successfully created..");
        setShow(false);
        setExamName("");
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
            <Form className="registerform">
              <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>
                  <h5>Enter Mark For One Question</h5>{" "}
                </Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Mark"
                  value={sMark}
                  onChange={(e) => setSMark(e.target.value)}
                />
              </Form.Group>
            </Form>
            {sQuestion.map((question, index) => (
              <div className="mb-2" key={index}>
                <Form className="registerform">
                  <Form.Group className="mb-3" controlId="formBasicSQName">
                    <Form.Label>
                      <h5>Question {index + 1}</h5>{" "}
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Question Title"
                      value={sQuestion[index].sQTitle}
                      onChange={(e) =>
                        handlesQuestionChange(index, "sQTitle", e.target.value)
                      }
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicCode">
                    <Form.Label>
                      <h5>
                        Enter Code (If there is no code for this question leave
                        it empty)
                      </h5>{" "}
                    </Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      placeholder="Enter Code"
                      value={sQuestion[index].code}
                      onChange={(e) =>
                        handlesQuestionChange(index, "code", e.target.value)
                      }
                    />
                  </Form.Group>
                  <Button
                    variant="danger"
                    bg="danger"
                    onClick={() => handleDeletesQuestion(index)}
                  >
                    DELETE
                  </Button>
                </Form>
              </div>
            ))}
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Button className="m-2" onClick={handleAddsQuestions}>
                ADD
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
            <Form className="registerform">
              <Form.Group className="mb-3" controlId="formBasicMark">
                <Form.Label>
                  <h5>Enter Mark For One Question</h5>{" "}
                </Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Mark"
                  value={lMark}
                  onChange={(e) => setLMark(e.target.value)}
                />
              </Form.Group>
            </Form>
            {lQuestion.map((question, index) => (
              <div key={index}>
                <Form className="registerform">
                  <Form.Group className="mb-3" controlId="formBasicLQName">
                    <Form.Label>
                      <h5>Question {index + 1}</h5>{" "}
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Question Title"
                      value={lQuestion[index].lQTitle}
                      onChange={(e) =>
                        handlelQuestionChange(index, "lQTitle", e.target.value)
                      }
                    />
                  </Form.Group>
                  <Button
                    variant="danger"
                    bg="danger"
                    onClick={() => handleDeletelQuestion(index)}
                  >
                    DELETE
                  </Button>
                </Form>
              </div>
            ))}
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Button className="m-2" onClick={handleAddlQuestions}>
                ADD
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
      <div>
        <Button variant="success" className="m-2" onClick={formSubmit}>
          Submit
        </Button>
      </div>
    </>
  );
}

export default Create_S_Questions;
