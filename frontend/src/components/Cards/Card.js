import React from 'react'
import './styles.css'

const LectureCard = ({schedule,index,handler=0})=>{
    // console.log(schedule)
    // handler - to identify whether student has logged in or teacher

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

    const teacher = ()=>(
        <div className="content">
            <h2>0{index}</h2>
            <h3>{schedule.subject.toUpperCase()}</h3>
            <p>Time: {map[schedule.time]}</p>
            <p>Batch: {schedule.batch}</p>
        </div>
    )

    const student = ()=>(
        <div className="content">
            <h2>0{index}</h2>
            <h3>{schedule.subject.toUpperCase()}</h3>
            <p>Time: {map[schedule.time]}</p>
            <p>Teacher: {schedule.teacherName}</p>
        </div>
    )

    return(  
        <div className="card">
            <div className="box">
                {
                    handler?teacher():student()
                }
            </div>
        </div>
    )
}

export default LectureCard;