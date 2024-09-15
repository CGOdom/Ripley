// controllers/questionController.js

const Question = require('../models/Question');
const Category = require('../models/Category');

// Controller to get all questions
const getQuestions = async (req, res) => {
  try {
    const questions = await Question.find()
      .populate('author_id', 'username') // Populate author details
      .populate('category_id', 'name'); // Populate category details
    res.status(200).json(questions);
  } catch (error) {
    console.error('Error fetching questions:', error);
    res.status(500).json({ message: 'Error fetching questions', error });
  }
};

// Controller to add a new question
const addQuestion = async (req, res) => {
  try {
    const { title, body, category_id, tags } = req.body; // Removed author_id from req.body

    // Validate input
    if (!title || !body || !category_id) {
      return res.status(400).json({ message: 'Title, body, and category_id are required.' });
    }

    // Check if category exists
    const category = await Category.findById(category_id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    // Derive author_id from authenticated user
    const author_id = req.user._id;

    // Create a new question
    const question = new Question({
      title,
      body,
      author_id,
      category_id,
      tags, // Optional: Include tags if provided
    });

    // Save to database
    await question.save();

    res.status(201).json({ message: 'Question added successfully!', question });
  } catch (error) {
    console.error('Error adding question:', error);
    res.status(500).json({ message: 'Error adding question', error });
  }
};

module.exports = { getQuestions, addQuestion };
