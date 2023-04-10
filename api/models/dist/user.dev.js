"use strict";

var mongoose = require("mongoose");

var userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: false
  },
  profilePicture: {
    type: String,
    required: false
  },
  id: {
    type: String
  }
});
module.exports = mongoose.model("User", userSchema);