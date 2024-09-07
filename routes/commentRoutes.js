// routes/commentRoutes.js

const express = require('express');
const router = express.Router();
const { addComment, getComments, deleteComment } = require('../controllers/commentController');

// Route to add a new comment to an answer
router.post('/answers/:answerId/comments', addComment);

// Route to get comments for a specific answer
router.get('/answers/:answerId/comments', getComments);

// Route to delete a comment
router.delete('/comments/:commentId', deleteComment);

module.exports = router;
