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
                    type:Number   // 1 represents 8am-9am ;...; 10 represents 5pm-6pm 
                },
                subject:{
                    type:String
                },
                teacherID:{
                    type:Number
                }
            }
        ]
    ]},
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("TimeTable", TimeTableSchema);



