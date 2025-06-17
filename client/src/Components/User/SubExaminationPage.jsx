import React, { useEffect, useState } from "react";
import { getAllSUBQuestions, getSUBExamById } from "../../Actions/examAction";
import { Button, Form } from "react-bootstrap";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch, connect } from "react-redux";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import Loader from "../Loader";

function SubExaminationPage() {
  let timer;
  const examId = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const AllQuestions = useSelector((state) => state.getAllSUBQuestionsReducer);
  const { Questions } = AllQuestions;
  const examstate = useSelector((state) => state.getSUBExamByIdReducer);
  const { Allexam } = examstate;
  const [isExamCompleted, setIsExamCompleted] = useState(false);
  const [shortQuestions, setShortQuestions] = useState(null);
  const [longQuestions, setLonhQuestions] = useState(null);
  const [sanswer, setSAnswer] = useState([]);
  const [lanswer, setLAnswer] = useState([]);
  const [examTime, setExamTime] = useState(null);
  const [remainingTime, setRemainingTime] = useState(null);
  const [completed, setCompleted] = useState(false);
  const [count, setCount] = useState(0);

  ///////////////////// window switching count ////////////////////
  useEffect(() => {
    const examinationPageRegex = new RegExp(`/sexamination/${examId.exam_id}$`);

    if (examinationPageRegex.test(location.pathname)) {
      // console.log("yes")
      // Check for browser compatibility and add event listener for visibility change
      if (typeof document.hidden !== "undefined") {
        document.addEventListener("visibilitychange", handleVisibilityChange);
      }

      // Event handler for visibility change
      function handleVisibilityChange() {
        if (document.hidden) {
          // The window has been switched or minimized
          setCount((c) => c + 1);
          // console.log('Window switched or minimized');
        } else {
          // The window has become visible again
          setCount((c) => c + 1);
          // console.log('Window visible again');
        }
      }

      // Clean up the event listener when the component unmounts
      return () => {
        document.removeEventListener(
          "visibilitychange",
          handleVisibilityChange
        );
      };
    }
  }, [location.pathname, examId.exam_id]);

  useEffect(() => {
    dispatch(getAllSUBQuestions(examId));
    dispatch(getSUBExamById(examId));
  }, [examId, dispatch]);

  const handleGoBack = () => {
    navigate("/home");
  };

  useEffect(() => {
    if ((Questions, Allexam)) {
      setShortQuestions(Questions[0].shortquestions);
      setLonhQuestions(Questions[0].longquestions);
      setSAnswer(new Array(Questions[0].shortquestions.length).fill(null));
      setLAnswer(new Array(Questions[0].longquestions.length).fill(null));
      setExamTime(Allexam.examTime);
    }
  }, [Questions, Allexam]);

  const handleSAnswers = (index, value) => {
    setSAnswer((prevans) => {
      const updatedAnswer = [...prevans];
      updatedAnswer[index] = value;
      return updatedAnswer;
    });
  };

  const handleLAnswers = (index, value) => {
    setLAnswer((prevans) => {
      const updatedAnswer = [...prevans];
      updatedAnswer[index] = value;
      return updatedAnswer;
    });
  };

  const handleSubmit = () => {
    clearTimeout(timer); // Stop the setTimeout
    setCompleted(true);
  };

  const submitExam = async () => {
    // console.log(per)
    await fetch("/api/result/setSubResult", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        exam_id: examId.exam_id,
        sanswer: sanswer,
        lanswer: lanswer,
        isCompleted: completed,
        count: count,
      }),
    });
    setIsExamCompleted(true);
  };

  useEffect(() => {
    if (completed) {
      // let currentTime = new Date();
      // console.log(currentTime);
      submitExam();
      // setIsExamCompleted(true);
    }
  }, [completed]);

  // Submiting exam after specified time

  useEffect(() => {
    if (examTime != null) {
      timer = setTimeout(() => {
        setCompleted(true);
      }, examTime * 60000);
    }
  }, [examTime]);

  // Setting the remaining time for exam
  useEffect(() => {
    if (examTime !== null) {
      // Calculate the end time by adding examTime (in minutes) to the current time
      const endTime = new Date().getTime() + examTime * 60000;

      // Update remaining time every second using setInterval
      const interval = setInterval(() => {
        const remaining = Math.max(
          0,
          Math.floor((endTime - new Date().getTime()) / 1000)
        );
        setRemainingTime(remaining);
      }, 1000);

      // Cleanup function to clear the interval when the component unmounts
      return () => clearInterval(interval);
    }
  }, [examTime]);

  // Helper function to format time
  const formatTime = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <>
      <div className="examdiv">
        {Questions == null ? (
          <Loader />
        ) : isExamCompleted ? (
          <div className="result">
            <h1>Exam is completed</h1>
            <br />
            <Button onClick={handleGoBack}>
              {" "}
              <IoArrowBackCircleSharp />
              Go back to homepage
            </Button>
          </div>
        ) : (
          <div className="allquestiondiv">
            {remainingTime !== null && (
              <div style={{ textAlign: "end", marginBottom: "1rem" }}>
                Remaining Time: {formatTime(remainingTime)} seconds
              </div>
            )}
            <div>
              {shortQuestions &&
                shortQuestions.map((squestion, sindex) => (
                  <div key={sindex}>
                    <div style={{ display: "flex", justifyContent: "end" }}>
                      <h6>{Questions[0].smark}Marks</h6>
                    </div>
                    <Form className="registerform">
                      <Form.Group className="mb-3" controlId="formBasicCode">
                        <Form.Label>
                          <h5>
                            {sindex + 1}): {squestion.sQTitle}
                          </h5>{" "}
                          {squestion.code === undefined ||
                          squestion.code === null ||
                          squestion.code.length === 0 ? null : (
                            <div className="ECdiv">
                              <pre>
                                <code>{squestion.code}</code>
                              </pre>
                            </div>
                          )}
                        </Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={3}
                          placeholder="Enter Answer"
                          onChange={(e) =>
                            handleSAnswers(sindex, e.target.value)
                          }
                        />
                      </Form.Group>
                    </Form>
                  </div>
                ))}
            </div>
            <div>
              {longQuestions &&
                longQuestions.map((lquestion, lindex) => (
                  <div key={lindex}>
                    <div style={{ display: "flex", justifyContent: "end" }}>
                      <h6>{Questions[0].lmark}Marks</h6>
                    </div>
                    <Form className="registerform">
                      <Form.Group className="mb-3" controlId="formBasicCode">
                        <Form.Label>
                          <h5>
                            {lindex + 1}): {lquestion.lQTitle}
                          </h5>{" "}
                        </Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={8}
                          placeholder="Enter Answer"
                          onChange={(e) =>
                            handleLAnswers(lindex, e.target.value)
                          }
                        />
                      </Form.Group>
                    </Form>
                  </div>
                ))}
            </div>
            <div style={{ display: "flex", justifyContent: "end" }}>
              <Button onClick={handleSubmit}>Submit</Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default SubExaminationPage;
