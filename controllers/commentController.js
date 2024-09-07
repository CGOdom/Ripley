// controllers/commentController.js

const Comment = require('../models/Comment');
const Answer = require('../models/Answer');
const User = require('../models/User');

// Controller to add a new comment to an answer
const addComment = async (req, res) => {
  try {
    const { answerId } = req.params;
    const { body, author_id } = req.body;

    // Validate the input
    if (!body || !author_id) {
      return res.status(400).json({ message: 'Comment body and author ID are required.' });
    }

    // Check if the answer exists
    const answer = await Answer.findById(answerId);
    if (!answer) {
      return res.status(404).json({ message: 'Answer not found.' });
    }

    // Check if user exists
    const user = await User.findById(author_id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Create a new comment
    const comment = new Comment({ answer_id: answerId, body, author_id });
    await comment.save();

    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ message: 'Error adding comment.', error });
  }
};

// Controller to get comments for a specific answer
const getComments = async (req, res) => {
  try {
    const { answerId } = req.params;

    // Fetch comments for the given answer
    const comments = await Comment.find({ answer_id: answerId }).populate('author_id', 'username');
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching comments.', error });
  }
};

// Controller to delete a comment
const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;

    // Find and delete the comment
    const comment = await Comment.findByIdAndDelete(commentId);

    if (!comment) {
      return res.status(404).json({ message: 'Comment not found.' });
    }

    res.status(200).json({ message: 'Comment deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting comment.', error });
  }
};

module.exports = { addComment, getComments, deleteComment };
