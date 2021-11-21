import React, { useState,useEffect } from 'react'
import Header from '../Navbar/Navbar';
import { getAnalysis,getStudentsData } from '../API/api';
import './styles.css'

const AnalysisTable = (props)=>{
    var {time,batch,subject,day} = props.location.state;
    day = 4;

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

    // console.log(props.location.state)

    const [analysis,setAnalysis] = useState();
    const [studentData,setStudentData] = useState();

    const getStudentsDataByBatch = async ()=>{
        var temp = new Map()  // mapping studentID to vaccination status
        await getStudentsData(batch)
        .then(res=>{
            // console.log(res)
            res.forEach(data=>{
                temp.set(data.ID,data.vaccinationStatus)
            })
            console.log(temp)
            setStudentData(temp);
        })
    }

    const Analysis = async ()=>{
        await getAnalysis({time,batch,day})
        .then(res=>{
            // console.log(res)
            setAnalysis(res)
        })
    }

    useEffect(()=>{
        getStudentsDataByBatch()
        Analysis()
    },[])

    return(
        <div classNameName = "analysis">
            <Header />
            <h2>STUDENTS' RESPONSE</h2>
            <div className="row">
                <div className="column1" >
                    <div className="details">
                        <h2>{subject.toUpperCase()}</h2>
                        <h5>Batch : {batch}</h5>
                        <h5>Time  : {map[time]}</h5>
                    </div>
                    {
                        studentData && analysis && <div className="stats">
                            <h2>Statistics</h2>
                                <table>
                                    <tr>
                                        <td>Batch Strength</td>
                                        <td>{studentData.size}</td>
                                    </tr>
                                    <tr>
                                        <td>Offline</td>
                                        <td>{analysis.offline}</td>
                                    </tr>
                                    <tr>
                                        <td>Online</td>
                                        <td>{analysis.online}</td>
                                    </tr>
                                    <tr>
                                        <td>Not Attending</td>
                                        <td>{analysis.absentees}</td>
                                    </tr>
                                </table>
                        </div>
                    }
                </div>
                <div className="column2" >
                    <div className="container-table">
                        <ul className="responsive-table">
                            <li className="table-header">
                                <div className="col col-1">Student ID</div>
                                <div className="col col-2">Student Name</div>
                                <div className="col col-3">Vaccination Status</div>
                                <div className="col col-4">Preference</div>
                            </li>
                            {
                                studentData && analysis && analysis.data.map((data,i)=>(
                                    <li className="table-row" key={i}>
                                        <div className="col col-1">{data.studentID}</div>
                                        <div className="col col-2">{data.studentName}</div>
                                        <div className="col col-3">{studentData.get(data.studentID)}</div>
                                        <div className="col col-4">{data.preference}</div>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AnalysisTable;