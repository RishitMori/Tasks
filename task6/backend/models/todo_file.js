const mongoose = require("mongoose");
const TodoSchema = new mongoose.Schema({

    text:{
      type:String,
      required:true
  }},
  { timestamps: true }
);

const TodoModel = mongoose.model("Message", TodoSchema);

module.exports = TodoModel;
