import React from "react";
import {
  Container,
  Nav,
  Navbar,
  NavDropdown
} from "react-bootstrap";

import {useHistory,Link} from 'react-router-dom'

function Header() {
  
	const userInfo = JSON.parse(localStorage.getItem('userInfo'))
	const history = useHistory()

  return (
    <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
      <Container>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="container-fluid">
			 {userInfo ? (
              <>
				   
					<Navbar.Brand>Scheduler</Navbar.Brand>

					{(userInfo.role === 0)?
						<Nav.Link href="/studentDashboard">
								Dashboard
						</Nav.Link>:
						<Nav.Link href="/teacherDashboard">
								Dashboard
						</Nav.Link>}

					<Nav.Link href="/timetable">
						Weekly TimeTable
					</Nav.Link>

          {(userInfo.role === 0)?
            <Nav.Link href="/studentSubmit">
						  Submit preference
					  </Nav.Link>:
            <Nav.Link href="/teacherSubmit">
						    Submit preference
					  </Nav.Link>}

			{
				(userInfo.role === 1) && 
					<Nav.Link as={Link} to={{
						pathname:"/extraLecture",
						state:{
							operation:"schedule"
						}
					}}>
							Schedule an extra lecture
					</Nav.Link>
			}
					
					<NavDropdown className="ml-auto"  title={`Welcome ${userInfo.name}`}>
						<Nav.Item className="ml-auto">
							<Nav.Link>Update profile</Nav.Link>
						</Nav.Item>

						<Nav.Item className="ml-auto">
							<Nav.Link href="/updateVaccinationStatus">Update vaccination status</Nav.Link>
						</Nav.Item>
						
						<Nav.Item className="ml-auto">
							<Nav.Link onClick={()=>{
										localStorage.removeItem('userInfo')
										history.push("/")
									}}>
								Logout
							</Nav.Link>
						</Nav.Item>

					</NavDropdown>
					
              </>

            ) : (
					<>
              	<Nav.Item className="ml-auto">
      				      <Nav.Link href="/">Login</Nav.Link>
    			      </Nav.Item>
				  </>
            )}
          </Nav>
          
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;