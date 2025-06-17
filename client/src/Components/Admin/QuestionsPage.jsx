import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteQuestionById, getAllQuestions } from "../../Actions/examAction";
import Loader from "../Loader";
import Error from "../Error";
import { Table } from "react-bootstrap";
import { FaEdit } from "react-icons/fa";
import { AiTwotoneDelete } from "react-icons/ai";
import QModal from "./QModal";

function QuestionsPage(exam_id) {
  const dispatch = useDispatch();
  const questiondata = useSelector((state) => state.getAllQuestionsReducer);
  const { Questions, loading, error } = questiondata;
  const [questions, setQuestions] = useState(null);
  const updateState = useSelector((state) => state.updateQuestionByIdReducer);
  const { success } = updateState;
  //  console.log(Questions)
  // console.log(exam_id)
  const [show,setShow] = useState(false);
  const [singleQ,setSingleQ] = useState(null);

  const handleShow = (question) => {
    // console.log(question)
    setShow(true);
    setSingleQ(question);
  }

  useEffect(() => {
    dispatch(getAllQuestions(exam_id));
  }, [success]);

  useEffect(() => {
    if (Questions) {
      setQuestions(Questions[0].questions);
    }
  }, [Questions]);

  const handleDeleteQuestion = (QuestionsID, QuestionId) => {
    // console.log(QuestionId);
    const confirmed = window.confirm(
      "Are you sure you want to delete this exam?"
    );
    if (confirmed) {
      dispatch(
        deleteQuestionById({ QuestionsId: QuestionsID, _id: QuestionId })
      );
      // Remove the deleted exam from the state immediately
      setQuestions((prevQuestion) =>
        prevQuestion.filter((quesion) => quesion._id !== QuestionId)
      );
    }
  };

  return (
    <>
      <div>
        {loading && <Loader />}
        {error && <Error />}
        <Table responsive>
          <thead>
            <tr>
              <th>No of quesion</th>
              <th>Questions</th>
              <th>edit/delete</th>
            </tr>
          </thead>
          <tbody>
            {questions  &&
              questions.map((question, index) => (
                <tr key={index}>
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
                        {question.title}
                      </h4>
                      {question.code === undefined || question.code === null || question.code.length ===0 ? null : (
                        <div className="QCdiv">
                          <pre>
                            <code >{question.code}</code>
                          </pre>
                        </div>
                      )}
                      {question.options.map((option, optionIndex) => (
                        <h6 key={optionIndex}>
                          {optionIndex + 1}) {option}
                        </h6>
                      ))}
                      <h6
                        style={{
                          color: "green",
                          textShadow: "2px 3px 2px lightgray",
                        }}
                      >
                        correct answer {question.answer + 1}
                      </h6>
                    </div>
                  </td>
                  <td>
                    <FaEdit
                      onClick={() => handleShow(question)}
                      style={{ fontSize: "1.5rem", color: "darkblue" }}
                    />{" "}
                    /{" "}
                    <AiTwotoneDelete
                      onClick={() =>
                        handleDeleteQuestion(Questions[0]._id, question._id)
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
        <div className='c2'  style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)",zIndex:"2",width: '100%', maxWidth: '700px',marginTop:"2rem" }}>
            {show && <QModal examId={exam_id} setShow={setShow} question={singleQ}/>}
          </div> 
      }
    </>
  );
}

export default QuestionsPage;
