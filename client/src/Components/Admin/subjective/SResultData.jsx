import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSUBQuestions } from "../../../Actions/examAction";
import { Button, Modal, Row, Form } from "react-bootstrap";
import { setSubMark } from "../../../Actions/examAction";

function SResultData({
  student,
  s_count,
  sanswers,
  lanswers,
  exam_id,
  percentage,
  resId
}) {
  const dispatch = useDispatch();
  const QuestionData = useSelector((state) => state.getAllSUBQuestionsReducer);
  const { Questions } = QuestionData;
  const [sresults, setSResults] = useState([]);
  const [lresults, setLResults] = useState([]);

  const [show, setShow] = useState(false);
 
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    if (sanswers !== null) {
      setSResults(sanswers.map(() => ({ res: null, rmark: null })));
    }
    if (lanswers !== null) {
      setLResults(lanswers.map(() => ({ res: null, rmark: null })));
    }
  }, [sanswers, lanswers]);
  

  useEffect(() => {
    dispatch(getAllSUBQuestions(exam_id));
  }, [exam_id, dispatch]);

  const handleSResults = (index, field, value) => {
    setSResults((prevResults) =>
      prevResults.map((result, i) =>
        i === index ? { ...result, [field]: value } : result
      )
    );
  };
  
  const handleLResults = (index, field, value) => {
    setLResults((prevResults) =>
      prevResults.map((result, i) =>
        i === index ? { ...result, [field]: value } : result
      )
    );
  };
  

  const calculatePercentage = (sresults, lresults,smark,lmark) => {
    const sTotalMark = sresults.reduce((acc, cur) => acc + parseFloat(cur.res || 0), 0);
    const lTotalMark = lresults.reduce((acc, cur) => acc + parseFloat(cur.res || 0), 0);
    const totalPossibleMark = (sresults.length * smark) + (lresults.length * lmark);
    const per = ((sTotalMark + lTotalMark) / totalPossibleMark ) * 100;
    return per;
  };
  

  const handleSubmit = () => {
    const percentage = calculatePercentage(sresults,lresults,Questions[0].smark,Questions[0].lmark)
    // submitResult()
    const data = {
      _id : resId,
      sq_marks: sresults,
      lq_marks: lresults,
      percentage: percentage
    }
    dispatch(setSubMark(data))
  };

  // const submitResult = () => {
  //   const percentage = calculatePercentage(sresults,lresults,Questions[0].smark,Questions[0].lmark)
  //   const resp = fetch('/api/result/setSubMarks',{
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       sresults,lresults,percentage
  //     }),
  //   })
  // }

  return (
    <>
      <tr style={{ fontSize: "1.1rem" }}>
        <td>{student.name}</td>
        <td>{student.registration_no}</td>
        <td>{percentage !== null ? percentage : "Not Available"}%</td>
        <td>{s_count !== null ? s_count : "Not Available"}</td>
        <td>
          {sanswers !== null && lanswers !== null ? (
            <Button onClick={handleShow}>Check</Button>
          ) : (
            "Not Available"
          )}
        </td>
      </tr>

      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            <h2 style={{ color: "darkblue" }}>
              Please submit the marks before close.
            </h2>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* {loading && <Loader/>}
        {error && <Error/>} */}

          <div>
            <h3>Short Questions (2 marks for each question)</h3>
            {Questions && Questions.length>0 &&
              Questions[0].shortquestions.map((squestion, sindex) => (
                <div>
                  {sanswers !== null && sanswers[sindex] !== null ? (
                    <div
                      key={sindex}
                      style={{
                        boxShadow: "2px 2px 5px gray",
                        marginBottom: "1rem",
                        padding: "1rem",
                        overflowWrap: "break-word",
                      }}
                    >
                      <Row>
                        <h4
                          style={{
                            color: "blue",
                            textShadow: "2px 3px 2px lightgray",
                            fontFamily: "sans-serif ",
                          }}
                        >
                          ({sindex + 1}): {squestion.sQTitle}
                        </h4>
                        {squestion.code === undefined ||
                        squestion.code === null ||
                        squestion.code.length === 0 ? null : (
                          <div className="ECdiv mb-2 mt-2">
                            <pre>
                              <code>{squestion.code}</code>
                            </pre>
                          </div>
                        )}
                        <div
                          style={{
                            padding: "1rem",
                            backgroundColor: "wheat",
                          }}
                        >
                          <p>{sanswers[sindex]}</p>
                        </div>
                        <div
                          key={sindex}
                          style={{
                            marginTop: "1rem",
                          }}
                        >
                          <Form
                            className="registerform"
                            style={{
                              display: "flex",
                              flexWrap: "wrap",
                              justifyContent: "space-around",
                            }}
                          >
                            <Form.Group
                              className="mb-1"
                              controlId="formBasicCode"
                            >
                              <Form.Label>
                                <h5>Give Mark</h5>{" "}
                              </Form.Label>
                              <Form.Control
                                rows={2}
                                placeholder="Enter marks"
                                onChange={(e) =>
                                  handleSResults(sindex, 'res', e.target.value)
                                }
                              />
                            </Form.Group>
                            <Form.Group
                              className="mb-1"
                              controlId="formBasicCode"
                            >
                              <Form.Label>
                                <h5>Give Review</h5>
                              </Form.Label>
                              <Form.Control
                                as="textarea"
                                rows={2}
                                placeholder="Enter Remarks"
                                onChange={(e) =>
                                  handleSResults(
                                    sindex,
                                    'rmark',
                                    e.target.value
                                  )
                                }
                              />
                            </Form.Group>
                          </Form>
                        </div>
                      </Row>
                    </div>
                  ) : (
                    "Not answerd"
                  )}
                </div>
              ))}
          </div>
          <div>
            <h3>Long Questions (8 marks for one question)</h3>
            {Questions && Questions.length>0 &&
              Questions[0].longquestions.map((lquestion, lindex) => (
                <div key={lindex}>
                  {lanswers !== null && lanswers[lindex] !== null ? (
                    <div
                      key={lindex}
                      style={{
                        boxShadow: "2px 2px 5px gray",
                        marginBottom: "1rem",
                        padding: "1rem",
                        overflowWrap: "break-word",
                      }}
                    >
                      <Row>
                        <h4
                          style={{
                            color: "blue",
                            textShadow: "2px 3px 2px lightgray",
                            fontFamily: "sans-serif ",
                          }}
                        >
                          ({lindex + 1}): {lquestion.lQTitle}
                        </h4>

                        <div
                          style={{
                            padding: "1rem",
                            backgroundColor: "wheat",
                          }}
                        >
                          <p>{lanswers[lindex]}</p>
                        </div>
                        <div
                          key={lindex}
                          style={{
                            marginTop: "1rem",
                          }}
                        >
                          <Form
                            className="registerform"
                            style={{
                              display: "flex",
                              flexWrap: "wrap",
                              justifyContent: "space-around",
                            }}
                          >
                            <Form.Group
                              className="mb-1"
                              controlId="formBasicCode"
                            >
                              <Form.Label>
                                <h5>Give Mark</h5>{" "}
                              </Form.Label>
                              <Form.Control
                                rows={2}
                                placeholder="Enter marks"
                                value={lresults.res}
                                onChange={(e) =>
                                  handleLResults(lindex, 'res', e.target.value)
                                }
                              />
                            </Form.Group>
                            <Form.Group
                              className="mb-1"
                              controlId="formBasicCode"
                            >
                              <Form.Label>
                                <h5>Give Review</h5>
                              </Form.Label>
                              <Form.Control
                                as="textarea"
                                rows={2}
                                placeholder="Enter Remarks"
                                onChange={(e) =>
                                  handleLResults(
                                    lindex,
                                    'rmark',
                                    e.target.value
                                  )
                                }
                              />
                            </Form.Group>
                          </Form>
                        </div>
                      </Row>
                    </div>
                  ) : (
                    "Not Answered"
                  )}
                </div>
              ))}
            <Button onClick={handleSubmit}>Submit</Button>
          </div>
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

export default SResultData;
