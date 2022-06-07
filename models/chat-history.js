const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const schema = new Schema({
  client: Number,
  repairMan: Number,
  history: [{sender: Number, content: String}]
});


const Model = model("ChatHistory", schema); 

module.exports = Model;