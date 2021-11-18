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

exports.saveResponse = async (req,res)=>{
    const {batch,time,preference,studentID,studentName} = req.body;

    const save = await StudentResponse.create({
        batch,
        time,
        preference,
        studentID,
        studentName
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
