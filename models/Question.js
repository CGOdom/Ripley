// models/Question.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the question schema
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
  createdAt: {
    type: Date,
    default: Date.now, // Default value is the current date
  },
  updatedAt: {
    type: Date,
    default: Date.now, // Initialize with current date
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
});

// Middleware to update the `updatedAt` field before saving
questionSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

// Create the Question model
const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
