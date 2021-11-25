import React from 'react'
import Card from 'react-bootstrap/Card'
import {ListGroup} from 'react-bootstrap'

const Display = ({lecture,account})=>{

    // console.log(lecture)

    const map = new Map();  // mapping time .... stored as number in database like "1" - 08:00-09:00 .. so on
    map.set(1,"08:00 - 09:00")
    map.set(2,"09:00 - 10:00")
    map.set(3,"10:00 - 11:00")
    map.set(4,"11:00 - 12:00")
    map.set(5,"12:00 - 13:00")
    map.set(6,"13:00 - 14:00")
    map.set(7,"14:00 - 15:00")
    map.set(8,"15:00 - 16:00")
    map.set(9,"16:00 - 17:00")

    const teacher = ()=>{
        return(
            <>
            <ListGroup variant="flush">
                <ListGroup.Item>{map.get(lecture.time)}</ListGroup.Item>
                <ListGroup.Item>Batch : {lecture.batch}</ListGroup.Item>
            </ListGroup>
            </>
        )
    }

    const student = ()=>{
        return(
            <>
            <ListGroup variant="flush">
                <ListGroup.Item>{map.get(lecture.time)}</ListGroup.Item>
                <ListGroup.Item>{lecture.teacherName}</ListGroup.Item>
            </ListGroup>
            </>
        )
    }



    return(
        <Card style={{ width: '10rem' }} bg='dark' text='white'>
            <Card.Header>{lecture.subject.toUpperCase()}</Card.Header>
            {
                account?teacher():student()
            }
        </Card>
    )
}

export default Display