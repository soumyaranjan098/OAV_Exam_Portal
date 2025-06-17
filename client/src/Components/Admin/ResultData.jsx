import React, { useEffect, useState } from 'react';
import { Button, Modal, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getAllQuestions } from '../../Actions/examAction';


function ResultData({ student, percentage, exam_id, answers, s_count }) {
  // console.log(exam_id)
  const dispatch = useDispatch();
  const QuestionsData = useSelector((state) => state.getAllQuestionsReducer);
  const { Questions } = QuestionsData;

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    dispatch(getAllQuestions(exam_id));
  }, [exam_id, dispatch]);

  return (
    <>
      <tr style={{fontSize:"1.1rem"}}>
        <td>{student.name}</td>
        <td>{student.registration_no}</td>
        <td>{percentage !== null ? percentage : 'Not Available' }</td>
        <td>{s_count !== null ? s_count : "Not Available"}</td>
        <td>
          {answers !== null ? <Button onClick={handleShow}>Review</Button> : "Not Available"}
        </td>
      </tr>

      <Modal size="lg" show={show} onHide={handleClose} >
        <Modal.Header closeButton>
          <Modal.Title>Correct Answer is displayed in <span style={{color:"green"}}>Green colour</span> and worng answer given by Student is displayed in <span style={{color:"red"}}>Red colour</span>  </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {/* {loading && <Loader/>}
        {error && <Error/>} */}
          {Questions &&
            Questions[0].questions.map((question, index) => (
              <div key={index} style={{boxShadow:"2px 2px 5px gray",marginBottom:"1rem",padding:"1rem",overflowWrap:"break-word"}}>
                <Row>
                  <h4 style={{color:"blue",textShadow:"2px 3px 2px lightgray",fontFamily:"sans-serif "}}>({index + 1}): {question.title}</h4>
                  {question.code === undefined || question.code === null || question.code.length ===0 ? null : (
                        <div className="ECdiv mb-2 mt-2">
                          <pre>
                            <code >{question.code}</code>
                          </pre>
                        </div>
                      )}
                  {question.options.map((option, optionIndex) => {
                    const isCorrect = question.answer === optionIndex;
                    const isAnswered = answers !== null ? answers[index] === optionIndex : null;

                    return (
                      <div key={optionIndex}>
                        <h5 style={{ color: isCorrect ? 'green' : isAnswered ? 'red' : 'inherit' }}>
                          {option}
                        </h5>
                      </div>
                    );
                  })}
                  {/* {console.log(answers !== null ? answers[index]===null? "ys": "no" : null)} */}
                  {answers !== null && answers[index] ===null ? (
                  <h6 style={{color:"red"}}>Not answered</h6>
                ) : null } 
                </Row>
              </div>
            ))}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ResultData;
