import React,{useState,useEffect} from "react";
import { Alert } from "react-bootstrap";
const Error = ({ error }) => {
  const [show, setShow] = useState(true);
  const dismissTimeout = 5000;
  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
    }, dismissTimeout);

    return () => {
      clearTimeout(timer);
    };
  }, [dismissTimeout]);

  return (
    <Alert variant="danger" show={show}>
      {error}
    </Alert>
  );
  
};

export default Error;