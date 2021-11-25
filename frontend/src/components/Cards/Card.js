import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import { getStudentLectureStatus, getTeacherLectureStatus } from '../API/api';
import './styles.css'

const LectureCard = ({schedule,index,handler=0,extra=0})=>{

    var day = new Date().getDay();
 
    day = day - 1;
    
    console.log(day);

    // console.log(schedule)
    // handler - to identify whether student has logged in or teacher

    const [status,setStatus] = useState();

    const {ID,batch} = JSON.parse(localStorage.getItem('userInfo'))

    const updateStudentStatus = async ()=>{
        var studentID = ID;
        const {time} = schedule;
        console.log(studentID,batch,time,day)
        await getStudentLectureStatus({batch,time,studentID,day})
        .then(res=>{
            if(res.error)
            {
                console.log(res.error)
            }
            else
            {
                console.log(res)
                setStatus(res)
            }
        })
    }

    const updateTeacherStatus = async ()=>{
        const {batch,time} = schedule;
        await getTeacherLectureStatus({batch,time,day})
        .then(res=>{
            if(res.error)
            {
                console.log(res.error)
            }
            else
            {
                console.log(res)
                setStatus(res)
            }
        })
    }

    useEffect(()=>{
        handler === 0 && extra === 0?updateStudentStatus():updateTeacherStatus();
    },[])

    const map = new Map();  // mapping time .... stored as number in database like "1" - 08:00-09:00 .. so on
    map.set(1,"08:00 - 09:00")
    map.set(2,"09:00 - 10:00")
    map.set(3,"10:00 - 11:00")
    map.set(4,"11:00 - 12:00")
    map.set(5,"12:00 - 13:00")
    map.set(6,"13:00 - 14:00")
    map.set(7,"14:00 - 15:00")
    map.set(8,"15:00 - 16:00")
    map.set(9,"16:00 - 17:00")

    const teacher = ()=>(
        <div className="content">
            <h2>0{index}</h2>
            <h3>{schedule.subject.toUpperCase()}</h3>
            <p>Time : {map.get(schedule.time)}</p>
            <p>Batch : {schedule.batch}</p>
            <p>Status : {status?status:"Online"}</p>
            {
                status === 'Offline' && 
                <Link to={{
                    pathname:"/list",
                    state:{
                        batch:schedule.batch,
                        time: schedule.time
                    }
                }}>List of students</Link>
            }
        </div>
    )

    const displayExtraLectures = ()=>{
        if(handler === 0)
        {
            <div className="content">
                <h2>0{index}</h2>
                <h3>{schedule.subject.toUpperCase()}</h3>
                <p>{schedule.teacherName}</p>
                <p>Date : {schedule.date}</p>
                <p>Time : {schedule.time}</p>
                <p>Duration: {schedule.duration}</p>
            </div>
        }
        else
        {
            <div className="content">
                <h2>0{index}</h2>
                <h3>{schedule.subject.toUpperCase()}</h3>
                <p>Batch :{schedule.batch}</p>
                <p>Date : {schedule.date}</p>
                <p>Time : {schedule.time}</p>
                <p>Duration: {schedule.duration}</p>
            </div>
        }
    }  

    const student = ()=>(
        <div className="content">
            <h2>0{index}</h2>
            <h3>{schedule.subject.toUpperCase()}</h3>
            <p>Time : {map.get(schedule.time)}</p>
            <p>Teacher : {schedule.teacherName}</p>
            <p>Status : {status?status:"Online"}</p>
        </div>
    )

    return(  
        <div className="card">
            <div className="box">
                {
                    handler && extra === 0?teacher():student()
                }
                {
                    extra && displayExtraLectures()
                }
            </div>
        </div>
    )
}

export default LectureCard;