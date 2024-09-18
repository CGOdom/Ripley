// controllers/categoryController.js

const Category = require('../models/Category');

// Controller to get all categories
const getCategories = async (req, res) => {
  try {
    const categories = await Category.find().select('name description');
    res.status(200).json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ message: 'Error fetching categories', error });
  }
};

// Controller to get a single category by ID
const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id).select('name description');
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.status(200).json(category);
  } catch (error) {
    console.error('Error fetching category:', error);
    res.status(500).json({ message: 'Error fetching category', error });
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

module.exports = { getCategories, getCategoryById, addCategory };
