const StudentResponse = require('../models/studentResponse')

exports.analysis = async (req,res)=>{

    const currentTime = new Date("01-01-1970");
    const timeAfterWhichAnalysisWillBeShown = new Date("1-01-1970 18:00:00");

    // if(currentTime < timeAfterWhichAnalysisWillBeShown)
    // {
    //     return res.status(200).json({
    //         result:"Analysis will be here after 6 PM"
    //     })
    // }

    const {batch,time,day} = req.body;

    var nextDate = new Date();
    nextDate.setDate(nextDate.getDate() + 1);

    var previousDate = new Date();
    previousDate.setDate(previousDate.getDate() - 2);

    var data = await StudentResponse.find({batch,
                                            time,
                                            day,
                                            createdAt:{$gte:previousDate,$lte:nextDate}});

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
        absentees,
        data
    })
}
