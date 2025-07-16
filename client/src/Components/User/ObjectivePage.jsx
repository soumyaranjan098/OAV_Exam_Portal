import React, { useEffect, useState } from 'react';
import { Button, Table,Modal, Row } from 'react-bootstrap';
import { getAllExamsByYear } from '../../Actions/examAction';
import { useSelector, useDispatch } from 'react-redux';
import Loader from '../Loader';
import Error from '../Error';
import { useNavigate } from 'react-router-dom';
import { getResultByUserIds } from '../../Actions/examAction';
import { getAllQuestions } from '../../Actions/examAction';
import "./../../Css/ExaminationPage.css"


function ObjectivePage() {

    const dispatch = useDispatch();
    const examState = useSelector((state) => state.getAllExamsByYearReducer);
    const { loading, error, Allexam } = examState;
    const navigate = useNavigate();
  
    const [results, setResults] = useState({});
    const [answers,setAnswers] = useState({});
  
    const UserData = useSelector((state) => state.getResultByUserIdsReducer);
    const {Results} = UserData;
    const QuestionsData = useSelector((state) => state.getAllQuestionsReducer);
    const { Questions } = QuestionsData;
  
    const [show, setShow] = useState(false);
    const [selectedExamId, setSelectedExamId] = useState(null);
    const [revered,setReversed] = useState();
  
    const handleReviewClick = (examId) => {
      setSelectedExamId(examId);
      setShow(true);
    };
    
  const handleReviewClose = () => {
    setShow(false);
  };
  
  useEffect(()=>{
    if(selectedExamId !== null){
      dispatch(getAllQuestions({"exam_id":selectedExamId}));
    }
  },[selectedExamId,dispatch])
  
  
    /////////////////////////// Fetching All exam details //////////////////
  
    useEffect(() => {
      dispatch(getAllExamsByYear());
    }, [dispatch]);
  
  
    ////////////////////////////   Fetching Students Result/////////////////////
    useEffect(()=>{
      if(Allexam){
        const user_ids = Allexam.map((exam)=> exam._id);
        dispatch(getResultByUserIds(user_ids))
      }
    },[Allexam,dispatch])
    
    ///////////////////////         Getting the results Array     ////////////////////
    useEffect(()=>{
      if(Allexam && Results){
        const examResult={};
        const answerData = {};
        const arr = Allexam.reverse();
        setReversed(arr);
        arr.forEach((exam)=>{
          const result = Results.find((result)=> {
            if(result === null){
              return null;
            }else{
              return result.exam_id === exam._id;
            }
           
          })
          examResult[exam._id] = result ? result.percentage : null;
          answerData[exam._id] = result ? result.answers : null;
        });
        //  console.log(examResult)
        // console.log(answerData)
        setResults(examResult);
        setAnswers(answerData);
      }
    },[Allexam,Results])
  //  console.log(results)

  
  return (
    <>
    {loading && <Loader />}
        {error && <Error error="Error While Fetching Users" />}
        <div className='userHome' style={{ paddingTop:"4rem", backgroundColor:"white",minHeight:"92vh" }}>
        <Table responsive>
          <thead>
            <tr>
              <th>Exam Name</th>
              <th>Teacher Name</th>
              <th>Exam Date</th>
              <th>Start Exam</th>
              <th>Result</th>
              <th>Review Answers</th>
            </tr>
          </thead>
          <tbody>
            {revered !== undefined &&
              revered.map((exam) => (
                exam.isActive ? (
                  <tr key={exam._id}>
                    <td>{exam.exam_name}</td>
                    <td>{exam.teacher_name}</td>
                    <td>{exam.exam_date}</td>
                    <td>
                      {results[exam._id] === null ? (
                        <Button onClick={() => navigate(`/examination/${exam._id}`)}>Start</Button>
                      ) : (
                        "Completed"
                      )}
                    </td>
                    <td>{results[exam._id] === null ? 'Not Available' : results[exam._id]}</td>
                    <td>{results[exam._id] === null ? 'Not Available' : <Button onClick={() => handleReviewClick(exam._id)}>Review</Button>}</td>
                  </tr>
                ) : null
              ))}
          </tbody>

        </Table>
      </div>
      {/* {showReviewModal && <ReviewResult exam_id={{"exam_id":selectedExamId}} answers={answers} handleClose={handleReviewClose} />} */}
      {show && 
        <Modal
        size="lg"
         show={show}
         onHide={handleReviewClose}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>
          Review your answers. 
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {Questions &&
           Questions[0].questions.map((question,index)=>(
            <div key={index} style={{boxShadow:"2px 2px 5px gray",marginBottom:"1rem",padding:"1rem"}}>
              <Row>
                <h4 style={{color:"blue",textShadow:"2px 3px 2px lightgray",fontFamily:"sans-serif "}}>{index+1} : {question.title}</h4>
                {question.code === undefined || question.code === null || question.code.length ===0 ? null : (
                        <div className="ECdiv mb-2 mt-2">
                          <pre>
                            <code >{question.code}</code>
                          </pre>
                        </div>
                      )}
                {question.options.map((option,optionIndex)=>{
                  const isCorrect = question.answer === optionIndex;
                  const isAnswered = answers[selectedExamId] !== undefined ? answers[selectedExamId][index] === optionIndex : null;
                  return(
                    <div>
                      <h5 key={optionIndex} style={{color : isCorrect ? "green" : isAnswered ? "red" : "inherit"}}>{option}</h5>
                    </div>
                  )
                })}
                
                 {answers[selectedExamId] !== undefined &&  answers[selectedExamId][index] ===null ? (
          <h6 style={{color:"red"}}>Not answered</h6>
        ) : null} 
        {/* {answers[selectedExamId] !== undefined ? console.log(answers[selectedExamId]) : null} */}
              </Row>
            </div>
           ))
           }
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleReviewClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>}
    </>
  )
}

export default ObjectivePage