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
    trim: true, // Remove whitespace from both ends
    minlength: 1, // Ensure the body is not an empty string
  },
  author_id: {
    type: Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  votes: {
    type: Number,
    default: 0, // Default value for votes
    validate: {
      validator: Number.isInteger, // Ensure votes is an integer
      message: '{VALUE} is not an integer value',
    },
  },
});

// Middleware to update the `updatedAt` field before saving
answerSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

// Create the Answer model
const Answer = mongoose.model('Answer', answerSchema);

module.exports = Answer;
