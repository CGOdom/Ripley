// models/Category.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the category schema
const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  description: {
    type: String,
    default: '',
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

// Create the Category model
const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
