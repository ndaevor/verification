const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const model = mongoose.model;

const userSchema = Schema({
  name: {
    type: String,
    required:true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required:true
  },
  aadhar: {
    type: Number,
    required:true
  },
  pan: {
    type: String,
    required:true
  },
  bank: {
    type: Number,
    required:true
  },
  ifsc: {
    type: String,
    required:true
  },
  gst: {
    type: String,
    required:true
  },
  pincode: {
    type: Number,
    required:true
  },
});

const User = model('users', userSchema);

module.exports = User;
