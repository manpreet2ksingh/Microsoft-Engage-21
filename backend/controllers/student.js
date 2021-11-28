const StudentResponse = require('../models/studentResponse');
const User = require('../models/user')

exports.updateVaccinationStatus = async (req,res)=>{
    const {ID,role,vaccinationStatus,link} = req.body;
    // console.log(req.body);

    const result = await User.updateOne({ID,role},{
        $set:{
            "vaccinationStatus":vaccinationStatus,
            "vaccinationCertificateLink":link
        }
    })

    if(result.modifiedCount > 0)
    {
        return res.status(200).json({
            success:"Vaccination status updated"
        })
    }
    return res.status(400).json({
        error:"Error updating vaccination status"
    })
}

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

    const user = await User.findOne({ID:studentID})

    // console.log(user.vaccinationStatus)

    const save = await StudentResponse.create({
        batch,
        time,
        preference,
        studentID,
        studentName,
        day,
        "vaccinationStatus":user.vaccinationStatus
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
    const {batch,time,preference,studentID,studentName,day} = req.body;

    var nextDate = new Date();
    nextDate.setDate(nextDate.getDate() + 1);

    var previousDate = new Date();
    previousDate.setDate(previousDate.getDate() - 2);

    const response = await StudentResponse.updateOne({
        batch,
        time,
        studentID,
        studentName,
        day,
        createdAt:{$gte:previousDate,$lte:nextDate}
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
    const {batch,time,day} = req.body;

    const studentsData = await User.find({batch,role:0});

    var map = new Map();   // maps studentID with their vaccination status

    studentsData.forEach((record)=>{
        map.set(record.ID,record.vaccinationStatus)
    })

    var mp = new Map();   // maps vaccinationStatus with a number 

    mp.set("Not vaccinated",0)
    mp.set("Partially vaccinated",1)
    mp.set("Fully vaccinated",2)

    var nextDate = new Date();
    nextDate.setDate(nextDate.getDate() + 1);

    var previousDate = new Date();
    previousDate.setDate(previousDate.getDate() - 2);

    const data = await StudentResponse.find({
        batch,
        time,
        status:"Offline",
        day,
        createdAt:{$gte:previousDate,$lte:nextDate}
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
    const {batch,time,studentID,day} = req.body;

    /*
        to get records of todays lecture status whose preferences/responses were submitted one yesterday.

        day attribute will help filter the results for today.
    */
    var nextDate = new Date();
    nextDate.setDate(nextDate.getDate() + 1);

    var previousDate = new Date();
    previousDate.setDate(previousDate.getDate() - 2);

    const result = await StudentResponse.findOne({
        batch,
        time,
        studentID,
        day,
        createdAt:{$gte:previousDate,$lte:nextDate}
    })

    if(result)
    {
        return res.json(result.status)
    }
    return res.status(200).json({
        error:"Status not updated"
    })
}
