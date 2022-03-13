const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const AutoIncrementPlugin = require("../utils/plugins/mongoose-auto-increment");

const schema = new Schema({
  _id: Number,
  name: String,
  icon: String
});

schema.plugin(AutoIncrementPlugin,{id: 'problem_type_id_counter'});

const Model = model("ProblemType", schema); 

module.exports = Model;