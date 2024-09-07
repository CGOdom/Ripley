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
  },
  author_id: {
    type: Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

// Create the Comment model
const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
