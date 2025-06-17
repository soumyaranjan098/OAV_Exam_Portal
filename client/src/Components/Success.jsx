import React, { useEffect } from "react";
import { Alert } from "react-bootstrap";
import { useState } from "react";
import {useNavigate} from 'react-router-dom';

const Success = ({ success,route }) => {
  //  console.log(route)
  const navigate = useNavigate();
  const [show, setShow] = useState(true);
  const dismissTimeout = 3000;
  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
    }, dismissTimeout);
    return () => {
      clearTimeout(timer);
    };
  }, [dismissTimeout]);

    if(route!==null){
      setTimeout(()=>{
        navigate(`/${route}`)
    },4000)
    }
  
  return (
    <Alert variant="success" show={show}>
      {success}
    </Alert>
  );
}


export default Success;