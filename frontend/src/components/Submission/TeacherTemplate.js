import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import { submitPreference,updatePreference } from '../API/api'
import './styles.css'

const TeacherTemplate = ({lecture,map,updateResponse})=>{

    const {time,subject,batch} = lecture;
    const day = new Date().getDay();

    const [preferences,setPreferences] = useState([{
        modeOfPreference:"",
        preferredLectureStrength:0,
        vaccinationStatus:""
    }]);

    const {modeOfPreference,preferredLectureStrength,vaccinationStatus} = preferences

    var key = batch+time;

    var check = localStorage.getItem(key)?localStorage.getItem(key):null;

    const handleChange = (name) =>(event)=>{
        updateResponse()
        setPreferences({...preferences,[name]:event.target.value})
    }

    const handleSubmit = async (e)=>{
        e.preventDefault();
        // console.log(modeOfPreference)
        await submitPreference({modeOfPreference,
                                time,
                                batch,
                                preferredLectureStrength,
                                vaccinationStatus})
            .then(res=>{
                if(res.error){
                    console.log("Error submitting response")
                    updateResponse(res.error)
                }
                else{
                    localStorage.setItem(key,preferences)
                    updateResponse(`Preference saved for ${subject.toUpperCase()} lecture scheduled at ${map[time]}`)
                }
            })
    }

    const handleUpdate = async (e)=>{
        e.preventDefault();
        console.log(preferences)
        await updatePreference({modeOfPreference,
                                time,
                                batch,
                                preferredLectureStrength,
                                vaccinationStatus})
            .then(res=>{
                if(res.error){
                    console.log("Error updating response")
                    updateResponse(res.error)
                }
                else{
                    localStorage.setItem(key,preferences)
                    updateResponse(`Preference updated for ${subject.toUpperCase()} lecture scheduled at ${map[time]}`)
                }
            })
    }

    const displayLectureDetails = ()=>(
        <div className="course">
            <div className="course-preview">
                <h2>{subject.toUpperCase()}</h2>
                <Link to={{
                    pathname:"/response",
                    state:{
                        time:time,
                        batch:batch,
                        subject:subject,
                        day:day
                    }
                }
                }> View analysis </Link>
            </div>
            <div className="course-info">
                <h6>{map[time]}</h6>
                <h2>Batch: {batch}</h2>
                <label>Preference: </label>
                <select name="preference" value={modeOfPreference}
                        onChange={handleChange('modeOfPreference')} required>
                    <option>select</option>
                    <option  value="Offline">Offline</option>
                    <option value="Online">Online</option>
                    <option value="NA">Cancelled</option>
                </select>
                {
                    modeOfPreference==="Offline" &&
                    <div>
                            <label>Preferred vaccination status</label>
                            <select value={vaccinationStatus} 
                                    onChange={handleChange('vaccinationStatus')}>
                                <option>select</option>
                                <option value="Not vaccinated">Not vaccinated</option>
                                <option value="Partially vaccinated">Partially vaccinated</option>
                                <option value="Fully vaccinated">Fully vaccinated</option>
                            </select>
                            <label>Preferred lecture strength</label>
                            <input className="strength"
                                   type="number" 
                                   value={preferredLectureStrength}
                                   onChange={handleChange('preferredLectureStrength')} />
                    </div>
                }
                    <div className="btn-box">
                        {
                            check?<button className="submitButton" onClick={handleUpdate}>Update</button>:
                                  <button className="submitButton" onClick={handleSubmit}>Submit</button>
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

export default TeacherTemplate;