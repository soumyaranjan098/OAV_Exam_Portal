import React,{useState} from 'react'
import {Container,Form,Button} from 'react-bootstrap'
import { registerUser } from '../../Actions/userAction';
import { useDispatch,useSelector } from 'react-redux'; 
import Loader from '../Loader';
import Success from '../Success';
import Error from '../Error';

function Register() {
  const registerState = useSelector((state)=> state.registerUserReducer);
  const {loading,success,error} = registerState;
  
  const dispatch = useDispatch();

  const[user,setUser]= useState({
    name:'',email:'',mobile:'',registration_no:'',year:'',password:'',cpassword:''
  });

  const handleChange = (e) =>{
    setUser({...user,[e.target.name]: e.target.value})
  }
  
  const registerHandler = (e) =>{
    e.preventDefault();
    const {name,email,mobile,registration_no,year,password,cpassword} = user;
    if(password !== cpassword){
      alert("Password do not match..")
    }else{
      const newUser = {name,email,mobile,registration_no,year,password}
       dispatch(registerUser(newUser));
      setUser({name:'',email:'',password:'',registration_no:'',year:'',cpassword:'',mobile:''});
      
    }
  };

  return (
    <>
    {/* {console.log(error)} */}
        <div className='Register'>
        <Container style={{width:"100%"}}>
        {loading && <Loader/>}
        {success && <Success success={"Student Registration Successful"} route="admin/dashboard"/>}
        {error && <Error error={`${error.error}`} />}
        <h1>Registration </h1>
          <Form className="registerform">
            
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="enter name"
                name='name'
                value={user.name}
                onChange={handleChange}
              />
            </Form.Group>
            {/* <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name='email'
                value={user.email}
                onChange={handleChange}
              />
            </Form.Group> */}
            {/* <Form.Group className="mb-3" controlId="formBasicMobile">
              <Form.Label>Mobile</Form.Label>
              <Form.Control
                type="number"
                placeholder="enter mobile number"
                name='mobile'
                value={user.mobile}
                onChange={handleChange}
              />
            </Form.Group> */}
            <Form.Group className="mb-3" controlId="formBasicRegistratino_No">
              <Form.Label>Registration_No</Form.Label>
              <Form.Control
                type="number"
                placeholder="enter registration number"
                name='registration_no'
                value={user.registration_no}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicYearOfStudy">
              <Form.Label>Class(enter only number like 9, 10, 11 or 12)</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Year Of Study."
                name='year'
                value={user.year}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name='password'
                value={user.password}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
              <Form.Label>Confrim Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                name='cpassword'
                value={user.cpassword}
                onChange={handleChange}
              />
            </Form.Group>
  
            <Button variant="primary" onClick={registerHandler}>
              Register
            </Button>
          </Form>
        </Container>
        </div>
    </>
  )
}

export default Register