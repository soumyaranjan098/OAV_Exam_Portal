import React, { useState, useEffect } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { loginUser } from "./../Actions/userAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../Components/Loader";
import Success from "../Components/Success";
import Error from "../Components/Error";

function Login() {
  const loginState = useSelector((state) => state.loginUserReducer);
  const { loading, success, error } = loginState;
  const data = sessionStorage.getItem("userData");
  // console.log(token);

  const dispatch = useDispatch();

  const [user, setUser] = useState({
    registration_no: "",
    password: "",
  });

  const [currentUser, setCurrentUser] = useState(null);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const loginHandler = async (e) => {
    e.preventDefault();
    const { registration_no, password } = user;
    if (registration_no == null || password == null) {
      window.alert("Please fill the fields correctly..");
    } else {
      const userdata = { registration_no, password };
      await dispatch(loginUser(userdata));
    }
  };
  /////////////////////////            /////////////////
  useEffect(() => {
    if (data) {
      setCurrentUser(JSON.parse(data));
    }
  }, [data]);

  const getroute = () => {
    if (currentUser === null) {
      return;
    } else if (
      currentUser &&
      currentUser.isAdmin !== undefined &&
      currentUser.isAdmin
    ) {
      // console.log('cll');
      return "admin/dashboard";
    } else {
      // console.log('f');
      return "home";
    }
  };

  return (
    <>
      {loading && <Loader />}
      {success && getroute() && (
        <Success success="Successfully Login" route={getroute()} />
      )}
      {error && <Error error={`${error.message}`} />}
      <div className="login">
        <Container>
          <Form className="registerform" onSubmit={loginHandler}>
            <h1>Login</h1>

            <Form.Group className="mb-3" controlId="formBasicRegistratino_No">
              <Form.Label style={{ fontWeight: "bold" }}>User_ID</Form.Label>
              <Form.Control
                type="number"
                placeholder="enter registration number"
                name="registration_no"
                value={user.registration_no}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label style={{ fontWeight: "bold" }}>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                value={user.password}
                onChange={handleChange}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Login
            </Button>
          </Form>
        </Container>
      </div>
    </>
  );
}

export default Login;
