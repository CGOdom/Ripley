// routes/answerRoutes.js

const express = require('express');
const router = express.Router();
const { getAnswers, addAnswer } = require('../controllers/answerController');
const { ensureAuthenticated } = require('../middleware/authMiddleware'); // Import the auth middleware

// Route to get answers for a question
router.get('/:questionId', getAnswers);

// Route to add a new answer
router.post('/:questionId', ensureAuthenticated, addAnswer);

module.exports = router;
