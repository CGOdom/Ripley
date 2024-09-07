// controllers/questionController.js

const Question = require('../models/Question');
const Category = require('../models/Category');
const User = require('../models/User');

// Controller to get all questions
const getQuestions = async (req, res) => {
  try {
    const questions = await Question.find().populate('author_id', 'username').populate('category_id', 'name');
    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching questions', error });
  }
};

// Controller to add a new question
const addQuestion = async (req, res) => {
  try {
    const { title, body, author_id, category_id } = req.body;

    // Check if category exists
    const category = await Category.findById(category_id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    // Check if user exists
    const user = await User.findById(author_id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Create a new question
    const question = new Question({ title, body, author_id, category_id });
    await question.save();

    res.status(201).json(question);
  } catch (error) {
    res.status(500).json({ message: 'Error adding question', error });
  }
};

module.exports = { getQuestions, addQuestion };
