import React, { useEffect, useState } from "react";
import {Alert} from 'react-bootstrap'
import Header from "../Navbar/Navbar";
import './styles.css'

import {submitStudentResponse,updateStudentResponse,TimeTable} from '../API/api'
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
    
    day = 4; // for testing

    const deadlineToSubmitPreference = new Date("01-01-1970 18:00:00");  // i.e. 6pm
    
    // console.log(deadlineToSubmitPreference)
    // console.log(currentTime)
    // if(currentTime > deadlineToSubmitPreference)
    // {
    //     console.log("HELLO")
    // }

    const [deadline,setDeadline] = useState(false)

    const [schedule,setSchedule] = useState([])
    const [preferences,setPreferences] = useState([]);
    const [response,setResponse] = useState("")
    const {batch,ID,name} = JSON.parse(localStorage.getItem('userInfo')); /* parsing string to JSON to extract user data */
    
    var previouslySubmittedPreferences = (localStorage.getItem('preferences'))?
                                          localStorage.getItem('preferences').split(','):null;
    
    const [check,setCheck] = useState(previouslySubmittedPreferences)

    /* check variable role - to validate whether preferences are submitted or not*/

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
    /*Collecting preferences for next day */
    const collectPreferences = (mode,index)=>{
        /* if its an update case (check != null), setPreferences without changing the previous submitted
        preferences in localStorage to avoid unnecessary API update calls*/
        if(check)       
        {
            var temp = check;
            temp[index] = mode;
            // console.log(check);
            setCheck(temp);
            setPreferences(check);
        }
        else{
            var temp = preferences;
            temp.push(mode);
            setPreferences(temp);
        }
        setResponse("")
    }

    useEffect(()=>{
        getSchedule();
    },[])

    useEffect(()=>{
        var today = new Date();
        var currentTime = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    
        currentTime = new Date("01-01-1970 "+currentTime)
        currentTime > deadlineToSubmitPreference && setDeadline(true)
    },{deadline})

    const weekend = ()=>{
        return <Alert  className="d-flex justify-content-center" variant="success" style={{ marginTop:"50px"}}>
                    <Alert.Heading>
                        Tomorrow's a holiday. Enjoy!
                    </Alert.Heading>
                </Alert>
    }

    const submitPreferences = async (e)=>{
        e.preventDefault();
        console.log(batch,ID,name)
        const studentID = ID;
        const studentName = name;
        var lecturesCount = schedule.length;
        console.log(preferences)
        for(var j=0;j<lecturesCount;j++){
            if(preferences[j]===undefined)
            {
                setResponse("Filling each preference is Mandatory");
                return;
            }
        }

        for(j=0;j<lecturesCount;j++){
            const time = schedule[j].time;
            const preference = preferences[j];
            await submitStudentResponse({batch,time,preference,studentID,studentName,day})
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
        localStorage.setItem('preferences',preferences);
        setResponse("Response collected");
    }

    const updatePreferences = async (e)=>{
        e.preventDefault();
        const studentID = ID;
        const studentName = name;
        var lecturesCount = schedule.length;
        // console.log(preferences)
        
        for(var j=0;j<lecturesCount;j++){
            const time = schedule[j].time;
            const preference = preferences[j];
            if(preferences[j]===previouslySubmittedPreferences[j])    // no update ; if new & prev is the same
            {
                continue;
            }
            await updateStudentResponse({batch,time,preference,studentID,studentName})
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
        localStorage.setItem('preferences',preferences);
        setResponse("Response updated");
    }

    const displayResponse=()=>{
        if(response === 'Response collected' || response === 'Response updated')
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

    const deadlinePassed = ()=>{

        // if preferences are submitted => remove them from local storage
        previouslySubmittedPreferences && localStorage.removeItem('preferences');

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
                              collectPreferences={collectPreferences} 
                              check={check} index={i}
                              key={i}/>
                ))
            }
            <div className="btn-box">
                {
                    /* if preference already submitted, then it can only be updated */
                    localStorage.getItem('preferences')?
                    <button className="submitButton" onClick={updatePreferences}>Update preferences</button>:
                    <button className="submitButton" onClick={submitPreferences}>Submit preferences</button>
                }
            </div>
        </div>
    )
    
    const weekday = ()=>(
        <div id="container-body">
            <div id="container">
                <h2>
                    {previouslySubmittedPreferences?"Update":"Submit"} your preferences for tomorrow's lectures
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