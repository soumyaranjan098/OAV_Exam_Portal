import React,{useState} from 'react'
import { Form,Button } from 'react-bootstrap'

function AddQuestion({exam_id}) {
    const initialQuestion = {
        title: "",
        code: "",
        options: ["", "", "", ""],
        answer: 0
      };
    const [questions , setQuestions] = useState([
        initialQuestion
    ]);
    // const [exam_id ,setExamId] = useState("");
  
    const handleQuestionChange = (index,field,value) =>{
        const updatedQuestion = [...questions];
        updatedQuestion[index][field] = value
        setQuestions(updatedQuestion);
    }

    const handleOptionChange = (index,optionIndex,value) => {
        const updatedQuestion = [...questions];
        updatedQuestion[index].options[optionIndex] = value;
        setQuestions(updatedQuestion)
    }


    const formSubmit = async(e) =>{
        e.preventDefault();
        try{
            const resp = await fetch('/api/question/insertQuestion',{
                method:"POST",
                headers:{
                    "Content-Type": "application/json"
                },
                body:JSON.stringify({exam_id,questions})
            });
            
            if(resp.status===200){
                window.alert("successfully created..");
                setQuestions([initialQuestion]);
            }else{
                window.alert("error occured..")
            }
            
        }catch(err){
            console.log(err)
        }
        
    }


  return (
    <>
        <div>
        {/* <h1>{examName}</h1> */}
            {questions && questions.map((question,index)=>(
                <div key={index}>
                <Form className="registerform">
                <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label><h5>Question {index+1}</h5> </Form.Label>
              <Form.Control
                type="text"
                placeholder="Question Title"
                value={question.title}
                onChange={(e)=> handleQuestionChange(index,'title',e.target.value)}
              />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label><h5>Enter Code (If there is no code for this question leave it empty)</h5> </Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder='Enter Code'
                value={question.code}
                onChange={(e)=> handleQuestionChange(index,'code',e.target.value)}
                 />
              </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label><h5>Options:</h5> </Form.Label>
              {question.options.map((option,optionIndex)=>(
                <div key={optionIndex} className='mb-1'>
              <Form.Control
                type="text"
                placeholder={`Option ${optionIndex+1}`}
                value={option} 
                    onChange={(e)=>handleOptionChange(index,optionIndex,e.target.value) } 
              />
              </div>))}
              </Form.Group>
                {/* <input 
                    type='text'
                    value={option} 
                    onChange={(e)=>handleOptionChange(index,optionIndex,e.target.value) } 
                    placeholder= {`Option ${optionIndex+1}`}
                />
                </div>
                ))} */}
                <Form.Group className="mb-3">
        <Form.Label><h5>Answer:</h5></Form.Label>
        <Form.Select
        value={question.answer}
                onChange={(e)=>handleQuestionChange(index,'answer',parseInt(e.target.value))}
                >
        
        {question.options.map((_,optionIndex)=>(
                    <option key={optionIndex} value={optionIndex} >
                        Option {optionIndex+1}
                    </option>
                ))}
        </Form.Select>
      </Form.Group>
            </Form>
            </div>
            ))}
            <Button onClick={formSubmit}>Submit</Button>
        </div>
    </>
  )
}

export default AddQuestion