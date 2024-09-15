// controllers/commentController.js

const Comment = require('../models/Comment');
const Answer = require('../models/Answer');

// Controller to add a new comment to an answer
const addComment = async (req, res) => {
  try {
    const { answerId } = req.params;
    const { body } = req.body;
    const author_id = req.user._id; // Derive author_id from authenticated user

    // Validate the input
    if (!body) {
      return res.status(400).json({ message: 'Comment body is required.' });
    }

    // Check if the answer exists
    const answer = await Answer.findById(answerId);
    if (!answer) {
      return res.status(404).json({ message: 'Answer not found.' });
    }

    // Create a new comment
    const comment = new Comment({ answer_id: answerId, body, author_id });
    await comment.save();

    // Populate the author details before sending the response
    await comment.populate('author_id', 'username');

    res.status(201).json(comment);
  } catch (error) {
    console.error('Error adding comment:', error);
    res.status(500).json({ message: 'Error adding comment.', error: error.message });
  }
};

// Controller to get comments for a specific answer
const getComments = async (req, res) => {
  try {
    const { answerId } = req.params;

    // Fetch comments for the given answer
    const comments = await Comment.find({ answer_id: answerId })
      .populate('author_id', 'username')
      .sort({ createdAt: -1 }); // Optional: sort by creation date

    res.status(200).json(comments);
  } catch (error) {
    console.error('Error fetching comments:', error);
    res.status(500).json({ message: 'Error fetching comments.', error: error.message });
  }
};

// Controller to delete a comment
const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;

    // Find and delete the comment
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found.' });
    }

    // Check if the requesting user is the author of the comment
    if (comment.author_id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'You are not authorized to delete this comment.' });
    }

    await Comment.findByIdAndDelete(commentId);

    res.status(200).json({ message: 'Comment deleted successfully.' });
  } catch (error) {
    console.error('Error deleting comment:', error);
    res.status(500).json({ message: 'Error deleting comment.', error: error.message });
  }
};

module.exports = { addComment, getComments, deleteComment };
