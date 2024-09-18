// routes/categoryRoutes.js

const express = require('express');
const router = express.Router();
const { getCategories, addCategory, getCategoryById } = require('../controllers/categoryController');
const { ensureAuthenticated } = require('../middleware/authMiddleware');

router.get('/', ensureAuthenticated, getCategories);
router.post('/', ensureAuthenticated, addCategory);
router.get('/:id', ensureAuthenticated, getCategoryById);

module.exports = router;
