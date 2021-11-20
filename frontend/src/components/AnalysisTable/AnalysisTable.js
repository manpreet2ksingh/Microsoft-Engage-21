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
        <div className = "analysis">
            <Header />
            <h2>Students Response</h2>
            <div class="row">
                <div class="column1" >
                    <h2>{subject.toUpperCase()}</h2>
                    <h2>Batch : {batch}</h2>
                    <h2>Time  : {map[time]}</h2>
                    {
                        studentData && analysis && <div>
                            <h2>Stats</h2>
                            <h4>Batch strength   : {studentData.size}</h4>
                            <h4>Offline count    : {analysis.offline}</h4>
                            <h4>Online count     : {analysis.online}</h4>
                            <h4>Absentees count  : {analysis.absentees}</h4>
                        </div>
                    }
                </div>
                <div class="column2" >
                    <div class="container-table">
                        <ul class="responsive-table">
                            <li class="table-header">
                                <div class="col col-1">Student ID</div>
                                <div class="col col-2">Student Name</div>
                                <div class="col col-3">Vaccination Status</div>
                                <div class="col col-4">Preference</div>
                            </li>
                            {
                                studentData && analysis && analysis.data.map((data,i)=>(
                                    <li key={i}>
                                        <div class="col col-1">{data.studentID}</div>
                                        <div class="col col-2">{data.studentName}</div>
                                        <div class="col col-3">{studentData.get(data.studentID)}</div>
                                        <div class="col col-4">{data.preference}</div>
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