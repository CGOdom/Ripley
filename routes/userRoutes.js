// routes/userRoutes.js

const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
} = require('../controllers/userController');
const { ensureAuthenticated } = require('../middleware/authMiddleware'); // Import auth middleware

// User registration route
router.post('/register', registerUser);

// User login route
router.post('/login', loginUser);

// User logout route
router.post('/logout', ensureAuthenticated, logoutUser); // Ensure user is authenticated to logout

// Route to get the current authenticated user
router.get('/me', ensureAuthenticated, getCurrentUser); // Protect route with authentication middleware

module.exports = router;
