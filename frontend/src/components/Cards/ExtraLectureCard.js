import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import './styles.css'

import { deleteExtraClass,serveRequest,deleteRequest,slotCheck } from '../API/api'

const ExtraLectureCard = ({data,index,handler=0})=>{

    // handler - to identify whether student has logged in or teacher
    // console.log(data)
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
            <p>Time : {data.time} </p>
            <p>Duration: {data.duration}</p>

            <p>Mode : {data.preference}
            </p>
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

    const handleSubmit = async (e)=>{
        e.preventDefault()
        var _id = data._id;
        var studentID = userInfo.ID;
        var studentName = userInfo.name;

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
                                <Link style={{cursor:"default"}} >Submit request</Link>
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