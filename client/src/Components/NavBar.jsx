import React, { useEffect, useState } from 'react'
import {Navbar,Container,Nav,NavDropdown} from 'react-bootstrap'
import {useSelector,useDispatch} from 'react-redux'
import {LinkContainer} from 'react-router-bootstrap'
import { logoutUser } from '../Actions/userAction'
import {FaUserAlt} from 'react-icons/fa'

function NavBar() {
  const dispatch = useDispatch();

    const authState = useSelector((state)=>state.authReducer);
    const {isAuthenticated} = authState;

    // const data = localStorage.getItem('userData');
    const data = sessionStorage.getItem('userData')

      const [currentUser,setCurrentUser] = useState();

  // }
  useEffect(()=>{
    if(data){
      setCurrentUser(JSON.parse(data))
    }
 
  },[data])

  return (
    <>
         <Navbar id='nav' bg="light" expand="lg" sticky='top'>
      <Container>
        <Navbar.Brand style={{marginLeft:"1rem",textShadow:"1px 1px 2px gray",fontFamily:"sans-serif",fontWeight:"bolder"}} href="#home">MCA Exam Portal</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {
                isAuthenticated ? (
                    <div>
                      {currentUser == null ? (
                        <div>loading...</div>
                      ):(
                        <div>
                      <LinkContainer to="/">
                      {/* <Nav.Link href="#features">{currentUser.name}</Nav.Link> */}
                        <NavDropdown title={<FaUserAlt/>} id="basic-nav-dropdown" >
                          <h6 className='mx-lg-3'>{currentUser.name}</h6>
                          <h6 className='mx-lg-3'>{currentUser.email}</h6>
                          <h6 className='mx-lg-3'>{currentUser.registration_no}</h6>

                            <NavDropdown.Item
                              onClick={() => {
                                dispatch(logoutUser());
                                // navigate("/login")
                              }}
                            >
                              Logout
                            </NavDropdown.Item>
                          </NavDropdown>
                      </LinkContainer>
                    </div>
                      )}
                    </div>
                ):(
                    <LinkContainer to="/login">
                    <Nav.Link href="#features">Login</Nav.Link>
                    </LinkContainer>
                )
            }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </>
  )
}

export default NavBar