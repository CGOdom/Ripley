// routes/questionRoutes.js

const express = require('express');
const router = express.Router();
const { getQuestions, addQuestion, getQuestionById } = require('../controllers/questionController');
const { ensureAuthenticated } = require('../middleware/authMiddleware');

router.get('/', ensureAuthenticated, getQuestions);
router.post('/', ensureAuthenticated, addQuestion);
router.get('/:id', ensureAuthenticated, getQuestionById);

module.exports = router;
