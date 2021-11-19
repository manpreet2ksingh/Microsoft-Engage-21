export const signin = async (user)=>{
    return await fetch(`http://localhost:8000/api/users/signin`,{
        method:'POST',
        headers:{
            Accept:'application/json',
            'Content-Type':'application/json'
        },
        body: JSON.stringify(user)
    })
    .then(res=>{
        return res.json()
    })
}


export const TimeTable = async (batch) =>{
    return await fetch(`http://localhost:8000/api/timetable/get/${batch}`,{
        method:"GET"
    }).then(res=>{
        return res.json()
    })
    .catch(error=>{
        console.log(error)
    })
}

export const submitStudentResponse = async (data)=>{
    return await fetch(`http://localhost:8000/api/student/${data.studentID}/response`,{
        method:'POST',
        headers:{
            Accept:'application/json',
            'Content-Type':'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(res=>{
        return res.json()
    })
}

export const updateStudentResponse = async (data)=>{
    return await fetch(`http://localhost:8000/api/student/${data.studentID}/updateResponse`,{
        method:'POST',
        headers:{
            Accept:'application/json',
            'Content-Type':'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(res=>{
        return res.json()
    })
}