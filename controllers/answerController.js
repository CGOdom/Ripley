// controllers/answerController.js

const Answer = require('../models/Answer');
const Question = require('../models/Question');

// Controller to get answers for a specific question
const getAnswers = async (req, res) => {
  try {
    const { questionId } = req.params;

    // Fetch answers for the given question
    const answers = await Answer.find({ question_id: questionId })
      .populate('author_id', 'username')
      .sort({ createdAt: -1 }); // Optional: sort by creation date
    res.status(200).json(answers);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching answers', error });
  }
};

// Controller to add a new answer
const addAnswer = async (req, res) => {
  try {
    const { questionId } = req.params;
    const { body } = req.body;

    // Validate input
    if (!body) {
      return res.status(400).json({ message: 'Answer body is required.' });
    }

    // Check if question exists
    const question = await Question.findById(questionId);
    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }

    // Derive author_id from authenticated user
    const author_id = req.user._id;

    // Create a new answer
    const answer = new Answer({ question_id: questionId, body, author_id });
    await answer.save();

    res.status(201).json(answer);
  } catch (error) {
    res.status(500).json({ message: 'Error adding answer', error });
  }
};

module.exports = { getAnswers, addAnswer };
