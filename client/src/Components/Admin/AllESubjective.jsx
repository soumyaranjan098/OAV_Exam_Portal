import { useEffect, useState } from "react";
import { Button, Form, Table } from "react-bootstrap";
import { AiTwotoneDelete } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  deleteSubExamById,
  getAllSubExams,
  updateSubIsActive,
} from "../../Actions/examAction";
import Error from "../Error";
import Loader from "../Loader";
import EModal from "./EModal";

function AllESubjective() {
  let c = 1;
  const [exam, setExam] = useState(null);
  const [selectedClass, setSelectedClass] = useState(9);
  const dispatch = useDispatch();
  const examState = useSelector((state) => state.getSUBExamReducer);
  const activeState = useSelector((state) => state.updateSubIsActiveReducer);
  const { success } = activeState;
  const { loading, error, Allexam } = examState;
  const [show, setShow] = useState(false);
  const [singleE, setSingleE] = useState(null);
  const updateState = useSelector((state) => state.updateSubExamByIDReducer);
  const { succ } = updateState;

  const handleShow = (exam) => {
    // console.log(question)
    setShow(true);
    setSingleE(exam);
  };

  useEffect(() => {
    dispatch(getAllSubExams());
  }, [dispatch, success, succ]);

  useEffect(() => {
    if (Allexam && Allexam.length > 0) {
      const filtered = Allexam.filter(
        (exam) => exam.year === selectedClass
      ).sort((a, b) => new Date(b.exam_date) - new Date(a.exam_date)); // optional: latest first
      setExam(filtered);
    }
  }, [Allexam, selectedClass]);

  const handleDeleteExam = (examId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this exam?"
    );
    if (confirmed) {
      dispatch(deleteSubExamById({ exam_id: examId }));
      setExam((prev) => prev.filter((exam) => exam._id !== examId));
    }
  };

  const handleActive = (exam_id) => {
    dispatch(updateSubIsActive({ exam_id: exam_id }));
  };
  return (
    <>
      <Form.Select
        aria-label="Select class"
        value={selectedClass}
        onChange={(e) => setSelectedClass(Number(e.target.value))}
        style={{ margin: "1rem", width: "200px" }}
      >
        <option value="9">9th</option>
        <option value="10">10th</option>
        <option value="11">11th</option>
        <option value="12">12th</option>
      </Form.Select>

      <h1>Exam List</h1>
      <h5>Click on the Exam Name to view exam details.</h5>
      {loading && <Loader />}
      {error && <Error error="Error While Fetching Users" />}
      <Table responsive>
        <thead>
          <tr>
            <th>Exam Number</th>
            <th>Exam Name</th>
            <th>Date</th>
            <th>Exam Type and Time</th>
            <th>isActive</th>
            <th>Edit/Delete Exam</th>
          </tr>
        </thead>
        <tbody>
          {exam !== null &&
            exam.map((exam) => (
              <tr key={exam._id}>
                <td>{c++}</td>
                <td>
                  <Link to={`/admin/dashboard/SExamPage/${exam._id}`}>
                    {exam.exam_name}
                  </Link>
                </td>
                <td>{exam.exam_date}</td>
                <td>
                  {exam.exam_type === true ? "One By One" : "Total Time"} (Time:
                  {exam.examTime}/m)
                </td>
                <td>
                  {exam.isActive ? (
                    "Activated"
                  ) : (
                    <Button onClick={() => handleActive(exam._id)}>
                      Activate
                    </Button>
                  )}
                </td>
                <td>
                  <FaEdit
                    onClick={() => handleShow(exam)}
                    style={{ fontSize: "1.5rem", color: "darkblue" }}
                  />{" "}
                  /{" "}
                  <AiTwotoneDelete
                    style={{ color: "red", fontSize: "1.5rem" }}
                    onClick={() => handleDeleteExam(exam._id)}
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      {
        <div
          className="c2"
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: "2",
            width: "100%",
            maxWidth: "700px",
          }}
        >
          {show && <EModal setShow={setShow} exam={singleE} />}
        </div>
      }
    </>
  );
}

export default AllESubjective;
