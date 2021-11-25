import React,{useState} from 'react'
import {submitStudentResponse,updateStudentResponse} from '../API/api'
import './styles.css'

const Template = ({lecture,map,userInfo,day,updateResponse})=>{

    const {batch,ID,name} = userInfo;
    const {time,subject,teacherName} = lecture;

    var localStorageKey = batch+time;

    var check = localStorage.getItem(localStorageKey);
    // console.log(check)

    if(!check)
    {
        check=""
    }

    const [preference,setPreference] = useState(check);
    

    const handleChange = (e)=>{
        setPreference(e.target.value)
        updateResponse()
    }

    const handleSubmit = async (e)=>{
        e.preventDefault();
        
        const studentID = ID;
        const studentName = name;

        await submitStudentResponse({batch,time,preference,studentID,studentName,day})
        .then((res)=>{
            if(res.error){
                updateResponse(res.error);
                return;
            }
            else{
                console.log(res);
            }
        })
        localStorage.setItem(localStorageKey,preference);
        updateResponse(`Preference for ${subject.toUpperCase()} lecture has been saved`);
    }

    const handleUpdate = async (e)=>{
        e.preventDefault();
        
        const studentID = ID;
        const studentName = name;

        await updateStudentResponse({batch,time,preference,studentID,studentName,day})
        .then((res)=>{
            if(res.error){
                updateResponse(res.error);
                return;
            }
            else{
                console.log(res);
            }
        })
        updateResponse(`Preference for ${subject} lecture has been updated`);
    }

    const displayLectureDetails = ()=>(
        <div className="course">
            <div className="course-preview">
                <h2>{subject.toUpperCase()}</h2>
            </div>
            <div className="course-info">
                <h6>{map[time]}</h6>
                <h2>Teacher: {teacherName}</h2>
                <label>Preference: </label>
                <select name="preference" value={preference}
                        onChange={handleChange} required>
                    <option>select</option>
                    <option value="Offline">Offline</option>
                    <option value="Online">Online</option>
                    <option value="NA">Not interested</option>
                </select>
                <div className="btn-box">
                    {
                        check?<button className="submitButton" onClick={handleUpdate}>Update preference</button>:
                        <button className="submitButton" onClick={handleSubmit}>Submit preference</button>
                    }
                </div>
            </div>
        </div>
    )

    return (
        <div>
            {displayLectureDetails()}
        </div>
    )
}

export default Template;