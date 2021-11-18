const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema(
  {
    ID:{
      type:Number,
      required:true
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {             // role - 0:students ; 1:teachers
      type: Number,
      required: true,
      default: 0,
    },
    batch:{               // for students
        type:String
    },
    vaccinationStatus:{
        type:String,
        required:true,
        default:"Not vaccinated"
    },
    vaccinationCertificate:{
        type:String // for time-being
    }
  },
  {
    timestamps: true,
  }
);

// decrpyt password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// will encrypt password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

module.exports = mongoose.model("User", userSchema);
