// models/Comment.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the comment schema
const commentSchema = new Schema({
  answer_id: {
    type: Schema.Types.ObjectId,
    ref: 'Answer', // Reference to the Answer model
    required: true,
  },
  body: {
    type: String,
    required: true,
    trim: true, // Trim whitespace from the body
    minlength: 1, // Ensure the body is not an empty string
  },
  author_id: {
    type: Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now, // Automatically set to current date
  },
  updatedAt: {
    type: Date,
    default: Date.now, // Automatically set to current date
  },
});

// Middleware to update the `updatedAt` field before saving
commentSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

// Create the Comment model
const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
