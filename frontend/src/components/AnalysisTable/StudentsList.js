import React, { useState,useEffect } from 'react'
import Header from '../Navbar/Navbar';
import './styles.css'

import { studentsList,getStudentsData } from '../API/api';

const StudentsList = (props)=>{
  
    // console.log(props.location.state.data)

    const {_id ,batch}= props.location.state.data;

    const [list,setList] = useState()

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

    const getList = async ()=>{
        await studentsList({_id})
        .then(res=>{
            if(res.error)
            {
                console.log(res.error)
            }
            else{
                console.log(res)
                setList(res)
            }
        })
    }

    useEffect(()=>{
        getStudentsDataByBatch()
        getList()
    },[])

    return(
        <div>
            <Header />
            <h2>STUDENTS LIST</h2>
                <div className="container-table">
                    <ul className="responsive-table">
                        <li className="table-header">
                            <div className="col col-1">Student ID</div>
                            <div className="col col-2">Student Name</div>
                            <div className="col col-3">Vaccination Status</div>
                        </li>
                        {
                            studentData && list && list.map((data,i)=>(
                                <li className="table-row" key={i}>
                                    <div className="col col-1">{data.studentID}</div>
                                    <div className="col col-2">{data.studentName}</div>
                                    <div className="col col-3">{studentData.get(data.studentID)}</div>
                                </li>
                            ))
                        }
                       
                    </ul>
                </div>
        </div>
    )
}

export default StudentsList;