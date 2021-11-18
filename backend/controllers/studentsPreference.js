const StudentResponse = require('../models/studentResponse')

exports.analysis = async (req,res)=>{

    let date = new Date()
    date.setDate(date.getDate() - 1);

    var nextDate = new Date();
    nextDate.setDate(nextDate.getDate() + 1);

    // console.log(date);
    // console.log(nextDate)

    const {batch,time,teacherID} = req.body;

    const data = await StudentResponse.find({batch,
                                            time,
                                            teacherID,
                                            createdAt:{$gte:date,$lt:nextDate}});

    var offline=0,online=0,absentees=0;

    data.forEach((element)=>{
        if(element.preference == 'Offline')
            offline += 1;
        else if(element.preference == 'Online')
            online += 1;
        else
            absentees += 1;
    })

    return res.json({
        offline,
        online,
        absentees
    })
}
