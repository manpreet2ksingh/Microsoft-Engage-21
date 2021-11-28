const mongoose = require('mongoose');

const TimeTableSchema = mongoose.Schema({
    batch:{
        type:String,
        required:true
    },
    timetable:[
        [
            {
                _id: false,
                time:{
                    type:Number   // 1 represents 8am-9am ;2 represents 9am-10am ...
                },
                subject:{
                    type:String
                },
                teacherID:{
                    type:Number
                },
                teacherName:{
                    type:String
                }
            }
        ]
    ]},
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("TimeTable", TimeTableSchema);



