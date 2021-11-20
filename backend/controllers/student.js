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
