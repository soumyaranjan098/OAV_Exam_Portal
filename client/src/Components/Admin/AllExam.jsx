import React, { useEffect, useState } from 'react';
import { deleteExamById, getAllExams, updateIsActive } from '../../Actions/examAction';
import { useSelector, useDispatch } from 'react-redux';
import Loader from '../Loader';
import Error from '../Error';
import { Table, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { AiTwotoneDelete } from 'react-icons/ai';
import { FaEdit } from "react-icons/fa";
import EModal from './EModal';

function AllExams() {
  const [exam, setExam] = useState(null);
  const [selectedClass, setSelectedClass] = useState(9);
  const [show, setShow] = useState(false);
  const [singleE, setSingleE] = useState(null);

  const dispatch = useDispatch();
  const examState = useSelector((state) => state.getExamReducer);
  const { loading, error, Allexam } = examState;

  const activeState = useSelector((state) => state.updateIsActiveReducer);
  const updateState = useSelector((state) => state.updateExamByIDReducer);
  const { success } = activeState;
  const { succ } = updateState;

  const handleShow = (exam) => {
    setShow(true);
    setSingleE(exam);
  };

  useEffect(() => {
    dispatch(getAllExams());
  }, [dispatch, success, succ]);

  useEffect(() => {
    if (Allexam && Allexam.length > 0) {
      const filtered = Allexam
        .filter((exam) => exam.year === selectedClass)
        .sort((a, b) => new Date(b.exam_date) - new Date(a.exam_date)); // optional: latest first
      setExam(filtered);
    }
  }, [Allexam, selectedClass]);

  const handleDeleteExam = (examId) => {
    const confirmed = window.confirm("Are you sure you want to delete this exam?");
    if (confirmed) {
      dispatch(deleteExamById({ exam_id: examId }));
      setExam((prev) => prev.filter((exam) => exam._id !== examId));
    }
  };

  const handleActive = (exam_id) => {
    dispatch(updateIsActive({ exam_id }));
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
      {error && <Error error="Error While Fetching Exams" />}

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
          {exam &&
            exam.map((exam, index) => (
              <tr key={exam._id}>
                <td>{index + 1}</td>
                <td>
                  <Link to={`/admin/dashboard/ExamPage/${exam._id}`}>{exam.exam_name}</Link>
                </td>
                <td>{exam.exam_date}</td>
                <td>
                  {exam.exam_type === true ? "One By One" : "Total Time"} (Time: {exam.exam_time}m)
                </td>
                <td>
                  {exam.isActive ? "Activated" : (
                    <Button onClick={() => handleActive(exam._id)}>Activate</Button>
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

      {show && (
        <div className="c2" style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)", zIndex: "2", width: "100%", maxWidth: "700px" }}>
          <EModal setShow={setShow} exam={singleE} />
        </div>
      )}
    </>
  );
}

export default AllExams;
