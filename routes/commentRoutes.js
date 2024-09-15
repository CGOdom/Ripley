// routes/commentRoutes.js

const express = require('express');
const router = express.Router();
const { addComment, getComments, deleteComment } = require('../controllers/commentController');
const { ensureAuthenticated } = require('../middleware/authMiddleware'); // Import auth middleware

// Route to add a new comment to an answer
router.post('/answers/:answerId', ensureAuthenticated, addComment);

// Route to get comments for a specific answer
router.get('/answers/:answerId', getComments);

// Route to delete a comment
router.delete('/:commentId', ensureAuthenticated, deleteComment);

module.exports = router;
