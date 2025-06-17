import React, { useEffect, useState } from "react";
import {
  deleteSubLongQuestionById,
  deleteSubShortQuestionById,
  getAllSUBQuestions,
} from "../../../Actions/examAction";
import { useDispatch, useSelector } from "react-redux";
import { Table } from "react-bootstrap";
import { FaEdit } from "react-icons/fa";
import { AiTwotoneDelete } from "react-icons/ai";
import SQModal from "./SQModal";

function SQuestionsPage({ exam_id }) {
  const dispatch = useDispatch();
  const QuestionData = useSelector((state) => state.getAllSUBQuestionsReducer);
  const { Questions } = QuestionData;
  const updateState = useSelector(
    (state) => state.updateSubShortQuestionByIdReducer
  );
  const { ssuccess } = updateState;
  const lupdateState = useSelector(
    (state) => state.updateSubLongQuestionByIdReducer
  );
  const { lsuccess } = lupdateState;
  const [shortquestions, setShortQuestions] = useState(null);
  const [longquestions, setLongQuestions] = useState(null);
  const [show, setShow] = useState(false);
  const [singleQ, setSingleQ] = useState(null);

  useEffect(() => {
    dispatch(getAllSUBQuestions({ exam_id }));
  }, [lsuccess, ssuccess]);

  useEffect(() => {
    if (Questions && Questions.length > 0 && Questions[0]) {
      setShortQuestions(Questions[0].shortquestions);
      setLongQuestions(Questions[0].longquestions);
    }
  }, [Questions]);

  const handleShow = (question) => {
    // console.log(question)
    setShow(true);
    setSingleQ(question);
  };

  const handleDeleteShortQuestion = (QuestionsID, QuestionId) => {
    // console.log(QuestionId);
    const confirmed = window.confirm(
      "Are you sure you want to delete this exam?"
    );
    if (confirmed) {
      dispatch(
        deleteSubShortQuestionById({
          QuestionsId: QuestionsID,
          _id: QuestionId,
        })
      );
      // Remove the deleted exam from the state immediately
      setShortQuestions((prevQuestion) =>
        prevQuestion.filter((quesion) => quesion._id !== QuestionId)
      );
    }
  };

  const handleDeleteLongQuestion = (QuestionsID, QuestionId) => {
    // console.log(QuestionId);
    const confirmed = window.confirm(
      "Are you sure you want to delete this exam?"
    );
    if (confirmed) {
      dispatch(
        deleteSubLongQuestionById({
          QuestionsId: QuestionsID,
          _id: QuestionId,
        })
      );
      // Remove the deleted exam from the state immediately
      setLongQuestions((prevQuestion) =>
        prevQuestion.filter((quesion) => quesion._id !== QuestionId)
      );
    }
  };

  return (
    <>
      <div>
        <div
          style={{
            fontWeight: "bolder",
            color: "lightseagreen",
            textShadow: "2px 2px 3px green",
          }}
        >
          <h3>Short Questions :)</h3>
          <h3>
            Mark:{" "}
            <span style={{ color: "orangered" }}>
              {Questions?.[0]?.smark ?? "N/A"}
            </span>
          </h3>
        </div>
        <Table responsive>
          <thead>
            <tr>
              <th>No of quesion</th>
              <th>Questions</th>
              <th>edit/delete</th>
            </tr>
          </thead>
          <tbody>
            {shortquestions &&
              shortquestions.map((sques, index) => (
                <tr>
                  <td>{index + 1}</td>
                  <td>
                    <div>
                      <h4
                        style={{
                          color: "blue",
                          textShadow: "2px 3px 2px lightgray",
                          fontFamily: "sans-serif ",
                        }}
                      >
                        {sques.sQTitle}
                      </h4>
                      {sques.code === undefined ||
                      sques.code === null ||
                      sques.code.length === 0 ? null : (
                        <div className="QCdiv">
                          <pre>
                            <code>{sques.code}</code>
                          </pre>
                        </div>
                      )}
                    </div>
                  </td>
                  <td>
                    <FaEdit
                      onClick={() => handleShow(sques)}
                      style={{ fontSize: "1.5rem", color: "darkblue" }}
                    />{" "}
                    /{" "}
                    <AiTwotoneDelete
                      onClick={() =>
                        handleDeleteShortQuestion(Questions[0]._id, sques._id)
                      }
                      style={{ fontSize: "1.5rem", color: "red" }}
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </div>
      {/* For Long Question */}
      <div>
        <div
          style={{
            fontWeight: "bolder",
            color: " orangered",
            textShadow: "2px 2px 3px seagreen",
          }}
        >
          <h3>Long Questions :)</h3>
          <h3>
            Mark:{" "}
            <span style={{ color: "green" }}>
              {Questions?.[0]?.lmark ?? "N/A"}
            </span>
          </h3>
        </div>
        <Table responsive>
          <thead>
            <tr>
              <th>No of quesion</th>
              <th>Questions</th>
              <th>edit/delete</th>
            </tr>
          </thead>
          <tbody>
            {longquestions &&
              longquestions.map((lques, index) => (
                <tr>
                  <td>{index + 1}</td>
                  <td>
                    <div>
                      <h4
                        style={{
                          color: "blue",
                          textShadow: "2px 3px 2px lightgray",
                          fontFamily: "sans-serif ",
                        }}
                      >
                        {lques.lQTitle}
                      </h4>
                    </div>
                  </td>
                  <td>
                    <FaEdit
                      onClick={() => handleShow(lques)}
                      style={{ fontSize: "1.5rem", color: "darkblue" }}
                    />{" "}
                    /{" "}
                    <AiTwotoneDelete
                      onClick={() =>
                        handleDeleteLongQuestion(Questions[0]._id, lques._id)
                      }
                      style={{ fontSize: "1.5rem", color: "red" }}
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </div>
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
            marginTop: "2rem",
          }}
        >
          {show && (
            <SQModal examId={exam_id} setShow={setShow} question={singleQ} />
          )}
        </div>
      }
    </>
  );
}

export default SQuestionsPage;
