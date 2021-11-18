const mongoose = require('mongoose');

const TeacherTimeTableSchema = mongoose.Schema({
    teacherID:{
        type:Number,
        required:true
    },
    teacherName:{
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
                batch:{
                    type:String
                }
            }
        ]
    ]},
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("TeachersTimeTable", TeacherTimeTableSchema);



