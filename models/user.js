const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");
const AutoIncrementPlugin = require("../utils/plugins/mongoose-auto-increment");
var jwt = require("jsonwebtoken");

const schema = new Schema({
  _id: Number,
  person: {
    firstName: String,
    middleName: String,
    lastName: String,
    tel: Number,
  },
  email: String,
  password: {
    type: String,
    select: false,
  },
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

schema.plugin(AutoIncrementPlugin, { id: "user_id_counter" });

schema.methods.hashPassword = function () {
  const salt = bcrypt.genSaltSync(10);
  this.password = bcrypt.hashSync(this.password, salt);
};

schema.methods.register = async function () {
  const res = await Model.findOne({ email: this.email });
  if (res) {
    if (res.err) return { err: res.err };
    return { err: "User already exist" };
  }
  this.hashPassword();
  return this.save();
};

schema.methods.generateToken = function () {
  const payload = { email: this.email };
  const token = jwt.sign(payload, process.env.SECRET_KEY);
  return token;
};

const Model = model("User", schema);

module.exports = Model;
