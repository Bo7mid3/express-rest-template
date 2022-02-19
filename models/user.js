const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");

const schema = new Schema({
  person: {
    firstName: String,
    middleName: String,
    lastName: String,
    tel: Number,
  },
  email: String,
  password: String,
  type: {
    type: String,
    enum: ["Client", "Repairperson"],
  },
  img: {
    data: Buffer,
    contentType: String,
  },
});

const Model = model("User", schema);

const methods = schema.methods; 

methods.hashPassword = function() {
  const salt = bcrypt.genSaltSync(10);
  this.password = bcrypt.hashSync(this.password, salt);
};

methods.register = async function(user) {
  Model.findOne();
} 

module.exports = Model;