const TimeTable = require('../models/studentTimeTable');

const addTimeTable = async (req,res)=>{
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

const timetable = async (req,res)=>{
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

module.exports = {addTimeTable,timetable};