import React from "react";
import {
  Container,
  Nav,
  Navbar
} from "react-bootstrap";

import {useHistory} from 'react-router-dom'

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
          
					<Nav.Link onClick={()=>{
							localStorage.removeItem('userInfo')
							history.push("/")
						}}>
                    Logout
               </Nav.Link>
					
					<Nav.Item className="ml-auto">
      				<Nav.Link>Welcome {userInfo.name}</Nav.Link>
    				</Nav.Item>
					
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