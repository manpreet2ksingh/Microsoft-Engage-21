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
        type:String,
        default:"NA"   // NA-not available/not interested
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
    day:{               // 1-Monday; 2-Tuesday;..
        type:Number
    },
    vaccinationStatus:{
        type:String
    },
    status:{                    // status of class - online,offline,absent
        type:String,
        default:"Not yet known"
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("StudentResponse", studentResponseSchema);
