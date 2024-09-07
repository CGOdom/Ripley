// models/user.js

const mongoose = require('mongoose');

// Define the user schema
const userSchema = new mongoose.Schema({
  username: { 
    type: String, 
    required: true, 
    trim: true, // Remove whitespace from both ends
    minlength: 3 // Ensure username has at least 3 characters
  },
  email: { 
    type: String, 
    required: true, 
    unique: true, 
    trim: true, // Remove whitespace from both ends
    lowercase: true // Convert email to lowercase
  },
  password: { 
    type: String, 
    required: true, 
    minlength: 8 // Ensure password has at least 8 characters
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }, 
  updatedAt: { 
    type: Date, 
    default: Date.now 
  }
});

// Pre-save middleware to update the `updatedAt` field automatically
userSchema.pre('save', function (next) {
  if (!this.isNew) { // Only update `updatedAt` if the document is modified
    this.updatedAt = Date.now();
  }
  next();
});

// Create the User model using the user schema
const User = mongoose.model('User', userSchema);

module.exports = User;
