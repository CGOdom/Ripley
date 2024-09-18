// models/User.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the user schema
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true, // Remove whitespace from both ends
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true, // Convert email to lowercase
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  // Additional fields can be added here (e.g., profile picture, bio, etc.)
});

// Create the User model
const User = mongoose.model('User', userSchema);

module.exports = User;
