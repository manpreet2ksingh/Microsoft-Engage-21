import React, { useEffect, useState } from "react";
import {Alert} from 'react-bootstrap'
import Header from "../Navbar/Navbar";
import './studentStyles.css'

import {submitStudentResponse,TimeTable} from '../API/api'
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

    const day = new Date().getDay();

    const [schedule,setSchedule] = useState([])
    const [preferences,setPreferences] = useState([]);
    const [response,setResponse] = useState("")
    const {batch,ID,name} = JSON.parse(localStorage.getItem('userInfo')); /* parsing string to JSON to extract user data */

    /*fetching timetable */
    const getSchedule = async ()=>{
        await TimeTable(batch)
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

    const collectPreferences = (mode)=>{
        var temp = preferences;
        temp.push(mode);
        setPreferences(temp);
        setResponse("")
    }

    useEffect(()=>{
        getSchedule();
    },[])

    const weekend = ()=>(
        <div>
            <h2>Tomorrow's a Holiday</h2>
            <h2>Enjoy</h2>
        </div>
    )

    const submitPreference = async ()=>{
        console.log(batch,ID,name)
        const studentID = ID;
        const studentName = name;
        var lecturesCount = schedule.length;

        for(var j=0;j<lecturesCount;j++){
            const time = schedule[j].time;
            const preference = preferences[j];
            console.log(time,preference)
            await submitStudentResponse({batch,time,preference,studentID,studentName})
            .then((res)=>{
                if(res.error){
                    setResponse(res.error);
                    return;
                }
                else{
                    console.log(res);
                }
            })
        }
        setResponse("Response collected");
    }

    const displayResponse=()=>{
        // console.log(response);
        if(response === 'Response collected')
        {
            return <Alert  className="d-flex justify-content-center" variant="success">
                        Response has been collected
                    </Alert>
        }
        else if(response!=""){
            return <Alert  className="d-flex justify-content-center" variant="danger">
                        Error collecting response
                    </Alert>
        }
        
    }
    
    const weekday = ()=>(
        <div className="container-body">
            <div className="heading">
                <h2>
                    Submit your preferences for tomorrow's lectures
                </h2>
            </div>
            {
                schedule && 
                schedule.map((lecture,i)=>(
                    <Template lecture={lecture} map={map} 
                                collectPreferences={collectPreferences} key={i}/>
                ))
            }
            <button className="btn" onClick={submitPreference}>Submit preference</button>
        </div>
    )

    return (
        <div>
            <Header /> 
             {displayResponse()}
            {
                (day === 5 || day === 5)?weekend():weekday()
            }
        </div>
    )
}

export default StudentPreference;