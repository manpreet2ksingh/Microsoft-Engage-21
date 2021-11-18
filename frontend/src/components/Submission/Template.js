import React,{useState} from 'react'
import './studentStyles.css'

const Template = ({lecture,map,collectPreferences,index})=>{

    const {time,subject} = lecture;
    const [preference,setPreference] = useState("");
    
    const handleChange = (e)=>{
        setPreference(e.target.value)
        collectPreferences(e.target.value)
    }

    const displayLectureDetails = ()=>(
        <div className="course">
            <div className="course-preview">
                <h6>{map[time]}</h6>
                <h2>{subject}</h2>
            </div>
            <div className="course-info">
                <h2> GREG</h2>
                <select name="preference" value={preference}
                        onChange={handleChange}>
                    <option>select</option>
                    <option value="Offline">Offline</option>
                    <option value="Online">Online</option>
                    <option value="NA">Not interested</option>
                </select>
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