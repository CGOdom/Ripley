// models/user.js

const mongoose = require('mongoose');

// Define the user schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }, // Additional field: created date
  updatedAt: { type: Date, default: Date.now }  // Additional field: updated date
});

// Pre-save middleware to update the `updatedAt` field automatically
userSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

// Create the User model using the user schema
const User = mongoose.model('User', userSchema);

module.exports = User;
