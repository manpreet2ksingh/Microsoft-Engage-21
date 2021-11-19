import React,{useState} from 'react'
import './studentStyles.css'

const Template = ({lecture,map,collectPreferences,check,index})=>{

    const {time,subject} = lecture;
    const previousValue = (check)?check[index]:"";
    const [preference,setPreference] = useState(previousValue);
    
    const handleChange = (e)=>{
        setPreference(e.target.value)
        collectPreferences(e.target.value,index)
    }

    const displayLectureDetails = ()=>(
        <div className="course">
            <div className="course-preview">
                <h2>{subject}</h2>
            </div>
            <div className="course-info">
                <h6>{map[time]}</h6>
                <h2>Teacher: Greg</h2>
                <label>Preference: </label>
                <select name="preference" value={preference}
                        onChange={handleChange} required>
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