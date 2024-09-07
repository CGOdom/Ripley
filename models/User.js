// models/User.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the user schema
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  profile_picture: {
    type: String,
    default: '', // Can store a URL or a path to the profile picture
  },
  bio: {
    type: String,
    default: '',
  },
  roles: {
    type: [String], // Array of strings, e.g., ['member', 'admin']
    default: ['member'],
  },
});

// Create the User model
const User = mongoose.model('User', userSchema);

module.exports = User;
