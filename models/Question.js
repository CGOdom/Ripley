// models/Question.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the question schema
const questionSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  body: {
    type: String,
    required: true,
  },
  author_id: {
    type: Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true,
  },
  category_id: {
    type: Schema.Types.ObjectId,
    ref: 'Category', // Reference to the Category model
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
  },
  tags: {
    type: [String], // Array of strings, e.g., ['android', 'Nostromo']
    default: [],
  },
});

// Create the Question model
const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
