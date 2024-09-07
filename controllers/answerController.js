// controllers/answerController.js

const Answer = require('../models/Answer');
const Question = require('../models/Question');
const User = require('../models/User');

// Controller to get answers for a specific question
const getAnswers = async (req, res) => {
  try {
    const { questionId } = req.params;

    // Fetch answers for the given question
    const answers = await Answer.find({ question_id: questionId }).populate('author_id', 'username');
    res.status(200).json(answers);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching answers', error });
  }
};

// Controller to add a new answer
const addAnswer = async (req, res) => {
  try {
    const { questionId } = req.params;
    const { body, author_id } = req.body;

    // Check if question exists
    const question = await Question.findById(questionId);
    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }

    // Check if user exists
    const user = await User.findById(author_id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Create a new answer
    const answer = new Answer({ question_id: questionId, body, author_id });
    await answer.save();

    res.status(201).json(answer);
  } catch (error) {
    res.status(500).json({ message: 'Error adding answer', error });
  }
};

module.exports = { getAnswers, addAnswer };
