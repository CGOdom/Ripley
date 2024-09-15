// controllers/categoryController.js

const Category = require('../models/Category');
const { ensureAuthenticated, ensureAdmin } = require('../middleware/authMiddleware'); // Import middlewares

// Controller to get all categories
const getCategories = async (req, res) => {
  try {
    const categories = await Category.find().select('name description'); // Select relevant fields
    res.status(200).json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ message: 'Error fetching categories', error });
  }
};

// Controller to add a new category
const addCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    // Check if category already exists
    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return res.status(400).json({ message: 'Category already exists' });
    }

    // Create a new category
    const category = new Category({ name, description });
    await category.save();

    res.status(201).json({ message: 'Category added successfully!', category });
  } catch (error) {
    console.error('Error adding category:', error);
    res.status(500).json({ message: 'Error adding category', error });
  }
};

module.exports = { getCategories, addCategory };
