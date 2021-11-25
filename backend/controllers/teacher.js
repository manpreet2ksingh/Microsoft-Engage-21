const User = require('../models/user')
const StudentResponse = require('../models/studentResponse')
const TeacherPreference = require('../models/teacherPreference')

exports.getTeacherByID = async (req,res,next,id)=>{
    await User.findOne({
        ID:id,
        role:1
    }).exec((error,teacher)=>{
        if(error)
        {
            return res.status(400).json({
                error:"Teacher not found in database"
            })
        }
        req.teacher = teacher
        next();
    })
}

const updateRequestStatus = async (ModeOfPreferenceOfLecture,batch,time,day)=>{ // for online && cancelled
    
    var nextDate = new Date();
    nextDate.setDate(nextDate.getDate() + 1);

    var previousDate = new Date();
    previousDate.setDate(previousDate.getDate() - 2);
    
    await StudentResponse.updateMany({
        batch,
        time,
        day,
        createdAt:{$gte:previousDate,$lte:nextDate}
    },{
        $set:{"status":ModeOfPreferenceOfLecture}
    })
}

const handleOfflineModeCase = async (batch,time,day,preferredLectureStrength,vaccinationStatus)=>{
    /* optimised query to update offline status of given count students*/
   
    /* first filter the data using given preferences,
        then extract the filtered studentID's,
        then update data using the $in (update those that are present in the "in" set)
    */

    var nextDate = new Date();
    nextDate.setDate(nextDate.getDate() + 1);

    var previousDate = new Date();
    previousDate.setDate(previousDate.getDate() - 2);

    results = await StudentResponse.find({
        batch,
        time,
        day,
        preference:"Offline",
        vaccinationStatus:{
            $gte:vaccinationStatus
        }
    })
    .sort({createdAt:1})
    .limit(preferredLectureStrength)

    // console.log("HELLO ",results);
    
    ids = results && results.map((record)=>{
        return record.studentID
    })

    await StudentResponse.updateMany({studentID:{$in:ids},time,createdAt:{$gte:previousDate,$lte:nextDate}},{
        $set:{
            status:"Offline"
        }
    })
}

exports.saveTeacherPreference = async (req,res)=>{

    var mp = new Map();   // maps vaccinationStatus with a number 

    mp.set("Not vaccinated",0)
    mp.set("Partially vaccinated",1)
    mp.set("Fully vaccinated",2)

    var {batch,time,modeOfPreference,preferredLectureStrength,vaccinationStatus,day} = req.body;

    vaccinationStatus = mp.get(vaccinationStatus)

    var day = new Date().getDay()-1;

    const save = await TeacherPreference.create({
        batch,
        time,
        modeOfPreference,
        preferredLectureStrength,
        vaccinationStatus,
        day
    })

    if(save)
    {
        if(modeOfPreference === 'Online' || modeOfPreference === 'NA')
        {
            var mode = modeOfPreference
            if(modeOfPreference === 'NA')  // NA - not available
            {
                mode = 'Cancelled';
            }

            await updateRequestStatus(mode,batch,time,day);
        }
        else
        {
            await handleOfflineModeCase(batch,time,day,preferredLectureStrength,vaccinationStatus)
        }

        return res.status(201).json({
            result:"Preference saved"
        })
    }
    else
    {
        return res.status(400).json({
            error:"Something went wrong"
        })
    }

    
}

exports.updateTeacherPreference = async (req,res)=>{

    var mp = new Map();   // maps vaccinationStatus with a number 

    mp.set("Not vaccinated",0)
    mp.set("Partially vaccinated",1)
    mp.set("Fully vaccinated",2)

    var {batch,time,modeOfPreference,preferredLectureStrength,vaccinationStatus,day} = req.body;
    vaccinationStatus = mp.get(vaccinationStatus)

    var day = new Date().getDay();

    var nextDate = new Date();
    nextDate.setDate(nextDate.getDate() + 1);

    var previousDate = new Date();
    previousDate.setDate(previousDate.getDate() - 2);

    const update = await TeacherPreference.updateOne({
        batch,
        time,
        day,
        createdAt:{$gte:previousDate,$lte:nextDate}
    },{
        $set:{
            "modeOfPreference":modeOfPreference,
            "preferredLectureStrength":preferredLectureStrength,
            "vaccinationStatus":vaccinationStatus
        }
    })

    if(update.modifiedCount > 0)
    {
        if(modeOfPreference === 'Online' || modeOfPreference === 'NA')
        {
            var mode = modeOfPreference
            if(modeOfPreference === 'NA')  // NA - not available
            {
                mode = 'Cancelled';
            }

            await updateRequestStatus(mode,batch,time,day);
        }
        else
        {
            await StudentResponse.updateMany({
                batch,
                time
            },{
                $set:{
                    status:"Not yet decided"
                }
            })

           /*
                ids = db.collection.find(<condition>).limit(<limit>).map(
                    function(doc) {
                        return doc._id;
                    }
                );
                db.collection.updateMany({_id: {$in: ids}}, <update>})
           */
                
            handleOfflineModeCase(batch,time,day,preferredLectureStrength,vaccinationStatus)

        }

        return res.status(201).json({
            result:"Preference updated"
        })
    }
    else
    {
        return res.status(400).json({
            error:"Error updating preference"
        })
    }
}

exports.getTeacherLectureStatus = async (req,res)=>{       // online,offline,NA(or not attending)
    const {batch,time,day} = req.body;

    var nextDate = new Date();
    nextDate.setDate(nextDate.getDate() + 1);

    var previousDate = new Date();
    previousDate.setDate(previousDate.getDate() - 2);

    const result = await TeacherPreference.findOne({
        batch,
        time,
        day,
        createdAt:{$gte:previousDate,$lte:nextDate}
    })

    if(result)
    {
        if(result.modeOfPreference == "NA")
        {
            return res.json("Cancelled")
        }
        return res.json(result.modeOfPreference)
    }

    return res.status(200).json({
        error:"status not updated."
    })
}