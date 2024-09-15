// routes/questionRoutes.js

const express = require('express');
const router = express.Router();
const { getQuestions, addQuestion } = require('../controllers/questionController');
const { ensureAuthenticated } = require('../middleware/authMiddleware'); // Import the auth middleware
const Question = require('../models/Question'); // Import the Question model

// Route to get all questions
router.get('/', ensureAuthenticated, getQuestions);

// Route to add a new question
router.post('/', ensureAuthenticated, addQuestion);

// Route to get a specific question by ID
router.get('/:id', ensureAuthenticated, async (req, res) => {
  try {
    const question = await Question.findById(req.params.id)
      .populate('author_id', 'username') // Populate author details
      .populate('category_id', 'name'); // Populate category details

    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }

    res.status(200).json(question);
  } catch (error) {
    console.error('Error fetching question:', error);
    res.status(500).json({ message: 'Error fetching question', error });
  }
});

// Additional routes (e.g., update, delete) can be added here

module.exports = router;
