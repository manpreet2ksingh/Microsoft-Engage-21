const User = require('../models/user')
const StudentResponse = require('../models/studentResponse')

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

const updateRequestStatus = async (ModeOfPreferenceOfLecture,date,nextDate,batch,time)=>{
    await StudentResponse.updateMany({
        batch,
        time,
        createdAt:{$gte:date,$lt:nextDate}
    },{
        $set:{"status":ModeOfPreferenceOfLecture}
    })
}

const updateOfflineStatus = async (studentID,date,nextDate,batch,time,modeAlloted)=>{

    await StudentResponse.updateOne({
        batch,
        time,
        studentID,
        createdAt:{$gte:date,$lt:nextDate}
    },{
        $set:{"status":modeAlloted}
    })
}


exports.responseToTeacher = async (req,res)=>{
    /* preference, batch, subject, time, vaccinationStatus - not vaccinated, partially vaccinated,fully vaccinated */
    
    const {ModeOfPreferenceOfLecture, batch, time, preferredVaccinationStatus,preferredClassStrength} = req.body;
    
    let date = new Date()
    date.setDate(date.getDate() - 1);

    var nextDate = new Date();
    nextDate.setDate(nextDate.getDate() + 1);

    // console.log(date);
    // console.log(nextDate)

    if(ModeOfPreferenceOfLecture === 'Online' || ModeOfPreferenceOfLecture === 'NA'){
        if(ModeOfPreferenceOfLecture === 'NA')  // NA - not available
        {
            ModeOfPreferenceOfLecture = 'Cancelled';
        }
        updateRequestStatus(ModeOfPreferenceOfLecture,date,nextDate,batch,time);
        return res.status(200).json({
            result:"Informed to students"
        })
    }

    // selecting top students "preferredClassStrength" for offline mode according to response time submission and preference

    const studentsData = await User.find({batch,role:0});

    var map = new Map();   // maps studentID with their vaccination status

    studentsData.forEach((record)=>{
        map[record.ID] = record.vaccinationStatus;
    })

    var mp = new Map();   // maps vaccinationStatus with a number 

    mp["Not vaccinated"] = 0;
    mp["Partially vaccinated"] = 1;
    mp["Fully vaccinated"] = 2;

    const data = await StudentResponse.find({batch,
        time,
        preference:"Offline",
        updatedAt:{$gte:date,$lt:nextDate}}).sort({createdAt:1});

    var temp = preferredClassStrength;
    var ret = [];
    for(var i=0;i<data.length && temp>0;i++)
    {
        if(mp[map[data[i].studentID]] >= mp[preferredVaccinationStatus])
        {
            await updateOfflineStatus(data[i].studentID,date,nextDate,batch,time,"Offline");
            var selectedStudent = {};
            selectedStudent.name = data[i].studentName;
            selectedStudent.ID = data[i].studentID;
            ret.push(selectedStudent)
            temp = temp - 1;
        }else
        {
            await updateOfflineStatus(data[i].studentID,date,nextDate,batch,time,"Online");
        }
    }

    return res.status(200).json({
        selectedStudents:ret
    })
}