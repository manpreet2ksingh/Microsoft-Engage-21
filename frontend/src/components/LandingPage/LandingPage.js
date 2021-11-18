import React from "react";
import { Button, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./styles.css";

const LandingPage = () => {

	return (
		<div className='main'>
			<Container>
				<Row>
					<div className="intro-text">
						<div>
							<h1 className="title">Welcome </h1>
						</div>
						<div className="buttonContainer">
							<Link to={{             // passing props to specified link - student is logging in or teacher
								pathname: "/login",
								state: {
									account: "Student"
								}
							}}>
								<Button variant="outline-primary" size="lg" className="landingbutton">
									Login as Student
								</Button>
							</Link>
							<Link to={{
								pathname: "/login",
								state: {
									account: "Teacher"
								}
							}}>
								<Button variant="outline-primary" size="lg" className="landingbutton">
									Login as Teacher
								</Button>
							</Link>
						</div>
					</div>
				</Row>
			</Container>
		</div>
	);
}

export default LandingPage;