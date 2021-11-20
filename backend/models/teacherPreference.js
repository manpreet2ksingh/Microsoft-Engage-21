const mongoose = require('mongoose');

const teacherPreferenceSchema = mongoose.Schema(
  {
    batch:{
        type:String
    },
    time:{
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
        type:String,             //Not vaccinated,partially vaccinated,fully vaccinated
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("TeacherPreference", teacherPreferenceSchema);
