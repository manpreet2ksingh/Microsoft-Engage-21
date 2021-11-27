import React, { useEffect, useState } from 'react'
import { Alert } from 'react-bootstrap';
import Header from '../Navbar/Navbar';
import LectureCard from '../Cards/Card';
import ExtraLectureCard from '../Cards/ExtraLectureCard';
import './styles.css'

import { TimeTable,upcomingStudentsExtraLecturesByDate } from '../API/api' 

const StudentDashboard = ()=>{

    const [schedule,setSchedule] = useState([])
    const [extraLectures,setExtraLectures] = useState()

    var day = new Date().getDay()-1;  // returns as Sunday-0,Monday-1,Tuesday-2,Wednesday-3,Thursday-4,Friday-5,Saturday-6
    day = (day+7)%7;  // converting to 0-Monday,1-Tuesday,... as per timetable array

    const batch = JSON.parse(localStorage.getItem('userInfo')).batch; /* parsing string to JSON to extract batch */

    // console.log("today ",day)

    /*fetching timetable */
    const getSchedule = async ()=>{
        
        await TimeTable(batch).then(data=>{
            if(data.error)
            {
                console.log(data.error)
            }
            else{
                // console.log(data.timetable[day])
                setSchedule(data.timetable[day]);
            }
        })
    }

    const getUpcomingExtraLectures = async () =>{
        await upcomingStudentsExtraLecturesByDate(batch)
        .then(data=>{
            if(data.error){
                console.log(data.error)
            }
            else{
                setExtraLectures(data)
            }
        })
    }

    const weekend = ()=>{
        return <Alert  className="d-flex justify-content-center" variant="success">
                    <Alert.Heading>
                        It's Weekend!
                    </Alert.Heading>
                </Alert>
    }

    useEffect(()=>{
        getSchedule();
        getUpcomingExtraLectures()
    },[])

    return(
        <div>
            <Header />
            <div className="master">
                <h3>Today's schedule</h3>
                <div className="container">
                   {(day===5 || day===6)?weekend():schedule && schedule.map((lectureData,i)=>(
                       <LectureCard schedule={lectureData} key={i} index={++i}/>
                ))}
                </div>

                    <h3>
                        Extra Lectures
                    </h3>

                <div className="container">
                    {extraLectures && extraLectures.length > 0 ?
                        extraLectures.map((lectureData,i)=>(
                            <ExtraLectureCard data={lectureData} key={i} index={++i} />
                        )):
                        <h4>No upcoming extra lectures!</h4> 
                     }
                </div>
            </div>
        </div>
    )
}

export default StudentDashboard;