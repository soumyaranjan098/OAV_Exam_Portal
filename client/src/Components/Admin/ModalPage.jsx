import React, { useEffect, useState } from 'react';
import { Button, Card, Form, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Success from '../Success';
import Error from '../Error';
import { updateUser } from '../../Actions/userAction';

function ModalPage({ user, setShow }) {
  const dispatch = useDispatch();
  const editState = useSelector((state) => state.updateUserReducer);
  const { success, error } = editState;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [registration_no, setRegistration_no] = useState('');
  const [year, setYear] = useState('');

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setMobile(user.mobile);
      setRegistration_no(user.registration_no);
      setYear(user.year);
    }
  }, [user]);

  const handleClose = () => {
    setShow(false);
  };

  const submitForm = (e) => {
    e.preventDefault();
    const updatedStudent = {
      userId: user._id,
      name,
      email,
      mobile,
      registration_no,
      year
    };
    dispatch(updateUser(updatedStudent));
    setTimeout(()=>{
      handleClose();
    },1000)
  };

  return (
    <>
      {success && window.alert("successfully updated...")}
      {error && <Error error={'Something went wrong'} />}
      <div>
        <Card className="Mcard">
          <Form onSubmit={submitForm} className="bg-light p-4">
            <Row className="mb-3">
              <Form.Group controlId="formGridName">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter name" />
              </Form.Group>
              <Form.Group controlId="formGridEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter email" />
              </Form.Group>
              <Form.Group controlId="formGridRegistration_no">
                <Form.Label>Registration_no</Form.Label>
                <Form.Control
                  type="text"
                  value={registration_no}
                  onChange={(e) => setRegistration_no(e.target.value)}
                  placeholder="Enter Registration_no"
                />
              </Form.Group>
              <Row className="mb-3 mt-3">
                <Form.Group as={Col} controlId="formGridMobile">
                  <Form.Label>Mobile</Form.Label>
                  <Form.Control
                    type="text"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    placeholder="Enter Mobile Number"
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridYear">
                  <Form.Label>Year</Form.Label>
                  <Form.Control
                    type="text"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    placeholder="Enter Year of Study"
                  />
                </Form.Group>
              </Row>
            </Row>
            <br />
            <Button variant="primary" type="submit">
              Update Student
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

export default ModalPage;
