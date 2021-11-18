import React, { useEffect, useState } from 'react'
import Header from '../Navbar/Navbar';
import LectureCard from '../Cards/Card';
import './styles.css'

import { TimeTable } from '../API/api' 

const StudentDashboard = ()=>{

    const [schedule,setSchedule] = useState([{}])

    const day = new Date().getDay();

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

    useEffect(()=>{
        getSchedule();
    },[])

    var j = 1;

    return(
        <div>
            <Header />
            <div className="master">
                <div className="container">
                   {schedule.map((lectureData,i)=>(
                       <LectureCard schedule={lectureData} key={i} index={j++}/>
                   ))}
                </div>
            </div>
        </div>
    )
}

export default StudentDashboard;