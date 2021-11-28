const mongoose = require('mongoose');

const teacherPreferenceSchema = mongoose.Schema(
  {
    batch:{
        type:String
    },
    time:{
        type:Number
    },
    day:{
        type:Number
    },
    modeOfPreference:{          //online,offline,cancelled
        type:String,
        required:true
    },
    preferredLectureStrength:{
        type:Number
    },
    vaccinationStatus:{
        type:Number,             //0-Not vaccinated; 1-partially vaccinated; 2-fully vaccinated
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("TeacherPreference", teacherPreferenceSchema);
