// routes/answerRoutes.js

const express = require('express');
const router = express.Router();
const { getAnswers, addAnswer } = require('../controllers/answerController');

// Route to get answers for a question
router.get('/:questionId', getAnswers);

// Route to add a new answer
router.post('/:questionId', addAnswer);

module.exports = router;
