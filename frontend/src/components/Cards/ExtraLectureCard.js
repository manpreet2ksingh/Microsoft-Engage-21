import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import './styles.css'

import { deleteExtraClass } from '../API/api'

const ExtraLectureCard = ({data,index,handler=0})=>{

    console.log(data)
    // handler - to identify whether student has logged in or teacher

    const handleDelete = async ()=>{
        var _id = data._id
        await deleteExtraClass({_id})
        .then(res=>{
            if(res.error)
            {
                console.log(res.error)
            }
            else{
                console.log(res);
                window.location.reload();
            }
        })
    }
    
    const teacher = ()=>(
        <div className="content-teacher">
            <h2>0{index}</h2>
            <h3>{data.subject.toUpperCase()}</h3>
            <p>Batch : {data.batch}</p>
            <p>Date : {data.date}</p>
            <p>Time : {data.time}</p>
            <p>Duration: {data.duration}</p>
            <p>Mode : {data.preference} </p>
            <Link to={
                {
                    pathname:"/extraLecture",
                    state:{
                        operation:"update",
                        data:data
                    }
                }
            }>Update</Link>
            <a onClick={handleDelete}>Delete</a>
        </div>
    )

    const student = ()=>(
        <div className="content">
            <h2>0{index}</h2>
            <h3>{data.subject.toUpperCase()}</h3>
            <p>Batch : {data.batch}</p>
            <p>Date : {data.date}</p>
            <p>Time : {data.time}</p>
            <p>Duration: {data.duration}</p>
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

export default ExtraLectureCard;