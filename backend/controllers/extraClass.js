const ExtraClass = require('../models/extraClass')

const TimeTable = require('../models/studentTimeTable')


const conflictCheck = async (date,time,duration,batch,_id)=>{

    var day = new Date(date).getDay();

    day = day - 1;
    day = (day+7)%7;

    const dateTime = new Date(date+" "+time)

    var [hh,mm] = time.split(":")           // hh - hour ; mm - minutes

    var [durationHH,durationMM] = duration.split(":")

    hh = parseInt(hh);
    mm = parseInt(mm);
    durationHH = parseInt(durationHH);
    durationMM = parseInt(durationMM);

    var minutesToAdd = durationHH*60+durationMM;
    var startTime    = new Date("01-01-1970 "+hh+":"+mm);
    var endingTime   = new Date(startTime.getTime() + minutesToAdd*60000);

    var ehh = endingTime.getHours().toString();
    var emm = endingTime.getMinutes().toString();

    const endingDateTime = new Date(date+" "+ehh+":"+emm);

    startTimeOfExtraLecture = hh;
    endTimeOfExtraLecture = endingTime.getMinutes()?endingTime.getHours()+1:endingTime.getHours();

    const response = await TimeTable.findOne({batch});

    var timetable = response.timetable[day];

    var flag = false;

    /* checking conflicts with timetable */

    timetable && timetable.forEach(lecture=>{
        var startTimeOfLecture = lecture.time + 7;
        var endTimeOfLecture = lecture.time + 8;

        if((startTimeOfExtraLecture>=startTimeOfLecture && endTimeOfExtraLecture<=endTimeOfLecture) ||
           (startTimeOfExtraLecture<=startTimeOfLecture && endTimeOfExtraLecture>=endTimeOfLecture))
        {
            flag = true;
        }
    })

    // checking conflicts with other extra lectures created

    const end = endingDateTime.toISOString()
    const start = dateTime.toISOString()
  
    const results = await ExtraClass.find({
        batch,
        _id:{$ne:_id},          /* excluding the one to be updated ; only in update case */
        $or:[
           { $and: [{dateTime:{$gte:new Date(start)}},{endingDateTime:{$lte:new Date(end)}}]},
           { $and: [{dateTime:{$lte:new Date(start)}},{endingDateTime:{$gte:new Date(end)}}]}
        ]
    })

    // console.log(results)

    if(flag || results.length>0)
    {
        return 1;
    }
    return 0;
}

const createExtraClass = async (req,res)=>{
    const {batch,
        time,
        duration,
        date,
        teacherID,
        teacherName,
        preference,
        subject,
        vaccinationStatus,
        lectureStrength} = req.body

    /* Invalid Date check */
    
    const currentDateTime = new Date()
    const dateTime = new Date(date+" "+time)

    /* 
        dateTime       - startTime of lecture 
        endingDateTime - endTime of lecture
    */

    if(dateTime < currentDateTime)
    {
        return res.status(400).json({
            error:"Invalid Date or time"
        })
    }

    /* Calculating endingTime of lecture */

    var [hh,mm] = time.split(":")           // hh - hour ; mm - minutes

    var [durationHH,durationMM] = duration.split(":")

    hh = parseInt(hh);
    mm = parseInt(mm);
    durationHH = parseInt(durationHH);
    durationMM = parseInt(durationMM);

    var minutesToAdd = durationHH*60+durationMM;
    var startTime    = new Date("01-01-1970 "+hh+":"+mm);
    var endingTime   = new Date(startTime.getTime() + minutesToAdd*60000);

    var ehh = endingTime.getHours().toString();
    var emm = endingTime.getMinutes().toString();

    const endingDateTime = new Date(date+" "+ehh+":"+emm);

    /* first check conflict with timetable or other extra lectures before creating one*/

    if(await conflictCheck(date,time,duration,batch) === 1)
    {
        return res.status(400).json({
                error:"Lecture already scheduled at selected time interval. Choose a different time slot."
            })
    }

    /* Create extra lecture */

    const save = await ExtraClass.create({
        batch,
        time,
        duration,
        date,
        dateTime,               
        endingDateTime,
        teacherID,
        teacherName,
        preference,
        subject,
        vaccinationStatus,
        lectureStrength
    })

    if(save){
        return res.status(200).json({
            _id:save._id,
            success:"Extra class created successfully"
        })
    }
    else{
        return res.status(400).json({
            error:"Error creating extra class"
        })
    }
}

const updateExtraClass = async (req,res)=>{
    const {batch,
        time,
        duration,
        date,
        teacherID,
        teacherName,
        preference,
        subject,
        vaccinationStatus,
        lectureStrength,
        _id} = req.body

    
    /* Invalid Date check */
    
    const currentDateTime = new Date()
    const dateTime = new Date(date+" "+time)

    /* 
        dateTime       - startTime of lecture 
        endingDateTime - endTime of lecture
    */

    if(dateTime < currentDateTime)
    {
        return res.status(400).json({
            error:"Invalid Date or time"
        })
    }

    /* Calculating endingTime of lecture */

    var [hh,mm] = time.split(":")           // hh - hour ; mm - minutes

    var [durationHH,durationMM] = duration.split(":")

    hh = parseInt(hh);
    mm = parseInt(mm);
    durationHH = parseInt(durationHH);
    durationMM = parseInt(durationMM);

    var minutesToAdd = durationHH*60+durationMM;
    var startTime    = new Date("01-01-1970 "+hh+":"+mm);
    var endingTime   = new Date(startTime.getTime() + minutesToAdd*60000);

    var ehh = endingTime.getHours().toString();
    var emm = endingTime.getMinutes().toString();

    const endingDateTime = new Date(date+" "+ehh+":"+emm);

    /* first check conflict with timetable or other extra lectures before creating one*/

    if(await conflictCheck(date,time,duration,batch,_id) === 1)
    {
        return res.status(400).json({
                error:"Lecture already scheduled at selected time interval. Choose a different time slot."
            })
    }
    

    const update = await ExtraClass.updateOne({
        _id
    },{
        batch,
        time,
        duration,
        date,
        dateTime,
        endingDateTime,
        teacherID,
        teacherName,
        preference,
        subject,
        vaccinationStatus,
        lectureStrength,
    })

    if(update.modifiedCount > 0){
        return res.status(200).json({
            success:"Extra class updated successfully"
        })
    }
    else{
        return res.status(400).json({
            error:"Error updating extra class"
        })
    }
}

const deleteExtraClass = async (req,res)=>{
    const {_id} = req.body

    const response = await ExtraClass.deleteOne({_id});

    if(response.deletedCount > 0)
    {
        return res.status(200).json({
            success:"Extra class deleted successfully"
        })
    }
    return res.status(400).json({
        error:"Error deleting extra class"
    })
}

const getExtraClassesListByBatch = async (req,res)=>{
    const batch = req.params.batch

    console.log(batch)
    const list = await ExtraClass.find({
        batch,
        "dateTime":{
            $gte:new Date()
        }
    })

    return res.json(list);
}

const getExtraClassesListByTeacherID = async (req,res)=>{
    const teacherID = req.params.teacherID

    console.log(teacherID)
    const list = await ExtraClass.find({
        teacherID,
        "dateTime":{
            $gte:new Date()
        }
    })

    return res.json(list);
}

module.exports = {createExtraClass,
                  updateExtraClass,
                  deleteExtraClass,
                  getExtraClassesListByBatch,
                  getExtraClassesListByTeacherID}