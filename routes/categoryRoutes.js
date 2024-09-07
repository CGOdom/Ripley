// routes/categoryRoutes.js

const express = require('express');
const router = express.Router();
const { getCategories, addCategory } = require('../controllers/categoryController');

// Route to get all categories
router.get('/', getCategories);

// Route to add a new category
router.post('/', addCategory);

module.exports = router;
