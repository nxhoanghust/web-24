//email => require,unique
//password => required
//fullname => required
//createdAt

const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  fullName: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: new Date()
  },
  DOB: {
    type: Date
  },
  address: {
    type: String
  },
  avatar: {
    type: String,
    default: "http://localhost:3001/2ffc13a8557dd13074048b73d9192f84.jpg"
  }
});

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;
