const mongoose = require('mongoose');

const requestSchema = mongoose.Schema(
  {
    email:{
        type:String,
    },
    day:{
        type:String
    },
    status:{
        type:Boolean,
        default:false
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Request", requestSchema);
