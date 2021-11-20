import React, { useEffect, useState } from 'react'
import { Alert } from 'react-bootstrap';
import Header from '../Navbar/Navbar';
import LectureCard from '../Cards/Card';
import './styles.css'

import { TimeTable } from '../API/api' 

const StudentDashboard = ()=>{

    const [schedule,setSchedule] = useState([])

    var day = new Date().getDay()-1;  // returns as Sunday-0,Monday-1,Tuesday-2,Wednesday-3,Thursday-4,Friday-5,Saturday-6
    day = (day+7)%7;  // converting to 0-Monday,1-Tuesday,... as per timetable array

    day = 4; // for testing

    console.log(day)

    /*fetching timetable */
    const getSchedule = async ()=>{
        const batch = JSON.parse(localStorage.getItem('userInfo')).batch; /* parsing string to JSON to extract batch */
        await TimeTable(batch).then(data=>{
            if(data.error)
            {
                console.log(data.error)
            }
            else{
                setSchedule(data.timetable[day]);
            }
        })
    }

    const weekend = ()=>{
        return <Alert  className="d-flex justify-content-center" variant="success">
                    <Alert.Heading>
                        It's Weekend. Enjoy!
                    </Alert.Heading>
                </Alert>
    }

    useEffect(()=>{
        getSchedule();
    },[])

    var j = 1;

    return(
        <div>
            <Header />
            <div className="master">
                <h3>Today's schedule</h3>
                <div className="container">
                   {(day===5 || day===6)?weekend():schedule && schedule.map((lectureData,i)=>(
                       <LectureCard schedule={lectureData} key={i} index={j++}/>
                   ))}
                </div>
            </div>
        </div>
    )
}

export default StudentDashboard;