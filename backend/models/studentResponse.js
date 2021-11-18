const mongoose = require('mongoose');

const studentResponseSchema = mongoose.Schema(
  {
    // batch,time,teacherID,preference,subject,studentID,studentName
    batch:{
        type:String
    },
    time:{
        type:Number
    },
    teacherID:{
        type:Number
    },
    preference:{
        type:String
    },
    subject:{
        type:String
    },
    studentID:{
        type:Number
    },
    studentName:{
        type:String
    },
    status:{                    // status of class - online,offline,cancelled
        type:String,
        default:"Not yet decided"
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("StudentResponse", studentResponseSchema);
