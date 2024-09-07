// routes/questionRoutes.js

const express = require('express');
const router = express.Router();
const { getQuestions, addQuestion } = require('../controllers/questionController');

// Route to get all questions
router.get('/', getQuestions);

// Route to add a new question
router.post('/', addQuestion);

module.exports = router;
