const StudentResponse = require('../models/studentResponse');
const User = require('../models/user')

exports.getStudentByID = async (req,res,next,id)=>{
    await User.findOne({
        ID:id,
        role:0
    }).exec((error,student)=>{
        if(error)
        {
            return res.status(400).json({
                error:"student not found in database"
            })
        }
        req.student = student
        next();
    })
}

exports.getStudentsByBatch = async (req,res)=>{
    
    const data = await User.find({
        batch:req.params.batch,
        role:0
    },{
        password:0
    })

    if(data)
    {
        return res.status(201).json(data);
    }
    else
    {
        return res.status(400).json({
            error:"Error getting students data"
        })
    }
}

exports.saveResponse = async (req,res)=>{
    
    const {batch,time,preference,studentID,studentName,day} = req.body;

    const save = await StudentResponse.create({
        batch,
        time,
        preference,
        studentID,
        studentName,
        day
    })

    if(save)
    {
        return res.status(201).json({
            result:"Response collected"
        })
    }
    else
    {
        return res.status(400).json({
            error:"Something went wrong"
        })
    }
}

exports.updateResponse = async (req,res)=>{
    const {batch,time,preference,studentID,studentName} = req.body;

    const response = await StudentResponse.updateOne({
        batch,
        time,
        studentID,
        studentName
    },{
        $set:{
            "preference":preference,
        }
    })

    if(response.modifiedCount > 0)
    {
        return res.status(201).json({
            result:"Response updated"
        })
    }
    return res.status(400).json({
        error:"Submit your response first"
    })
}

exports.selectedStudentsForOfflineLecture = async (req,res)=>{
    const {batch,time} = req.body;

    var day = new Date().getDay();
    day = 4; // for testing

    const studentsData = await User.find({batch,role:0});

    var map = new Map();   // maps studentID with their vaccination status

    studentsData.forEach((record)=>{
        map.set(record.ID,record.vaccinationStatus)
    })

    var mp = new Map();   // maps vaccinationStatus with a number 

    mp.set("Not vaccinated",0)
    mp.set("Partially vaccinated",1)
    mp.set("Fully vaccinated",2)

    const data = await StudentResponse.find({
        batch,
        time,
        status:"Offline",
        day,
    });

    console.log(data)
    var list = []

    data.forEach(record=>{
        var selectedStudent = {};
        selectedStudent.name = record.studentName;
        selectedStudent.ID = record.studentID;
        selectedStudent.vaccinationStatus = map.get(record.studentID)
        list.push(selectedStudent)
    })

    
    console.log(list);
    return res.json(list);
}

exports.getLectureStatus = async (req,res)=>{       // online,offline,NA(or not attending)
    const {batch,time,studentID} = req.body;

    const result = await StudentResponse.findOne({
        batch,
        time,
        studentID
    })

    if(result)
    {
        return res.json(result.status)
    }
    return res.status(400).json({
        error:"Error getting status"
    })
}
