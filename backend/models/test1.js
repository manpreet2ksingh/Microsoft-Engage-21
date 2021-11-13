const mongoose = require('mongoose');


const testSchema = mongoose.Schema(
  {
    count:{
        type:Number
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Test", testSchema);
