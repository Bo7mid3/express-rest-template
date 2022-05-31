const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const schema = new Schema({
  client: Number,
  repairMan: Number,
  history: [String]
});


const Model = model("ChatHistory", schema); 

module.exports = Model;