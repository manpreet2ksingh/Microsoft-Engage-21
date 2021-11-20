const StudentResponse = require('../models/studentResponse')

exports.analysis = async (req,res)=>{

    var today = new Date();
    const currentTime = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    const timeAfterWhichAnalysisWillBeShown = "12:00:30";

    if(currentTime < timeAfterWhichAnalysisWillBeShown)
    {
        return res.status(200).json({
            result:"Analysis will be here after 6 PM"
        })
    }

    var day =new Date().getDay();
    day = 4; // for testing purpose

    const {batch,time} = req.body;

    var data = await StudentResponse.find({batch,
                                            time,
                                            day});

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
