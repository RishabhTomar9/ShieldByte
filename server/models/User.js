// models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  phone: String,
  picture: String, // URL of the profile photo
});

module.exports = mongoose.model("User", userSchema);
