import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllQuestions, getExamById } from "../../Actions/examAction";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Loader from "../Loader";
import "./../../Css/ExaminationPage.css";
import { Button } from "react-bootstrap";
import { IoArrowBackCircleSharp } from "react-icons/io5";

const ExaminationPage = () => {
  let timer;
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const AllQuestions = useSelector((state) => state.getAllQuestionsReducer);
  const { Questions } = AllQuestions;
  const getExam = useSelector((state) => state.getExamByIdReducer);
  const { Allexam } = getExam;
  // console.log(Allexam)
  const [isExamCompleted, setIsExamCompleted] = useState(false);
  const [isOn, setIsOn] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [answer, setAnswer] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [examTime, setExamTime] = useState(null);
  const examId = useParams();
  const [completed, setCompleted] = useState(false);
  const [remainingTime, setRemainingTime] = useState(null);
  const [count, setCount] = useState(0);
  //  console.log(examId);

  const submitExam = async () => {
    const per = calculateCorrectPercentage();
    // console.log(per)
    await fetch("/api/result/setResult", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        exam_id: examId.exam_id,
        answers: answer,
        percentage: per,
        count: count,
      }),
    });
    setIsExamCompleted(true);
  };

  useEffect(() => {
    if (completed) {
      let currentTime = new Date();
      console.log(currentTime);
      submitExam();
    }
  }, [completed]);
  // console.log(answer)
  useEffect(() => {
    // let timer;
    if (examTime !== null) {
      // console.log(examTime)
      const time = examTime;
      if (!isOn) {
        //  let currentTime = new Date();
        //  console.log(currentTime);
        timer = setTimeout(() => {
          setCompleted(true);
        }, examTime * 60000); // Submit exam after specified time
      } else {
        timer = setInterval(handleNextQuestion, time * 60000); // Switch to next question every specified time
      }
    }
    return () => {
      clearTimeout(timer);
      clearInterval(timer);
    };
  }, [isOn, questions, examTime, currentIndex]);

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
  }, [examTime, currentIndex]);

  const handleNextQuestion = () => {
    setCurrentIndex((prevIndex) => {
      if (prevIndex === questions.length - 1) {
        clearInterval(timer);
        // submitExam() // Call submitExam when all questions are answered
        setCompleted(true);
      } else {
        // let currentTime = new Date();
        // console.log(currentTime);
        return (prevIndex + 1) % questions.length;
      }
    });
  };

  const submitAllQuestions = () => {
    clearTimeout(timer); // Stop the setTimeout
    setCompleted(true);
  };

  useEffect(() => {
    const examinationPageRegex = new RegExp(`/examination/${examId.exam_id}$`);

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
    dispatch(getAllQuestions(examId));
    dispatch(getExamById(examId));
  }, [dispatch, examId]);

  useEffect(() => {
    if (Allexam && Questions) {
      setIsOn(Allexam.exam_type);
      setQuestions(Questions[0].questions);
      setAnswer(new Array(Questions[0]?.questions.length).fill(null));
      setExamTime(Allexam.exam_time);
    }
  }, [Allexam, Questions]);

  const handleOptionSelect = (index, optionIndex) => {
    // console.log(index,optionIndex);
    setAnswer((prevAnswer) => {
      // console.log(prevAnswer)
      const updatedAnswer = [...prevAnswer];
      updatedAnswer[index] = optionIndex;
      // console.log(updatedAnswer)
      return updatedAnswer;
    });
  };

  const calculateCorrectPercentage = () => {
    const totalQuestions = questions.length;
    const correctAnswers = answer.filter(
      (answer, index) => answer === questions[index].answer
    ).length;
    // console.log(correctAnswers);
    const percentage = (correctAnswers / totalQuestions) * 100;
    return percentage.toFixed(2);
  };

  const handleGoBack = () => {
    navigate("/home");
  };

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
            <h2>Your Result : {calculateCorrectPercentage()}%</h2>
            <br />
            <Button onClick={handleGoBack}>
              {" "}
              <IoArrowBackCircleSharp />
              Go back to homepage
            </Button>
          </div>
        ) : !isOn ? (
          <div className="allquestiondiv">
            {/* Display remaining time in allquestiondiv */}
            {remainingTime !== null && (
              <div style={{ textAlign: "end", marginBottom: "1rem" }}>
                Remaining Time: {formatTime(remainingTime)} seconds
              </div>
            )}
            {questions &&
              questions.map((quesion, index) => (
                <div className="allq" key={index}>
                  <h3>
                    {index + 1}) {quesion?.title}
                  </h3>
                  {quesion.code === undefined ||
                  quesion.code === null ||
                  quesion.code.length === 0 ? null : (
                    <div className="ECdiv">
                      <pre>
                        <code>{quesion.code}</code>
                      </pre>
                    </div>
                  )}
                  {quesion?.options.map((option, optionIndex) => (
                    <div style={{ marginLeft: "2rem" }} key={optionIndex}>
                      <label key={optionIndex} className="leb">
                        <input
                          type="radio"
                          name={`option-${index}`}
                          value={optionIndex}
                          checked={answer[index] === optionIndex}
                          onChange={() =>
                            handleOptionSelect(index, optionIndex)
                          }
                        />
                        {option}
                      </label>
                      <br />
                    </div>
                  ))}
                </div>
              ))}
            {/* <input type='submit' onClick={submitExam}/> */}
            <div style={{ display: "flex", justifyContent: "end" }}>
              <Button onClick={submitAllQuestions}>Submit</Button>
            </div>
          </div>
        ) : (
          <div className="singlequestiondiv">
            {remainingTime !== null && (
              <div style={{ textAlign: "end", marginBottom: "1rem" }}>
                Remaining Time: {remainingTime} seconds
              </div>
            )}
            <h3>
              {currentIndex + 1}) {questions[currentIndex]?.title}
            </h3>
            {questions[currentIndex]?.options.map((option, optionIndex) => (
              <div style={{ marginLeft: "2rem" }} key={optionIndex}>
                <label className="lev" key={optionIndex}>
                  <input
                    type="radio"
                    name={`question-${currentIndex}`}
                    value={optionIndex}
                    checked={answer[currentIndex] === optionIndex}
                    onChange={() =>
                      handleOptionSelect(currentIndex, optionIndex)
                    }
                  />
                  {option}
                </label>
                <br />
              </div>
            ))}
            <div style={{ display: "flex", justifyContent: "end" }}>
              {currentIndex === questions.length - 1 ? (
                <Button onClick={() => setCompleted(true)}>Submit</Button>
              ) : (
                <Button onClick={handleNextQuestion}>Next</Button>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ExaminationPage;
