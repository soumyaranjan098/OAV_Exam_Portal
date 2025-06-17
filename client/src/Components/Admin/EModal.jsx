import React, { useEffect, useState } from "react";
import {
  Card,
  Button,
  Form,
  Row,
  FormLabel,
  FormControl,
  Col,
} from "react-bootstrap";
import { updateExamByID, updateSubExamByID } from "../../Actions/examAction";
import { useDispatch, useSelector } from "react-redux";
import Error from "../Error";

function EModal({ exam, setShow }) {
  const [exam_name, setExam_Name] = useState();
  const [teacher_name, setTeacher_Name] = useState();
  const [exam_date, setExam_Date] = useState();
  const [exam_type, setExam_Type] = useState();
  const [exam_time, setExam_Time] = useState();
  const [examTime, setExamTime] = useState();
  const [year, setYear] = useState();
  const [isActive, setIsActive] = useState();

  const dispatch = useDispatch();
  const updateState = useSelector((state) => state.updateExamByIDReducer);
  const { success, error } = updateState;

  const handleClose = () => {
    setShow(false);
  };

  useEffect(() => {
    if (exam) {
      console.log(exam.exam_time);
      setExam_Name(exam.exam_name);
      setExam_Date(exam.exam_date);
      setExam_Time(exam.exam_time !== undefined ? exam.exam_time : null);
      setExamTime(exam.examTime);
      setExam_Type(
        exam.exam_type !== undefined
          ? exam.exam_type
            ? "true"
            : "false"
          : null
      );
      setTeacher_Name(exam.teacher_name);
      setYear(exam.year);
      setIsActive(exam.isActive ? "true" : "false");
    }
  }, [exam]);

  const submitForm = (e) => {
    e.preventDefault();
    const updatedExam = {
      exam_id: exam._id,
      exam_name: exam_name,
      exam_date: exam_date,
      exam_time: exam_time,
      examTime: examTime,
      exam_type: exam_type === "true" ? true : false,
      teacher_name: teacher_name,
      year: year,
      isActive: isActive === "true" ? true : false,
    };
    // console.log(updatedExam)
    if (exam_type !== null) {
      dispatch(updateExamByID(updatedExam));
    } else {
      dispatch(updateSubExamByID(updatedExam));
    }

    setTimeout(() => {
      handleClose();
    }, 1000);
  };

  return (
    <>
      {success && window.alert("successfully updated...")}
      {error && <Error error={"Something went wrong"} />}
      <div className="mt-5">
        <Card className="Mcard p-2">
          <Form onSubmit={submitForm}>
            <Row className="mb-3">
              <Form.Group>
                <FormLabel>Exam Name</FormLabel>
                <FormControl
                  name="title"
                  value={exam_name || ""}
                  onChange={(e) => setExam_Name(e.target.value)}
                />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group>
                <FormLabel>Teacher Name</FormLabel>
                <FormControl
                  name="title"
                  value={teacher_name || ""}
                  onChange={(e) => setTeacher_Name(e.target.value)}
                />
              </Form.Group>
            </Row>
            <Row className="mb-2">
              <Form.Group as={Col}>
                <FormLabel>Exam Date</FormLabel>
                <FormControl
                  name="title"
                  value={exam_date || ""}
                  onChange={(e) => setExam_Date(e.target.value)}
                />
              </Form.Group>

              {exam_type !== null ? (
                <Form.Group as={Col}>
                  <FormLabel>
                    Exam Type(true for oneByone and false for total time)
                  </FormLabel>
                  <FormControl
                    name="title"
                    value={exam_type || " "}
                    onChange={(e) => setExam_Type(e.target.value)}
                  />
                </Form.Group>
              ) : null}
            </Row>
            <Row className="mb-3">
              {console.log(exam_time)}
              {exam_time !== null ? (
                <Form.Group as={Col}>
                  <FormLabel>Exam Time(in minutes)</FormLabel>
                  <FormControl
                    name="title"
                    value={exam_time || " "}
                    onChange={(e) => setExam_Time(e.target.value)}
                  />
                </Form.Group>
              ) : (
                <Form.Group as={Col}>
                  <FormLabel>Exam Time(in minutes)</FormLabel>
                  <FormControl
                    name="title"
                    value={examTime || " "}
                    onChange={(e) => setExamTime(e.target.value)}
                  />
                </Form.Group>
              )}
              <Form.Group as={Col}>
                <FormLabel>Year Of Student(1st/2nd)yr</FormLabel>
                <FormControl
                  name="title"
                  value={year || ""}
                  onChange={(e) => setYear(e.target.value)}
                />
              </Form.Group>
              <Form.Group as={Col}>
                <FormLabel>isActive</FormLabel>
                <FormControl
                  name="title"
                  value={isActive || ""}
                  onChange={(e) => setIsActive(e.target.value)}
                />
              </Form.Group>
            </Row>
            <br />

            <Button variant="primary" type="submit">
              Update Exam
            </Button>
          </Form>
          <br />

          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Card>
      </div>
    </>
  );
}

export default EModal;
