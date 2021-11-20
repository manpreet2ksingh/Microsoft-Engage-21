const TimeTable = require('../models/studentTimeTable');
const TeacherTimeTable = require('../models/teacherTimeTable')

const addTimeTable = async (req,res)=>{             // add student timetable
    const {batch,timetable} = req.body;

    const tt = await TimeTable.create({        // tt - timetable
        batch,
        timetable
    })

    if(tt)
    {
        return res.status(201).json({
            tt
        })
    }
    else
    {
        return res.status(400).json({
            error:"Something went wrong"
        })
    }  
}

const addTeacherTimeTable = async (req,res)=>{
    const {teacherID,timetable} = req.body;

    const tt = await TeacherTimeTable.create({        // tt - timetable
        teacherID,
        timetable
    })

    if(tt)
    {
        return res.status(201).json({
            tt
        })
    }
    else
    {
        return res.status(400).json({
            error:"Something went wrong"
        })
    }  
}

const timetable = async (req,res)=>{                                // get student Timetable
    const tt = await TimeTable.findOne({batch:req.params.batch});
    if(tt)
    {
        return res.json(tt)
    }
    else
    {
        return res.status(404).json({
            error:"Something went wrong"
        })
    }
}

const teacherTimetable = async (req,res)=>{         // get teacher Timetable                            
    const tt = await TeacherTimeTable.findOne({teacherID:req.params.ID});
    if(tt)
    {
        return res.json(tt)
    }
    else
    {
        return res.status(404).json({
            error:"Something went wrong"
        })
    }
}

module.exports = {addTimeTable,timetable,addTeacherTimeTable,teacherTimetable};