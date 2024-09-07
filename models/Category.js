// models/Category.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the category schema
const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true, // Remove whitespace from both ends
    minlength: 1, // Ensure the name is not an empty string
  },
  description: {
    type: String,
    default: '',
    trim: true, // Remove whitespace from both ends
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Middleware to update the `updatedAt` field before saving
categorySchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

// Create the Category model
const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
