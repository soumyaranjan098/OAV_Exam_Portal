import React, { useEffect, useState } from "react";
import { Table, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getAllUser } from ".././../Actions/userAction";
import Loader from "../Loader";
import Error from "../Error";
import { FaUserEdit } from "react-icons/fa";
import { AiTwotoneDelete } from "react-icons/ai";
import ModalPage from "./ModalPage";
import { deleteUser } from ".././../Actions/userAction";

function AllStudents() {
  const userState = useSelector((state) => state.getAllUserReducer);
  const { loading, error, users } = userState;
  const updateState = useSelector((state) => state.updateUserReducer);
  const { success } = updateState;
  const dispatch = useDispatch();
  const [students, setStudents] = useState(null);
  const [selectedClass, setSelectedClass] = useState(9);


  const [show, setShow] = useState(false);

  const [updatedUser, setUpdatedUser] = useState(null);
  // const [activeToggle, setActiveToggle] = useState(1);

  // const handleClose = () => setShow(false);
  const handleShow = (user) => {
    // console.log("call")
    setShow(true);
    setUpdatedUser(user);
  };
  useEffect(() => {
    dispatch(getAllUser());
  }, [dispatch, success]);
  
useEffect(() => {
  if (users !== null) {
    const filtered = users
      .filter((user) => user.year === selectedClass)
      .sort((a, b) => a.registration_no - b.registration_no);
    setStudents(filtered);
  }
}, [users, selectedClass]);

const handleDeleteUser = (userId) => {
  const confirmed = window.confirm("Are you sure you want to delete this user?");
  if (confirmed) {
    dispatch(deleteUser({ _id: userId }));
    setStudents((prev) => prev.filter((user) => user._id !== userId));
  }
};

  return (
    <>
      <div>
        <Form.Select
          aria-label="Select class"
          value={selectedClass}
          onChange={(e) => {
            const value = Number(e.target.value); // convert string to number
            setSelectedClass(value);
          }}
          style={{ margin: "1rem", width: "200px" }}
        >
          <option value="9">9th</option>
          <option value="10">10th</option>
          <option value="11">11th</option>
          <option value="12">12th</option>
        </Form.Select>

      </div>

      {loading && <Loader />}
      {error && <Error error="Error While Fetching Users" />}
      <Table responsive>
        <thead>
          <tr>
            <th>Registraion Number</th>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile Number</th>
            <th>Edit/Delete</th>
          </tr>
        </thead>
        <tbody>
          {students !== null &&
            students.map((user) => (
              <tr key={user._id}>
                <td>{user.registration_no}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.mobile}</td>
                <td>
                  <FaUserEdit
                    onClick={() => {
                      return handleShow(user);
                    }}
                    style={{ fontSize: "1.5rem", color: "darkblue" }}
                  />{" "}
                  /{" "}
                  <AiTwotoneDelete
                    onClick={() => handleDeleteUser(user._id)}
                    style={{ fontSize: "1.5rem", color: "red" }}
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </Table>

      <div
        className="c2"
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: "2",
          width: "100%",
          maxWidth: "700px",
        }}
      >
        {show && <ModalPage user={updatedUser} setShow={setShow} />}
      </div>
    </>
  );
}

export default AllStudents;
