import React,{useState, useEffect} from 'react'
import Header from '../Navbar/Navbar'
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'
import {Row,Col} from 'react-bootstrap'
import {Alert} from 'react-bootstrap'

import { createExtraClass,updateExtraClass } from '../API/api';
import './styles.css'

const ExtraClass = (props)=>{

    const operation = props.location.state.operation;
    const data = props.location.state.data;

    // console.log(data)

    const [values,setValues] = useState({
        batch:data?data.batch:"",
        subject:data?data.subject:"",
        date:data?data.date:"",
        time:data?data.time:"",
        duration:data?data.duration:"",
        preference:data?data.preference:"",
        vaccinationStatus:data?data.vaccinationStatus:"",
        lectureStrength:data?data.lectureStrength:1
    })

    const userInfo = JSON.parse(localStorage.getItem('userInfo'))

    const [response,setResponse] = useState("");

    const {batch,subject,date,time,duration,preference,vaccinationStatus,lectureStrength} = values;

    const handleChange = (name)=>(e)=>{
        setValues({...values,[name]:e.target.value})
        setResponse("")
    }

    const handleSubmit = async (e)=>{
        e.preventDefault();
        console.log(values)

        var data = values;
        data.teacherID = userInfo.ID
        data.teacherName = userInfo.name

        await createExtraClass(data)
        .then(res=>{
            if(res.error)
            {
                setResponse("Error occured")
            }
            else
            {
                setResponse(`${subject.toUpperCase()} lecture scheduled successfully`)
            }
        })
    }

    const handleUpdate = async (e) =>{
        e.preventDefault()
        var send = values;
        send.teacherID = userInfo.ID
        send.teacherName = userInfo.name
        send._id = data._id
        await updateExtraClass(send)
        .then(res=>{
            if(res.error)
            {
                setResponse("error")
            }
            else
            {
                setResponse(`${data.subject.toUpperCase()} lecture updated successfully`)
            }
        })
    }

    const displayResponse=()=>{
        if(response === "Error occured"){
            return <Alert  className="d-flex justify-content-center" variant="danger">
                        {`Error scheduling lecture`}
                    </Alert>
        }
        else if(response !== "")
        {
            return <Alert  className="d-flex justify-content-center" variant="success">
                        {response}
                    </Alert>
        }
    }

    const form = ()=>(
        <Container>
            <Form className='mt-3'>
                <Form.Group controlId="form.Batch">
                    <Form.Label>Batch</Form.Label>
                    <Form.Select value={batch} onChange={handleChange('batch')}>
                        <option>Default select</option>
                        <option>A</option>
                        <option>B</option>
                        <option>C</option>
                    </Form.Select>
                </Form.Group>

                <Form.Group controlId="form.Subject">
                    <Form.Label>Subject</Form.Label>
                    <Form.Control type="text" value={subject} onChange={handleChange('subject')}/>
                </Form.Group>

                <Row className="mb-3">
                    <Form.Group as={Col} controlId="form.Date">
                        <Form.Label>Date</Form.Label>
                        <Form.Control type="Date" value={date} onChange={handleChange('date')}/>
                    </Form.Group>

                    <Form.Group as={Col} controlId="form.Time">
                        <Form.Label>Time</Form.Label>
                        <Form.Control type="time" value={time} onChange={handleChange('time')}/>
                    </Form.Group>
                    <Form.Group as={Col} controlId="form.Time">
                        <Form.Label>Duration</Form.Label>
                        <Form.Control type="time" value={duration} onChange={handleChange('duration')}/>
                    </Form.Group>
                </Row>
                
                <Form.Group controlId="form.Preference">
                    <Form.Label>Preference</Form.Label>
                    <Form.Select value={preference} onChange={handleChange('preference')}>
                        <option>Default select</option>
                        <option>Offline</option>
                        <option>Online</option>
                        <option>Cancelled</option>
                    </Form.Select>
                </Form.Group>

                {preference === "Offline" && 
                
                <>
                    <Form.Group controlId="form.vaccinationStatus">
                        <Form.Label>Preferred vaccination status</Form.Label>
                        <Form.Select value={vaccinationStatus} onChange={handleChange('vaccinationStatus')}>
                            <option>Default select</option>
                            <option>Fully vaccinated</option>
                            <option>Partially vaccinated</option>
                            <option>Not vaccinated</option>
                        </Form.Select>
                    </Form.Group>
                    
                    <Form.Group controlId="form.lectureStrength">
                        <Form.Label>Preferred lecture strength</Form.Label>
                        <Form.Control size="sm" type="number" value={lectureStrength} onChange={handleChange('lectureStrength')}/>
                    </Form.Group>
                </>
                
                }
                {
                    operation==='schedule'?
                    <Button className='mt-3' 
                            variant="primary" 
                            type="submit"
                            onClick={handleSubmit}>
                        Submit
                    </Button>:
                    <Button className='mt-3' 
                            variant="primary" 
                            type="submit"
                            onClick={handleUpdate}>
                        Update
                    </Button>
                }
                

            </Form>
        </Container>
    )

    return(
        <div>
            <Header />
            {displayResponse()}
            <h2>Schedule an Extra Lecture</h2>
            {form()}
        </div>
    )
}

export default ExtraClass