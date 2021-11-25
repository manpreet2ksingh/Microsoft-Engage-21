import React, { useState,useEffect } from 'react'
import {TimeTable,TeacherTimeTable} from '../API/api'
import Display from './Display'
import Header from '../Navbar/Navbar'
import { Container,Row,Col } from 'react-bootstrap'
import Card from 'react-bootstrap/Card'

const TimetableLayout = ()=>{
    const [timetable,setTimeTable] = useState()

    const userInfo = JSON.parse(localStorage.getItem('userInfo'))

    var dayOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday","Sunday"]

    const getTimeTable = async ()=>{
        if(userInfo.role == 0)
        {
            await TimeTable(userInfo.batch)
            .then(data=>{
                if(data.error)
                {
                    console.log(data.error)
                }
                else{
                    console.log(data.timetable)
                    setTimeTable(data.timetable)
                }
            })
        }
        else
        {
            await TeacherTimeTable(userInfo.ID)
            .then(data=>{
                if(data.error)
                {
                    console.log(data.error)
                }
                else{
                    console.log(data.timetable)
                    setTimeTable(data.timetable)
                }
            })    
        }
    }

    useEffect(()=>{
        getTimeTable();
    },[])

    return(
        <div style={{backgroundColor:'rgba(248, 245, 245, 0.945)'}}>
            <Header />
            <h2>Weekly Timetable</h2>
            <Container>
                {
                    timetable && timetable.map((daySchedule,i)=>(
                        <Row className='mt-5' key={i}>
                            <Col>
                                <Card body style={{ width: '9rem',fontWeight:'600'}} border="dark"> 
                                    {dayOfWeek[i].toUpperCase()}
                                </Card>
                            </Col>
                        {
                            daySchedule.map((lecture,j)=>(
                                <Col>
                                    <Display lecture={lecture} account={userInfo.role} key={j}/>
                                </Col>    
                            ))
                        }
                       
                        </Row>
                    ))
                }
            </Container>
            <div style={{ marginTop:'20px'}}>.</div>
        </div>
    )
}

export default TimetableLayout;