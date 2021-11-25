import React, { useEffect, useState } from "react";
import {Alert} from 'react-bootstrap'
import Header from "../Navbar/Navbar";
import './styles.css'

import {TimeTable} from '../API/api'
import Template from "./Template";

const StudentPreference = ()=>{

    const map = new Map();  // mapping time .... stored as number in database like "1" - 08:00-09:00 .. so on
    map[1] = "08:00 - 09:00"
    map[2] = "09:00 - 10:00"
    map[3] = "10:00 - 11:00"
    map[4] = "11:00 - 12:00"
    map[5] = "12:00 - 13:00"
    map[6] = "13:00 - 14:00"
    map[7] = "14:00 - 15:00"
    map[8] = "15:00 - 16:00"
    map[9] = "16:00 - 17:00"

    var day = new Date().getDay();  //return as Sunday-0,Monday-1,Tuesday-2,Wednesday-3,Thursday-4,Friday-5,Saturday-6
    
    // day = 4; // for testing

    const deadlineToSubmitPreference = new Date("01-01-1970 18:00:00");  // i.e. 6pm
    
    // console.log(deadlineToSubmitPreference)
    // console.log(currentTime)
    // if(currentTime > deadlineToSubmitPreference)
    // {
    //     console.log("HELLO")
    // }

    const [deadline,setDeadline] = useState(false)

    const [schedule,setSchedule] = useState([])
    const [response,setResponse] = useState()

    const userInfo= JSON.parse(localStorage.getItem('userInfo')); /* parsing string to JSON to extract user data */

    /*fetching timetable */
    const getSchedule = async ()=>{
        await TimeTable(userInfo.batch)
            .then(data=>{
            if(data.error)
            {
                console.log(data.error)
            }
            else{
                setSchedule(data.timetable[day]);
            }
        })
    }
    
    useEffect(()=>{
        getSchedule();
    },[])

    useEffect(()=>{
        var today = new Date();
        var currentTime = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    
        currentTime = new Date("01-01-1970 "+currentTime)
        currentTime > deadlineToSubmitPreference && setDeadline(true)
    },[])

    const updateResponse = (message)=>{
        setResponse(message)
    }

    const weekend = ()=>{
        return <Alert  className="d-flex justify-content-center" variant="success" style={{ marginTop:"50px"}}>
                    <Alert.Heading>
                        Tomorrow's a holiday. Enjoy!
                    </Alert.Heading>
                </Alert>
    }

    const displayResponse=()=>{
        if(response)
        {
            return <Alert  className="d-flex justify-content-center" variant="success">
                        {response}
                    </Alert>
        }
        else{
            return <Alert  className="d-flex justify-content-center" variant="danger">
                        {response}
                    </Alert>
        }
        
    }

    const clearLocalStorage = (lecture)=>{
        var key = userInfo.batch+lecture.time
        localStorage.getItem(key) && localStorage.removeItem(key)
    }

    const deadlinePassed = ()=>{
        schedule && schedule.forEach((lecture,i)=>{
            clearLocalStorage(lecture)  
        })

        return (
            <Alert  className="d-flex justify-content-center" variant="danger">
                    Deadline passed.
            </Alert>
        )
    }

    const showLectures = ()=>(
        <div>
            {
                schedule && 
                schedule.map((lecture,i)=>(
                    <Template lecture={lecture} 
                              map={map} 
                              userInfo = {userInfo}
                              day = {day}
                              updateResponse = {updateResponse}
                              key={i}/>
                ))
            }
        </div>
    )
    
    const weekday = ()=>(
        <div id="container-body">
            <div id="container">
                <h2>
                    Submit your preferences for tomorrow's lectures
                </h2>
                <h6>Deadline to submit/update preferences - 6 PM</h6>
            </div>
            {
                deadline?deadlinePassed():showLectures()
            }
        </div>
    )

    return (
        <div>
            <Header /> 
             {response && displayResponse()}
            {
                (day === 5 || day === 6)?weekend():weekday()
            }
        </div>
    )
}

export default StudentPreference;