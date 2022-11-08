const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  desc: {
    type: String,
    required: true,
  },
  done:{
    type:Boolean,
    default:false
  }
});

module.exports = mongoose.model("ToDo", todoSchema);
