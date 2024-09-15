// routes/categoryRoutes.js

const express = require('express');
const router = express.Router();
const { getCategories, addCategory } = require('../controllers/categoryController');
const { ensureAuthenticated, ensureAdmin } = require('../middleware/authMiddleware'); // Import middlewares

// Route to get all categories (accessible to authenticated users)
router.get('/', ensureAuthenticated, getCategories);

// Route to add a new category (accessible to admins only)
router.post('/', ensureAuthenticated, ensureAdmin, addCategory);

module.exports = router;
