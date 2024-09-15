// models/Category.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the category schema with timestamps
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
}, { timestamps: true }); // Automatically adds createdAt and updatedAt fields

// Create the Category model
const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
