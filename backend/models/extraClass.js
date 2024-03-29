const mongoose = require('mongoose');

const extraClassSchema = mongoose.Schema(
  {
    batch:{
        type:String
    },
    time:{
        type:String
    },
    duration:{
        type:String
    },
    date:{
        type:String
    },
    teacherID:{
        type:Number
    },
    teacherName:{
        type:String,
    },
    preference:{
        type:String
    },
    subject:{
        type:String
    },
    registered:{            // count of submitted requests
        type:Number,
        default:0
    },
    dateTime:{
        type:Date
    },
    endingDateTime:{
        type:Date
    },
    vaccinationStatus:{
        type:String
    },
    lectureStrength:{
        type:Number
    },
    listOfStudents:{      // shortlisted students for offline mode
        type:Array
    }
        
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("ExtraClass", extraClassSchema);
