const mongoose = require('mongoose');

const TeacherTimeTableSchema = mongoose.Schema({
    teacherID:{
        type:Number,
        required:true
    },
    timetable:[
        [
            {
                _id: false,
                time:{
                    type:Number   // 1 represents 8am-9am ; 2 represents 9am-10am; ...
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

module.exports = mongoose.model("TeacherTimeTable", TeacherTimeTableSchema);



