import React, { useState } from 'react'
import {Container,Form,Button,ToggleButton,ToggleButtonGroup} from 'react-bootstrap'
import CreateQuestionForm from './CreateQuestion';
import CreateSQuestions from './CreateSQuestions';

function CreateExam() {
    const [examName,setExamName] = useState("");
    const [examYear,setExamYear] = useState("");
    const [show,setShow] = useState(false)
    const [radioValue, setRadioValue] = useState(false);
    const [objval,setObjVal] = useState(true);
    const [time,setTime] = useState(null);
    const [examDate,setExamDate] = useState()
    const [examtime,setExamtime] = useState(null);
    // console.log(radioValue)
    // const radios = [
    //   { name: 'Total 30min', val: false },
    //   { name: 'One by One', val: true },
    // ];

    const handleChange = (e) =>{
      setExamName(e.target.value)
    }
    const handleYear = (e) =>{
      setExamYear(e.target.value)
    }
    const handleTime = (e) =>{
      setTime(e.target.value)
    }
    const handleDate = (e) =>{
      setExamDate(e.target.value)
    }

    const examHandler = async(e) => {
      // console.log(time);
      e.preventDefault();
      const exam_name = examName;
      // console.log(exam_name)
      const exam_type = radioValue;
      console.log(exam_type)
      const exam_time = time === null ? (exam_type=== true ? 1 : 30 ): time ;
      const examTime = examtime === null ? 30 : examtime;
      const exam_date = examDate;
      const year = examYear;
      // const objective = objval;

      if(objval){
        const res = await fetch('/api/exam/createExam',{
          method:"POST",
          headers:{
            "Content-Type" : "application/json"
          },
          body: JSON.stringify({exam_name,exam_type,exam_time,exam_date,year})
        });
        if(res.status === 400 || res.status ===422 || !res){
          window.alert("error occured...")
        }else{
          setShow(true)
          setExamDate("")
          setExamYear("")
          setTime(null)
        }

      }else{
        const res = await fetch('/api/exam/createSubExam',{
          method:"POST",
          headers:{
            "Content-Type" : "application/json"
          },
          body: JSON.stringify({exam_name,examTime,exam_date,year})
        });

        if(res.status === 400 || res.status ===422 || !res){
          window.alert("error occured...")
        }else{
          setShow(true)
          setExamDate("")
          setExamYear("")
          setExamtime(null)
        }
      }

      // const data = await res.json();
      // console.log(res)
      
    }

    const renderForm = () =>{
      if(show){
        return(
          objval ? <CreateQuestionForm setShow={setShow} setExamName={setExamName} examName={examName}/> : <CreateSQuestions setShow={setShow} setExamName={setExamName} examName={examName}/>
        )
       }else{
        return(
          <Container>
          <Form className="registerform">
            <h1>Set Examination Name</h1>
            <h5>Please set a unique Examination name</h5>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="enter name"
                name='name'
                value={examName}
                onChange={handleChange}
              />
            </Form.Group> 
            <label>Exam Type</label>
            <ToggleButtonGroup type="radio" name="option" defaultValue={3}>
              <ToggleButton id="tbg-radio-3" value={3} checked={objval=== true} onChange={()=>setObjVal(true)}>
                Objective
              </ToggleButton>
              <ToggleButton id="tbg-radio-4" value={4} checked= {objval=== false} onChange={()=>setObjVal(false)}>
                Subjective
              </ToggleButton>
            </ToggleButtonGroup>                        
            <Form.Group className="mb-3 mt-2" controlId="formBasicName">
              <Form.Label>Enter Class of Students(enter only number)</Form.Label>
              <Form.Control
                type="text"
                placeholder="enter Year"
                name='year'
                value={examYear}
                onChange={handleYear}
              />
            </Form.Group> <br/>
            
            {objval?
            <div>
            <h6>The below toggle button is used to set the exam type, 
            If Total 30min is selected then after 30m the form will be auto submitted. 
            If One by One is selected then each quesion will be fetched One by One with 1min. time interval.</h6>
           

      <ToggleButtonGroup type="radio" name="options" defaultValue={1}>
        <ToggleButton id="tbg-radio-1" value={1} checked={radioValue=== false} onChange={()=>setRadioValue(false)}>
          Total time
        </ToggleButton>
        <ToggleButton id="tbg-radio-2" value={2} checked= {radioValue=== true} onChange={()=>setRadioValue(true)}>
          One By One
        </ToggleButton>
      </ToggleButtonGroup>                       
      {radioValue===true?
      <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Enter The Time Interval in Minutes. Leave this field blank if you want 1min time interval. Do not enter string like sec/min only enter number </Form.Label>
              <Form.Control
                type="text"
                placeholder="enter time"
                name='name'
                value={time}
                onChange={handleTime}
              />
            </Form.Group> : <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Enter The Total Time In Minutes. Leave this field blank if you want 30min total time. Do not enter string like sec/min only enter number</Form.Label>
              <Form.Control
                type="text"
                placeholder="enter time "
                name='name'
                value={time}
                onChange={handleTime}
              />
            </Form.Group> } <br/>
            </div>
             :
              <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Enter The Total Time In Minutes. Leave this field blank if you want 30min total time. Do not enter string like sec/min only enter number</Form.Label>
              <Form.Control
                type="text"
                placeholder="enter time "
                name='name'
                value={examtime}
                onChange={(e)=>setExamtime(e.target.value)}
              />
            </Form.Group> 
             }

            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Enter Exam Date :</Form.Label>
              <Form.Control
                type="date"
                // placeholder="DD/MM/YYYY"
                name='name'
                value={examDate}
                onChange={handleDate}
              />
            </Form.Group> <br/>
            <Button variant="primary" onClick={examHandler}>
              Next
            </Button>
          </Form>
        </Container>
        );
       }
    }

  return (
    <>
       {renderForm()}
    </>
  )
}

export default CreateExam