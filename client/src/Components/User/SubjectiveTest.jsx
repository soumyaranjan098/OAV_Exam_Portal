import React, { useEffect, useState } from "react";
import { Button, Table,Modal } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllSUBExamsByYear,
  getSubResultByUserIds,
  getAllSUBQuestions
} from "../../Actions/examAction";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader";
import Error from "../Error";

function SubjectiveTest() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const examdata = useSelector((state) => state.getAllSUBExamsByYearReducer);
  const { loading, error, Allexam } = examdata;
  const ResultData = useSelector((state) => state.getSubResultByUserIdsReducer);
  const { Results } = ResultData;
  const [revered, setReversed] = useState();
  const [results, setResults] = useState({});
  const [completed, setCompleted] = useState({});
  const [show, setShow] = useState(false);
  const [selectedExamId, setSelectedExamId] = useState(null);
  const QuestionData = useSelector((state) => state.getAllSUBQuestionsReducer);
  const { Questions } = QuestionData;
  const [totalmark,setTotalmark] = useState();
  const [outof,setOutOf] = useState();

  const handleReviewClick = (examId) => {
    setSelectedExamId(examId);
    setShow(true);
  };
  
const handleReviewClose = () => {
  setShow(false);
};

useEffect(()=>{
  if(selectedExamId !== null){
    dispatch(getAllSUBQuestions({"exam_id":selectedExamId}));
  }
},[selectedExamId,dispatch])

  useEffect(() => {
    dispatch(getAllSUBExamsByYear());
  }, [dispatch]);


  /////////////////////////// Fetching results of each user///////////////////


  useEffect(() => {
    if (Allexam) {
      const exam_ids = Allexam.map((exam) => exam._id); // here the exam_ids is an array of exam_id
      // console.log(exam_ids);
      dispatch(getSubResultByUserIds(exam_ids));
    }
  }, [Allexam, dispatch]);

  ///////////////////////         Getting the results Array     ////////////////////
  useEffect(() => {
    if (Allexam && Results) {
      // console.log(Results)
      const examResult = {};
      const isCompleted = {};
      const arr = Allexam.reverse();
      setReversed(arr);
      arr.forEach((exam) => {
        const result = Results.find((result) => {
          if (result === null) {
            return null;
          } else {
            return result.exam_id === exam._id;
          }
        });
        examResult[exam._id] = result ? result.percentage : null;
        isCompleted[exam._id] = result ? result.isCompleted : null;
      });
      //  console.log(examResult)
      // console.log(answerData)
      setResults(examResult);
      setCompleted(isCompleted);
    }
  }, [Allexam, Results]);

  useEffect(()=>{
    if(Results &&
    Questions &&
    Results.length > 0 &&
    Questions.length > 0 &&
    Results[0] &&
    Questions[0]){
      // console.log(Results[0])
      const sTotalMark = Results[0].sq_marks.reduce((acc, cur) => acc + parseFloat(cur.res || 0), 0);
      const lTotalMark = Results[0].lq_marks.reduce((acc, cur) => acc + parseFloat(cur.res || 0), 0);
      const totalPossibleMark = (Results[0].sq_marks.length * Questions[0].smark) + (Results[0].lq_marks.length * Questions[0].lmark);
      setTotalmark(sTotalMark+lTotalMark);
      setOutOf(totalPossibleMark);
    }
  },[Results,Questions])

  return (
    <>
      {loading && <Loader />}
      {error && <Error error="Error While Fetching Users" />}
      <div
        className="userHome"
        style={{
          paddingTop: "4rem",
          backgroundColor: "white",
          minHeight: "92vh",
        }}
      >
        <Table responsive>
          <thead>
            <tr>
              <th>Exam Name</th>
              <th>Teacher Name</th>
              <th>Exam Date</th>
              <th>Start Exam</th>
              <th>Result</th>
              <th>Review marks</th> 
            </tr>
          </thead>
          <tbody>
            {revered !== undefined &&
              revered.map((exam) =>
                exam.isActive ? (
                  <tr key={exam._id}>
                    <td>{exam.exam_name}</td>
                    <td>{exam.teacher_name}</td>
                    <td>{exam.exam_date}</td>
                    <td>
                      {completed[exam._id] === null ? (
                        <Button
                          onClick={() => navigate(`/sexamination/${exam._id}`)}
                        >
                          Start
                        </Button>
                      ) : (
                        "Completed"
                      )}
                    </td>
                    <td>
                      {results[exam._id] === null
                        ? "Not Available"
                        : results[exam._id]}%
                    </td>
                    <td>
                    {results[exam._id] === null ? 'Not Available' : <Button onClick={() => handleReviewClick(exam._id)}>Review</Button>}
                    </td>
                  </tr>
                ) : null
              )}
          </tbody>
        </Table>
      </div>
      {show && 
        <Modal
        size="lg"
         show={show}
         onHide={handleReviewClose}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>
             Subjective Examination Result 
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
          <h2 style={{color:"red"}} >Short Questions (Each question has 2 marks)</h2><hr></hr>
          {
            Questions &&
            Questions[0] &&
            Results &&
            Results[0] &&
            Results[0].short_q_answers &&
            Questions[0].shortquestions &&
            Questions[0].shortquestions.map((sq,index)=>(
              <div>
              <h3 style={{color:"blue",textShadow:"2px 3px 2px lightgray",fontWeight:"bold",fontFamily:"sans-serif "}}>{index+1} : {sq.sQTitle}</h3>
                {sq.code === undefined || sq.code === null || sq.code.length ===0 ? null : (
                <div className="ECdiv mb-2 mt-2">
                <pre>
                  <code>
                    {sq.code}
                  </code>
                </pre>
                </div>
                )}
                <div style={{
                            padding: "1rem",
                            color:"#102C57",
                            backgroundColor: "#DFCCFB",
                            // textShadow:"1px 0.5px 1px gray",
                            fontSize:"1.2rem"
                          }}>
                  <p>
                    {Results[0].short_q_answers[index]}
                  </p>
                </div>
                <h5 style={{color:"#313866",textShadow:"1px 0.5px 1px gray",fontWeight:"bold",}}>Mark : {Results[0].sq_marks[index].res}</h5>
                <p><span style={{color:"#313866",textShadow:"1px 0.5px 1px gray",fontWeight:"bold"}}>Remarks : </span>{Results[0].sq_marks[index].rmark}</p>
              </div>
            ))
          }
          </div><br></br>
          <div>
          <h2 style={{color:"red"}} >Long Questions (Each question has 8 marks)</h2><hr></hr>
          {
             Questions &&
            Questions[0] &&
            Results &&
            Results[0] &&
            Results[0].long_q_answers &&
            Questions[0].longquestions &&
            Questions[0].longquestions.map((lq,index)=>(
              <div>
              <h3 style={{color:"blue",textShadow:"2px 3px 2px lightgray",fontWeight:"bold",fontFamily:"sans-serif "}}>{index+1} : {lq.lQTitle}</h3>
                <div style={{
                            padding: "1rem",
                            color:"#102C57",
                            backgroundColor: "#FFF3DA",
                            // textShadow:"1px 0.5px 1px gray",
                            fontSize:"1.2rem"
                          }}>
                  <p>
                    {Results[0].long_q_answers[index]}
                  </p>
                </div>
                <h5 style={{color:"#313866",textShadow:"1px 0.5px 1px gray",fontWeight:"bold",}}>Mark : {Results[0].lq_marks[index].res}</h5>
                <p><span style={{color:"#313866",textShadow:"1px 0.5px 1px gray",fontWeight:"bold"}}>Remarks : </span>{Results[0].lq_marks[index].rmark}</p>
              </div>
            ))
          }
          </div>
          <div>
            <h3 style={{color:"Green",textShadow:"1px 2px 2px gray"}}>You Secured {totalmark} Out of {outof}</h3>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleReviewClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>}
    </>
  );
}

export default SubjectiveTest;
