import React, { useState,useEffect } from 'react'
import Header from '../Navbar/Navbar';
import { getStudentsList } from '../API/api';
import './styles.css'

const List = (props)=>{
    var {time,batch} = props.location.state;

    var day = new Date().getDay();
    day = day - 1;
    
    console.log(day);

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

    const [studentList,setStudentList] = useState();

    const studentsList = async ()=>{
        await getStudentsList({batch,time,day})
        .then(res=>{
            if(res.error){
                console.log(res.error)
            }
            else{
                console.log(res)
                setStudentList(res);
            }
        })
    }

    useEffect(()=>{
        studentsList()
    },[])

    return(
        <div className = "analysis">
            <Header />
                <div className="container-table">
                    <ul className="responsive-table">
                        <li className="table-header">
                            <div className="col col-1">Student ID</div>
                            <div className="col col-2">Student Name</div>
                            <div className="col col-3">Vaccination Status</div>
                        </li>
                        {
                            studentList && studentList.map((data,i)=>(
                                <li className="table-row" key={i}>
                                    <div className="col col-1">{data.ID}</div>
                                    <div className="col col-2">{data.name}</div>
                                    <div className="col col-3">{data.vaccinationStatus}</div>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        
    )
}

export default List;