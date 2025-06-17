import React, { useEffect, useState } from 'react';
import { Card, Button, Form, Row, FormLabel, FormControl } from 'react-bootstrap';
import { updateQuestionById } from '../../Actions/examAction';
import { useDispatch,useSelector } from 'react-redux';

function QModal({ question, setShow,examId }) {
  const [title, setTitle] = useState('');
  const[code,setCode] = useState('');
  const [questionData, setQuestionData] = useState({});

  const dispatch = useDispatch();

  const handleClose = () => {
    setShow(false);
  };

  useEffect(() => {
    if (question) {
      setTitle(question.title);
      setCode(question.code)
      setQuestionData(question);
    }
  }, [question]);

  const handleQuestionChange = (field, value) => {
    setQuestionData((prevQuestionData) => ({
      ...prevQuestionData,
      [field]: value,
    }));
  };

  

  const handleOptionChange = (optionIndex, value) => {
    setQuestionData((prevQuestionData) => {
      const updatedOptions = [...prevQuestionData.options];
      updatedOptions[optionIndex] = value;
      return {
        ...prevQuestionData,
        options: updatedOptions,
      };
    });
  };

  const submitForm = (e) => {
    e.preventDefault();
    const updatedQuestion = {
        exam_id : examId.exam_id,
        questionId : question._id,
        title : title,
        code : code,
        options : questionData.options,
        answer : questionData.answer
    }

    dispatch(updateQuestionById(updatedQuestion));
    setTimeout(()=>{
      handleClose();
    },1000)
  }

  return (
    <>
      <div >
        <Card className="Mcard p-2">
          <Form onSubmit={submitForm}>
            <Row className="mb-2">
              <Form.Group>
                <FormLabel>Title</FormLabel>
                <FormControl
                  name="title"
                  value={title || ''}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Form.Group>
            </Row>
            <Row className="mb-2">
              <Form.Group>
                <FormControl
                  as= "textarea"
                  name="code"
                  placeholder='Leave this empty if there is no code for this question'
                  value={code || ''}
                  onChange={(e) => setCode(e.target.value)}
                />
              </Form.Group>
            </Row>
            <Row className="mb-2">
              <Form.Group>
                <FormLabel>Options</FormLabel>
                {questionData.options &&
                  questionData.options.map((option, optionIndex) => (
                    <FormControl
                      className='mb-1'
                      key={optionIndex}
                      value={option}
                      onChange={(e) => handleOptionChange(optionIndex, e.target.value)}
                    />
                  ))}
              </Form.Group>
            </Row>
            <Row className="mb-2">
              <Form.Group>
                <FormLabel>Correct Answer</FormLabel>
                <Form.Select
                  value={questionData.answer || ''}
                  onChange={(e) => handleQuestionChange('answer', parseInt(e.target.value))}
                >
                  {questionData.options &&
                    questionData.options.map((_, optionIndex) => (
                      <option key={optionIndex} value={optionIndex}>
                        Option {optionIndex + 1}
                      </option>
                    ))}
                </Form.Select>
              </Form.Group>
            </Row>
            <Button variant="primary" type="submit">
              Update Question
            </Button>
          </Form>

          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Card>
      </div>
    </>
  );
}

export default QModal;
