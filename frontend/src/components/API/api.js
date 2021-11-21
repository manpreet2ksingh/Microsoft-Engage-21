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

export const TeacherTimeTable = async (teacherID) =>{
    return await fetch(`http://localhost:8000/api/timetable/teacher/get/${teacherID}`,{
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

export const getAnalysis = async (data)=>{
    return await fetch(`http://localhost:8000/api/lecture/getAnalysis`,{
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

export const getStudentsData = async (batch)=>{
    return await fetch(`http://localhost:8000/api/student/${batch}`,{
        method:"GET"
    }).then(res=>{
        return res.json()
    })
    .catch(error=>{
        console.log(error)
    })
}

export const submitPreference = async (data)=>{
    return await fetch(`http://localhost:8000/api/teacher/setPreference`,{
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

export const updatePreference = async (data)=>{
    return await fetch(`http://localhost:8000/api/teacher/updatePreference`,{
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

export const getStudentLectureStatus = async (data)=>{
    return await fetch(`http://localhost:8000/api/student/getLectureStatus`,{
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

export const getTeacherLectureStatus = async (data)=>{
    return await fetch(`http://localhost:8000/api/teacher/getLectureStatus`,{
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

export const getStudentsList = async (data)=>{
    return await fetch(`http://localhost:8000/api/student/getSelectedStudents`,{
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