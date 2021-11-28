import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import './styles.css'
import {Alert} from 'react-bootstrap'

import { deleteExtraClass,serveRequest,deleteRequest,slotCheck } from '../API/api'

const ExtraLectureCard = ({data,
                           index,
                           handler=0,
                           updateResponse})=>{

    // handler - to identify whether student has logged in or teacher
    // console.log(data)

    const map = new Map()

    map.set("Not vaccinated",0)
    map.set("Partially vaccinated",1)
    map.set("Fully vaccinated",2)
    

    const userInfo = JSON.parse(localStorage.getItem('userInfo'))

    const [disableButton,setDisableButton] = useState(false)

    const handleDelete = async ()=>{
        var _id = data._id
        await deleteExtraClass({_id})
        .then(res=>{
            if(res.error)
            {
                console.log(res.error)
            }
            else{
                // console.log(res);
                window.location.reload();
            }
        })
    }
    
    const teacher = ()=>{
        
        var _id = data._id;
        var batch = data.batch
        return (
        <div className="content-teacher">
            <h2>0{index}</h2>
            <h3>{data.subject.toUpperCase()}</h3>
            <p>Batch : {data.batch}</p>
            <p>Date : {data.date}</p>
            <p>Time : {data.time} </p>
            <p>Duration: {data.duration}</p>
            <p>Mode : {data.preference} </p>
            <div>
                {
                    data.preference === "Offline" && 
                    
                    <Link style={{
                                marginTop:"2px",
                                marginBottom:"2px", 
                                padding:"5px",
                                display:"contents",
                                color:"#0645AD",
                                fontWeight:"800",
                                }} 
                        to={
                            {
                                pathname:"/studentsList",
                                state:{
                                    data:{
                                        _id,
                                        batch
                                    }
                                }
                            }
                        }
                    >
                        Students list
                    </Link>
                }
            </div>
            <Link to={
                {
                    pathname:"/extraLecture",
                    state:{
                        operation:"update",
                        data:data
                    }
                }
            }>Update</Link>
            <Link onClick={handleDelete}>Delete</Link>
        </div>
        )
    }

    const handleDeleteRequest = async (e)=>{
        e.preventDefault()

        var _id = data._id;
        var studentID = userInfo.ID;
        var studentName = userInfo.name;
        await deleteRequest({_id,studentID,studentName})
        .then(res=>{
            if(res.error)
            {
                console.log(res.error)
            }
            else{
                console.log(res);
                localStorage.removeItem(_id);
            }
        })
        window.location.reload();

    }

    const handleSubmit = async (e)=>{
        e.preventDefault()
        var _id = data._id;
        var studentID = userInfo.ID;
        var studentName = userInfo.name;
        var vaccinationStatus = userInfo.vaccinationStatus;
        var preferredVaccinationStatus = data.vaccinationStatus

        console.log(vaccinationStatus)
        console.log(preferredVaccinationStatus)

        if(map.get(vaccinationStatus) < map.get(preferredVaccinationStatus))
        {
            updateResponse(`Required vaccination status: ${preferredVaccinationStatus}`)
            return ;
        }

        updateResponse()

        await serveRequest({_id,studentID,studentName})
        .then(res=>{
            if(res.error)
            {
                console.log(res.error)
            }
            else{
                console.log(res);
                localStorage.setItem(_id,1);
            }
        })
        window.location.reload();
        
    }

    const check = async ()=>{
        var _id = data._id;
        await slotCheck({_id})
        .then(res=>{
            if(res && res.error)
            {
                setDisableButton(true)
            }
        })
    }

    useEffect(()=>{
        check()
    },[])

    const handleClick = (e)=>{
        e.preventDefault()
        updateResponse(`All slots are filled`)
    }

    const student = ()=>{

        return(
            <div className="content">
                <h2>0{index}</h2>
                <h3>{data.subject.toUpperCase()}</h3>
                <p>Date : {data.date}</p>
                <p>Time : {data.time}</p>
                <p>Duration: {data.duration}</p>
                <p>Mode: {data.preference}</p>
                {
                    data.preference === 'Offline' && (localStorage.getItem(data._id)?
                        <Link onClick={handleDeleteRequest}>Delete request</Link>
                                :
                        <>
                            {
                                disableButton?
                                <Link style={{cursor:"default"}} onClick={handleClick}>Submit request</Link>
                                    :
                                <Link onClick={handleSubmit} >Submit request</Link>
                            }
                            
                        </>
                    )
                }
            </div>
        )
    }

    return(  
        <>
            <div className="card">
                <div className="box">
                    {
                        handler?teacher():student()
                    }
                </div>
            </div>
        </>
    )
}

export default ExtraLectureCard;