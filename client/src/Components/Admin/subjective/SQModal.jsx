import React, { useEffect, useState } from "react";
import {
  Card,
  Button,
  Form,
  Row,
  FormLabel,
  FormControl,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  updateSubLongQuestionById,
  updateSubShortQuestionById,
} from "../../../Actions/examAction";

function SQModal({ question, setShow, examId }) {
  const [sQTitle, setsQTitle] = useState(null);
  const [lQTitle, setlQTitle] = useState(null);
  const [code, setCode] = useState("");

  const dispatch = useDispatch();

  const handleClose = () => {
    setShow(false);
  };

  useEffect(() => {
    if (question) {
      setsQTitle(question.sQTitle !== undefined ? question.sQTitle : null);
      setlQTitle(question.lQTitle !== undefined ? question.lQTitle : null);
      setCode(question.code !== undefined ? question.code : null);
    }
  }, [question]);

  const submitForm = (e) => {
    e.preventDefault();
    // console.log(examId);
    const updatedQuestion = {
      exam_id: examId,
      questionId: question._id,
      sQTitle: sQTitle,
      lQTitle: lQTitle,
      code: code,
    };

    if (updatedQuestion.sQTitle !== null) {
      dispatch(updateSubShortQuestionById(updatedQuestion));
    } else {
      dispatch(updateSubLongQuestionById(updatedQuestion));
    }
    setTimeout(() => {
      handleClose();
    }, 1000);
  };

  return (
    <>
      <div>
        <Card className="Mcard p-2">
          <Form onSubmit={submitForm}>
            {sQTitle !== null ? (
              <Row className="mb-2">
                <Form.Group>
                  <FormLabel>Title</FormLabel>
                  <FormControl
                    name="title"
                    value={sQTitle || ""}
                    onChange={(e) => setsQTitle(e.target.value)}
                  />
                </Form.Group>
              </Row>
            ) : (
              <Row className="mb-2">
                <Form.Group>
                  <FormLabel>Title</FormLabel>
                  <FormControl
                    name="title"
                    value={lQTitle || ""}
                    onChange={(e) => setlQTitle(e.target.value)}
                  />
                </Form.Group>
              </Row>
            )}
            <Row className="mb-2">
              <Form.Group>
                <FormControl
                  as="textarea"
                  name="code"
                  placeholder="Leave this empty if there is no code for this question"
                  value={code || ""}
                  onChange={(e) => setCode(e.target.value)}
                />
              </Form.Group>
            </Row>

            <Button variant="primary" type="submit">
              Update Question
            </Button>
          </Form>

          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Card>
      </div>
    </>
  );
}

export default SQModal;
