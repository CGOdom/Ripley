// models/Answer.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the answer schema
const answerSchema = new Schema({
  question_id: {
    type: Schema.Types.ObjectId,
    ref: 'Question', // Reference to the Question model
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
  updated_at: {
    type: Date,
  },
  votes: {
    type: Number,
    default: 0, // Upvotes or downvotes
  },
});

// Create the Answer model
const Answer = mongoose.model('Answer', answerSchema);

module.exports = Answer;
