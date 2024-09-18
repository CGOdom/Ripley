// models/Question.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the question schema with timestamps
const questionSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true, // Trim whitespace from the title
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
  tags: {
    type: [String], // Array of strings for tags
    default: [],
    validate: {
      validator: function (tags) {
        return tags.every(tag => typeof tag === 'string'); // Ensure all tags are strings
      },
      message: 'All tags must be strings.',
    },
  },
}, { timestamps: true }); // Automatically adds createdAt and updatedAt fields

// Create the Question model
const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
