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
    required: true,
    type: String,
    enum: ["Client", "Repairperson"],
  },
  img: {
    data: Buffer,
    contentType: String,
  },
});

schema.methods.hashPassword = function () {
  const salt = bcrypt.genSaltSync(10);
  this.password = bcrypt.hashSync(this.password, salt);
};

schema.methods.register = async function () {
  const res = await Model.findOne({ email: this.email });
  if (res) {
    if (res.err)
      return { err: res.err };
    return { err: "User already exist" };
  }
  this.hashPassword();
  this.save();
  return this;
}

const Model = model("User", schema);

//const { methods } = schema; 



module.exports = Model;